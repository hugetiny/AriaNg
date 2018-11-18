(function () {
    'use strict';

    angular.module('weDownload').controller('CommandController', ['$rootScope', '$window', '$location', '$routeParams', 'WeDownloadDefaultOptions', 'WeDownloadCommonService', 'WeDownloadLocalizationService', 'WeDownloadLogService', 'WeDownloadSettingService', 'aria2TaskService', 'aria2SettingService', function ($rootScope, $window, $location, $routeParams, WeDownloadDefaultOptions, WeDownloadCommonService, WeDownloadLocalizationService, WeDownloadLogService, WeDownloadSettingService, aria2TaskService, aria2SettingService) {
        var path = $location.path();

        var doNewTaskCommand = function (url, params) {
            try {
                url = WeDownloadCommonService.base64UrlDecode(url);
            } catch (ex) {
                WeDownloadLocalizationService.showError('URL is not base64 encoded!');
                return false;
            }

            var options = {};
            var isPaused = false;

            if (params) {
                for (var key in params) {
                    if (!params.hasOwnProperty(key)) {
                        continue;
                    }

                    if (aria2SettingService.isOptionKeyValid(key)) {
                        options[key] = params[key];
                    }
                }

                if (params.pause === 'true') {
                    isPaused = true;
                }
            }

            $rootScope.loadPromise = aria2TaskService.newUriTask({
                urls: [url],
                options: options
            }, isPaused, function (response) {
                if (!response.success) {
                    return false;
                }

                if (isPaused) {
                    $location.path('/waiting');
                } else {
                    $location.path('/downloading');
                }
            });

            WeDownloadLogService.info('[CommandController] new download: ' + url);

            return true;
        };

        var doSetRpcCommand = function (rpcProtocol, rpcHost, rpcPort, rpcInterface, secret) {
            rpcPort = rpcPort || WeDownloadDefaultOptions.rpcPort;
            rpcInterface = rpcInterface || WeDownloadDefaultOptions.rpcInterface;
            secret = secret || WeDownloadDefaultOptions.secret;

            WeDownloadLogService.info('[CommandController] set rpc: ' + rpcProtocol + '://' + rpcHost + ':' + rpcPort + '/' + rpcInterface + ', secret: ' + secret);

            if (!rpcProtocol || (rpcProtocol !== 'http' && rpcProtocol !== 'https' && rpcProtocol !== 'ws' && rpcProtocol !== 'wss')) {
                WeDownloadLocalizationService.showError('Protocol is invalid!');
                return false;
            }

            if (!rpcHost) {
                WeDownloadLocalizationService.showError('RPC host cannot be empty!');
                return false;
            }

            if (secret) {
                try {
                    secret = WeDownloadCommonService.base64UrlDecode(secret);
                } catch (ex) {
                    WeDownloadLocalizationService.showError('RPC secret is not base64 encoded!');
                    return false;
                }
            }

            var newSetting = {
                rpcAlias: '',
                rpcHost: rpcHost,
                rpcPort: rpcPort,
                rpcInterface: rpcInterface,
                protocol: rpcProtocol,
                httpMethod: WeDownloadDefaultOptions.httpMethod,
                secret: secret
            };

            if (WeDownloadSettingService.isRpcSettingEqualsDefault(newSetting)) {
                $location.path('/downloading');
            } else {
                WeDownloadSettingService.setDefaultRpcSetting(newSetting, {
                    keepCurrent: false,
                    forceSet: true
                });

                $location.path('/downloading');
                $window.location.reload();
            }

            return true;
        };

        var doCommand = function (path, params) {
            if (path.indexOf('/new') === 0) {
                return doNewTaskCommand(params.url, params);
            } else if (path.indexOf('/settings/rpc/set') === 0) {
                return doSetRpcCommand(params.protocol, params.host, params.port, params.interface, params.secret);
            } else {
                WeDownloadLocalizationService.showError('Parameter is invalid!');
                return false;
            }
        };

        var allParameters = angular.extend({}, $routeParams, $location.search());

        if (!doCommand(path, allParameters)) {
            $location.path('/downloading');
        }
    }]);
}());

(function () {
    'use strict';

    angular.module('weDownload').controller('Aria2SettingsController', ['$rootScope', '$scope', '$location', 'weDownloadConstants', 'weDownloadLocalizationService', 'aria2SettingService', function ($rootScope, $scope, $location, weDownloadConstants, weDownloadLocalizationService, aria2SettingService) {
        var location = $location.path().substring($location.path().lastIndexOf('/') + 1);

        $scope.context = {
            availableOptions: (function (type) {
                var keys = aria2SettingService.getAvailableGlobalOptionsKeys(type);

                if (!keys) {
                    weDownloadLocalizationService.showError('Type is illegal!');
                    return;
                }

                return aria2SettingService.getSpecifiedOptions(keys);
            })(location),
            globalOptions: []
        };

        $scope.setGlobalOption = function (key, value, optionStatus) {
            return aria2SettingService.setGlobalOption(key, value, function (response) {
                if (response.success && response.data === 'OK') {
                    optionStatus.setSuccess();
                } else {
                    optionStatus.setFailed(response.data.message);
                }
            }, true);
        };

        $rootScope.loadPromise = (function () {
            return aria2SettingService.getGlobalOption(function (response) {
                if (response.success) {
                    $scope.context.globalOptions = response.data;
                }
            });
        })();
    }]);
}());

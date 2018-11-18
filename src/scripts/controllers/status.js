(function () {
    'use strict';

    angular.module('weDownload').controller('Aria2StatusController', ['$rootScope', '$scope', 'weDownloadLocalizationService', 'weDownloadSettingService', 'aria2SettingService', function ($rootScope, $scope, weDownloadLocalizationService, weDownloadSettingService, aria2SettingService) {
        $scope.context = {
            host: weDownloadSettingService.getCurrentRpcUrl(),
            status: 'Connecting',
            serverStatus: null
        };

        $scope.saveSession = function () {
            return aria2SettingService.saveSession(function (response) {
                if (response.success && response.data === 'OK') {
                    weDownloadLocalizationService.showOperationSucceeded('Session has been saved successfully.');
                }
            });
        };

        $scope.shutdown = function () {
            weDownloadLocalizationService.confirm('Confirm Shutdown', 'Are you sure you want to shutdown aria2?', 'warning', function (status) {
                return aria2SettingService.shutdown(function (response) {
                    if (response.success && response.data === 'OK') {
                        weDownloadLocalizationService.showOperationSucceeded('Aria2 has been shutdown successfully.');
                    }
                });
            }, true);
        };

        $rootScope.loadPromise = (function () {
            return aria2SettingService.getAria2Status(function (response) {
                if (response.success) {
                    $scope.context.status = 'Connected';
                    $scope.context.serverStatus = response.data;
                } else {
                    $scope.context.status = 'Disconnected';
                }
            });
        })();
    }]);
}());

(function () {
    'use strict';

    angular.module('weDownload').controller('WeDownloadDebugController', ['$rootScope', '$scope', '$location', '$timeout', 'WeDownloadConstants', 'WeDownloadLocalizationService', 'WeDownloadLogService', 'WeDownloadSettingService', function ($rootScope, $scope, $location, $timeout, WeDownloadConstants, WeDownloadLocalizationService, WeDownloadLogService, WeDownloadSettingService) {
        $scope.logMaxCount = WeDownloadConstants.cachedDebugLogsLimit;
        $scope.currentLog = null;

        $scope.enableDebugMode = function () {
            return WeDownloadSettingService.isEnableDebugMode();
        };

        $scope.reloadLogs = function () {
            $scope.logs = WeDownloadLogService.getDebugLogs().slice();
        };

        $scope.showLogDetail = function (log) {
            $scope.currentLog = log;
            angular.element('#log-detail-modal').modal();
        };

        $('#log-detail-modal').on('hide.bs.modal', function (e) {
            $scope.currentLog = null;
        });

        $rootScope.loadPromise = $timeout(function () {
            if (!WeDownloadSettingService.isEnableDebugMode()) {
                WeDownloadLocalizationService.showError('Access Denied!', function () {
                    if (!WeDownloadSettingService.isEnableDebugMode()) {
                        $location.path('/settings/WeDownload');
                    }
                });
                return;
            }

            $scope.reloadLogs();
        }, 100);
    }]);
}());

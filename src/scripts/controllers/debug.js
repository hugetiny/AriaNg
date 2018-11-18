(function () {
    'use strict';

    angular.module('weDownload').controller('weDownloadDebugController', ['$rootScope', '$scope', '$location', '$timeout', 'weDownloadConstants', 'weDownloadLocalizationService', 'weDownloadLogService', 'weDownloadSettingService', function ($rootScope, $scope, $location, $timeout, weDownloadConstants, weDownloadLocalizationService, weDownloadLogService, weDownloadSettingService) {
        $scope.logMaxCount = weDownloadConstants.cachedDebugLogsLimit;
        $scope.currentLog = null;

        $scope.enableDebugMode = function () {
            return weDownloadSettingService.isEnableDebugMode();
        };

        $scope.reloadLogs = function () {
            $scope.logs = weDownloadLogService.getDebugLogs().slice();
        };

        $scope.showLogDetail = function (log) {
            $scope.currentLog = log;
            angular.element('#log-detail-modal').modal();
        };

        $('#log-detail-modal').on('hide.bs.modal', function (e) {
            $scope.currentLog = null;
        });

        $rootScope.loadPromise = $timeout(function () {
            if (!weDownloadSettingService.isEnableDebugMode()) {
                weDownloadLocalizationService.showError('Access Denied!', function () {
                    if (!weDownloadSettingService.isEnableDebugMode()) {
                        $location.path('/settings/weDownload');
                    }
                });
                return;
            }

            $scope.reloadLogs();
        }, 100);
    }]);
}());

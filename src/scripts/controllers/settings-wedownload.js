(function () {
    'use strict';

    angular.module('weDownload').controller('weDownloadSettingsController', ['$rootScope', '$scope', '$routeParams', '$window', '$interval', '$timeout', '$filter', 'clipboard', 'weDownloadLanguages', 'weDownloadCommonService', 'weDownloadNotificationService', 'weDownloadLocalizationService', 'weDownloadLogService', 'weDownloadFileService', 'weDownloadSettingService', 'weDownloadMonitorService', 'weDownloadTitleService', 'aria2SettingService', function ($rootScope, $scope, $routeParams, $window, $interval, $timeout, $filter, clipboard, weDownloadLanguages, weDownloadCommonService, weDownloadNotificationService, weDownloadLocalizationService, weDownloadLogService, weDownloadFileService, weDownloadSettingService, weDownloadMonitorService, weDownloadTitleService, aria2SettingService) {
        var extendType = $routeParams.extendType;
        var lastRefreshPageNotification = null;

        var getFinalTitle = function () {
            return weDownloadTitleService.getFinalTitleByGlobalStat(weDownloadMonitorService.getCurrentGlobalStat());
        };

        var setNeedRefreshPage = function () {
            if (lastRefreshPageNotification) {
                return;
            }

            var noticicationScope = $rootScope.$new();

            noticicationScope.refreshPage = function () {
                $window.location.reload();
            };

            lastRefreshPageNotification = weDownloadLocalizationService.notifyInPage('', 'Configuration has been modified, please reload the page for the changes to take effect.', {
                delay: false,
                type: 'info',
                templateUrl: 'setting-changed-notification.html',
                scope: noticicationScope,
                onClose: function () {
                    lastRefreshPageNotification = null;
                }
            });
        };

        $scope.context = {
            currentTab: 'global',
            languages: weDownloadLanguages,
            titlePreview: getFinalTitle(),
            availableTime: weDownloadCommonService.getTimeOptions([1000, 2000, 3000, 5000, 10000, 30000, 60000], true),
            trueFalseOptions: [{name: 'True', value: true}, {name: 'False', value: false}],
            showRpcSecret: false,
            isInsecureProtocolDisabled: weDownloadSettingService.isInsecureProtocolDisabled(),
            settings: weDownloadSettingService.getAllOptions(),
            sessionSettings: weDownloadSettingService.getAllSessionOptions(),
            rpcSettings: weDownloadSettingService.getAllRpcSettings(),
            isSupportBlob: weDownloadFileService.isSupportBlob(),
            importSettings: null,
            exportSettings: null,
            exportSettingsCopied: false
        };

        $scope.context.showDebugMode = $scope.context.sessionSettings.debugMode || extendType === 'debug';

        $scope.changeGlobalTab = function () {
            $scope.context.currentTab = 'global';
        };

        $scope.isCurrentGlobalTab = function () {
            return $scope.context.currentTab === 'global';
        };

        $scope.changeRpcTab = function (rpcIndex) {
            $scope.context.currentTab = 'rpc' + rpcIndex;
        };

        $scope.isCurrentRpcTab = function (rpcIndex) {
            return $scope.context.currentTab === 'rpc' + rpcIndex;
        };

        $scope.getCurrentRpcTabIndex = function () {
            if ($scope.isCurrentGlobalTab()) {
                return -1;
            }

            return parseInt($scope.context.currentTab.substring(3));
        };

        $scope.updateTitlePreview = function () {
            $scope.context.titlePreview = getFinalTitle();
        };

        $rootScope.swipeActions.extentLeftSwipe = function () {
            var tabIndex = -1;

            if (!$scope.isCurrentGlobalTab()) {
                tabIndex = parseInt($scope.getCurrentRpcTabIndex());
            }

            if (tabIndex < $scope.context.rpcSettings.length - 1) {
                $scope.changeRpcTab(tabIndex + 1);
                return true;
            } else {
                return false;
            }
        };

        $rootScope.swipeActions.extentRightSwipe = function () {
            var tabIndex = -1;

            if (!$scope.isCurrentGlobalTab()) {
                tabIndex = parseInt($scope.getCurrentRpcTabIndex());
            }

            if (tabIndex > 0) {
                $scope.changeRpcTab(tabIndex - 1);
                return true;
            } else if (tabIndex === 0) {
                $scope.changeGlobalTab();
                return true;
            } else {
                return false;
            }
        };

        $scope.isSupportNotification = function () {
            return weDownloadNotificationService.isSupportBrowserNotification() &&
                weDownloadSettingService.isCurrentRpcUseWebSocket($scope.context.settings.protocol);
        };

        $scope.setLanguage = function (value) {
            if (weDownloadSettingService.setLanguage(value)) {
                weDownloadLocalizationService.applyLanguage(value);
            }

            $scope.updateTitlePreview();
        };

        $scope.setDebugMode = function (value) {
            weDownloadSettingService.setDebugMode(value);
        };

        $scope.setTitle = function (value) {
            weDownloadSettingService.setTitle(value);
        };

        $scope.setEnableBrowserNotification = function (value) {
            weDownloadSettingService.setBrowserNotification(value);

            if (value && !weDownloadNotificationService.hasBrowserPermission()) {
                weDownloadNotificationService.requestBrowserPermission(function (result) {
                    if (!result.granted) {
                        $scope.context.settings.browserNotification = false;
                        weDownloadLocalizationService.showError('You have disabled notification in your browser. You should change your browser\'s settings before you enable this function.');
                    }
                });
            }
        };

        $scope.setTitleRefreshInterval = function (value) {
            setNeedRefreshPage();
            weDownloadSettingService.setTitleRefreshInterval(value);
        };

        $scope.setGlobalStatRefreshInterval = function (value) {
            setNeedRefreshPage();
            weDownloadSettingService.setGlobalStatRefreshInterval(value);
        };

        $scope.setDownloadTaskRefreshInterval = function (value) {
            setNeedRefreshPage();
            weDownloadSettingService.setDownloadTaskRefreshInterval(value);
        };

        $scope.setRPCListDisplayOrder = function (value) {
            setNeedRefreshPage();
            weDownloadSettingService.setRPCListDisplayOrder(value);
        };

        $scope.setAfterCreatingNewTask = function (value) {
            weDownloadSettingService.setAfterCreatingNewTask(value);
        };

        $scope.setRemoveOldTaskAfterRetrying = function (value) {
            weDownloadSettingService.setRemoveOldTaskAfterRetrying(value);
        };

        $scope.setAfterRetryingTask = function (value) {
            weDownloadSettingService.setAfterRetryingTask(value);
        };

        $scope.showImportSettingsModal = function () {
            $scope.context.importSettings = null;
            angular.element('#import-settings-modal').modal();
        };

        $('#import-settings-modal').on('hide.bs.modal', function (e) {
            $scope.context.importSettings = null;
        });

        $scope.openweDownloadConfigFile = function () {
            weDownloadFileService.openFileContent({
                fileFilter: '.json',
                fileType: 'text'
            }, function (result) {
                $scope.context.importSettings = result.content;
            }, function (error) {
                weDownloadLocalizationService.showError(error);
            }, angular.element('#import-file-holder'));
        };

        $scope.importSettings = function (settings) {
            var settingsObj = null;

            try {
                settingsObj = JSON.parse(settings);
            } catch (e) {
                weDownloadLogService.error('[weDownloadSettingsController.importSettings] parse settings json error', e);
                weDownloadLocalizationService.showError('Invalid settings data format!');
                return;
            }

            if (!angular.isObject(settingsObj) || angular.isArray(settingsObj)) {
                weDownloadLogService.error('[weDownloadSettingsController.importSettings] settings json is not object');
                weDownloadLocalizationService.showError('Invalid settings data format!');
                return;
            }

            if (settingsObj) {
                weDownloadLocalizationService.confirm('Confirm Import', 'Are you sure you want to import all settings?', 'warning', function () {
                    weDownloadSettingService.importAllOptions(settingsObj);
                    $window.location.reload();
                });
            }
        };

        $scope.showExportSettingsModal = function () {
            $scope.context.exportSettings = $filter('json')(weDownloadSettingService.exportAllOptions());
            $scope.context.exportSettingsCopied = false;
            angular.element('#export-settings-modal').modal();
        };

        $('#export-settings-modal').on('hide.bs.modal', function (e) {
            $scope.context.exportSettings = null;
            $scope.context.exportSettingsCopied = false;
        });

        $scope.copyExportSettings = function () {
            clipboard.copyText($scope.context.exportSettings);
            $scope.context.exportSettingsCopied = true;
        };

        $scope.addNewRpcSetting = function () {
            setNeedRefreshPage();

            var newRpcSetting = weDownloadSettingService.addNewRpcSetting();
            $scope.context.rpcSettings.push(newRpcSetting);

            $scope.changeRpcTab($scope.context.rpcSettings.length - 1);
        };

        $scope.updateRpcSetting = function (setting, field) {
            setNeedRefreshPage();
            weDownloadSettingService.updateRpcSetting(setting, field);
        };

        $scope.removeRpcSetting = function (setting) {
            var rpcName = (setting.rpcAlias ? setting.rpcAlias : setting.rpcHost + ':' + setting.rpcPort);

            weDownloadLocalizationService.confirm('Confirm Remove', 'Are you sure you want to remove rpc setting "{{rpcName}}"?', 'warning', function () {
                setNeedRefreshPage();

                var currentIndex = $scope.getCurrentRpcTabIndex();
                var index = $scope.context.rpcSettings.indexOf(setting);
                weDownloadSettingService.removeRpcSetting(setting);
                $scope.context.rpcSettings.splice(index, 1);

                if (currentIndex >= $scope.context.rpcSettings.length) {
                    $scope.changeRpcTab($scope.context.rpcSettings.length - 1);
                } else if (currentIndex <= 0 || currentIndex <= index) {
                    ; // Do Nothing
                } else { // currentIndex > index
                    $scope.changeRpcTab(currentIndex - 1);
                }
            }, false, {
                textParams: {
                    rpcName: rpcName
                }
            });
        };

        $scope.setDefaultRpcSetting = function (setting) {
            if (setting.isDefault) {
                return;
            }

            weDownloadSettingService.setDefaultRpcSetting(setting);
            $window.location.reload();
        };

        $scope.resetSettings = function () {
            weDownloadLocalizationService.confirm('Confirm Reset', 'Are you sure you want to reset all settings?', 'warning', function () {
                weDownloadSettingService.resetSettings();
                $window.location.reload();
            });
        };

        $scope.clearHistory = function () {
            weDownloadLocalizationService.confirm('Confirm Clear', 'Are you sure you want to clear all settings history?', 'warning', function () {
                aria2SettingService.clearSettingsHistorys();
                $window.location.reload();
            });
        };

        angular.element('[data-toggle="popover"]').popover();

        $rootScope.loadPromise = $timeout(function () {}, 100);
    }]);
}());

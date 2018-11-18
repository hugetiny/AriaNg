(function () {
    'use strict';

    angular.module('weDownload').controller('NewTaskController', ['$rootScope', '$scope', '$location', '$timeout', 'weDownloadCommonService', 'weDownloadLocalizationService', 'weDownloadLogService', 'weDownloadFileService', 'weDownloadSettingService', 'aria2TaskService', 'aria2SettingService', function ($rootScope, $scope, $location, $timeout, weDownloadCommonService, weDownloadLocalizationService, weDownloadLogService, weDownloadFileService, weDownloadSettingService, aria2TaskService, aria2SettingService) {
        var tabOrders = ['links', 'options'];
        var parameters = $location.search();

        var saveDownloadPath = function (options) {
            if (!options || !options.dir) {
                return;
            }

            aria2SettingService.addSettingHistory('dir', options.dir);
        };

        var downloadByLinks = function (pauseOnAdded, responseCallback) {
            var urls = weDownloadCommonService.parseUrlsFromOriginInput($scope.context.urls);
            var options = angular.copy($scope.context.options);
            var tasks = [];

            for (var i = 0; i < urls.length; i++) {
                if (urls[i] === '' || urls[i].trim() === '') {
                    continue;
                }

                tasks.push({
                    urls: [urls[i].trim()],
                    options: options
                });
            }

            saveDownloadPath(options);

            return aria2TaskService.newUriTasks(tasks, pauseOnAdded, responseCallback);
        };

        var downloadByTorrent = function (pauseOnAdded, responseCallback) {
            var task = {
                content: $scope.context.uploadFile.base64Content,
                options: angular.copy($scope.context.options)
            };

            saveDownloadPath(task.options);

            return aria2TaskService.newTorrentTask(task, pauseOnAdded, responseCallback);
        };

        var downloadByMetalink = function (pauseOnAdded, responseCallback) {
            var task = {
                content: $scope.context.uploadFile.base64Content,
                options: angular.copy($scope.context.options)
            };

            saveDownloadPath(task.options);

            return aria2TaskService.newMetalinkTask(task, pauseOnAdded, responseCallback);
        };

        $scope.context = {
            currentTab: 'links',
            taskType: 'urls',
            urls: '',
            uploadFile: null,
            availableOptions: (function () {
                var keys = aria2SettingService.getNewTaskOptionKeys();

                return aria2SettingService.getSpecifiedOptions(keys, {
                    disableRequired: true
                });
            })(),
            globalOptions: null,
            options: {},
            optionFilter: {
                global: true,
                http: false,
                bittorrent: false
            }
        };

        if (parameters.url) {
            try {
                $scope.context.urls = weDownloadCommonService.base64UrlDecode(parameters.url);
            } catch (ex) {
                weDownloadLogService.error('[NewTaskController] base64 decode error, url=' + parameters.url, ex);
            }
        }

        $scope.changeTab = function (tabName) {
            if (tabName === 'options') {
                $scope.loadDefaultOption();
            }

            $scope.context.currentTab = tabName;
        };

        $rootScope.swipeActions.extentLeftSwipe = function () {
            var tabIndex = tabOrders.indexOf($scope.context.currentTab);

            if (tabIndex < tabOrders.length - 1) {
                $scope.changeTab(tabOrders[tabIndex + 1]);
                return true;
            } else {
                return false;
            }
        };

        $rootScope.swipeActions.extentRightSwipe = function () {
            var tabIndex = tabOrders.indexOf($scope.context.currentTab);

            if (tabIndex > 0) {
                $scope.changeTab(tabOrders[tabIndex - 1]);
                return true;
            } else {
                return false;
            }
        };

        $scope.loadDefaultOption = function () {
            if ($scope.context.globalOptions) {
                return;
            }

            $rootScope.loadPromise = aria2SettingService.getGlobalOption(function (response) {
                if (response.success) {
                    $scope.context.globalOptions = response.data;
                }
            });
        };

        $scope.openTorrent = function () {
            weDownloadFileService.openFileContent({
                fileFilter: '.torrent',
                fileType: 'binary'
            }, function (result) {
                $scope.context.uploadFile = result;
                $scope.context.taskType = 'torrent';
                $scope.changeTab('options');
            }, function (error) {
                weDownloadLocalizationService.showError(error);
            }, angular.element('#file-holder'));
        };

        $scope.openMetalink = function () {
            weDownloadFileService.openFileContent({
                fileFilter: '.meta4,.metalink',
                fileType: 'binary'
            }, function (result) {
                $scope.context.uploadFile = result;
                $scope.context.taskType = 'metalink';
                $scope.changeTab('options');
            }, function (error) {
                weDownloadLocalizationService.showError(error);
            }, angular.element('#file-holder'));
        };

        $scope.startDownload = function (pauseOnAdded) {
            var responseCallback = function (response) {
                if (!response.hasSuccess && !response.success) {
                    return;
                }

                var firstTask = null;

                if (response.results && response.results.length > 0) {
                    firstTask = response.results[0];
                } else if (response) {
                    firstTask = response;
                }

                if (weDownloadSettingService.getAfterCreatingNewTask() === 'task-detail' && firstTask && firstTask.data) {
                    $location.path('/task/detail/' + firstTask.data);
                } else {
                    if (pauseOnAdded) {
                        $location.path('/waiting');
                    } else {
                        $location.path('/downloading');
                    }
                }
            };

            if ($scope.context.taskType === 'urls') {
                $rootScope.loadPromise = downloadByLinks(pauseOnAdded, responseCallback);
            } else if ($scope.context.taskType === 'torrent') {
                $rootScope.loadPromise = downloadByTorrent(pauseOnAdded, responseCallback);
            } else if ($scope.context.taskType === 'metalink') {
                $rootScope.loadPromise = downloadByMetalink(pauseOnAdded, responseCallback);
            }
        };

        $scope.setOption = function (key, value, optionStatus) {
            if (value !== '') {
                $scope.context.options[key] = value;
            } else {
                delete $scope.context.options[key];
            }

            optionStatus.setReady();
        };

        $scope.urlTextboxKeyDown = function (event) {
            if (event.keyCode === 13 && event.ctrlKey && $scope.newTaskForm.$valid) {
                $scope.startDownload();
            }
        };

        $scope.getValidUrlsCount = function () {
            var urls = weDownloadCommonService.parseUrlsFromOriginInput($scope.context.urls);
            return urls ? urls.length : 0;
        };

        $rootScope.loadPromise = $timeout(function () {}, 100);
    }]);
}());

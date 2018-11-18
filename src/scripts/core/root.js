(function () {
    'use strict';

    angular.module('weDownload').run(['$rootScope', '$location', '$document', 'WeDownloadCommonService', 'WeDownloadLocalizationService', 'WeDownloadLogService', 'WeDownloadSettingService', 'aria2TaskService', function ($rootScope, $location, $document, WeDownloadCommonService, WeDownloadLocalizationService, WeDownloadLogService, WeDownloadSettingService, aria2TaskService) {
        var isUrlMatchUrl2 = function (url, url2) {
            if (url === url2) {
                return true;
            }

            var index = url2.indexOf(url);

            if (index !== 0) {
                return false;
            }

            var lastPart = url2.substring(url.length);

            if (lastPart.indexOf('/') === 0) {
                return true;
            }

            return false;
        };

        var initCheck = function () {
            var browserFeatures = WeDownloadSettingService.getBrowserFeatures();

            if (!browserFeatures.localStroage) {
                WeDownloadLogService.warn('[root.initCheck] LocalStorage is not supported!');
            }

            if (!browserFeatures.cookies) {
                WeDownloadLogService.warn('[root.initCheck] Cookies is not supported!');
            }

            if (!WeDownloadSettingService.isBrowserSupportStorage()) {
                angular.element('body').prepend('<div class="disable-overlay"></div>');
                angular.element('.main-sidebar').addClass('blur');
                angular.element('.navbar').addClass('blur');
                angular.element('.content-body').addClass('blur');
                WeDownloadLocalizationService.notifyInPage('', 'You cannot use WeDownload because this browser does not support data storage.', {
                    type: 'error',
                    delay: false
                });

                throw new Error('You cannot use WeDownload because this browser does not support data storage.');
            }
        };

        var initNavbar = function () {
            angular.element('section.sidebar > ul > li[data-href-match] > a').click(function () {
                angular.element('section.sidebar > ul li').removeClass('active');
                angular.element(this).parent().addClass('active');
            });

            angular.element('section.sidebar > ul > li.treeview > ul.treeview-menu > li[data-href-match] > a').click(function () {
                angular.element('section.sidebar > ul li').removeClass('active');
                angular.element(this).parent().addClass('active').parent().parent().addClass('active');
            });
        };

        var setNavbarSelected = function (location) {
            angular.element('section.sidebar > ul li').removeClass('active');
            angular.element('section.sidebar > ul > li[data-href-match]').each(function (index, element) {
                var match = angular.element(element).attr('data-href-match');

                if (isUrlMatchUrl2(match, location)) {
                    angular.element(element).addClass('active');
                }
            });

            angular.element('section.sidebar > ul > li.treeview > ul.treeview-menu > li[data-href-match]').each(function (index, element) {
                var match = angular.element(element).attr('data-href-match');

                if (isUrlMatchUrl2(match, location)) {
                    angular.element(element).addClass('active').parent().parent().addClass('active');
                }
            });
        };

        var showSidebar = function () {
            angular.element('body').removeClass('sidebar-collapse').addClass('sidebar-open');
        };

        var hideSidebar = function () {
            angular.element('body').addClass('sidebar-collapse').removeClass('sidebar-open');
        };

        var isSidebarShowInSmallScreen = function () {
            return angular.element('body').hasClass('sidebar-open');
        };

        $rootScope.searchContext = {
            text: ''
        };

        $rootScope.taskContext = {
            rpcStatus: 'Connecting',
            list: [],
            selected: {},
            enableSelectAll: false,
            getSelectedTaskIds: function () {
                var result = [];

                if (!this.list || !this.selected || this.list.length < 1) {
                    return result;
                }

                for (var i = 0; i < this.list.length; i++) {
                    var task = this.list[i];

                    if (this.selected[task.gid]) {
                        result.push(task.gid);
                    }
                }

                return result;
            },
            getSelectedTasks: function () {
                var result = [];

                if (!this.list || !this.selected || this.list.length < 1) {
                    return result;
                }

                for (var i = 0; i < this.list.length; i++) {
                    var task = this.list[i];

                    if (this.selected[task.gid]) {
                        result.push(task);
                    }
                }

                return result;
            },
            isAllSelected: function () {
                var isAllSelected = true;

                for (var i = 0; i < this.list.length; i++) {
                    var task = this.list[i];

                    if (!this.selected[task.gid]) {
                        isAllSelected = false;
                        break;
                    }
                }

                return isAllSelected;
            },
            selectAll: function () {
                if (!this.list || !this.selected || this.list.length < 1) {
                    return;
                }

                if (!this.enableSelectAll) {
                    return;
                }

                var isAllSelected = this.isAllSelected();

                for (var i = 0; i < this.list.length; i++) {
                    var task = this.list[i];
                    this.selected[task.gid] = !isAllSelected;
                }
            }
        };

        $rootScope.swipeActions = {
            leftSwipe: function () {
                if (isSidebarShowInSmallScreen()) {
                    hideSidebar();
                    return;
                }

                if (!this.extentLeftSwipe ||
                    (angular.isFunction(this.extentLeftSwipe) && !this.extentLeftSwipe())) {
                    hideSidebar();
                }
            },
            rightSwipe: function () {
                if (!this.extentRightSwipe ||
                    (angular.isFunction(this.extentRightSwipe) && !this.extentRightSwipe())) {
                    showSidebar();
                }
            }
        };

        WeDownloadSettingService.onFirstAccess(function () {
            WeDownloadLocalizationService.notifyInPage('', 'Tap to configure and get started with WeDownload.', {
                delay: false,
                onClose: function () {
                    $location.path('/settings/WeDownload');
                }
            });
        });

        aria2TaskService.onFirstSuccess(function (event) {
            WeDownloadLocalizationService.notifyInPage('', '{{name}} is connected', {
                type: 'success',
                contentParams: {
                    name: event.rpcName
                }
            });
        });

        aria2TaskService.onOperationSuccess(function () {
            $rootScope.taskContext.rpcStatus = 'Connected';
        });

        aria2TaskService.onOperationError(function () {
            $rootScope.taskContext.rpcStatus = 'Disconnected';
        });

        aria2TaskService.onTaskCompleted(function (event) {
            WeDownloadLocalizationService.notifyTaskComplete(event.task);
        });

        aria2TaskService.onBtTaskCompleted(function (event) {
            WeDownloadLocalizationService.notifyBtTaskComplete(event.task);
        });

        aria2TaskService.onTaskErrorOccur(function (event) {
            WeDownloadLocalizationService.notifyTaskError(event.task);
        });

        $rootScope.$on('$locationChangeStart', function (event) {
            WeDownloadCommonService.closeAllDialogs();

            $rootScope.loadPromise = null;

            delete $rootScope.swipeActions.extentLeftSwipe;
            delete $rootScope.swipeActions.extentRightSwipe;

            if (angular.isArray($rootScope.taskContext.list) && $rootScope.taskContext.list.length > 0) {
                $rootScope.taskContext.list.length = 0;
            }

            if (angular.isObject($rootScope.taskContext.selected)) {
                $rootScope.taskContext.selected = {};
            }

            $rootScope.taskContext.enableSelectAll = false;
        });

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var location = $location.path();

            setNavbarSelected(location);
            $document.unbind('keypress');
        });

        initCheck();
        initNavbar();
    }]);
}());

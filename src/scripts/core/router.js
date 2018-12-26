(function () {
    'use strict';

    angular.module('weDownload').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/downloading', {
                templateUrl: 'src/views/list.html',
                controller: 'DownloadListController'
            })
            .when('/waiting', {
                templateUrl: 'src/views/list.html',
                controller: 'DownloadListController'
            })
            .when('/stopped', {
                templateUrl: 'src/views/list.html',
                controller: 'DownloadListController'
            })
            .when('/new', {
                templateUrl: 'src/views/new.html',
                controller: 'NewTaskController'
            })
            .when('/new/:url', {
                template: '',
                controller: 'CommandController'
            })
            .when('/task/detail/:gid', {
                templateUrl: 'src/views/task-detail.html',
                controller: 'TaskDetailController'
            })
            .when('/settings/weDownload', {
                templateUrl: 'src/views/settings-weDownload.html',
                controller: 'weDownloadSettingsController'
            })
            .when('/settings/weDownload/:extendType', {
                templateUrl: 'src/views/settings-weDownload.html',
                controller: 'weDownloadSettingsController'
            })
            .when('/settings/aria2/basic', {
                templateUrl: 'src/views/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/http-ftp-sftp', {
                templateUrl: 'src/views/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/http', {
                templateUrl: 'src/views/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/ftp-sftp', {
                templateUrl: 'src/views/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/bt', {
                templateUrl: 'src/views/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/metalink', {
                templateUrl: 'src/views/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/rpc', {
                templateUrl: 'src/views/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/advanced', {
                templateUrl: 'src/views/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/rpc/set', {
                template: '',
                controller: 'CommandController'
            })
            .when('/settings/rpc/set/:protocol/:host/:port/:interface/:secret?', {
                template: '',
                controller: 'CommandController'
            })
            .when('/debug', {
                templateUrl: 'src/views/debug.html',
                controller: 'weDownloadDebugController'
            })
            .when('/status', {
                templateUrl: 'src/views/status.html',
                controller: 'Aria2StatusController'
            })
            .otherwise({
                redirectTo: '/downloading'
            });
    }]);
}());

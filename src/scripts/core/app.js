(function () {
    'use strict';

    var weDownload = angular.module('weDownload', [
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMessages',
        'ngCookies',
        'ngAnimate',
        'pascalprecht.translate',
        'angularMoment',
        'ngWebSocket',
        'utf8-base64',
        'LocalStorageModule',
        'ui-notification',
        'angularBittorrentPeerid',
        'cgBusy',
        'angularPromiseButtons',
        'oitozero.ngSweetAlert',
        'angular-clipboard',
        'inputDropdown',
        angularDragula(angular)
    ]);
}());

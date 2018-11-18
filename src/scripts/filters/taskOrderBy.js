(function () {
    'use strict';

    angular.module('weDownload').filter('taskOrderBy', ['$filter', 'weDownloadCommonService', function ($filter, weDownloadCommonService) {
        return function (array, type) {
            if (!angular.isArray(array)) {
                return array;
            }

            var orderType = weDownloadCommonService.parseOrderType(type);

            if (orderType === null) {
                return array;
            }

            if (orderType.type === 'name') {
                return $filter('orderBy')(array, ['taskName'], orderType.reverse);
            } else if (orderType.type === 'size') {
                return $filter('orderBy')(array, ['totalLength'], orderType.reverse);
            } else if (orderType.type === 'percent') {
                return $filter('orderBy')(array, ['completePercent'], orderType.reverse);
            } else if (orderType.type === 'remain') {
                return $filter('orderBy')(array, ['idle', 'remainTime', 'remainLength'], orderType.reverse);
            } else if (orderType.type === 'dspeed') {
                return $filter('orderBy')(array, ['downloadSpeed'], orderType.reverse);
            } else if (orderType.type === 'uspeed') {
                return $filter('orderBy')(array, ['uploadSpeed'], orderType.reverse);
            } else {
                return array;
            }
        };
    }]);
}());

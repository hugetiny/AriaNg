(function () {
    'use strict';

    angular.module('weDownload').filter('peerOrderBy', ['$filter', 'weDownloadCommonService', function ($filter, weDownloadCommonService) {
        return function (array, type) {
            if (!angular.isArray(array)) {
                return array;
            }

            var orderType = weDownloadCommonService.parseOrderType(type);

            if (orderType === null) {
                return array;
            }

            if (orderType.type === 'address') {
                return $filter('orderBy')(array, ['ip', 'port'], orderType.reverse);
            } else if (orderType.type === 'client') {
                return $filter('orderBy')(array, ['client.name', 'client.version'], orderType.reverse);
            } else if (orderType.type === 'percent') {
                return $filter('orderBy')(array, ['completePercent'], orderType.reverse);
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

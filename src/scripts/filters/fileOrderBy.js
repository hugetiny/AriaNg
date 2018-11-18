(function () {
    'use strict';

    angular.module('weDownload').filter('fileOrderBy', ['$filter', 'WeDownloadCommonService', function ($filter, WeDownloadCommonService) {
        return function (array, type) {
            if (!angular.isArray(array) || !type) {
                return array;
            }

            var orderType = WeDownloadCommonService.parseOrderType(type);

            if (orderType === null) {
                return array;
            }

            if (orderType.type === 'index') {
                return $filter('orderBy')(array, ['index'], orderType.reverse);
            } else if (orderType.type === 'name') {
                return $filter('orderBy')(array, ['fileName'], orderType.reverse);
            } else if (orderType.type === 'size') {
                return $filter('orderBy')(array, ['length'], orderType.reverse);
            } else if (orderType.type === 'percent') {
                return $filter('orderBy')(array, ['completePercent'], orderType.reverse);
            } else {
                return array;
            }
        };
    }]);
}());

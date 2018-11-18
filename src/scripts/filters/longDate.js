(function () {
    'use strict';

    angular.module('weDownload').filter('longDate', ['weDownloadCommonService', 'weDownloadLocalizationService', function (weDownloadCommonService, weDownloadLocalizationService) {
        return function (time) {
            var format = weDownloadLocalizationService.getLongDateFormat();
            return weDownloadCommonService.formatDateTime(time, format);
        };
    }]);
}());

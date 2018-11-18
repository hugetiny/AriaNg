(function () {
    'use strict';

    angular.module('weDownload').filter('longDate', ['WeDownloadCommonService', 'WeDownloadLocalizationService', function (WeDownloadCommonService, WeDownloadLocalizationService) {
        return function (time) {
            var format = WeDownloadLocalizationService.getLongDateFormat();
            return WeDownloadCommonService.formatDateTime(time, format);
        };
    }]);
}());

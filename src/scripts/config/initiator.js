(function () {
    'use strict';

    angular.module('weDownload').run(['moment', 'weDownloadLocalizationService', 'weDownloadSettingService', function (moment, weDownloadLocalizationService, weDownloadSettingService) {
        var language = weDownloadSettingService.getLanguage();

        moment.updateLocale('zh-cn', {
            week: null
        });

        weDownloadLocalizationService.applyLanguage(language);
    }]);
}());

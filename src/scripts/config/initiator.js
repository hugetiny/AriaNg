(function () {
    'use strict';

    angular.module('weDownload').run(['moment', 'WeDownloadLocalizationService', 'WeDownloadSettingService', function (moment, WeDownloadLocalizationService, weDownloadSettingService) {
        var language = weDownloadSettingService.getLanguage();

        moment.updateLocale('zh-cn', {
            week: null
        });

        weDownloadLocalizationService.applyLanguage(language);
    }]);
}());

(function () {
    'use strict';

    angular.module('weDownload').config(['$qProvider', '$translateProvider', 'localStorageServiceProvider', 'NotificationProvider', 'weDownloadConstants', 'weDownloadLanguages', function ($qProvider, $translateProvider, localStorageServiceProvider, NotificationProvider, weDownloadConstants, weDownloadLanguages) {
        $qProvider.errorOnUnhandledRejections(false);

        localStorageServiceProvider
            .setPrefix(weDownloadConstants.appPrefix)
            .setStorageType('localStorage')
            .setStorageCookie(365, '/');

        var supportedLangs = [];
        var languageAliases = {};

        for (var langName in weDownloadLanguages) {
            if (!weDownloadLanguages.hasOwnProperty(langName)) {
                continue;
            }

            var language = weDownloadLanguages[langName];
            var aliases = language.aliases;

            supportedLangs.push(langName);

            if (!angular.isArray(aliases) || aliases.length < 1) {
                continue;
            }

            for (var i = 0; i < aliases.length; i++) {
                var langAlias = aliases[i];
                languageAliases[langAlias] = langName;
            }
        }

        $translateProvider.useLoader('weDownloadLanguageLoader')
            .useLoaderCache(true)
            .registerAvailableLanguageKeys(supportedLangs, languageAliases)
            .fallbackLanguage(weDownloadConstants.defaultLanguage)
            .useSanitizeValueStrategy('escapeParameters');

        NotificationProvider.setOptions({
            delay: weDownloadConstants.notificationInPageTimeout
        });
    }]);
}());

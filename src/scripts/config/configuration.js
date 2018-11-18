(function () {
    'use strict';

    angular.module('weDownload').config(['$qProvider', '$translateProvider', 'localStorageServiceProvider', 'NotificationProvider', 'WeDownloadConstants', 'WeDownloadLanguages', function ($qProvider, $translateProvider, localStorageServiceProvider, NotificationProvider, WeDownloadConstants, WeDownloadLanguages) {
        $qProvider.errorOnUnhandledRejections(false);

        localStorageServiceProvider
            .setPrefix(WeDownloadConstants.appPrefix)
            .setStorageType('localStorage')
            .setStorageCookie(365, '/');

        var supportedLangs = [];
        var languageAliases = {};

        for (var langName in WeDownloadLanguages) {
            if (!WeDownloadLanguages.hasOwnProperty(langName)) {
                continue;
            }

            var language = WeDownloadLanguages[langName];
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

        $translateProvider.useLoader('WeDownloadLanguageLoader')
            .useLoaderCache(true)
            .registerAvailableLanguageKeys(supportedLangs, languageAliases)
            .fallbackLanguage(WeDownloadConstants.defaultLanguage)
            .useSanitizeValueStrategy('escapeParameters');

        NotificationProvider.setOptions({
            delay: WeDownloadConstants.notificationInPageTimeout
        });
    }]);
}());

(function () {
    'use strict';

    angular.module('weDownload').factory('weDownloadLanguageLoader', ['$http', '$q', 'weDownloadConstants', 'weDownloadLanguages', 'weDownloadNotificationService', 'weDownloadLogService', 'weDownloadStorageService', function ($http, $q, weDownloadConstants, weDownloadLanguages, weDownloadNotificationService, weDownloadLogService, weDownloadStorageService) {
        var getKeyValuePair = function (line) {
            for (var i = 0; i < line.length; i++) {
                if (i > 0 && line.charAt(i - 1) !== '\\' && line.charAt(i) === '=') {
                    return {
                        key: line.substring(0, i).replace('\\=', '='),
                        value: line.substring(i + 1, line.length).replace('\\=', '=')
                    };
                }
            }

            return {
                value: line
            };
        };

        var getCategory = function (langObj, category) {
            var currentCategory = langObj;

            if (!category) {
                return currentCategory;
            }

            if (category[0] === '[' && category[category.length - 1] === ']') {
                category = category.substring(1, category.length - 1);
            }

            if (category === 'global') {
                return currentCategory;
            }

            var categoryNames = category.split('.');

            for (var i = 0; i < categoryNames.length; i++) {
                var categoryName = categoryNames[i];

                if (!currentCategory[categoryName]) {
                    currentCategory[categoryName] = {};
                }

                currentCategory = currentCategory[categoryName];
            }

            return currentCategory;
        };

        var getLanguageObject = function (languageContent) {
            var langObj = {};

            if (!languageContent) {
                return langObj;
            }

            var lines = languageContent.split('\n');
            var currentCatagory = langObj;

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];

                if (!line) {
                    continue;
                }

                line = line.replace('\r', '');

                if (/^\[.+\]$/.test(line)) {
                    currentCatagory = getCategory(langObj, line);
                    continue;
                }

                var pair = getKeyValuePair(line);

                if (pair && pair.key) {
                    currentCatagory[pair.key] = pair.value;
                }
            }

            return langObj;
        };

        return function (options) {
            var deferred = $q.defer();

            if (!weDownloadLanguages[options.key]) {
                deferred.reject(options.key);
                return deferred.promise;
            }

            var languageKey = weDownloadConstants.languageStorageKeyPrefix + '.' + options.key;
            var languageResource = weDownloadStorageService.get(languageKey);

            if (languageResource) {
                deferred.resolve(languageResource);
            }

            var languagePath = weDownloadConstants.languagePath + '/' + options.key + weDownloadConstants.languageFileExtension;

            $http({
                url: languagePath,
                method: 'GET'
            }).then(function onSuccess(response) {
                var languageObject = getLanguageObject(response.data);
                weDownloadStorageService.set(languageKey, languageObject);
                return deferred.resolve(languageObject);
            }).catch(function onError(response) {
                weDownloadLogService.warn('[weDownloadLanguageLoader] cannot get language resource');
                weDownloadNotificationService.notifyInPage('', 'WeDownload cannot get language resources, and will display in default language.', {
                    type: 'error',
                    delay: false
                });
                return deferred.reject(options.key);
            });

            return deferred.promise;
        };
    }]);
}());

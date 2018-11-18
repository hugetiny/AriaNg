(function () {
    'use strict';

    angular.module('weDownload').factory('weDownloadLocalizationService', ['$translate', 'amMoment', 'weDownloadCommonService', 'weDownloadNotificationService', function ($translate, amMoment, weDownloadCommonService, weDownloadNotificationService) {
        return {
            applyLanguage: function (lang) {
                $translate.use(lang);
                amMoment.changeLocale(lang);

                return true;
            },
            getLocalizedText: function (text, params) {
                return $translate.instant(text, params);
            },
            getLongDateFormat: function () {
                return this.getLocalizedText('format.longdate');
            },
            showDialog: function (title, text, type, callback) {
                if (title) {
                    title = this.getLocalizedText(title);
                }

                if (text) {
                    text = this.getLocalizedText(text);
                }

                var options = {
                    confirmButtonText: this.getLocalizedText('OK')
                };

                weDownloadCommonService.showDialog(title, text, type, callback, options);
            },
            showError: function (text, callback) {
                this.showDialog('Error', text, 'error', callback);
            },
            showOperationSucceeded: function (text, callback) {
                this.showDialog('Operation Succeeded', text, 'success', callback);
            },
            confirm: function (title, text, type, callback, notClose, extendSettings) {
                if (!extendSettings) {
                    extendSettings = {};
                }

                if (title) {
                    title = this.getLocalizedText(title);
                }

                if (text) {
                    text = this.getLocalizedText(text, extendSettings.textParams);
                }

                extendSettings.confirmButtonText = this.getLocalizedText('OK');
                extendSettings.cancelButtonText = this.getLocalizedText('Cancel');

                weDownloadCommonService.confirm(title, text, type, callback, notClose, extendSettings);
            },
            notifyViaBrowser: function (title, content, options) {
                if (title) {
                    title = this.getLocalizedText(title);
                }

                if (content) {
                    content = this.getLocalizedText(content);
                }

                return weDownloadNotificationService.notifyViaBrowser(title, content, options);
            },
            notifyInPage: function (title, content, options) {
                if (!options) {
                    options = {};
                }

                if (title) {
                    title = this.getLocalizedText(title, options.titleParams);
                }

                if (content) {
                    content = this.getLocalizedText(content, options.contentParams);
                }

                return weDownloadNotificationService.notifyInPage(title, content, options);
            },
            notifyTaskComplete: function (task) {
                this.notifyViaBrowser('Download Completed', (task && task.taskName ? task.taskName : ''));
            },
            notifyBtTaskComplete: function (task) {
                this.notifyViaBrowser('BT Download Completed', (task && task.taskName ? task.taskName : ''));
            },
            notifyTaskError: function (task) {
                this.notifyViaBrowser('Download Error', (task && task.taskName ? task.taskName : ''));
            }
        };
    }]);
}());

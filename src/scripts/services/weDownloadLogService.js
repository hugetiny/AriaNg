(function () {
    'use strict';

    angular.module('weDownload').factory('WeDownloadLogService', ['$log', 'WeDownloadConstants', function ($log, WeDownloadConstants) {
        var enableDebugLog = false;
        var cachedDebugLogs = [];

        var createNewCacheLogItem = function (msg, level, obj) {
            return {
                time: new Date(),
                level: level,
                content: msg,
                attachment: obj
            };
        };

        var pushLogToCache = function (msg, level, obj) {
            if (!enableDebugLog) {
                return;
            }

            if (cachedDebugLogs.length >= WeDownloadConstants.cachedDebugLogsLimit) {
                cachedDebugLogs.shift();
            }

            cachedDebugLogs.push(createNewCacheLogItem(msg, level, obj));
        };

        return {
            setEnableDebugLog: function (value) {
                enableDebugLog = value;
            },
            debug: function (msg, obj) {
                if (enableDebugLog) {
                    if (obj) {
                        $log.debug('[WeDownload Debug]' + msg, obj);
                    } else {
                        $log.debug('[WeDownload Debug]' + msg);
                    }

                    pushLogToCache(msg, 'DEBUG', obj);
                }
            },
            info: function (msg, obj) {
                if (obj) {
                    $log.info('[WeDownload Info]' + msg, obj);
                } else {
                    $log.info('[WeDownload Info]' + msg);
                }

                pushLogToCache(msg, 'INFO', obj);
            },
            warn: function (msg, obj) {
                if (obj) {
                    $log.warn('[WeDownload Warn]' + msg, obj);
                } else {
                    $log.warn('[WeDownload Warn]' + msg);
                }

                pushLogToCache(msg, 'WARN', obj);
            },
            error: function (msg, obj) {
                if (obj) {
                    $log.error('[WeDownload Error]' + msg, obj);
                } else {
                    $log.error('[WeDownload Error]' + msg);
                }

                pushLogToCache(msg, 'ERROR', obj);
            },
            getDebugLogs: function () {
                if (enableDebugLog) {
                    return cachedDebugLogs;
                } else {
                    return [];
                }
            }
        };
    }]);
}());

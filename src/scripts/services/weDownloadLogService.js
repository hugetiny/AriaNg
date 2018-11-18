(function () {
    'use strict';

    angular.module('weDownload').factory('weDownloadLogService', ['$log', 'weDownloadConstants', function ($log, weDownloadConstants) {
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

            if (cachedDebugLogs.length >= weDownloadConstants.cachedDebugLogsLimit) {
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
                        $log.debug('[weDownload Debug]' + msg, obj);
                    } else {
                        $log.debug('[weDownload Debug]' + msg);
                    }

                    pushLogToCache(msg, 'DEBUG', obj);
                }
            },
            info: function (msg, obj) {
                if (obj) {
                    $log.info('[weDownload Info]' + msg, obj);
                } else {
                    $log.info('[weDownload Info]' + msg);
                }

                pushLogToCache(msg, 'INFO', obj);
            },
            warn: function (msg, obj) {
                if (obj) {
                    $log.warn('[weDownload Warn]' + msg, obj);
                } else {
                    $log.warn('[weDownload Warn]' + msg);
                }

                pushLogToCache(msg, 'WARN', obj);
            },
            error: function (msg, obj) {
                if (obj) {
                    $log.error('[weDownload Error]' + msg, obj);
                } else {
                    $log.error('[weDownload Error]' + msg);
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

(function () {
    'use strict';

    angular.module('weDownload').constant('weDownloadConstants', {
        title: 'weDownload',
        appPrefix: 'weDownload',
        optionStorageKey: 'Options',
        languageStorageKeyPrefix: 'Language',
        settingHistoryKeyPrefix: 'History',
        languagePath: 'langs',
        languageFileExtension: '.txt',
        defaultLanguage: 'en',
        defaultHost: 'localhost',
        defaultSecureProtocol: 'https',
        defaultPathSeparator: '/',
        globalStatStorageCapacity: 120,
        taskStatStorageCapacity: 300,
        lazySaveTimeout: 500,
        errorTooltipDelay: 500,
        notificationInPageTimeout: 2000,
        historyMaxStoreCount: 10,
        cachedDebugLogsLimit: 100
    }).constant('weDownloadDefaultOptions', {
        language: 'en',
        title: '${downspeed}, ${upspeed} - ${title}',
        titleRefreshInterval: 5000,
        browserNotification: false,
        rpcAlias: '',
        rpcHost: '',
        rpcPort: '6800',
        rpcInterface: 'jsonrpc',
        protocol: 'http',
        httpMethod: 'POST',
        secret: '',
        extendRpcServers: [],
        globalStatRefreshInterval: 1000,
        downloadTaskRefreshInterval: 1000,
        rpcListDisplayOrder: 'recentlyUsed',
        afterCreatingNewTask: 'task-list',
        removeOldTaskAfterRetrying: false,
        afterRetryingTask: 'task-list-downloading',
        displayOrder: 'default:asc',
        fileListDisplayOrder: 'default:asc',
        peerListDisplayOrder: 'default:asc'
    });
}());

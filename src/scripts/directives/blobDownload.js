(function () {
    'use strict';

    angular.module('weDownload').directive('ngBlobDownload', ['WeDownloadFileService', function (WeDownloadFileService) {
        return {
            restrict: 'A',
            scope: {
                ngBlobDownload: '=ngBlobDownload',
                ngFileName: '@',
                ngContentType: '@'
            },
            link: function (scope, element) {
                scope.$watch('ngBlobDownload', function (value) {
                    if (value) {
                        WeDownloadFileService.saveFileContent(value, element, {
                            fileName: scope.ngFileName,
                            contentType: scope.ngContentType
                        });
                    }
                });
            }
        };
    }]);
}());

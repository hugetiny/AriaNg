(function () {
    'use strict';

    angular.module('weDownload').directive('ngBlobDownload', ['weDownloadFileService', function (weDownloadFileService) {
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
                        weDownloadFileService.saveFileContent(value, element, {
                            fileName: scope.ngFileName,
                            contentType: scope.ngContentType
                        });
                    }
                });
            }
        };
    }]);
}());

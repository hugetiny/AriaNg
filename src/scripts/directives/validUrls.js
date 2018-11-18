(function () {
    'use strict';

    angular.module('weDownload').directive('ngValidUrls', ['weDownloadCommonService', function (weDownloadCommonService) {
        var DIRECTIVE_ID = 'invalidUrls';

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                var handleChange = function (value) {
                    if (angular.isUndefined(value) || value === '') {
                        return;
                    }

                    var urls = weDownloadCommonService.parseUrlsFromOriginInput(value);
                    var valid = urls && urls.length > 0;

                    ngModel.$setValidity(DIRECTIVE_ID, valid);
                };

                scope.$watch(function () {
                    return ngModel.$viewValue;
                }, handleChange);
            }
        };
    }]);
}());

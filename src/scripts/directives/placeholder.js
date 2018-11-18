(function () {
    'use strict';

    angular.module('weDownload').directive('ngPlaceholder', function () {
        return {
            restrict: 'A',
            scope: {
                placeholder: '=ngPlaceholder'
            },
            link: function (scope, element) {
                scope.$watch('placeholder', function () {
                    element[0].placeholder = scope.placeholder;
                });
            }
        };
    });
}());

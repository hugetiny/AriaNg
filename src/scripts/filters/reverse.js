(function () {
    'use strict';

    angular.module('weDownload').filter('reverse', function () {
        return function(array) {
            if (!array) {
                return array;
            }

            return array.slice().reverse();
        };
    });
}());

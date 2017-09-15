'use strict';

/**
 * @ngdoc service
 * @name frontApp.httpProvider
 * @description
 * # httpProvider
 * Service in the frontApp.
 */
angular.module('frontApp')
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.withCredentials = true;
    }]);
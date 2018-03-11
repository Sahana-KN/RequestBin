'use strict';

/**
 * @ngdoc overview
 * @name requestBinApp
 * @description
 * # requestBinApp
 *
 * Main module of the application.
 */
 angular
    .module('requestBinApp', [
        'ngRoute'
    ])
    // Router
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

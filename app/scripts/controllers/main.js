'use strict';

/**
 * @ngdoc function
 * @name requestBinApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the requestBinApp
 */
angular.module('requestBinApp')
    .controller('MainCtrl', function($scope, RequestBinService) {
        $scope.url = '';
        $scope.submitRequest = function(method) {
            RequestBinService.submitRequest($scope.url, method).then(function(data) {
                console.log('data',data);
                $scope.requestBinForm.$setPristine();
            }, function(error) {
                console.log('error',error);
            })
        }
        // window.onbeforeunload = function(){
        //     console.log('onbeforeunload');
        //     RequestBinService.sendFinalJson();
        // }
    });

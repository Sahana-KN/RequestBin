'use strict';

/**
 * @ngdoc function
 * @name requestBinApp.service:RequestBinService
 * @description
 * # RequestBinService
 * Service of the requestBinApp
 */
angular.module('requestBinApp')
    .service('RequestBinService', function($http, $q) {
        var JSONobj = [];
        var requestBinUrl;
        var serviceObj = {
            submitRequest: function(url, method) {
                var deferred = $q.defer();
                var data;
                requestBinUrl = url;
                if(method === 'GET') {
                    url = url + '?foo=bar';
                } else {
                    data = {
                        "foo": "bar"
                    }
                }
                var sendTime = (new Date()).getTime();
                var receiveTime;
                $http({
                    url: url,
                    method: method,
                    data: data
                }).then(function(data) {
                    receiveTime = (new Date()).getTime();
                    deferred.resolve(data);
                    getResponseTime(sendTime, receiveTime, method, url);
                }, function(error) {
                    receiveTime = (new Date()).getTime();
                    deferred.reject(error);
                    getResponseTime(sendTime, receiveTime, method, url);
                });
                return deferred.promise;
            },
            sendFinalJson : function() {
                $http({
                    url: requestBinUrl,
                    method: 'POST',
                    data: JSONobj
                });
            }
        }
        window.onbeforeunload = function(){
            console.log('onbeforeunload');
            serviceObj.sendFinalJson();
        }

        function getResponseTime(sendTime, receiveTime, method, url) {
            var responseTime = receiveTime - sendTime;
            console.log(responseTime);
            JSONobj.push({
                "method" : method,
                "url" : url,
                "responseTime" : responseTime.toString()
            })
            console.log(JSONobj);
        }

        return serviceObj;
    })

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
                var headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                $http({
                    url: url,
                    method: method,
                    headers: headers,
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
                var headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                $http({
                    url: requestBinUrl,
                    method: 'POST',
                    headers: headers,
                    data: JSONobj
                });
            }
        }
        window.onbeforeunload = function(){
            serviceObj.sendFinalJson();
        }

        function getResponseTime(sendTime, receiveTime, method, url) {
            var responseTime = receiveTime - sendTime;
            JSONobj.push({
                "method" : method,
                "url" : url,
                "responseTime" : responseTime.toString()
            })
        }

        return serviceObj;
    })

'use strict';

/* Services */

var tpsServices = angular.module('tpsServices', ['ngResource']);

tpsServices.factory('Phone', ['$resource',
    function($resource){
        return $resource('http://192.168.50.4/app_dev.php/DSfKkyGMps8Nxb1Ve0k2hPA0TUhwEWt/api/match/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'listplaying'}, isArray:true}
        });
    }]);

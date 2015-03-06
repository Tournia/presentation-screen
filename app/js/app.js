'use strict';

/* App Module */

var apiKey = 'DSfKkyGMps8Nxb1Ve0k2hPA0TUhwEWt';
var apiUrl = 'http://192.168.50.4/app_dev.php/';
//var apiUrl = 'http://www.tournia.net/';

var tpsApp = angular.module('tpsApp', [
    'tpsControllers',
    'tpsServices',
    'ui.bootstrap'
]);
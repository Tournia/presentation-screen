'use strict';

/* Controllers */

var tpsControllers = angular.module('tpsControllers', []);

tpsControllers.controller('ScreenCtrl', ['$scope', 'ApiRequest', '$http', '$interval',
    function($scope, ApiRequest, $http, $interval) {
        //var currentMatches = ApiRequest.getCurrentMatches();
        //$scope.upcomingMatches = ApiRequest.getUpcomingMatches({}, { status:'ready', 'limit':25, 'startPos':0 });
        //$scope.playedMatches = ApiRequest.getLastMatches({}, { status:'played', 'limit':25, 'startPos':0 });

        var updateApi = function(){
            // current matches
            $http.get(apiUrl + apiKey + '/matches/listplaying', {cache: false})
            .success(function (data, status, headers, config) {
                // Process data
                angular.forEach(data, function (value, key) {
                    value.team1Txt = processTeamTxt(value.team1Players);
                    value.team2Txt = processTeamTxt(value.team2Players);
                    value.locationTxt = value.location.replace("Court ", "");
                });
                $scope.currentMatches = data;
            }).error(function (data, status, headers, config) {
                // Handle the error
            });

            // upcoming matches
            var upcomingData = {
                status: {'0': 'ready', '1': 'postponed'},
                limit: 25
            }
            $http.post(apiUrl + apiKey + '/matches/liststatus', upcomingData)
            .success(function (data, status, headers, config) {
                // Process data
                angular.forEach(data, function (value, key) {
                    var indexLastSpace = value.pool.lastIndexOf(" ");
                    value.poolTypeTxt = value.pool.substr(0, indexLastSpace);
                    value.poolLevelTxt = value.pool.substr(indexLastSpace + 1);
                    value.postponedBool = value.status == "Postponed";
                });
                $scope.upcomingMatches = data;
            }).error(function (data, status, headers, config) {
                // Handle the error
            });


            // played matches
            var playedData = {
                status: {'0': 'finished', '1': 'played'},
                limit: 25,
                sortOrder: 'DESC'
            }
            $http.post(apiUrl + apiKey + '/matches/liststatus', playedData)
            .success(function (data, status, headers, config) {
                // Process data
                var playedMatchesRes = [];
                angular.forEach(data, function (value, key) {
                    var indexLastSpace = value.pool.lastIndexOf(" ");
                    value.poolTypeTxt = value.pool.substr(0, indexLastSpace);
                    value.poolLevelTxt = value.pool.substr(indexLastSpace + 1);
                    value.scoreArray = value.score.split(" ");
                    playedMatchesRes.unshift(value);
                });
                $scope.playedMatches = playedMatchesRes;
            }).error(function (data, status, headers, config) {
                // Handle the error
            });
        };
        updateApi();
        $interval(updateApi, 20000);
    }]);

/**
 * Transform team object to string
 * @param teamObj
 * @returns {string}
 */
function processTeamTxt(teamObj) {
    var res = "";
    if (typeof teamObj != "undefined") {
        var i = 0;
        angular.forEach(teamObj, function(value, key) {
            if (i != 0) {
                res += "<br />";
            }
            res += value;

            i++;
        });
    }

    return res;
}
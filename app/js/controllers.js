'use strict';

/* Controllers */

var tpsControllers = angular.module('tpsControllers', []);

tpsControllers.controller('ScreenCtrl', ['$scope', 'ApiRequest', '$http',
    function($scope, ApiRequest, $http) {
        //var currentMatches = ApiRequest.getCurrentMatches();
        //$scope.upcomingMatches = ApiRequest.getUpcomingMatches({}, { status:'ready', 'limit':25, 'startPos':0 });
        //$scope.playedMatches = ApiRequest.getLastMatches({}, { status:'played', 'limit':25, 'startPos':0 });

        // current matches
        $http.get(apiUrl + apiKey +'/api/match/listplaying.json', {cache: false})
            .success(function(data, status, headers, config) {
                // Process data
                angular.forEach(data, function(value, key) {
                    value.team1Txt = processTeamTxt(value.team1Players);
                    value.team2Txt = processTeamTxt(value.team2Players);
                    value.locationTxt = value.location.replace("Court ", "");
                });
                $scope.currentMatches = data;
            }).error(function(data, status, headers, config) {
                // Handle the error
            });

        // upcoming matches
        var upcomingData = {
            status: {'0': 'ready', '1': 'postponed' },
            limit: 25
        }
        $http.post(apiUrl + apiKey +'/api/match/liststatus.json', upcomingData)
            .success(function(data, status, headers, config) {
                // Process data
                angular.forEach(data, function(value, key) {
                    var indexLastSpace = value.discipline.lastIndexOf(" ");
                    value.disciplineTypeTxt = value.discipline.substr(0, indexLastSpace);
                    value.disciplineLevelTxt = value.discipline.substr(indexLastSpace+1);
                });
                $scope.upcomingMatches = data;
            }).error(function(data, status, headers, config) {
                // Handle the error
            });


        // played matches
        var playedData = {
            status: {'0': 'finished', '1': 'played' },
            limit: 25
        }
        $http.post(apiUrl + apiKey +'/api/match/liststatus.json', playedData)
            .success(function(data, status, headers, config) {
                // Process data
                angular.forEach(data, function(value, key) {
                    var indexLastSpace = value.discipline.lastIndexOf(" ");
                    value.disciplineTypeTxt = value.discipline.substr(0, indexLastSpace);
                    value.disciplineLevelTxt = value.discipline.substr(indexLastSpace+1);
                    value.scoreArray = value.score.split(" ");
                });
                console.log(data);
                $scope.playedMatches = data;
            }).error(function(data, status, headers, config) {
                // Handle the error
            });
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
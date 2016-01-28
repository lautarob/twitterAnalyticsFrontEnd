'use strict';
/**
 * @ngdoc function
 * @name twitterApp.controller:ServerCtrl
 * @description
 * # ServerCtrl
 * Controller of the twitterApp
 */
angular.module('twitterApp')
  .controller('ServerCtrl',function ($scope, $http, serverInteractionService) {

    $scope.startService = function()
    {
        startService();
    }

    $scope.stopService = function () {
        stopService();
    }

    function startService() {
        var serviceSettings = $scope.filter;
        $.when(serverInteractionService.startService(Filter)).done(function(response){
            console.log("Server Started");
        });
    }

    function stopService() {
        $.when(serverInteractionService.stopService(Filter)).done(function(response){
            console.log("Server Stopped");
        });

    }

    function statusService() {
        $.when(serverInteractionService.statusService()).done(function(response){
            console.log("Server Stopped");
        });
    }

});
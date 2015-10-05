'use strict';
/**
 * @ngdoc function
 * @name twitterApp.controller:ServerCtrl
 * @description
 * # ServerCtrl
 * Controller of the twitterApp
 */
angular.module('twitterApp')
  .controller('ServerCtrl',function ($scope, $http) {

    $scope.startService = function()
    {
        startService();
    }

    $scope.stopService = function () {
        stopService();
    }


    function startService() {
        var serviceSettings = $scope.filter;
        var path = 'http://localhost:1337';
        $.when(
        $.ajax({
            type: 'POST',
            data: serviceSettings,
            contentType: 'application/json',
            url: path + '/start',
            success: function (response) {


            },
            fail: function()
            {

            }

        }));

    }

    function stopService() {
        var path = 'http://localhost:1337';
        $.when(
        $.ajax({
            type: 'POST',
            url: path + '/stop',
            success: function (response) {


            },
            fail: function()
            {

            }

        }));

    }

    function statusService() {
        var path = 'http://localhost:1337';
        $.ajax({
            type: 'GET',
            url: path + '/status',
            contentType: 'application/json',
            success: function (response) {

            },
            fail: function()
            {

            }
        });
    }

});
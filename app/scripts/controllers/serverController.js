'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:ServerCtrl
 * @description
 * # ServerCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ServerCtrl',function ($scope, $http) {

    var filterTopics = [];
  
    var id = 1;

    function addItem(id,topic) {
        return {
            id: id,
            filterTopic: topic
        }
    }

    $scope.rowCollection = [];

  

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);

    //add to the real data holder
    $scope.addNewItem = function addNewItem() {
        $scope.rowCollection.push(addItem(id,$scope.filter));
        id++;
        $scope.displayedCollection = [].concat($scope.rowCollection);

        $scope.filter = '';

    };

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
            $scope.displayedCollection = [].concat($scope.rowCollection);

        }
    }
   

    $scope.startService = function()
    {
        startService();
    }

    $scope.stopService = function () {
        stopService();
    }


    function startService() {
        var filters = [];
        for (var i = 0; i < $scope.rowCollection.length;i++)
        {
            filters.push($scope.rowCollection[i].filterTopic);
        }
        var Filter = { FilterTweets: filters }
        var path = 'http://localhost:7490';
        $.when(
        $.ajax({
            type: 'POST',
            data: JSON.stringify(Filter),
            contentType: 'application/json',
            url: path + '/api/TwitterStreaming/Start'
        }));

    }

    function stopService() {
        var path = 'http://localhost:7490';
        $.when(
        $.ajax({
            type: 'GET',
            url: path + '/api/TwitterStreaming/Stop'
        }));

    }

    function statusService() {
        var path = 'http://localhost:7490';
        $.ajax({
            type: 'GET',
            url: path + '/api/TwitterStreaming/Status',
            contentType: 'application/json',
            success: function (status) {

            },
            fail: function()
            {

            }
        });
    }

});
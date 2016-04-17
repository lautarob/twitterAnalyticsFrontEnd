'use strict';
/**
 * @ngdoc function
 * @name twitterApp.service:queryService
 * @description
 * # queryService
 * Service of the twitterApp
 */
angular.module('twitterApp')
  .factory('serverInteractionService', function($http,config) {
     return {
      startService: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          data: Filter,
          contentType: 'application/json',
          url: config.STREAMING_SERVER + '/start'
        })
      },

      setItemsToTrain: function(){
        return $.ajax(
        {
          type: 'POST',
          url: config.STREAMING_SERVER + '/setItemsToTrain'
        })
      },

      getTrained: function(){
        return $.ajax(
        {
          type: 'GET',
          url: config.STREAMING_SERVER + '/getTrained'
        })
      },

      stopService: function() {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          contentType: 'application/json',
          url: config.STREAMING_SERVER + '/stop'
        })
      },

      serverRunning: function() {
      //return the promise directly.
        return $.ajax(
        {
          type: 'GET',
          url: config.STREAMING_SERVER + '/serverRunning'
        })
      }

    }
});


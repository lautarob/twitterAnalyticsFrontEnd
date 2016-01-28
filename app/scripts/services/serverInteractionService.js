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

      stopService: function() {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          contentType: 'application/json',
          url: config.STREAMING_SERVER + '/stop'
        })
      },

      statusService: function() {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          contentType: 'application/json',
          url: config.STREAMING_SERVER + '/stop'
        })
      }

    }
});


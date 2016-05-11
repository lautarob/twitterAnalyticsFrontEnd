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
      startStreamingService: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          data: Filter,
          contentType: 'application/json',
          url: config.STREAMING_SERVER + '/startStreaming'
        })
      },

      startStreamingAndClassificationService: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          data: Filter,
          contentType: 'application/json',
          url: config.STREAMING_SERVER + '/startStreamingAndClassification'
        })
      },

      train: function(algorithm) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          data: { algorithm: algorithm },
          dataType: 'json',
          url: config.STREAMING_SERVER + '/train'
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

      getTrainedByAlgorithm: function(algorithm) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          data: { algorithm: algorithm }, 
          dataType: 'json',
          url: config.STREAMING_SERVER + '/getTrainedByAlgorithm'
        })
      }

    }
});


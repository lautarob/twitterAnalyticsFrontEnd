'use strict';
/**
 * @ngdoc function
 * @name twitterApp.service:queryService
 * @description
 * # queryService
 * Service of the twitterApp
 */
angular.module('twitterApp')
  .factory('queryService', function($http,config) {
     return {
      getStatsByTopicsDated: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: config.QUERIES_SERVER + '/stats/statsByTopics',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByTopicsAndMonth: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: config.QUERIES_SERVER + '/stats/statsByTopicsAndMonth',
          data: JSON.stringify(Filter),
          contentType: 'application/json',
        })
      },

      getStatsByHashTagsDated: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: config.QUERIES_SERVER + '/stats/statsByHashTags',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByHashTagsAndMonth: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: config.QUERIES_SERVER + '/stats/statsByHashTagsAndMonth',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByUsersDated: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: config.QUERIES_SERVER + '/stats/statsByUsers',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByUsersAndMonth: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: config.QUERIES_SERVER + '/stats/statsByUsersAndMonth',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByPersonsDated: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: config.QUERIES_SERVER + '/stats/statsByPersons',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByPersonsAndMonth: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: config.QUERIES_SERVER + '/stats/statsByPersonsAndMonth',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByWeek: function(Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: config.QUERIES_SERVER + '/stats/maxStatsByDay',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      }

    }
});


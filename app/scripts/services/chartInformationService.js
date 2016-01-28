'use strict';
/**
 * @ngdoc function
 * @name twitterApp.service:ChartInformationService
 * @description
 * # chartInformationService
 * Service of the twitterApp
 */
angular.module('twitterApp')
  .factory('chartInformationService', function($http) {
     return {
      getStatsByTopicsDated: function(path,Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: path + '/stats/statsByTopics',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByTopicsAndMonth: function(path,Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: path + '/stats/statsByTopicsAndMonth',
          data: JSON.stringify(Filter),
          contentType: 'application/json',
        })
      },

      getStatsByHashTagsDated: function(path,Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: path + '/stats/statsByHashTags',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByHashTagsAndMonth: function(path,Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: path + '/stats/statsByHashTagsAndMonth',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByUsersDated: function(path,Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: path + '/stats/statsByUsers',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByUsersAndMonth: function(path,Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: path + '/stats/statsByUsersAndMonth',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByPersonsDated: function(path,Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: path + '/stats/statsByPersons',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByPersonsAndMonth: function(path,Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: path + '/stats/statsByPersonsAndMonth',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      },

      getStatsByWeek: function(path,Filter) {
      //return the promise directly.
        return $.ajax(
        {
          type: 'POST',
          url: path + '/stats/maxStatsByDay',
          data: JSON.stringify(Filter),
          contentType: 'application/json'
        })
      }

    }
});


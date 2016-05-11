'use strict';
/**
 * @ngdoc function
 * @name twitterApp.service:tableService
 * @description
 * # tableService
 * Service of the twitterApp
 */
angular.module('twitterApp')
  .factory('tweetPanelService', function($http,config) {
     return {
        loadData: function(filter) {
          var d = $.Deferred();
          $.ajax({
            type: "GET",
            url: config.QUERIES_SERVER + "/tweetsprocessed",
            data: filter,
            dataType: "json"
          }).done(function(response){
              d.resolve(response  );
            });
 
          return d.promise();
        },
        
        insertItem: function(item) {
            return $.ajax({
                type: "POST",
                url: "/items",
                data: item,
                dataType: "json"
            });
        },
        
        updateItem: function(item) {
            return $.ajax({
                type: "PUT",
                url: config.QUERIES_SERVER + "/tweetsprocessed",
                data: item,
                dataType: "json"
            });
        },
        
        deleteItem: function(item) {
            return $.ajax({
                type: "DELETE",
                url: config.QUERIES_SERVER + "/items",
                data: item,
                dataType: "json"
            });
        }
    }
});


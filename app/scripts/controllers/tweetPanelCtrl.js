'use strict';
/**
 * @ngdoc function
 * @name twitterApp.controller:TweetPanelCtrl
 * @description
 * # TweetPanelCtrl
 * Controller of the twitterApp
 */
angular.module('twitterApp')
  .controller('TweetPanelCtrl', function ($scope, $http,tweetPanelService) {

        angular.element(document).ready(function () {

            $("#tweetsProcessed-table").jsGrid({
                width: "100%",
                height: "500",
             
                filtering: true,
                sorting: true,
                paging: true,
                editing:true,
                autoload: true,
         
                pageSize: 15,
                pageButtonCount: 5,

                controller: tweetPanelService,
       
                fields: [
                    { name: "topics", type: "text", width: 100, editing: false, title: "Topics", css:"grid-cell-normal" },
                    { name: "entities", type: "text", width: 100, editing: false, title: "Entities", css:"grid-cell-normal"  },
                    { name: "keyWords", type: "text", width: 100, editing: false, title: "KeyWords", css:"grid-cell-normal" },
                    { name: "originalText", type: "text", width: 100, editing: false, title: "Text", css:"grid-cell-normal" },
                    { name: "principal_topic", type: "text", width: 100, editing: true, title: "Principal Topic", css:"grid-cell-normal" },
                    { name: "to_train", type: "checkbox", width: 75, editing: true, title: "To Train", css:"grid-cell-normal" },
                    { type: "control", width: 75, deleteButton: true }

                ]
            });

        });


        $scope.waitingDialog = (function ($) {

            // Creating modal dialog's DOM
            var $dialog = $(
                '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
                '<div class="modal-dialog modal-m">' +
                '<div class="modal-content">' +
                    '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
                    '<div class="modal-body">' +
                        '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
                    '</div>' +
                '</div></div></div>');

            return {
                show: function (message, options) {
                    // Assigning defaults
                    var settings = $.extend({
                        dialogSize: 'm',
                        progressType: ''
                    }, options);
                    if (typeof message === 'undefined') {
                        message = 'Loading';
                    }
                    if (typeof options === 'undefined') {
                        options = {};
                    }
                    // Configuring dialog
                    $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
                    $dialog.find('.progress-bar').attr('class', 'progress-bar');
                    if (settings.progressType) {
                        $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
                    }
                    $dialog.find('h3').text(message);
                    // Opening dialog
                    $dialog.modal();
                },
                /**
                 * Closes dialog
                 */
                hide: function () {
                    $dialog.modal('hide');
                }
            }

        })(jQuery);
});
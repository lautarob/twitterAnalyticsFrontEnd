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

    angular.element(document).ready(function () {
        $("[name='serverStatus']").bootstrapSwitch({
          onText: 'Running',
          offText: 'Stopped',
          readOnly: true,
          labelText: 'Server Status'
        });
        serverRunning()
        setInterval(function(){
            serverRunning()
        },5000);
    });

    $scope.startService = function()
    {
        startService();
        $scope.trainingDialog.show();
        var refreshIntervalId = setInterval(function(){$.when(serverInteractionService.getTrained()).done(function(response){
            if(response){
                clearInterval(refreshIntervalId);
                $scope.trainingDialog.hide();
            }
        })}, 5000);
        serverRunning();

    }

    $scope.stopService = function () {
        stopService();
        serverRunning();

    }


    function startService() {
        var serviceSettings = $scope.filter;
        $.when(serverInteractionService.setItemsToTrain()).done(function(response){
            console.log("Items Trained");
            $.when(serverInteractionService.startService(serviceSettings)).done(function(response){
                console.log("Server Started");
            });
        });
    }

    function stopService() {
        $.when(serverInteractionService.stopService(serviceSettings)).done(function(response){
            console.log("Server Stopped");
        });

    }

    function serverRunning() {
        $.when(serverInteractionService.serverRunning()).done(function(response){
            if(response){
                $("[name='serverStatus']").bootstrapSwitch('readonly', false);
                $("[name='serverStatus']").bootstrapSwitch('state', true);
                $("[name='serverStatus']").bootstrapSwitch('readonly', true);
            }else{
                $("[name='serverStatus']").bootstrapSwitch('readonly', false);
                $("[name='serverStatus']").bootstrapSwitch('state', false);
                $("[name='serverStatus']").bootstrapSwitch('readonly', true);
            }
        });
    }

    $scope.trainingDialog = (function ($) {

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
                    message = 'Training Algorithm...';
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
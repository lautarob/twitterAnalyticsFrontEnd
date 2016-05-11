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
        $("[name='svmTrained']").bootstrapSwitch({
          onText: 'Yes',
          offText: 'No',
          readOnly: true,
          labelText: 'SVM Trained',
          size: "large"
        });
        $("[name='naiveBayesTrained']").bootstrapSwitch({
          onText: 'Yes',
          offText: 'No',
          readOnly: true,
          labelText: 'NB Trained',
          size: "large"
        });
        $('#svmTrainButton').on('click', function(event) {
          train("SVM");
        });
        $('#naiveBayesTrainButton').on('click', function(event) {
          train("NaiveBayes");
        });

        checkTrainings();
    });

    $scope.startStreamingAndClassificationService = function()
    {
        startStreamingAndClassificationService();
    }

    $scope.startStreamingService = function()
    {
        startStreamingService();
    }

    $scope.stopService = function () {
        stopService();
    }

    function train(algorithm) {
        $.when(serverInteractionService.setItemsToTrain()).done(function(response){
            $.when(serverInteractionService.train(algorithm)).done(function(response){
                console.log(algorithm+" trained");
                checkTrainings();
            });
        });
    }

    function startStreamingAndClassificationService() {
        var serviceSettings = $scope.filter;
        if(JSON.parse($scope.filter).algorithm == "KNN"){
            $.when(serverInteractionService.setItemsToTrain()).done(function(response){
                $.when(serverInteractionService.startStreamingAndClassificationService(serviceSettings)).done(function(response){
                    console.log("Server Started");
                });
            });
        }else{
            $.when(serverInteractionService.startStreamingAndClassificationService(serviceSettings)).done(function(response){
                console.log("Server Started");
            });
        }
        
    }

    function startStreamingService() {
        var serviceSettings = $scope.filter;
        $.when(serverInteractionService.startStreamingService(serviceSettings)).done(function(response){
            console.log("Server Started");
        });
    }

    function stopService() {
        $.when(serverInteractionService.stopService()).done(function(response){
            console.log("Server Stopped");
        });
    }

    function checkTrainings() {
        $.when(serverInteractionService.getTrainedByAlgorithm("SVM")).done(function(response){
            if(response){
                $("[name='svmTrained']").bootstrapSwitch('readonly', false);
                $("[name='svmTrained']").bootstrapSwitch('state', true);
                $("[name='svmTrained']").bootstrapSwitch('readonly', true);
            }else{
                $("[name='svmTrained']").bootstrapSwitch('readonly', false);
                $("[name='svmTrained']").bootstrapSwitch('state', false);
                $("[name='svmTrained']").bootstrapSwitch('readonly', true);
            }
        });
        $.when(serverInteractionService.getTrainedByAlgorithm("NaiveBayes")).done(function(response){
            if(response){
                $("[name='naiveBayesTrained']").bootstrapSwitch('readonly', false);
                $("[name='naiveBayesTrained']").bootstrapSwitch('state', true);
                $("[name='naiveBayesTrained']").bootstrapSwitch('readonly', true);
            }else{
                $("[name='naiveBayesTrained']").bootstrapSwitch('readonly', false);
                $("[name='naiveBayesTrained']").bootstrapSwitch('state', false);
                $("[name='naiveBayesTrained']").bootstrapSwitch('readonly', true);
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
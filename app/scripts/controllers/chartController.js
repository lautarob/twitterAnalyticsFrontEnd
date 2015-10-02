'use strict';
/**
 * @ngdoc function
 * @name twitterApp.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the twitterApp
 */
angular.module('twitterApp')
  .controller('ChartCtrl', function ($scope, $http) {

        angular.element(document).ready(function () {
            var now = moment();
            var nowPlus = moment().add(15,'days');

            CheckScopeBeforeApply();
        });

        function CheckScopeBeforeApply() {
            if(!$scope.$$phase) {
                 $scope.$apply();
            }
        };

        // Attributes //
        $scope.datePickers = {
            dateFromCountry: false,
            dateToCountry: false,
            dateFromTopic: false,
            dateFromTopic: false,
            dateFromUser: false,
            dateToUser: false,
            dateFromCountryTopic: false,
            dateToCountryTopic: false,
            dateFromDated: false,
            dateToDated: false
        }

        $scope.datePickersDates =
        {
            dateFromCountry: moment().format('MM-DD-YYYY'),
            dateToCountry: moment().add(15,'days').format('MM-DD-YYYY'),
            dateFromTopic: moment().format('MM-DD-YYYY'),
            dateToTopic: moment().add(15, 'days').format('MM-DD-YYYY'),
            dateFromUser: moment().format('MM-DD-YYYY'),
            dateToUser: moment().add(15, 'days').format('MM-DD-YYYY'),
            dateFromCountryTopic: moment().format('MM-DD-YYYY'),
            dateToCountryTopic: moment().add(15, 'days').format('MM-DD-YYYY'),
            dateFromDated: moment().format('MM-DD-YYYY'),
            dateToDated: moment().add(15, 'days').format('MM-DD-YYYY')
        }

        $scope.formats = ['MM-dd-yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        // Defined Functions //

        $scope.open = function ($event,datePicker) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.datePickers[datePicker] = !$scope.datePickers[datePicker];
        };

        $scope.refreshCountry = function()
        {
            $scope.waitingDialog.show();
            setTimeout(function () {
                getBarchartByCountryDated();
            }, 1000);
        }

        $scope.refreshUser = function () {
            $scope.waitingDialog.show();
            setTimeout(function () {
                getBarchartByUserDated();
            }, 1000);
        }

        $scope.refreshTopic = function () {
            $scope.waitingDialog.show();
            setTimeout(function () {
                getStatsByTopicsAndMonth();
            }, 1000);
        }

        $scope.refreshCountryTopic = function()
        {
            $scope.waitingDialog.show();
            setTimeout(function () {
                getBarchartByCountryAndTopicsDated();
            }, 1000);
        }

        $scope.refreshDated = function()
        {
            $scope.waitingDialog.show();
            setTimeout(function () {
                getBarchartByDated();
            }, 1000);
        }

        function getStatsByTopicsDated() {

            var Filter = { dateFrom: $scope.datePickersDates.dateFromTopic, dateTo: $scope.datePickersDates.dateToTopic }
            var path = 'http://localhost:1338';

            $.when($.ajax({
                      type: 'POST',
                      url: path + '/stats/statsByTopics',
                      data: JSON.stringify(Filter),
                      contentType: 'application/json',
                      success: function (results) {

                        var labelsTopics = [];
                        var dataCountTopics = [];

                        if(results.length > 0){
                            for ( var i = 0, l = 10; i < l; i++ ){
                                labelsTopics.push(results[i]["_id"]);
                                dataCountTopics.push(results[i]["count"]);
                            };
                        }

                        var ctx = $("#topicsBarChart").get(0).getContext("2d");
                        var ctx2 = $("#topicsRadarChart").get(0).getContext("2d");



                        var data = {
                                labels: labelsTopics,
                                datasets: [
                                    {
                                        label: "My First dataset",
                                        fillColor: "rgba(151,187,205,0.5)",
                                        strokeColor: "rgba(151,187,205,0.8)",
                                        highlightFill: "rgba(151,187,205,0.75)",
                                        highlightStroke: "rgba(151,187,205,1)",
                                        data: dataCountTopics
                                    }
                                ]
                        };

                        var data2 = {
                            labels: labelsTopics,
                            datasets: [
                                {
                                    label: "My Second dataset",
                                    fillColor: "rgba(151,187,205,0.2)",
                                    strokeColor: "rgba(151,187,205,1)",
                                    pointColor: "rgba(151,187,205,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(151,187,205,1)",
                                    data: dataCountTopics
                                }
                            ]
                        };


                        var topicsBarChart = new Chart(ctx).Bar(data, {});
                        var topicsRadarChart = new Chart(ctx2).Radar(data2, {});




                          $scope.$apply();

                      }
            })).always(function ()
            {
                $scope.waitingDialog.hide();
            })
        }

        function getStatsByTopicsAndMonth() {

            var Filter = { dateFrom: $scope.datePickersDates.dateFromTopic, dateTo: $scope.datePickersDates.dateToTopic }
            var path = 'http://localhost:1338';

            $.when($.ajax({
                      type: 'POST',
                      url: path + '/stats/statsByTopicsAndMonth',
                      data: JSON.stringify(Filter),
                      contentType: 'application/json',
                      success: function (results) {

                        var labelsTopics = [];
                        var dataCountTopics = [];

                        if(results.length > 0){
                            for ( var i = 0, l = results.length; i < l; i++ ){
                                var index = 0;
                                index += labelsTopics.indexOf(results[i]["_id"]["topic"])
                                if(index != -1)
                                {
                                    dataCountTopics[index][parseInt(results[i]["_id"]["month"])-1] = results[i]["count"];
                                }
                                else
                                {
                                    labelsTopics.push(results[i]["_id"]["topic"]);
                                    var dataNew = [0,0,0,0,0,0,0,0,0,0,0,0];
                                    dataNew[parseInt(results[i]["_id"]["month"])-1] = results[i]["count"];
                                    dataCountTopics.push(dataNew);
                                }
                            };
                        }

                        var topTopics = labelsTopics.slice(0,4);
                        var topData = dataCountTopics.slice(0,4);

                        var topDatasets = [];

                        for ( var i = 0, l = topTopics.length; i < l; i++ ){

                            topDatasets.push(
                                    {
                                        label: topTopics[i],
                                        fillColor: "rgba(151,187,205,0.2)",
                                        strokeColor: "rgba(151,187,205,1)",
                                        pointColor: "rgba(151,187,205,1)",
                                        pointStrokeColor: "#fff",
                                        pointHighlightFill: "#fff",
                                        pointHighlightStroke: "rgba(151,187,205,1)",
                                        data: topData[i]
                                    }
                                );

                        }



                        var ctx = $("#topicsLineChart").get(0).getContext("2d");

                        var data = {
                                labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
                                datasets: topDatasets
                        };

                        var topicsLineChart = new Chart(ctx).Line(data, {});

                          $scope.$apply();

                      }
            })).always(function ()
            {
                $scope.waitingDialog.hide();
            })
        }

        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }


           /**
         * Module for displaying "Waiting for..." dialog using Bootstrap
         *
         * @author Eugene Maslovich <ehpc@em42.ru>
         */

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
                /**
                 * Opens our dialog
                 * @param message Custom message
                 * @param options Custom options:
                 *                options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
                 *                options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
                 */
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
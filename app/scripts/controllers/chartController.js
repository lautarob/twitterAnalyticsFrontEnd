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
            dateToTopic: false,
            dateFromHashTag: false,
            dateToHashTag: false,
            dateFromUser: false,
            dateToUser: false,
            dateFromCountryTopic: false,
            dateToCountryTopic: false,
            dateFromDated: false,
            dateToDated: false,
            dateFromPersons: false,
            dateToPersons: false
        }

        $scope.datePickersDates =
        {
            dateFromCountry: moment().format('MM-DD-YYYY'),
            dateToCountry: moment().add(15,'days').format('MM-DD-YYYY'),
            dateFromTopic: moment().format('MM-DD-YYYY'),
            dateToTopic: moment().add(15, 'days').format('MM-DD-YYYY'),
            dateFromHashTag: moment().format('MM-DD-YYYY'),
            dateToHashTag: moment().add(15, 'days').format('MM-DD-YYYY'),
            dateFromUser: moment().format('MM-DD-YYYY'),
            dateToUser: moment().add(15, 'days').format('MM-DD-YYYY'),
            dateFromCountryTopic: moment().format('MM-DD-YYYY'),
            dateToCountryTopic: moment().add(15, 'days').format('MM-DD-YYYY'),
            dateFromDated: moment().format('MM-DD-YYYY'),
            dateToDated: moment().add(15, 'days').format('MM-DD-YYYY'),
            dateFromPersons: moment().format('MM-DD-YYYY'),
            dateToPersons: moment().add(15, 'days').format('MM-DD-YYYY')
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
                getStatsByUsersDated();
                getStatsByUsersAndMonth();
            }, 1000);
        }

        $scope.refreshTopic = function () {
            $scope.waitingDialog.show();
            setTimeout(function () {
                getStatsByTopicsAndMonth();
                getStatsByTopicsDated();
            }, 1000);
        }

        $scope.refreshHashTag = function () {
            $scope.waitingDialog.show();
            setTimeout(function () {
                getStatsByHashTagsAndMonth();
                getStatsByHashTagsDated();
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
                getStatsByTopicsDated();
            }, 1000);
        }

        $scope.refreshPersons = function()
        {
            $scope.waitingDialog.show();
            setTimeout(function () {
                getStatsByPersonsAndMonth();
                getStatsByPersonsDated();
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
                                        label: "Topics Bar chart data set",
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
                                    label: "Topics Radar chart data set",
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

        function getStatsByHashTagsDated() {

            var Filter = { dateFrom: $scope.datePickersDates.dateFromHashTag, dateTo: $scope.datePickersDates.dateToHashTag }
            var path = 'http://localhost:1338';

            $.when($.ajax({
                      type: 'POST',
                      url: path + '/stats/statsByHashTags',
                      data: JSON.stringify(Filter),
                      contentType: 'application/json',
                      success: function (results) {

                        var labelsHashTags = [];
                        var dataCountHashTags = [];

                        if(results.length > 0){
                            for ( var i = 0, l = 10; i < l; i++ ){
                                labelsHashTags.push(results[i]["_id"]);
                                dataCountHashTags.push(results[i]["count"]);
                            };
                        }

                        var ctx = $("#hashTagsBarChart").get(0).getContext("2d");
                        var ctx2 = $("#hashTagsRadarChart").get(0).getContext("2d");



                        var data = {
                                labels: labelsHashTags,
                                datasets: [
                                    {
                                        label: "HashTags Bar chart data set",
                                        fillColor: "rgba(151,187,205,0.5)",
                                        strokeColor: "rgba(151,187,205,0.8)",
                                        highlightFill: "rgba(151,187,205,0.75)",
                                        highlightStroke: "rgba(151,187,205,1)",
                                        data: dataCountHashTags
                                    }
                                ]
                        };

                        var data2 = {
                            labels: labelsHashTags,
                            datasets: [
                                {
                                    label: "HashTags Radar chart data set",
                                    fillColor: "rgba(151,187,205,0.2)",
                                    strokeColor: "rgba(151,187,205,1)",
                                    pointColor: "rgba(151,187,205,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(151,187,205,1)",
                                    data: dataCountHashTags
                                }
                            ]
                        };


                        var hashTagsBarChart = new Chart(ctx).Bar(data, {});
                        var hashTagsRadarChart = new Chart(ctx2).Radar(data2, {});




                          $scope.$apply();

                      }
            })).always(function ()
            {
                $scope.waitingDialog.hide();
            })
        }

        function getStatsByHashTagsAndMonth() {

            var Filter = { dateFrom: $scope.datePickersDates.dateFromHashTag, dateTo: $scope.datePickersDates.dateToHashTag }
            var path = 'http://localhost:1338';

            $.when($.ajax({
                      type: 'POST',
                      url: path + '/stats/statsByHashTagsAndMonth',
                      data: JSON.stringify(Filter),
                      contentType: 'application/json',
                      success: function (results) {

                        var labelsHashTags = [];
                        var dataCountHashTags = [];

                        if(results.length > 0){
                            for ( var i = 0, l = results.length; i < l; i++ ){
                                var index = 0;
                                index += labelsHashTags.indexOf(results[i]["_id"]["hashTag"])
                                if(index != -1)
                                {
                                    dataCountHashTags[index][parseInt(results[i]["_id"]["month"])-1] = results[i]["count"];
                                }
                                else
                                {
                                    labelsHashTags.push(results[i]["_id"]["hashTag"]);
                                    var dataNew = [0,0,0,0,0,0,0,0,0,0,0,0];
                                    dataNew[parseInt(results[i]["_id"]["month"])-1] = results[i]["count"];
                                    dataCountHashTags.push(dataNew);
                                }
                            };
                        }

                        var topHashTags = labelsHashTags.slice(0,4);
                        var topData = dataCountHashTags.slice(0,4);

                        var topDatasets = [];

                        for ( var i = 0, l = topHashTags.length; i < l; i++ ){

                            topDatasets.push(
                                    {
                                        label: topHashTags[i],
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



                        var ctx = $("#hashTagsLineChart").get(0).getContext("2d");

                        var data = {
                                labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
                                datasets: topDatasets
                        };

                        var hashTagsLineChart = new Chart(ctx).Line(data, {});

                          $scope.$apply();

                      }
            })).always(function ()
            {
                $scope.waitingDialog.hide();
            })
        }


        function getStatsByUsersDated() {

            var Filter = { dateFrom: $scope.datePickersDates.dateFromUser, dateTo: $scope.datePickersDates.dateToUser }
            var path = 'http://localhost:1338';

            $.when($.ajax({
                      type: 'POST',
                      url: path + '/stats/statsByUsers',
                      data: JSON.stringify(Filter),
                      contentType: 'application/json',
                      success: function (results) {

                        var labelsUsers = [];
                        var dataCountUsers = [];

                        if(results.length > 0){
                            for ( var i = 0, l = 10; i < l; i++ ){
                                labelsUsers.push(results[i]["_id"]);
                                dataCountUsers.push(results[i]["count"]);
                            };
                        }

                        var ctx = $("#usersBarChart").get(0).getContext("2d");
                        var ctx2 = $("#usersRadarChart").get(0).getContext("2d");



                        var data = {
                                labels: labelsUsers,
                                datasets: [
                                    {
                                        label: "Users Bar chart data set",
                                        fillColor: "rgba(151,187,205,0.5)",
                                        strokeColor: "rgba(151,187,205,0.8)",
                                        highlightFill: "rgba(151,187,205,0.75)",
                                        highlightStroke: "rgba(151,187,205,1)",
                                        data: dataCountUsers
                                    }
                                ]
                        };

                        var data2 = {
                            labels: labelsUsers,
                            datasets: [
                                {
                                    label: "Users Radar chart data set",
                                    fillColor: "rgba(151,187,205,0.2)",
                                    strokeColor: "rgba(151,187,205,1)",
                                    pointColor: "rgba(151,187,205,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(151,187,205,1)",
                                    data: dataCountUsers
                                }
                            ]
                        };


                        var usersBarChart = new Chart(ctx).Bar(data, {});
                        var usersRadarChart = new Chart(ctx2).Radar(data2, {});




                          $scope.$apply();

                      }
            })).always(function ()
            {
                $scope.waitingDialog.hide();
            })
        }

        function getStatsByUsersAndMonth() {

            var Filter = { dateFrom: $scope.datePickersDates.dateFromUser, dateTo: $scope.datePickersDates.dateToUser }
            var path = 'http://localhost:1338';

            $.when($.ajax({
                      type: 'POST',
                      url: path + '/stats/statsByUsersAndMonth',
                      data: JSON.stringify(Filter),
                      contentType: 'application/json',
                      success: function (results) {

                        var labelsUsers = [];
                        var dataCountUsers = [];

                        if(results.length > 0){
                            for ( var i = 0, l = results.length; i < l; i++ ){
                                var index = 0;
                                index += labelsUsers.indexOf(results[i]["_id"]["user"])
                                if(index != -1)
                                {
                                    dataCountUsers[index][parseInt(results[i]["_id"]["month"])-1] = results[i]["count"];
                                }
                                else
                                {
                                    labelsUsers.push(results[i]["_id"]["user"]);
                                    var dataNew = [0,0,0,0,0,0,0,0,0,0,0,0];
                                    dataNew[parseInt(results[i]["_id"]["month"])-1] = results[i]["count"];
                                    dataCountUsers.push(dataNew);
                                }
                            };
                        }

                        var topUsers = labelsUsers.slice(0,4);
                        var topData = dataCountUsers.slice(0,4);

                        var topDatasets = [];

                        for ( var i = 0, l = topUsers.length; i < l; i++ ){

                            topDatasets.push(
                                    {
                                        label: topUsers[i],
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



                        var ctx = $("#usersLineChart").get(0).getContext("2d");

                        var data = {
                                labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
                                datasets: topDatasets
                        };

                        var usersLineChart = new Chart(ctx).Line(data, {});

                          $scope.$apply();

                      }
            })).always(function ()
            {
                $scope.waitingDialog.hide();
            })
        }



        function getStatsByPersonsDated() {

            var Filter = { dateFrom: $scope.datePickersDates.dateFromPersons, dateTo: $scope.datePickersDates.dateToPersons }
            var path = 'http://localhost:1338';

            $.when($.ajax({
                      type: 'POST',
                      url: path + '/stats/statsByPersons',
                      data: JSON.stringify(Filter),
                      contentType: 'application/json',
                      success: function (results) {

                        var labelsPersons = [];
                        var dataCountPersons = [];

                        if(results.length > 0){
                            for ( var i = 0, l = 10; i < l; i++ ){
                                labelsPersons.push(results[i]["_id"]);
                                dataCountPersons.push(results[i]["count"]);
                            };
                        }

                        var ctx = $("#personsBarChart").get(0).getContext("2d");
                        var ctx2 = $("#personsRadarChart").get(0).getContext("2d");



                        var data = {
                                labels: labelsPersons,
                                datasets: [
                                    {
                                        label: "Persons Bar chart data set",
                                        fillColor: "rgba(151,187,205,0.5)",
                                        strokeColor: "rgba(151,187,205,0.8)",
                                        highlightFill: "rgba(151,187,205,0.75)",
                                        highlightStroke: "rgba(151,187,205,1)",
                                        data: dataCountPersons
                                    }
                                ]
                        };

                        var data2 = {
                            labels: labelsPersons,
                            datasets: [
                                {
                                    label: "Persons Radar chart data set",
                                    fillColor: "rgba(151,187,205,0.2)",
                                    strokeColor: "rgba(151,187,205,1)",
                                    pointColor: "rgba(151,187,205,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(151,187,205,1)",
                                    data: dataCountPersons
                                }
                            ]
                        };


                        var personsBarChart = new Chart(ctx).Bar(data, {});
                        var personsRadarChart = new Chart(ctx2).Radar(data2, {});




                          $scope.$apply();

                      }
            })).always(function ()
            {
                $scope.waitingDialog.hide();
            })
        }

        function getStatsByPersonsAndMonth() {

            var Filter = { dateFrom: $scope.datePickersDates.dateFromPersons, dateTo: $scope.datePickersDates.dateToPersons }
            var path = 'http://localhost:1338';

            $.when($.ajax({
                      type: 'POST',
                      url: path + '/stats/statsByPersonsAndMonth',
                      data: JSON.stringify(Filter),
                      contentType: 'application/json',
                      success: function (results) {

                        var labelsPersons = [];
                        var dataCountPersons = [];

                        if(results.length > 0){
                            for ( var i = 0, l = results.length; i < l; i++ ){
                                var index = 0;
                                index += labelsPersons.indexOf(results[i]["_id"]["person"])
                                if(index != -1)
                                {
                                    dataCountPersons[index][parseInt(results[i]["_id"]["month"])-1] = results[i]["count"];
                                }
                                else
                                {
                                    labelsPersons.push(results[i]["_id"]["person"]);
                                    var dataNew = [0,0,0,0,0,0,0,0,0,0,0,0];
                                    dataNew[parseInt(results[i]["_id"]["month"])-1] = results[i]["count"];
                                    dataCountPersons.push(dataNew);
                                }
                            };
                        }

                        var topPerson = labelsPersons.slice(0,4);
                        var topData = dataCountPersons.slice(0,4);

                        var topDatasets = [];

                        for ( var i = 0, l = topPerson.length; i < l; i++ ){

                            topDatasets.push(
                                    {
                                        label: topPerson[i],
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



                        var ctx = $("#personsLineChart").get(0).getContext("2d");

                        var data = {
                                labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
                                datasets: topDatasets
                        };

                        var personsLineChart = new Chart(ctx).Line(data, {});

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
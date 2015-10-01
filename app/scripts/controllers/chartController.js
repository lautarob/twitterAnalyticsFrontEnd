'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
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
                getBarchartByTopicsDated();
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
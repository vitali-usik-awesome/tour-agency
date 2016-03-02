// NOTE: Temporary "debugMode" variable for use with media modal.
// This will be removed once the media modal code is updated to remove the need for this.
// -Ben Staker
//var debugMode = true;

(function () {
  'use strict';

  var dependencies = [
    'taConfig',
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ngSanitize',
    'ngFileUpload',
    'toastr',
    'ui.bootstrap'
    // Feefo Components
    //'feefoMediaModal'
  ];

  var tourAgencyApp = angular.module('tourAgencyApp', dependencies);

})();

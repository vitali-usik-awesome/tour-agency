(function (ng) {
  'use strict';

  // Controller views
  // I.E.: VIEWS.controllers.key_name OR VIEWS.controllers['key_name']
  var controllerViews = {
    'TestRestCtrl': 'views/test-rest/test-rest.html'
  };

  // Directive views
  // I.E.: VIEWS.directives.key_name OR VIEWS.directives['key_name']
  var directiveViews = {
    //'auiCustomQuestionItemDirective': 'views/settings/directives/custom-question-item.html',

  };

  // Modal views
  // I.E.: VIEWS.modals.key_name OR VIEWS.modals['key_name']
  var modalViews = {
    //'TermsModalCtrl': 'views/installation/modals/terms.html',
  };

  // Partial views
  // I.E.: VIEWS.partials.key_name OR VIEWS.partials['key_name']
  var partialViews = {
    '404': 'views/_core/partials/404.html'
  };

  // Build views constant
  var viewsConstant = {};
  viewsConstant.controllers = controllerViews;
  viewsConstant.directives  = directiveViews;
  viewsConstant.modals      = modalViews;
  viewsConstant.partials    = partialViews;

  ng.module('tourAgencyApp').
    constant('VIEWS', viewsConstant);
})(angular);

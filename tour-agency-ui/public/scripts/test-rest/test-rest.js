(function() {
  'use strict';

  var dependencies = ['$scope', '$http', '$location', 'ENV', '$modal', 'VIEWS', 'toastr'];

  function TestRestCtrl($scope, $http, $location, ENV, $modal, VIEWS, toastr) {

    $scope.goAhead = function() {
      $http({
        url: ENV.apiEndpoint + '/greeting',
        method: "GET",
        //withCredentials: true,
        headers: {
          //'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).error(function(data) {
        //$scope.errorMessage = data;
        console.log("data: " + data);
        toastr.error(data);
      }).success(function(data) {
        console.log("success!");
        console.log("id: " + data.id + " content: " + data.content);
        //$location.url('/install/shopify/chooseInstall/' + $scope.shopInfo.pluginRegistratonForm.configOid);
      });
    };

  }

  TestRestCtrl.$inject = dependencies;

  angular
      .module('tourAgencyApp')
      .controller('TestRestCtrl', TestRestCtrl);

})();

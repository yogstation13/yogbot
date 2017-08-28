define(['app'], function (app) {
  app.controller('DashboardViewController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
    $rootScope.backgroundEnabled = false;
    $rootScope.mainNavigation = "dashboard";
    $rootScope.showTabs = true;

    if ($rootScope.login == undefined) {
      $location.path("/login");
    }

  }]);
});

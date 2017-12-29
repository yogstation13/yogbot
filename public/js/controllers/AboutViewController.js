define(['app'], function (app) {
  app.controller('AboutViewController', ['$rootScope', function ($rootScope) {
    $rootScope.backgroundEnabled = false;
    $rootScope.mainNavigation = "public";
    $rootScope.showTabs = false;
  }]);
});

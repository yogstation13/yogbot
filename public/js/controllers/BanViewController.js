define(['app', 'scripts/dateToHuman'], function (app, dateToHuman) {
  app.controller('BanViewController', ['$scope', '$rootScope', '$http', '$routeParams', '$location', function ($scope, $rootScope, $http, $routeParams, $location) {
    $rootScope.backgroundEnabled = false;
    $rootScope.mainNavigation = "public";
    $rootScope.showTabs = true;

    $scope.findCkey = () => {
      if ($scope.ckey == "") {
        $scope.ckey = "all";
      }
      $scope.ckey = $scope.searchCkey;
      $location.path("/public/bans/" + $scope.searchCkey + "/" + $scope.currentPage + "/" + $scope.pageLimit, false);
      $scope.loadBans();
      $scope.searchCkey = undefined;
      setTimeout(() => {
        Materialize.updateTextFields();
      }, 2000);
    }

    $scope.currentPage = 1;
    $scope.ckey = "all";
    $scope.pageLimit = 30;

    if ($routeParams.pageNumber) {
      $scope.currentPage = parseInt($routeParams.pageNumber);
    }

    if ($routeParams.ckey) {
      $scope.ckey = $routeParams.ckey;
    }

    if ($routeParams.pageLimit) {
      $scope.pageLimit = parseInt($routeParams.pageLimit);
    }


    $scope.loadBans = () => {
      $http.get("/api/server/bans/" + $scope.ckey + "/" + $scope.currentPage + "/" + $scope.pageLimit).then(function (response) {
        console.log(response)
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].bantype == "JOB_TEMPBAN" || response.data[i].bantype == "JOB_PERMABAN") {
            response.data[i].display_bantype = "Job Ban";
            response.data[i].tooltip = response.data[i].job.join(", ");
          }
          else if (response.data[i].bantype == "TEMPBAN" || response.data[i].bantype == "PERMABAN" || response.data[i].bantype == "ADMIN_PERMABAN") {
            response.data[i].display_bantype = "Ban";
          }
          else if (response.data[i].bantype == "APPEARANCE_PERMABAN") {
            response.data[i].display_bantype = "Appearance Ban";
          }
          else {
            response.data[i].display_bantype = response.data[i].bantype;
          }

          response.data[i].display_bantime = dateToHuman(new Date(response.data[i].bantime));

          if (response.data[i].bantype == "PERMABAN" || response.data[i].bantype == "JOB_PERMABAN" || response.data[i].bantype == "ADMIN_PERMABAN") {
            response.data[i].display_expires = "Never";
            if (response.data[i].unbanned) {
              response.data[i].status = {
                message: "Removed",
                colour: "teal"
              };
            }
            else {
              response.data[i].status = {
                message: "Banned",
                colour: "red"
              };
            }
          }
          else {

            var now = new Date();
            var expireTime = new Date(response.data[i].expiration_time);

            if (now > expireTime) {
              response.data[i].status = {
                message: "Expired",
                colour: "teal"
              };
            }
            else {
              response.data[i].status = {
                message: "Banned",
                colour: "red"
              };
            }

            response.data[i].display_expires = dateToHuman(expireTime);
          }
        }

        $scope.bans = response.data;
        setTimeout(() => {
          $('.tooltipped').tooltip({
            delay: 50
          });
        }, 1000);

      });
    }

    $scope.loadBans();
  }]);
});

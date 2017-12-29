define(['app'], function (app) {
  app.controller('LoginViewController', ['$scope', '$rootScope', '$http', '$cookies', '$location', 'jwtHelper', function ($scope, $rootScope, $http, $cookies, $location, jwtHelper) {
    $rootScope.backgroundEnabled = false;
    $rootScope.mainNavigation = "dashboard";
    $rootScope.showTabs = false;

    $scope.login = () => {
      var email = $scope.email;
      var password = $scope.password;
      var errors = false;

      $scope.usernameError = undefined;
      $scope.passwordError = undefined;

      if (email == "" || email == undefined) {
        $scope.emailError = "You must enter an email.";
        errors = true;
      }

      if (password == "" || password == undefined) {
        $scope.passwordError = "You must enter a password.";
        errors = true;
      }

      if (errors) {
        return;
      }

      var data = {
        email: email,
        password: password
      }

      $http.post("/api/login", data).then(
        (success) => {
          if (success.data.error) {
            if (success.data.component == "email") {
              $scope.emailError = success.data.error;
            }
            if (success.data.component == "username") {
              $scope.usernameError = success.data.error;
            }
            return;
          }
          $cookies.put('token', success.data.token);
          $rootScope.token = success.data.token;
          $rootScope.login = jwtHelper.decodeToken(success.data.token);
          $location.path("/dashboard");
        },
        (error) => {

        }
      );
    }

  }]);
});

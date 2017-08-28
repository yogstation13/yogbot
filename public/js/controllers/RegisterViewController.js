define(['app'], function (app) {
  app.controller('RegisterViewController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $rootScope.backgroundEnabled = false;
    $rootScope.mainNavigation = "dashboard";
    $rootScope.showTabs = false;

    var captchaID = undefined;

    $http.get("/api/captcha").then(function (response) {
      setTimeout(() => {
        captchaID = grecaptcha.render('recaptcha-component', {
          'sitekey': response.data,
          'theme': 'dark'
        });
      }, 1000);

    });

    $scope.register = () => {
      var email = $scope.email;
      var username = $scope.username;
      var password = $scope.password;
      var rpassword = $scope.rpassword;
      var errors = false;

      $scope.emailError = undefined;
      $scope.usernameError = undefined;
      $scope.passwordError = undefined;
      $scope.rpasswordError = undefined;


      if (email == "" || email == undefined) {
        $scope.emailError = "You must enter an email address.";
        errors = true;
      }

      if (username == "" || username == undefined) {
        $scope.usernameError = "You must enter a username.";
        errors = true;
      }

      if (password == "" || password == undefined) {
        $scope.passwordError = "You must enter a password.";
        errors = true;
      }

      if (rpassword == "" || rpassword == undefined) {
        $scope.rpasswordError = "You must repeat the password.";
        errors = true;
      }

      if (password != rpassword) {
        $scope.rpasswordError = "Passwords dont match!";
        errors = true;
      }

      if (errors) {
        return;
      }

      var data = {
        email: email,
        password: password,
        username: username,
        captcha: grecaptcha.getResponse(captchaID)
      }

      $http.post("/api/register", data).then(
        (success) => {
          if (success.data.error) {
            if (success.data.component == "email") {
              $scope.emailError = success.data.error;
            }
            if (success.data.component == "username") {
              $scope.usernameError = success.data.error;
            }
            if (success.data.component == "password") {
              $scope.passwordError = success.data.error;
            }
            if (success.data.component == "recaptcha") {
              $scope.recaptchaError = success.data.error;
            }
          }
          console.log(JSON.stringify(success.data));
        },
        (error) => {

        }
      );
    }

  }]);
});

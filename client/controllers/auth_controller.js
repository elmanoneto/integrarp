app.controller('AuthController', function ($scope, $rootScope, $location,
  AuthService, AuthStorage, ClientService) {
  $scope.login = function (email, password) {
    AuthService.login(email, password).then(function (response) {
      if (response.error) {
        console.log('erro');
      } else {
        AuthStorage.set(response.client, response.account, response.auth_token);
        $location.path('account');
      }
    })
  }

  console.log(AuthStorage.getAccount());

  $scope.signup = function (name, email, password) {
    ClientService.save({'name': name, 'email': email, 'password': password}).$promise.then(function (response) {
      if (response.success) {
        $scope.login(email, password);
      } else {
        console.log(response);
        console.log('erro :()');
      }
    })
  }
})

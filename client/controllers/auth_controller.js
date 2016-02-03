app.controller('AuthController', function ($scope, $rootScope, $location,
  AuthService, AuthStorage, ClientService) {
  $scope.login = function (email, password) {
    AuthService.login(email, password).then(function (response) {
      if (response.error) {
        alert('Email ou senha inválidos.')
      } else {
        AuthStorage.set(response.client, response.account, response.auth_token);
        $location.path('account');
      }
    })
  }

  $scope.signup = function (name, email, password) {
    ClientService.save({'name': name, 'email': email, 'password': password}).$promise.then(function (response) {
      if (response.success) {
        $scope.login(email, password);
      } else {
        alert(response.error);
      }
    })
  }
})

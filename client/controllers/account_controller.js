app.controller('AccountController', function ($scope,$location, AuthStorage,
  AccountService, AuthService) {

  if (!AuthStorage.getClient()) {
    $location.path('/');
  }

  $scope.client = [];

  $scope.client['personal'] = AuthStorage.getClient();
  $scope.client['account'] = AuthStorage.getAccount();

  $scope.logout = function () {
    AuthService.logout();
    $location.path('/');
  }

  $scope.deposit = function (value) {
    // body...
  }

})

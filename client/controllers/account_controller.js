app.controller('AccountController', function ($scope,$location, AuthStorage,
  AccountService, AuthService, StatementService) {

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
    console.log(AuthStorage.getAccount().id);
    AccountService.deposit({value: value, id: AuthStorage.getAccount().id}).$promise.then(function (response) {
      AuthStorage.updateAccount(response.account);
      console.log(response);
      $location.path('/account');
    })
  }

  $scope.debit = function (value) {
    AccountService.debit({value: value, id: AuthStorage.getAccount().id}).$promise.then(function (response) {
      if (response.account) {
        AuthStorage.updateAccount(response.account);
        $location.path('/account');
      } else {
        alert('Erro. Insira um valor menor que seu saldo.');
      }
    })
  }

  $scope.transfer = function function_name(id, value) {
    if (AuthStorage.getAccount().id == id) {
      alert('Você não pode transferir para você mesmo');
      return false;
    }

    if (value == 0 || value < 0) {
      alert('Informe um valor maior que R$0');
      return false;
    }

    AccountService.transfer({id_transfer: AuthStorage.getAccount().id, id: id, value: value})
    .$promise.then(function (response) {
      if (response.account) {
        AuthStorage.updateAccount(response.account);
        $location.path('/account');
      } else {
        alert('Erro:' +response.error);
      }
    })
  }

  $scope.statements;

  $scope.statement = function (begin, end) {
    $scope.statements = StatementService.get({id: AuthStorage.getAccount().id, begin: begin, end: end})
    .$promise.then(function (response) {
      $scope.statements = response.statements;
    })
  }


})

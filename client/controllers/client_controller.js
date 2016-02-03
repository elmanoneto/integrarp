app.controller('ClientController', function ($scope, $location, ClientService, AuthStorage) {

  $scope.client = AuthStorage.getClient();

  $scope.update = function (name, email, password) {
    var params = {name: name, email: email, password: password};

    ClientService.update({id: AuthStorage.getClient().id}, params)
    .$promise.then(function (argument) {
      if (argument.client) {
        AuthStorage.updateClient(argument.client);
        $location.path('/account')
      }
    });
  }

})

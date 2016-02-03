app.service('ClientService', function ($resource) {
  return $resource('http://localhost:3000/clients/:id', {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
})

app.service('AccountService', function ($resource) {
  return $resource('http://localhost:3000/accounts/:id', {}, {
    deposit: {
      url: 'http://localhost:3000/accounts/deposit',
      method: 'POST',
      isArray: false
    },
    debit: {
      url: 'http://localhost:3000/accounts/debit',
      method: 'POST',
      isArray: false
    },
    transfer: {
      url: 'http://localhost:3000/accounts/transfer',
      method: 'POST',
      isArray: false
    }
  });
})

app.service('StatementService', function ($resource) {
  return $resource('http://www.localhost:3000/statement/:id');
})

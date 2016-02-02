app.service('ClientService', function ($resource) {
  return $resource('http://localhost:3000/clients/:id');
})
app.service('AccountService', function ($resource) {
  return $resource('http://localhost:3000/accounts/:id');
})

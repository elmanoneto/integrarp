app.factory("AuthStorage", function (store) {
  return {
    set: function (client, account, token) {
      store.set('client', client);
      store.set('account', account);
      store.set('token', token)
    },
    getClient: function () {
      return store.get('client');
    },
    getAccount: function () {
      return store.get('account');
    },
    getToken: function () {
      return store.get('token')
    },
    updateAccount: function (account) {
      store.remove('account');
      store.set('account', account)
    },
    updateClient: function (client) {
      store.remove('client');
      store.set('client', client)
    },
    remove: function () {
      store.remove('client');
      store.remove('account');
      store.remove('token');
    }
  };
});

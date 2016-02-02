app.factory("AuthStorage", function (store) {
  return {
    set: function (client, account) {
      store.set('client', client);
      store.set('account', account);
    },
    getClient: function () {
      return store.get('client');
    },
    getAccount: function () {
      return store.get('account');
    },
    remove: function () {
      store.remove('client');
      store.remove('account');
    }
  };
});

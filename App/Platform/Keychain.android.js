import React from 'react';

import LocalKeyStore from '../Stores/LocalKeyStore';

const KEYCHAIN_STORAGE_KEY = 'KEYCHAIN';

var KeyChain = {
  setGenericPassword(username, password, service) {
    return new Promise((resolve) => {
      LocalKeyStore.setKey(this.getStorageKey(service), {username, password}, (error) => {
        resolve();
      });
    });
  },

  getGenericPassword(service) {
    return new Promise((resolve) => {
      LocalKeyStore.getKey(this.getStorageKey(service), (error, value) => {
        resolve(value);
      });
    });
  },

  resetGenericPassword(service) {
    return new Promise((resolve) => {
      LocalKeyStore.setKey(this.getStorageKey(service), null, (error) => {
        resolve();
      });
    });
  },

  getStorageKey(service) {
    return `${KEYCHAIN_STORAGE_KEY}-${service}`;
  },

};

export default KeyChain;

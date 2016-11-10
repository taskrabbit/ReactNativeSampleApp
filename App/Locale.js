import I18n from './Locales/boot';

var Manager = function(object) {
  this.key = object;
};

Manager.prototype.en = function(hash) {
  if (I18n.translations['en'][this.key] && !process.env.TEST_UNIT) {
    console.warn(`Locale (en) key already exists: ${this.key}`);
  }
  I18n.translations['en'][this.key] = hash;
  return this;
};

Manager.prototype.t = function(scope, options) {
  if (this.key) {
    scope = this.key + '.' + scope; // prepend our key
  }
  return I18n.t(scope, options);
};

var Locale = {
  key: function(object, enHash) {
    var manager = new Manager(object);
    // common case is passing en
    if (enHash) {
      return manager.en(enHash);
    }
    else {
      return manager;
    }
  },

  global: function() {
    return new Manager(null);
  },

  lib: function() {
    return I18n;
  },

  formatMoneyWithCountryIsoCode: function(cents, countryIsoCode, options = {}) {
    const locale = I18n.getLocaleFromCountryIsoCode(countryIsoCode);
    return Locale.lib().l('currency', cents, {locale, ...options});
  },

  formatMoneyWithCurrency: function(cents, currency, options = {}) {
    const locale = I18n.getLocaleFromCurrency(currency);
    return Locale.lib().l('currency', cents, {locale, ...options});
  },
};

export default Locale;

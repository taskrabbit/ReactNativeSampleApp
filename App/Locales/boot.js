import I18n from '../Locales/i18n';

I18n.translations['base']  = require('../Locales/base.js').default;  // defaults, not translated - likely for set values
I18n.translations['en']    = require('../Locales/en.js').default;    // shared for english countries, generally loaded through Locale.register

I18n.translations['en-US'] = require('../Locales/en-US.js').default; // known ones for US

I18n.translations['en-GB']      = require('../Locales/en-GB.js').default;            // known ones for GB
I18n.translations['en-GB-xtra'] = require('../Locales/en-GB-xtra.js').default;       // programmatic - ideally empty and in translated


I18n.default_locale = 'en-US';
I18n.locale = 'en-US';

I18n.fallbacks = {
  'en-US': ['en', 'base'],
  'en-GB': ['en-GB-xtra', 'en', 'base'],
};

const countryIsoCodesToLocale = {
  'US': 'en-US',
  'GB': 'en-GB',
};

const currenciesToLocale = {
  'USD': 'en-US',
  'GBP': 'en-GB',
};

I18n.register = function(component, enHash) {
  I18n.translations['en'][component] = enHash;
};

I18n.getLocaleFromCountryIsoCode = (countryIsoCode) => {
  return countryIsoCodesToLocale[countryIsoCode] || countryIsoCodesToLocale['US'];
};

I18n.getLocaleFromCurrency = (countryIsoCode) => {
  return currenciesToLocale[countryIsoCode] || currenciesToLocale['USD'];
};

export default I18n;

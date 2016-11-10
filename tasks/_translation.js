import child_process   from 'child_process';
import fs              from 'fs';
import ReactNativeStub from './react-native-stub';
import DateUtil        from '../App/Lib/DateUtil';

var Translator = function(platform, console) {
  this.console = console;
  this.platform = platform;
  this.rootDirectory  = process.cwd();
  this.appDirectory   = this.rootDirectory  + '/App';
  this.tmpDirectory = this.rootDirectory  + '/testbuild/translation';

  this.i18nLib = require(this.appDirectory + '/Locale').default.lib();
  this.previousLocale = this.i18nLib.locale;

  this.overrideRequire();
  this.requireAll();
};

Translator.prototype.overrideRequire = function() {
  var Module = require('module');
  var originalLoad = Module._load;

  function interceptedLoad(request, parent, isMain) {
    // console.log("REQUIRE: " + request);
    let stubbed = ReactNativeStub(request, parent, isMain);
    stubbed = stubbed || (request, parent, isMain);
    if (stubbed) return stubbed;

    return originalLoad(request, parent, isMain);
  }
  Module._load = interceptedLoad;

  var originalResolveFilename = Module._resolveFilename;

  function interceptedResolveFilename(request, parent) {
    if (/\/Platform\/[\w]+$/.test(request)) {
      request = `${request}.ios`;
    }
    return originalResolveFilename(request, parent);
  }
  Module._resolveFilename = interceptedResolveFilename;
};

Translator.prototype.resetLocale = function() {
  this.i18nLib.locale = this.previousLocale;
};

Translator.prototype.log = function(toLog) {
  this.console.log(toLog);
};

Translator.prototype.run = function(toRun) {
  this.log('------------------');
  this.log(toRun);
  this.log('->');
  var out = child_process.execSync(toRun);
  this.log('' + out);
  this.log('------------------');
  return out;
};

Translator.prototype.requireAll = function() {
  console.log(this.appDirectory);
  require('require-all')({
    dirname:  this.appDirectory,
    filter:  /(.+)\.js$/,
    recursive: true
  });
};

Translator.prototype.emptyDirectory = function() {
  this.log('cleaning: ' + this.tmpDirectory);
  this.run('rm -rf '    + this.tmpDirectory);
  this.run('mkdir -p '  + this.tmpDirectory);
};

Translator.prototype.getTranslations = function(locale) {
  var Locale = require('../App/Locale').default;
  var I18n = Locale.lib();
  var translations = I18n.translations[locale];
  return translations;
};

Translator.prototype.writeDumpJson = function(locale) {
  var translations = this.getTranslations(locale);
  var json = JSON.stringify(translations, null, 2);
  var outputFilename = this.tmpDirectory + '/' + locale + '.json';
  this.log('Writing: ' + outputFilename);
  fs.writeFileSync(outputFilename, json);
};

Translator.prototype.writeBackfillJson = function(locale, backfill) {
  var translations = {};
  for (var key in backfill) {
    var value = backfill[key];
    var pieces = key.split('.');
    var current = translations;
    for (var i=0; i<pieces.length-1; i++) {
      if (!current[pieces[i]]) {
        current[pieces[i]] = {};
      }
      current = current[pieces[i]];
    }
    current[pieces[pieces.length-1]] = value;
  }
  var json = JSON.stringify(translations, null, 2);
  var contents = '// Programatic GB translations - do not add directly\n';
  contents += '// Use npm run translation:backfill\n\n';
  contents += 'export default ' + json + ';';

  var outputFilename = this.appDirectory + '/Locales/' + locale + '-xtra.js';
  this.log('Writing: ' + outputFilename);
  fs.writeFileSync(outputFilename, contents);
};

Translator.prototype.collectKeys = function(scope, output, to_translate) {
  for (var key in to_translate) {
    var value = to_translate[key];
    var clone = scope.slice(0);
    clone.push(key);

    //this.log(scope.join('.') + ": " + key + ": " + value);
    if (typeof value === 'object') {
      this.collectKeys(clone, output, value);
    }
    else {
      var scopeKey = clone.join('.');
      output[scopeKey] = value;
    }
  }
};

Translator.prototype.collectLocale = function(locale) {
  var translations = this.getTranslations(locale);
  var flat = {};
  this.collectKeys([], flat, translations);
  return flat;
};

Translator.prototype.dump = function() {
  this.emptyDirectory();
  this.writeDumpJson('en');
  this.writeDumpJson('en-GB');
  this.writeDumpJson('en-GB-xtra');
};

Translator.prototype.backfillDirections = function(locale) {
  if (!this.backfillDirectionHash) this.backfillDirectionHash = {};
  if (this.backfillDirectionHash[locale]) return this.backfillDirectionHash[locale];

  var filename = this.rootDirectory + '/tasks/translation-' + locale + '.json';
  var json = fs.readFileSync(filename, 'utf8');
  this.backfillDirectionHash[locale] = JSON.parse(json);
  return this.backfillDirectionHash[locale];
};

Translator.prototype.skipKey = function(key) {
  // whitelist?
  return false;
};

Translator.prototype.isBad = function(value, directions) {
  if (typeof(value) !== 'string') { return; }

  var lower     = directions.fail.lower || [];
  var sensitive = directions.fail.sensitive || [];
  var i;

  var downcase = value.toLowerCase();

  for (i=0; i<lower.length; i++) {

    if (downcase.includes(lower[i])) {
      return true;
    }
  }

  for (i=0; i<sensitive.length; i++) {
    if (value.includes(sensitive[i])) {
      return true;
    }
  }

  return false;
};

Translator.prototype.updateValue = function(value, directions) {
  var replace = directions.replace || [];
  var i;
  var changed = false;

  for (i=0; i<replace.length; i++) {
    var find = replace[i][0];
    var change = replace[i][1];

    if (value.includes(find)) {
      value = value.replace(find, change);
      changed = true;
    }
  }

  if (!changed) return null;
  return value;
};

Translator.prototype.backfill = function() {
  var targetLocale = 'en-GB';
  var target = this.collectLocale(targetLocale);
  var directions = this.backfillDirections(targetLocale);
  var backfilled = {};

  var en = this.collectLocale('en');
  for (var key in en) {
    var value = en[key];
    if (this.skipKey(key)) continue;

    if (this.isBad(value, directions)) {
      var update = this.updateValue(value, directions);
      if (update) {
        backfilled[key] = update;
      }
    }
  }

  this.writeBackfillJson(targetLocale, backfilled);
};

Translator.prototype.times = function() {
  var date = 1448751588; // Sat, 28 Nov 2015 22:59:48 GMT
  var formats = this.getTranslations('en-US').datetime;
  var locales = ['en-US', 'en-GB'];

  var output = {};

  for (var key in formats) {
    output[key] = {};
    for (var i=0; i<locales.length; i++) {
      this.i18nLib.locale = locales[i];
      output[key][locales[i]] = DateUtil.format(date, key);
    }
  }

  this.resetLocale();
  this.log(JSON.stringify(output, null, 2));
};

Translator.prototype.checkLocaleFailures = function(targetLocale, source) {
  // returns array of issues
  var problems = [];
  var directions = this.backfillDirections(targetLocale);

  this.i18nLib.locale = targetLocale;

  for (var key in source) {
    if (this.skipKey(key)) continue;
    var unique = 'sdfghjkjhgfdsdfghjhgfdfghj';
    var value = this.i18nLib.t(key, {defaultValue: unique});
    if (value === unique) {
      problems.push('(' + targetLocale + ') NO VALUE : ' + key + ' -> ' + 'NOT FOUND');
    }
    else if (this.isBad(value, directions)) {
      problems.push('(' + targetLocale + ') BAD VALUE: ' + key + ' -> ' + value);
    }
  }

  this.resetLocale();
  return problems;
};

Translator.prototype.check = function() {
  // crash if something wrong
  var problems = [];
  var en = this.collectLocale('en');
  var en_us = this.collectLocale('en-US');

  problems = problems.concat(this.checkLocaleFailures('en-GB', en));
  problems = problems.concat(this.checkLocaleFailures('en-GB', en_us));

  problems = problems.concat(this.checkLocaleFailures('en-US', en));
  problems = problems.concat(this.checkLocaleFailures('en-US', en_us));

  if (problems.length > 0) {
    var error = 'i18n problems found:\n    ' + problems.join('\n    ');
    throw error;
  }
};

var translator = new Translator('ios', console);
translator[process.env.ACTION]();

import Locale from '../Locale';

var i18nLib = Locale.lib();

global._Date = global._Date || Date;

var DateUtil = {
  // localEpoch: function(epochSeconds) {
  //   var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  //   d.setUTCSeconds(epochSeconds);
  //   return d;
  // },

  now: function() {
    return new _Date();
  },

  minutes: function(number) {
    return number * 60 * 1000;
  },

  hours: function(number) {
    return number * this.minutes(60);
  },

  days: function(number) {
    return number * this.hours(24);
  },

  timeAgoInWords: function(milliseconds) {
    if (milliseconds < (new Date('January 01, 1970 00:00:00')).getTime()) {
      console.warn('timeAgoInSeconds requires milliseconds >= Epoch');
      return null;
    }
    const now = this.now().getTime(),
      minutesAgo = Math.floor((now - milliseconds) / 1000 / 60);

    if (minutesAgo < 1)   return i18n.t('time_ago_less_than');
    if (minutesAgo === 1) return i18n.t('time_ago_min');
    if (minutesAgo < 60)  return i18n.t('time_ago_mins', {minutes: minutesAgo});

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo === 1) return i18n.t('time_ago_hour');
    if (hoursAgo < 24)  return i18n.t('time_ago_hours', {hours: hoursAgo});

    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo === 1) return i18n.t('time_ago_day');
    if (daysAgo < 7) return i18n.t('time_ago_days', {days: daysAgo});

    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo === 1) return i18n.t('time_ago_week');
    return i18n.t('time_ago_weeks', {weeks: weeksAgo});
  },

  isToday(date) {
    var parsedDate = this.parse(date);
    if (!parsedDate) return false;

    return parsedDate.toDateString() === this.now().toDateString();
  },

  isPast(date) {
    var parsedDate = this.parse(date);
    if (!parsedDate) return false;

    return parsedDate < this.now();
  },

  isFuture(date) {
    return !this.isPast(date);
  },

  // use this one instead of strftime, please. it's better for i18n
  format: function(date, name) {
    var pattern = i18nLib.t('datetime.' + name);
    return this.strftime(date, pattern);
  },

  // strftime stuff we support:
  // https://github.com/fnando/i18n-js#date-formatting
  // %+A : Today, Tomorrow, Monday
  strftime: function(date, pattern) {
    date = this.parse(date);
    if (!date) return null;

    if (pattern.indexOf('%+A') >= 0) {
      // %+A : Today, Tomorrow, Monday
      var dayName = '%A'; // normal one
      var today = new _Date();
      var tomorrow = new _Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (date.toDateString() === today.toDateString()) {
        dayName = i18n.t('today');
      }
      else if (date.toDateString() === tomorrow.toDateString()) {
        dayName = i18n.t('tomorrow');
      }

      pattern = pattern.replace(/%\+A/g, dayName);
    }

    return i18nLib.strftime(date, pattern);
  },

  localISOString: function(date) {
    var d = this.parse(date);
    d.setHours(0, -d.getTimezoneOffset(), 0, 0);

    return d.toISOString().slice(0, 10);
  },

  dayWindowName: function(date) {
    date = this.parse(date);
    if (!date) return null;

    var hour = date.getHours();
    if (hour < 12) {
      return i18n.t('morning');
    }
    else if (hour < 16) {
      return i18n.t('afternoon');
    }
    else {
      return i18n.t('evening');
    }
  },

  parse: function(intOrDateOrString) {
    if (intOrDateOrString === null) return null;

    // have to know if it's an number if it's in millseconds or seconds
    if (typeof intOrDateOrString === 'number') {
      // using number of digits to decide (12 digits is 1973)
      if (intOrDateOrString.toString().length <= 12) {
        intOrDateOrString = intOrDateOrString * 1000;
      }
    }
    return i18nLib.parseDate(intOrDateOrString);
  },

  toEpoch: function(intOrDateOrString) {
    var date = this.parse(intOrDateOrString);
    if (date === null) return null;

    return Math.round(date.getTime() / 1000);
  },
};

var i18n = Locale.key('DateUtil', {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  today: 'Today',
  tomorrow: 'Tomorrow',
  time_ago_less_than: 'less than 1 min ago',
  time_ago_min: '1 min ago',
  time_ago_mins: '%{minutes} mins ago',
  time_ago_hour: '1 hour ago',
  time_ago_hours: '%{hours} hours ago',
  time_ago_day: '1 day ago',
  time_ago_days: '%{days} days ago',
  time_ago_week: '1 week ago',
  time_ago_weeks: '%{weeks} weeks ago',
});

export default DateUtil;

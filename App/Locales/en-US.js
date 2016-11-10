// All US Translations, more or less should match the GB one

export default {
  datetime: {
    day_and_time: '%a, %b %-d, %-I:%M %p',
    day_header: '%+A - %B %d',
    short_day: '%a %b %-d',
    short_time: '%-I:%M %p',
    month_day: '%B %-d',
    short_month_day: '%b %-d',
    month_day_year: '%b %e, %Y',
    month_day_year_at_time: '%B %-d, %Y at %-I:%M %p',
    short_weekday_name: '%a',
    long_day_of_month: '%d',
    time_zone: '%Z',
  },
  number: {
    currency: {
      format: {
        delimiter: ',',
        format: '%u%n',
        precision: 2,
        separator: '.',
        significant: false,
        strip_insignificant_zeros: false,
        unit: '$',
      },
    },
  },
};

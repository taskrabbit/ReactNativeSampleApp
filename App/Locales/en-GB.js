// Known GB Translations - generally matches US ones

export default {
  datetime: {
    day_and_time: '%a, %b %-d, %-H:%M',
    day_header: '%+A - %B %d',
    short_day: '%a %b %-d',
    short_time: '%-H:%M',
    month_day: '%B %-d',
    short_month_day: '%b %-d',
    month_day_year: '%e %b %Y',
    month_day_year_at_time: '%-d %B %Y at %-H:%M',
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
        unit: '£',
      },
    },
  },
};

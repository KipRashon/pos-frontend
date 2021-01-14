export const user_types = {
  EMPLOYEE: 2,
  ADMIN: 1,
};

export const places = {
  RESTAURANT: 1,
  BAR: 2,
};

export const payment_methods = [
  'Cash',
  'Mpesa',
  'Mpesa & Cash',
  'Card',
  'Glovo',
  'Jumia',
  'Uber Eats',
  'Little Cab',
  'Credit',
];

export const printer_widths = {
  KITCHEN_PRINTER: '500px',
  FUSION_PRINTER: '300px',
};

export const action_types = {
  ADD: {
    display: 'Created stock',
    value: 1,
    badgeColor: 'dark',
  },
  EDIT: {
    display: 'Updated stock',
    value: 2,
    badgeColor: 'primary',
  },
  SALE: {
    display: 'Made a sale',
    value: 3,
    badgeColor: 'success',
  },
};

export const time_periods = {
  TODAY: {display: 'Today', value: 'today'},
  YESTERDAY: {display: 'Yesterday', value: 'yesterday'},
  THIS_WEEK: {display: 'This week', value: 'week'},
  THIS_MONTH: {display: 'This Month', value: 'month'},
  THIS_YEAR: {display: 'This Year', value: 'year'},
  ALL_TIME: {display: 'All Time', value: ''},
};

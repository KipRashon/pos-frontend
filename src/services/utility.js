import moment from 'moment';

export function objetPropEmpty(obj) {
  for (let key in obj) {
    console.log(obj[key]);
    if (!obj[key]) {
      return true;
    }
  }
  return false;
}

export function getDateTimeAgo(dateStr) {
  if (!dateStr) {
    return '_';
  }
  let date = moment(dateStr);
  date.add(3, 'hours');
  return date.fromNow();
}

//function to format the date
export function formatDate(dateStr) {
  if (!dateStr) {
    return '_';
  }

  let date = moment(dateStr);
  //return an empty string if the date is invalid
  if (!date.isValid()) {
    return '_';
  }
  date.add(3, 'hours');

  //format to 29/06/2020 12:57 pm
  return date.format('DD/MM/YYYY h:mm a');
}

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
  // date.add(3, 'hours');
  return date.fromNow();
}

export function storeUserLocally(name, toStoreInLocal) {
  localStorage.setItem(name, JSON.stringify(toStoreInLocal));
}
export function getFromLocal(name) {
  let fromLocalStorage = JSON.parse(
    localStorage.getItem(name ? name : 'userSelection')
  );
  return fromLocalStorage;
}
export function removeFromLocalStorage(name) {
  localStorage.removeItem(name);
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
  // date.add(3, 'hours');

  //format to 29/06/2020 12:57 pm
  return date.format('DD/MM/YYYY h:mm a');
}

export function formatUrl(url, ...args) {
  let urlParams = '';
  args.forEach((arg) => {
    for (let key in arg) {
      if (arg[key]) {
        urlParams = `${urlParams}${key}=${arg[key]}&`;
      }
      if (arg[key] === 0) {
        urlParams = `${urlParams}${key}=${arg[key]}&`; //allow for value=0
      }
    }
  });
  urlParams = urlParams.substr(0, urlParams.length - 1); //remove the & at the end

  return `${url}?${urlParams}`;
}

export function getFormattedAmount(amount, quantity) {
  return `Ksh ${amount * quantity}`;
}

export function getFormattedMeasure(unit, measure) {
  return `${measure} ${unit}`;
}

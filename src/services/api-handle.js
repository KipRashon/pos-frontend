import axios from 'axios';
import {toast} from 'react-toastify';
import {API_URL} from './api-const';
let API = axios.create({
  baseURL: API_URL,
});

export function showNotification(title, color, position) {
  if (color === 'success') {
    toast.success(title, {position: position || 'top-right'});
  } else if (color === 'warning') {
    toast.warn(title, {position: position || 'top-right'});
  } else {
    toast.error(title, {position: position || 'top-right'});
  }
}
export function sendPostRequest(url, params) {
  return API.post(url, params);
}

export function sendGetRequest(url) {
  return API.get(url);
}

export function sendFormData(url, formData) {
  return API({
    url: url,
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
      accept: 'application/json',
    },
    data: formData,
  });
}

export function handleSuccess(promiseFunc, successMessage) {
  return promiseFunc.then((res) => {
    if (showNotification) {
      showNotification(successMessage, 'success');
    }
    return res;
  });
}

export function handleError(promiseFunc) {
  return promiseFunc.catch((err) => {
    if (err.response) {
      let message = err.response.data;

      if (message) {
        if (message.errors) {
          for (let key in message.errors) {
            let error = message.errors[key];

            error.forEach((err) => showNotification(err, 'danger'));
          }
        } else {
          showNotification(message.message, 'danger');
        }
      } else {
        showNotification('Database Error', 'danger');
      }
    } else {
      showNotification('You are offline', 'warning');
    }

    return err;
  });
}

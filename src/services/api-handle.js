import axios from 'axios';
import {toast} from 'react-toastify';
let API = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/',
  baseURL: 'https://posbackend.sk.co.ke/api',
});

export function showNotification(title, color) {
  if (color === 'success') {
    toast.success(title);
  } else if (color === 'warning') {
    toast.warn(title);
  } else {
    toast.error(title);
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
      let message = err.response.data.error_message;
      if (message) {
        showNotification(message, 'danger');
      } else {
        showNotification('Database Error', 'danger');
      }
    } else {
      showNotification('You are offline', 'warning');
    }

    return err;
  });
}

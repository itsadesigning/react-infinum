import { _post } from './api';

export function uploadFile(data) {
  return _post('media', {
    method: 'POST',
    headers: {
      'Authorization': sessionStorage.getItem('token')
    },
    body: data
  })
}
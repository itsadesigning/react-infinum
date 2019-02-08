import { _post } from './api';

export function postLike(id, model) {
  return _post(`shows/${id}/${model}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'text/html',
        'Authorization': sessionStorage.getItem('token')
    },
    body: id
  })
}
import { _post } from './api';
import { runInAction } from 'mobx';

export async function postUser(state, history, modal) {
  try {

    const loginData = await _post(`users${modal}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: state.user.email,
        password: state.user.password
      }),
    });

    sessionStorage.setItem('email', state.user.email);
    sessionStorage.setItem('token', loginData.token);

    const localFav = JSON.parse(localStorage.getItem(`${sessionStorage.getItem('email')}_favourites`)) || [];
    localStorage.setItem(`${sessionStorage.getItem('email')}_favourites`, JSON.stringify(localFav));
    
    history.push('/shows');

    } catch(error) {
      console.log(error);
      runInAction(() => {
      state.error = 'Authorization failed. Please try again.';
    });
  }
}
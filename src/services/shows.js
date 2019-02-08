import { _get } from './api';
import { runInAction } from 'mobx';

export async function getShow(state, showId) {
    const show = await _get(`shows/${showId}`);
    runInAction(() => {
        state.currentShow = show;
    });
}

export async function getAllShows(state) {
    const shows = await _get('shows');
    runInAction(() => {
        state.shows.replace(shows);
    });
}


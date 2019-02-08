import { _get, _post } from './api';
import { runInAction } from 'mobx';

export async function getEpisode(state, episodeId) {
    const episode = await _get(`episodes/${episodeId}`);
    runInAction(() => {
        state.currentEpisode = episode;
        state.currentEpisode.likesCount = 0;
    });
}

export async function getAllEpisodes(state, showId) {
    const episodes = await _get(`shows/${showId}/episodes`);
    runInAction(() => {
        state.episodes.replace(episodes);
    });
}

export async function addEpisode(state, data) {
    console.log(data);
        await _post('episodes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                title: data.title,
                episodeNumber: data.episodeNumber,
                season: data.season,
                description: data.description,
                showId: data.showId,
                mediaId: data.mediaId,
                imageUrl: data.imageUrl,
                timeAdded: Date.now()
            })})
            .then((res) => console.log(res))
            .catch((error) => console.log(error));

        runInAction(() => {
            state.episodes.unshift(JSON.parse(JSON.stringify(data)));
        });
}
import { _get, _post, _delete } from './api';
import { runInAction } from 'mobx';

export async function getComments(state, episodeId) {
  const comments = await _get(`episodes/${episodeId}/comments`);
  runInAction(() => {
      state.comments = comments;
  });
}

export async function addComment(state) {
  try {
    await _post('comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        text: state.newComment.text,
        episodeId: state.newComment.episodeId,
        timeAdded: state.newComment.timeAdded
      }),
    });
    runInAction(() => {
      state.comments.unshift(JSON.parse(JSON.stringify(state.newComment)));
    });

    } catch(error) {
    console.log(error);
    runInAction(() => {
        state.error = 'Upload failed. Please try again.';
    });
  }
}

export async function deleteComment(state, id) {
    try {
      await _delete(`comments/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': sessionStorage.getItem('token')
        },
    });
    } catch(error) {
    console.log(error);
    runInAction(() => {
        state.error = 'Operation failed. Please try again.';
    });
    }
  }
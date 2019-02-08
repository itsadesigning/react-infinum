import { observable, computed } from 'mobx';

class State {

    @observable
    shows = [];

    @observable
    currentShow = '';

    @observable
    favourites = [];

    @observable
    episodes = [];

    @computed
    get sortedComments() {
        return this.comments.sort(function(a, b){
            if(a.timeAdded === undefined && b.timeAdded === undefined){
                return 0;
            } else if(a.timeAdded && b.timeAdded === undefined){
                return -1;
            } else if(a.timeAdded === undefined && b.timeAdded){
                return 1;
            }else {
                return b.timeAdded - a.timeAdded;
            }
        })
    }

    @observable
    currentEpisode = '';
    
    @computed
    get seasonEpisode() {
        return `S0${this.currentEpisode.episodeNumber}E0${this.currentEpisode.season}`;
    }

    @observable
    comments = [];

    @observable
    newComment = {
        text: '',
        episodeId: '',
        timeAdded: ''
    };

    @observable
    showModal = false;

    @observable 
    user = {
        email: '',
        password: ''
    };

    @computed
    get loggedInUser() {
        return `Hi, ${sessionStorage.getItem('email').charAt(0).toUpperCase()}${sessionStorage.getItem('email').substring(1, sessionStorage.getItem('email').indexOf('@'))}`;
    }

    @observable 
    error = '';

    @observable
    location = '';
}

export default new State();

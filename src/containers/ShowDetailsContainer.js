import React, { Component } from 'react';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { EpisodeList } from '../components/EpisodeList';

import { css, cx } from 'emotion';

import { getShow } from '../services/shows';
import { postLike } from '../services/like';
import { getAllEpisodes as getAll } from '../services/episodes';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

import * as Icon from 'react-icons/lib/fa';

const wrapper = css`
    width: 70vw;
    margin: 20px auto;
    display: grid;
    grid-template-column: 3fr 1fr;
    grid-column-gap: 50px;
    position: relative;
    left: -40px;
`;

/* BACK BUTTON */

const backButton = css`
    border: 1px solid #ddd;
    border-radius: 100%;
    width: 40px;
    padding-bottom: 5px;
    height: 40px;
    font-size: 16px;
    float: left;
    position: relative;
    top: 48px;
    left: 5vw;
    background-color: white;

        &:hover {
        background-color: #fafafa;
        cursor: pointer; 
    }
`;

/* LEFT COLUMN */

const left = css`
    grid-column: 1;
    min-width: 725px;
`;

const showTitle = css`

   margin: 30px 0;
 
    & * {
        display: inline;
    }

    & div {
        height: 60px;
        padding-bottom: 10px;
    }
`;

const showTitleButtons = css`
    position:relative;
    bottom:4px;

    & button {
        margin-left: 15px;
        padding: 10px 12px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 100%;
        color: #666;
        font-size: 16px;

        &:hover {
            background-color: #ff7777;
            color: white;
            cursor: pointer; 
            transition: .3s;
        }
    }
`;

const showDetails = css`

    & p {
        font-size:16px;
    }

    & h6 {
        color: #ff7777;
    }
`;

/* RIGHT COLUMN */

const right = css`
    grid-column: 2;
    position:relative;
    top: 2px;
`;

const buttonsRight = css`
    width: 320px;
    margin-top: 25px;
    display: grid;
    grid-template-columns: auto auto;
`;

const buttonFav = css`
    margin-right: 10px;
    padding: 5px 15px;
    height: 40px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 20px;
    color: #ff7777;
    display: inline;
    font-size: 15px;
    transition: .3s;
    min-width: 140px;

     &:hover {
        background-color: #ff7777;
        color: white;
        cursor: pointer; 
        transition: .3s;
    }
`;

const unFav = css`
    background-color: #ff7777;
    color: white;
    border: 1px solid #fff;
    border-radius: 20px;
    font-size: 15px;
    
    padding: 5px 15px;
    transition: .3s;

    &:hover {
        cursor: pointer;
    }
`;

const showImage = css`
    display: block;
    width: 300px;
`;

const links = css`
    font-size: 16px;
    margin-top: 30px;

    & button {
        text-decoration: none;
        border: none;
        background-color: transparent;
        color: #ff7777;
        display: block;
        margin: 10px 0;
    }
`;

/* COMPONENT */

@inject('state')
@observer
export class ShowDetailsContainer extends Component {
    @observable
    componentState = {
        'favourite' : null,
        'like' : null,
    };
    
    @action
    componentDidMount() {
        getShow(this.props.state, this.props.match.params.id);
        getAll(this.props.state, this.props.match.params.id);

        // FAVOURITE BUTTON MECHANISM
        let oldItems = JSON.parse(localStorage.getItem(`${sessionStorage.getItem('email')}_favourites`)) || [];
        if(oldItems.find((item) => item._id === this.props.match.params.id)){
            this.componentState.favourite = false;
        } else {
            this.componentState.favourite = true;
        }
    }

    @action.bound
    _backButton() {
        this.props.history.push('/shows');
    }

    @action.bound
    _addFavourite() {
        this.componentState.favourite = !this.componentState.favourite;

        const email = sessionStorage.getItem('email');
        this.props.state.currentShow.key += 'fav';
        let oldItems = JSON.parse(localStorage.getItem(`${email}_favourites`)) || [];
        
        if(oldItems.find((item) => item._id === this.props.match.params.id)){
            oldItems = oldItems.filter((item) => item._id !== this.props.match.params.id );
            localStorage.setItem(`${email}_favourites`, JSON.stringify(oldItems));
        } else {
            oldItems.unshift(this.props.state.currentShow);
            localStorage.setItem(`${email}_favourites`, JSON.stringify(oldItems));
        }
    }

    @action.bound
    _addLike() {
        if(this.componentState.like === false){
            this.props.state.currentShow.likesCount += 2;
            postLike(this.props.state.currentShow._id, 'like');
            postLike(this.props.state.currentShow._id, 'like');
        } else if(this.componentState.like !== true){
            this.props.state.currentShow.likesCount++;
            postLike(this.props.state.currentShow._id, 'like');
        }
        this.componentState.like = true;
    }

    @action.bound
    _addDislike() {
        if(this.componentState.like === true){
            this.props.state.currentShow.likesCount -= 2;
            postLike(this.props.state.currentShow._id, 'dislike');
            postLike(this.props.state.currentShow._id, 'dislike');
        }else if(this.componentState.like !== false){
            this.props.state.currentShow.likesCount--;
            postLike(this.props.state.currentShow._id, 'dislike');
        }
        this.componentState.like = false;
    }

    @action.bound
    _openModal = (e) => {
        e.preventDefault();
        this.props.history.push(`./${this.props.state.currentShow._id}/addepisode`);
    }

    render() {
        const { state } = this.props;
        const { title, description, likesCount, imageUrl } = state.currentShow; 
        const favCx = this.componentState.favourite;

    return (
        <div>
            <Header />
            
            <button className={backButton} 
                onClick={this._backButton}>
                <Icon.FaArrowLeft />
            </button>

                <div className={wrapper}>

                    {/* LEFT COLUMN */}
                    <div className={left}>

                        {/* SHOW TITLE */}
                        <div className={showTitle}>
                            <h3>{title}</h3>
                            <div className={showTitleButtons}>
                                <button onClick={this._addLike}>
                                    <Icon.FaThumbsOUp /> 
                                </button>
                                <button onClick={this._addDislike}>
                                    <Icon.FaThumbsODown /> 
                                </button>
                                <button>
                                    {likesCount} 
                                </button>
                            </div><br/>
                        </div>

                        {/* SHOW DETAILS */}
                        <div className={showDetails}>
                            <p>{description}</p>
                            <h6>SEASONS & EPISODES:</h6>
                        </div>

                        <EpisodeList state={this.props.state}/>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className={right}>

                        {/* BUTTONS RIGHT */}
                        <div className={buttonsRight}>
                            <button className={buttonFav} onClick={this._openModal}>
                                <Icon.FaPlusCircle />  Add episode
                            </button>
                            <button onClick={this._addFavourite} className={cx({ [unFav] : !favCx }, { [buttonFav] : favCx })}>
                                {
                                    this.componentState.favourite ? 
                                    <div><Icon.FaHeart /> Favourite</div> : 
                                    <div><Icon.FaHeartO /> Unfavourite</div> 
                                }
                            </button>
                        </div><br />
                            
                        {/* IMAGE RIGHT */}
                        <img className={showImage} src={`https://api.infinum.academy/${imageUrl}`} alt={title} />
                        <div className={links}>
                            <button>Official website</button>
                            <button>Wikipedia</button>
                            <button>IMDb</button>
                        </div>
                            
                    </div>
                </div>
            <Footer />

        </div>
    );
    }
}

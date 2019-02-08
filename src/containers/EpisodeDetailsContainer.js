import React, { Component } from 'react';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { CommentList } from '../components/CommentList';

import { getComments, addComment } from '../services/comments';
import { getEpisode } from '../services/episodes';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

import * as Icon from 'react-icons/lib/fa';

import { css } from 'emotion';
import { CommentNew } from '../components/CommentNew';

const wrapper = css`
    width: 60vw;
    margin: 50px auto;
    position: relative;
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
    left: 120px;
    background-color: white;

        &:hover {
        background-color: #fafafa;
        cursor: pointer; 
    }
`;

const imgContainer = css`
    display: block;
    width: 100%;
    position: relative;
    max-height: 510px;
    overflow: hidden;

    & button {
        margin-right: 20px;
        padding: 10px 12px;
        background-color: white;
        border: none;
        border-radius: 20px;
        color: #ff7777;
        font-size: 16px;
        min-width: 40px;

        &:hover {
            background-color: #ff7777;
            color: white;
            cursor: pointer; 
            transition: .3s;
        }
    }
`;

const episodeImage = css`
    display: block;
    width: 100%;
    min-height: 200px;
    position: relative;
    transform: translateY(-30%);
    margin: auto;
`;

const episodeTitleButtons = css`
    position: absolute;
    bottom: 20px;
    left: 19vw;
`;

const episodeTitle = css`
   margin: 30px 0;
 
    & * {
        display: inline;
    }

    & div {
        height: 60px;
        padding-bottom: 10px;
    }

    & h5 {
        color: #ff7777;
        margin-left: 10px;
    }
`;

const episodeDetails = css`

    & p {
        font-size:16px;
    }

    & h6 {
        color: #ff7777;
    }
`;

const commentH = css`
    margin-top: 40px;
    width: 100%;
    border-bottom: 1px solid #eee;

    & h5 {
        margin-bottom:10px;
        color: #ccc;
    }
`;

@inject('state')
@observer
export class EpisodeDetailsContainer extends Component {

    componentDidMount() {
        getEpisode(this.props.state, this.props.match.params.id);
        getComments(this.props.state, this.props.match.params.id);
    }

    @action.bound
    _backButton() {
        this.props.history.goBack();
    }
    
    @action.bound
    _addLike() {
        this.props.state.currentEpisode.likesCount++;
    }

    @action.bound
    _addDislike() {
        this.props.state.currentEpisode.likesCount--;
    }

    @action.bound
    _handleComment(e) {
        this.props.state.newComment.text = e.target.value;
    }

    @action.bound
    _addComment() {
        this.props.state.newComment.episodeId = this.props.match.params.id;
        this.props.state.newComment.timeAdded = Date.now();
        this.props.state.newComment.userEmail = sessionStorage.getItem('email');

        addComment(this.props.state);
    }

    render() {

        const { state } = this.props;
        const { title, description, imageUrl } = state.currentEpisode;

        return (
            <div>
                <Header />
                    <div className={imgContainer}>
                                <img className={episodeImage} src={`https://api.infinum.academy/${imageUrl}`} alt={title} />
                                    <div className={episodeTitleButtons}>
                                        <button onClick={this._addLike}>
                                            <Icon.FaThumbsUp /> 
                                        </button>
                                        <button onClick={this._addDislike}>
                                            <Icon.FaThumbsDown /> 
                                        </button>
                                        <button>
                                            {this.props.state.currentEpisode.likesCount} 
                                        </button>
                                    </div>
                                </div>

                    <button className={backButton} onClick={this._backButton}><Icon.FaArrowLeft /></button>
                        <div className={wrapper}>
                                
                                {/* EPISODE TITLE w/ S00E00 */}
                                <div className={episodeTitle}>

                                    <h3>{title}</h3>

                                    <h5>{state.seasonEpisode}</h5>

                                    <br />
                                </div>
            
                                {/* EPISODE DETAILS */}
                                <div className={episodeDetails}>
                                    <p>{description}</p>
                                </div>
                            
                                {/* COMMENTS */}
                                
                                <div className={commentH}>
                                    <h5>Comments ({this.props.state.comments.length}):</h5>
                                </div>

                                <CommentNew 
                                    state={this.props.state} 
                                    handleComment={this._handleComment} 
                                    addComment={this._addComment}
                                /><br/>
                                
                                <div>
                                    <CommentList state={this.props.state}/>
                                </div>
                        
                        </div>
                <Footer />
            </div>
        )
    }

}
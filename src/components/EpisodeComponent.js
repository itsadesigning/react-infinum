import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as Icon from 'react-icons/lib/fa';

import { observer } from 'mobx-react';

import { css } from 'emotion';

const box = css`
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 15px;
    background-color: transparent;
    height: 110px;
    box-sizing: border-box;
    margin: 10px 0;
    overflow: hidden;

    & p {
        font-size: 13px;
        margin: 4px 0;
        line-height: 1.4;
    }

    & img {
        grid-column: 1;
        width: 100%;
        font-size: 16px;
        text-align: center;
        color: #ddd;
        margin: 0;
        padding: 0;
        text-decoration: none;
        height: 110px;
        overflow: hidden;
        object-fit: cover;
    }

    &:hover {
        background-color: #eee;
    }

    & h6 {
        margin-top: 10px;
        margin-bottom: 0;
        color: #ff7777;
    }
`;

const epText = css`
    position: relative;
    grid-column: 2;
`;

const epButton = css`
    display: inline;
    margin: 0 10px 5px 0;
    border: none;
    background-color: transparent;
    color: #bbb;
    font-size: 15px;

    &:hover {
        cursor: pointer; 
    }
`;

const epButDiv = css`
    position: absolute;
    bottom: 7px;
`;

const epLink = css`
    text-decoration: none;
`;

@observer
export class EpisodeComponent extends Component {

    get _shortenDescription() {
        return this.props.episode.description.slice(0, 200) + '...';
    }

    render() {
        const { episode } = this.props;
        const { description, imageUrl } = this.props.episode;

    return (
        <div className={box}>
            <Link className={epLink} to={`/episodes/${episode._id}`}>
                <img src={`https://api.infinum.academy/${imageUrl}`} alt="Episode." />
            </Link>
            <div className={epText}> 
                <Link className={epLink} to={`/episodes/${episode._id}`}>
                    <h6 key={episode}>{episode.title}</h6>
                </Link>
                    <p>{description.length > 200 ? this._shortenDescription : description}</p>
            <div className={epButDiv}>
                <button className={epButton}><Icon.FaThumbsUp /> 0 </button>
                <button className={epButton}><Icon.FaThumbsUp /> 0 </button>
            </div>
            </div>
        </div>
    );
    }
}
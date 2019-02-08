import React, { Component } from 'react';

import commentImg from '../images/comment.png';

import { observer } from 'mobx-react';
import { action } from 'mobx';

import { deleteComment } from '../services/comments';

import { css } from 'emotion';

const box = css`
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    grid-column-gap: 15px;
    background-color: transparent;
    box-sizing: border-box;
    padding:10px;
    min-height: 120px;
    margin: 10px 0;
    overflow: hidden;

    & div {
        align-self: center;
    }

    & p {
        font-size: 15px;
    }

    & img {
        grid-column: 1;
        width: 50%;
        justify-self: center;
        align-self: center;
    }

    & h6 {
        margin:0;
        margin-top: 15px;
        color: #ff7777;
        justify-self: center;
        align-self: center;
    }
`;

const deleteButton = css`
    border: none;
    background-color: transparent;
    color: #ff7777;

    &:hover {
        cursor: pointer;
    }
`;

@observer
export class CommentComponent extends Component {

    @action.bound
    _deleteComment() {
        deleteComment(this.props.state, this.props.comment._id);
        this.props.state.comments.splice(this.props.state.comments.map(comment => comment._id).indexOf(this.props.comment._id), 1);
    }

    render() {
        const { comment } = this.props;
        const { text, userEmail } = comment;
    
    return (
        <div className={box}>
            <img src={commentImg} alt="Comment Icon"/>
            <div>
                <h6>{userEmail}</h6>
                <p>{text}</p>
            </div>
            <div>
                {userEmail === sessionStorage.getItem('email') ? <button className={deleteButton} onClick={this._deleteComment}>Delete comment</button> : null}
            </div>
        </div>
    );
    }
}
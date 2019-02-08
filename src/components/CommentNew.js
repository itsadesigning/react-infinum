import React, { Component } from 'react';

import { observer } from 'mobx-react';

import * as Icon from 'react-icons/lib/fa';

import { css } from 'emotion';

const box = css`
    background-color: transparent;
    box-sizing: border-box;
    margin: 30px 0;
    width: 100%;

    & textarea {
        padding: 30px;
        width: 100%;
        border: 1px solid #ddd;
        box-sizing: border-box;
        background-color: white;
        border-radius: 5px;
        margin: 0;
        font-family: 'Montserrat', Helvetica, sans-serif;
        font-size: 16px;
    }

    & div {
        width: 100%;
    }

    & button {
        padding: 15px 20px;
        padding-top: 17px;
        background-color: #ff7777;
        color: white;
        border: none;
        border-radius: 10px;
        position: relative;
        float: right;
        margin-top: 10px;
        font-size: 16px;

        &:hover {
            background-color: #ee6666;
            cursor: pointer; 
        }
    }

    & h6 {
        margin-bottom: 15px;
    }
`;

const plusIcon = css`
    font-size: 20px;
    position:relative;
    bottom: 1px;
`;

@observer
export class CommentNew extends Component {
    render() {
    return (
        <div className={box}>
            <textarea rows="4" placeholder="Post a comment..." ref="newComment" value={this.props.state.newComment.text} onChange={this.props.handleComment}></textarea>

            <button onClick={this.props.addComment}>
                <Icon.FaPlusSquareO className={plusIcon}/> COMMENT
            </button>
        </div>
    );
    }
}
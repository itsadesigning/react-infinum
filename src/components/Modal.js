import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

import { FaClose } from 'react-icons/lib/fa';

const buttonClose = css`
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    margin: 15px 15px 0 0;
    padding-bottom: 5px;
    font-size: 20px;
    border: 1px solid #dadada;
    background-color: white;
    border-radius: 100%;
    color: #ccc;
    width: 40px;
    height: 40px;

    &:hover {
        background-color: #ff7777;
        color: white;
        cursor: pointer; 
        transition: .3s;
        border: none;
    }
`;

const opened = css`
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    margin: auto;
    border-radius: 3px;
`;

@observer
export class Modal extends Component {

    render() {

        const { children } = this.props;

        return (
            <div className={opened}>            
                <button
                    className={buttonClose}
                    onClick={this.props.close}
                ><FaClose />
                </button>
                {children}
            </div>
        );
    }
}
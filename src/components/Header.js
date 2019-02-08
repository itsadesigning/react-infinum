import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

import * as Icon from 'react-icons/lib/fa';

import logo from '../images/img-logo-horizontal@3x.png';

import { css } from 'emotion';

const wrapper = css`
    width: 80%;
    margin: auto;
`;

const header = css`
    width: 100%;
    height: auto;
    background-color: #ffffff;
    border-bottom: 1px solid #eee;
`;

const container = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 80px;
    grid-gap: 10px;
    align-items: center;
`;

const div1 = css`
    grid-column: 1;
`;

const div2 = css`
    grid-column: 3;
    text-align: right;
`;

const navLogo = css`
    height: 25px;
    margin-top: 5px;
`;

const navLogin = css`
    text-decoration: none;
    font-size: 20px;
    color: #ff758c;
`;

const logoutIcon = css`
    font-size: 24px;
    color: #ccc;
    margin-left: 10px;

    &:hover {
        color: #444;
    }
`;

@inject('state')
@observer
export class Header extends Component {

    @action.bound
    _logout(){
        
        this.props.state.user = {
            email: '',
            password: ''
        };

        sessionStorage.clear();
    }

    render() {
        return (
            <header className={header}>
                <div className={wrapper}>
                    <nav className={container}>
                        <div className={div1}><Link to='/shows'><img className={navLogo} src={logo} alt="Logo"/></Link></div>
                        <div className={div2}><div className={navLogin}>{this.props.state.loggedInUser}<Link to='/login' className={logoutIcon} onClick={this._logout}><Icon.FaSignOut/></Link></div></div>
                    </nav>
                </div>
            </header>
        );
    }
}
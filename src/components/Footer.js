import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';

import logo from '../images/img-logo-horizontal@3x.png';
import facebook from '../images/facebook.png';
import linkedin from '../images/linkedin.png';
import twitter from '../images/twitter.png';

import { css } from 'emotion';

const footer = css`
    width: 100%;
    height: 200px;
    position: absolute;
    background-color: #ffffff;
    margin-top: 50px;
    border-top: 1px solid #eee;
`;

const navLogo = css`
    list-style: none;
    height: 25px;
`;

const wrapper = css`
    width: 80%;
    margin: auto;
    margin-top: 60px;
`;

const footerLink = css`
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
`;

const icons = css`
    display: grid;
    grid-template-column: 1fr 1fr 1fr;
    grid-column-gap: 10px;
    float: right;
`;

const imgBox1 = css`
    grid-column: 1;
    width: 50px;
`;
const imgBox2 = css`
    grid-column: 2;
    width: 50px;
`;
const imgBox3 = css`
    grid-column: 3;
    width: 50px;
`;

@observer
export class Footer extends Component {
    render() {
        return (
            <div>
                <footer className={footer}>
                    <div className={wrapper}>
                        <Link to='/shows'><img className={navLogo} src={logo} alt="Site logo" /></Link>
                        <div>
                            <Link className={footerLink} to='/aboutus'>About Us &middot;</Link>
                            <Link className={footerLink} to='/privacy'> Privacy &middot;</Link>
                            <Link className={footerLink} to='/terms'> Terms & Conditions</Link>
                        </div>
                        <span className={footerLink}>&copy; 2018 US Shows. All rights reserved. Additional terms and conditions may apply.</span>
                        <div className={icons}>
                            <Link className={imgBox1} to='/facebook'><img src={facebook} className={imgBox1} alt="Facebook." /></Link>
                            <Link className={imgBox2} to='/linkedin'><img src={linkedin} className={imgBox2} alt="Linked in." /></Link>
                            <Link className={imgBox3} to='/twitter'><img src={twitter} className={imgBox3} alt="Twitter." /></Link>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
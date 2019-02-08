import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { postUser } from '../services/user';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

import eye from '../images/eye.png';

import { css } from 'emotion';

import { FaCheckSquare, FaSquare} from 'react-icons/lib/fa';

const loginWrapper = css`
  padding: 5px;
  margin: auto;
  width: 25%;
  margin-top: 12%;
`;

const customInput = css`
  margin: 10px 0;
  border: none;
  outline: none;
  width: 70%;
  border-bottom: 1px solid #ff758c;
  background-color: transparent;
  color: #ff7777;
  font-size: 22px;
`;

const imgButton = css`
  border: none;
  background-color: transparent;
`;

const showHideImg = css`
  width: 30px;
  margin-left: 10px;
`;

const checkBoxDiv = css`
  font-size: 12px;
  margin: 20px 0;
  display: block;
  
`;

const checkBox = css`
  border: none;
  background-color: transparent;
  float: left;
  margin-right: 5px;
  color: #ff7777;
  font-size: 15px;
  margin-bottom: 5px;
`;

const checkBoxTextButton = css`
  background-color: transparent;
  border: none;
  margin-top: 2px;
`;

const loginButton = css`
  background-color: #ff7777;
  border-radius: 5px;
  height: 35px;
  width: 150px;
  font-size: 12px;
  border: none;
  color: white;
`;

const errorText = css`
  margin-top: 20px;
  font-size: 16px;
  color: #ff7777;
`;

const divRegisterLink = css`
  margin-top: 80px;
  font-size: 12px;
  text-decoration: none;
`;

const registerLink = css`
  font-size: 12px;
  text-decoration: none;
`;

@inject('state')
@observer
export class LoginContainer extends Component {

  @action
  componentDidMount() {
    this.props.state.rememberMe = false;
    this.props.state.error = '';
    this.props.state.user.email = localStorage.getItem('email');
  }

  @observable
  componentState = {
    isPasswordShowing : false,
    rememberMe : false
  }

  @action.bound
  _showHidePassword() {
    this.componentState.isPasswordShowing = !this.componentState.isPasswordShowing;
  }

  @action.bound
  _handleUsernameChange(event) {
    this.props.state.user.email = event.target.value;
  }

  @action.bound
  _handlePasswordChange(event) {
    this.props.state.user.password = event.target.value;
  }

  @action.bound
  async _login() {
    await postUser(this.props.state, this.props.history, '/sessions');
    this.componentState.rememberMe ? localStorage.setItem('email', this.props.state.user.email) : null;
  }

  @action.bound
  _toggleCheckbox() {
    this.componentState.rememberMe = !this.componentState.rememberMe;
  }

  @action.bound 
  _handleKeyPress(e) {
    console.log('AA')
    if (e.key === 'Enter') {
      this._login();
    }
  }

  render() {
    const { state } = this.props;

    return (
      <div className={loginWrapper}>

      {/* USERNAME */}
        <div>
          <label htmlFor="username">My username is</label><br />
          <input className={customInput} type="text" id="username" value={state.user.email} onChange={this._handleUsernameChange}/>
        </div>

      {/* PASSWORD */}
        <div>
          <label htmlFor="password">and my password is</label><br />
          <input className={customInput} type={this.componentState.isPasswordShowing ? 'text' : 'password'} id="password" value={state.user.password} onChange={this._handlePasswordChange}/>
          <button className={imgButton} onClick={this._showHidePassword}>
            <input type="image" src={eye} name="show/hide" className={showHideImg} alt="Show or hide password." />
          </button>
        </div>

      {/* LOGIN */}
        <div className={checkBoxDiv}>
          <button 
            className={checkBox}
            onClick={this._toggleCheckbox}>
          {this.componentState.rememberMe ? <FaCheckSquare/> : <FaSquare/>}
          </button> 
          <input 
            type="checkbox" 
            value={this.props.state.rememberMe} 
            onChange={this._toggleCheckbox}
          />
          <button 
            className={checkBoxTextButton} 
            onClick={this._toggleCheckbox}
          >Remember Me</button><br/>
        </div>

        <button className={loginButton} onClick={this._login}>LOGIN</button>

        <div className={errorText}>{state.error}</div>

        <div className={divRegisterLink}>Still don't have an account? <Link className={registerLink} to='/register'>Register</Link></div>
      </div>
    );
  }
}

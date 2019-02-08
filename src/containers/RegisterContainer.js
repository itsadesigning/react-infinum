import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { postUser } from '../services/user';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

import { css } from 'emotion';

import { FaCheckSquare, FaSquare} from 'react-icons/lib/fa';

const wrapper = css`
  padding: 25px;
  margin: auto;
  width: 30%;
  margin-top: 12%;
`;

const aboveRegister = css`
  width: 100%;
  text-align: center;
  color: #111;
  margin-bottom: 40px;
`;

const labelInput = css`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 15px auto;
  width: 100%;
`;

const label = css`
  font-size: 18px;
  justify-self: end;
  align-self: end;
  margin-right: 10%;
  color: #555;
`;

const customInput = css`
  margin:  0;
  border: none;
  outline: none;
  width: 100%;
  border-bottom: 1px solid #ff758c;
  background-color: transparent;
  color: #ff7777;
  font-size: 18px;
  align-self: end;
`;

const checkBoxDiv = css`
  font-size: 12px;
  margin: 20px auto;
  display: grid;
  grid-template-row: 1fr 1fr 1fr 1fr;
  grid-auto-row: 50px;
  grid-row-gap: 20px;
  width: 100%;
`;

const checkBox = css`
  grid-row: 1;
  align-self: center;
  justify-self: center;
`;

const checkBoxButton = css`
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

const registerLink = css`
  font-size: 12px;
  text-decoration: none;
`;

const divRegisterLink = css`
  margin-top: 80px;
  font-size: 12px;
  text-decoration: none;
  grid-row: 4;
  align-self: center;
  justify-self: center;
`;

const submit = css`
  background-color: #ff7777;
  border-radius: 5px;
  height: 35px;
  width: 150px;
  font-size: 12px;
  grid-row: 2;
  border: none;
  color: white;
  align-self: center;
  justify-self: center;
`;

const errorText = css`
  margin-top: 20px;
  font-size: 16px;
  color: #ff7777;
  grid-row: 3;
  margin: auto;
`;

@inject('state')
@observer
export class RegisterContainer extends Component {
    
  @observable
  componentState = {
    terms : false,
    isPasswordShowing: false,
  }

  @action
  componentDidMount() {
    this.props.state.error = '';
    this.props.state.user.email = '';
    this.props.state.user.password = '';
  }

  @action.bound
  _toggleCheckbox() {
    this.componentState.terms = !this.componentState.terms;
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
  _register() {
    this.componentState.terms ?
    postUser(this.props.state, this.props.history, '') 
    : this.props.state.error = 'You must check the terms button';
  }

  render() {

    const { state } = this.props;

    return (
      <div className={wrapper}>
        <div className={aboveRegister}>Enter your data below</div>

        {/* USERNAME */}
        <div className={labelInput}>
          <label className={label} htmlFor="username">Email</label>
          <input className={customInput} type="text" id="username" value={state.user.email} onChange={this._handleUsernameChange}/>
        </div>

        {/* PASSWORD */}
        <div className={labelInput}>
          <label className={label} htmlFor="password">Password</label>
          <input className={customInput} type={this.componentState.isPasswordShowing ? 'text' : 'password'} id="password" value={state.user.password} onChange={this._handlePasswordChange}/>
        </div>

        {/* REGISTER */}
        <div className={checkBoxDiv}>
          <div className={checkBox}>
          <button 
            className={checkBoxButton}
            onClick={this._toggleCheckbox}>
          {this.componentState.terms ? <FaCheckSquare/> : <FaSquare/>}
          </button> 
          <button 
            className={checkBoxTextButton}
            onClick={this._toggleCheckbox}>
          I accept the terms and conditions.
          </button> 
          </div><br />
          <button className={submit} onClick={this._register}>REGISTER</button>
          
          <div className={errorText}>{state.error}</div>

          <div className={divRegisterLink}>You already have an acoount? <Link className={registerLink} to='/login'>Login</Link></div>
        </div>       
      </div>
    );
  }
}

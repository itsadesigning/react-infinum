import React, { Component } from 'react';
import { css } from 'emotion';

import { observer, inject } from 'mobx-react';
import { action, observable, runInAction } from 'mobx';

import { uploadFile } from '../services/media';
import { addEpisode } from '../services/episodes';

import { Modal } from '../components/Modal';
import { Form } from '../components/Form';


const main = css`
  position: fixed;
  top: 0;
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
`;

const previewImage = css`
  display: block;
  margin: auto;
  max-height: 100px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

@inject('state')
@observer
export class AddEpisodeModal extends Component {

  @observable
  componentState = {
    title: '',
    description: '',
    episodeNumber: '1',
    season: '1',
    showId: this.props.state.currentShow._id,
    mediaId: '',
    imageUrl: '',
    imagePreview: ''
  };
  
  @action.bound
  _onDrop(files) {
    const data = new FormData();
    data.append('file', files[0]);

    this.componentState.imgData = data;

    this.componentState.imagePreview = <img className={previewImage} src={files[0].preview} alt="Episode"/>
  }

  @action.bound
  _onInputChange(fieldName, fieldValue = 'value') {
    return action((event) => {
      const value = event.target[fieldValue];
      this.componentState[fieldName] = value;
    });
  }

  @action.bound
  async _submitForm(event) {
    event.preventDefault();

    const data = await uploadFile(this.componentState.imgData)
    
    runInAction(() => {
      this.componentState.imageUrl = data.path;
      this.componentState.mediaId = data._id;
    });

    await addEpisode(this.props.state, this.componentState);
  }
  
  @action.bound
  _closeModal() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <div className={main}></div>
        <Modal close={this._closeModal} >
            <Form 
              state={this.componentState} 
              submit={this._submitForm}
              close={this._closeModal}
              onInputChange={this._onInputChange}
              onDrop={this._onDrop}
              />
        </Modal>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
import { css } from 'emotion';

import { FaCamera } from 'react-icons/lib/fa';

const form = css`
    padding: 25px 20px;
    font-size: 18px;
    width: 25vw;
    border-radius: 9px;
    color: #999;

    & h4 {
        font-size: 22px;
        margin: 0;
        color: #444;
    }
`;

const input = css`
    margin: 20px 0;
    border: none; 
    border-bottom: 1px solid #ddd;
    width: 100%;
    font-size: 20px; 
    height: 30px; 

    &::placeholder {
        color: #ddd;
        
    }
`;

const textarea = css`
    margin: 20px 0;
    border: none; 
    border: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    width: 100%;
    font-size: 20px; 
    padding: 5px 5px;

    &::placeholder {
        color: #ddd;
    }
`;

const seasonEpisode = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const inline = css`
    display: flex;
    marging: 10px 0;
`;

const select = css`
    border: none;
    font-size: 18px;
    background-color: transparent;
    margin: 0 15px;
    border-bottom: 1px solid #ddd;
    flex: 1;
`;

const dropzone = css`
    padding: 30px;
    border: 1.5px dashed #ccc;
    margin-top: 23px;
    text-align: center;
`;

const submit = css`
    border: none;
    border-radius: 4px;
    background-color: #ff7777;
    position: relative;
    padding: 10px 15px;
    font-size: 18px;
    color: white;
    margin: 10px 0;
    left: 50%;
    transform: translateX(-50%);

    &:hover {
        cursor: pointer;
    }
`;

const uploadIcon = css`
    display: block;
    font-size: 28px;
    margin-bottom: 10px;
    margin: auto;
    color: #ffdddd;
`;



@observer
export class Form extends Component {

  render() {
    const x = [1,2,3,4,5,6,7,8,9,10];
    const textInDropzone =
    !this.props.state.imagePreview ? 
        <div><FaCamera className={uploadIcon}/> Drag your image or browse </div> :
        'Add different photo';

    return (
      <form className={form} onSubmit={this.props.submit}>
        <h4>Add new episode</h4>
        <Dropzone className={dropzone} onDrop={this.props.onDrop}>
            {this.props.state.imagePreview}
            {textInDropzone}
        </Dropzone>
        <input
            className={input}
            type="text"
            placeholder="Episode title"
            onChange={this.props.onInputChange('title')}
            value={this.props.state.title}
        />
        <div className={seasonEpisode}>
        <div className={inline}>
            <label>Season:</label>
            <select className={select} value={this.props.state.season} onChange={this.props.onInputChange('season')}>
                {
                    x.map(function(x){
                        return <option value={x} key={`${x}Season`}>{x}</option>;
                    })
                }
            </select>
        </div>
        <div className={inline}>
            <label>Episodes:</label>
            <select className={select} value={this.props.state.episodeNumber} onChange={this.props.onInputChange('episodeNumber')}>
                {
                    x.map(function(x){
                        return <option value={x} key={`${x}Episode`}>{x}</option>;
                    })
                }
            </select>
        </div>
        </div>
        <textarea
            className={textarea}
            type="text"
            placeholder="Episode description"
            onChange={this.props.onInputChange('description')}
            value={this.props.state.description}
            rows="3"
        />
        <input
            className={submit}
            value="Add episode"
            type="submit"
        />
      </form>
    );
  }
}

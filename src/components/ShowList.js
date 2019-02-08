import React, { Component } from 'react';

import { ShowComponent } from '../components/ShowComponent';

import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import { css, cx } from 'emotion';

const container = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 15px;
    column-gap: 15px;
    padding-bottom: 50px;
    border-bottom: 1px solid #eee;
    margin: 15px 0;
    height: 400px;
    overflow: hidden;
`;

const showContainer = css`
    transition: .3s;
    height: auto;
`;

const title = css`
    margin: 40px 0;
    
    * {
        display: inline;
    }
`;

const seeAll = css`
    margin-left: 15px;
    border: none;
    background-color: transparent;
    color: #ff7777;
    font-size: 16px;

    &:hover {
        cursor: pointer; 
    }
`;

@observer
export class ShowList extends Component {

    @observable
    componentState = {
        seeEp : true
    }

    @action.bound
    _seeAll() {
        this.componentState.seeEp = !this.componentState.seeEp;
    }

    render() {
        return (
            <div>
                {
                this.props.state.length >= 1 ? 
                <div>
                <div className={title}>
                    <h3>{this.props.titleText}</h3>
                    {
                        this.props.state.length > 4 ? 
                        <button className={seeAll} onClick={this._seeAll}>
                        {!this.componentState.seeEp ? 'See all' : 'Hide shows'}</button> : null
                    }
                </div>
                <div className={cx(container, { [showContainer]: this.componentState.seeEp })}>
                    {   
                        this.props.state.map((show) => (
                            <ShowComponent show={show} key={show._id} />
                        ))
                    }
                </div>
                </div> : null
                }
            </div>
            );
    }
}
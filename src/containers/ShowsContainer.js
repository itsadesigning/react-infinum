import React, { Component } from 'react';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ShowList } from '../components/ShowList';

import { getAllShows as getAll } from '../services/shows';
import { observer, inject } from 'mobx-react';

import { css } from 'emotion';

const wrapper = css`
    width: 80vw;
    margin: auto;
    margin-top: 60px;
`;

const showList = css`
    margin: 20px 0px;
`;

@inject('state')
@observer
export class ShowsContainer extends Component {

    componentDidMount() {
        getAll(this.props.state);
    }

    render() {

        const favourites = JSON.parse(localStorage.getItem(`${sessionStorage.getItem('email')}_favourites`));

        return (
            <div>
            <Header />
            <div className={wrapper}>

                <ShowList 
                    className={showList}
                    state={this.props.state.shows}
                    titleText='All shows'
                />    

                <ShowList 
                    className={showList}
                    state={favourites}
                    titleText='Favourite shows'    
                />

            </div>
            <Footer />
            </div>
        );
    }
}
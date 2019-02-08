import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import { ShowsContainer } from './containers/ShowsContainer';
import { ShowDetailsContainer } from './containers/ShowDetailsContainer';
import { EpisodeDetailsContainer } from './containers/EpisodeDetailsContainer';
import { LoginContainer } from './containers/LoginContainer';
import { RegisterContainer } from './containers/RegisterContainer';
import { AddEpisodeModal } from './containers/AddEpisodeModal';

import state from './state';
import { Provider } from 'mobx-react';
import { configure } from 'mobx';

import { injectGlobal } from 'emotion';

configure({ enforceActions: true });

injectGlobal`
    * {
    font-family: 'Montserrat', Helvetica, sans-serif;
    padding:0;
    margin:0;
    }

    body {
    font-size: 22px;
    background-color: #fafafa;
    }

    h1,h2,h3,h4,h5,h6 {
        margin: 20px 0;
    }

    input[type=checkbox] {
        display: none;
    }

    input[type=checkbox]:checked ~ div {
        background: red;
    }
`;

ReactDOM.render((
    <Provider state={state}>
        <Router>
            <div>
                <Route path="/" exact component={ LoginContainer } />
                <Route path="/shows" exact component={ ShowsContainer } />
                <Route path="/shows/:id" component={ ShowDetailsContainer } />
                <Route path="/shows/:id/addepisode" component={ AddEpisodeModal } />
                <Route path="/episodes/:id" exact component={ EpisodeDetailsContainer } />
                <Route path="/login" exact component={ LoginContainer } />
                <Route path="/register" exact component={ RegisterContainer } />
                <Route path='/facebook' component={() => window.location = 'https://www.facebook.com'} />
            </div>
        </Router>
    </Provider>
), document.querySelector('.js-app'));
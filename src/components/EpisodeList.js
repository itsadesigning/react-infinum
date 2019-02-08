import React, { Component } from 'react';

import { EpisodeComponent } from './EpisodeComponent';

import { observer } from 'mobx-react';

@observer
export class EpisodeList extends Component {
    render() {
        return (
            <div>
            {
            this.props.state.episodes.length > 0 ? 
                this.props.state.episodes.map((episode) => (
                <EpisodeComponent key={episode._id} episode={episode} /> ))
                :  <h6> There are no episodes </h6>
            }
            </div>
            );
    }
}
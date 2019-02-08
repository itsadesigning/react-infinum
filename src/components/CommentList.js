import React, { Component } from 'react';

import { CommentComponent } from './CommentComponent';

import { observer } from 'mobx-react';

@observer
export class CommentList extends Component {
    render() {
        return (
            <div>
            {
            this.props.state.comments.length ? 
                this.props.state.sortedComments.map((comment) => 
                (
                <CommentComponent key={comment._id} comment={comment} state={this.props.state}/> 
                ))
                :  <h6> There are no comments </h6>
            }
            </div>
            );
    }
}
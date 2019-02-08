import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';
import { css } from 'emotion';

const box = css`
    position: relative;
    display: grid;
    grid-template-rows: 6fr 1fr;
`;

const boxImage = css`
    width: 100%;
    height: 100%;
    margin: 0;
`;

const boxName = css`
    font-size: 18px;
    color: #333;
    align-self: center;
`;

@observer
export class ShowComponent extends Component {
    render() {
        return (
            <div className={box}>
                <Link to={`/shows/${this.props.show._id}`} >
                    <img className={boxImage} src={`https://api.infinum.academy${this.props.show.imageUrl}`} alt="Show box." />
                </Link>
                <span className={boxName}>
                    {this.props.show.title}
                </span>
            </div>
        );
    }
}
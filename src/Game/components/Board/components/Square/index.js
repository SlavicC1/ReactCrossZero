import React from 'react';
import './index.css';

export default class Square extends React.Component {
    render() {
      return (
        <button 
          className={this.props.class + " game-border-square"}
          onClick={this.props.onClick}>
            {this.props.value}
        </button>
      );
    }
  }
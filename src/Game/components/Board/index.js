import React from 'react';

import Square from './components/Square';
import './index.css';

export default  class Board extends React.Component {
  renderSquare(i) {
      return <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        class={this.props.spetialSquares.includes(i) ? 'game-board-importantSquare' : ''}
      />;
  }
  
  render() {

    const board = [];
    for(let y=0; y < this.props.height; y++){
      let row = [];
      for(let x=0; x < this.props.width; x++){
        const index = y * this.props.width + x;
        row.push(this.renderSquare(index));
      }
      board.push(<div className="game-board-row">{row}</div>);
    }

    return (
      <div>
        {board}
      </div>
    );
  }
}
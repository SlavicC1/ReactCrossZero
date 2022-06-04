import React from 'react';

import Board from './components/Board';
import Info from './components/Info';
import './index.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { 
          squares: Array(9).fill(null),
          move: {
            x: null,
            y: null
          },
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  calculateWinner(squares){
    const lines = [
      [0 ,1 ,2 ],
      [3 ,4 ,5 ],
      [6 ,7 ,8 ],
      [0, 4, 8 ],
      [6, 4, 2 ],
      [0, 3, 6 ],
      [1, 4, 7 ],
      [2, 5, 8 ]
    ];

    for( let i=0; i < lines.length; i++){
      let [a, b, c] = lines[i];
      if( squares[a] && squares[a] === squares[b] && squares[b] === squares[c] ){
        return lines[i];
      }
    }

    return [];
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if(this.calculateWinner(squares).length > 0 || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
          move: {
            x: Math.floor(i / 3),
            y: i % 3
          }
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpToMove(i){
    this.setState({
      stepNumber: i,
      xIsNext: ( i % 2 ) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares) ? 
      this.state.history[this.state.stepNumber].squares[this.calculateWinner(current.squares)[0]] : null;

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            width={3}
            height={3}
            onClick={(i) => this.handleClick(i)}
            spetialSquares={this.calculateWinner(current.squares)}
          />
        </div>
        <Info 
          history={history} 
          xIsNext={this.state.xIsNext}
          winner={winner}
          jumpToMove={this.jumpToMove.bind(this)}
          currentStepNumber={this.state.stepNumber}
          boardSize={9}
        />
      </div>
    );
  }
}
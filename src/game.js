import React from 'react';

import Board from './board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) },
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
        return squares[a];
      }
    }

    return null;
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if(this.calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {squares: squares}
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
    const winner = this.calculateWinner(current.squares);

    let status;
    if (winner){
      status = `Winner is ${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map((step, move) => {
      const desk = move ? 
        `Go to move #${move}` : 
        `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpToMove(move)}>{desk}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
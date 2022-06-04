import React from 'react';

import './index.css';

export default class Info extends React.Component{

    render(){
        let status;
        if (this.props.winner){
            status = `Winner is ${this.props.winner}`
        } else {
            if(this.props.currentStepNumber === this.props.boardSize){
                status = `No free cells left (Game Ends)`;
            } else{
                status = `Next player: ${this.props.xIsNext ? 'X' : 'O'}`;
            }
        }

        const moves = this.props.history.map((step, move) => {
            const cuurMoveIs  = move % 2 === 0 ? 'O' : 'X';
            const desk = move ? 
                `Go to move #${move} (${step.move.x + 1}:${step.move.y + 1} - ${cuurMoveIs})` : 
                `Go to game start`;
            return (
                <li key={move}>
                    <button 
                        onClick={() => this.props.jumpToMove(move)} 
                        className={this.props.currentStepNumber === move ? 'game-info-currentState': ''}>{desk}
                    </button>
                </li>
            );
        });

        return (
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        );
    }
};
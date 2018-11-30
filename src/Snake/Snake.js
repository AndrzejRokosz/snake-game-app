import React from 'react'
import GameBoard from './GameBoard'

class Snake extends React.Component {
    constructor(props) {
        super()
        this.intervalId=null
        const halfBoardDimension = Math.ceil(props.boardDimension / 2)-1
        this.state = {
            gameBoard: (
                Array(props.boardDimension)
                    .fill(Array(props.boardDimension)
                        .fill(1))
            ),
            snakes: [
                [
                    { x: halfBoardDimension + 2, y: halfBoardDimension },
                    { x: halfBoardDimension+1, y: halfBoardDimension }
                ],
                [
                    { x: halfBoardDimension - 2, y: halfBoardDimension },
                    { x: halfBoardDimension - 1, y: halfBoardDimension }
                ]
            ],
            meals: [
              
            ],
            directions:[
                'right',
                'left'
            ],
            currentPlayerIndex:0

        }
    }
    gameTick=()=>{
        console.log("tick")
    }
    componentDidMount(){
            this.intervalId=setInterval(
                this.gameTick,1000
            )
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    composeGameBoard = () => {
        const gameBoardCopy = JSON.parse(JSON.stringify(this.state.gameBoard))


        this.state.snakes
            .forEach(snake => (
                snake.forEach(bodyCellPosition => (
                    gameBoardCopy[bodyCellPosition.y][bodyCellPosition.x] = 0
                ))
            ))

        this.state.meals.forEach(mealPosition => (
            gameBoardCopy[mealPosition.y][mealPosition.x] = 'F'
        ))

        return gameBoardCopy
    }

    render() {
        const gameBoard = this.composeGameBoard()//kopia gameBoarda

        return (
            <div>
                {
                    <GameBoard
                        gameBoard={gameBoard}
                    />
                }
            </div>
        )
    }
}
Snake.defaultProps = {//export default propsow
    //@TODO it should be checked if bigger than 5 
    boardDimension: 10
}

export default Snake
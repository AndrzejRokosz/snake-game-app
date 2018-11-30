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
            currentPlayerIndex:0,
            gameTickTime:props.startGameTickTime

        }
    }
    gameTick=()=>{
        console.log("tick")
    }
    componentDidMount(){
            this.intervalId=setInterval(
                this.gameTick,
                this.state.gameTickTime)
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    checkIfMovesAreAvailable=()=>{
        this.state.snakes.forEach((snakePositions,i)=>{
            const snakeHeadPosition=snakePositions[0]
            const direction=this.state.directions[i]
            let newSnakeHeadPosition=null
            
            switch(direction){
                case 'left':
                newSnakeHeadPosition={
                    x:snakeHeadPosition.x-1,
                    y:snakeHeadPosition.y
                }
                break
                case 'right':
                newSnakeHeadPosition={
                    x:snakeHeadPosition.x+1,
                    y:snakeHeadPosition.y
                }
                break
                case 'top':
                newSnakeHeadPosition={
                    x:snakeHeadPosition.x,
                    y:snakeHeadPosition.y-1
                }
                break
                case 'bottom':
                newSnakeHeadPosition={
                    x:snakeHeadPosition.x,
                    y:snakeHeadPosition.y+1
                }
                break
                default:
            }

        })
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
    boardDimension: 10,
    startGameTickTime: 1000
}

export default Snake
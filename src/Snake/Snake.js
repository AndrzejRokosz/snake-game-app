import React from 'react'


class Snake extends React.Component {
    state = {
        gameBoard: (
            Array(this.props.boardDimension)
                .fill(Array(this.props.boardDimension)
                    .fill(1))
        )
    }
    render() {
        return (

            <div>

            </div>
        )
    }
}


Snake.defaultProps = {
    //@TODO it should be checked if bigger than 5 
    boardDimension: 10
}

export default Snake
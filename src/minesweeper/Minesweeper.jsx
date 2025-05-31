import styles from "./Minesweeper.module.css"
import {useState} from "react";

const width = 11
const height = 11
const numMines = 25

const neighbors = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
]

function MSCell() {
    this.isOpen = false
    this.neighbors = 0
    this.isMine = false
    this.isFlagged = false
}

function MSGrid() {
    this.cells = []

    for(let i = 0; i < height; i++) {
        let row = []
        for(let k = 0; k < width; k++) {
            row.push(new MSCell())
        }
        this.cells.push(row)
    }

    this.generate = function(clickX,clickY) {
        do {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    this.cells[y][x].isMine = false
                }
            }
            for (let i = 0; i < numMines; i++) {
                let x, y
                do {
                    x = Math.floor(Math.random() * width)
                    y = Math.floor(Math.random() * height)
                } while (this.cells[y][x].isMine === true)
                this.cells[y][x].isMine = true
            }
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let neighborMines = 0
                    this.withNeighbors(x, y, (nX, nY) => { if (this.cells[nY][nX].isMine) neighborMines++ })
                    this.cells[y][x].neighbors = neighborMines
                }
            }
        } while(this.cells[clickY][clickX].neighbors !== 0 || this.cells[clickY][clickX].isMine);
    }

    this.open = function(clickX, clickY) {
        let cell = this.cells[clickY][clickX]
        if(cell.isMine) {
            cell.isOpen = true
            return true
        }

        if(cell.isOpen) {
            let numFlags = 0
            let uncoveredMine = false
            this.withNeighbors(clickX, clickY, (x, y) => { if(this.cells[y][x].isFlagged) numFlags++ })
            if(numFlags === cell.neighbors && numFlags !== 0) {
                this.withNeighbors(clickX, clickY, (x, y) => {
                    let neighborCell = this.cells[y][x]
                    if(!neighborCell.isFlagged) {
                        if(neighborCell.neighbors === 0) this.open(x, y)
                        else neighborCell.isOpen = true
                        if(neighborCell.isMine) uncoveredMine = true
                    }
                })
            }
            return uncoveredMine
        }

        cell.isOpen = true

        if(cell.neighbors === 0) {
            this.withNeighbors(clickX, clickY, (x, y) => this.open(x, y))
        }

        return false
    }

    this.withNeighbors = function(x, y, fun) {
        for (let neighbor of neighbors) {
            let neighborX = neighbor[0] + x
            let neighborY = neighbor[1] + y
            if (neighborX < 0 || neighborX >= width || neighborY < 0 || neighborY >= height) continue
            fun(neighborX, neighborY)
        }
    }

    this.checkWin = function() {
        for(let row of this.cells) {
            for(let cell of row) {
                if(!cell.isOpen && !cell.isMine) return false
            }
        }
        return true
    }

    this.canSolve = function() {

    }
}

function GridItem({cell, onClick, onFlag}) {
    if(cell.isFlagged) return <button className={styles.flaggedCell + " " + styles.cell} onContextMenu={onFlag}>
        {
            cell.isOpen
        }
    </button>
    else if(cell.isOpen) return <button className={styles.openCell + " " + styles.cell} onClick={onClick}>
        {cell.isMine ? "💣" : cell.neighbors > 0 ? cell.neighbors : ""}
    </button>
    else return <button className={styles.closedCell + " " + styles.cell} onClick={onClick} onContextMenu={onFlag} />
}

function Minesweeper() {
    const [grid, setGrid] = useState(new MSGrid())
    const [gameState, setGameState] = useState("fresh")

    let fresh = gameState === "fresh"
    //let active = gameState === "active"
    let win = gameState === "win"
    let loss = gameState === "loss"

    let style = "card " + styles.minesweeper
    if(win) style += " " + styles.win
    if(loss) style += " " + styles.loss

    return <div className={style}>
        <div>
            M I N E S W E E P E R
            <span/>
        </div>
        <table onContextMenu={(e) => e.preventDefault()}>
            <tbody>
            {
                grid.cells.map((row, y) => (
                    <tr>
                        {row.map((cell, x) => (
                            <td>
                                <GridItem cell={cell} onClick={() => {
                                    if (loss || win || cell.isFlagged) return
                                    if (fresh) {
                                        grid.generate(x, y)
                                        grid.open(x, y)
                                        setGameState("active")
                                    } else if (grid.open(x, y)) setGameState("loss")
                                    else if (grid.checkWin()) setGameState("win")

                                    setGrid({...grid})
                                }} onFlag={(e) => {
                                    e.preventDefault()
                                    if (fresh) return

                                    cell.isFlagged = !cell.isFlagged
                                    setGrid({...grid})
                                }}/>
                            </td>
                        ))}
                    </tr>
                ))
            }
            </tbody>
        </table>
        <button className={styles.gameButton} onClick={() => {
            setGameState("fresh")
            setGrid(new MSGrid())
        }}> {win ? "New Game" : "Reset"}
        </button>
    </div>

}

export default Minesweeper
import {useEffect, useRef, useState} from "react"

const cellSize = 15
const pullCoefficient = cellSize
const drawLines = false
const initSolverSteps = 5

const cold = [250,250,250]
const medium = [0, 190, 255]
const hot = [120, 250, 200]
const mediumPoint = 5

function inverp(a, b, x) {
    const scalingFactor = 15
    let l = 1 - scalingFactor/(x+scalingFactor)
    return b*l + a*(1-l)
}

function lerp(a, b, x) {
    return a*(1-x) + x*b
}

function Cell () {
    this.velocity = [0, 0]
    this.color = function() {
        let velocity = Math.sqrt(Math.pow(this.velocity[0], 2) + Math.pow(this.velocity[1], 2))
        let medRangeScalar = Math.pow(velocity/mediumPoint, 2)
        if(velocity <= mediumPoint) return [
            lerp(cold[0], medium[0], medRangeScalar),
            lerp(cold[1], medium[1], medRangeScalar),
            lerp(cold[2], medium[2], medRangeScalar)
        ]
        else return [
            inverp(medium[0], hot[0], velocity-mediumPoint),
            inverp(medium[1], hot[1], velocity-mediumPoint),
            inverp(medium[2], hot[2], velocity-mediumPoint)
        ]
    }
}

function FluidSim (canvasWidth, canvasHeight) {
    this.width = Math.ceil(canvasWidth / cellSize)
    this.height = Math.ceil(canvasHeight / cellSize)
    this.cells = Array(this.height)
        .fill(null).map(() => {
            return Array(this.width).fill(null).map(() => {
                return new Cell()
            })
        })
    this.solverSteps = initSolverSteps

    this.draw = function(ctx) {
        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                let curCell = this.cells[y][x]
                let color = curCell.color()
                ctx.fillStyle = `rgb(${color[0]} ${color[1]} ${color[2]})`;
                ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize)
            }
        }
        if(drawLines) {
            const vectorLength = 1
            ctx.strokeStyle = "black"
            ctx.lineWidth = 2
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    let curCell = this.cells[y][x]
                    ctx.beginPath()
                    ctx.moveTo((x + 0.5) * cellSize, (y + 0.5) * cellSize)
                    ctx.lineTo((x + 0.5) * cellSize + vectorLength * curCell.velocity[0], (y + 0.5) * cellSize + vectorLength * curCell.velocity[1])
                    ctx.stroke()
                }
            }
        }
    }

    this.applyVelocity = function(x, y, vX, vY) {
        let cX = Math.floor(x/cellSize)
        let cY = Math.floor(y/cellSize)
        let cell = this.cells[cY][cX]
        cell.velocity[0] += vX * pullCoefficient / cellSize
        cell.velocity[1] += vY * pullCoefficient / cellSize
        if (cX > 0) {
            this.cells[cY][cX - 1].velocity = [cell.velocity[0], cell.velocity[1]]
        }
        if (cX < this.width - 1) {
            this.cells[cY][cX + 1].velocity = [cell.velocity[0], cell.velocity[1]]
        }
        if (cY > 0) {
            this.cells[cY - 1][cX].velocity = [cell.velocity[0], cell.velocity[1]]
        }
        if (cY < this.height - 1) {
            this.cells[cY + 1][cX].velocity = [cell.velocity[0], cell.velocity[1]]
        }
    }

    this.correctDivergence = function() {
        let divOnly = this.getDivOnly()
        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                this.cells[y][x].velocity[0] -= divOnly[y][x][0]// * 0.5
                this.cells[y][x].velocity[1] -= divOnly[y][x][1]// * 0.5
            }
        }
    }

    this.setBoundary = function() {
        for(let x = 0; x < this.width; x++) {
            this.cells[0][x].velocity[1] = 0
            this.cells[this.height - 1][x].velocity[1] = 0
        }
        for(let y = 0; y < this.height; y++) {
            this.cells[y][0].velocity[0] = 0
            this.cells[y][this.width - 1].velocity[0] = 0
        }
    }

    this.getDivOnly = function() {
        let divField = Array(this.height)
            .fill(null).map(() => {
                return Array(this.width).fill(null).map(() => {
                    return 0
                })
            })


        let retval = Array(this.height)
            .fill(null).map(() => {
                return Array(this.width).fill(null).map(() => {
                    return [0,0]
                })
            })

        for(let i = 0; i < this.solverSteps; i++) {
            let newDivField = Array(this.height)
                .fill(null).map(() => {
                    return Array(this.width).fill(null).map(() => {
                        return 0
                    })
                })

            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    let divergence = 0
                    let heightSum = 0
                    let curVel = this.cells[y][x].velocity
                    if (x > 0) {
                        divergence += (curVel[0] - this.cells[y][x - 1].velocity[0])
                        heightSum += divField[y][x - 1]
                    }
                    if (x < this.width - 1) {
                        divergence += (this.cells[y][x + 1].velocity[0] - curVel[0])
                        heightSum += divField[y][x + 1]
                    }
                    if (y > 0) {
                        divergence += (curVel[1] - this.cells[y - 1][x].velocity[1])
                        heightSum += divField[y - 1][x]
                    }
                    if (y < this.height - 1) {
                        divergence += (this.cells[y + 1][x].velocity[1] - curVel[1])
                        heightSum += divField[y + 1][x]
                    }
                    newDivField[y][x] = (divergence + heightSum)/4
                }
            }
            divField = newDivField
        }

        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                let gradient = [0,0]
                if(x > 0) {
                    gradient[0] += divField[y][x - 1]
                }
                if(x < this.width - 1) {
                    gradient[0] -= divField[y][x + 1]
                }
                if(y > 0) {
                    gradient[1] += divField[y - 1][x]
                }
                if(y < this.height - 1) {
                    gradient[1] -= divField[y + 1][x]
                }
                retval[y][x] = [gradient[0]/2, gradient[1]/2]
            }
        }

        return retval
    }

    this.advect = function(dtime) {
        let newCells = Array(this.height)
            .fill(null).map(() => {
                return Array(this.width).fill(null).map(() => {
                    return new Cell()
                })
            })

        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                let curCell = this.cells[y][x]


                //get dest coord = velocity * dtime
                //for the 4 neighbor cells, linear interpolate and add for each
                let dispX = dtime * curCell.velocity[0]
                let dispY = dtime * curCell.velocity[1]

                let dx = Math.floor(x - dispX)
                let dy = Math.floor(y - dispY)
                if(dx < 0) dx = 0
                if(dx >= this.width - 1) dx = this.width - 2
                if(dy < 0) dy = 0
                if(dy >= this.height - 1) dy = this.height - 2

                //add bounds here
                let xPercent = dispX - Math.floor(dispX)
                if(xPercent >= 1) xPercent = 1
                let yPercent = dispY - Math.floor(dispY)
                if(yPercent >= 1) yPercent = 1

                let BL = xPercent * yPercent
                let TR = (1 - xPercent) * (1 - yPercent)
                let BR = (1 - xPercent) * yPercent
                let TL = xPercent * (1 - yPercent)



                newCells[y][x].velocity[0] +=
                    BL * this.cells[dy][dx].velocity[0] +
                    TL * this.cells[dy + 1][dx].velocity[0] +
                    BR * this.cells[dy][dx + 1].velocity[0] +
                    TR * this.cells[dy + 1][dx + 1].velocity[0]

                newCells[y][x].velocity[1] +=
                    BL * this.cells[dy][dx].velocity[1] +
                    TL * this.cells[dy + 1][dx].velocity[1] +
                    BR * this.cells[dy][dx + 1].velocity[1] +
                    TR * this.cells[dy + 1][dx + 1].velocity[1]

            }
        }

        this.cells = newCells
    }
}

export default function FluidCanvas() {
    const canvas = useRef(null)
    const prevTouches = useRef([])
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    const [sim, setSim] = useState(new FluidSim(width, height))

    useEffect(() => {
        if(canvas === null) return;
        let curCanvas = canvas.current
        let ctx = curCanvas.getContext('2d')

        let resizeHandler = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
            setSim(new FluidSim(window.innerWidth, window.innerHeight))
        }

        let mouseMoveHandler = (e) => {
            sim.applyVelocity(e.x, e.y, e.movementX, e.movementY)
        }

        let touchMoveHandler = (e) => {
            for(let t of e.touches) {
                let prevTouch = prevTouches.current.find((pt) => pt.identifier === t.identifier)
                if(prevTouch === undefined) {
                    prevTouches.current.push(t)
                    continue
                }
                let movementX = t.clientX - prevTouch.clientX
                let movementY = t.clientY - prevTouch.clientY
                sim.applyVelocity(t.clientX, t.clientY, movementX, movementY)
            }
        }

        window.addEventListener("mousemove", mouseMoveHandler)
        window.addEventListener("resize", resizeHandler)
        window.addEventListener("touchmove", touchMoveHandler)

        let updater = setInterval(() => {
            let start = Date.now()
            sim.correctDivergence()
            sim.advect(0.05)
            sim.correctDivergence()
            sim.setBoundary()
            sim.draw(ctx)
            let end = Date.now()
            let duration = end-start
            if(duration > 50 && sim.solverSteps > 3) sim.solverSteps--
            if(duration < 30) sim.solverSteps++
            //console.log("duration: " + duration + "  solveSteps: " + sim.solverSteps)
        }, 50)


        //console.log("registered handlers")

        return () => {
            window.removeEventListener("mousemove", mouseMoveHandler)
            window.removeEventListener("resize", resizeHandler)
            window.removeEventListener("touchmove", touchMoveHandler)
            clearInterval(updater)

            //console.log("deregistered handlers")
        }
    }, [sim])

    return <canvas ref={canvas} width={width} height={height} className="fluidCanvas"/>
}
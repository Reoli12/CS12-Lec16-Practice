import { Array } from 'effect'

class MultiplicationGame {
    n: number
    k: number = 1
    currentTurn: number
    root: Element
    nNode = document.createElement('p')
    kNode = document.createElement('p')
    turnNode = document.createElement('p')
    prevListNode = document.createElement('p')
    winnerNode = document.createElement('p')
    functionalButtonsNode = document.createElement('div') // where working number buttons depend
    displayButtonsNode = document.createElement('div') // children are buttons that dont work
    previousNumsChosenList: string = ''
    resetButton = document.createElement('button')

    printer: MultiplicationGameView
    
    constructor(nMin: number, nMax: number, printer: MultiplicationGameView) {
        this.printer = printer
        this.n = getRandomInt(nMin, nMax)
        this.currentTurn = 0
        this.turnNode.textContent = printer.getCurrentPlayerMessage(this.currentTurn)
        this.kNode.textContent = this.printer.getKNotifierMessage(this.k)
        this.nNode.textContent = this.printer.getNNotifierMessage(this.n)
        this.prevListNode.textContent = this.previousNumsChosenList

        this.root = document.querySelector('#root')!

        for (const child of Array.make(this.turnNode, this.kNode, this.nNode, 
            this.prevListNode, this.functionalButtonsNode))
            {
                this.root.appendChild(child)
            }

        const numsArray = Array.range(2, 9)

        for (const num of numsArray) {
            const functionalNumButton = document.createElement('button')
            functionalNumButton.textContent = `   ${num}   `
            functionalNumButton.addEventListener('click', () => {
                this.handleInput(num)
            })
            this.functionalButtonsNode.append(functionalNumButton)

            const nonFunctionalNumButton = document.createElement('button')
            nonFunctionalNumButton.textContent = functionalNumButton.textContent  // no eventListener!
            this.displayButtonsNode.appendChild(nonFunctionalNumButton)
        }

        this.resetButton.addEventListener('click', () => this.reset())
        this.resetButton.textContent = 'Reset'

        this.root.appendChild(this.functionalButtonsNode)

        const winnerNode = document.createElement('p')
    }

    async handleInput(num: number): Promise<void> {
        console.log(`${num} button pressed `)
        this.k *= num
        this.kNode.textContent = printer.getKNotifierMessage(this.k)
        this.currentTurn = (this.currentTurn + 1) % 2
        this.turnNode.textContent = printer.getCurrentPlayerMessage(this.currentTurn)
        this.previousNumsChosenList += ` ${num}` // String.concat() throws errors for some reason
        this.prevListNode.textContent = this.previousNumsChosenList

        // replace buttons with identical-looking buttons but with different eventListeners
        this.root.removeChild(this.functionalButtonsNode)
        this.root.appendChild(this.displayButtonsNode)

        await delay(500)
        // bring back buttons
        this.root.removeChild(this.displayButtonsNode)
        this.root.appendChild(this.functionalButtonsNode)

        if (this.k >= this.n) {
            this.root.removeChild(this.functionalButtonsNode)
            this.root.appendChild(this.displayButtonsNode)

            this.winnerNode.textContent = this.printer.getWinningMessage(this.currentTurn)
            this.root.appendChild(this.winnerNode)

            this.root.appendChild(this.resetButton)

        }
    }

    reset(): void {
        this.root.removeChild(this.winnerNode)
        this.root.removeChild(this.displayButtonsNode)
        this.root.appendChild(this.functionalButtonsNode)

        this.k = 1
        this.n = getRandomInt(100, 10000)
        this.kNode.textContent = this.printer.getKNotifierMessage(this.k)
        this.nNode.textContent = this.printer.getNNotifierMessage(this.n)

        this.previousNumsChosenList = ' '
        this.prevListNode.textContent = this.previousNumsChosenList

        this.currentTurn = 0
        this.turnNode.textContent = this.printer.getCurrentPlayerMessage(this.currentTurn)
        this.root.removeChild(this.resetButton)
    }


}

class MultiplicationGameView {
    getCurrentPlayerMessage(playerNum: number): string {
        return `Player ${playerNum + 1}'s turn `
    }

    getKNotifierMessage(k: number): string {
        return `k is currently ${k}`
    }

    getNNotifierMessage(n: number): string {
        return `n is ${n}`
    }

    getWinningMessage(playerNum: number): string {
        return `Player ${playerNum + 1} wins! `
    }
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random()*(max - min) + min)
}

const delay = (ms: number) => new Promise((resolve) =>  setTimeout(resolve, ms))

const printer = new MultiplicationGameView()
const game = new MultiplicationGame(1000, 10000, printer)
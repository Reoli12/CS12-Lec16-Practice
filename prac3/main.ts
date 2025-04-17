import { Array, String } from 'effect'

async function main() {

    const root = document.querySelector('#root')!

    let k = 1
    let n: number = getRandomInt(100, 10000)
    let currentTurn: number = 0
    let previousNumsChosenList = ''

    const numChoices = Array.range(2, 9)

    // make nodes for n, k, and list of previous moves
    const turnNode = document.createElement('p')
    const kNode = document.createElement('p')
    const nNode = document.createElement('p')
    const prevListNode = document.createElement('p')

    turnNode.textContent = `Player ${currentTurn + 1}'s turn`
    kNode.textContent = `k is currently ${k}`
    nNode.textContent = `n is ${n}`
    prevListNode.textContent = previousNumsChosenList

    const winnerNode = document.createElement('p')

    const functionalButtonsNode = document.createElement('div') // where working number buttons depend
    const displayButtonsNode = document.createElement('div') // children are buttons that dont work

    for (const child of Array.make(turnNode, kNode, nNode, prevListNode)) {
        root.appendChild(child)
    }

    // making reset button
    
    const resetButton = document.createElement('button')
    resetButton.textContent = 'Reset'

    resetButton.addEventListener('click', () => {

        root.removeChild(winnerNode)
        root.removeChild(displayButtonsNode)
        root.appendChild(functionalButtonsNode)

        k = 1
        kNode.textContent = `k is currently ${k}`
        n = getRandomInt(100, 10000)
        nNode.textContent = `n is ${n}`

        previousNumsChosenList = ' '
        prevListNode.textContent = previousNumsChosenList

        currentTurn = 0
        turnNode.textContent = `Player ${currentTurn + 1}'s turn`
        root.removeChild(resetButton)
    })

    // making nonfunctional buttons
    for (const num of numChoices) {
        const nonFunctionalNumButton = document.createElement('button')
        nonFunctionalNumButton.textContent = `  ${num}  ` // not eventListener
        displayButtonsNode.appendChild(nonFunctionalNumButton)
    }

    // making functional buttons
    for (const num of numChoices) {
        const functionalNumButton = document.createElement('button')

        functionalNumButton.textContent = `  ${num}  `
        functionalNumButton.addEventListener('click', async () => 
            {
                k *= num
                kNode.textContent = `k is currently ${k}`
                currentTurn = (currentTurn + 1) % 2
                turnNode.textContent = turnNode.textContent = `Player ${currentTurn + 1}'s turn`
                previousNumsChosenList = String.concat(previousNumsChosenList, ` ${num}`)
                prevListNode.textContent = previousNumsChosenList
                // replace buttons with identical-looking buttons but with different eventListeners
                root.removeChild(functionalButtonsNode)
                root.appendChild(displayButtonsNode)
                
                await delay(500)
                // bring back buttons
                root.removeChild(displayButtonsNode)
                root.appendChild(functionalButtonsNode)

                if (k >= n) {
                    winnerNode.textContent = `Player ${currentTurn + 1} wins! `

                    root.removeChild(functionalButtonsNode)
                    root.appendChild(displayButtonsNode)
                    root.appendChild(winnerNode)
                    root.appendChild(resetButton)

                }

            }
        )
        functionalButtonsNode.appendChild(functionalNumButton)
        root.appendChild(functionalButtonsNode)
    }
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random()*(max - min) + min)
}

const delay = (ms: number) => new Promise((resolve) =>  setTimeout(resolve, ms))

main()
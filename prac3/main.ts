import { Array, String } from 'effect'

async function main() {

    const root = document.querySelector('#root')!

    let k = 1
    const n: number = getRandomInt(100, 10000)
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

    for (const child of Array.make(turnNode, kNode, nNode, prevListNode)) {
        root.appendChild(child)
    }

    // making buttons
    for (const num of numChoices) {
        const numButton = document.createElement('button')
        numButton.textContent = `  ${num}  `
        numButton.addEventListener('click', () => 
            {
                k *= num
                kNode.textContent = `k is currently ${k}`
                currentTurn = (currentTurn + 1) % 2
                // currentTurn++ // to account for mod
                // console.log(currentTurn)
                turnNode.textContent = turnNode.textContent = `Player ${currentTurn + 1}'s turn`
                previousNumsChosenList = String.concat(previousNumsChosenList, ` ${num}`)
                prevListNode.textContent = previousNumsChosenList
            }
        )
        root.appendChild(numButton)
    }
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random()*(max - min) + min)
}

main()
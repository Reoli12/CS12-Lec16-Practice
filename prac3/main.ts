import { Array, String } from 'effect'

async function main() {

    const root = document.querySelector('#root')!

    let k = 1
    const n: number = getRandomInt(100, 10000)
    let current_turn: number = 1
    let previousNumsChosenList = ''

    const numChoices = Array.range(2, 9)

    // make nodes for n, k, and list of previous moves
    const turnNode = document.createElement('p')
    const kNode = document.createElement('p')
    const nNode = document.createElement('p')
    const prevListNode = document.createElement('p')

    turnNode.textContent = `Player ${current_turn}'s turn`
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
                previousNumsChosenList = String.concat(previousNumsChosenList, ` ${num}`)
            }
        )
        root.appendChild(numButton)
    }
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random()*(max - min) + min)
}

main()
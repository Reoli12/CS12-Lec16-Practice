import { Array } from 'effect'

function main() {

    const root = document.querySelector('#root')! // root explicitly defined in html file

    const newCounterButton = document.createElement('button')
    newCounterButton.textContent = 'New Counter'

    newCounterButton.addEventListener('click', () => {
        addNewCounter(root)
    })

    root.appendChild(newCounterButton)


}

async function addNewCounter(root: Element) {
    const countText = document.createElement('p')
    let counter: number = 0
    countText.textContent = `${counter}`

    // initialize
    const startButton = document.createElement('button')
    startButton.textContent = 'Start'
    const resetButton = document.createElement('button')
    resetButton.textContent = 'Reset'
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'

    // event listeners
    let isCounting: boolean = false

    startButton.addEventListener('click', () => {
        isCounting = true
        // increment by one every one second
        
    })

    resetButton.addEventListener('click', () => {
        isCounting = false
        counter = 0
        countText.textContent = `${counter}`
    })

    deleteButton.addEventListener('click', () => {
        root.removeChild(node)
    })

    // append to node

    const node = document.createElement('div')
    const children = Array.make(countText, startButton, resetButton, deleteButton)

    for (const element of children) {
        node.appendChild(element)
    }

    root.appendChild(node)
}

main()
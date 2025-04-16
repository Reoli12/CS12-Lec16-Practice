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

    async function incrementCounter() {
        while (true) {
            console.log(' i ran ')
            await sleep(1000) // yield control to main for 1000ms
            if (isCounting) {
                counter++
                counterText.textContent = `${counter}`
                console.log(counter)
            }
        }
        
    }


    const counterText = document.createElement('p')
    let counter: number = 0
    counterText.textContent = `${counter}`

    // initialize
    const startButton = document.createElement('button')
    startButton.textContent = 'Start'
    const stopButton = document.createElement('button')
    stopButton.textContent = 'Stop'
    const resetButton = document.createElement('button')
    resetButton.textContent = 'Reset'
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'

    // event listeners
    let isCounting: boolean = false

    startButton.addEventListener('click', () => {
        isCounting = true
        node.removeChild(startButton)
        node.appendChild(stopButton)
        node.insertBefore(stopButton, resetButton)
    })

    stopButton.addEventListener('click', () => {
        isCounting = false
        node.removeChild(stopButton)
        node.appendChild(startButton)
        node.insertBefore(startButton, resetButton)
    })

    resetButton.addEventListener('click', () => {
        isCounting = false
        counter = 0
        counterText.textContent = `${counter}`
    })

    deleteButton.addEventListener('click', () => {
        root.removeChild(node)
    })

    // append to node

    const node = document.createElement('div')
    const children = Array.make(counterText, startButton, resetButton, deleteButton)

    for (const element of children) {
        node.appendChild(element)
    }

    root.appendChild(node)

    incrementCounter()
    
}

// from lecture
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

main()
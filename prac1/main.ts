import { Array } from 'effect'

function main() {

    function addNewCounter() {
        // adds a node to root, and all elements that compose a counter depends on that node

        const incrButton = document.createElement('button')
        const counterDisplay = document.createElement('p')
        const decrButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        const children = Array.make(incrButton, counterDisplay, decrButton, deleteButton)

        let counter: number = 0

        incrButton.textContent = '+'
        decrButton.textContent = '-'
        deleteButton.textContent = 'Delete'
        counterDisplay.textContent = `${counter}`

        const counterNode = document.createElement('div')
        
        for (const element of children) {
            counterNode.appendChild(element)
        }

        // event listeners

        incrButton.addEventListener('click', () => {
            counter++
            counterDisplay.textContent = `${counter}`
        })

        decrButton.addEventListener('click', () => {
            counter--
            counterDisplay.textContent = `${counter}`
        })

        deleteButton.addEventListener('click', () => {
            root.removeChild(counterNode)
        })

        root.appendChild(counterNode)
        
        
    }


    const root = document.querySelector('#root')! // root explicitly defined in html file

    const newCounterButton = document.createElement('button')
    newCounterButton.textContent = 'New Counter'

    newCounterButton.addEventListener('click', addNewCounter)

    root.appendChild(newCounterButton)


}

main()
// import {createStore} from 'https://cdn.skypack.dev/redux';

///////////////////////MY REDUX///////////////////////////
function createStore(reducer) {
    let state = reducer(undefined, {})
    const subscribers = []

    return {
        getState() {
            return state
        },
        dispatch(action) {
            state = reducer(state, action)
            subscribers.forEach(subscriber => subscriber())
        },
        subscribe(subscriber) {
            subscribers.push(subscriber)
        }
    }
}

//////////////////////////////////////////////////////////
const initState = 0
// reducer
function bankReducer(state = 0, action) {
    switch (action.type) {
        case 'DEPOSIT':
            return state + action.payload
        case 'WITHDRAW':
            return state - action.payload

        default:
            return state;
    }
}

const store = window.store = createStore(bankReducer)

function actionDeposit(payload) {
    return {
        type: 'DEPOSIT',
        payload
    }
}

function actionWithdraw(payload) {
    return {
        type: 'WITHDRAW',
        payload
    }
}

// DOM events
const deposit = document.querySelector('#deposit')
const withdraw = document.querySelector('#withdraw')

// Event handle 
deposit.onclick = function () {
    store.dispatch(actionDeposit(10))
}

withdraw.onclick = function () {
    store.dispatch(actionWithdraw(10))
}

// Listener
store.subscribe(() => {
    // console.log("Updated state ")
    render()
}) 


// Render 
function render() {
    const output = document.querySelector('#output')
    output.innerText = store.getState()
}

render()
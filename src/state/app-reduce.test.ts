import {appReducer, AppStateType, setErrorAC, setStatusAC} from "./app-reducer";


const startState:AppStateType={
    status:'idle',
    error:null
}

test('correct app SET-STATUS', () => {
    const action=setStatusAC('loading')
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading')
    expect(startState.status).toBe('idle')

});

test('correct app SET-ERROR', () => {
    const action=setErrorAC('AAA')
    const endState = appReducer(startState, action)

    expect(endState.error).toBe('AAA')
    expect(startState.error).toBe(null)

});
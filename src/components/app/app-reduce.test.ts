import {appReducer, AppStateType, setErrorAC, setInitializedAC, setLoggedAC, setStatusAC} from "./app-reducer";


const startState:AppStateType={
    status:'idle',
    error:null,
    isInitialized:false,
    isLoggedIn:false
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

test('correct app SET-INITIALIZED', () => {
    const action=setInitializedAC(true)
    const endState = appReducer(startState, action)

    expect(endState.isInitialized).toBe(true)
    expect(startState.isInitialized).toBe(false)

});

test('correct app SET-LOGGED', () => {
    const action=setLoggedAC(true)
    const endState = appReducer(startState, action)

    expect(endState.isLoggedIn).toBe(true)
    expect(startState.isLoggedIn).toBe(false)

});
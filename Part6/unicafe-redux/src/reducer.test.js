import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {
      
    }
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })
  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
  test('good, ok and bad is zeroed', () => {
    
    const action = {
      type: 'ZERO'
    }
    const state = initialState

    deepFreeze(state)
    const incrementGood = counterReducer(state, {type: 'GOOD'})
    const incrementOK = counterReducer(incrementGood, {type: 'OK'})
    const incrementBad = counterReducer(incrementOK, {type: 'BAD'})
    expect(incrementBad).toEqual({
      good: 1,
      ok: 1,
      bad: 1,
    })

    const newState = counterReducer(incrementBad, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    })
  })
})
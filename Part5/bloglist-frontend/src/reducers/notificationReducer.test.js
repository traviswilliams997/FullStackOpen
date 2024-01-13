import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('returns new state with action notification/setNotification', () => {
    const state = ''
    const action = {
      type: 'notification/setNotification',
      payload: 'error',
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toHaveLength(5)
    expect(newState).toBe(action.payload)
  })

  test('returns new state with action notification/clearNotification', () => {
    const state = 'error'
    const action = {
      type: 'notification/clearNotification',
    }
    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toHaveLength(0)
    expect(newState).toBe('')
  })
})

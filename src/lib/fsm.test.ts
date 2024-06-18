import { describe, expect, it } from 'vitest'
import fsm from './index'

describe('fsm', () => {
    it('should correctly initialize basic constructor', () => {
        const turnstile = new fsm(['locked', 'unlocked'])
        const {
            states: states,
            currentState
        } = turnstile.getStateInfo()
        expect(states).toEqual(['locked', 'unlocked'])
        expect(currentState).toBe('locked')
    })

    it('should correctly initialize full constructor', () => {
        const turnstile = new fsm(['locked', 'unlocked'], 'unlocked', {
            coin: {
                label: 'coin:locked=>unlocked',
                fn: () => {
                    return 'unlocked'
                }
            }
        })
        const {
            states: states,
            currentState
        } = turnstile.getStateInfo()
        expect(states).toEqual(['locked', 'unlocked'])
        expect(currentState).toBe('unlocked')
        const transitions = turnstile.getTransitions()
        expect(Object.keys(transitions)[0]).toBe('coin')
    })

    it('should error when trying to create transitions on nonexistent states', () => {
        const turnstile = new fsm(['locked', 'unlocked'])
        const nonexistentStartState = 'state1'
        const nonexistentEndState = 'state2'
        expect(() => turnstile.addTransition(nonexistentStartState, 'coin', 'unlocked')).toThrowError("state 'state1' not found")
        expect(() => turnstile.addTransition('locked', 'coin', nonexistentEndState)).toThrowError("state 'state2' not found")
    })

    it('should allow adding and calling transitions', () => {
        const turnstile = new fsm(['locked', 'unlocked'])
        turnstile.addTransition('locked', 'coin', 'unlocked')
        turnstile.addTransition('unlocked', 'push', 'locked')
        const { states: states, currentState } = turnstile.getStateInfo()
        expect(states).toEqual(['locked', 'unlocked'])
        expect(currentState).toBe('locked')

        // pushing the turnstile without adding a coin shouldn't unlock the turnstile
        turnstile.runTransition('push')
        expect(turnstile.getStateInfo().currentState).toBe('locked')

        // adding a coin to a locked turnstile should unlock the turnstile
        turnstile.runTransition('coin')
        expect(turnstile.getStateInfo().currentState).toBe('unlocked')

        // adding a coin to an unlocked turnstile should have no effect
        turnstile.runTransition('coin')
        expect(turnstile.getStateInfo().currentState).toBe('unlocked')

        // pushing (walking through) an unlocked turnstile should lock the turnstile
        turnstile.runTransition('push')
        expect(turnstile.getStateInfo().currentState).toBe('locked')
    })
})
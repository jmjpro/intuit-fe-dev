interface Transition {
    label: string,
    fn: () => string 
}

/*** 
 * roadmap:
 * add ability to remove a state
 * add ability to remove a transition
***/
export default class Fsm {
    #states: Set<string> = new Set()
    #currentState: string = ''
    #transitions: {[key: string]: Transition} = {}

    constructor(states?: string[], currentState?: string, transitions?: {[key: string]: Transition}) {
        if (!states || states.length === 0) {
            return
        }
        this.#states = new Set(states)
        // assume that the first state in the input list is the initial state
        this.#currentState = currentState || states[0]
        if (transitions) {
            this.#transitions = transitions
        }
    }

    addState(state: string) {
        this.#states.add(state)
        if (this.#states.size === 1) {
            this.#currentState = state
        }
    }

    buildTransition(state: string, input: string, nextState: string): Transition {
        if (!this.#states.has(state)) {
            throw `state '${state}' not found`
        }
        if (!this.#states.has(nextState)) {
            throw `state '${nextState}' not found`
        }
        return {
            label: `${input}:${state}=>${nextState}`,
            fn: () => {
                if (this.#currentState === state) {
                    this.#currentState = nextState    
                }
                return this.#currentState
            }
        }
    }

    addTransition(state: string, input: string, nextState: string) {
        this.#transitions[input] = this.buildTransition(state, input, nextState)
    }

    getStateInfo() {
        return {
            states: [...this.#states],
            currentState: this.#currentState
        }
    }

    getTransitions() {
        return this.#transitions
    }

    runTransition(transition: string): string {
        this.#currentState = this.#transitions[transition].fn()
        return this.#currentState
    }
}

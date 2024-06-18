import { useState } from 'react'
import { Activity, GitCommit } from 'react-feather'

import Fsm from './lib'

interface FsmBuilderProps {
  fsm: Fsm
  setFsm: React.Dispatch<React.SetStateAction<Fsm>>
}

function FsmBuilder({ fsm, setFsm }: FsmBuilderProps) {
  const { states, currentState } = fsm.getStateInfo()
  const [newState, setNewState] = useState<string>('')
  const [transitionStartState, setTransitionStartState] =
    useState<string>(currentState)
  const [transitionInput, setTransitionInput] = useState<string>('')
  const [transitionEndState, setTransitionEndState] =
    useState<string>(currentState)

  const handleAddState = () => {
    if (!newState) {
      alert('Please provide a value for the new state')
      return
    }
    setTransitionStartState(currentState)
    setTransitionEndState(currentState)
    setFsm((fsm) => {
      const { states, currentState } = fsm.getStateInfo()
      return new Fsm(
        [...states, newState],
        currentState || newState,
        fsm.getTransitions(),
      )
    })
    setNewState('')
  }

  const handleAddTransition = () => {
    if (!transitionStartState || !transitionInput || !transitionEndState) {
      console.log({ transitionStartState, transitionInput, transitionEndState })
      alert('Please provide transition start state, input, and end state')
      return
    }
    setFsm((fsm) => {
      fsm.addTransition(
        transitionStartState,
        transitionInput,
        transitionEndState,
      )
      const { states, currentState } = fsm.getStateInfo()
      return new Fsm(states, currentState, fsm.getTransitions())
    })
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddState()
        }}
      >
        <label>
          New state
          <input
            name="state"
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleAddState}>
          Add state <GitCommit size={16} />
        </button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddTransition()
        }}
      >
        <label>
          New transition
          <select
            name="transitionStartState"
            value={transitionStartState}
            onChange={(e) => setTransitionStartState(e.target.value)}
          >
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
          <input
            name="state"
            value={transitionInput}
            onChange={(e) => setTransitionInput(e.target.value)}
          />
          <select
            name="transitionEndState"
            value={transitionEndState}
            onChange={(e) => setTransitionEndState(e.target.value)}
          >
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
          <button onClick={handleAddTransition}>
            Add transition <Activity size={16} />
          </button>
        </label>
      </form>
    </>
  )
}

export default FsmBuilder

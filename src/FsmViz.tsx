import { PlayCircle } from 'react-feather'

import Fsm from './lib'

interface FsmVizProps {
  fsm: Fsm
  handleRunTransition: (input: string) => void
}

function FsmViz({ fsm, handleRunTransition }: FsmVizProps) {
  const { states, currentState } = fsm.getStateInfo()
  const transitionEntries = Object.entries(fsm.getTransitions())

  return (
    <>
      <div>
        States (current state in <strong>bold</strong>):{' '}
        {states.length > 0
          ? states.map((state, i) => {
              const renderedState =
                i === states.length - 1 ? `${state} ` : `${state}, `
              return (
                <span key={state}>
                  {state === currentState ? (
                    <strong>{renderedState}</strong>
                  ) : (
                    renderedState
                  )}{' '}
                </span>
              )
            })
          : 'none'}
      </div>

      <div>
        Transitions:{' '}
        {transitionEntries.length > 0
          ? transitionEntries.map(([input, { label }]) => (
              <button
                key={label}
                title="Run transition"
                onClick={() => handleRunTransition(input)}
              >
                {label} <PlayCircle size={16} />
              </button>
            ))
          : 'none'}
      </div>
    </>
  )
}

export default FsmViz

import { z } from 'zod'

import Fsm from '../lib'

const SchemaFsmDef = z.object({
  states: z.array(z.string()),
  currentState: z.string().optional(),
  transitions: z.array(z.array(z.string())).optional(),
})
type FsmDef = z.infer<typeof SchemaFsmDef>

function transformDefToFsm(fsmDef: FsmDef): Fsm {
  const { states, currentState, transitions } = fsmDef
  const fsm = new Fsm(states, currentState)
  if (transitions) {
    for (const transition of transitions) {
      const [state, input, nextState] = transition
      fsm.addTransition(state, input, nextState)
    }
  }
  return fsm
}

async function getFsmExample(example?: string) {
  if (!example) {
    return
  }

  // see /vite.config.js and /vercel.json, respectively, for where this path is proxied to a app.beeceptor.com URL in dev and production
  const queryPath = `/example-${example}`

  const res = await fetch(queryPath)
  if (!res.ok) {
    throw new Error(`Network response not ok for ${queryPath}`)
  }

  let json
  try {
    json = await res.json()
  } catch (err) {
    throw `Unable to parse json response for ${queryPath}`
  }
  const fsmDef = SchemaFsmDef.parse(json)
  return transformDefToFsm(fsmDef)
}

export { getFsmExample }

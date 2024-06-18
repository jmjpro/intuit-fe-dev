import { useQuery } from '@tanstack/react-query'
import {useState} from 'react'
import {Loader, Trash} from 'react-feather'

import { getFsmExample } from './data/fetch'
import Fsm from './lib'
import FsmBuilder from './FsmBuilder'
import FsmViz from './FsmViz'
import Spinner from './Spinner'
import styles from './FsmPlayground.module.css'

function FsmPlayground() {
    const [fsm, setFsm] = useState(new Fsm())
    const [example, setExample] = useState<'turnstile' | 'trafficlight'>()

    const fsmExampleQuery = useQuery({
        queryKey: ['example', example],
        queryFn: () => getFsmExample(example),
        enabled: example !== undefined
    })

    const handleRunTransition = (input: string) => {
        setFsm((fsm) => {
            const newCurrentState = fsm.runTransition(input)
            const {states} = fsm.getStateInfo()
            return new Fsm(states, newCurrentState, fsm.getTransitions())
        })
    }

    const handleResetState = () => setFsm(new Fsm())

    let message = ''

    if (fsmExampleQuery.isLoading) {
        message = `Loading example ${example}...`
        console.log(message)
        // return <div>{message}</div>
    }
    
    if (fsmExampleQuery.isError) {
        message = `Error loading example ${example}: ${fsmExampleQuery.error}`
        console.error(message)
        setExample(undefined)
        // return <div>{message}</div>
    }

    const {data: fsmExample} = fsmExampleQuery
    
    if (fsmExample) {
        setFsm(fsmExample)
        setExample(undefined)
    }

    return (
        <>
        <div>{message}</div>
        
        <main className={styles.main}>
            <FsmBuilder fsm={fsm} setFsm={setFsm} />
            <hr/>
            <FsmViz fsm={fsm} handleRunTransition={handleRunTransition} />
            <hr/>
            <div>
                <button onClick={handleResetState}>Reset state <Trash size={16}/></button>
                <button onClick={() => setExample('turnstile')}>Load turnstile FSM {example === 'turnstile' ? <Spinner/> : <Loader size={16}/>}</button>
                <button onClick={() => setExample('trafficlight')}>Load traffic light FSM {example === 'trafficlight' ? <Spinner/> : <Loader size={16}/>}</button>
            </div>
        </main>
        </>
    )
}

export default FsmPlayground

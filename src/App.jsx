import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Intro from './components/Intro'
import InvitationSheet from './components/InvitationSheet'

function App() {
  const [opened, setOpened] = useState(false)
  const invitat = new URLSearchParams(window.location.search).get('invitat')

  return (
    <>
      <AnimatePresence initial={false}>
        {!opened && <Intro key="intro" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && <InvitationSheet key="sheet" invitat={invitat} />}
    </>
  )
}

export default App

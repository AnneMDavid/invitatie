import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import InvitationCard from './InvitationCard'
import './InvitationSheet.css'

function InvitationSheet({ invitat }) {
  const prefersReducedMotion = useReducedMotion()
  const scrollRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousHeight = document.body.style.height

    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.height = previousHeight
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [])

  return (
    <motion.div
      className="invitation-sheet-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0.15 : 0.45, ease: 'easeInOut' } }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.35, ease: 'easeOut' }}
    >
      <motion.div
        className="invitation-sheet"
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: '100%' }}
        transition={{
          duration: prefersReducedMotion ? 0.2 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="invitation-sheet__viewport" ref={scrollRef}>
          <div className="invitation-sheet__content">
            <InvitationCard invitat={invitat} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default InvitationSheet

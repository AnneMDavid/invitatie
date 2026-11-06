import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState } from 'react'
import './Intro.css'

function Intro({ onOpen }) {
  const prefersReducedMotion = useReducedMotion()
  const [isOpening, setIsOpening] = useState(false)
  const [showHint, setShowHint] = useState(true)

  const handleOpen = useCallback(() => {
    if (isOpening) {
      return
    }

    setIsOpening(true)

    if (prefersReducedMotion) {
      setShowHint(false)
      onOpen?.()
      return
    }

    window.setTimeout(() => {
      setShowHint(false)
    }, 1200)

    window.setTimeout(() => {
      onOpen?.()
    }, 1900)
  }, [isOpening, onOpen, prefersReducedMotion])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleOpen()
    }
  }

  return (
    <motion.section
      className="intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="intro-inner">
        <motion.h2
          className="intro-title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          Ai primit o invitație
        </motion.h2>

        <motion.button
          type="button"
          className={`intro-envelope${isOpening ? ' is-opening' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Deschide invitația"
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.24 }}
        >
          <div className="envelope-back" aria-hidden="true" />

          <motion.div
            className={`inner-card${isOpening ? ' is-blank' : ''}`}
            style={{ x: '-50%' }}
            animate={
              isOpening
                ? { y: prefersReducedMotion ? -70 : '-55%' }
                : { y: 0 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.08 : 0.9,
              delay: prefersReducedMotion ? 0 : 0.7,
              ease: 'easeInOut',
            }}
          >
            {!isOpening && (
              <>
                <div className="card-scene" aria-hidden="true">
                  <span className="cloud cloud-left" />
                  <span className="cloud cloud-right" />
                  <span className="balloon balloon-one" />
                  <span className="balloon balloon-two" />
                  <span className="balloon balloon-three" />
                  <span className="star star-one" />
                  <span className="star star-two" />
                  <span className="star star-three" />
                  <span className="card-bear">
                    <span className="bear-ear bear-ear-left" />
                    <span className="bear-ear bear-ear-right" />
                    <span className="bear-head">
                      <span className="bear-face" />
                      <span className="bear-eye bear-eye-left" />
                      <span className="bear-eye bear-eye-right" />
                      <span className="bear-nose" />
                      <span className="bear-bow" />
                    </span>
                  </span>
                </div>
                <div className="card-copy">
                  <span className="card-kicker">Please join us for a</span>
                  <span className="card-title">Baby Shower</span>
                  <span className="card-name">Adeline Palmerston</span>
                </div>
              </>
            )}
          </motion.div>

          <div className="envelope-front" aria-hidden="true" />

          <motion.div
            className="envelope-flap"
            animate={{
              rotateX: isOpening ? 180 : 0,
              zIndex: isOpening ? 1 : 4,
            }}
            transition={{
              duration: prefersReducedMotion ? 0.05 : 0.6,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="wax-seal"
            aria-hidden="true"
            animate={{
              opacity: isOpening ? 0 : 1,
              scale: isOpening ? 0.8 : 1,
            }}
            transition={{ duration: prefersReducedMotion ? 0.05 : 0.25 }}
          >
            <span>♡</span>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {showHint && (
            <motion.p
              className="intro-hint"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.22 } }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              atinge pentru a deschide
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default Intro

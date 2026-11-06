import { motion } from 'framer-motion'
import './InvitationCard.css'

function InvitationCard() {
  return (
    <motion.main
      className="invitation-shell"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <div className="invitation-card" aria-hidden="true" />
    </motion.main>
  )
}

export default InvitationCard

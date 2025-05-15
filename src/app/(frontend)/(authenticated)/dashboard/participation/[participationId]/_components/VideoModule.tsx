'use client'

import { Participation } from '@/payload-types'
import { useState } from 'react'
import NextButton from './NextButton'
import { markProgress } from '../_actions/markProgress'

interface VideoModuleProps {
  module: any
  participation: Participation
  onCompleted: (updatedParticipation: Participation) => void
}

export default function VideoModule({ module, participation, onCompleted }: VideoModuleProps) {
  const [loading, setLoading] = useState(false)

  async function handleNextModule() {
    setLoading(true)
    try {
      const updatedParticipation = await markProgress(participation)
      if (updatedParticipation && updatedParticipation.progress !== undefined) {
        onCompleted(updatedParticipation) // Pass the updated participation object
      } else {
        console.error('Error updating participation progress')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-bold">{module.title}</h2>
      <div className="relative aspect-video border border-white overflow-hidden">
        <iframe
          src={module.playerUrl}
          style={{
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          allowFullScreen
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      <NextButton loading={loading} text="Next" onClick={handleNextModule} />
    </div>
  )
}

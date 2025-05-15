'use client'

import { Course, Participation } from '@/payload-types'
import { useState } from 'react'
import Curriculum from './Curriculum'
import CourseModule from './CourseModule'

export default function CourseViewer({ participation }: { participation: Participation }) {
  const [currentParticipation, setCurrentParticipation] = useState(participation)
  const [currentProgress, setCurrentProgress] = useState(currentParticipation.progress ?? 0)

  const course: Course = currentParticipation.course as Course

  async function handleComplete(updatedParticipation: Participation) {
    setCurrentParticipation(updatedParticipation)
    setCurrentProgress(updatedParticipation.progress ?? 0)
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <CourseModule
        key={currentProgress}
        module={course.curriculum?.[currentProgress]}
        onCompleted={handleComplete}
        participation={currentParticipation}
      />
      <Curriculum course={course} currentProgress={currentProgress} />
    </div>
  )
}

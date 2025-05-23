'use client'

import { Course, Participation } from '@/payload-types'
import Link from 'next/link'
import { HiPlay } from 'react-icons/hi'

export default function ResumeButton({ participation }: { participation: Participation }) {
  const course: Course = participation.course as Course
  const courseLength = course.curriculum?.length || 1
  let progress = participation.progress || 0
  progress = progress + 1
  const progressPercentage = Math.round((progress / courseLength) * 100)

  return (
    <Link
      href={`/dashboard/participation/${participation.id}`}
      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold rounded overflow-hidden transition ease-in-out duration-300"
    >
      <div className="flex flex-row items-center justify-between pl-2">
        <p className="text-sm font-semibold">{course.title}</p>
        <div className="flex items-center justify-center bg-teal-600 h-12 w-12">
          <HiPlay className="w-6 h-6"></HiPlay>
        </div>
      </div>
    </Link>
  )
}

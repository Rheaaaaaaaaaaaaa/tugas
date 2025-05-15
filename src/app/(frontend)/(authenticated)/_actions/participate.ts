'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from './getUser'
import type { Course } from '@/payload-types'

export default async function participate({ courseId }: { courseId: number }) {
  const payload = await getPayload({ config: configPromise })

  const user = await getUser()

  if (!user) {
    throw new Error('User not found')
  }

  try {
    const course: Course = await payload.findByID({
      collection: 'courses',
      id: courseId,
    })

    if (!course) {
      throw new Error('Course not found')
    }

    const createdParticipation = await payload.create({
      collection: 'participation',
      data: {
        course: course,
        customer: user.id,
        progress: 0,
      },
      overrideAccess: false,
      user,
    })

    return createdParticipation
  } catch (error) {
    console.error('Participation creation failed:', error)
    throw new Error('Error creating participation')
  }
}

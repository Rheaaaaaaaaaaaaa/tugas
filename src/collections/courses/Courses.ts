import { CollectionConfig } from 'payload'
import { VideoBlock } from './blocks/VideoBlock'
import { QuizBlock } from './blocks/QuizBlock'
import { FinishBlock } from './blocks/FinishBlock'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
    read: ({ req: { user } }) => {
      return Boolean(user)
    },
    create: ({ req: { user } }) => {
      return user?.collection === 'users'
    },
    update: ({ req: { user } }) => {
      return user?.collection === 'users'
    },
    delete: ({ req: { user } }) => {
      return user?.collection === 'users'
    },
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'desctiption',
      label: 'Description',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'curriculum',
      label: 'curriculum',
      type: 'blocks',
      blocks: [VideoBlock, QuizBlock, FinishBlock],
    },
  ],
}

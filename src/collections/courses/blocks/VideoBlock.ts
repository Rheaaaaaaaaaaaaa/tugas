import { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  labels: {
    singular: 'video',
    plural: 'video',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      label: 'Duration (in minutes)',
      type: 'text',
      required: true,
    },
    {
      name: 'playerUrl',
      label: 'Bunny Player URL',
      type: 'text',
      required: true,
    },
  ],
}

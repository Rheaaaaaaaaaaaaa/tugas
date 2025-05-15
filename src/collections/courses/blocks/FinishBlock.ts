import { name } from 'ejs'
import { Block } from 'payload'

export const FinishBlock: Block = {
  slug: 'finish',
  labels: {
    plural: 'Finish Blocks',
    singular: 'Finish Block',
  },
  fields: [
    {
      name: 'template',
      label: 'Certificate Template',
      type: 'code',
      required: true,
      admin: {
        description:
          'The template is used for the certificate. This should be a valid HTML EJS Template',
        language: 'html',
      },
    },
  ],
}

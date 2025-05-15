import { Block } from 'payload'

export const QuizBlock: Block = {
  slug: 'quiz',
  labels: {
    singular: 'Quiz',
    plural: 'Quizzes',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'question',
      label: 'Question',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'answer',
              label: 'Answer',
              type: 'text',
              required: true,
            },
            {
              name: 'correct',
              label: 'Correct',
              type: 'checkbox',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

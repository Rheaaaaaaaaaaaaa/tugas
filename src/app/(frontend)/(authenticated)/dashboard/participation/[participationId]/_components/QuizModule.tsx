import { Participation } from '@/payload-types'
import { useEffect, useState } from 'react'
import NextButton from './NextButton'
import { HiDocumentSearch } from 'react-icons/hi'
import { markProgress } from '../_actions/markProgress'

interface QuizModuleProps {
  module: any
  participation: Participation
  onCompleted: (updatedParticipation: Participation) => void
}
export default function QuizModule({ module, participation, onCompleted }: QuizModuleProps) {
  const [message, setMessage] = useState<string | null>('')
  const [userAnswer, setUserAnswer] = useState([])
  const [loading, setLoading] = useState(false)
  const [allAnswerAreCorrect, setAllAnswerAreCorrect] = useState(false)

  useEffect(() => {
    setEmptyUserAnswer()
  }, [])

  function setEmptyUserAnswer() {
    let temp = []
    temp = module.question.map((question: any) => {
      return question.answer.map((answer: any) => {
        return false
      })
    })
    setUserAnswer(temp)
  }

  async function handleNextModule() {
    setLoading(true)
    try {
      const updatedParticipation = await markProgress(participation)
      if (updatedParticipation && 'progress' in updatedParticipation) {
        onCompleted(updatedParticipation)
      } else {
        console.error('Error updating participation progress')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function checkAnswer(answerIndex: number) {
    let correct = true
    let length = module.question[answerIndex].answer.length
    for (let n = 0; n < length; n++) {
      let val = module.question[answerIndex].answer[n].correct ? true : false
      if (val !== userAnswer[answerIndex][n]) {
        correct = false
        break
      }
    }
    return correct
  }

  function checkAllAnswer() {
    for (let i = 0; i < module.question.length; i++) {
      if (!checkAnswer(i)) {
        return false
      }
    }
    return true
  }

  async function handleCheckAnswer() {
    if (checkAllAnswer()) {
      setAllAnswerAreCorrect(true)
      setMessage('All Answer are correct!')
      setUserAnswer([])
    } else {
      setMessage('Some Answers are incorrect. Multiple answers can be correct')
    }
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white">{module.title}</h2>

      <div className="relative w-full max-h-[500px] overflow-y-auto border border-gray-700 p-6 bg-gray-900 rounded-lg">
        {module.question.map((question: any, questionIndex: number) => {
          return (
            <div
              key={questionIndex}
              className="flex flex-col gap-4 mb-6 bg-gray-800 p-4 rounded-xl shadow-md"
            >
              <div className="flex flex-wrap items-start gap-2">
                <span className="font-bold text-white text-lg">{questionIndex + 1}.</span>
                <p className="font-bold text-white text-lg leading-snug break-all">
                  {question.question}
                </p>
              </div>
              {question.answer.map((answer: any, answerIndex: number) => {
                const answerKey = `${questionIndex}-${answerIndex}`
                return (
                  <div className="flex items-center gap-4 cursor-pointer" key={answerKey}>
                    <input
                      type="checkbox"
                      id={`answer-${answerKey}`}
                      onClick={(e) => {
                        setMessage('')
                        let tempAns = JSON.parse(JSON.stringify(userAnswer))
                        tempAns[questionIndex][answerIndex] = e.currentTarget.checked
                        setUserAnswer(tempAns)
                      }}
                      disabled={allAnswerAreCorrect}
                      className="h-4 w-4 text-teal-400 bg-gray-800 border-gray-600 rounded-full focus:ring-2 focus:ring-teal-500"
                    />
                    <label
                      htmlFor={`answer-${answerKey}`}
                      className="text-base font-medium text-gray-200"
                    >
                      {answer.answer}
                    </label>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {message && (
        <div className={`${allAnswerAreCorrect ? 'text-white' : 'text-red-500'} p-2 font-bold`}>
          {message}
        </div>
      )}

      <div className="flex flex-col gap-4 justify-center pb-8">
        {allAnswerAreCorrect ? (
          <NextButton loading={loading} text="Next" onClick={handleNextModule} />
        ) : (
          <button
            disabled={allAnswerAreCorrect}
            onClick={handleCheckAnswer}
            className="inline-flex gap-2 items-center border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
            <HiDocumentSearch className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

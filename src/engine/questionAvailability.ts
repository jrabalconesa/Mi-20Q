import type { Answer, Question } from '../types/game'

function hasAffirmativeAnswer(answer: Answer | undefined): boolean {
  return answer === 'yes' || answer === 'sometimes'
}

export function shouldAskQuestion(
  question: Question,
  questionsById: Record<string, Question>,
  answers: Record<string, Answer>
): boolean {
  if (question.skipIf?.some(condition => condition.answers.includes(answers[condition.questionId]))) return false
  if (!question.exclusiveGroup) return true

  return !Object.entries(answers).some(([questionId, answer]) => {
    if (!hasAffirmativeAnswer(answer)) return false
    const answeredQuestion = questionsById[questionId]
    return Boolean(
      answeredQuestion &&
      answeredQuestion.id !== question.id &&
      answeredQuestion.exclusiveGroup === question.exclusiveGroup
    )
  })
}

export function availableQuestions(
  questions: Question[],
  askedQuestionIds: string[],
  answers: Record<string, Answer> = {}
): Question[] {
  const questionsById = Object.fromEntries(questions.map(question => [question.id, question]))
  return questions.filter(question =>
    !askedQuestionIds.includes(question.id) &&
    shouldAskQuestion(question, questionsById, answers)
  )
}

import { Header } from '@/components/header-dashbord'
import { QuizCard } from '@/components/quiz-card'

// This would typically come from an API or database
const quizzes = [
  {
    id: 1,
    title: "Moroccan Family Values",
    description: "A quiz about the role of family in Moroccan society",
    questionCount: 10,
    createdAt: "2023-11-15"
  },
  {
    id: 2,
    title: "Moroccan Culture",
    description: "Test your knowledge of Moroccan traditions and customs",
    questionCount: 15,
    createdAt: "2023-11-20"
  },
  {
    id: 3,
    title: "Moroccan History",
    description: "Explore the rich history of Morocco",
    questionCount: 20,
    createdAt: "2023-11-25"
  }
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Quizzes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              title={quiz.title}
              description={quiz.description}
              questionCount={quiz.questionCount}
              createdAt={quiz.createdAt}
            />
          ))}
        </div>
      </main>
    </div>
  )
}


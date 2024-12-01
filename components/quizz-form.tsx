"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Quiz, QuizQuestion, StudentInfo } from "@/types/quiz";
import { useToast } from "@/hooks/use-toast";
import { StudentInfoCard } from "./student-info-card";
import { saveDoc } from '@/app/actions';


export default function QuizForm({ quiz,quizId }: { quiz: Quiz,quizId: string }) {
  // this a bug i will fix it later
  // this code not show the last Item,
  // i will dipplicate the last item
  // const [duplicateitem, setduplicateitem] = useState(false);
  // const lastQuestion = quiz.questions[quiz.questions.length - 1];
  // if (lastQuestion && ! duplicateitem) {
  //   setduplicateitem(true);
  //   quiz.questions.push({ ...lastQuestion }); // Clone and add to the array
  // }

  // the complete code
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [timeSpent, setTimeSpent] = useState<Record<number, number>>({}); // Track time for each question
  const [startTime, setStartTime] = useState<number>(Date.now()); // Start time for each question

  const { toast } = useToast();

  const handleStudentInfoSubmit = (info: StudentInfo) => {
    setStudentInfo(info);
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  // Function to calculate the time spent on the current question
  const updateTimeSpent = () => {
    const currentTime = Date.now();
    const time = currentTime - startTime; // Time difference in milliseconds
    setTimeSpent((prev) => ({
      ...prev,
      [currentQuestion]: (prev[currentQuestion] ?? 0) + time,
    }));
  };

  // Handle moving to the next question
  const goToNextQuestion = () => {
    updateTimeSpent(); // Update the time spent on the current question
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setStartTime(Date.now()); // Restart the timer for the new question
    }
  };

  // Handle moving to the previous question
  const goToPreviousQuestion = () => {
    updateTimeSpent(); // Update the time spent on the current question
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setStartTime(Date.now()); // Restart the timer for the new question
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTimeSpent(); // Final time update before submitting
    const calculatedScore = quiz.questions.reduce((acc, question, index) => {
      return acc + (answers[index] === question.answer ? 1 : 0);
    }, 0);

    setScore(calculatedScore);
    setQuizSubmitted(true);
    toast({
      title: "Quiz Submitted",
      description: `Your score: ${calculatedScore}/${quiz.questions.length}`,
    });

    const submissionData = {
      quizId:quizId,
      student: studentInfo?.name,
      studentId: studentInfo?.id,
      answers: quiz.questions.map((q, index) => ({
        questionNumber: index + 1,
        questionText: q.question,
        studentChoice: answers[index] || null,
        time: timeSpent[index] || 0,
      })),
    };
    console.log(saveDoc('answers',submissionData));
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setQuizSubmitted(false);
    setScore(0);
    setTimeSpent({});
    setStartTime(Date.now()); // Reset the timer
  };

  // Start the timer when the component is mounted
  useEffect(() => {
    setStartTime(Date.now()); // Start the timer when the first question is loaded
  }, [currentQuestion]);

  if (!studentInfo) {
    return <StudentInfoCard onSubmit={handleStudentInfoSubmit} />;
  }
  if (quizSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="container mx-auto p-4">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Quiz Results
              </CardTitle>
              <CardDescription>
                {studentInfo.name} (ID: {studentInfo.id}), you &apos; ve completed the
                quiz about Moroccan family values. Here &apos; s your score:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold mb-4">
                  {score} / {quiz.questions.length}
                </p>
                <p className="text-xl mb-6">
                  {score === quiz.questions.length - 1
                    ? "Perfect score! You have an excellent understanding of Moroccan family values!"
                    : score > quiz.questions.length / 2
                    ? "Great job! You have a good grasp of Moroccan family values."
                    : "You've learned some aspects of Moroccan family values. Keep exploring to deepen your understanding!"}
                </p>
                <Button onClick={restartQuiz}>Restart Quiz</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Moroccan Family Values Quiz
        </h1>
        <p className="mb-4 text-center">
          Student: {studentInfo.name} (ID: {studentInfo.id})
        </p>
        <form onSubmit={handleSubmit}>
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Question {currentQuestion + 1}</CardTitle>
              <CardDescription>
                {currentQuestion + 1} of {quiz?.questions?.length ?? 0}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuestionCard
                question={quiz.questions[currentQuestion]}
                selectedAnswer={answers[currentQuestion]}
                onAnswerChange={(answer) =>
                  handleAnswerChange(currentQuestion, answer)
                }
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>

              {(() => {
                if (currentQuestion < quiz.questions.length - 1) {
                  return (
                    <Button type="button" onClick={goToNextQuestion}>
                      Next
                    </Button>
                  );
                } else if(currentQuestion==quiz.questions.length-1) {
                  return <input className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer' type="submit" value="Submit" />;
                }
              })()}
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  selectedAnswer,
  onAnswerChange,
}: {
  question: QuizQuestion;
  selectedAnswer?: string;
  onAnswerChange: (answer: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">{question.question}</h2>
      <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange}>
        {question?.options?.map((choice, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={choice} id={`question-${index}`} />
            <Label htmlFor={`question-${index}`}>{choice}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

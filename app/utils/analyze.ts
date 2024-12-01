import { Quiz, QuizAnswer } from "@/types/quiz";
import { QuestionStatistics } from "@/types/statistiques";

export function calculateStudentsData(
  studentResponses: QuizAnswer,
  quizData: Quiz
) {
  return studentResponses.map((student) => {
    const studentStats = {
      score: 0,
      skip: 0,
      wrong: 0,
      time: 0,
    };

    student.answers.forEach((answer) => {
      const questionData = quizData.questions.find(
        (q) => q.question === answer.questionText
      );

      studentStats.time += answer.time;

      if (!answer.studentChoice) {
        // Question skipped
        studentStats.skip += 1;
      } else if (answer.studentChoice === questionData?.answer) {
        // Correct answer
        studentStats.score += 1;
      } else {
        // Wrong answer
        studentStats.wrong += 1;
      }
    });

    return {
      student: student.student,
      ...studentStats,
    };
  });
}

export function calculateQuestionStatistics(
  studentResponses: QuizAnswer[],
  quizData: Quiz
): QuestionStatistics {
  const questionStats: QuestionStatistics = {
    time: {},
    correct: {},
    skiped: {},
    wrong: {},
  };

  // Initialize stats for each question
  quizData.questions.forEach((_, index) => {
    const questionIndex = index + 1;
    questionStats.time[questionIndex] = 0;
    questionStats.correct[questionIndex] = 0;
    questionStats.skiped[questionIndex] = 0;
    questionStats.wrong[questionIndex] = 0;
  });

  // Process each student's responses
  studentResponses.forEach((student) => {
    student.answers.forEach((answer, index) => {
      const questionIndex = index + 1;
      const questionData = quizData.questions.find(
        (q) => q.question === answer.questionText
      );

      if (!questionData) return; // Skip if no matching question is found

      // Add time
      questionStats.time[questionIndex] += answer.time;

      if (!answer.studentChoice) {
        // Skipped question
        questionStats.skiped[questionIndex] += 1;
      } else if (answer.studentChoice === questionData.answer) {
        // Correct answer
        questionStats.correct[questionIndex] += 1;
      } else {
        // Wrong answer
        questionStats.wrong[questionIndex] += 1;
      }
    });
  });

  const totalStudents = studentResponses.length;

  // Compute averages
  Object.keys(questionStats.time).forEach((key) => {
    const index = parseInt(key, 10);
    questionStats.time[index] /= totalStudents;
    questionStats.correct[index] /= totalStudents;
    questionStats.skiped[index] /= totalStudents;
    questionStats.wrong[index] /= totalStudents;
  });

  return questionStats;
}

export function calculateTotals(stats: {
  time: { [key: number]: number };
  correct: { [key: number]: number };
  skiped: { [key: number]: number };
  wrong: { [key: number]: number };
}) {
  let correctSum = 0;
  let skipedSum = 0;
  let wrongSum = 0;
  const length = Object.keys(stats.correct).length;
  // Iterate over the keys (question numbers)
  Object.keys(stats.correct).forEach((key) => {
    correctSum += stats.correct[parseInt(key)];
    skipedSum += stats.skiped[parseInt(key)];
    wrongSum += stats.wrong[parseInt(key)];
  });

  // Multiply sums by the length (number of students or responses)
  correctSum *= length;
  skipedSum *= length;
  wrongSum *= length;

  return {
    totalCorrect: correctSum,
    totalSkipped: skipedSum,
    totalWrong: wrongSum,
  };
}

// average reonse time

export function calculateAverageTime(data: { time: number }[]): number {
    const totalTime = data.reduce((sum, item) => sum + item.time, 0);
    return totalTime / data.length;
  }

// students evaluation 

export function evaluateStudents(data: { student: string; score: number; skip: number; wrong: number; time: number }[]) {
  if (!Array.isArray(data) || data.length === 0) {
    return []; // Return an empty array for invalid or empty input.
  }

  const evaluatedStudents: { student: string; score: number; skip: number; wrong: number; time: number; evaluation: number }[] = [];

  for (let i = 0; i < data.length; i++) {
    const student = data[i];
    const evaluation = student.score - student.skip * 0.5 - student.wrong * 0.2 - student.time * 0.0001;

    evaluatedStudents.push({ ...student, evaluation });
  }

  evaluatedStudents.sort((a, b) => b.evaluation - a.evaluation);

  return evaluatedStudents;
}



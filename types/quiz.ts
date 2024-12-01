export interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
  }
  
  export interface Quiz {
    fileName:string;
    prompt:string;
    questions: QuizQuestion[];
    uploadedAt:string;
    userid:string;
  }
  
  export interface StudentInfo {
    name: string;
    id: string;
  }
  
  export interface QuizAnswer {
    quizId: string; // The ID of the quiz
    student: string; // The name of the student
    studentId: string; // The ID of the student
    answers: QuizAnswerDetail[]; // List of answers
  }
  
  export interface QuizAnswerDetail {
    questionNumber: number; // The question number in the quiz
    questionText: string; // The text of the question
    studentChoice: string | null; // The choice made by the student (null if unanswered)
    time: number; // The time spent on the question in seconds
  }
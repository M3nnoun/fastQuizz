export interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
  }
  
  export interface Quiz {
    fileName:string;
    prompt:string;
    questions: QuizQuestion[];
    uploadedAt:Date;
    userid:string;
  }
  
  export interface StudentInfo {
    name: string;
    id: string;
  }
  
export type QuestionStatistics = {
    time: { [key: number]: number };
    correct: { [key: number]: number };
    skiped: { [key: number]: number };
    wrong: { [key: number]: number };
  };
  
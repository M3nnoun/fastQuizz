import React from "react";
import { getQuizAnswers, getQuizz } from "@/app/actions";
import {
  calculateStudentsData,
  calculateQuestionStatistics,
  calculateTotals,
  calculateAverageTime,
  evaluateStudents
} from "@/app/utils/analyze";
import { CorrectPie } from "@/components/correct-pie";
import { AvgTime } from "@/components/avrege-reponse-time";
import { StudentsTop } from "@/components/top-student";

const answers = await getQuizAnswers("1PKHLDppWdwp16fETXZt");
const quiz = await getQuizz("1PKHLDppWdwp16fETXZt");

const studentStats=calculateStudentsData(answers, quiz);
const totlas = calculateTotals(calculateQuestionStatistics(answers, quiz));
// const totlaOfTotlas=totlas.totalCorrect+totlas.totalSkipped+totlas.totalWrong
const avgTime=calculateAverageTime(studentStats);
const studentsEvalution = evaluateStudents(studentStats);
export default function page() {
  return (
    <>
    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4 py-8 px-4"}>
      {/* here we nedd to pass the total = corect+wrong+skipp */}
      <CorrectPie totals ={totlas}/>
      <AvgTime avgTime ={avgTime}/>
    </div>
    <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4 py-8 px-4"}>
    {/* here we nedd to pass the total = corect+wrong+skipp */}
    <StudentsTop data={studentsEvalution}/>
  </div>
    </>
  );
}

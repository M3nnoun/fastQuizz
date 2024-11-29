"use client";

import db from "@/app/utils/fireStore"; // Adjust to your firebase setup file
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import QuizForm from "@/components/quizz-form";
import { Quiz } from "@/types/quiz";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizId, setquizId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const slug = (await params).slug;
        setquizId(slug);
        const docRef = doc(db, "quizes", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Quiz;
          console.log(data);
          // Ensure the structure matches the expected `Quiz`
          if (data && Array.isArray(data.questions)) {
            setQuiz(data);
          } else {
            throw new Error("Invalid quiz structure in the database");
          }
        } else {
          throw new Error("Document not found");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch document");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!quiz) return <div>No quiz data available</div>;

  return <QuizForm quiz={quiz} quizId={quizId} />;
}

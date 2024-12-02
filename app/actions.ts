"use server";

import { Buffer } from "buffer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "fs";
import path from 'path';
import { collection, addDoc,getDocs, query, where, getDoc, doc  } from "firebase/firestore";
import  db  from '@/app/utils/fireStore';
import { Quiz, QuizAnswer } from "@/types/quiz";

export async function uploadAndProcessFile(formData: FormData) {
  try {
    // Extract file from the FormData
    const file = formData.get("file");
    const uploadDir = path.join("app/", 'uploads');
    const tempFilePath = path.join(uploadDir, 'tempfile.pdf');
    console.log("Upload Directory: ", uploadDir);
    console.log("File Path: ", tempFilePath);
    // Validate file presence
    if (!file || !(file instanceof File)) {
      return {
        error: "No valid file received.",
        status: 400,
      };
    }

    // Convert file to buffer and base64 string
    const buffer = Buffer.from(await file.arrayBuffer());
    // const base64File = buffer.toString("base64");
    fs.writeFileSync(tempFilePath, buffer);

    // Initialize GoogleGenerativeAI with your API_KEY.
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    // Initialize GoogleAIFileManager with your API_KEY.
    const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY!);

    // Generate AI content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Upload the file and specify a display name.
    const uploadResponse = await fileManager.uploadFile(tempFilePath, {
      mimeType: "application/pdf",
      displayName: file.name,
    });
    // View the response.
    console.log(
      `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`
    );
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text:process.env.TASK_DESCRIPTION || "Can you summarize this document as a bulleted list?" },
    ]);

    // Return AI content
    const clearReponse = result.response.text().replace(/^```json\s*/, '').replace(/```$/, '').trim();
    console.log(clearReponse);
    return {
      message: "Success",
      status: 201,
      response: clearReponse,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    console.error("Error occurred:", error);
    return {
      error: "File upload failed",
      // details: error?.message,
      status: 500,
    };
  }
}

/**
 * Save a document to a Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {Object} data - The document data to save.
 * @returns {Promise<string>} - The ID of the saved document.
 */
export async function saveDoc(collectionName: string, data: object): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB").format(date);
}

export async function getAllQuizzes(): Promise<Quiz[]> {
  try {
    const quizesCollection = collection(db, "quizes");
    const querySnapshot = await getDocs(quizesCollection);

    // Map through the documents and convert them into Quiz objects
    const quizzes: Quiz[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        fileName: data.fileName,
        prompt: data.prompt,
        questions: data.questions,
        uploadedAt: formatDate(data.uploadedAt?.toDate()), // Convert Firestore Timestamp to JS Date
        userid: data.userid,
      } as unknown as Quiz;
    });
    console.log(quizzes);

    return quizzes;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw new Error(`Failed to fetch quizzes: ${error}`);
  }
}

export async function getQuizAnswers(quizId: string): Promise<QuizAnswer[]> {
  try {
    const quizAnswersCollection = collection(db, "answers");
    const q = query(quizAnswersCollection, where("quizId", "==", quizId));
    const querySnapshot = await getDocs(q);

    const answers: QuizAnswer[] = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Optional, remove if not needed
      ...doc.data(),
    })) as unknown as QuizAnswer[];

    return answers;
  } catch (error) {
    console.error("Error fetching quiz answers:", error);
    throw new Error(`Failed to fetch quiz answers: ${error}`);
  }
}


export async function getQuizz(quizId: string): Promise<Quiz> {
  try {
    // Reference to the specific quiz document using the quizId
    const quizDocRef = doc(db, "quizes", quizId);
    const docSnapshot = await getDoc(quizDocRef);

    if (!docSnapshot.exists()) {
      throw new Error(`Quiz with ID ${quizId} not found`);
    }

    // Convert Firestore document to Quiz object
    const data = docSnapshot.data();
    if (!data) {
      throw new Error("No data found in the document");
    }

    const quiz: Quiz = {
      fileName: data.fileName,
      prompt: data.prompt,
      questions: data.questions,
      uploadedAt: formatDate(data.uploadedAt?.toDate()), // Convert Firestore Timestamp to JS Date
      userid: data.userid,
    };

    return quiz;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw new Error(`Failed to fetch quiz: ${error}`);
  }
}




"use server";

import { Buffer } from "buffer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "fs";
import path from 'path';
import { collection, addDoc } from "firebase/firestore";
import  db  from '@/app/utils/fireStore';


export async function uploadAndProcessFile(formData: FormData) {
  try {
    // Extract file from the FormData
    const file = formData.get("file");
    const uploadDir = path.join("app/demo/", 'uploads');
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
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    // Initialize GoogleAIFileManager with your API_KEY.
    const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);

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
  } catch (error: any) {
    console.error("Error occurred:", error);
    return {
      error: "File upload failed",
      details: error.message,
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
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, Send } from 'lucide-react';
import { uploadAndProcessFile } from '@/app/actions';
import  db  from '@/app/utils/fireStore';
import { collection, addDoc } from 'firebase/firestore';

export default function FileUploader({afterSubmit}) {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = event.target.files?.[0];
  if (selectedFile) {
    console.log('Selected File:', selectedFile); // Debugging: Ensure the file is being read
    if (selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF file');
      event.target.value = ''; // Clear the input if the file type is invalid
    }
  }
};
  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default button behavior

    if (!file) {
      alert("Please upload a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);
    console.log("in the form");
    console.log(formData);
    try {
      const result = await uploadAndProcessFile(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setResponse(result.response);
        const responseDoc = {
          userid:'placeholder',
          prompt,
          questions: JSON.parse(result.response),
          fileName: file.name,
          uploadedAt: new Date(),
        };
        const docRef = await addDoc(collection(db, "quizes"), responseDoc);
        console.log("Document written with ID: ", docRef.id);
        afterSubmit(docRef.id);
        console.log(JSON.parse(result.response));
      }
    } catch (error: any) {
      console.error(error);
      setError("Something went wrong");
    }
  };
  

  return (
    <div className="container mx-auto p-4 max-w-2xl py-32 mt-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">PDF Analysis Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pdf-upload">Upload PDF</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                <Button type="button" size="icon" onClick={() => document.getElementById('pdf-upload')?.click()}>
                  <FileUp className="h-4 w-4" />
                </Button>
              </div>
              {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt">Quiz title</Label>
              <Input 
                id="prompt"
                placeholder="Type your quiz Title."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="button" className="w-full" onClick={handleSubmit}>
            <Send className="mr-2 h-4 w-4" /> Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

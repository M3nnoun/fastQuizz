import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { StudentInfo } from '@/types/quiz'

interface StudentInfoCardProps {
  onSubmit: (info: StudentInfo) => void;
}

export function StudentInfoCard({ onSubmit }: StudentInfoCardProps) {
  const [name, setName] = useState('')
  const [id, setId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && id.trim()) {
      onSubmit({ name, id })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
        <CardDescription>
          Please enter your name and student ID before starting the quiz.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-id">Student ID</Label>
            <Input
              id="student-id"
              placeholder="Enter your student ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
  
  )
}


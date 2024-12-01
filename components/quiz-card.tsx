import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface QuizCardProps {
  title: string
  description: string
  questionCount: number
  createdAt: Date
}

export function QuizCard({ title, description, questionCount, createdAt }: QuizCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Questions: {questionCount}</p>
        <p className="text-sm text-gray-500">Created: {createdAt.toLocaleString()}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Edit</Button>
       <Link href={'./analyze'}><Button>Analyze Results</Button></Link>
      </CardFooter>
    </Card>
  )
}


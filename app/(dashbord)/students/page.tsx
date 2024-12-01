"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { students as initialStudents } from "./students"
import { Student } from "@/types/student"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StudentDialog } from "@/components/student-dialog"

export default function StudentsTable() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students)
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const handleClassFilter = (value: string) => {
    setSelectedClass(value)
    if (value === "all") {
      setFilteredStudents(students)
    } else {
      setFilteredStudents(students.filter((student) => student.class === value))
    }
  }

  const handleAddStudent = (newStudent: Student) => {
    const updatedStudents = [...students, { ...newStudent, id: Date.now().toString() }]
    setStudents(updatedStudents)
    handleClassFilter(selectedClass)
    setIsDialogOpen(false)
  }

  const handleEditStudent = (updatedStudent: Student) => {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    )
    setStudents(updatedStudents)
    handleClassFilter(selectedClass)
    setIsDialogOpen(false)
    setEditingStudent(null)
  }

  const handleDeleteStudent = (id: string) => {
    const updatedStudents = students.filter((student) => student.id !== id)
    setStudents(updatedStudents)
    handleClassFilter(selectedClass)
  }

  return (
    <div className="container mx-auto py-10 px-5">
      <div className="flex justify-between items-center mb-4">
        <Select value={selectedClass} onValueChange={handleClassFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="A">Class A</SelectItem>
            <SelectItem value="B">Class B</SelectItem>
            <SelectItem value="C">Class C</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Class</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <Image
                  src={student.imageUrl}
                  alt={`${student.firstName} ${student.lastName}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingStudent(student)
                    setIsDialogOpen(true)
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <StudentDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setEditingStudent(null)
        }}
        onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
        student={editingStudent}
      />
    </div>
  )
}


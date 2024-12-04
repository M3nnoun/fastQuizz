import Link from "next/link";
import { Button } from "@/components/ui/button";
// import SparklesText from "@/components/magicui/sparkles-text";

export function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Navigation links */}
          <div className="flex space-x-8">
            <Link
              href="/students"
              className="border-transparent  hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 font-medium"
            >
              Students
            </Link>
            <Link
              href="/quizzes"
              className="border-transparent  hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 font-medium"
            >
              Quizzes
            </Link>
          </div>

          {/* Centered logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-xl font-bold text-gray-800">
              fastQuizz
            </Link>
          </div>

          {/* Action button */}
          <div className="hidden sm:flex sm:items-center">
            <Link href="/demo">
              <Button>Create a Quiz</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

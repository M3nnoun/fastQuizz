import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const CTA = () => (
  <div className="w-full py-20 lg:py-40 bg-muted">
    <div className="container mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="flex flex-col text-center py-14 gap-4 items-center">
        <div>
          <Badge>Get started</Badge>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
          Ready to simplify your teaching workflow?
          </h3>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
          Create quizzes in minutes and gain valuable insights into your class&apos;s performance.  
          Take the first step today!
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <Button className="gap-4" variant="outline">
          Contact Support <PhoneCall className="w-4 h-4" />
          </Button>
          <Button className="gap-4">
          Get Started Now <MoveRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);
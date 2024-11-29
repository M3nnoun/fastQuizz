import { Cases } from "@/components/case";
import { CTA } from "@/components/cta";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricings";
import Problem from "@/components/problem";
import {Solution} from "@/components/solution";
// import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
  <>
  <Hero/>
  <Cases/>
  {/* <Testimonials/> */}
  <Problem/>
  <Solution/>
  <Pricing/>
  <FAQ/>
  <CTA/>
  <Footer/>
  </>
  );
}

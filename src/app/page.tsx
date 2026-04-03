import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import StoryShowcase from "@/components/StoryShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-purple-500/30">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <StoryShowcase />
      <FeaturesSection />
      <FinalCTA />
    </main>
  );
}

import FeatureCard from "@/components/base/FeatureCard"
import Navbar from "@/components/base/Navbar"
import HeroSection from "@/components/base/HeroSection"
import FeatureSection from "@/components/base/FeatureSection"
import UserReviews from "@/components/base/UserReviews"
import Footer from "@/components/base/Footer"
import { authOption, CustomSession } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOption)
  
  return (
    <div className="min-h-screen flex flex-col ">
    <Navbar user={session?.user ?? null} />
    <HeroSection />
    <FeatureSection />
    <UserReviews />
    <Footer />
    </div>
  );
}

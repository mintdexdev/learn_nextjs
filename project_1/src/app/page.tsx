import FeaturedCourses from '@/components/FeaturedCourses'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Instructors from '@/components/Instructors'
import MusicSchoolTestimonials from '@/components/MusicSchoolTestimonials'
import UpcommingWebinars from '@/components/UpcommingWebinars'
import WhyChooseUs from '@/components/WhyChooseUs'

const Home = () => {
  return (
    <main id='home-page'>

      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <MusicSchoolTestimonials />
      <UpcommingWebinars />
      <Instructors />
      <Footer />

    </main>
  )
}

export default Home
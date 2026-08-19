import { useEffect, useState } from 'react'
import useReducedMotion from './lib/useReducedMotion.js'
import useLenis from './lib/useLenis.js'
import LoadingScreen from './components/LoadingScreen.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import AboutSection from './components/About/AboutSection.jsx'
import CampusExperience from './components/Campus/CampusExperience.jsx'
import AcademicsSection from './components/AcademicsSection.jsx'
import FacilitiesSection from './components/FacilitiesSection.jsx'
import IdentitySection from './components/Identity/IdentitySection.jsx'
import FacultySection from './components/Faculty/FacultySection.jsx'
import AchievementsSection from './components/Achievements/AchievementsSection.jsx'
import GallerySection from './components/Gallery/GallerySection.jsx'
import EventsSection from './components/Events/EventsSection.jsx'
import WhySamarth from './components/WhySamarth.jsx'
import AdmissionsSection from './components/Admissions/AdmissionsSection.jsx'
import EnquiryForm from './components/Admissions/EnquiryForm.jsx'
import ContactSection from './components/Contact/ContactSection.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const reducedMotion = useReducedMotion()
  useLenis(reducedMotion)
  const [loading, setLoading] = useState(true)

  // Lock scroll while the loader is up so the cinematic reveal lands on a
  // still Hero rather than one the user has already scrolled past.
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-ink-900">
      {loading && <LoadingScreen reducedMotion={reducedMotion} onDone={() => setLoading(false)} />}
      <Navbar reducedMotion={reducedMotion} />
      <main>
        <Hero reducedMotion={reducedMotion} />
        <AboutSection reducedMotion={reducedMotion} />
        <CampusExperience reducedMotion={reducedMotion} />
        <AcademicsSection reducedMotion={reducedMotion} />
        <FacilitiesSection reducedMotion={reducedMotion} />
        <IdentitySection reducedMotion={reducedMotion} />
        <FacultySection reducedMotion={reducedMotion} />
        <AchievementsSection reducedMotion={reducedMotion} />
        <GallerySection reducedMotion={reducedMotion} />
        <EventsSection reducedMotion={reducedMotion} />
        <WhySamarth reducedMotion={reducedMotion} />
        <AdmissionsSection reducedMotion={reducedMotion} />
        <EnquiryForm reducedMotion={reducedMotion} />
        <ContactSection reducedMotion={reducedMotion} />
        <FinalCTA reducedMotion={reducedMotion} />
      </main>
      <Footer />
    </div>
  )
}

import { useEffect, useState } from 'react'
import MobileMenu from './MobileMenu.jsx'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Campus', href: '#campus' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ reducedMotion }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-3 shadow-glow-sm' : 'bg-transparent py-6'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brass-500/50">
              <span className="h-2 w-2 rounded-full bg-brass-500" />
            </span>
            <span className="font-display text-lg tracking-tight text-mist-50">Samarth</span>
          </a>

          <ul className="hidden items-center gap-6 xl:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-[13px] font-medium text-mist-300 transition-colors duration-300 hover:text-mist-50 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-azure-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden xl:block">
            <a
              href="#admissions"
              className="inline-flex items-center rounded-full border border-azure-400/40 px-5 py-2 text-[13px] font-medium text-mist-50 transition-colors duration-300 hover:bg-azure-500/10"
            >
              Apply Now
            </a>
          </div>

          <button
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
          >
            <span className="h-px w-6 bg-mist-100" />
            <span className="h-px w-6 bg-mist-100" />
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={LINKS} reducedMotion={reducedMotion} />
    </>
  )
}

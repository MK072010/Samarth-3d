const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconBook(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5C4.7 20 4 19.3 4 18.5v-13Z" />
      <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5c.8 0 1.5-.7 1.5-1.5v-13Z" />
    </svg>
  )
}

export function IconGraduationCap(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M2 8.5 12 4l10 4.5-10 4.5-10-4.5Z" />
      <path d="M6 10.7v4.3c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.3" />
      <path d="M21 9v6" />
    </svg>
  )
}

export function IconAward(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="8.5" r="5" />
      <path d="M8.5 13 7 21l5-2.6L17 21l-1.5-8" />
    </svg>
  )
}

export function IconMonitor(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="12" rx="1.4" />
      <path d="M8 20h8M12 16.5V20" />
    </svg>
  )
}

export function IconFlask(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M9.5 3.5h5M10 3.5v6.2L5.4 18a2 2 0 0 0 1.8 2.9h9.6a2 2 0 0 0 1.8-2.9L14 9.7V3.5" />
      <path d="M7.5 15h9" />
    </svg>
  )
}

export function IconLibrary(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 20V6.2c0-.7.5-1.2 1.1-1.4L11 3v17" />
      <path d="M11 20V3l7.9 1.8c.6.2 1.1.7 1.1 1.4V20" />
      <path d="M4 20h16" />
    </svg>
  )
}

export function IconTrophy(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4v1a4 4 0 0 0 4 4M17 5h3v1a4 4 0 0 1-4 4" />
      <path d="M12 14v3M9 20h6M9.5 17h5" />
    </svg>
  )
}

export function IconCpu(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1.2" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 3v2.3M15 3v2.3M9 18.7V21M15 18.7V21M3 9h2.3M3 15h2.3M18.7 9H21M18.7 15H21" />
    </svg>
  )
}

export function IconPalette(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1 0 1.6-.8 1.6-1.6 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6H16a4 4 0 0 0 4-4c0-4-3.6-7.4-8-7.4Z" />
      <circle cx="7.8" cy="10.5" r=".9" fill="currentColor" stroke="none" />
      <circle cx="9.8" cy="7" r=".9" fill="currentColor" stroke="none" />
      <circle cx="14.2" cy="7" r=".9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconQuote(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M9.5 6.5c-3 1.1-4.8 3.5-4.8 6.6 0 2.4 1.6 4 3.6 4 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.9-3-.3 0-.6 0-.8.1.3-1.9 1.6-3.3 3.4-4l-1.8-.5Zm9 0c-3 1.1-4.8 3.5-4.8 6.6 0 2.4 1.6 4 3.6 4 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.9-3-.3 0-.6 0-.8.1.3-1.9 1.6-3.3 3.4-4l-1.8-.5Z" />
    </svg>
  )
}

export function IconCompass(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15 9l-2 5-4 1 2-5 4-1Z" />
    </svg>
  )
}

export function IconTarget(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconHeart(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 20s-7.4-4.6-10-9.3C.5 7.4 2.3 4 5.7 4c1.9 0 3.4 1 4.3 2.5C10.9 5 12.4 4 14.3 4c3.4 0 5.2 3.4 3.7 6.7C15.4 15.4 12 20 12 20Z" />
    </svg>
  )
}

export function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c.6-3.4 3-5.4 5.5-5.4s4.9 2 5.5 5.4" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 6.4c1.6-.9 3.4-.2 4 1.5.6 1.7-.2 3.5-1.8 4.2M15 14.7c2.2.2 4.1 1.8 4.6 4.8" />
    </svg>
  )
}

export function IconStar(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M12 2.7l2.7 5.8 6.3.7-4.7 4.4 1.3 6.3L12 16.9l-5.6 3 1.3-6.3-4.7-4.4 6.3-.7L12 2.7Z" />
    </svg>
  )
}

export function IconMedal(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="14.5" r="6" />
      <path d="M9.5 9 7 3.5h3L12 9M14.5 9 17 3.5h-3" />
      <path d="M9.7 15.3 11.4 17l2.9-3.4" />
    </svg>
  )
}

export function IconCalendar(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v3.6M16 3v3.6" />
    </svg>
  )
}

export function IconChevronLeft(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M14.5 5 8 12l6.5 7" />
    </svg>
  )
}

export function IconChevronRight(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M9.5 5 16 12l-6.5 7" />
    </svg>
  )
}

export function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
  )
}

export function IconExpand(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9M15 4h3.5A1.5 1.5 0 0 1 20 5.5V9M20 15v3.5a1.5 1.5 0 0 1-1.5 1.5H15M9 20H5.5A1.5 1.5 0 0 1 4 18.5V15" />
    </svg>
  )
}

export function IconShield(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3.5 19 6v6c0 4.5-3 7.3-7 8.5-4-1.2-7-4-7-8.5V6l7-2.5Z" />
      <path d="M9 12l2 2 4-4.3" />
    </svg>
  )
}

export function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  )
}

export function IconCheckCircle(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.3 12.3l2.6 2.6 4.8-5.2" />
    </svg>
  )
}

export function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function IconFileText(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.5V8h4M9 12h6M9 15.5h6" />
    </svg>
  )
}

export function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 6.5l8 6.5 8-6.5" />
    </svg>
  )
}

export function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6 3.5h3l1.5 4-2 1.6a11 11 0 0 0 5.4 5.4l1.6-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 4.5 5.1 1.5 1.5 0 0 1 6 3.5Z" />
    </svg>
  )
}

export function IconMapPin(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.6" />
    </svg>
  )
}

export function IconSend(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M21 3 3 10.5l7 2.8 2.8 7L21 3Z" />
      <path d="M10.5 13.3 21 3" />
    </svg>
  )
}

export function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M14.5 21v-7.2h2.4l.4-2.8h-2.8v-1.8c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2h-2.4v2.8h2.4V21" />
    </svg>
  )
}

export function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconYoutube(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconLinkedin(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M7.8 10v6.5M7.8 7.6v.05M11.8 16.5V10M11.8 12.7c0-1.5 1-2.7 2.4-2.7 1.5 0 2.3 1 2.3 2.9v3.6" />
    </svg>
  )
}

export function IconTwitter(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 4l7.2 9.4L4.4 20H6l6.2-5.9L17 20h3l-7.6-9.9L19.4 4h-1.6l-5.7 5.4L7 4H4Z" />
    </svg>
  )
}

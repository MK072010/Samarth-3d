import { useRef, useState } from 'react'
import gsap from 'gsap'
import Reveal from '../Reveal.jsx'
import ParallaxLayer from '../ParallaxLayer.jsx'
import { IconSend, IconCheckCircle } from '../icons.jsx'

const CLASS_OPTIONS = [
  'Nursery', 'KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
]

const PHONE_RE = /^[+]?[\d\s-]{10,15}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialValues = { name: '', phone: '', email: '', className: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter a name.'
  else if (values.name.trim().length < 2) errors.name = 'Name looks too short.'

  if (!values.phone.trim()) errors.phone = 'Please enter a phone number.'
  else if (!PHONE_RE.test(values.phone.trim())) errors.phone = 'Enter a valid phone number.'

  if (!values.email.trim()) errors.email = 'Please enter an email address.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.'

  if (!values.className) errors.className = 'Please select a class.'

  if (!values.message.trim()) errors.message = 'Tell us a little about your enquiry.'
  else if (values.message.trim().length < 10) errors.message = 'A few more details would help us respond better.'

  return errors
}

export default function EnquiryForm({ reducedMotion }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const successRef = useRef(null)

  const handleChange = (field) => (e) => {
    const val = e.target.value
    setValues((v) => ({ ...v, [field]: val }))
    if (touched[field]) {
      setErrors(validate({ ...values, [field]: val }))
    }
  }

  const handleBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setTouched({ name: true, phone: true, email: true, className: true, message: true })

    if (Object.keys(validationErrors).length > 0) return

    setStatus('submitting')
    // Frontend-only: simulate a submission. Wire this to a real endpoint later.
    window.setTimeout(() => {
      setStatus('success')
      if (!reducedMotion && successRef.current) {
        gsap.fromTo(
          successRef.current,
          { opacity: 0, scale: 0.85, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' }
        )
      }
    }, 900)
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  const fieldClass = (field) =>
    `w-full rounded-xl border bg-ink-950/60 px-4 py-3.5 text-sm text-mist-100 placeholder:text-mist-400/70 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-azure-400/40 ${
      touched[field] && errors[field] ? 'border-red-400/60' : 'border-white/12 focus:border-azure-400/50'
    }`

  return (
    <section id="enquiry" className="relative overflow-hidden bg-ink-900 px-6 py-28 sm:py-36">
      <ParallaxLayer
        reducedMotion={reducedMotion}
        speed={0.25}
        className="left-1/2 top-[-5%] h-[460px] w-[780px] -translate-x-1/2 rounded-full bg-azure-600/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-2xl">
        <Reveal reducedMotion={reducedMotion} className="text-center">
          <span className="eyebrow">Enquiry Form</span>
          <h2 className="mt-5 font-display text-3xl font-normal leading-tight text-mist-50 sm:text-4xl">
            Ask us anything. A real person will reply.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-light text-mist-300 sm:text-base">
            Our admissions team typically responds within one working day.
          </p>
        </Reveal>

        <Reveal reducedMotion={reducedMotion} delay={0.1} className="mt-12">
          <div className="glass relative overflow-hidden rounded-3xl p-7 sm:p-10">
            {status === 'success' ? (
              <div ref={successRef} className="flex flex-col items-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-azure-400/50 bg-azure-500/10 text-azure-300">
                  <IconCheckCircle className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-xl text-mist-50">Thank you, {values.name.split(' ')[0]}.</h3>
                <p className="mt-2 max-w-sm text-sm font-light text-mist-300">
                  Your enquiry has been received. Our admissions office will reach out to you at{' '}
                  {values.email} shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-8 text-sm font-medium text-azure-300 transition-colors duration-300 hover:text-azure-200"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="enq-name" className="text-xs font-medium uppercase tracking-wide text-mist-400">
                    Parent / Student Name
                  </label>
                  <input
                    id="enq-name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                    aria-invalid={Boolean(touched.name && errors.name)}
                    aria-describedby="enq-name-error"
                    placeholder="e.g. Meera Sharma"
                    className={`mt-2 ${fieldClass('name')}`}
                  />
                  {touched.name && errors.name && (
                    <p id="enq-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="enq-phone" className="text-xs font-medium uppercase tracking-wide text-mist-400">
                      Phone Number
                    </label>
                    <input
                      id="enq-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      aria-invalid={Boolean(touched.phone && errors.phone)}
                      aria-describedby="enq-phone-error"
                      placeholder="+91 98100 22345"
                      className={`mt-2 ${fieldClass('phone')}`}
                    />
                    {touched.phone && errors.phone && (
                      <p id="enq-phone-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="enq-email" className="text-xs font-medium uppercase tracking-wide text-mist-400">
                      Email
                    </label>
                    <input
                      id="enq-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      aria-invalid={Boolean(touched.email && errors.email)}
                      aria-describedby="enq-email-error"
                      placeholder="you@example.com"
                      className={`mt-2 ${fieldClass('email')}`}
                    />
                    {touched.email && errors.email && (
                      <p id="enq-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="enq-class" className="text-xs font-medium uppercase tracking-wide text-mist-400">
                    Class
                  </label>
                  <select
                    id="enq-class"
                    value={values.className}
                    onChange={handleChange('className')}
                    onBlur={handleBlur('className')}
                    aria-invalid={Boolean(touched.className && errors.className)}
                    aria-describedby="enq-class-error"
                    className={`mt-2 ${fieldClass('className')} appearance-none`}
                  >
                    <option value="" disabled>
                      Select a class
                    </option>
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c} value={c} className="bg-ink-900">
                        {c}
                      </option>
                    ))}
                  </select>
                  {touched.className && errors.className && (
                    <p id="enq-class-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.className}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="enq-message" className="text-xs font-medium uppercase tracking-wide text-mist-400">
                    Message
                  </label>
                  <textarea
                    id="enq-message"
                    rows={4}
                    value={values.message}
                    onChange={handleChange('message')}
                    onBlur={handleBlur('message')}
                    aria-invalid={Boolean(touched.message && errors.message)}
                    aria-describedby="enq-message-error"
                    placeholder="Tell us about your child and what you'd like to know."
                    className={`mt-2 resize-none ${fieldClass('message')}`}
                  />
                  {touched.message && errors.message && (
                    <p id="enq-message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-azure-500 px-8 py-3.5 text-sm font-medium text-ink-950 shadow-glow transition-colors duration-300 hover:bg-azure-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Enquiry <IconSend className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

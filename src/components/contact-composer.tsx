'use client'

import { useState } from 'react'
import { site } from '@/content/site'

/**
 * Builds an email in the visitor's own mail app. Nothing is sent or stored by
 * this website, so there is no fake "message sent" state.
 */
export function ContactComposer() {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')
  const [troop, setTroop] = useState('Not sure yet')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const subject = `Question for Troops 163 / 2163${name ? ` from ${name}` : ''}`
  const body = [
    message || '(Your question here)',
    '',
    `Parent or guardian: ${name || ''}`,
    `Scout's grade: ${grade || ''}`,
    `Troop: ${troop}`,
  ].join('\n')
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const field = 'mt-2 block w-full rounded-[2px] border border-ink/25 bg-paper px-4 py-3 text-[1.0625rem] outline-none transition-[border-color] duration-200 focus:border-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay'

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <a href={`mailto:${site.email}`} className="t-title link break-all">
          {site.email}
        </a>
        <button type="button" onClick={copy} className="min-h-11 rounded-[2px] bg-paper-2 px-4 text-[0.9375rem] font-medium transition-[background-color,transform] duration-150 hover:bg-paper-3 active:scale-[0.97]">
          {copied ? 'Copied' : 'Copy address'}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? 'Email address copied' : ''}
        </span>
      </div>

      <form
        className="mt-12 grid gap-6 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault()
          window.location.href = href
        }}
      >
        <label className="block text-[0.9375rem] font-medium">
          Your name (parent or guardian)
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <label className="block text-[0.9375rem] font-medium">
          Scout’s grade
          <input className={field} value={grade} onChange={(e) => setGrade(e.target.value)} inputMode="numeric" placeholder="e.g. 6th" />
        </label>
        <fieldset className="sm:col-span-2">
          <legend className="text-[0.9375rem] font-medium">Which troop?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {['Troop 163 (boys)', 'Troop 2163 (girls)', 'Not sure yet'].map((t) => (
              <label key={t} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-[2px] bg-paper-2 px-4 text-[0.9375rem] has-[:checked]:bg-forest has-[:checked]:text-paper has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clay">
                <input type="radio" name="troop" value={t} checked={troop === t} onChange={() => setTroop(t)} className="sr-only" />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-[0.9375rem] font-medium sm:col-span-2">
          Your question
          <textarea className={`${field} min-h-36 resize-y`} value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:gap-6">
          <button type="submit" className="btn self-start">
            Open in my email app
          </button>
          <p className="t-small max-w-[44ch] text-ink-soft">
            This writes the email for you in your own mail app. Nothing is sent or saved by this website.
          </p>
        </div>
      </form>
    </div>
  )
}

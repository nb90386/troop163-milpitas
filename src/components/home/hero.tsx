import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { objectPosition, pick } from '@/lib/photos'

export function Hero() {
  const photo = pick('sail-lone-boat')
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night text-paper">
      {/* Phones: a taller, bottom-anchored photo lifts the sail above the text block. */}
      <div className="hero-photo absolute inset-x-0 bottom-0 top-[-30svh] -z-10 md:top-0">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          quality={75}
          sizes="(max-aspect-ratio: 3/2) 195vh, 100vw"
          className="object-cover [object-position:12%_60%] md:[object-position:var(--pos)]"
          style={{ ['--pos' as string]: objectPosition(photo) }}
        />
      </div>
      {/* Neutral scrim under the text only */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[78%] [background:var(--scrim)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/35 to-transparent" />


      <div className="frame w-full pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="grid-12 items-end gap-y-8">
          <p className="hero-line t-small col-span-12 hidden self-end text-paper/80 lg:col-span-4 lg:block" style={{ ['--i' as string]: 4 }}>
            Pinecrest Lake, Camp Hi-Sierra
            <br />
            Thursday, July 6, 2023
          </p>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pb-3">
            <p className="hero-line t-lead max-w-[30ch] text-paper [text-shadow:0_1px_14px_rgb(0_0_0/0.45)]" style={{ ['--i' as string]: 1 }}>
              Scouts BSA in Milpitas, for boys in Troop 163 and girls in Troop 2163. Scouts plan the trips and run the meetings,
              Monday nights at 6:30.
            </p>
            <div className="hero-line mt-7 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ ['--i' as string]: 2 }}>
              <Link href="/adventures" className="btn">
                Explore our adventures <ArrowRight aria-hidden size={18} strokeWidth={1.75} />
              </Link>
              <Link href="/join#visit" className="link-strong text-[1rem] font-medium text-paper">
                Come visit a meeting
              </Link>
            </div>
          </div>
        </div>
        <h1 className="t-display mt-6 text-[19.5vw] md:mt-8 lg:text-right lg:text-[min(13.2vw,16rem)]" aria-label="Troop 163 and Troop 2163, Scouts BSA in Milpitas, California">
          <span aria-hidden className="block whitespace-nowrap">
            <span className="hero-word" style={{ ['--i' as string]: 0 }}>
              Troop
            </span>{' '}
            <span className="hero-word" style={{ ['--i' as string]: 1 }}>
              163
            </span>
          </span>
        </h1>
      </div>
    </section>
  )
}

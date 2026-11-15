import Link from 'next/link'
import { Photo } from '@/components/photo'
import { pick } from '@/lib/photos'

export default function NotFound() {
  return (
    <section className="frame grid-12 items-center gap-y-10 pb-24 pt-32 md:min-h-[80svh]">
      <div className="col-span-12 md:col-span-6">
        <h1 className="t-head">Off the trail.</h1>
        <p className="t-lead mt-6 max-w-[28ch]">That page doesn’t exist, or it moved. Let’s get you back to camp.</p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
          <Link href="/" className="btn">
            Home
          </Link>
          <Link href="/adventures" className="link self-center font-medium">
            Adventures
          </Link>
        </div>
      </div>
      <div className="col-span-12 md:col-span-5 md:col-start-8">
        <Photo photo={pick('walking-alone')} ratio="4 / 5" sizes="(min-width: 768px) 40vw, 100vw" />
      </div>
    </section>
  )
}

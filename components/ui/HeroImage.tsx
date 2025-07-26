"use client"

import ThemedImage from "../containers/ThemedImage"

export default function HeroImage() {
  return (
    <section aria-label="Hero Image of the website" className="flow-root">
     
        <div className="rounded-xl bg-white ring-1 ring-slate-900/5 dark:bg-slate-950 dark:ring-white/15">
          <ThemedImage
            lightSrc="/images/hero-image.png"
            darkSrc="/images/hero-image.png"
            alt="A preview of troott"
            width={2400}
            height={1600}
            className="rounded-xl shadow-2xl dark:shadow-neutral-600/10"
          />
        </div>
      
    </section>
  )
}

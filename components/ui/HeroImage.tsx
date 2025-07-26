"use client"

import ThemedImage from "../containers/ThemedImage"

export default function HeroImage() {
  return (
    <section aria-label="Hero Image of the website" className="flow-root">
     
        <div className="rounded-xl">
          <ThemedImage
            lightSrc="/images/troott-hero-image.png"
            darkSrc="/images/troott-hero-image.png"
            alt="A preview of troott"
            width={2400}
            height={1600}
            className="rounded-xl shadow-2xl dark:shadow-neutral-600/10"
          />
        </div>
      
    </section>
  )
}

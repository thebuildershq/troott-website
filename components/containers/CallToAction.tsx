import { RiUploadCloudFill } from "@remixicon/react"
import Link from "next/link"
import { Button } from "../Button"


export default function CTASection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mt-32 flex flex-col items-center justify-center text-center sm:mt-40"
    >
      <h1
        id="hero-title"
        className="inline-block animate-slide-up-fade bg-gradient-to-br from-neutral-900 to-neutral-800 bg-clip-text p-2 text-4xl font-bold tracking-tighter text-transparent sm:text-6xl md:text-7xl dark:from-gray-50 dark:to-gray-300"
        style={{ animationDuration: "700ms" }}
      >
      Step into the future of <br /> faith. Help us build Troott <br /> shape community.
      </h1>
      <p
        className="mt-6 max-w-lg animate-slide-up-fade text-lg text-gray-700 dark:text-gray-400"
        style={{ animationDuration: "900ms" }}
      >
        Join the waitlist today or secure your spot with a payment. Your support helps bring Troott to life and grow our community.
      </p>
      <div
        className="mt-8 flex w-full animate-slide-up-fade flex-col justify-center gap-3 px-3 sm:flex-row"
        style={{ animationDuration: "1100ms" }}
      >
        <Button className="h-14 px-8 font-semibold md:h-12 md:px-6 text-base md:text-sm">
          <Link href="#">Start listening</Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          
          className="h-14 px-8 md:h-12 md:px-6 group gap-x-2 bg-transparent font-semibold hover:bg-transparent dark:bg-transparent hover:dark:bg-transparent"
        >
          <Link
            href="https://www.youtube.com/watch?v=QRZ_l7cVzzU"
            className="ring-1 ring-gray-200 sm:ring-0 dark:ring-gray-900"
            target="_blank"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-gray-50 transition-all group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
              <RiUploadCloudFill
                aria-hidden="true"
                className="size-4 shrink-0 text-gray-900 dark:text-gray-50"
              />
            </span>
            Upload sermons
          </Link>
        </Button>
      </div>
    </section>
  )
}

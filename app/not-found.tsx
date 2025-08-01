import Link from "next/link"
import { siteConfig } from "./siteConfig"
import { Button } from "@/components/Button"
import { TroottLogo } from "@/public/TroottLogo"
import { ArrowAnimated } from "@/components/ui/ArrowAnimated"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Link href={siteConfig.baseLinks.home}>
        <TroottLogo className="mt-6 h-10" />
      </Link>
      <p className="mt-6 text-4xl font-semibold text-black-600 sm:text-5xl dark:text-black-100">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-50">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Button asChild className="group mt-8" variant="secondary">
        <Link href={siteConfig.baseLinks.home}>
          Go to the home page
          <ArrowAnimated
            className="stroke-gray-900 dark:stroke-gray-50"
            aria-hidden="true"
          />
        </Link>
      </Button>
    </div>
  )
}

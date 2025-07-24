"use client";

import { RiPlayCircleFill, RiUploadCloudFill } from "@remixicon/react";
import Link from "next/link";
import { Button } from "../Button";
import HeroImage from "../ui/HeroImage";
import { useState } from "react";
import Newsletter from "../comp-321";

export default function HeroSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  

  return (
    <section
      aria-labelledby="hero-title"
      className="mt-32 flex flex-col items-center justify-center text-center sm:mt-40 "
    >
      <h1
        id="hero-title"
        className="inline-block animate-slide-up-fade bg-gradient-to-br from-neutral-900 to-neutral-800 bg-clip-text p-2 text-4xl max-w-2xl font-bold tracking-tighter text-transparent sm:text-6xl md:text-7xl dark:from-gray-50 dark:to-gray-300"
        style={{ animationDuration: "700ms" }}
      >
        All the sermons you love in one place.
      </h1>
      <p
        className="mt-6 max-w-lg animate-slide-up-fade text-lg text-gray-700 dark:text-gray-400"
        style={{ animationDuration: "900ms" }}
      >
        Find, listen and share powerful teachings from your favourite ministers
        anytime, anywhere.
      </p>
      <div
        className="mt-8 flex w-full animate-slide-up-fade flex-col justify-center gap-3 px-3 sm:flex-row"
        style={{ animationDuration: "1100ms" }}
      >
        <Button
          className="h-14 px-8 group gap-x-2 font-semibold md:h-12 md:px-6 text-base md:text-sm"
          onClick={() => setDialogOpen(true)}
        >
          <Link href="#" className="flex items-center gap-x-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-gray-50 transition-all group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
              <RiPlayCircleFill
                aria-hidden="true"
                className="size-4 shrink-0 text-gray-900 dark:text-gray-50"
              />
            </span>
            Start listening
          </Link>
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
            Upload your sermons
          </Link>
        </Button>
      </div>
      <Newsletter open={dialogOpen} onOpenChange={setDialogOpen} />

      <div
        className="relative mx-auto ml-3 mt-20 h-fit w-[40rem] max-w-6xl animate-slide-up-fade sm:ml-auto sm:w-full sm:px-2"
        style={{ animationDuration: "1400ms" }}
      >
        <HeroImage />
        <div
          className="absolute inset-x-0 -bottom-20 -mx-10 h-2/4 bg-gradient-to-t from-white via-white to-transparent lg:h-1/4 dark:from-neutral-950 dark:via-neutral-950"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

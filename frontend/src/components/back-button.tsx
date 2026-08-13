"use client";

import { ArrowLeftSvg } from "@/components/icons/arrow-left-svg";
import { useRouter } from "next/navigation";

const historyLengthOnEntry =
  typeof window === "undefined" ? 0 : window.history.length;

export function BackButton() {
  const router = useRouter();

  function goBack() {
    if (window.history.length > historyLengthOnEntry) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="dark:bg-dark-blue shadow-input inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-white px-6 py-1.5 text-sm font-light sm:px-8 sm:py-2 sm:text-base"
    >
      <ArrowLeftSvg aria-hidden="true" className="size-4 sm:size-5" />
      Back
    </button>
  );
}

"use client";

import { ChevronSvg } from "@/components/icons/chevron-svg";
import { CloseSvg } from "@/components/icons/close-svg";
import { useEffect, useId, useRef, useState } from "react";

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

interface SelectProps {
  value: string;
  onChange: (region: string) => void;
}

export function Select({ value, onChange }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;

    listboxRef.current?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const openMenu = () => {
    const selectedIndex = REGIONS.indexOf(value);
    setActiveIndex(selectedIndex === -1 ? 0 : selectedIndex);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const selectRegion = (region: string) => {
    onChange(region);
    close();
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, REGIONS.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(REGIONS.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        selectRegion(REGIONS[activeIndex]);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative w-50 text-xs leading-5 sm:text-sm">
      <div className="dark:bg-dark-blue shadow-input flex h-12 w-full items-center rounded-md bg-white sm:h-14">
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-label="Filter by Region"
          onClick={() => (open ? setOpen(false) : openMenu())}
          className={`flex h-full grow cursor-pointer items-center justify-between gap-2 rounded-md ps-6 text-start ${
            value ? "pe-2" : "pe-6"
          }`}
        >
          <span>{value || "Filter by Region"}</span>
          {!value && (
            <ChevronSvg
              aria-hidden
              className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            />
          )}
        </button>

        {value && (
          <button
            type="button"
            aria-label="Clear region filter"
            onClick={() => {
              onChange("");
              buttonRef.current?.focus();
            }}
            className="flex h-full shrink-0 cursor-pointer items-center rounded-md ps-2 pe-6"
          >
            <CloseSvg aria-hidden />
          </button>
        )}
      </div>

      <ul
        ref={listboxRef}
        id={listboxId}
        role="listbox"
        tabIndex={-1}
        aria-label="Filter by Region"
        aria-activedescendant={
          open ? `${listboxId}-option-${activeIndex}` : undefined
        }
        onKeyDown={handleListKeyDown}
        className={`dark:bg-dark-blue shadow-input absolute z-10 mt-1 w-full rounded-md bg-white py-4 transition-[opacity,translate,visibility] duration-200 ease-out focus:outline-none motion-reduce:transition-none ${
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        {REGIONS.map((region, index) => (
          <li
            key={region}
            id={`${listboxId}-option-${index}`}
            role="option"
            aria-selected={value === region}
            onClick={() => selectRegion(region)}
            onMouseEnter={() => setActiveIndex(index)}
            className={`cursor-pointer px-6 py-1 ${
              index === activeIndex
                ? "bg-very-light-gray dark:bg-very-dark-blue"
                : ""
            } ${value === region ? "font-semibold" : ""}`}
          >
            {region}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { ThemeToggle } from "../ui";

export default function Header() {
  return (
    <header className="dark:bg-dark-blue shadow-header mb-6 bg-white px-4 py-7.5 sm:mb-12 sm:py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="text-sm leading-5 font-extrabold sm:text-2xl">
          Where in the world?
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

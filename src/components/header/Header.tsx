"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/store/slices/darkModeSlice";
import { RootState } from "@/store/store";
import DarkModeButton from "../ui/DarkModeButton";
import { HeaderLinksDataTypes } from "@/types";

const Header = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (isDarkMode === null) {
      if (prefersDarkScheme) {
        dispatch(toggleDarkMode());
      }
    }

    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode, dispatch]);

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const headerLinks: HeaderLinksDataTypes[] = [
    { id: 0, text: "Home", href: "/" },
    { id: 1, text: "Favorites", href: "/favorites" },
  ];

  return (
    <header className='header z-[9999] fixed top-0 left-0 w-full py-4 dark:bg-dark dark:text-muted bg-offWhite text-dark'>
      <div className='wrapper'>
        <nav className='header-content flex justify-between w-full'>
          <div className='flex flex-row items-center md:gap-10 sm:gap-4 gap-2'>
            <Link href='/' className='header-content__image block'>
              <img
                className='block w-full h-auto sm:max-w-14 max-w-12'
                src='/images/reiz-tech-logo.png'
                alt='reiz-tech-logo'
              />
            </Link>
            <DarkModeButton
              handleDarkModeToggle={handleDarkModeToggle}
              isDarkMode={isDarkMode}
            />
          </div>
          <div className='header-content__links flex items-center'>
            <ul className='header-links flex gap-4'>
              {headerLinks.map(({ id, text, href }) => (
                <li className='header-links__li' key={id}>
                  <Link
                    className='header-links__link nice-underline font-semibold md:text-xl sm:text-lg text-md'
                    href={href}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

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
    // Check if the user has already toggled the theme
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Apply the system's dark mode if no custom preference is set
    if (isDarkMode === null) {
      if (prefersDarkScheme) {
        dispatch(toggleDarkMode());
      }
    }

    // Sync the body class with the state
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
    <header className='header sm:py-8 py-4 dark:bg-dark dark:text-muted bg-offWhite text-dark'>
      <div className='wrapper'>
        <nav className='header-content flex justify-between w-full'>
          <div className='flex flex-row items-center gap-10'>
            <Link href='/' className='header-content__image block'>
              <img
                className='block w-full h-auto sm:max-w-16 max-w-12'
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
                    className='header-links__link nice-underline font-semibold md:text-2xl sm:text-xl text-lg'
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

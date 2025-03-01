"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/store/slices/darkModeSlice";
import { RootState } from "@/store/store";
type HeaderLink = {
  id: number;
  text: string;
  href: string;
};
const Header = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: RootState) => state.darkMode.isDarkMode
  );

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  if (isDarkMode) {
    if (typeof window !== "undefined") {
      document.documentElement.classList.add("dark");
    }
  } else {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("dark");
    }
  }

  const headerLinks: HeaderLink[] = [
    { id: 0, text: "Home", href: "/" },
    { id: 1, text: "Favorites", href: "/favorites" },
  ];
  return (
    <section className='header py-8 px-5'>
      <div className='wrapper'>
        <div className='header-content flex justify-between w-full'>
          <div className='flex flex-row items-center gap-10'>
            <Link href='/' className='header-content__image block'>
              <img
                className='block w-full h-auto max-w-16'
                src='/images/reiz-tech-logo.png'
                alt='reiz-tech-logo'
              />
            </Link>
            <label
              onClick={handleDarkModeToggle}
              className='flex cursor-pointer gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='12' cy='12' r='5' />
                <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
              </svg>
              <input
                type='checkbox'
                value='synthwave'
                className='toggle theme-controller'
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
              </svg>
            </label>
          </div>
          <div className='header-content__links flex items-center'>
            <ul className='header-links flex gap-4'>
              {headerLinks.map(({ id, text, href }) => (
                <li className='header-links__li' key={id}>
                  <Link
                    className='header-links__link text-2xl block hover:underline text-white selection:underline'
                    href={href}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Header;

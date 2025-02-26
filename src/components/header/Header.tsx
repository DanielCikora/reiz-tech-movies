import Link from "next/link";
import Filters from "../filters/Filters";

const Header = () => {
  type HeaderLink = {
    id: number;
    text: string;
    href: string;
  };
  const headerLinks: HeaderLink[] = [
    { id: 0, text: "Home", href: "/" },
    { id: 1, text: "Favorites", href: "/favorites" },
  ];
  return (
    <section className='header py-4'>
      <div className='wrapper'>
        <div className='header-content flex justify-between w-full'>
          <div className='header-content__image flex gap-4'>
            <img
              className='block w-full h-auto max-w-32'
              src='/images/reiz-logo.png'
              alt='reiz-logo'
            />
            <input type='checkbox' name='dark-mode' />
          </div>
          <div className='header-content__links'>
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
        <Filters />
      </div>
    </section>
  );
};
export default Header;

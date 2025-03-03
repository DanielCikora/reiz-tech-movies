import Favorites from "@/components/favorites/Favorites";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reiz Tech Movies",
  description:
    "Reiz Tech Movies App - Internship Task developed by Daniel Cikora",
  icons: "/images/reiz-tech-logo.png",
};
const FavoritesPage = () => {
  return (
    <main className='favorites'>
      <Favorites />
    </main>
  );
};
export default FavoritesPage;

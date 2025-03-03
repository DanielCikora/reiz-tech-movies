import MovieOverview from "@/components/overview/MovieOverview";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reiz Tech Movies",
  description:
    "Reiz Tech Movies App - Internship Task developed by Daniel Cikora",
  icons: "/images/reiz-tech-logo.png",
};
const MovieOverviewPage = () => {
  return (
    <main className='movie-overview'>
      <MovieOverview />
    </main>
  );
};

export default MovieOverviewPage;

import Movies from "@/components/movies/Movies";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reiz Tech Movies App",
  description:
    "Reiz Tech Movies App - Internship Task developed by Daniel Cikora",
  icons: "/images/reiz-tech-logo.png",
};
export default function Home() {
  return (
    <main className='dark:bg-dark dark:text-muted bg-offWhite text-dark'>
      <Movies />
    </main>
  );
}

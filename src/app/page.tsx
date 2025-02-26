import Movies from "@/components/movies/Movies";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reiz Tech Movies App",
  description:
    "Reiz Tech Movies App - Internship Task developed by Daniel Cikora",
};
export default function Home() {
  return (
    <main>
      <Movies />
    </main>
  );
}

"use client";
import axios from "axios";
import { useState, useEffect } from "react";
const Home = () => {
  const [movies, setMovies] = useState<string[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("https://api.tvmaze.com/shows");
        setMovies(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);
  return <section className='home'></section>;
};
export default Home;

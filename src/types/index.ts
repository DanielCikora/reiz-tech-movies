import { ChangeEventHandler } from "react";
export interface MovieDetailsDataTypes {
  params: { id: string };
}
export interface HeaderLinksDataTypes {
  id: number;
  text: string;
  href: string;
}
export interface HeaderLink {
  id: number;
  text: string;
  href: string;
}
export interface DarkModeButtonDataTypes {
  handleDarkModeToggle: () => void;
  isDarkMode: boolean;
}
export interface DarkModeDataTypes {
  isDarkMode: boolean;
}
export interface SortingDataTypes {
  onChange: ChangeEventHandler<HTMLSelectElement>;
}
export interface MoviesDataTypes {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string;
  };
  webChannel: null | string;
  dvdCountry: null | string;
  externals: {
    tvrage: number;
    thetvdb: number;
    imdb: string;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
      name: string;
    };
  };
}

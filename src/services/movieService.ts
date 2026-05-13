import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(
  query: string,
  page: number,
): Promise<MoviesResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN as string;

  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<MoviesResponse>(
    `${BASE_URL}/search/movie`,
    config,
  );

  return response.data;
}

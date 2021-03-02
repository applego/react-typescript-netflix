import { API_KEY } from './secrets';
import { jsonGenres } from './secrets_genre';

const genres = jsonGenres.genres;

export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-us`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/discover/tv?api_key=${API_KEY}&languager=en-us`,
  fetchActionMovies: `/discover/tv?api_key=${API_KEY}&with_genres=${genres.Action.id}`,
  fetchComedyMovies: `/discover/tv?api_key=${API_KEY}&with_genres=${genres.Comedy.id}`,
  fetchHorrorMovies: `/discover/tv?api_key=${API_KEY}&with_genres=${genres.Horror.id}`,
  fetchRomanceMovies: `/discover/tv?api_key=${API_KEY}&with_genres=${genres.Romance.id}`,
  fetchDocumentMovies: `/discover/tv?api_key=${API_KEY}&with_genres=${genres.Documentary.id}`,

  fetchTrailerUrl: `/movie/MOVIE_ID/videos?api_key=${API_KEY}`,
};

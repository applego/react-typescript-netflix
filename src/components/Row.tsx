import { useEffect, useState } from 'react';
import { Movie2 } from '../movie2-types';
import axios from '../axios';
// import styles from './styles.module.scss';
import './Row.scss';

const base_url = 'https://image.tmdb.org/t/p/original';

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie2[]>([]);

  // urlが更新される度に
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(title);
  console.log(fetchUrl);
  console.log(movies);

  return (
    <div className='Row'>
      <h2>{title}</h2>
      <div className='Row-posters'>
        {/* ボスターコンテンツ */}
        {movies.map((movie, i) => {
          return (
            <img
              key={movie.id + i}
              className={`Row-poster ${isLargeRow && 'Row-poster-large'}`}
              data-is-largerow={isLargeRow}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
    </div>
  );
};

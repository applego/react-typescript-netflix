import { useEffect, useState } from 'react';
import { Movie } from '../movie-types';
import axios from '../axios';

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

export const Row = ({ title, fetchUrl }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  // urlが更新される度に
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);
  console.log(movies);

  return (
    <div className='Row'>
      <h1>Row</h1>
      <h2>{title}</h2>
      {/* {movies?.map((movie, i) => {
        return (
          <div key={i}>
            <h3>{movie}</h3>
          </div>
        );
      })} */}
    </div>
  );
};

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
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.info(title);
  console.log(movies);

  return (
    <div className='Row'>
      <h1>{title}</h1>
    </div>
  );
};

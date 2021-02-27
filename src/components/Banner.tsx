import { useEffect, useState } from 'react';
import { Movie2 } from '../movie2-types';
import { requests } from '../request';
import axios from '../axios';

import './Banner.scss';

const base_url = 'https://image.tmdb.org/t/p/original';

export const Banner = () => {
  const [movie, setMovie] = useState<Movie2 | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchNetflixOriginals);
      // console.log('banner:useEffect()');
      // console.log(response.data.results);

      // apiからランダムで値を取得
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return response;
    }
    fetchData();
  }, []);

  // console.log('banner:Banner()');
  // console.log(movie);

  // descriptionの切り捨て用関数
  function shorten(str: string | undefined, n: number) {
    if (str === undefined) return;
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className='Banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='Banner-contents'>
        <h1 className='Banner-title'>{movie?.name || movie?.original_name}</h1>
        <div className='Banner-buttons'>
          <button className='Banner-button'>Play</button>
          <button className='Banner-button'>My List</button>
        </div>

        <h1 className='Banner-description'>{shorten(movie?.overview, 150)}</h1>
      </div>

      <div className='Banner-fadeBottom' />
    </header>
  );
};

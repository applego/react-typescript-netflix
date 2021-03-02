import { useEffect, useState } from 'react';
//* いらんの import movieTrailer from 'movie-trailer';
import { Movie2 } from '../movie2-types';
import axios from '../axios';
// import styles from './styles.module.scss';
import './Row.scss';
import { requests } from '../request';
import YouTube from 'react-youtube';

const base_url = 'https://image.tmdb.org/t/p/original';

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Options = {
  height: string;
  width: string;
  playerVars: { autoplay: 0 | 1 | undefined };
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie2[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string>('');

  // urlが更新される度に
  useEffect(() => {
    async function fetchMoviesData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    }
    fetchMoviesData();
  }, [fetchUrl]);

  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie2) => {
    /**  NG: メモ化したコンポーネントに渡さず、そのまま利用しても意味がない
   * https://ics.media/entry/201106/
  useCallback((event) => {

  useMemoは一度計算した結果を変数に保持してくれる「メモ化」を行います。最初のレンダリングで一度作業を行い、第二引数に渡した依存する値が変化しない限りはキャッシュされたものを返します。
  それに対してuseCallbackは、第一引数に渡しているコールバック関数をメモ化し、不要な再レンダリングを防いでくれます。
  */

    if (trailerUrl) {
      setTrailerUrl('');
      return;
    }
    console.log(
      requests.fetchTrailerUrl.replace('MOVIE_ID', movie.id.toString())
    );
    let trailerurl = await axios.get(
      requests.fetchTrailerUrl.replace('MOVIE_ID', movie.id.toString())
    );
    setTrailerUrl(trailerurl.data.results[0]?.key);
  };

  // console.log(title);
  // console.log(fetchUrl);
  // console.log(movies);

  return (
    <div className='Row'>
      <h2>{title}</h2>
      <div className='Row-posters'>
        {/* ボスターコンテンツ */}
        {movies.map((movie, i) => {
          return (
            <img
              key={movie.id + i}
              alt={movie.name}
              className={`Row-poster ${isLargeRow && 'Row-poster-large'}`}
              data-is-largerow={isLargeRow}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              onClick={() => handleClick(movie)}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

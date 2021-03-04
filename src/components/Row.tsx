import { useEffect, useState } from 'react';
//* いらんの import movieTrailer from 'movie-trailer';
import { Movie2 } from '../movie2-types';
import axios from '../axios';
// import styles from './styles.module.scss';
import './Row.scss';
import { requests } from '../request';
import YouTube from 'react-youtube';
import { Popup } from './Popup';

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
  const [showingTrailerMovieId, setShowingTrailerMovieId] = useState<string>(
    ''
  );
  const [trailerUrl, setTrailerUrl] = useState<string>('');
  const [isFoundTrailerUrl, setIsFoundTrailerUrl] = useState<boolean>(false);
  const [isShowingTrailer, setIsShowingTrailer] = useState<boolean>(false);
  const [isShowingPopup, setIsShowingPopup] = useState<boolean>(false);

  // urlが更新される度に
  useEffect(() => {
    async function fetchMoviesData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    }
    fetchMoviesData();
  }, [fetchUrl]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isShowingPopup) {
      timeout = setTimeout(() => setIsShowingPopup(false), 200000); //00
    }
    return () => clearTimeout(timeout);
  }, [isShowingPopup]);

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

    if (showingTrailerMovieId !== movie.id.toString()) {
      // クリックした映画が前回と異なる
      // 新たにmovieidとtrailerurlをセット
      setShowingTrailerMovieId(movie.id.toString());
      await axios
        .get(requests.fetchTrailerUrl.replace('MOVIE_ID', movie.id.toString()))
        .then((response) => {
          if (response.data.results[0]) {
            setIsFoundTrailerUrl(true);
            setTrailerUrl(response.data.results[0]?.key);
          } else {
            setIsFoundTrailerUrl(false);
            setIsShowingPopup(true);
            setIsShowingTrailer(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsFoundTrailerUrl(false);
          setIsShowingPopup(true);
          setIsShowingTrailer(false);
        });
    } else {
      // クリックした映画が前回と同じ
      // Trailerの表示中の場合非表示に
      if (isShowingTrailer) setIsShowingTrailer(false);
      else {
        // 非表示の場合
        if (isFoundTrailerUrl) {
          // trailerurlが見つかってれば
          setIsShowingTrailer(true);
        } else {
          setIsShowingPopup(true);
        }
      }
    }
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
      {isShowingTrailer && <YouTube videoId={trailerUrl} opts={opts} />}
      {isShowingPopup && <Popup msg='Not Found...' />}
    </div>
  );
};

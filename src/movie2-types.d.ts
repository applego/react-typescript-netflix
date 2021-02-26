/**
 * APIの戻り値（JSON）の形式が変わった？
 * movie2作成　2021/02/26  8:55
 *  */

// To parse this data:
//
//   import { Convert, Movie2 } from "./file";
//
//   const movie2 = Convert.toMovie2(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type Movie2 = {
  backdrop_path: string;
  first_air_date: Date;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

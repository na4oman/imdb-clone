export interface CastProp {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface CrewProp {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}

export interface MovieProp {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: Number[]
  original_title: string
  overview: string
}

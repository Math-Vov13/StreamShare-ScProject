import * as yup from "yup";

export const content_table_name = "Movies";

enum movie_genre {
    Anime,
    Movie,
    Serie
}

export type content_type = {
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    director: string,
    actors: Array<string>,
    all_audiances: boolean,
    duration: number,
    note: number,
    release_date: string,
    categories: Array<string>,
    tags: Array<string>,
    video_key: string,
    genre: movie_genre,
    type_content: "video/mp4"
}

export type secured_content_type = {
    id: string,
    title: string,
    thumbnail: string,
    note: number
}

export type semi_secured_content_type = {
    id: string,
    title: string,
    all_audiances: boolean,
    note: number,
    release_date: string,
    categories: Array<string>,
    tags: Array<string>,
    genre: movie_genre,
}



export const categories_schema = yup.mixed().oneOf(["Science Fiction", "Action", "Crime", "Drama", "Thriller", "Romance", "Adventure", "Animation", "Superhero", "Fantasy", "Horror", "Musical", "Family"]);
export const tags_schema = yup.string().nullable();

export const get_content_schema = yup.object({
    fulfilname: yup.string(),
    categories: yup.array(categories_schema),
    tags: yup.array(tags_schema)
}).noUnknown();
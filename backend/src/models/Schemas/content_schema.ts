import * as yup from "yup";

export const content_schema = yup.object({
    Id: yup.number(),
    Name: yup.string().required(),
    Mail: yup.string().email().required(),
    Password: yup.string().required(),
    Subscription: yup.string().required(),
    "Created-date": yup.date(),
    "Updated-at": yup.date()
}).noUnknown();

export const genres_schema = yup.mixed().oneOf(["Science Fiction", "Action", "Crime", "Drama", "Thriller", "Romance", "Adventure", "Animation", "Superhero", "Fantasy", "Horror", "Musical", "Family"]);
export const tags_schema = yup.string().nullable();

export const get_content_schema = yup.object({
    FulfilName: yup.string(),
    Genres: yup.array(genres_schema),
    Tags: yup.array(tags_schema)
}).noUnknown();
// Fake DataBase

/// Tables
///// Users
export let Groups = [
    {"id": 1, "name": "group", "password": "$2a$10$eg3SJhmfCSkYVG0c5CG41e4rzDqV588vxwgD3rbU701wFkD2WCYQW", "email": "test@test.com", "created-date": "12-45-2004", "updated-at": "16-45-2004", "subscription": "1"},
    {"id": 2, "name": "group1", "password": "$2a$10$eg3SJhmfCSkYVG0c5CG41e4rzDqV588vxwgD3rbU701wFkD2WCYQW", "email": "test1test.com", "created-date": "12-45-2004", "updated-at": "16-45-2004", "subscription": "1"},
    {"id": 3, "name": "group2", "password": "$2a$10$eg3SJhmfCSkYVG0c5CG41e4rzDqV588vxwgD3rbU701wFkD2WCYQW", "email": "test2@test.com", "created-date": "12-45-2004", "updated-at": "16-45-2004", "subscription": "2"},
    {"id": 4, "name": "group3", "password": "$2a$10$eg3SJhmfCSkYVG0c5CG41e4rzDqV588vxwgD3rbU701wFkD2WCYQW", "email": "test3@test.com", "created-date": "12-45-2004", "updated-at": "16-45-2004", "subscription": "1"}
];

export let Accounts = [
    {"id": 1, "admin": true, "name": "admin", "image": "...", "type": "Adult", "created-date": "12-45-2004", "preferences": [""], "group-id": 1},
    {"id": 2, "admin": false, "name": "me", "image": "...", "type": "Adult", "created-date": "12-45-2004", "preferences": [""], "group-id": 1},
    {"id": 3, "admin": false, "name": "hmm", "image": "...", "type": "Adult", "created-date": "12-45-2004", "preferences": [""], "group-id": 1},

    {"id": 4, "admin": true, "name": "ME", "image": "...", "type": "Adult", "created-date": "12-45-2004", "preferences": [""], "group-id": 2},
    {"id": 5, "admin": false, "name": "SISTER", "image": "...", "type": "Children", "created-date": "12-45-2004", "preferences": [""], "group-id": 2},

    {"id": 6, "admin": true, "name": "Daddy", "image": "...", "type": "Adult", "created-date": "12-45-2004", "preferences": [""], "group-id": 3},
    {"id": 7, "admin": false, "name": "Mommy", "image": "...", "type": "Adult", "created-date": "12-45-2004", "preferences": [""], "group-id": 3},
    {"id": 8, "admin": false, "name": "Dog", "image": "...", "type": "Children", "created-date": "12-45-2004", "preferences": [""], "group-id": 3},
    {"id": 9, "admin": false, "name": "Step-Sister", "image": "...", "type": "Adult", "created-date": "12-45-2004", "preferences": [""], "group-id": 3},
]


///// Content
export let Contents = [
    // {"id": 1350, "name": "media", "type": "video/mp4", "image": "...", "cloudfront": "...", "creation-date": "13/12/2004", "author": "Me", "actors": ["James"], "genres": ["Humor"], "tags": ["API"], "description": "Blabla..."},

    {
        "id": 1350,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "The Matrix",
        "creation-date": "1999-03-31",
        "author": "The Wachowskis",
        "actors": ["Keanu Reeves", "Carrie-Anne Moss"],
        "genres": ["Science Fiction", "Action"],
        "tags": ["cyberpunk", "artificial intelligence"],
        "description": "A hacker learns about the true nature of reality and his role in a war against its controllers."
    },
    {
        "id": 1351,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "The Godfather",
        "creation-date": "1972-03-24",
        "author": "Francis Ford Coppola",
        "actors": ["Marlon Brando", "Al Pacino"],
        "genres": ["Crime", "Drama"],
        "tags": ["mafia", "family"],
        "description": "The aging patriarch of an organized crime dynasty transfers control to his reluctant son."
    },
    {
        "id": 1352,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "Inception",
        "creation-date": "2010-07-16",
        "author": "Christopher Nolan",
        "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
        "genres": ["Science Fiction", "Thriller"],
        "tags": ["dreams", "heist"],
        "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task."
    },
    {
        "id": 1353,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "Titanic",
        "creation-date": "1997-12-19",
        "author": "James Cameron",
        "actors": ["Leonardo DiCaprio", "Kate Winslet"],
        "genres": ["Romance", "Drama"],
        "tags": ["historical", "tragedy"],
        "description": "A love story blossoms aboard the ill-fated R.M.S. Titanic."
    },
    {
        "id": 1354,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "Mad Max: Fury Road",
        "creation-date": "2015-05-15",
        "author": "George Miller",
        "actors": ["Tom Hardy", "Charlize Theron"],
        "genres": ["Action", "Adventure"],
        "tags": ["post-apocalyptic", "chase"],
        "description": "In a desert wasteland, a woman rebels against a tyrant in search of her homeland."
    },
    {
        "id": 1355,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "Pulp Fiction",
        "creation-date": "1994-10-14",
        "author": "Quentin Tarantino",
        "actors": ["John Travolta", "Uma Thurman"],
        "genres": ["Crime", "Drama"],
        "tags": ["nonlinear", "dark humor"],
        "description": "The lives of two hitmen, a boxer, and others intertwine in four tales of violence and redemption."
    },
    {
        "id": 1356,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "The Lion King",
        "creation-date": "1994-06-15",
        "author": "Roger Allers",
        "actors": ["Matthew Broderick", "Jeremy Irons"],
        "genres": ["Animation", "Adventure"],
        "tags": ["coming of age", "family"],
        "description": "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery."
    },
    {
        "id": 1357,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "Star Wars: A New Hope",
        "creation-date": "1977-05-25",
        "author": "George Lucas",
        "actors": ["Mark Hamill", "Harrison Ford"],
        "genres": ["Science Fiction", "Adventure"],
        "tags": ["space opera", "rebellion"],
        "description": "Luke Skywalker joins forces with a Jedi knight, a princess, and a smuggler to save the galaxy."
    },
    {
        "id": 1358,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "The Shawshank Redemption",
        "creation-date": "1994-10-14",
        "author": "Frank Darabont",
        "actors": ["Tim Robbins", "Morgan Freeman"],
        "genres": ["Drama"],
        "tags": ["prison", "friendship"],
        "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption."
    },
    {
        "id": 1359,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "Avengers: Endgame",
        "creation-date": "2019-04-26",
        "author": "Anthony Russo, Joe Russo",
        "actors": ["Robert Downey Jr.", "Chris Evans"],
        "genres": ["Action", "Superhero"],
        "tags": ["time travel", "superheroes"],
        "description": "The Avengers assemble once more to reverse Thanos' actions and restore balance to the universe."
    },
    {
        "id": 1360,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "The Dark Knight",
        "creation-date": "2008-07-18",
        "author": "Christopher Nolan",
        "actors": ["Christian Bale", "Heath Ledger"],
        "genres": ["Action", "Crime"],
        "tags": ["vigilante", "corruption"],
        "description": "Batman faces off against the Joker, a criminal mastermind who seeks to create chaos in Gotham City."
    },
    {
        "id": 1361,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "Jurassic Park",
        "creation-date": "1993-06-11",
        "author": "Steven Spielberg",
        "actors": ["Sam Neill", "Laura Dern"],
        "genres": ["Science Fiction", "Adventure"],
        "tags": ["dinosaurs", "genetics"],
        "description": "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting two kids."
    },
    {
        "id": 1362,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "Forrest Gump",
        "creation-date": "1994-07-06",
        "author": "Robert Zemeckis",
        "actors": ["Tom Hanks", "Robin Wright"],
        "genres": ["Drama", "Romance"],
        "tags": ["historical", "life story"],
        "description": "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold through the perspective of an Alabama man with a low IQ."
    },
    {
        "id": 1363,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "The Terminator",
        "creation-date": "1984-10-26",
        "author": "James Cameron",
        "actors": ["Arnold Schwarzenegger", "Linda Hamilton"],
        "genres": ["Science Fiction", "Action"],
        "tags": ["artificial intelligence", "time travel"],
        "description": "A cyborg assassin is sent from the future to kill the mother of a future resistance leader."
    },
    {
        "id": 1364,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "Spirited Away",
        "creation-date": "2001-07-20",
        "author": "Hayao Miyazaki",
        "actors": ["Rumi Hiiragi", "Miyu Irino"],
        "genres": ["Animation", "Fantasy"],
        "tags": ["coming of age", "spirit world"],
        "description": "A young girl becomes trapped in a strange and magical world and must find a way to free herself and her parents."
    },
    {
        "id": 1365,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "The Shining",
        "creation-date": "1980-05-23",
        "author": "Stanley Kubrick",
        "actors": ["Jack Nicholson", "Shelley Duvall"],
        "genres": ["Horror", "Thriller"],
        "tags": ["haunted hotel", "madness"],
        "description": "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence."
    },
    {
        "id": 1366,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "Gladiator",
        "creation-date": "2000-05-05",
        "author": "Ridley Scott",
        "actors": ["Russell Crowe", "Joaquin Phoenix"],
        "genres": ["Action", "Drama"],
        "tags": ["revenge", "Roman Empire"],
        "description": "A betrayed Roman general seeks vengeance against the corrupt emperor who murdered his family."
    },
    {
        "id": 1367,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "The Silence of the Lambs",
        "creation-date": "1991-02-14",
        "author": "Jonathan Demme",
        "actors": ["Jodie Foster", "Anthony Hopkins"],
        "genres": ["Thriller", "Crime"],
        "tags": ["serial killer", "psychological"],
        "description": "A young FBI agent seeks the help of a brilliant, imprisoned cannibal to catch another serial killer."
    },
    {
        "id": 1368,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "La La Land",
        "creation-date": "2016-12-09",
        "author": "Damien Chazelle",
        "actors": ["Ryan Gosling", "Emma Stone"],
        "genres": ["Romance", "Musical"],
        "tags": ["dreams", "love"],
        "description": "A jazz musician and an aspiring actress fall in love while pursuing their dreams in Los Angeles."
    },
    {
        "id": 1369,
        "type": "video/mp4", "image": "...", "cloudfront": "...",
        "name": "Coco",
        "creation-date": "2017-11-22",
        "author": "Lee Unkrich",
        "actors": ["Anthony Gonzalez", "Gael García Bernal"],
        "genres": ["Animation", "Family"],
        "tags": ["Day of the Dead", "music"],
        "description": "Aspiring musician Miguel, confronted with his family’s ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather."
    }
];


/// Types
export type date = string
export type content_cat = "Film" | "Series" | "Other"

export type Groups_DB_Type = typeof Groups[0];
export type Groups_DB_Type_Nullable = {
    "id": number,
    "name": string,
    "password": string,
    "email": string,
    "created-date": date,
    "updated-at": date,
    "subscription": string
};

export type Accounts_DB_Type = typeof Accounts[0];
export type Accounts_DB_Type_Nullable = {
    "id": number | null,
    "admin": boolean | null,
    "name": string | null,
    "image": string | null,
    "type": string | null,
    "created-date": date | null,
    "preferences": string[] | null,
    "group-id": Groups_DB_Type_Nullable["id"] | null
};


export type Content_DB_Type = typeof Contents[0];
export type Content_DB_Type_Nullable = {
    "id": number,
    "name": string,
    "type": "video/mp4",
    "creation-date": date,
    "author": string,
    "image": string,
    "cloudfront": string,
    "category": content_cat,
    "description": string,
};
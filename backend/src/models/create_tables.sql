-- Table: account

CREATE EXTENSION IF NOT EXISTS pgcrypto ;
SELECT gen_random_uuid();
create table account(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY ,
    name varchar(20) not null,
    password varchar(80) not null,
    email varchar(30) UNIQUE not null,
    subscription varchar(10) not null,
    created_at TIMESTAMPTZ DEFAULT NOW()
);



-- Table: users

CREATE TYPE type_account AS ENUM ('Adult', 'Children');
create table users(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name varchar(40) not null,
    thumbnail text not null,
    admin boolean default FALSE,
    type type_account default 'Adult',
    interests text[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    group_id uuid references account(id) not null,
    
    CONSTRAINT unique_user_per_group UNIQUE (name, group_id) -- Unicité du nom d'utilisateur par groupe
);

CREATE OR REPLACE FUNCTION enforce_group_rules()
RETURNS TRIGGER AS $$
DECLARE
    user_count INTEGER;
BEGIN
    -- Compter combien d'utilisateurs sont dans le groupe
    SELECT COUNT(*) INTO user_count
    FROM users
    WHERE group_id = NEW.group_id;

    -- Vérifier si le groupe a déjà 5 utilisateurs
    IF user_count >= 5 THEN
        RAISE EXCEPTION 'Le groupe % a déjà 5 utilisateurs', NEW.group_id;
    END IF;

    -- Définir admin_account à TRUE si c'est le premier utilisateur du groupe
    IF user_count = 0 THEN
        NEW.admin:= TRUE;
    END IF;

    -- Continuer avec l'insertion
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_group_before_insert
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION enforce_group_rules();



-- Table: movies

CREATE TYPE genres AS ENUM ('Anime','Movie','Serie');
create table movies(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title varchar(60) not null, 
    description text not null,
    thumbnail text not null,
    director varchar(80) not null,
    actors text[] not null,
    all_audiences boolean default TRUE,
    duration float not null,
    note float not null,
    release_date date not null,
    categories text[] not null,
    tags text[] not null,
    video_key text not null,
    genre genres default 'Movie',
    type_content varchar(15) default 'video/mp4'
);
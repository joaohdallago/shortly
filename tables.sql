CREATE TABLE users (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
    id serial PRIMARY KEY,
    "userId" integer REFERENCES users(id),
    token text NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE urls (
    id serial PRIMARY KEY,
    "userId" integer NOT NULL REFERENCES users(id),
    url text NOT NULL,
    "shortUrl" text NOT NULL UNIQUE,
    "visitCount" integer NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);
CREATE TABLE users (
  user_id serial primary key,
  username varchar(255) unique not null,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL
);

CREATE TABLE notes (
  note_id serial primary key,
  title varchar(255) NOT NULL,
  content text NULL,
  created_at timestamp,
  updated_at timestamp,
  user_id integer REFERENCES users(user_id)
);
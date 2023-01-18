CREATE DATABASE crud;

\c crud;

CREATE TABLE users (
    user_id serial primary key,
    user_name varchar(43) not null,
    user_email char(50) not null
);

INSERT INTO users (user_name, user_email)
    VALUES ('akromjon', 'akromjon@gmail.com'),('olimjon', 'olimjon@gmail.com'),('asadullo', 'asadullo@gmail.com');

select * from users;
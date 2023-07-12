create table users
(
    id         int auto_increment
        primary key,
    name       text       null,
    email      text       null,
    password   text       null,
    permission tinyint(1) null
);
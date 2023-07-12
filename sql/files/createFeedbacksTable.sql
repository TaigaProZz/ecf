create table feedbacks
(
    id         int auto_increment
        primary key,
    name       text       null,
    message    text       null,
    rating     int        null,
    isVerified tinyint(1) null
);

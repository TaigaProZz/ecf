create table schedule
(
    id                int auto_increment
        primary key,
    day               text null,
    morning_opening   text null,
    morning_closing   text null,
    afternoon_opening text null,
    afternoon_closing text null,
    isOpened          int  null
);
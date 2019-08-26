drop table game;
drop table user;

create table game (
    game_id     integer identity primary key,
    host        integer not null,
    guest       integer);

create table user (
    user_id     integer identity primary key,
    username    varchar(64) unique not null);

alter table game add foreign key (host) references user(user_id);
alter table game add foreign key (guest) references user(user_id);

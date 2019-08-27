--drop table game;
--drop table user;

create table game (
    id          integer identity primary key,
    host        integer not null,
    guest       integer,
    status      varchar(64));

create table user (
    id     integer identity primary key,
    username    varchar(64) unique not null);

alter table game add foreign key (host) references user(id);
alter table game add foreign key (guest) references user(id);

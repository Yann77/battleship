drop table game if exists;
drop table user if exists;
drop table view if exists;
drop table cell if exists;

create table game (
    id          integer identity primary key,
    host        integer not null,
    guest       integer,
    status      varchar(64));

create table user (
    id     integer identity primary key,
    username    varchar(64) unique not null);

create table board (
                      id          integer identity primary key,
                      user_id     integer,
                      name        varchar(64));

create table view (
                      board_id    integer,
                      cord_x      integer,
                      cord_y      integer);

create table cell (
                       id    integer identity primary key,
                       board_id     integer,
                       status      varchar(64),
                       type        varchar(64),
                       cord_x      integer,
                       cord_y      integer);

alter table game add foreign key (host) references user(id);
alter table game add foreign key (guest) references user(id);
alter table view add foreign key (board_id) references board(id);
alter table cell add foreign key (board_id) references board(id);








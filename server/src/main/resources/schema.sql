drop table game if exists;
drop table cell if exists;

create table game (
    id          integer identity primary key,
    host        integer not null,
    guest       integer,
    status      varchar(64));

create table board (
                      id          integer identity primary key,
                      username        varchar(64));
create table cell (
                       id    integer identity primary key,
                       board_id     integer,
                       touched      boolean DEFAULT FALSE NOT NULL,
                       type        varchar(64),
                       cord_x      integer,
                       cord_y      integer,
                       startCell   boolean,
                       horizontal  boolean);


alter table game add foreign key (host) references board(id);
alter table game add foreign key (guest) references board(id);
-- alter table view add foreign key (board_id) references board(id);
-- alter table cell add foreign key (board_id) references board(id);








create table game (
    game_id integer identity primary key);

create table user (
    user_id        integer identity primary key,
    username  varchar(64) unique not null,
    game_id integer);

alter table user add foreign key (game_id) references game(game_id);

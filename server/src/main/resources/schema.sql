create table user (
  id        integer identity primary key,
  username  varchar(64) unique not null);

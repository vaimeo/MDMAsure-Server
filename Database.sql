create table devices
(
    id            int auto_increment
        primary key,
    name          tinytext   null,
    enterprise_id int        null,
    mdm_device_id mediumtext null,
    device_data   json       null,
    status        tinytext   null
);

create table enterprises
(
    id                int auto_increment
        primary key,
    mdm_enterprise_id text        null,
    name              varchar(55) null
);

create table policies
(
    id            int auto_increment
        primary key,
    mdm_policy_id text        null,
    enterprise_id int(55)     null,
    name          varchar(55) null,
    enroll_url    text        null,
    policy_data   json        null,
    constraint enterprise_id_fk
        foreign key (enterprise_id) references enterprises (id)
);

create table users
(
    id       int auto_increment
        primary key,
    username varchar(25) null,
    password varchar(55) null
);


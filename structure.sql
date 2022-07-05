-- example_schema
\timing off
\pset null ''
\x off
\pset pager
\set ON_ERROR_STOP on
\set QUIET 1


drop database if exists transactions ;
create database transactions;

begin;
-- drop schema if exists public cascade;
create schema if not exists public;
set search_path to public;

\c transactions

create table if not exists election_answers (
  user_id integer,
  answer_code integer,
  answer_content text,
  question_variable text,
  _updated_at timestamp default now()
);

commit;

begin;

insert into election_answers(user_id, answer_code, answer_content, question_variable) values
  (1, 1,    NULL, 'agegroup1')
, (1, NULL, 'MEXICO', 'country')
, (1, NULL, 'GRADUATE', 'educ_US2')
, (1, NULL, 'MALE', 'gender2')
, (1, NULL, 'Caucasian or White', 'ethnicity2')
, (1, NULL, 'Yes, Hispanic', 'latin2')
, (1, NULL, 'DEM', 'vote')
, (2, 2,    NULL, 'agegroup1')
, (2, NULL, 'USA', 'country')
, (2, NULL, 'POSTGRADUATE', 'educ_US2')
, (2, NULL, 'MALE', 'gender2')
, (2, NULL, 'Caucasian or White', 'ethnicity2')
, (2, NULL, 'No', 'latin2')
, (2, NULL, 'REP', 'vote')
, (3, 3,    NULL, 'agegroup1')
, (3, NULL, 'USA', 'country')
, (3, NULL, 'HIGH-SCHOOL', 'educ_US2')
, (3, NULL, 'FEMALE', 'gender2')
, (3, NULL, 'Caucasian or White', 'ethnicity2')
, (3, NULL, 'No', 'latin2')
, (3, NULL, 'IND', 'vote')
, (4, 1,    NULL, 'agegroup1')
, (4, NULL, 'USA', 'country')
, (4, NULL, 'POSTGRADUATE', 'educ_US2')
, (4, NULL, 'MALE', 'gender2')
, (4, NULL, 'Caucasian or White', 'ethnicity2')
, (4, NULL, 'No', 'latin2')
, (4, NULL, 'DEM', 'vote')
, (5, 2,    NULL, 'agegroup1')
, (5, NULL, 'USA', 'country')
, (5, NULL, 'GRADUATE', 'educ_US2')
, (5, NULL, 'FEMALE', 'gender2')
, (5, NULL, 'Caucasian or White', 'ethnicity2')
, (5, NULL, 'No', 'latin2')
, (5, NULL, 'DEM', 'intent')
, (6, 1,    NULL, 'agegroup1')
, (6, NULL, 'USA', 'country')
, (6, NULL, 'POSTGRADUATE', 'educ_US2')
, (6, NULL, 'MALE', 'gender2')
, (6, NULL, 'Caucasian or White', 'ethnicity2')
, (6, NULL, 'No', 'latin2')
, (6, NULL, 'REP', 'vote')
on conflict do nothing;

commit;

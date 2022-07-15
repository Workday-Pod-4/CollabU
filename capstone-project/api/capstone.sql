\echo 'Drop and recreate capstone db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE capstone;
CREATE DATABASE capstone;

\connect capstone

\i capstone-schema.sql
DROP TABLE IF EXISTS favariteMovie ;

CREATE TABLE IF NOT EXISTS favariteMovie (

id SERIAL PRIMARY KEY,
title VARCHAR(255),
release_date VARCHAR(1000),
poster_path  VARCHAR(1000),
overview VARCHAR(1000)

)
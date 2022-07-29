CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK(POSITION('@' IN email) > 1),
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    location TEXT,
    timezone TEXT,
    job_title TEXT,
    company TEXT,
    years_of_experience TEXT,
    college TEXT,
    major TEXT,
    profile_image_url   TEXT,
    social_media_link_1 TEXT,
    social_media_link_2 TEXT,
    social_media_link_3 TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS previously_matched (
    id SERIAL PRIMARY KEY,
    user_1_id INTEGER NOT NULL,
    user_2_id INTEGER NOT NULL, 
    match_timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_2_id) REFERENCES users(id) ON DELETE CASCADE
);

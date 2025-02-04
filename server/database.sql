CREATE DATABASE joonelidb;

USE joonelidb;

-- News Table
CREATE TABLE news (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT,
    site TEXT,
    description TEXT,
    source TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reset_token TEXT,
    reset_token_expiry DATETIME DEFAULT NULL
);


-- Brochure Table
CREATE TABLE Brochure (
    brochure_id INT AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    designation TEXT NOT NULL,
    phone TEXT NOT NULL,
    description TEXT NOT NULL,
    meeting BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Demo Table
CREATE TABLE Demo (
    demo_id INT AUTO_INCREMENT PRIMARY KEY,
    username TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    designation TEXT NOT NULL,
    phone TEXT NOT NULL,
    description TEXT NOT NULL,
    meeting BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Table
CREATE TABLE contact (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    job VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    telephone VARCHAR(50) NOT NULL,
    writingAbout VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Images Table
CREATE TABLE images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    image_data LONGBLOB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bankingPlan (
    pricing_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price VARCHAR(10) NOT NULL,
    duration VARCHAR(20) NOT NULL,
    features JSON NOT NULL,
    excludedFeature JSON  NULL -- New column added
);


CREATE TABLE tradingplan (
    pricing_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price VARCHAR(10) NOT NULL,
    duration VARCHAR(20) NOT NULL,
    features JSON NOT NULL,
    excludedFeature JSON  NULL -- New column added
);


CREATE TABLE blog (
  blog_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_data LONGBLOB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  click_count INT DEFAULT 0 -- New column to track the number of clicks
);

-- Example of creating an admin user
INSERT INTO users (username, email, password, role)
VALUES ('admin', 'admin@example.com', 'hashedpassword', 'admin');

ALTER TABLE blog ADD COLUMN slug VARCHAR(255);

UPDATE blog
SET slug = CONCAT('slug-', blog_id)
WHERE slug IS NULL OR slug = '';

ALTER TABLE blog MODIFY COLUMN slug VARCHAR(255) NOT NULL UNIQUE;


CREATE TABLE subscriptions (
    subs_id INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-increment subscription ID
    Name VARCHAR(100) NOT NULL,              -- Name of the subscriber
    email VARCHAR(100) NOT NULL,             -- Email address of the subscriber
    phone VARCHAR(15),                       -- Phone number (optional)
    type VARCHAR(50) NOT NULL,               -- Subscription type (e.g., basic, premium)
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date of subscription (auto-generated)
);


-- Career Table
CREATE TABLE career (
    career_id INT AUTO_INCREMENT PRIMARY KEY,
    job_type VARCHAR(50) NOT NULL,
    experience VARCHAR(50),
    qualification VARCHAR(100),
    category VARCHAR(100),
    location VARCHAR(255),
    title VARCHAR(100) NOT NULL,
    apply_before DATE NOT NULL,
    description TEXT,
    salary TEXT,
    skills_required TEXT,
    responsibility TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE career 
ADD COLUMN responsibility TEXT;


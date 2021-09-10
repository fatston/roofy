/*DDL STATEMENTS*/


DROP TABLE IF EXISTS user_reviews;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS bookmarks;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS seller;
DROP TABLE IF EXISTS listings;

CREATE TABLE users(	
	user_id INTEGER PRIMARY KEY AUTOINCREMENT,
	email VARCHAR(256)  NOT NULL UNIQUE,
	password CHAR(256)  NOT NULL ,
	display_picture BLOB  ,
	CHECK(EMAIL LIKE '%@%' )
);	
	
	
	
CREATE TABLE seller(	
	seller_id INTEGER PRIMARY KEY AUTOINCREMENT,
	username VARCHAR(256)  NOT NULL UNIQUE,
	password CHAR(256)  NOT NULL ,
	company VARCHAR(256)  NOT NULL,
	contact_number INTEGER  UNIQUE NOT NULL,
	email VARCHAR(256)  NOT NULL UNIQUE,
	display_picture BLOB  ,
	CHECK(LENGTH(CONTACT_NUMBER) = 8 AND EMAIL LIKE '%@%')
);	
	
	
CREATE TABLE listings(	
	listing_id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER REFERENCES users(user_id)  ON DELETE CASCADE NOT NULL,
	listing_address VARCHAR(256)  NOT NULL,
	listing_pc INT(6)  NOT NULL,
	listing_date DATE  NOT NULL,
	sale_or_rent VARCHAR(4)  NOT NULL,
	description TEXT  NOT NULL,
	image BLOB  NOT NULL,
	property_type VARCHAR(11)  NOT NULL,
	floor_level INT  NOT NULL,
	floor_size INT  NOT NULL,
	rooms CHAR(10)  NOT NULL,
	pricing FLOAT  NOT NULL,
	p_negotiable BINARY  NOT NULL,
	furnishings TEXT  ,
	facilities_and_amenities TEXT  ,
	availability DATE  NOT NULL,
	lease_term CHAR(10)  NOT NULL,
	price_psf FLOAT  NOT NULL,
	tenure VARCHAR(20)  NOT NULL,
	CHECK(LENGTH(LISTING_PC) = 6 AND SALE_OR_RENT = 'SALE' OR SALE_OR_RENT = 'RENT' AND PROPERTY_TYPE = 'CONDOMINIUM' OR PROPERTY_TYPE = 'HDB' OR PROPERTY_TYPE - 'LANDED' AND FLOOR_LEVEL = 'GROUND' OR FLOOR_LEVEL = 'LOW' OR FLOOR_LEVEL = 'MID' OR FLOOR_LEVEL = 'HIGH' OR FLOOR_LEVEL = 'PENTHOUSE' AND ROOMS = '1 Room' OR ROOMS = '2 Room' OR ROOMS = '3 Room' OR ROOMS = '4 Room' OR ROOMS = '5+ Room' AND FURNISHINGS = 'FULLY FURNISHED' OR FURNISHINGS = 'PARTIALLY FURNISHED' OR FURNISHINGS = 'UNFURNISHED' AND LEASE_TERM = 'Short Term' OR LEASE_TERM = '1 Year' OR LEASE_TERM = '2 Years' OR LEASE_TERM = 'Flexible' AND TENURE = 'Freehold' OR TENURE = '99-year Leasehold' OR TENURE = '999-year Leasehold' OR TENURE = 'Unknown Tenure')
);	
	
	
	
	
CREATE TABLE user_reviews(	
	review_id INTEGER PRIMARY KEY AUTOINCREMENT,
	revieweruser_id INTEGER REFERENCES users(user_id)  ON DELETE CASCADE NOT NULL,
	seller_id INTEGER REFERENCES seller(seller_id)  ON DELETE CASCADE NOT NULL,
	listing_id INTEGER REFERENCES listings(listing_id)  ON DELETE CASCADE NOT NULL,
	ur_images BLOB  ,
	description CHAR(20)  NOT NULL 
);	
	
	
	
CREATE TABLE comments(	
	listing_id INTEGER REFERENCES listings(listing_id)  ON DELETE CASCADE NOT NULL,
	seller_id INTEGER REFERENCES seller(seller_id)  ON DELETE CASCADE NOT NULL,
	comments TEXT  NOT NULL,
	datetime DATETIME  NOT NULL
);	
	
	   
	
CREATE TABLE transactions(	
	property_agent_id INTEGER REFERENCES seller(seller_id)  ON DELETE CASCADE NOT NULL,
	listing_id INTEGER REFERENCES listings(listing_id)  ON DELETE CASCADE NOT NULL,
	user_id INTEGER REFERENCES users(user_id)  ON DELETE CASCADE NOT NULL,
	date DATE  NOT NULL 
);	
	
	
	
CREATE TABLE bookmarks(	
	user_id INTEGER REFERENCES users(user_id)  ON DELETE CASCADE NOT NULL,
	listing_id INTEGER REFERENCES listings(listing_id)  ON DELETE CASCADE NOT NULL
);	

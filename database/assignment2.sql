-- Insert new record into account table
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starknet.com', 'Iam1ronM@n');

-- Modify the account type to Admin
UPDATE account 
SET account_type = 'Admin'
WHERE account_id = 1;

-- Delete the Tony Stark record from the database
DELETE FROM account
WHERE account_id = 1;

-- Modify the "GM Hummer" record to read "a huge interior" rather than "small interiors"
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id = 10;

-- Use an inner join to select the make and model fields from the inventory table and the classification name field from the classification table for inventory items that belong to the "Sport" category.
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
INNER JOIN classification c
ON c.classification_id = i.classification_id
AND c.classification_id = 2;

-- Update all records in the inventory table to add "/vehicles" to the middle of the file path in the inv_image and inv_thumbnail columns using a single query
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
inv_thumbnail = REPLACE(inv_thumbnail, '/images/','/images/vehicles/');
-- Initialisation script: runs automatically on first container start
CREATE DATABASE IF NOT EXISTS lab6;
USE lab6;

CREATE TABLE IF NOT EXISTS tasks (
  id     INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name   VARCHAR(100) NOT NULL,
  status VARCHAR(20)  NOT NULL
);

-- Same sample data as the original in-memory array
INSERT INTO tasks (id, name, status) VALUES
  (1, 'Milk',         'done'),
  (2, 'Eggs',         'done'),
  (3, 'Bread',        'pending'),
  (4, 'Butter',       'pending'),
  (5, 'Orange juice', 'pending');

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  status VARCHAR(50)
);

INSERT INTO tasks (name, status) VALUES
  ('Task 1', 'pending'),
  ('Task 2', 'in-progress'),
  ('Task 3', 'done'),
  ('Task 4', 'pending'),
  ('Task 5', 'done'),
  ('Task 6', 'in-progress');

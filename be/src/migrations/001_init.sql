CREATE TABLE IF NOT EXISTS app_settings (
  `key`   VARCHAR(128) PRIMARY KEY,
  `value` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO app_settings (`key`, `value`) VALUES
  ('welcome', 'hello hearts'),
  ('default_seed', 'seed-2025-09-07')
ON DUPLICATE KEY UPDATE value=VALUES(value);

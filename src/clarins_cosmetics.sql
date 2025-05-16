create database clarins_cosmetic;

CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` char(100) charset utf8mb4,
  `dob` date,
  `gender` bool,
  `email` char(100) charset utf8mb4,
  `phone` char(15) charset utf8mb4 DEFAULT null,
  `role` tinyint DEFAULT 1,
  `status` tinyint DEFAULT 2,
  `password` char(100),
  `create_at` timestamp DEFAULT (current_timestamp),
  `update_at` timestamp DEFAULT (current_timestamp),
  `logged_in` timestamp DEFAULT (current_timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `products` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` char(100) charset utf8mb4,
  `brand_id` int,
  `category_id` int,
  `price` decimal(10,2) DEFAULT null,
  `stock_quantity` int,
  `description` text charset utf8mb4 DEFAULT null,
  `image_url` text charset utf8mb4 DEFAULT null,
  `create_at` timestamp DEFAULT (current_timestamp),
  `update_at` timestamp DEFAULT (current_timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `category` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` char(100) charset utf8mb4
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `brands` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` char(100) charset utf8mb4
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `orders` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int,
  `total` decimal(10,2),
  `status` enum("pending","paid","shipped","completed","cancelled"),
  `create_at` timestamp DEFAULT (current_timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `order_products` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_id` int,
  `product_id` int,
  `quantity` int,
  `price` decimal(10,2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `contact_us` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` char(100) charset utf8mb4,
  `email` char(100) charset utf8mb4,
  `subject` char(255) charset utf8mb4 DEFAULT null,
  `message` text charset utf8mb4 DEFAULT null,
  `create_at` timestamp DEFAULT (current_timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `visitor` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `ip_address` char(50) charset utf8mb4,
  `visit_time` timestamp DEFAULT (current_timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `reviews` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int,
  `product_id` int,
  `rating` tinyint,
  `comment` text,
  `created_at` timestamp DEFAULT (current_timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `cart_items` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int,
  `product_id` int,
  `quantity` int,
  `added_at` timestamp DEFAULT (current_timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `payments` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_id` int,
  `payment_method` char(50) charset utf8mb4,
  `payment_status` enum("pending","successful","failed"),
  `paid_at` timestamp DEFAULT (current_timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `order_products` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `cart_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`);

ALTER TABLE `order_products` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `cart_items` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

CREATE TABLE `carts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `carts_to_products` (
	`cart_id` int NOT NULL,
	`product_id` int NOT NULL,
	CONSTRAINT `carts_to_products_cart_id_product_id_pk` PRIMARY KEY(`cart_id`,`product_id`)
);
--> statement-breakpoint
ALTER TABLE `products` ADD `prices` int NOT NULL;--> statement-breakpoint
ALTER TABLE `carts_to_products` ADD CONSTRAINT `carts_to_products_cart_id_carts_id_fk` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `carts_to_products` ADD CONSTRAINT `carts_to_products_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;
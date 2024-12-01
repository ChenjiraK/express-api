CREATE TABLE `home_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `image_src` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint(20) unsigned NOT NULL DEFAULT 0,
  `other_price` bigint(20) unsigned NOT NULL DEFAULT 0,
  `unit` varchar(10) DEFAULT NULL,
  `cat_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=663 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `home_new_products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned DEFAULT NULL,
  `badge_id` bigint(20) unsigned DEFAULT NULL,
  `price` bigint(20) unsigned NOT NULL DEFAULT 0,
  `other_price` bigint(20) unsigned NOT NULL DEFAULT 0,
  `unit` varchar(10) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `image_src` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=663 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `home_discover_services` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `badge_id` bigint(20) unsigned DEFAULT NULL,
  `text` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=663 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `home_products_highlight` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `badge_id` bigint(20) unsigned DEFAULT NULL,
  `product_id` bigint(20) unsigned DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `price` bigint(20) unsigned NOT NULL DEFAULT 0,
  `unit` varchar(10) DEFAULT NULL,
  `image_src` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=663 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `home_support_services` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `icon_class` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=663 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `home_product_static` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `badge_id` varchar(255) DEFAULT NULL,
  `cat_id` bigint(20) unsigned DEFAULT NULL,
  `product_id` bigint(20) unsigned DEFAULT NULL,
  `product_id` bigint(20) unsigned DEFAULT NULL,
  `original_price` bigint(20) unsigned NOT NULL DEFAULT 0,
  `discount` bigint(20) unsigned NOT NULL DEFAULT 0,
  `discount_unit` varchar(255) DEFAULT NULL,
  `total_price` bigint(20) unsigned NOT NULL DEFAULT 0,
  `installment` varchar(255) DEFAULT NULL,
  `button_text` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=663 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*
Navicat MySQL Data Transfer

Source Server         : UBUNTU SERVER
Source Server Version : 50505
Source Host           : 192.168.8.120:3306
Source Database       : chatarreria

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-02-15 17:48:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_document_type` int(10) unsigned NOT NULL COMMENT 'Id del tipo de Documento',
  `document` bigint(20) NOT NULL,
  `commercial_name` varchar(140) COLLATE utf8_unicode_ci NOT NULL,
  `business_name` varchar(140) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_document_unique` (`document`),
  KEY `customers_id_document_type_foreign` (`id_document_type`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO `customers` VALUES ('1', '2', '900568896', 'Erika Fiscal', 'Erika', 'Cll 45 32-25', '4255689', null, null);
INSERT INTO `customers` VALUES ('2', '2', '900765896', 'Pepito Perez', 'Pepe S.A', 'Cll 85 64-44', '4478596', null, null);

-- ----------------------------
-- Table structure for document_types
-- ----------------------------
DROP TABLE IF EXISTS `document_types`;
CREATE TABLE `document_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of document_types
-- ----------------------------
INSERT INTO `document_types` VALUES ('1', 'C.C', null, null);
INSERT INTO `document_types` VALUES ('2', 'NIT', null, null);

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES ('23', '2014_10_12_000000_create_users_table', '1');
INSERT INTO `migrations` VALUES ('24', '2014_10_12_100000_create_password_resets_table', '1');
INSERT INTO `migrations` VALUES ('25', '2018_07_11_000001_create_customers_table', '1');
INSERT INTO `migrations` VALUES ('26', '2018_07_11_000002_create_document_types_table', '1');
INSERT INTO `migrations` VALUES ('27', '2018_07_11_000010_create_purchase_types_table', '1');
INSERT INTO `migrations` VALUES ('28', '2018_07_11_003704_create_purchases_table', '1');
INSERT INTO `migrations` VALUES ('29', '2018_07_11_003807_create_reciclators_table', '1');
INSERT INTO `migrations` VALUES ('30', '2018_08_17_033748_alter_reciclators_table', '1');
INSERT INTO `migrations` VALUES ('31', '2018_08_17_033808_alter_purchases_table', '1');
INSERT INTO `migrations` VALUES ('32', '2018_09_05_224421_alter_customers_table', '1');
INSERT INTO `migrations` VALUES ('33', '2019_01_15_190234_alter_users_table', '1');

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of password_resets
-- ----------------------------

-- ----------------------------
-- Table structure for purchase_types
-- ----------------------------
DROP TABLE IF EXISTS `purchase_types`;
CREATE TABLE `purchase_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of purchase_types
-- ----------------------------
INSERT INTO `purchase_types` VALUES ('1', 'carton', '5000', null, null);
INSERT INTO `purchase_types` VALUES ('2', 'papel', '2000', null, null);

-- ----------------------------
-- Table structure for purchases
-- ----------------------------
DROP TABLE IF EXISTS `purchases`;
CREATE TABLE `purchases` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date_purchase` date NOT NULL,
  `id_type_purchase` int(10) unsigned NOT NULL COMMENT 'Id de tipo de compra de la tabla tipos de compra',
  `id_reciclator` int(10) unsigned NOT NULL COMMENT 'Id del reciclador',
  `weight` double(8,2) NOT NULL COMMENT 'Peso de la chatarra',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchases_id_type_purchase_foreign` (`id_type_purchase`),
  KEY `purchases_id_reciclator_foreign` (`id_reciclator`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of purchases
-- ----------------------------
INSERT INTO `purchases` VALUES ('1', '2019-01-16', '1', '1', '20.00', null, null);
INSERT INTO `purchases` VALUES ('2', '2019-01-16', '2', '1', '30.00', null, null);

-- ----------------------------
-- Table structure for reciclators
-- ----------------------------
DROP TABLE IF EXISTS `reciclators`;
CREATE TABLE `reciclators` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_document_type` int(10) unsigned NOT NULL COMMENT 'Id del tipo de Documento',
  `document` int(11) NOT NULL,
  `first_name` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` int(11) NOT NULL,
  `mobile_number` bigint(20) NOT NULL,
  `id_type_purchase` int(10) unsigned NOT NULL COMMENT 'Id de tipo de compra de la tabla tipos de compra',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reciclators_document_unique` (`document`),
  KEY `reciclators_id_document_type_foreign` (`id_document_type`),
  KEY `reciclators_id_type_purchase_foreign` (`id_type_purchase`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of reciclators
-- ----------------------------
INSERT INTO `reciclators` VALUES ('1', '1', '1113124878', 'Carlos David', 'Ortega Lopez', 'Cra 32 44 52', '2567890', '3148596344', '1', null, null);
INSERT INTO `reciclators` VALUES ('2', '1', '1123124878', 'Giovany Mauricio', 'Muñoz Vergara', 'Cra 44 23 34', '5567890', '3208976789', '2', null, null);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_document_type` int(10) unsigned NOT NULL COMMENT 'Id del tipo de Documento',
  `document` bigint(20) NOT NULL,
  `name` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_document_unique` (`document`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_id_document_type_foreign` (`id_document_type`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '1', '1113124878', 'Hector Morales', 'hector@gmail.com', '123456', null, null, null);
INSERT INTO `users` VALUES ('2', '1', '1130661106', 'Erika Fiscal', 'erika@gmail.com', '123456', null, null, null);

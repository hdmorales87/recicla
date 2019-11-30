/*
Navicat MySQL Data Transfer

Source Server         : SERVIDOR DEMOS
Source Server Version : 100130
Source Host           : 127.0.0.1:3306
Source Database       : recicla

Target Server Type    : MYSQL
Target Server Version : 100130
File Encoding         : 65001

Date: 2019-11-30 12:18:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for companies
-- ----------------------------
DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `nombre_comercial` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `id_tipo_documento` int(5) DEFAULT NULL,
  `documento` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_documento` (`documento`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of companies
-- ----------------------------
INSERT INTO `companies` VALUES ('1', 'EMPRESA DEMO', 'EMPRESA DEMO', '1', '123456', '');

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_tipo_documento` int(10) unsigned NOT NULL COMMENT 'Id del tipo de Documento',
  `documento` bigint(20) NOT NULL,
  `nombre_comercial` varchar(140) COLLATE utf8_unicode_ci NOT NULL,
  `razon_social` varchar(140) COLLATE utf8_unicode_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `telefono` int(11) NOT NULL,
  `id_empresa` int(10) DEFAULT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_document_unique` (`documento`) USING BTREE,
  KEY `customers_id_document_type_foreign` (`id_tipo_documento`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of customers
-- ----------------------------

-- ----------------------------
-- Table structure for document_types
-- ----------------------------
DROP TABLE IF EXISTS `document_types`;
CREATE TABLE `document_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of document_types
-- ----------------------------
INSERT INTO `document_types` VALUES ('1', 'C.C', '');

-- ----------------------------
-- Table structure for modulos
-- ----------------------------
DROP TABLE IF EXISTS `modulos`;
CREATE TABLE `modulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of modulos
-- ----------------------------

-- ----------------------------
-- Table structure for permisos
-- ----------------------------
DROP TABLE IF EXISTS `permisos`;
CREATE TABLE `permisos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `id_modulo` int(10) DEFAULT NULL,
  `orden` int(10) DEFAULT NULL,
  `nivel` smallint(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of permisos
-- ----------------------------

-- ----------------------------
-- Table structure for product_types
-- ----------------------------
DROP TABLE IF EXISTS `product_types`;
CREATE TABLE `product_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `precio_compra` int(11) NOT NULL,
  `precio_venta` int(11) DEFAULT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of product_types
-- ----------------------------

-- ----------------------------
-- Table structure for purchases
-- ----------------------------
DROP TABLE IF EXISTS `purchases`;
CREATE TABLE `purchases` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fecha_compra` date NOT NULL,
  `id_tipo_producto` int(10) unsigned NOT NULL COMMENT 'Id de tipo de compra de la tabla tipos de compra',
  `id_reciclador` int(10) unsigned NOT NULL COMMENT 'Id del reciclador',
  `peso` double(8,2) NOT NULL COMMENT 'Peso de la chatarra',
  `id_empresa` int(10) DEFAULT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`),
  KEY `purchases_id_type_purchase_foreign` (`id_tipo_producto`) USING BTREE,
  KEY `purchases_id_reciclator_foreign` (`id_reciclador`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of purchases
-- ----------------------------

-- ----------------------------
-- Table structure for reciclators
-- ----------------------------
DROP TABLE IF EXISTS `reciclators`;
CREATE TABLE `reciclators` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_tipo_documento` int(10) unsigned NOT NULL COMMENT 'Id del tipo de Documento',
  `documento` int(11) NOT NULL,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `direccion` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `telefono` int(11) NOT NULL,
  `celular` bigint(20) NOT NULL,
  `id_tipo_producto` int(10) unsigned NOT NULL COMMENT 'Id de tipo de compra de la tabla tipos de compra',
  `id_empresa` int(10) DEFAULT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `reciclators_document_unique` (`documento`) USING BTREE,
  KEY `reciclators_id_document_type_foreign` (`id_tipo_documento`) USING BTREE,
  KEY `reciclators_id_type_purchase_foreign` (`id_tipo_producto`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of reciclators
-- ----------------------------

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `id_empresa` int(10) DEFAULT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', 'SUPERUSUARIO', '0', '');
INSERT INTO `roles` VALUES ('2', 'ADMINISTRADOR', '1', '');

-- ----------------------------
-- Table structure for roles_permisos
-- ----------------------------
DROP TABLE IF EXISTS `roles_permisos`;
CREATE TABLE `roles_permisos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_rol` int(10) DEFAULT NULL,
  `id_permiso` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of roles_permisos
-- ----------------------------

-- ----------------------------
-- Table structure for sales
-- ----------------------------
DROP TABLE IF EXISTS `sales`;
CREATE TABLE `sales` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fecha_venta` date NOT NULL,
  `factura_venta` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_tipo_producto` int(10) unsigned NOT NULL COMMENT 'Id de tipo de compra de la tabla tipos de compra',
  `id_cliente` int(10) unsigned NOT NULL COMMENT 'Id del reciclador',
  `peso` double(8,2) NOT NULL COMMENT 'Peso de la chatarra',
  `id_empresa` int(10) DEFAULT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`),
  KEY `purchases_id_type_purchase_foreign` (`id_tipo_producto`) USING BTREE,
  KEY `purchases_id_reciclator_foreign` (`id_cliente`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sales
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_tipo_documento` int(10) unsigned NOT NULL COMMENT 'Id del tipo de Documento',
  `documento` bigint(20) NOT NULL,
  `primer_nombre` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `segundo_nombre` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `primer_apellido` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `segundo_apellido` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(191) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `direccion` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `telefono` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_empresa` int(5) DEFAULT NULL,
  `imagen_usuario` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_rol` int(10) DEFAULT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_document_unique` (`documento`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_id_document_type_foreign` (`id_tipo_documento`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '1', '1113624878', 'Hector', 'David', 'Morales', 'Lopez', 'Hector', 'hector@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'asfasfas', 'asfasfasfasf', 'RnJpIE5vdiAwMSAyMDE5IDIyOjA2OjUyIEdNVCswMDAwIChVVEMp', '1', '1.jpg', '1', '');
INSERT INTO `users` VALUES ('12', '1', '1113456789', 'DIDI', 'ALEX', 'INAGAN', 'ROSERO', 'DIDI ALEX INAGAN ROSERO', 'alexinagan@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'CLL 56 33 95', '4456789', null, '1', '', '2', '');
INSERT INTO `users` VALUES ('13', '1', '1130661106', 'ERIKA', 'VIVIANA', 'FISCAL', 'CAICEDO', 'ERIKA VIVIANA FISCAL CAICEDO', 'fiscal.erika@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'CLL 45 33 45', '4456789', null, '1', '', '2', '');

-- ----------------------------
-- Table structure for users_companies
-- ----------------------------
DROP TABLE IF EXISTS `users_companies`;
CREATE TABLE `users_companies` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_user` int(10) DEFAULT NULL,
  `id_company` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of users_companies
-- ----------------------------

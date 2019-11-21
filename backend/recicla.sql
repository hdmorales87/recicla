/*
Navicat MySQL Data Transfer

Source Server         : LOCALHOST
Source Server Version : 100132
Source Host           : localhost:3306
Source Database       : recicla

Target Server Type    : MYSQL
Target Server Version : 100132
File Encoding         : 65001

Date: 2019-11-14 12:53:40
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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of companies
-- ----------------------------
INSERT INTO `companies` VALUES ('1', 'EMPRESA DEMO', 'EMPRESA DEMO', '1', '123456');
INSERT INTO `companies` VALUES ('2', 'DFHDFH', 'DFHDFHDFH', '1', '345563');
INSERT INTO `companies` VALUES ('3', 'WWWWW', 'DFHDFHDFH', '1', '345563');
INSERT INTO `companies` VALUES ('4', 'WWWWW', 'DFHDFHDFHGGG', '1', '345563');
INSERT INTO `companies` VALUES ('5', 'DFHDFHGGGG', 'DFHDFHDFH', '1', '345563');

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `customers_document_unique` (`documento`),
  KEY `customers_id_document_type_foreign` (`id_tipo_documento`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO `customers` VALUES ('1', '3', '900568896', 'Erika Fiscal', 'Erika', 'Cll 45 32-25', '4255689', '1');
INSERT INTO `customers` VALUES ('2', '2', '900765896', 'Pepito Perez', 'Pepe S.A', 'Cll 85 64-44', '4478596', '1');

-- ----------------------------
-- Table structure for document_types
-- ----------------------------
DROP TABLE IF EXISTS `document_types`;
CREATE TABLE `document_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of document_types
-- ----------------------------
INSERT INTO `document_types` VALUES ('1', 'CC');
INSERT INTO `document_types` VALUES ('2', 'NPM');
INSERT INTO `document_types` VALUES ('6', 'RUT');

-- ----------------------------
-- Table structure for modulos
-- ----------------------------
DROP TABLE IF EXISTS `modulos`;
CREATE TABLE `modulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- ----------------------------
-- Records of modulos
-- ----------------------------
INSERT INTO `modulos` VALUES ('1', 'dashboard');
INSERT INTO `modulos` VALUES ('2', 'ventas');
INSERT INTO `modulos` VALUES ('3', 'compras');
INSERT INTO `modulos` VALUES ('4', 'clientes');
INSERT INTO `modulos` VALUES ('5', 'recicladores');
INSERT INTO `modulos` VALUES ('6', 'informes');
INSERT INTO `modulos` VALUES ('7', 'administracion');

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
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- ----------------------------
-- Records of permisos
-- ----------------------------
INSERT INTO `permisos` VALUES ('1', 'Dashboard', '1', '100', '1');
INSERT INTO `permisos` VALUES ('2', 'Ingreso Modulo de Ventas', '2', '200', '1');
INSERT INTO `permisos` VALUES ('3', 'Insertar/Editar Ventas', '2', '210', '2');
INSERT INTO `permisos` VALUES ('4', 'Eliminar Ventas', '2', '220', '2');
INSERT INTO `permisos` VALUES ('5', 'Ingreso Modulo de Compras', '3', '300', '1');
INSERT INTO `permisos` VALUES ('6', 'Insertar/Editar Compras', '3', '310', '2');
INSERT INTO `permisos` VALUES ('7', 'Eliminar Compras', '3', '320', '2');
INSERT INTO `permisos` VALUES ('8', 'Ingreso Modulo de Clientes', '4', '400', '1');
INSERT INTO `permisos` VALUES ('9', 'Insertar/Editar Clientes', '4', '410', '2');
INSERT INTO `permisos` VALUES ('10', 'Eliminar Clientes', '4', '420', '2');
INSERT INTO `permisos` VALUES ('11', 'Ingreso Modulo de Recicladores', '5', '500', '1');
INSERT INTO `permisos` VALUES ('12', 'Insertar/Editar Recicladores', '5', '510', '2');
INSERT INTO `permisos` VALUES ('13', 'Eliminar Recicladores', '5', '520', '2');
INSERT INTO `permisos` VALUES ('14', 'Ingreso Modulo de Informes', '6', '600', '1');
INSERT INTO `permisos` VALUES ('15', 'Ingreso Panel de Control', '7', '700', '1');
INSERT INTO `permisos` VALUES ('16', 'Tipos de Producto', '7', '705', '2');
INSERT INTO `permisos` VALUES ('17', 'Tipos de Documento', '7', '710', '2');
INSERT INTO `permisos` VALUES ('18', 'Usuarios', '7', '715', '2');
INSERT INTO `permisos` VALUES ('19', 'Empresas', '7', '720', '2');
INSERT INTO `permisos` VALUES ('20', 'Roles', '7', '725', '2');

-- ----------------------------
-- Table structure for product_types
-- ----------------------------
DROP TABLE IF EXISTS `product_types`;
CREATE TABLE `product_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `precio_compra` int(11) NOT NULL,
  `precio_venta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of product_types
-- ----------------------------
INSERT INTO `product_types` VALUES ('1', 'SDGSDGSDGSDG', '5000', '10000');
INSERT INTO `product_types` VALUES ('2', 'HHHHH', '10000', '20000');
INSERT INTO `product_types` VALUES ('38', 'CARTON', '5000', '10000');

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
  PRIMARY KEY (`id`),
  KEY `purchases_id_type_purchase_foreign` (`id_tipo_producto`),
  KEY `purchases_id_reciclator_foreign` (`id_reciclador`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of purchases
-- ----------------------------
INSERT INTO `purchases` VALUES ('7', '2019-10-19', '2', '2', '40.00', '1');
INSERT INTO `purchases` VALUES ('2', '2019-01-16', '2', '0', '0.00', '1');
INSERT INTO `purchases` VALUES ('3', '2019-10-10', '1', '0', '0.00', '1');
INSERT INTO `purchases` VALUES ('4', '2019-10-17', '36', '1', '0.00', '1');
INSERT INTO `purchases` VALUES ('5', '2019-10-11', '1', '0', '0.00', '1');
INSERT INTO `purchases` VALUES ('6', '2019-10-10', '1', '0', '0.00', '1');
INSERT INTO `purchases` VALUES ('8', '2019-11-01', '1', '2', '4000.00', '1');

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `reciclators_document_unique` (`documento`),
  KEY `reciclators_id_document_type_foreign` (`id_tipo_documento`),
  KEY `reciclators_id_type_purchase_foreign` (`id_tipo_producto`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of reciclators
-- ----------------------------
INSERT INTO `reciclators` VALUES ('1', '3', '1113124878', 'Carlos David', 'Cra 32 44 52', '2567890', '3148596344', '1', '1');
INSERT INTO `reciclators` VALUES ('2', '1', '1123124878', 'Giovany Mauricio', 'Cra 44 23 34', '5567890', '3208976789', '2', '1');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `id_empresa` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', 'SUPERUSUARIO', '0');
INSERT INTO `roles` VALUES ('2', 'ADMINISTRADOR', '1');
INSERT INTO `roles` VALUES ('3', 'USUARIO_CONSULTA', '1');

-- ----------------------------
-- Table structure for roles_permisos
-- ----------------------------
DROP TABLE IF EXISTS `roles_permisos`;
CREATE TABLE `roles_permisos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_rol` int(10) DEFAULT NULL,
  `id_permiso` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- ----------------------------
-- Records of roles_permisos
-- ----------------------------
INSERT INTO `roles_permisos` VALUES ('3', '2', '1');
INSERT INTO `roles_permisos` VALUES ('4', '2', '2');
INSERT INTO `roles_permisos` VALUES ('5', '2', '17');
INSERT INTO `roles_permisos` VALUES ('6', '2', '15');
INSERT INTO `roles_permisos` VALUES ('7', '2', '4');

-- ----------------------------
-- Table structure for sales
-- ----------------------------
DROP TABLE IF EXISTS `sales`;
CREATE TABLE `sales` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fecha_venta` date NOT NULL,
  `id_tipo_producto` int(10) unsigned NOT NULL COMMENT 'Id de tipo de compra de la tabla tipos de compra',
  `id_cliente` int(10) unsigned NOT NULL COMMENT 'Id del reciclador',
  `peso` double(8,2) NOT NULL COMMENT 'Peso de la chatarra',
  `id_empresa` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchases_id_type_purchase_foreign` (`id_tipo_producto`),
  KEY `purchases_id_reciclator_foreign` (`id_cliente`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of sales
-- ----------------------------
INSERT INTO `sales` VALUES ('2', '2019-01-16', '2', '0', '0.00', '1');
INSERT INTO `sales` VALUES ('3', '2019-10-10', '1', '0', '0.00', '1');
INSERT INTO `sales` VALUES ('4', '2019-10-17', '36', '1', '0.00', '1');
INSERT INTO `sales` VALUES ('5', '2019-10-11', '1', '0', '0.00', '1');
INSERT INTO `sales` VALUES ('6', '2019-10-10', '1', '0', '0.00', '1');
INSERT INTO `sales` VALUES ('7', '2019-10-10', '2', '2', '40.00', '1');
INSERT INTO `sales` VALUES ('8', '2019-11-01', '1', '2', '5000.00', '1');

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_document_unique` (`documento`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_id_document_type_foreign` (`id_tipo_documento`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '2', '1113624878', 'HECTOR', 'DAVID', 'Morales', 'Lopezzzz', 'HECTOR DAVID Morales Lopezzzz', 'hector.morales@logicalsoft.co', 'e34e3ecd4740f9e93f93d67726ab645c', 'asfasfas', 'asfasfasfasf', 'VHVlIE9jdCAyOSAyMDE5IDEyOjE0OjM5IEdNVC0wNTAwIChHTVQtMDU6MDAp', '1', '1.jpg', '2');
INSERT INTO `users` VALUES ('2', '1', '1130661106', 'Erika', 'Viviana', 'Fiscal', 'Caicedo', 'Erika Viviana Fiscal Caicedo', 'erika@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'sgsdgsdg', 'sdgsdgsdg', 'U2F0IE5vdiAwMiAyMDE5IDEyOjU2OjAzIEdNVC0wNTAwIChHTVQtMDU6MDAp', '1', null, '2');
INSERT INTO `users` VALUES ('6', '1', '1113624999', 'asfasfasf', 'asfasfasf', 'asfasfasf', 'asfasfasf', '', 'asfasfasfasf', 'e10adc3949ba59abbe56e057f20f883e', 'asfasfasfasf', 'asfasfasfasfa', null, '1', null, '2');
INSERT INTO `users` VALUES ('7', '5', '111362444433', 'asfasfasf', 'asfasfasf', 'asfasfasf', 'asfasfasf', '', 'asfasfasfasf gggggg', 'e10adc3949ba59abbe56e057f20f883e', 'asfasfasfasf', 'asfasfasfasfa', null, '1', null, '2');
INSERT INTO `users` VALUES ('8', '5', '111462444433', 'asfasfasf', 'asfasfasf', 'asfasfasf', 'asfasfasf', '', 'asfasfasfasfnnnn', 'e10adc3949ba59abbe56e057f20f883e', 'asfasfasfasf', 'asfasfasfasfa', null, '1', null, '2');
INSERT INTO `users` VALUES ('9', '1', '1113624874', 'asfasfasf', 'asfasf', 'asfasf', 'asfasfasf', '', 'gggggsfsf', 'e10adc3949ba59abbe56e057f20f883e', 'dfafa', 'asfasfasf', null, '1', null, '2');
INSERT INTO `users` VALUES ('10', '1', '235325', 'CAMILO', 'VARGAS', 'CORREA', 'sdgsdg', 'CAMILO VARGAS CORREA sdgsdg', 'sdgsdgsdggggg', 'e10adc3949ba59abbe56e057f20f883e', 'sdgsdg', 'sdgsdg', null, '1', null, '2');
INSERT INTO `users` VALUES ('13', '1', '789769679', 'HECTOR', 'HECTOR', 'MORALES', 'MORALES', 'HECTOR HECTOR MORALES MORALES', 'warrior1987@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'CLL 45 # 32-25', '445856', null, '1', null, '2');

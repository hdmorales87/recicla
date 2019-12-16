/*
Navicat MySQL Data Transfer

Source Server         : SERVIDOR DEMOS
Source Server Version : 100130
Source Host           : localhost:3306
Source Database       : recicla

Target Server Type    : MYSQL
Target Server Version : 100130
File Encoding         : 65001

Date: 2019-12-16 14:16:06
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
-- Table structure for companies_smtp
-- ----------------------------
DROP TABLE IF EXISTS `companies_smtp`;
CREATE TABLE `companies_smtp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_empresa` int(11) NOT NULL,
  `correo` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `servidor` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `puerto` int(11) NOT NULL,
  `autenticacion` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `password` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `seguridad_smtp` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of companies_smtp
-- ----------------------------
INSERT INTO `companies_smtp` VALUES ('1', '1', 'warrior1987@gmail.com', 'smtp.gmail.com', '465', 'si', 'uxcmxfztiqmwjqja', 'ssl', '');

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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO `customers` VALUES ('1', '2', '856963258', 'CARTONES COLOMBIA', 'CARTONERA DE COLOMBIA SAS', 'CRA 9 23 45', '4458596', '1', '');

-- ----------------------------
-- Table structure for document_types
-- ----------------------------
DROP TABLE IF EXISTS `document_types`;
CREATE TABLE `document_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of document_types
-- ----------------------------
INSERT INTO `document_types` VALUES ('1', 'C.C', '');
INSERT INTO `document_types` VALUES ('2', 'NIT', '');

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
INSERT INTO `permisos` VALUES ('18', 'Usuarios', '7', '715', '2');
INSERT INTO `permisos` VALUES ('20', 'Roles', '7', '725', '2');
INSERT INTO `permisos` VALUES ('17', 'Configuracion SMTP', '7', '710', '2');

-- ----------------------------
-- Table structure for product_types
-- ----------------------------
DROP TABLE IF EXISTS `product_types`;
CREATE TABLE `product_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `precio_compra` int(11) NOT NULL,
  `precio_venta` int(11) DEFAULT NULL,
  `id_empresa` int(10) DEFAULT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of product_types
-- ----------------------------
INSERT INTO `product_types` VALUES ('1', 'CARTON', '4500', '6000', '1', '');

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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of purchases
-- ----------------------------
INSERT INTO `purchases` VALUES ('1', '2019-12-16', '1', '1', '10.00', '1', '');

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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of reciclators
-- ----------------------------
INSERT INTO `reciclators` VALUES ('1', '1', '214124124', 'CARLOS MARIO RENTERIA', 'CLL 56 # 33-25', '4458563', '3159636344', '1', '1', '');

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
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', 'SUPERUSUARIO', '0', '');
INSERT INTO `roles` VALUES ('2', 'ADMINISTRADOR', '1', '');
INSERT INTO `roles` VALUES ('3', 'USUARIO', '1', '');

-- ----------------------------
-- Table structure for roles_permisos
-- ----------------------------
DROP TABLE IF EXISTS `roles_permisos`;
CREATE TABLE `roles_permisos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_rol` int(10) DEFAULT NULL,
  `id_permiso` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of roles_permisos
-- ----------------------------
INSERT INTO `roles_permisos` VALUES ('1', '2', '1');
INSERT INTO `roles_permisos` VALUES ('2', '2', '2');
INSERT INTO `roles_permisos` VALUES ('3', '2', '3');
INSERT INTO `roles_permisos` VALUES ('4', '2', '4');
INSERT INTO `roles_permisos` VALUES ('5', '2', '5');
INSERT INTO `roles_permisos` VALUES ('6', '2', '6');
INSERT INTO `roles_permisos` VALUES ('7', '2', '7');
INSERT INTO `roles_permisos` VALUES ('8', '2', '8');
INSERT INTO `roles_permisos` VALUES ('9', '2', '9');
INSERT INTO `roles_permisos` VALUES ('10', '2', '10');
INSERT INTO `roles_permisos` VALUES ('11', '2', '11');
INSERT INTO `roles_permisos` VALUES ('12', '2', '12');
INSERT INTO `roles_permisos` VALUES ('13', '2', '13');
INSERT INTO `roles_permisos` VALUES ('14', '2', '14');
INSERT INTO `roles_permisos` VALUES ('15', '2', '15');
INSERT INTO `roles_permisos` VALUES ('16', '2', '16');
INSERT INTO `roles_permisos` VALUES ('17', '2', '18');
INSERT INTO `roles_permisos` VALUES ('18', '2', '20');
INSERT INTO `roles_permisos` VALUES ('19', '3', '1');
INSERT INTO `roles_permisos` VALUES ('20', '3', '2');
INSERT INTO `roles_permisos` VALUES ('21', '3', '5');
INSERT INTO `roles_permisos` VALUES ('22', '3', '8');
INSERT INTO `roles_permisos` VALUES ('23', '3', '11');
INSERT INTO `roles_permisos` VALUES ('24', '3', '14');

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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sales
-- ----------------------------
INSERT INTO `sales` VALUES ('1', '2019-12-16', 'CLG 8569', '1', '1', '20.00', '1', '');

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
  `imagen_usuario` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `id_rol` int(10) DEFAULT NULL,
  `activo` bit(1) DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_document_unique` (`documento`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_id_document_type_foreign` (`id_tipo_documento`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '1', '1113624878', 'HECTOR', 'David', 'Morales', 'Lopez', 'HECTOR David Morales Lopez', 'warrior1987@gmail.com', '183876f12dd23b1765197361b25c20b0', 'asfasfas', 'asfasfasfasf', '', '1', '1.jpg', '1', '');
INSERT INTO `users` VALUES ('12', '1', '1113456789', 'DIDI', 'ALEX', 'INAGAN', 'ROSERO', 'DIDI ALEX INAGAN ROSERO', 'alexinagan@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'CLL 56 33 95', '4456789', null, '1', '', '2', '');
INSERT INTO `users` VALUES ('13', '1', '1130661106', 'ERIKA', 'VIVIANA', 'FISCAL', 'CAICEDO', 'ERIKA VIVIANA FISCAL CAICEDO', 'fiscal.erika@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'CLL 45 33 45', '4456789', null, '1', '', '2', '');
INSERT INTO `users` VALUES ('14', '1', '12345678', 'USUARIO', '', 'DEMO', '', 'USUARIO  DEMO ', 'camilalondono140@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'CLL 45 # 32-25', '4458596', null, '1', '', '3', '');

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
DROP TRIGGER IF EXISTS `users_INSERT`;
DELIMITER ;;
CREATE TRIGGER `users_INSERT` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
        SET NEW.password = MD5('123456');
        SET NEW.nombre = CONCAT(NEW.primer_nombre,' ',NEW.segundo_nombre,' ',NEW.primer_apellido,' ',NEW.segundo_apellido);
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `user_UPDATE`;
DELIMITER ;;
CREATE TRIGGER `user_UPDATE` BEFORE UPDATE ON `users` FOR EACH ROW BEGIN        
        SET NEW.nombre = CONCAT(NEW.primer_nombre,' ',NEW.segundo_nombre,' ',NEW.primer_apellido,' ',NEW.segundo_apellido);
END
;;
DELIMITER ;
SET FOREIGN_KEY_CHECKS=1;

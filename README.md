# mysqlAPI: Execute this query before try teste the project.

-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.17 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for sblbase
CREATE DATABASE IF NOT EXISTS `sblbase` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sblbase`;

-- Dumping structure for table sblbase.config
CREATE TABLE IF NOT EXISTS `config` (
  `idconfig` int(11) NOT NULL AUTO_INCREMENT,
  `sendtime` time DEFAULT NULL,
  `resendtime` time DEFAULT NULL,
  `timeout` time DEFAULT NULL,
  `automaticsendactivite` char(1) NOT NULL,
  PRIMARY KEY (`idconfig`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sblbase.config: ~0 rows (approximately)
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
/*!40000 ALTER TABLE `config` ENABLE KEYS */;

-- Dumping structure for table sblbase.people
CREATE TABLE IF NOT EXISTS `people` (
  `idpeople` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phonenumber` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL,
  `fk_idcategory` int(11) NOT NULL,
  `active` char(1) NOT NULL,
  `profilephoto` mediumblob,
  PRIMARY KEY (`idpeople`),
  KEY `fkcategory_idx` (`fk_idcategory`),
  CONSTRAINT `fkcategory` FOREIGN KEY (`fk_idcategory`) REFERENCES `peoplecategory` (`idpeoplecategory`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sblbase.people: ~11 rows (approximately)
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` (`idpeople`, `name`, `email`, `phonenumber`, `password`, `fk_idcategory`, `active`, `profilephoto`) VALUES
	(1, 'Iago Silva Vieira', 'iagosv_91@hotmail.com', '07931805539', '123', 1, 'S', NULL),
	(2, 'Joao da Silva', 'joao@joao.com', '07931805539', '123', 2, 'S', NULL),
	(3, 'Maria Ribeiro', 'maria@maria.com', '07931805539', '123', 2, 'S', NULL),
	(4, 'Chupetinha ahahhaua', 'maria@maria.com', '07931805539', '123', 2, 'S', NULL),
	(14, 'Hzhs', 'vieirassss.igs@gmai.com', '07484845455', '123', 1, 'S', NULL),
	(17, 'Nbsjabs', 'isjsjsj@shshshhsj.com', '6454554', '123', 2, 'N', NULL),
	(18, 'Hhhhhh', 'bHHAHA@AJJAHSHS.COM', '64645455446', '123', 2, 'N', NULL),
	(19, 'Cachorro', 'cachorro@auau.miau', '64675545484', '123', 1, 'N', NULL),
	(20, 'Gato', 'gato@miau.zrrrr', '94648488477', '123', 3, 'S', NULL),
	(21, 'Hsh', 'guto@djshhs.ssddjdh', '94648488477', '123', 3, 'S', NULL),
	(22, 'Sjsjshshhs', 'jahahs@ajsuhshs.con', '49464554545', '123', 2, 'S', NULL);
/*!40000 ALTER TABLE `people` ENABLE KEYS */;

-- Dumping structure for table sblbase.peoplecategory
CREATE TABLE IF NOT EXISTS `peoplecategory` (
  `idpeoplecategory` int(11) NOT NULL AUTO_INCREMENT,
  `namecategory` varchar(20) NOT NULL,
  PRIMARY KEY (`idpeoplecategory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sblbase.peoplecategory: ~3 rows (approximately)
/*!40000 ALTER TABLE `peoplecategory` DISABLE KEYS */;
INSERT INTO `peoplecategory` (`idpeoplecategory`, `namecategory`) VALUES
	(1, 'Manager'),
	(2, 'Driver'),
	(3, 'POC');
/*!40000 ALTER TABLE `peoplecategory` ENABLE KEYS */;

-- Dumping structure for table sblbase.peopleworkday
CREATE TABLE IF NOT EXISTS `peopleworkday` (
  `idpeopleworkday` int(11) NOT NULL AUTO_INCREMENT,
  `fk_people` int(11) NOT NULL,
  `fk_workday` int(11) NOT NULL,
  `worked` char(1) DEFAULT NULL,
  `agree_day` char(1) DEFAULT NULL,
  `dt_agreed` datetime DEFAULT NULL,
  `fk_route` int(11) DEFAULT NULL,
  PRIMARY KEY (`idpeopleworkday`),
  KEY `fkpeople_idx` (`fk_people`),
  KEY `fkworkday_idx` (`fk_workday`),
  KEY `fkroutes_idx` (`fk_route`) USING BTREE,
  CONSTRAINT `fkpeople` FOREIGN KEY (`fk_people`) REFERENCES `people` (`idpeople`),
  CONSTRAINT `fkroutes` FOREIGN KEY (`fk_route`) REFERENCES `route` (`idroutes`),
  CONSTRAINT `fkworkday` FOREIGN KEY (`fk_workday`) REFERENCES `workday` (`idworkday`),
  CONSTRAINT `peopleworkday_chk_1` CHECK ((`worked` in (_utf8mb4'S',_utf8mb4'N',_utf8mb4'I')))
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sblbase.peopleworkday: ~66 rows (approximately)
/*!40000 ALTER TABLE `peopleworkday` DISABLE KEYS */;
INSERT INTO `peopleworkday` (`idpeopleworkday`, `fk_people`, `fk_workday`, `worked`, `agree_day`, `dt_agreed`, `fk_route`) VALUES
	(1, 2, 1, 'S', NULL, NULL, 1),
	(2, 2, 2, 'S', NULL, NULL, 2),
	(3, 3, 1, 'S', NULL, NULL, 2),
	(4, 3, 2, 'S', NULL, NULL, 2),
	(5, 3, 3, 'S', NULL, NULL, 2),
	(6, 4, 3, 'S', NULL, NULL, 1),
	(7, 2, 5, 'S', NULL, NULL, 2),
	(8, 3, 5, 'S', NULL, NULL, NULL),
	(9, 4, 5, 'S', NULL, NULL, 1),
	(10, 2, 9, 'S', NULL, NULL, 1),
	(11, 3, 9, 'S', NULL, NULL, 1),
	(12, 4, 9, 'S', NULL, NULL, 2),
	(13, 2, 10, NULL, NULL, NULL, NULL),
	(14, 3, 10, NULL, NULL, NULL, NULL),
	(15, 4, 10, NULL, NULL, NULL, NULL),
	(16, 2, 11, NULL, NULL, NULL, NULL),
	(17, 3, 11, NULL, NULL, NULL, NULL),
	(18, 4, 11, NULL, NULL, NULL, NULL),
	(19, 2, 12, NULL, NULL, NULL, NULL),
	(20, 3, 12, NULL, NULL, NULL, NULL),
	(21, 4, 12, NULL, NULL, NULL, NULL),
	(22, 2, 13, NULL, NULL, NULL, NULL),
	(23, 3, 13, NULL, NULL, NULL, NULL),
	(24, 4, 13, NULL, NULL, NULL, NULL),
	(25, 2, 16, 'S', NULL, NULL, NULL),
	(26, 3, 16, 'S', NULL, NULL, NULL),
	(27, 4, 16, 'S', NULL, NULL, NULL),
	(28, 2, 17, 'S', NULL, NULL, 2),
	(29, 3, 17, 'S', NULL, NULL, 2),
	(30, 4, 17, 'S', NULL, NULL, 1),
	(31, 2, 18, 'N', NULL, NULL, NULL),
	(32, 3, 18, NULL, NULL, NULL, NULL),
	(33, 4, 18, 'N', NULL, NULL, 1),
	(34, 2, 19, NULL, NULL, NULL, NULL),
	(35, 3, 19, NULL, NULL, NULL, NULL),
	(36, 4, 19, 'S', NULL, NULL, NULL),
	(37, 2, 20, NULL, NULL, NULL, NULL),
	(38, 3, 20, NULL, NULL, NULL, NULL),
	(39, 4, 20, NULL, NULL, NULL, NULL),
	(40, 2, 21, 'N', NULL, NULL, NULL),
	(41, 3, 21, 'N', NULL, NULL, NULL),
	(42, 4, 21, 'S', NULL, NULL, NULL),
	(43, 2, 22, 'S', NULL, NULL, NULL),
	(44, 3, 22, 'S', NULL, NULL, NULL),
	(45, 4, 22, 'N', NULL, NULL, 1),
	(46, 2, 23, 'N', NULL, NULL, 2),
	(47, 3, 23, 'S', NULL, NULL, NULL),
	(48, 4, 23, 'N', NULL, NULL, 2),
	(49, 2, 24, NULL, NULL, NULL, NULL),
	(50, 3, 24, NULL, NULL, NULL, NULL),
	(51, 4, 24, NULL, NULL, NULL, NULL),
	(52, 2, 25, 'N', NULL, NULL, 2),
	(53, 3, 25, 'S', NULL, NULL, NULL),
	(54, 4, 25, 'S', NULL, NULL, 2),
	(55, 2, 26, 'N', NULL, NULL, 1),
	(56, 3, 26, 'N', NULL, NULL, NULL),
	(57, 4, 26, 'N', NULL, NULL, 2),
	(58, 22, 26, 'S', NULL, NULL, NULL),
	(62, 2, 27, 'S', NULL, NULL, NULL),
	(63, 3, 27, NULL, NULL, NULL, NULL),
	(64, 4, 27, 'S', NULL, NULL, NULL),
	(65, 22, 27, NULL, NULL, NULL, NULL),
	(69, 2, 28, 'S', NULL, NULL, 2),
	(70, 3, 28, 'S', NULL, NULL, NULL),
	(71, 4, 28, NULL, NULL, NULL, NULL),
	(72, 22, 28, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `peopleworkday` ENABLE KEYS */;

-- Dumping structure for table sblbase.route
CREATE TABLE IF NOT EXISTS `route` (
  `idroutes` int(11) NOT NULL AUTO_INCREMENT,
  `routename` varchar(45) NOT NULL,
  `routekey` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`idroutes`),
  UNIQUE KEY `routename_UNIQUE` (`routename`),
  UNIQUE KEY `key_UNIQUE` (`routekey`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sblbase.route: ~4 rows (approximately)
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` (`idroutes`, `routename`, `routekey`, `price`) VALUES
	(1, 'FULL ROUTE - SMALL', 'FRS', 135),
	(2, 'FULL ROUTE - LARGE', 'FRL', 150),
	(3, 'LARGE VAN - FULL ROUTE + SUPPORTE(2)', 'LVFS2', NULL),
	(4, 'JAJSBSBSHSBSBSBSSB', 'JSHSHS', 54848),
	(5, 'BSJHSHSHSHSHHSJSJNSBSJJSBSBBS', 'FRLR', 130);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;

-- Dumping structure for table sblbase.workday
CREATE TABLE IF NOT EXISTS `workday` (
  `idworkday` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `fk_workweek` int(11) NOT NULL,
  `drivers_amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`idworkday`),
  UNIQUE KEY `date_UNIQUE` (`date`),
  KEY `fkworkweek_idx` (`fk_workweek`),
  CONSTRAINT `fkworkweek` FOREIGN KEY (`fk_workweek`) REFERENCES `workweek` (`idworkweek`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sblbase.workday: ~19 rows (approximately)
/*!40000 ALTER TABLE `workday` DISABLE KEYS */;
INSERT INTO `workday` (`idworkday`, `date`, `fk_workweek`, `drivers_amount`) VALUES
	(1, '2021-01-10', 2, 2),
	(2, '2021-01-11', 2, 2),
	(3, '2021-01-12', 2, 2),
	(5, '2021-01-20', 2, 3),
	(9, '2021-01-21', 2, 3),
	(10, '2021-01-22', 2, NULL),
	(11, '2021-01-23', 2, NULL),
	(12, '2021-01-24', 2, NULL),
	(13, '2021-01-19', 2, NULL),
	(16, '2021-01-25', 12, 3),
	(17, '2021-01-26', 12, 3),
	(18, '2021-01-27', 12, 0),
	(19, '2021-01-28', 12, 1),
	(20, '2021-01-29', 12, NULL),
	(21, '2021-01-30', 12, 1),
	(22, '2021-01-31', 12, 2),
	(23, '2021-11-01', 13, 1),
	(24, '2021-11-04', 13, NULL),
	(25, '2021-11-05', 13, 2),
	(26, '2021-11-06', 13, 1),
	(27, '2021-11-07', 13, 2),
	(28, '2021-11-03', 13, 2);
/*!40000 ALTER TABLE `workday` ENABLE KEYS */;

-- Dumping structure for table sblbase.workweek
CREATE TABLE IF NOT EXISTS `workweek` (
  `idworkweek` int(11) NOT NULL AUTO_INCREMENT,
  `startdt` date NOT NULL,
  `enddt` date NOT NULL,
  `weeknumber` int(11) DEFAULT NULL,
  PRIMARY KEY (`idworkweek`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sblbase.workweek: ~2 rows (approximately)
/*!40000 ALTER TABLE `workweek` DISABLE KEYS */;
INSERT INTO `workweek` (`idworkweek`, `startdt`, `enddt`, `weeknumber`) VALUES
	(1, '2021-01-10', '2021-01-16', 1),
	(2, '2021-01-18', '2021-01-24', 2),
	(12, '2021-01-25', '2021-01-31', 3),
	(13, '2021-11-01', '2021-11-07', 4);
/*!40000 ALTER TABLE `workweek` ENABLE KEYS */;

-- Dumping structure for trigger sblbase.peopleworkday_after_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `peopleworkday_after_update` AFTER UPDATE ON `peopleworkday` FOR EACH ROW BEGIN
IF (NEW.worked <> IFNULL(OLD.worked,'N')) AND (NEW.worked = 'S') THEN
	UPDATE workday wd
	SET wd.drivers_amount = ifnull(wd.drivers_amount,0)+1
	WHERE wd.idworkday = OLD.fk_workday;
	
ELSEIF ((NEW.worked <> IFNULL(OLD.worked,'N')) AND (NEW.worked = 'N')) THEN
	UPDATE workday wd
	SET wd.drivers_amount = if(ifnull(wd.drivers_amount,0) = 0,0,wd.drivers_amount-1)
	WHERE wd.idworkday = OLD.fk_workday;
    
END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger sblbase.workday_AFTER_INSERT
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `workday_AFTER_INSERT` AFTER INSERT ON `workday` FOR EACH ROW BEGIN
INSERT INTO peopleworkday (fk_people, fk_workday)
	(SELECT p.idpeople, w.idworkday FROM workday w, people p, peoplecategory pc
	WHERE p.fk_idcategory = pc.idpeoplecategory 
	AND w.idworkday = NEW.idworkday
	AND pc.namecategory = 'driver'
	AND p.active = 'S');
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

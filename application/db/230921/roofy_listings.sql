-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: roofy
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listings` (
  `listing_id` int NOT NULL AUTO_INCREMENT,
  `seller_id` int DEFAULT NULL,
  `listing_address` varchar(255) NOT NULL,
  `listing_pc` int NOT NULL,
  `listing_date` date NOT NULL,
  `sale_or_rent` varchar(4) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(128) NOT NULL,
  `property_type` varchar(11) NOT NULL,
  `floor_level` int NOT NULL,
  `floor_size` int NOT NULL,
  `rooms` char(10) NOT NULL,
  `pricing` float NOT NULL,
  `p_negotiable` binary(1) NOT NULL,
  `furnishings` text,
  `availability` date NOT NULL,
  `lease_term` char(10) NOT NULL,
  `price_psf` float NOT NULL,
  `tenure` varchar(20) NOT NULL,
  `title` varchar(45) NOT NULL DEFAULT 'cool house bro',
  PRIMARY KEY (`listing_id`),
  KEY `listing seller_idx` (`seller_id`),
  CONSTRAINT `listings_chk_1` CHECK ((((length(`listing_pc`) = 6) and (`sale_or_rent` = _utf8mb4'SALE')) or ((`sale_or_rent` = _utf8mb4'RENT') and (`property_type` = _utf8mb4'CONDOMINIUM')) or (`property_type` = _utf8mb4'HDB') or ((0 <> (`property_type` - _utf8mb4'LANDED')) and (`floor_level` = _utf8mb4'GROUND')) or (`floor_level` = _utf8mb4'LOW') or (`floor_level` = _utf8mb4'MID') or (`floor_level` = _utf8mb4'HIGH') or ((`floor_level` = _utf8mb4'PENTHOUSE') and (`rooms` = _utf8mb4'1 Room')) or (`rooms` = _utf8mb4'2 Room') or (`rooms` = _utf8mb4'3 Room') or (`rooms` = _utf8mb4'4 Room') or ((`rooms` = _utf8mb4'5+ Room') and (`furnishings` = _utf8mb4'FULLY FURNISHED')) or (`furnishings` = _utf8mb4'PARTIALLY FURNISHED') or ((`furnishings` = _utf8mb4'UNFURNISHED') and (`lease_term` = _utf8mb4'Short Term')) or (`lease_term` = _utf8mb4'1 Year') or (`lease_term` = _utf8mb4'2 Years') or ((`lease_term` = _utf8mb4'Flexible') and (`tenure` = _utf8mb4'Freehold')) or (`tenure` = _utf8mb4'99-year Leasehold') or (`tenure` = _utf8mb4'999-year Leasehold') or (`tenure` = _utf8mb4'Unknown Tenure')))
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (21,1,'21 lower Kent Ridge',1,'2021-09-19','SALE','123','1632066247010.png','hdb',1,1,'1',1,_binary '1',NULL,'2222-11-11','',1,'22','cool house bro'),(22,1,'21 kent ridge',22222,'2021-09-20','SALE','23qq','1632067264439.png','hdb',1,1,'1',1,_binary '1',NULL,'2222-11-11','',1,'22','cool house bro'),(23,1,'500 rooster lane',123789,'2021-09-22','SALE','a big fat cock','1632317079984.png','hdb',20,20,'4',999999,_binary '0',NULL,'2021-09-22','',49999.9,'123','cool house bro'),(24,1,'21 bbc road',123456,'2021-09-22','SALE','aopiejrapoeijrawoepirjaweporiajwerpoiaewjropaiwejroawiejraowpeirjaewpoiradsflkjnavjkzxncvkzlxnvzlkxvndspfiajer ar aejroiaewj ropaisf','1632317665513.png','hdb',1,125,'1',100000,_binary '1',NULL,'2021-09-22','',800,'99','cool house bro'),(25,1,'21 pussy lane',123999,'2021-09-22','SALE','pussy is good','1632318224713.png','condo',1,1,'1',999996,_binary '1',NULL,'2021-09-23','',999996,'9999999','cool house bro');
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-23 22:10:38

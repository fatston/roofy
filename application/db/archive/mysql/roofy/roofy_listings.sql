-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
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
  `user_id` int DEFAULT NULL,
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
  `facilities_and_amenities` text,
  `availability` date NOT NULL,
  `lease_term` char(10) NOT NULL,
  `price_psf` float NOT NULL,
  `tenure` varchar(20) NOT NULL,
  PRIMARY KEY (`listing_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `listings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `listings_chk_1` CHECK ((((length(`LISTING_PC`) = 6) and (`SALE_OR_RENT` = _utf8mb4'SALE')) or ((`SALE_OR_RENT` = _utf8mb4'RENT') and (`PROPERTY_TYPE` = _utf8mb4'CONDOMINIUM')) or (`PROPERTY_TYPE` = _utf8mb4'HDB') or ((0 <> (`PROPERTY_TYPE` - _utf8mb4'LANDED')) and (`FLOOR_LEVEL` = _utf8mb4'GROUND')) or (`FLOOR_LEVEL` = _utf8mb4'LOW') or (`FLOOR_LEVEL` = _utf8mb4'MID') or (`FLOOR_LEVEL` = _utf8mb4'HIGH') or ((`FLOOR_LEVEL` = _utf8mb4'PENTHOUSE') and (`ROOMS` = _utf8mb4'1 Room')) or (`ROOMS` = _utf8mb4'2 Room') or (`ROOMS` = _utf8mb4'3 Room') or (`ROOMS` = _utf8mb4'4 Room') or ((`ROOMS` = _utf8mb4'5+ Room') and (`FURNISHINGS` = _utf8mb4'FULLY FURNISHED')) or (`FURNISHINGS` = _utf8mb4'PARTIALLY FURNISHED') or ((`FURNISHINGS` = _utf8mb4'UNFURNISHED') and (`LEASE_TERM` = _utf8mb4'Short Term')) or (`LEASE_TERM` = _utf8mb4'1 Year') or (`LEASE_TERM` = _utf8mb4'2 Years') or ((`LEASE_TERM` = _utf8mb4'Flexible') and (`TENURE` = _utf8mb4'Freehold')) or (`TENURE` = _utf8mb4'99-year Leasehold') or (`TENURE` = _utf8mb4'999-year Leasehold') or (`TENURE` = _utf8mb4'Unknown Tenure')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
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

-- Dump completed on 2021-09-12  0:43:38

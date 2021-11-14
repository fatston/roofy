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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `listing_id` int NOT NULL,
  `reply_id` int DEFAULT NULL,
  `comments` text NOT NULL,
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `listing_id` (`listing_id`),
  KEY `seller_id` (`seller_id`),
  KEY `reply_id` (`reply_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`listing_id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`seller_id`) REFERENCES `seller` (`seller_id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_5` FOREIGN KEY (`reply_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE,
  CONSTRAINT `comments_blank_check` CHECK ((`comments` <> _utf8mb4''))
) ENGINE=InnoDB AUTO_INCREMENT=277 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (6,35456992,NULL,'dabbbbbbbbbbbbb','2021-10-20 18:01:32',10056556,NULL),(7,35456992,6,'loooooooooool','2021-10-20 18:01:39',10056556,NULL),(8,30440789,NULL,'yo this is great','2021-10-20 18:06:15',10056556,NULL),(9,31319389,NULL,'sick bedroom hehe','2021-10-20 18:06:35',10056556,NULL),(10,39556318,NULL,'i love nus','2021-10-20 18:06:42',10056556,NULL),(11,35639334,NULL,'prof can u give me A grade thanks','2021-10-20 18:06:53',10056556,NULL),(12,39543860,NULL,'we worked super hard for this','2021-10-20 18:07:02',10056556,NULL),(13,32925096,NULL,'clifton is a god','2021-10-20 18:07:16',10056556,NULL),(14,39886110,NULL,'denny is a god','2021-10-20 18:07:23',10056556,NULL),(15,39886110,NULL,'im going to spam ur listing ','2021-10-20 11:07:34',10056556,NULL),(16,39886110,15,'is the seller dead i cant call him','2021-10-20 13:07:34',10225144,NULL),(17,39886110,NULL,'why is the seller not picking up the phone! worst seller dont want money isit???','2021-10-20 16:07:34',10409466,NULL),(18,39886110,17,'same he does not reply me','2021-10-20 18:17:34',10475045,NULL),(19,34,NULL,'why the pictures so little?? i like the location can update more pictures?','2021-10-19 14:17:34',10958751,NULL),(20,34,19,'i agree i need more picture before buying','2021-10-19 15:17:34',11556997,NULL),(21,34,NULL,'Hello all please take note the seller does not want to reveal his identity as he is a person of interest so we cannot disclose more photos if interested please contact and i will take you for viewing ','2021-10-20 18:01:39',NULL,1),(22,31319389,9,'Hey man! thanks! are you interested?','2021-10-20 18:01:39',NULL,2),(24,31319389,9,'SICK SICK SICK OMG','2021-10-20 19:57:13',11556997,NULL),(28,36902375,9,'I heard that singapore rent prices are increasing….','2021-10-20 20:26:32',NULL,NULL),(29,34697751,NULL,'Prof please give us an A','2021-10-20 20:27:16',10061355,NULL),(30,31802736,NULL,'if I buy this today got discount?','2021-10-20 20:28:08',15629595,NULL),(31,32,NULL,'This semester is horrible','2021-10-20 20:28:08',13392175,NULL),(32,33867821,NULL,'Omg I love how we can just save as many listings as we want','2021-10-20 20:28:08',14432551,NULL),(33,38930603,NULL,'so pretty!!!!','2021-10-20 20:28:08',14515530,NULL),(34,31564810,NULL,'I am so rich that im probably gna buy this place and use it as a toilet','2021-10-20 20:28:08',16970418,NULL),(35,34837838,NULL,'this house looks meh','2021-10-20 20:28:08',13057534,NULL),(36,28,NULL,'are there bathtubs in the toilet ','2021-10-20 20:28:08',16839324,NULL),(37,36811755,NULL,'Prof you look like the kind of person that likes you own a lot of houses','2021-10-20 20:28:08',12299960,NULL),(38,38965025,NULL,'if I had the money I would buy this place','2021-10-20 20:28:08',14579950,NULL),(39,35492502,NULL,'Prof did you see our comment on our site about giving us an A?','2021-10-20 20:28:08',10318203,NULL),(40,34846114,NULL,'why is it made to look like this?','2021-10-20 20:28:08',14133863,NULL),(41,36307448,NULL,'Omg I love how we can just save as many listings as we want','2021-10-20 20:28:08',12390312,NULL),(42,31247265,NULL,'Omg I love how we can just save as many listings as we want','2021-10-20 20:28:08',10318203,NULL),(43,34851916,NULL,'are there bathtubs in the toilet ','2021-10-20 20:28:08',16735193,NULL),(44,34129000,NULL,'are there bathtubs in the kitchen?','2021-10-20 20:28:08',18367350,NULL),(45,32010170,NULL,'we put in too much work for this','2021-10-20 20:28:08',11939789,NULL),(46,35961470,NULL,'This semester is horrible','2021-10-20 20:28:08',13073214,NULL),(47,30830403,NULL,'she sells seashells by the seashore','2021-10-20 20:28:08',14703563,NULL),(48,32124854,NULL,'why would anybody wna stay in yishun seriously','2021-10-20 20:28:08',19081832,NULL),(49,37624315,NULL,'if I buy this today got discount?','2021-10-20 20:28:08',18502111,NULL),(50,31982519,NULL,'This house fake one','2021-10-20 20:28:08',19630037,NULL),(51,38056979,NULL,'I am so rich that im probably gna buy this place and use it as a toilet','2021-10-20 20:28:08',14886014,NULL),(52,31617526,NULL,'are there bathtubs in the kitchen?','2021-10-20 20:28:08',15200698,NULL),(53,32638720,NULL,'this house looks meh','2021-10-20 20:28:08',16908114,NULL),(54,37923560,NULL,'why is it made to look like this?','2021-10-20 20:28:08',11956282,NULL),(55,39793814,NULL,'This site is an awesome site','2021-10-20 20:28:08',19308362,NULL),(56,31982519,NULL,'so pretty!!!!','2021-10-20 20:28:08',19836629,NULL),(57,32802622,NULL,'if I had the money I would rent this place for life','2021-10-20 20:28:08',12523273,NULL),(58,31841290,NULL,'omg so many rooms','2021-10-20 20:28:08',12987193,NULL),(59,31889975,NULL,'so pretty!!!!','2021-10-20 20:28:08',12356976,NULL),(60,34851916,NULL,'Prof have I ever told you that you look extremely charming?','2021-10-20 20:28:08',12390312,NULL),(61,33867821,NULL,'so pretty!!!!','2021-10-20 20:28:08',13741618,NULL),(62,34235862,NULL,'Legend has it if you come across a rick roll video, you will have 999999 years of good luck','2021-10-20 20:28:08',17915554,NULL),(63,38196766,NULL,'this house looks meh','2021-10-20 20:28:08',13057534,NULL),(64,30561089,NULL,'why is it made to look like this?','2021-10-20 20:28:08',11417142,NULL),(65,37916660,NULL,'Prof please give us an A','2021-10-20 20:28:08',14886014,NULL),(66,34851916,NULL,'this house looks meh','2021-10-20 20:28:08',14706252,NULL),(67,39234416,NULL,'this house looks meh','2021-10-20 20:28:08',16024008,NULL),(68,34263909,NULL,'Prof have I ever told you that you look extremely charming?','2021-10-20 20:28:08',19593392,NULL),(69,37923560,NULL,'I heard that singapore rent prices are increasing….','2021-10-20 20:28:08',12537913,NULL),(70,39543860,NULL,'Prof prof say serious give us an A','2021-10-20 20:28:08',13332608,NULL),(71,35608845,NULL,'This site is an awesome site','2021-10-20 20:28:08',19764125,NULL),(72,36935673,NULL,'Omg I love how we can just save as many listings as we want','2021-10-20 20:28:08',11246429,NULL),(73,38365588,NULL,'if I had the money I would rent this place for life','2021-10-20 20:28:08',12262571,NULL),(74,31319389,NULL,'does this house come with ceilings?','2021-10-20 20:28:08',11398125,NULL),(75,34263909,NULL,'Prof you are such an inspiration','2021-10-20 20:28:08',16348723,NULL),(76,39234416,NULL,'why would anybody wna stay in yishun seriously','2021-10-20 20:28:08',10229054,NULL),(77,38743530,NULL,'Prof you are such an inspiration','2021-10-20 20:28:08',11253490,NULL),(78,34366799,NULL,'omg so many rooms','2021-10-20 20:28:08',12147663,NULL),(79,39869478,NULL,'this looks like a fantastic storeroom','2021-10-20 20:28:08',10442632,NULL),(80,36213351,NULL,'if I had the money I would rent this place for life','2021-10-20 20:28:08',19249102,NULL),(81,33576198,NULL,'This house fake one','2021-10-20 20:28:08',19993406,NULL),(82,31841290,NULL,'omg so many rooms','2021-10-20 20:28:08',15399798,NULL),(83,39234416,NULL,'if I had the money I would buy this place','2021-10-20 20:28:08',19204371,NULL),(84,36142013,NULL,'kawaii senpai','2021-10-20 20:28:08',11191513,NULL),(85,36142013,NULL,'are there bathtubs in the toilet ','2021-10-20 20:28:08',16940046,NULL),(86,33867821,NULL,'this house looks meh','2021-10-20 20:28:08',16846832,NULL),(87,34697751,NULL,'Prof you are such an inspiration','2021-10-20 20:28:08',15699828,NULL),(88,34366799,NULL,'This semester is horrible','2021-10-20 20:28:08',13700625,NULL),(89,36142013,NULL,'this looks like a fantastic storeroom','2021-10-20 20:28:08',13453096,NULL),(90,31108334,NULL,'Prof have I ever told you that you look extremely charming?','2021-10-20 20:28:08',15427522,NULL),(91,34851916,NULL,'if I had the money I would buy this place','2021-10-20 20:28:08',14452973,NULL),(92,31210914,NULL,'This house fake one','2021-10-20 20:28:08',13929326,NULL),(93,31210914,NULL,'this house looks meh','2021-10-20 20:28:08',19249102,NULL),(94,38743530,NULL,'Prof did you see our comment on our site about giving us an A?','2021-10-20 20:28:08',11902992,NULL),(95,34851916,NULL,'I am so rich that im probably gna buy this place and use it as a toilet','2021-10-20 20:28:08',11765348,NULL),(96,30561089,NULL,'does this house come with ceilings?','2021-10-20 20:28:08',11027888,NULL),(97,31889975,NULL,'Omg I love how we can just save as many listings as we want','2021-10-20 20:28:08',19892327,NULL),(98,34837838,NULL,'if I buy this today got discount?','2021-10-20 20:28:08',15200698,NULL),(99,33867821,NULL,'Prof please give us an A','2021-10-20 20:28:08',19993406,NULL),(100,35189504,NULL,'if I had the money I would buy this place','2021-10-20 20:28:08',14232375,NULL),(101,34837838,NULL,'this looks like a fantastic storeroom','2021-10-20 20:28:08',14158690,NULL),(102,34846114,NULL,'if I had the money I would rent this place for life','2021-10-20 20:28:08',19593392,NULL),(103,38046101,NULL,'Prof prof say serious give us an A','2021-10-20 20:28:08',10519219,NULL),(104,38046101,NULL,'she sells seashells by the seashore','2021-10-20 20:28:08',18057808,NULL),(105,30223120,NULL,'are there bathtubs in the kitchen?','2021-10-20 20:28:08',11902992,NULL),(106,37923560,NULL,'this house looks meh','2021-10-20 20:28:08',16846832,NULL),(107,34793075,NULL,'this house looks meh','2021-10-20 20:28:08',11082778,NULL),(108,30561089,NULL,'this house looks meh','2021-10-20 20:28:08',16223455,NULL),(109,37923560,NULL,'does this house come with ceilings?','2021-10-20 20:28:08',13615282,NULL),(110,35522629,NULL,'why would anybody wna stay in yishun seriously','2021-10-20 20:28:08',16223455,NULL),(111,35961470,NULL,'are there bathtubs in the toilet ','2021-10-20 20:28:08',16567805,NULL),(112,31889975,NULL,'we put in too much work for this','2021-10-20 20:28:08',14232375,NULL),(113,34837838,NULL,'if I had the money I would rent this place for life','2021-10-20 20:28:08',17557902,NULL),(114,38743530,NULL,'This site is so user friendly ','2021-10-20 20:28:08',11793667,NULL),(115,34263909,NULL,'so pretty!!!!','2021-10-20 20:28:08',13238871,NULL),(116,33780680,NULL,'this house looks meh','2021-10-20 20:28:08',16112717,NULL),(117,30463883,NULL,'Prof have I ever told you that you look extremely charming?','2021-10-20 20:28:08',17915554,NULL),(118,35189504,NULL,'omg so many rooms','2021-10-20 20:28:08',18057808,NULL),(119,34697751,NULL,'does this house come with ceilings?','2021-10-20 20:28:08',12598273,NULL),(120,31319389,NULL,'Legend has it if you come across a rick roll video, you will have 999999 years of good luck','2021-10-20 20:28:08',12356976,NULL),(121,34793075,NULL,'Legend has it if you come across a rick roll video, you will have 999999 years of good luck','2021-10-20 20:28:08',15768656,NULL),(122,35189504,NULL,'we put in too much work for this','2021-10-20 20:28:08',12299960,NULL),(123,33576198,NULL,'This house fake one','2021-10-20 20:28:08',10524653,NULL),(124,30223120,NULL,'This semester is horrible','2021-10-20 20:28:08',12147663,NULL),(125,33780680,NULL,'I am so rich that im probably gna buy this place and use it as a toilet','2021-10-20 20:28:08',14401051,NULL),(126,35522629,NULL,'kawaii senpai','2021-10-20 20:28:08',12598273,NULL),(127,35189504,NULL,'why would anybody wna stay in yishun seriously','2021-10-20 20:28:08',15399798,NULL),(128,34846114,NULL,'I am so rich that im probably gna buy this place and use it as a toilet','2021-10-20 20:28:08',19836629,NULL),(129,35189504,NULL,'This semester is horrible','2021-10-20 20:28:08',19523584,NULL),(130,31319389,NULL,'I am so rich that im probably gna buy this place and use it as a toilet','2021-10-20 20:28:08',13164684,NULL),(131,33089493,NULL,'this house looks meh','2021-10-20 20:28:08',12147663,NULL),(132,33089493,NULL,'are there bathtubs in the kitchen?','2021-10-20 20:28:08',19249102,NULL),(133,33780680,NULL,'This semester is horrible','2021-10-20 20:28:08',17836609,NULL),(134,34837838,NULL,'Omg I love how we can just save as many listings as we want','2021-10-20 20:28:08',16429601,NULL),(135,34697751,NULL,'This semester is horrible','2021-10-20 20:28:08',18155880,NULL),(136,34697751,NULL,'omg so many rooms','2021-10-20 20:28:08',10893300,NULL),(137,31319389,NULL,'why is it made to look like this?','2021-10-20 20:28:08',16567805,NULL),(138,33780680,NULL,'Prof please give us an A','2021-10-20 20:28:08',16093890,NULL),(139,34837838,NULL,'I am so rich that im probably gna buy this place and use it as a toilet','2021-10-20 20:28:08',10583750,NULL),(140,38365588,NULL,'This semester is horrible','2021-10-20 20:28:48',17915554,NULL),(141,36368444,NULL,'does this house come with ceilings?','2021-10-20 20:28:48',19308362,NULL),(142,39869478,NULL,'are there bathtubs in the kitchen?','2021-10-20 20:28:48',10341227,NULL),(143,31889975,NULL,'I heard that singapore rent prices are increasing….','2021-10-20 20:28:48',16647872,NULL),(144,39462346,NULL,'Prof you look like the kind of person that likes you own a lot of houses','2021-10-20 20:28:48',19836629,NULL),(145,34793075,NULL,'I heard that singapore rent prices are increasing….','2021-10-20 20:28:48',15682646,NULL),(146,32638720,NULL,'This site is so user friendly ','2021-10-20 20:28:48',10919376,NULL),(147,35790199,NULL,'so pretty!!!!','2021-10-20 20:28:48',15972175,NULL),(148,33079909,NULL,'omg so many rooms','2021-10-20 20:28:48',14678981,NULL),(149,39793814,NULL,'so pretty!!!!','2021-10-20 20:28:48',11902992,NULL),(150,34366799,NULL,'this looks like a fantastic storeroom','2021-10-20 20:28:48',12262571,NULL),(151,35961470,NULL,'This site is an awesome site','2021-10-20 20:28:48',13741618,NULL),(152,35189504,NULL,'This site is so user friendly ','2021-10-20 20:28:48',11082778,NULL),(153,36142013,NULL,'we put in too much work for this','2021-10-20 20:28:48',14284184,NULL),(154,34927886,NULL,'Legend has it if you come across a rick roll video, you will have 999999 years of good luck','2021-10-20 20:28:48',18041956,NULL),(155,33089493,NULL,'Omg I love how we can just save as many listings as we want','2021-10-20 20:28:48',15972175,NULL),(156,36935673,NULL,'Prof please give us an A','2021-10-20 20:28:48',13700625,NULL),(157,31210914,NULL,'why would anybody wna stay in yishun seriously','2021-10-20 20:28:48',13238871,NULL),(158,37624315,NULL,'this house looks meh','2021-10-20 20:28:48',16511418,NULL),(159,37916660,NULL,'Prof prof say serious give us an A','2021-10-20 20:28:48',18267320,NULL),(160,38965025,NULL,'This site is an awesome site','2021-10-20 20:28:48',19121994,NULL),(161,38930603,NULL,'why would anybody wna stay in yishun seriously','2021-10-20 20:28:48',16846832,NULL),(162,32925096,NULL,'this looks like a fantastic storeroom','2021-10-20 20:28:48',14287940,NULL),(163,33079909,NULL,'so pretty!!!!','2021-10-20 20:28:48',19894327,NULL),(164,36121389,NULL,'I heard that singapore rent prices are increasing….','2021-10-20 20:28:48',16112717,NULL),(165,36811755,NULL,'this house looks meh','2021-10-20 20:28:48',1,NULL),(166,31581212,NULL,'This site is so user friendly ','2021-10-20 20:28:48',15399798,NULL),(167,37561579,NULL,'why would anybody wna stay in yishun seriously','2021-10-20 20:28:48',10906945,NULL),(168,31319389,NULL,'kawaii senpai','2021-10-20 20:28:48',15699828,NULL),(169,39793814,NULL,'Prof you are such an inspiration','2021-10-20 20:28:48',11027888,NULL),(170,30223120,NULL,'so pretty!!!!','2021-10-20 20:28:48',16773068,NULL),(171,33089493,NULL,'Prof prof say serious give us an A','2021-10-20 20:28:48',2,NULL),(172,38930603,NULL,'Prof did you see our comment on our site about giving us an A?','2021-10-20 20:28:48',11333575,NULL),(173,31617526,NULL,'This site is an awesome site','2021-10-20 20:28:48',17787690,NULL),(174,35608845,NULL,'if I had the money I would rent this place for life','2021-10-20 20:28:48',12188276,NULL),(175,31008572,NULL,'this looks like a fantastic storeroom','2021-10-20 20:28:48',19836629,NULL),(176,31982519,NULL,'This semester is horrible','2021-10-20 20:28:48',11246429,NULL),(177,33576198,NULL,'omg so many rooms','2021-10-20 20:28:48',11279557,NULL),(178,31889975,NULL,'Prof prof say serious give us an A','2021-10-20 20:28:48',16940046,NULL),(179,34927886,NULL,'This site is an awesome site','2021-10-20 20:28:48',15033747,NULL),(180,36213351,NULL,'Omg I love how we can just save as many listings as we want','2021-10-20 20:28:48',11333575,NULL),(181,39543860,NULL,'if I had the money I would buy this place','2021-10-20 20:28:48',19492120,NULL),(182,33867821,NULL,'I am so rich that im probably gna buy this place and use it as a toilet','2021-10-20 20:28:48',11902992,NULL),(183,32010170,NULL,'she sells seashells by the seashore','2021-10-20 20:28:48',13392175,NULL),(184,35790199,NULL,'if I had the money I would buy this place','2021-10-20 20:28:48',19081832,NULL),(185,33820599,NULL,'This semester is horrible','2021-10-20 20:28:48',19993406,NULL),(186,31210914,NULL,'so pretty!!!!','2021-10-20 20:28:48',19492120,NULL),(187,39234416,NULL,'this house looks meh','2021-10-20 20:28:48',10298773,NULL),(188,31108334,NULL,'if I had the money I would rent this place for life','2021-10-20 20:28:48',15080832,NULL),(189,35514238,NULL,'This semester is horrible','2021-10-20 20:28:48',13741618,NULL),(190,32124854,NULL,'if I buy this today got discount?','2021-10-20 20:28:48',17898363,NULL),(191,35961470,NULL,'Prof did you see our comment on our site about giving us an A?','2021-10-20 20:28:48',11434613,NULL),(192,37916660,NULL,'This house fake one','2021-10-20 20:28:48',17760745,NULL),(193,33867821,NULL,'This site is so user friendly ','2021-10-20 20:28:48',19523584,NULL),(194,37923560,NULL,'why would anybody wna stay in yishun seriously','2021-10-20 20:28:48',10061355,NULL),(195,35189504,NULL,'so pretty!!!!','2021-10-20 20:28:48',17954765,NULL),(196,31319389,NULL,'we put in too much work for this','2021-10-20 20:28:48',12670793,NULL),(197,39543860,NULL,'why would anybody wna stay in yishun seriously','2021-10-20 20:28:48',10442632,NULL),(198,34837838,NULL,'Prof please give us an A','2021-10-20 20:28:48',10272103,NULL),(199,35189504,NULL,'so pretty!!!!','2021-10-20 20:28:48',17579899,NULL),(200,38056979,NULL,'I am so rich that im probably gna buy this place and use it as a toilet','2021-10-20 20:28:48',17015167,NULL),(201,39543860,NULL,'if I had the money I would buy this place','2021-10-20 20:28:48',10906945,NULL),(202,31889975,NULL,'kawaii senpai','2021-10-20 20:28:48',18155880,NULL),(203,36368444,NULL,'she sells seashells by the seashore','2021-10-20 20:28:48',15942315,NULL),(204,32638720,NULL,'This site is an awesome site','2021-10-20 20:28:48',10229054,NULL),(205,30126032,NULL,'does this house come with ceilings?','2021-10-20 20:28:48',17579899,NULL),(206,35514238,NULL,'I heard that singapore rent prices are increasing….','2021-10-20 20:28:48',17558390,NULL),(207,30830403,NULL,'Prof have I ever told you that you look extremely charming?','2021-10-20 20:28:48',15427522,NULL),(208,37923560,NULL,'does this house come with ceilings?','2021-10-20 20:28:48',12147663,NULL),(209,31210914,NULL,'Prof prof say serious give us an A','2021-10-20 20:28:48',16602007,NULL),(210,34851916,NULL,'are there bathtubs in the toilet ','2021-10-20 20:28:48',19089700,NULL),(211,39543860,NULL,'are there bathtubs in the toilet ','2021-10-20 20:28:48',12356976,NULL),(212,34837838,NULL,'This site is so user friendly ','2021-10-20 20:28:48',11765348,NULL),(213,30561089,NULL,'This site is so user friendly ','2021-10-20 20:28:48',16647872,NULL),(214,35817984,NULL,'if I buy this today got discount?','2021-10-20 20:28:48',11030762,NULL),(215,35961470,NULL,'this house looks meh','2021-10-20 20:28:48',17105809,NULL),(216,33089493,NULL,'This house fake one','2021-10-20 20:28:48',12390312,NULL),(217,34846114,NULL,'omg so many rooms','2021-10-20 20:28:48',17898363,NULL),(218,35522629,NULL,'Omg I love how we can just save as many listings as we want','2021-10-20 20:28:48',15252813,NULL),(219,33089493,NULL,'we put in too much work for this','2021-10-20 20:28:48',13057534,NULL),(220,34846114,NULL,'Prof prof say serious give us an A','2021-10-20 20:28:48',15252813,NULL),(221,39234416,NULL,'Legend has it if you come across a rick roll video, you will have 999999 years of good luck','2021-10-20 20:28:48',17476836,NULL),(222,33780680,NULL,'Prof you are such an inspiration','2021-10-20 20:28:48',19593392,NULL),(223,34697751,NULL,'Prof prof say serious give us an A','2021-10-20 20:28:48',18179602,NULL),(224,33089493,NULL,'Prof please give us an A','2021-10-20 20:28:48',14569898,NULL),(225,30223120,NULL,'why is it made to look like this?','2021-10-20 20:28:48',17787690,NULL),(226,33780680,NULL,'Prof you are such an inspiration','2021-10-20 20:28:48',10272103,NULL),(227,39886110,NULL,'does this house come with ceilings?','2021-10-20 20:28:48',11765348,NULL),(228,35522629,NULL,'if I had the money I would buy this place','2021-10-20 20:28:48',11303937,NULL),(229,35514238,NULL,'this looks like a fantastic storeroom','2021-10-20 20:28:48',10919376,NULL),(230,35940235,NULL,'are there bathtubs in the kitchen?','2021-10-20 20:28:48',10519219,NULL),(231,33089493,NULL,'Omg I love how we can just save as many listings as we want','2021-10-20 20:28:48',13453096,NULL),(232,34263909,NULL,'does this house come with ceilings?','2021-10-20 20:28:48',16839324,NULL),(233,35514238,NULL,'Prof you look like the kind of person that likes you own a lot of houses','2021-10-20 20:28:48',18041956,NULL),(234,35514238,NULL,'if I buy this today got discount?','2021-10-20 20:28:48',10524653,NULL),(235,33576198,NULL,'This site is an awesome site','2021-10-20 20:28:48',16511418,NULL),(236,30223120,NULL,'this looks like a fantastic storeroom','2021-10-20 20:28:48',17252800,NULL),(237,39543860,NULL,'why would anybody wna stay in yishun seriously','2021-10-20 20:28:48',19523584,NULL),(238,35514238,NULL,'kawaii senpai','2021-10-20 20:28:48',10906945,NULL),(239,32010170,NULL,'Prof have I ever told you that you look extremely charming?','2021-10-20 20:28:48',19894327,NULL),(240,34837838,NULL,'are there bathtubs in the kitchen?','2021-10-20 20:28:48',19523584,NULL),(241,33780680,NULL,'if I had the money I would rent this place for life','2021-10-20 20:28:48',12479636,NULL),(242,30223120,NULL,'Prof you are such an inspiration','2021-10-20 20:28:48',13332608,NULL),(243,32010170,NULL,'kawaii senpai','2021-10-20 20:28:48',17015167,NULL),(244,31319389,NULL,'Prof please give us an A','2021-10-20 20:28:48',19089700,NULL),(245,34837838,NULL,'Prof did you see our comment on our site about giving us an A?','2021-10-20 20:28:48',10511400,NULL),(246,34697751,NULL,'This site is so user friendly ','2021-10-20 20:28:48',16839324,NULL),(247,31319389,NULL,'kawaii senpai','2021-10-20 20:28:48',11279557,NULL),(248,34837838,NULL,'Prof you are such an inspiration','2021-10-20 20:28:48',14407014,NULL),(249,34837838,NULL,'Omg I love how we can just save as many listings as we want','2021-10-20 20:28:48',18367350,NULL),(250,32752840,NULL,'yo this is a very nice home that i would like to buy','2021-10-29 20:16:24',10001975,NULL),(251,31599299,NULL,'im just worried about the noise pollution in jurong ','2021-10-29 20:20:06',10005644,NULL),(252,32527741,NULL,'nice swimming pool care to swim with me?','2021-10-29 20:21:53',10056556,NULL),(253,39556318,10,'erm me too but does the prof want to give an A?','2021-10-29 20:22:49',10061355,NULL),(254,35639334,11,'stop begging for grade that is unethical ','2021-10-29 20:23:34',10106048,NULL),(255,39543860,197,'nope nobody wants to stay there','2021-10-29 20:24:29',10144551,NULL),(256,35639334,NULL,'why are there trolls in comment seller please remove','2021-10-29 20:24:51',10144551,NULL),(257,39556318,NULL,'how much for 1 night?','2021-10-29 20:25:06',10144551,NULL),(258,32527741,252,'please avoid social confrontation during covid','2021-10-29 20:25:26',10144551,NULL),(259,31599299,251,'it smells great though near oil factories the smell is fresh','2021-10-29 20:25:54',10144551,NULL),(260,32752840,250,'u dont look like u got money i will buy it instead','2021-10-29 20:26:11',10144551,NULL),(261,32752840,NULL,'please avoid trolling in my comments ','2021-10-29 20:27:08',NULL,26103915),(262,32752840,250,'stop trolling ','2021-10-29 20:27:16',NULL,26103915),(263,39556318,NULL,'no 1 night stands ','2021-10-29 20:29:08',NULL,21539446),(264,39556318,NULL,'im selling this home seriously i need money ','2021-10-29 20:29:23',NULL,21539446),(265,31,NULL,'WOW! this is a rare apartment...... i think i can buy it joking i have school debt :D','2021-10-31 21:08:11',10016876,NULL),(266,34,NULL,'complain queen','2021-10-31 21:08:35',10016876,NULL),(267,36,NULL,'wow... this looks so premium.... must be able to have alot of money to afford... can cheaper????','2021-10-31 21:09:36',10016876,NULL),(268,31,265,'hey... u can do it man! just take a loan ','2021-10-31 21:10:31',10290823,NULL),(269,31,NULL,'i will buy this please contact me. i couldnt reach your number. ','2021-10-31 21:10:42',10290823,NULL),(270,36,NULL,'Yo this is amaaaaaaaazinggggggggggg','2021-10-31 21:11:18',10290823,NULL),(271,36,267,'yea man i agree','2021-10-31 21:11:23',10290823,NULL),(272,31,NULL,'hello world!\r\n','2021-10-31 22:14:27',19993408,NULL),(273,31,272,'prof give me A\r\n','2021-10-31 22:14:38',19993408,NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-12 18:28:03
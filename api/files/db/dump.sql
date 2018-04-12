CREATE DATABASE  IF NOT EXISTS `buddha_jones` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `buddha_jones`;
-- MySQL dump 10.13  Distrib 5.6.17, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: buddha_jones
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `redi_activity`
--

DROP TABLE IF EXISTS `redi_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_activity` (
  `id` int(22) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `description_required` smallint(1) DEFAULT NULL,
  `billable` smallint(1) DEFAULT '0',
  `status` smallint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_activity`
--

LOCK TABLES `redi_activity` WRITE;
/*!40000 ALTER TABLE `redi_activity` DISABLE KEYS */;
INSERT INTO `redi_activity` VALUES (1,'Assistant Editorial Work',NULL,NULL,0,1),(2,'Breakdown Movie',NULL,NULL,0,0),(3,'Digitize / Assemble Dailies',NULL,NULL,0,1),(4,'Downtime',NULL,NULL,0,1),(5,'Editorial',NULL,NULL,0,1),(6,'Finish Audio Mix',NULL,NULL,0,1),(7,'Finish Online',NULL,NULL,0,1),(8,'Finish Supervision',NULL,NULL,0,1),(9,'Finish / Prep for Finish',NULL,NULL,0,1),(10,'General Office',NULL,NULL,0,1),(11,'General Production',NULL,NULL,0,0),(12,'Design / Create Graphics',NULL,NULL,0,0),(13,'Graphic Exploration / Styleframes',NULL,NULL,0,1),(14,'Graphic Prep for Finish',NULL,NULL,0,1),(15,'Render Graphics',NULL,NULL,0,1),(16,'IT Work',NULL,NULL,0,1),(17,'Logging',NULL,NULL,0,1),(18,'Music Search',NULL,NULL,0,1),(19,'Narration Supervision',NULL,NULL,0,1),(20,'Produce',NULL,NULL,0,1),(21,'Screen Movie',21,NULL,0,1),(22,'Time Off',NULL,NULL,0,1),(23,'Waiting (specify in notes)',NULL,NULL,0,1),(24,'Work Orders',NULL,NULL,0,1),(25,'Writing',NULL,NULL,0,1),(30,'some label for activity',NULL,NULL,0,0),(31,'Fishing',NULL,NULL,0,1),(32,'Watching TV',NULL,NULL,0,1),(33,'Sample activity',NULL,NULL,0,1),(34,'Walking',2,1,0,1),(35,'Studying',3,1,0,1),(36,'test activity1996',NULL,NULL,0,1),(37,'test activity98',NULL,1,0,0),(38,'test activity9098',NULL,1,0,0);
/*!40000 ALTER TABLE `redi_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_activity_to_type`
--

DROP TABLE IF EXISTS `redi_activity_to_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_activity_to_type` (
  `activity_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  PRIMARY KEY (`activity_id`,`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_activity_to_type`
--

LOCK TABLES `redi_activity_to_type` WRITE;
/*!40000 ALTER TABLE `redi_activity_to_type` DISABLE KEYS */;
INSERT INTO `redi_activity_to_type` VALUES (1,1),(2,2),(3,3),(4,3),(5,2),(6,1),(7,3),(8,2),(9,1),(9,3),(10,2),(11,2),(12,1),(13,3),(14,2),(15,1),(16,2),(17,3),(18,1),(19,1),(20,1),(21,1),(22,1),(23,3),(24,2),(25,2),(30,3),(31,3),(32,3),(33,2),(34,2),(35,2),(37,2),(38,2);
/*!40000 ALTER TABLE `redi_activity_to_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_activity_type`
--

DROP TABLE IF EXISTS `redi_activity_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_activity_type` (
  `id` int(22) NOT NULL AUTO_INCREMENT,
  `activity_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_activity_type`
--

LOCK TABLES `redi_activity_type` WRITE;
/*!40000 ALTER TABLE `redi_activity_type` DISABLE KEYS */;
INSERT INTO `redi_activity_type` VALUES (1,'Billing'),(2,'Timesheet'),(3,'Internal');
/*!40000 ALTER TABLE `redi_activity_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_billing`
--

DROP TABLE IF EXISTS `redi_billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_billing` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `spot_id` int(11) DEFAULT NULL,
  `notes` text,
  `status_id` smallint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_billing`
--

LOCK TABLES `redi_billing` WRITE;
/*!40000 ALTER TABLE `redi_billing` DISABLE KEYS */;
INSERT INTO `redi_billing` VALUES (1,2,2,4,NULL,NULL,0,'2017-03-08 16:26:21'),(2,2,3,4,NULL,NULL,1,'2017-03-08 16:27:37'),(3,2,2,4,NULL,NULL,1,'2017-03-08 16:40:16'),(4,2,2,4,2,NULL,3,'2017-03-09 18:02:43'),(5,2,2,55,2,NULL,1,'2017-03-11 17:58:14'),(6,2,2,55,2,NULL,1,'2017-03-11 17:58:41'),(7,2,2,55,2,NULL,1,'2017-03-11 17:59:13'),(8,2,2,55,2,NULL,1,'2017-03-11 17:59:50'),(9,2,2,55,2,NULL,1,'2017-03-11 18:10:17'),(10,2,2,56,2,NULL,1,'2017-03-11 19:03:26'),(11,2,2,56,2,NULL,1,'2017-03-11 19:04:34'),(12,2,2,56,2,NULL,1,'2017-03-11 19:05:36'),(13,2,2,56,2,NULL,1,'2017-12-10 14:21:17'),(14,2,39,4,2,NULL,1,'2017-12-10 14:22:21');
/*!40000 ALTER TABLE `redi_billing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_billing_activity`
--

DROP TABLE IF EXISTS `redi_billing_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_billing_activity` (
  `bill_id` bigint(22) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `price` decimal(19,2) DEFAULT NULL,
  `hour` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`bill_id`,`activity_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_billing_activity`
--

LOCK TABLES `redi_billing_activity` WRITE;
/*!40000 ALTER TABLE `redi_billing_activity` DISABLE KEYS */;
INSERT INTO `redi_billing_activity` VALUES (3,9,90.80,7.00),(4,9,90.80,7.00),(8,2,90.80,7.00),(9,5,90.80,7.00),(10,4,90.80,7.30),(11,5,90.80,7.00),(12,9,90.80,7.00),(10,5,30.00,5.45),(13,9,90.80,7.00),(14,9,90.80,7.00);
/*!40000 ALTER TABLE `redi_billing_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_billing_approval`
--

DROP TABLE IF EXISTS `redi_billing_approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_billing_approval` (
  `bill_id` bigint(22) NOT NULL,
  `user_id` int(11) NOT NULL,
  `approved` smallint(1) DEFAULT '0',
  PRIMARY KEY (`bill_id`,`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_billing_approval`
--

LOCK TABLES `redi_billing_approval` WRITE;
/*!40000 ALTER TABLE `redi_billing_approval` DISABLE KEYS */;
INSERT INTO `redi_billing_approval` VALUES (4,1,1),(4,2,1),(4,6,1),(4,7,1),(4,4,1),(4,9,1),(8,3,0),(8,4,0),(8,6,0),(8,8,0),(9,3,0),(9,4,1),(9,6,0),(9,8,1),(14,2,0),(14,3,0);
/*!40000 ALTER TABLE `redi_billing_approval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_billing_estimate`
--

DROP TABLE IF EXISTS `redi_billing_estimate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_billing_estimate` (
  `bill_id` bigint(22) NOT NULL,
  `estimate_id` int(11) NOT NULL,
  PRIMARY KEY (`bill_id`,`estimate_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_billing_estimate`
--

LOCK TABLES `redi_billing_estimate` WRITE;
/*!40000 ALTER TABLE `redi_billing_estimate` DISABLE KEYS */;
INSERT INTO `redi_billing_estimate` VALUES (1,2),(1,8),(2,2),(2,8),(3,2),(3,8),(4,2),(4,8),(8,2),(8,8),(9,2),(9,8),(10,2),(10,8),(11,2),(11,8),(12,2),(12,8),(12,10),(12,12),(12,13),(13,8),(13,10),(13,13),(14,8),(14,10),(14,13);
/*!40000 ALTER TABLE `redi_billing_estimate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_billing_status`
--

DROP TABLE IF EXISTS `redi_billing_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_billing_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bill_status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_billing_status`
--

LOCK TABLES `redi_billing_status` WRITE;
/*!40000 ALTER TABLE `redi_billing_status` DISABLE KEYS */;
INSERT INTO `redi_billing_status` VALUES (1,'Draft'),(2,'Sent For Approval'),(3,'Final');
/*!40000 ALTER TABLE `redi_billing_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_campaign`
--

DROP TABLE IF EXISTS `redi_campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_campaign` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `campaign_name` varchar(22) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_campaign`
--

LOCK TABLES `redi_campaign` WRITE;
/*!40000 ALTER TABLE `redi_campaign` DISABLE KEYS */;
INSERT INTO `redi_campaign` VALUES (1,'Teaser',NULL),(2,'Trailer',NULL),(4,'(:30) TV',NULL),(6,'Home Entertainment',NULL),(7,'Digital',NULL),(68,'Why',NULL),(69,'Graphics',NULL),(70,'How',NULL),(72,'Test',NULL),(73,'Test1',NULL),(74,'Test2',NULL),(75,'test campaign1','test desc'),(76,'test campaign1','test desc'),(77,'test campaign1','test desc'),(78,'test campaign1','test desc'),(79,'test campaign1','test desc'),(80,'test campaign1','test desc'),(81,'test campaign1','test desc'),(82,'test campaign1','test desc'),(83,'test campaign1','test desc'),(84,'test campaign1','test desc'),(85,'test campaign1','test desc');
/*!40000 ALTER TABLE `redi_campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_comment`
--

DROP TABLE IF EXISTS `redi_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_comment` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `comment` text,
  `user_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `comment_read` smallint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_comment`
--

LOCK TABLES `redi_comment` WRITE;
/*!40000 ALTER TABLE `redi_comment` DISABLE KEYS */;
INSERT INTO `redi_comment` VALUES (1,'asd falkj flfd\r\nasldfjasf\r\nasdf asdf',1,1,1,0,'2016-12-13 00:03:36'),(2,'aasdfa\r\nlasdfj \r\n\r\nalsdfj as;ld fkjasdlfkj',2,3,2,0,'2016-12-13 00:03:58'),(3,'a	ddkddkdd',1,2,3,0,'2016-12-13 00:04:30'),(4,'las falsdjfas;ld f\r\nasflasdjf\r\nasf\r\n\r\nasd;flkasdjf',1,1,1,0,'2016-12-13 00:14:00'),(5,'test 123',1,11,2,0,'2016-12-12 16:41:10'),(6,'test 1',1,11,2,0,'2016-12-12 16:49:08'),(7,'test',1,1,1,0,'2016-12-13 15:52:27'),(8,'test again',1,1,1,0,'2016-12-13 15:53:59'),(9,'posting?',1,1,1,0,'2016-12-13 16:05:01'),(68,'Please review',1,29,2,0,'2017-01-17 06:40:18'),(19,'works fine?',1,1,1,0,'2016-12-13 16:27:39'),(20,'really?',1,1,1,0,'2016-12-13 16:27:48'),(21,'First comment ;)',1,1,2,0,'2016-12-13 16:30:01'),(22,'What about comment #2?',1,1,2,0,'2016-12-14 00:28:49'),(41,'can be updated?',1,1,2,0,'2016-12-16 08:51:04'),(40,'x',1,1,2,0,'2016-12-16 08:44:08'),(39,'saved?',1,1,2,0,'2016-12-16 08:43:29'),(38,'a',1,1,2,0,'2016-12-16 08:40:58'),(37,'hi',1,1,2,0,'2016-12-16 08:37:33'),(36,'hello',1,1,2,0,'2016-12-15 14:23:22'),(35,'aaa',1,1,2,0,'2016-12-15 12:23:34'),(34,'efasefae',1,1,2,0,'2016-12-15 12:12:58'),(33,'Hello',1,1,2,0,'2016-12-15 12:12:30'),(42,'great',1,1,2,0,'2016-12-16 08:53:43'),(44,'hi',1,24,2,0,'2016-12-20 15:44:32'),(43,'huh?af',1,1,2,0,'2016-12-16 08:54:00'),(45,'YY',1,15,2,0,'2017-01-03 08:29:02'),(46,'asf',1,24,2,0,'2017-01-05 13:05:55'),(47,'Hello',1,25,2,0,'2017-01-09 09:26:10'),(48,'hi',1,25,2,0,'2017-01-09 09:34:14'),(69,'0',1,11,2,NULL,'2017-04-06 14:25:51'),(70,'notes regarding..',48,25,3,0,'2017-07-05 11:01:10'),(71,'Here is note 2',48,25,3,0,'2017-07-06 18:50:41');
/*!40000 ALTER TABLE `redi_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_comment_type`
--

DROP TABLE IF EXISTS `redi_comment_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_comment_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_comment_type`
--

LOCK TABLES `redi_comment_type` WRITE;
/*!40000 ALTER TABLE `redi_comment_type` DISABLE KEYS */;
INSERT INTO `redi_comment_type` VALUES (1,'Campaign'),(2,'Estimate'),(3,'Project'),(4,'Spot'),(5,'Version'),(6,'Time Entry');
/*!40000 ALTER TABLE `redi_comment_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_customer`
--

DROP TABLE IF EXISTS `redi_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cardcode` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cardcode` (`cardcode`)
) ENGINE=MyISAM AUTO_INCREMENT=188 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer`
--

LOCK TABLES `redi_customer` WRITE;
/*!40000 ALTER TABLE `redi_customer` DISABLE KEYS */;
INSERT INTO `redi_customer` VALUES (1,NULL,'NBC Universal'),(2,NULL,'Warner Bros.'),(3,NULL,'HBO'),(4,NULL,'2K Games'),(5,NULL,'505 Games'),(6,NULL,'72andSunny'),(7,NULL,'A24'),(8,NULL,'ABC Entertainment'),(9,NULL,'Activision'),(10,NULL,'AIAS'),(11,NULL,'Alcon Entertainment\r\n'),(12,NULL,'Alliance Films\r\n'),(13,NULL,'Amazon\r\n'),(14,NULL,'Anchor Bay Ent\r\n'),(15,NULL,'Annapurna Pictures\r\n'),(16,NULL,'Arenas\r\n'),(17,NULL,'Articulus Ent.\r\n'),(18,NULL,'Atari, Inc\r\n'),(19,NULL,'Atlas Entertainment\r\n'),(20,NULL,'AwesomenessTV\r\n'),(21,NULL,'Backroom Int\'l\r\n'),(22,NULL,'Bandito Brothers\r\n'),(23,NULL,'Believe Media\r\n'),(24,NULL,'Bethesda\r\n'),(25,NULL,'Black Label Media\r\n'),(26,NULL,'Bleecker Street\r\n'),(27,NULL,'Blizzard Ent.\r\n'),(28,NULL,'Bloom Media\r\n'),(29,NULL,'Blumhouse Prod.\r\n'),(30,NULL,'Boies Schiller Films\r\n'),(31,NULL,'Boom! Studio\r\n'),(32,NULL,'Broad Green Pictures\r\n'),(33,NULL,'Buddha Jones\r\n'),(34,NULL,'Buena Vista\r\n'),(35,NULL,'Capcom Entertainment\r\n'),(36,NULL,'CBS Films\r\n'),(37,NULL,'CBS TV\r\n'),(38,NULL,'CD Projekt\r\n'),(39,NULL,'Cinemarket Film\r\n'),(40,NULL,'Cinemax\r\n'),(41,NULL,'City Interactive\r\n'),(42,NULL,'Columbia\r\n'),(43,NULL,'Creative Artists Age\r\n'),(44,NULL,'Creative Future\r\n'),(45,NULL,'Crystal Dynamics\r\n'),(46,NULL,'Current Entertainmen\r\n'),(47,NULL,'CW TV Network\r\n'),(48,NULL,'Dance On\r\n'),(49,NULL,'Daredevil Films\r\n'),(50,NULL,'Demarest Films\r\n'),(51,NULL,'Dimension\r\n'),(52,NULL,'Discovery\r\n'),(53,NULL,'Disney\r\n'),(54,NULL,'Disney Interactive\r\n'),(55,NULL,'Distant Horizon\r\n'),(56,NULL,'Dolby Laboratories\r\n'),(57,NULL,'Dreamworks Animation\r\n'),(58,NULL,'E! Entertainment\r\n'),(59,NULL,'EA Canada\r\n'),(60,NULL,'EDKO/ Irresistible\r\n'),(61,NULL,'Eidos Montreal\r\n'),(62,NULL,'Electronic Arts\r\n'),(63,NULL,'Electronic Arts Inc\r\n'),(64,NULL,'Element Films\r\n'),(65,NULL,'eOne Entertainment\r\n'),(66,NULL,'Epic Games\r\n'),(67,NULL,'Epix\r\n'),(68,NULL,'ESL Gaming\r\n'),(69,NULL,'Europacorp\r\n'),(70,NULL,'EXE Studio Global\r\n'),(71,NULL,'Factory Productions\r\n'),(72,NULL,'Fallen Angel Prod.\r\n'),(73,NULL,'Film Arcade\r\n'),(74,NULL,'Film District\r\n'),(75,NULL,'Film Nation Ent.\r\n'),(76,NULL,'Fishlabs\r\n'),(77,NULL,'Focus\r\n'),(78,NULL,'Fox\r\n'),(79,NULL,'Fox HE\r\n'),(80,NULL,'Fox Searchlight\r\n'),(81,NULL,'Fox Sports\r\n'),(82,NULL,'Fulfillment Fund\r\n'),(83,NULL,'Heat\r\n'),(84,NULL,'High Moon Studios\r\n'),(85,NULL,'History\r\n'),(86,NULL,'Home Box Office\r\n'),(87,NULL,'Hulu\r\n'),(88,NULL,'Icon Film\r\n'),(89,NULL,'IDW Entertainment\r\n'),(90,NULL,'IFC Films\r\n'),(91,NULL,'IGG\r\n'),(92,NULL,'IGP\r\n'),(93,NULL,'IMAX\r\n'),(94,NULL,'Independent\r\n'),(95,NULL,'Indomitable Ent.\r\n'),(96,NULL,'Informed Enterprises\r\n'),(97,NULL,'Koch Media\r\n'),(98,NULL,'Konami Digital Ent.\r\n'),(99,NULL,'KTM Film LLC\r\n'),(100,NULL,'Larger Than Life\r\n'),(101,NULL,'LD Entertainment\r\n'),(102,NULL,'Legendary\r\n'),(103,NULL,'Lifetime\r\n'),(104,NULL,'Lionsgate\r\n'),(105,NULL,'LM&O Advertising\r\n'),(106,NULL,'Lotus Entertainment\r\n'),(107,NULL,'M ss ng p eces\r\n'),(108,NULL,'Majesco Games\r\n'),(109,NULL,'Mandate\r\n'),(110,NULL,'Mark Burnett Prod.\r\n'),(111,NULL,'Matthew Cohen Create\r\n'),(112,NULL,'MGM/United Artists\r\n'),(113,NULL,'Microsoft Corp\r\n'),(114,NULL,'Millennium Films\r\n'),(115,NULL,'Miramax\r\n'),(116,NULL,'mOcean LA\r\n'),(117,NULL,'Mod Producciones\r\n'),(118,NULL,'Morgan Creek\r\n'),(119,NULL,'Motion Media Service\r\n'),(120,NULL,'MTV\r\n'),(121,NULL,'Mythology Enterterta\r\n'),(122,NULL,'Namco\r\n'),(123,NULL,'National Amusements\r\n'),(124,NULL,'National Geographic\r\n'),(125,NULL,'Naughty Dog\r\n'),(126,NULL,'Neo Art & Logic\r\n'),(127,NULL,'Netflix\r\n'),(128,NULL,'New Line\r\n'),(129,NULL,'New Regency Prod.\r\n'),(130,NULL,'Open Road Films\r\n'),(131,NULL,'Overture\r\n'),(132,NULL,'Pandemic\r\n'),(133,NULL,'Pandemic Marketing\r\n'),(134,NULL,'Paramount\r\n'),(135,NULL,'Picture Shack Ent\r\n'),(136,NULL,'Picturehouse\r\n'),(137,NULL,'Pivot TV Network\r\n'),(138,NULL,'Playstation\r\n'),(139,NULL,'Pocket Gems\r\n'),(140,NULL,'Privateer Holdings\r\n'),(141,NULL,'Providence St. Josep\r\n'),(142,NULL,'Pure F.P.S.\r\n'),(143,NULL,'Radical Ent\r\n'),(144,NULL,'Rainmaker Ent\r\n'),(145,NULL,'Reef Ent.\r\n'),(146,NULL,'Relativity Media\r\n'),(147,NULL,'Reload\r\n'),(148,NULL,'Respawn Ent\r\n'),(149,NULL,'Riders Production\r\n'),(150,NULL,'Roadshow Films\r\n'),(151,NULL,'Showtime\r\n'),(152,NULL,'Sierra Affinity\r\n'),(153,NULL,'Simon & Schuster\r\n'),(154,NULL,'Skinny Mic Prod.\r\n'),(155,NULL,'Skydance Interactive\r\n'),(156,NULL,'SModcast Pictures\r\n'),(157,NULL,'Soap Creative\r\n'),(158,NULL,'Sony Computer Ent Am\r\n'),(159,NULL,'Sony Pictures\r\n'),(160,NULL,'Sony/Screen Gems\r\n'),(161,NULL,'Special 83, LLC\r\n'),(162,NULL,'Stampede\r\n'),(163,NULL,'Starz Ent, LLC\r\n'),(164,NULL,'Studio Canal\r\n'),(165,NULL,'STX\r\n'),(166,NULL,'STX Entertainment\r\n'),(167,NULL,'Summit\r\n'),(168,NULL,'Summit/Lionsgate\r\n'),(169,NULL,'Supercell\r\n'),(170,NULL,'Survios\r\n'),(171,NULL,'TBS\r\n'),(172,NULL,'Tecmo Koei Am. Corp\r\n'),(173,NULL,'Tencent\r\n'),(174,NULL,'The Orchard\r\n'),(175,NULL,'The Rogue Initiative\r\n'),(176,NULL,'THQ Inc\r\n'),(177,NULL,'TNT\r\n'),(178,NULL,'Tooley Entertainment\r\n'),(179,NULL,'Tremolo Productions\r\n'),(180,NULL,'Turner Ent\r\n'),(181,NULL,'Ubisoft\r\n'),(182,NULL,'Universal\r\n'),(183,NULL,'UTV Ignition\r\n'),(184,NULL,'Water\'s End Prod.\r\n'),(185,NULL,'Wayfare Ent.\r\n'),(186,NULL,'Weinstein Company\r\n'),(187,NULL,'Xbox\r\n');
/*!40000 ALTER TABLE `redi_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_customer_contact`
--

DROP TABLE IF EXISTS `redi_customer_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_customer_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `cardcode` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile_phone` varchar(255) DEFAULT NULL,
  `office_phone` varchar(255) DEFAULT NULL,
  `postal_address` text,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `cardcode` (`cardcode`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_contact`
--

LOCK TABLES `redi_customer_contact` WRITE;
/*!40000 ALTER TABLE `redi_customer_contact` DISABLE KEYS */;
INSERT INTO `redi_customer_contact` VALUES (1,1,'C00334','Corey Schmidt','corey.schmidt@email.com','(226) 906-2721',NULL,'7855 Lakeshore Drive, Miami Beach, FL 33139'),(2,1,'C00583','Danielle Wright',NULL,NULL,NULL,NULL),(3,1,'C00341\r\n','Dave Dore\r\n',NULL,NULL,NULL,NULL),(4,1,'C00544\r\n','Dean McFlicker\r\n',NULL,NULL,NULL,NULL),(5,1,'C00455\r\n','Kendall Bowlin\r\n',NULL,NULL,NULL,NULL),(6,1,'C00595\r\n','Noah Gallico\r\n',NULL,NULL,NULL,NULL),(7,1,'C00395','Samantha Jukes-Adams',NULL,NULL,NULL,NULL),(8,1,'C00500\r\n','Scott Herbst\r\n',NULL,NULL,NULL,NULL),(9,2,'C00722','Bianka Cisneros','Bianka.Cisneros@warnerbros.com',NULL,NULL,NULL),(10,2,'C00294\r\n','Elisa Iovine\r\n','Elisa.Iovine@warnerbros.com\r\n',NULL,NULL,NULL),(11,2,'C00702\r\n','Ariadne Chucholowski\r\n',NULL,NULL,NULL,NULL),(12,2,'C00089\r\n','John Stanford\r\n',NULL,NULL,NULL,NULL),(13,2,'C00235\r\n','Brian Worsley\r\n',NULL,NULL,NULL,NULL),(14,2,'C00720\r\n','Brittany Beane\r\n',NULL,NULL,NULL,NULL),(15,2,'C00496\r\n',' Mitchell Davis\r\n',NULL,NULL,NULL,NULL),(16,2,'C00748\r\n','Amanda Miller\r\n',NULL,NULL,NULL,NULL),(17,2,'C00306\r\n','Christelle Egan\r\n',NULL,NULL,NULL,NULL),(18,2,'C00247\r\n','Conrad Ellingsworth\r\n',NULL,NULL,NULL,NULL),(19,2,'C00310\r\n','Ingrid Enson\r\n',NULL,NULL,NULL,NULL),(20,2,'C00321\r\n','Isabel Henderson\r\n',NULL,NULL,NULL,NULL),(21,2,'C00023\r\n','Jim Fredrick\r\n',NULL,NULL,NULL,NULL),(22,2,'C00366\r\n','John Codi\r\n',NULL,NULL,NULL,NULL),(23,2,'C00712\r\n','Katy Leigh\r\n',NULL,NULL,NULL,NULL),(24,2,'C00118\r\n','Keri Moore\r\n',NULL,NULL,NULL,NULL),(25,2,'C00683\r\n','Loren Schwartz\r\n',NULL,NULL,NULL,NULL),(26,2,'C00370\r\n','Louis DeMangus\r\n',NULL,NULL,NULL,NULL),(27,2,'C00022\r\n','Michelle Jackino\r\n',NULL,NULL,NULL,NULL),(28,2,'C00699\r\n','Nick Denogeon\r\n',NULL,NULL,NULL,NULL),(29,2,'C00386\r\n','Ryan Pickens\r\n',NULL,NULL,NULL,NULL),(30,2,'C00024\r\n','Samantha Bird\r\n',NULL,NULL,NULL,NULL),(31,2,'C00081\r\n','Stacy Osugi\r\n',NULL,NULL,NULL,NULL),(32,2,'C00632\r\n','Susan Brenner\r\n',NULL,NULL,NULL,NULL),(33,3,'C00581','Alyson Bradshaw\r\n','Alyson.Bradshaw@hbo.com\r\n',NULL,NULL,NULL),(34,3,'C00611\r\n','Daniel Zibulsky\r\n','Daniel.Zibulsky@hbo.com\r\n',NULL,NULL,NULL),(35,3,'C00606\r\n','Erin Dee\r\n','Erin.Dee@hbo.com\r\n',NULL,NULL,NULL),(36,3,'C00735\r\n','Andrew Thomas\r\n',NULL,NULL,NULL,NULL),(37,3,'C00615\r\n','Chris Denniston\r\n',NULL,NULL,NULL,NULL),(38,3,'C00588\r\n','Melora Soodalter\r\n',NULL,NULL,NULL,NULL),(39,3,'C00627\r\n','Natalia Echeverria\r\n',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `redi_customer_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_customer_contact_to_project_campaign`
--

DROP TABLE IF EXISTS `redi_customer_contact_to_project_campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_customer_contact_to_project_campaign` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `customer_contact_id` int(11) DEFAULT NULL,
  `project_to_campaign_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_contact_to_project_campaign`
--

LOCK TABLES `redi_customer_contact_to_project_campaign` WRITE;
/*!40000 ALTER TABLE `redi_customer_contact_to_project_campaign` DISABLE KEYS */;
INSERT INTO `redi_customer_contact_to_project_campaign` VALUES (1,2,1);
/*!40000 ALTER TABLE `redi_customer_contact_to_project_campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_customer_price`
--

DROP TABLE IF EXISTS `redi_customer_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_customer_price` (
  `customer_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `price` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`customer_id`,`activity_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_price`
--

LOCK TABLES `redi_customer_price` WRITE;
/*!40000 ALTER TABLE `redi_customer_price` DISABLE KEYS */;
INSERT INTO `redi_customer_price` VALUES (2,2,55.00),(2,9,NULL),(2,4,99.80);
/*!40000 ALTER TABLE `redi_customer_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_editor_to_spot`
--

DROP TABLE IF EXISTS `redi_editor_to_spot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_editor_to_spot` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `editor_id` int(11) DEFAULT NULL COMMENT 'editor user id',
  `spot_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_editor_to_spot`
--

LOCK TABLES `redi_editor_to_spot` WRITE;
/*!40000 ALTER TABLE `redi_editor_to_spot` DISABLE KEYS */;
INSERT INTO `redi_editor_to_spot` VALUES (1,1,9),(2,1,5),(3,3,5);
/*!40000 ALTER TABLE `redi_editor_to_spot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_employee_time_approver`
--

DROP TABLE IF EXISTS `redi_employee_time_approver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_employee_time_approver` (
  `emp_id` int(11) NOT NULL,
  `approver_employee_id` int(11) NOT NULL,
  PRIMARY KEY (`emp_id`,`approver_employee_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_employee_time_approver`
--

LOCK TABLES `redi_employee_time_approver` WRITE;
/*!40000 ALTER TABLE `redi_employee_time_approver` DISABLE KEYS */;
/*!40000 ALTER TABLE `redi_employee_time_approver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_estimate`
--

DROP TABLE IF EXISTS `redi_estimate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_estimate` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `spot_id` int(11) DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  `multiplier` int(11) DEFAULT NULL,
  `notes` text,
  `submitted_to` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `time_unit` char(1) DEFAULT 'H',
  `total_amount` decimal(19,2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate`
--

LOCK TABLES `redi_estimate` WRITE;
/*!40000 ALTER TABLE `redi_estimate` DISABLE KEYS */;
INSERT INTO `redi_estimate` VALUES (4,15,8,2,'some note',2,NULL,5,'H',NULL,'2016-12-17 20:42:01','2016-12-17 20:42:01'),(6,14,8,2,'some note',9,NULL,5,'H',1957.79,'2016-12-17 20:42:01','2016-12-17 20:42:01'),(7,13,NULL,2,'',99,NULL,5,'H',0.00,'2016-12-17 20:42:01','2016-12-17 20:42:01'),(8,12,1,2,'',99,NULL,5,'H',18.00,'2016-12-17 20:42:01','2016-12-17 20:42:01'),(9,11,1,2,'',99,NULL,4,'H',343.00,'2016-12-17 20:42:01','2016-12-17 20:42:01'),(10,10,1,2,'',99,NULL,4,'H',191.56,'2016-12-17 20:42:01','2016-12-17 20:42:01'),(13,7,NULL,2,'afdsf',99,NULL,4,'H',933.00,'2016-12-17 20:42:01','2016-12-17 20:42:01'),(18,16,NULL,2,'',99,NULL,3,'H',184.72,'2016-12-17 20:42:01','2016-12-17 20:42:01'),(19,22,NULL,2,'',99,NULL,3,'H',1031.20,'2016-12-18 00:51:23','2016-12-18 00:51:23'),(20,23,NULL,1,'note goes here',99,NULL,3,'H',363.38,'2016-12-20 15:12:30','2016-12-20 15:12:30'),(21,25,NULL,2,'',99,NULL,3,'H',35.51,'2016-12-20 15:21:05','2016-12-20 15:21:05'),(22,29,NULL,2,'',99,NULL,3,'H',35.51,'2016-12-20 15:23:00','2016-12-20 15:23:00'),(23,3,NULL,200,'',99,NULL,3,'H',56.82,'2016-12-20 15:23:53','2017-07-24 03:43:59'),(24,1,1,2,'',99,NULL,3,'H',307.80,'2016-12-20 15:44:07','2016-12-20 15:44:07'),(25,32,NULL,1,'',99,NULL,3,'H',90.00,'2016-12-20 15:46:42','2016-12-20 15:46:42'),(26,1,NULL,2,'my notes',99,NULL,1,'H',360.00,'2017-01-03 09:25:37','2017-01-03 09:25:37'),(27,3,NULL,2,'',99,NULL,1,'H',270.00,'2017-01-03 09:27:07','2017-01-03 09:27:07'),(28,4,NULL,200,'',99,NULL,1,'H',348.30,'2017-01-03 10:43:04','2017-07-20 02:15:05'),(29,2,0,200,'test my food',99,NULL,1,'H',322.88,'2017-01-05 14:53:18','2017-07-17 08:19:10'),(30,1,2,2,'some note',9,NULL,3,'H',0.00,'2017-05-24 20:11:40','2017-05-25 16:18:37'),(31,1,8,2,'some note',9,NULL,2,'H',3915.58,'2017-05-25 16:18:14',NULL),(32,1,8,2,'some note',9,NULL,2,'D',3915.58,'2017-05-30 18:43:49',NULL),(33,1,8,2,'some note',9,NULL,2,'D',3915.58,'2017-05-30 18:44:16',NULL),(34,1,8,2,'some note',9,NULL,2,'D',3915.58,'2017-05-30 18:44:54',NULL),(35,1,8,2,'some note',9,NULL,2,'D',3915.58,'2017-05-30 18:54:38',NULL),(36,1,8,2,'some note',9,NULL,2,'D',3915.58,'2017-05-30 18:55:51',NULL),(37,1,8,2,'some note',9,NULL,2,'D',3915.58,'2017-05-30 18:56:26',NULL),(38,1,8,2,'some note',9,NULL,2,'D',3915.58,'2017-05-30 19:13:10',NULL),(39,1,8,2,'some note',9,NULL,2,'D',3915.58,'2017-05-30 19:13:40',NULL),(40,1,8,2,'some note',9,NULL,2,'D',3915.58,'2017-05-30 19:18:28','2017-05-30 20:11:22'),(41,1,8,2,'some note',9,NULL,2,'D',3915.58,'2017-05-31 16:20:36',NULL),(42,1,8,2,'some note',9,NULL,2,'D',4673.18,'2017-05-31 16:27:34',NULL),(43,1,8,2,'some note',9,NULL,2,'D',4673.18,'2017-05-31 16:44:32',NULL),(44,1,8,2,'some note',9,NULL,2,'D',NULL,'2017-05-31 16:48:02',NULL),(45,1,8,2,'some note',9,NULL,2,'D',NULL,'2017-05-31 16:50:41',NULL),(46,1,8,2,'some note',9,NULL,2,'D',NULL,'2017-05-31 16:57:56',NULL),(47,1,8,2,'some note',9,NULL,2,'D',NULL,'2017-05-31 16:59:11',NULL),(48,1,8,2,'some note',9,NULL,2,'D',NULL,'2017-05-31 16:59:28',NULL),(49,1,8,2,'some note',9,NULL,2,'H',NULL,'2017-05-31 17:00:37',NULL),(50,1,8,2,'some note',9,NULL,2,'H',NULL,'2017-05-31 17:07:56',NULL),(51,1,8,2,'some note',9,NULL,2,'H',NULL,'2017-05-31 17:13:47',NULL),(52,1,8,2,'some note',9,NULL,2,'D',NULL,'2017-05-31 17:14:00',NULL),(53,1,8,2,'some note',9,NULL,2,'D',NULL,'2017-05-31 17:27:46',NULL),(54,1,8,2,'some note',9,NULL,2,'H',NULL,'2017-05-31 17:28:03',NULL),(55,1,8,2,'some note',9,NULL,2,'H',NULL,'2017-05-31 17:28:25',NULL),(56,1,8,2,'some note',9,NULL,2,'H',NULL,'2017-05-31 17:28:42',NULL),(57,1,8,2,'some note',9,NULL,2,'D',NULL,'2017-05-31 17:28:58',NULL),(58,1,8,2,'some note',9,NULL,2,'D',NULL,'2017-05-31 17:47:03',NULL),(59,1,8,2,'some note',9,NULL,2,'H',NULL,'2017-05-31 17:47:25',NULL),(60,1,8,2,'some note',9,NULL,2,'H',NULL,'2017-05-31 17:49:00',NULL),(61,1,8,1,'some note',9,NULL,2,'H',NULL,'2017-05-31 17:49:27',NULL),(62,1,8,1,'some note',9,NULL,2,'H',NULL,'2017-05-31 18:01:55',NULL),(63,1,8,1,'some note',9,NULL,2,'D',NULL,'2017-05-31 18:02:21',NULL),(64,1,8,1,'some note',9,NULL,2,'D',NULL,'2017-05-31 18:03:14',NULL),(65,1,8,1,'some note',9,NULL,2,'D',NULL,'2017-05-31 18:03:30',NULL),(66,1,8,1,'some note',9,NULL,2,'D',NULL,'2017-05-31 18:04:33',NULL),(67,1,8,1,'some note',9,NULL,2,'D',NULL,'2017-05-31 18:06:16',NULL),(68,1,8,1,'some note',9,NULL,2,'D',NULL,'2017-05-31 18:06:30',NULL),(69,1,8,1,'some note',9,NULL,2,'D',738.52,'2017-05-31 18:09:22',NULL),(70,1,8,1,'some note',9,NULL,2,'D',36425.52,'2017-05-31 18:31:34',NULL),(71,1,8,1,'some note',9,NULL,2,'D',36425.52,'2017-06-01 17:20:10',NULL);
/*!40000 ALTER TABLE `redi_estimate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_estimate_history`
--

DROP TABLE IF EXISTS `redi_estimate_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_estimate_history` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `estimate_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate_history`
--

LOCK TABLES `redi_estimate_history` WRITE;
/*!40000 ALTER TABLE `redi_estimate_history` DISABLE KEYS */;
INSERT INTO `redi_estimate_history` VALUES (86,30,1,'created estimate','2017-05-24 20:11:40'),(87,30,1,'updated estimate status','2017-05-24 20:12:43'),(88,30,1,'updated estimate status','2017-05-24 20:23:22'),(89,31,1,'created estimate','2017-05-25 16:18:14'),(90,32,1,'created estimate','2017-05-30 18:43:49'),(91,33,1,'created estimate','2017-05-30 18:44:16'),(92,34,1,'created estimate','2017-05-30 18:44:54'),(93,35,1,'created estimate','2017-05-30 18:54:38'),(94,36,1,'created estimate','2017-05-30 18:55:51'),(95,37,1,'created estimate','2017-05-30 18:56:26'),(96,38,1,'created estimate','2017-05-30 19:13:10'),(97,39,1,'created estimate','2017-05-30 19:13:40'),(98,40,1,'created estimate','2017-05-30 19:18:28'),(99,41,1,'created estimate','2017-05-31 16:20:36'),(100,42,1,'created estimate','2017-05-31 16:27:34'),(101,43,1,'created estimate','2017-05-31 16:44:32'),(102,44,1,'created estimate','2017-05-31 16:48:02'),(103,45,1,'created estimate','2017-05-31 16:50:41'),(104,46,1,'created estimate','2017-05-31 16:57:56'),(105,47,1,'created estimate','2017-05-31 16:59:11'),(106,48,1,'created estimate','2017-05-31 16:59:28'),(107,49,1,'created estimate','2017-05-31 17:00:37'),(108,50,1,'created estimate','2017-05-31 17:07:56'),(109,51,1,'created estimate','2017-05-31 17:13:47'),(110,52,1,'created estimate','2017-05-31 17:14:00'),(111,53,1,'created estimate','2017-05-31 17:27:46'),(112,54,1,'created estimate','2017-05-31 17:28:03'),(113,55,1,'created estimate','2017-05-31 17:28:25'),(114,56,1,'created estimate','2017-05-31 17:28:43'),(115,57,1,'created estimate','2017-05-31 17:28:58'),(116,58,1,'created estimate','2017-05-31 17:47:03'),(117,59,1,'created estimate','2017-05-31 17:47:25'),(118,60,1,'created estimate','2017-05-31 17:49:00'),(119,61,1,'created estimate','2017-05-31 17:49:27'),(120,62,1,'created estimate','2017-05-31 18:01:55'),(121,63,1,'created estimate','2017-05-31 18:02:21'),(122,64,1,'created estimate','2017-05-31 18:03:14'),(123,65,1,'created estimate','2017-05-31 18:03:30'),(124,66,1,'created estimate','2017-05-31 18:04:33'),(125,67,1,'created estimate','2017-05-31 18:06:16'),(126,68,1,'created estimate','2017-05-31 18:06:30'),(127,69,1,'created estimate','2017-05-31 18:09:22'),(128,70,1,'created estimate','2017-05-31 18:31:34'),(129,71,1,'created estimate','2017-06-01 17:20:11'),(130,23,48,'updated estimate status','2017-07-24 03:43:59');
/*!40000 ALTER TABLE `redi_estimate_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_estimate_outside_cost_type`
--

DROP TABLE IF EXISTS `redi_estimate_outside_cost_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_estimate_outside_cost_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate_outside_cost_type`
--

LOCK TABLES `redi_estimate_outside_cost_type` WRITE;
/*!40000 ALTER TABLE `redi_estimate_outside_cost_type` DISABLE KEYS */;
INSERT INTO `redi_estimate_outside_cost_type` VALUES (1,'Part of Budget'),(2,'Bill Back to Client');
/*!40000 ALTER TABLE `redi_estimate_outside_cost_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_estimate_temporary_staff`
--

DROP TABLE IF EXISTS `redi_estimate_temporary_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_estimate_temporary_staff` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `estimate_id` bigint(22) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `estimated_time` decimal(19,2) DEFAULT NULL,
  `hour` decimal(19,2) DEFAULT NULL,
  `rate` decimal(19,2) DEFAULT NULL,
  `total_amount` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate_temporary_staff`
--

LOCK TABLES `redi_estimate_temporary_staff` WRITE;
/*!40000 ALTER TABLE `redi_estimate_temporary_staff` DISABLE KEYS */;
INSERT INTO `redi_estimate_temporary_staff` VALUES (3,2,'3D Graphics Artist',0.00,NULL,0.00,NULL),(4,3,'a asdfsd',0.00,NULL,0.00,NULL),(5,2,'a eeee',0.00,NULL,0.00,NULL),(6,3,'3D Graphics Artist',0.00,NULL,0.00,NULL),(7,NULL,'dets',0.00,NULL,0.00,NULL),(9,32,'name',2.00,NULL,11.00,NULL),(10,32,'name',2.00,NULL,41.00,NULL),(11,32,'name',15.00,NULL,12.00,NULL),(12,33,'3D Graphics Artist',2.00,NULL,11.00,NULL),(13,33,'Animator',2.00,NULL,41.00,NULL),(14,33,'Sound',15.00,NULL,12.00,NULL),(15,34,'3D Graphics Artist',2.00,NULL,11.00,NULL),(16,34,'Animator',2.00,NULL,41.00,NULL),(17,34,'Sound',15.00,NULL,12.00,NULL),(18,35,'3D Graphics Artist',2.00,NULL,11.00,NULL),(19,35,'Animator',2.00,NULL,41.00,NULL),(20,35,'Sound',15.00,NULL,12.00,NULL),(21,36,'3D Graphics Artist',2.00,NULL,11.00,NULL),(22,36,'Animator',2.00,NULL,41.00,NULL),(23,36,'Sound',15.00,NULL,12.00,NULL),(24,37,'3D Graphics Artist',2.00,NULL,11.00,NULL),(25,37,'Animator',2.00,NULL,41.00,NULL),(26,37,'Sound',15.00,NULL,12.00,NULL),(27,38,'3D Graphics Artist',2.00,NULL,11.00,NULL),(28,38,'Animator',2.00,NULL,41.00,NULL),(29,38,'Sound',15.00,NULL,12.00,NULL),(30,39,'3D Graphics Artist',2.00,NULL,11.00,NULL),(31,39,'Animator',2.00,NULL,41.00,NULL),(32,39,'Sound',15.00,NULL,12.00,NULL),(36,40,'3D Graphics Artist',20.00,NULL,11.00,NULL),(37,40,'Animator',2.00,NULL,41.00,NULL),(38,40,'Sound',15.00,NULL,12.00,NULL),(39,41,'3D Graphics Artist',2.00,NULL,11.00,NULL),(40,41,'Animator',2.00,NULL,41.00,NULL),(41,41,'Sound',15.00,NULL,12.00,NULL),(42,42,'3D Graphics Artist',2.00,NULL,11.00,NULL),(43,42,'Animator',2.00,NULL,41.00,NULL),(44,42,'Sound',15.00,NULL,12.00,NULL),(45,43,'3D Graphics Artist',2.00,NULL,11.00,NULL),(46,43,'Animator',2.00,NULL,41.00,NULL),(47,43,'Sound',15.00,NULL,12.00,NULL),(48,44,'3D Graphics Artist',2.00,NULL,11.00,NULL),(49,44,'Animator',2.00,NULL,41.00,NULL),(50,44,'Sound',15.00,NULL,12.00,NULL),(51,45,'3D Graphics Artist',2.00,NULL,11.00,NULL),(52,45,'Animator',2.00,NULL,41.00,NULL),(53,45,'Sound',15.00,NULL,12.00,NULL),(54,46,'3D Graphics Artist',2.00,NULL,11.00,NULL),(55,46,'Animator',2.00,NULL,41.00,NULL),(56,46,'Sound',15.00,NULL,12.00,NULL),(57,47,'3D Graphics Artist',2.00,NULL,11.00,NULL),(58,47,'Animator',2.00,NULL,41.00,NULL),(59,47,'Sound',15.00,NULL,12.00,NULL),(60,48,'3D Graphics Artist',2.00,NULL,11.00,NULL),(61,48,'Animator',2.00,NULL,41.00,NULL),(62,48,'Sound',15.00,NULL,12.00,NULL),(63,49,'3D Graphics Artist',2.00,NULL,11.00,NULL),(64,49,'Animator',2.00,NULL,41.00,NULL),(65,49,'Sound',15.00,NULL,12.00,NULL),(66,50,'3D Graphics Artist',2.00,NULL,11.00,NULL),(67,50,'Animator',2.00,NULL,41.00,NULL),(68,50,'Sound',15.00,NULL,12.00,NULL),(69,51,'3D Graphics Artist',2.00,NULL,11.00,NULL),(70,51,'Animator',2.00,NULL,41.00,NULL),(71,51,'Sound',15.00,NULL,12.00,NULL),(72,52,'3D Graphics Artist',2.00,NULL,11.00,NULL),(73,52,'Animator',2.00,NULL,41.00,NULL),(74,52,'Sound',15.00,NULL,12.00,NULL),(75,53,'3D Graphics Artist',2.00,NULL,11.00,NULL),(76,53,'Animator',2.00,NULL,41.00,NULL),(77,53,'Sound',15.00,NULL,12.00,NULL),(78,54,'3D Graphics Artist',2.00,NULL,11.00,NULL),(79,54,'Animator',2.00,NULL,41.00,NULL),(80,54,'Sound',15.00,NULL,12.00,NULL),(81,55,'3D Graphics Artist',2.00,NULL,11.00,NULL),(82,55,'Animator',2.00,NULL,41.00,NULL),(83,55,'Sound',15.00,NULL,12.00,NULL),(84,56,'3D Graphics Artist',2.00,NULL,11.00,NULL),(85,56,'Animator',2.00,NULL,41.00,NULL),(86,56,'Sound',15.00,NULL,12.00,NULL),(87,57,'3D Graphics Artist',2.00,NULL,11.00,NULL),(88,57,'Animator',2.00,NULL,41.00,NULL),(89,57,'Sound',15.00,NULL,12.00,NULL),(90,58,'3D Graphics Artist',2.00,NULL,11.00,NULL),(91,58,'Animator',2.00,NULL,41.00,NULL),(92,58,'Sound',15.00,NULL,12.00,NULL),(93,59,'3D Graphics Artist',2.00,NULL,11.00,NULL),(94,59,'Animator',2.00,NULL,41.00,NULL),(95,59,'Sound',15.00,NULL,12.00,NULL),(96,60,'3D Graphics Artist',2.00,NULL,11.00,NULL),(97,60,'Animator',2.00,NULL,41.00,NULL),(98,60,'Sound',15.00,NULL,12.00,NULL),(99,61,'3D Graphics Artist',2.00,NULL,11.00,NULL),(100,61,'Animator',2.00,NULL,41.00,NULL),(101,61,'Sound',15.00,NULL,12.00,NULL),(102,62,'3D Graphics Artist',2.00,2.00,11.00,NULL),(103,62,'Animator',2.00,2.00,41.00,NULL),(104,62,'Sound',15.00,15.00,12.00,NULL),(105,63,'3D Graphics Artist',2.00,NULL,11.00,NULL),(106,63,'Animator',2.00,NULL,41.00,NULL),(107,63,'Sound',15.00,NULL,12.00,NULL),(108,64,'3D Graphics Artist',2.00,NULL,11.00,NULL),(109,64,'Animator',2.00,NULL,41.00,NULL),(110,64,'Sound',15.00,NULL,12.00,NULL),(111,65,'3D Graphics Artist',2.00,NULL,11.00,NULL),(112,65,'Animator',2.00,NULL,41.00,NULL),(113,65,'Sound',15.00,NULL,12.00,NULL),(114,66,'3D Graphics Artist',2.00,NULL,11.00,NULL),(115,66,'Animator',2.00,NULL,41.00,NULL),(116,66,'Sound',15.00,NULL,12.00,NULL),(117,67,'3D Graphics Artist',2.00,NULL,11.00,NULL),(118,67,'Animator',2.00,NULL,41.00,NULL),(119,67,'Sound',15.00,NULL,12.00,NULL),(120,68,'3D Graphics Artist',2.00,16.00,11.00,NULL),(121,68,'Animator',2.00,16.00,41.00,NULL),(122,68,'Sound',15.00,120.00,12.00,NULL),(123,69,'3D Graphics Artist',2.00,16.00,11.00,176.00),(124,69,'Animator',2.00,16.00,41.00,6.00),(125,69,'Sound',15.00,120.00,12.00,14.00),(126,70,'3D Graphics Artist',2.00,16.00,11.00,176.00),(127,70,'Animator',2.00,16.00,41.00,656.00),(128,70,'Sound',15.00,120.00,12.00,1440.00),(129,71,'3D Graphics Artist',2.00,16.00,11.00,176.00),(130,71,'Animator',2.00,16.00,41.00,656.00),(131,71,'Sound',15.00,120.00,12.00,1440.00),(132,28,'Editor1',3.00,3.00,40.00,120.00),(133,28,'Editor2',4.00,4.00,35.00,140.00);
/*!40000 ALTER TABLE `redi_estimate_temporary_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_estimate_to_outside_cost`
--

DROP TABLE IF EXISTS `redi_estimate_to_outside_cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_estimate_to_outside_cost` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `estimate_id` bigint(22) DEFAULT NULL,
  `outside_cost_id` int(11) DEFAULT NULL,
  `cost` decimal(19,2) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate_to_outside_cost`
--

LOCK TABLES `redi_estimate_to_outside_cost` WRITE;
/*!40000 ALTER TABLE `redi_estimate_to_outside_cost` DISABLE KEYS */;
INSERT INTO `redi_estimate_to_outside_cost` VALUES (1,38,1,99.80,1),(2,38,3,5.60,2),(3,39,1,99.80,1),(4,39,3,5.60,2),(7,40,2,99.80,1),(8,40,3,15.60,2),(9,41,1,99.80,1),(10,41,3,5.60,2),(11,42,1,99.80,1),(12,42,3,5.60,2),(13,43,1,99.80,1),(14,43,3,5.60,2),(15,44,1,99.80,1),(16,44,3,5.60,2),(17,45,1,99.80,1),(18,45,3,5.60,2),(19,46,1,99.80,1),(20,46,3,5.60,2),(21,47,1,99.80,1),(22,47,3,5.60,2),(23,48,1,99.80,1),(24,48,3,5.60,2),(25,49,1,99.80,1),(26,49,3,5.60,2),(27,50,1,99.80,1),(28,50,3,5.60,2),(29,51,1,99.80,1),(30,51,3,5.60,2),(31,52,1,99.80,1),(32,52,3,5.60,2),(33,53,1,99.80,1),(34,53,3,5.60,2),(35,54,1,99.80,1),(36,54,3,5.60,2),(37,55,1,99.80,1),(38,55,3,5.60,2),(39,56,1,99.80,1),(40,56,3,5.60,2),(41,57,1,99.80,1),(42,57,3,5.60,2),(43,58,1,99.80,1),(44,58,3,5.60,2),(45,59,1,99.80,1),(46,59,3,5.60,2),(47,60,1,99.80,1),(48,60,3,5.60,2),(49,61,1,99.80,1),(50,61,3,5.60,2),(51,62,1,99.80,1),(52,62,3,5.60,2),(53,63,1,99.80,1),(54,63,3,5.60,2),(55,64,1,99.80,1),(56,64,3,5.60,2),(57,65,1,99.80,1),(58,65,3,5.60,2),(59,66,1,99.80,1),(60,66,3,5.60,2),(61,67,1,99.80,1),(62,67,3,5.60,2),(63,68,1,99.80,1),(64,68,3,5.60,2),(65,69,1,99.80,1),(66,69,3,5.60,2),(67,70,1,99.80,1),(68,70,3,5.60,2),(69,71,1,99.80,1),(70,71,3,5.60,2),(71,28,2,20.00,2);
/*!40000 ALTER TABLE `redi_estimate_to_outside_cost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_estimate_to_staff`
--

DROP TABLE IF EXISTS `redi_estimate_to_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_estimate_to_staff` (
  `estimate_id` bigint(22) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `hourly_rate` decimal(19,2) DEFAULT NULL,
  `estimated_regular` decimal(19,2) DEFAULT NULL,
  `estimated_overtime` decimal(19,2) DEFAULT NULL,
  `estimated_doubletime` decimal(19,2) DEFAULT NULL,
  `estimated_regular_hour` decimal(19,2) DEFAULT NULL,
  `estimated_overtime_hour` decimal(19,2) DEFAULT NULL,
  `estimated_doubletime_hour` decimal(19,2) DEFAULT NULL,
  `total_amount` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`estimate_id`,`staff_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate_to_staff`
--

LOCK TABLES `redi_estimate_to_staff` WRITE;
/*!40000 ALTER TABLE `redi_estimate_to_staff` DISABLE KEYS */;
INSERT INTO `redi_estimate_to_staff` VALUES (28,4,22.00,1.00,0.00,0.00,1.00,0.00,0.00,22.00);
/*!40000 ALTER TABLE `redi_estimate_to_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_estimate_to_worker`
--

DROP TABLE IF EXISTS `redi_estimate_to_worker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_estimate_to_worker` (
  `estimate_id` bigint(22) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `hourly_rate` decimal(19,2) DEFAULT NULL,
  `estimated_regular` decimal(19,2) DEFAULT NULL,
  `estimated_overtime` decimal(19,2) DEFAULT NULL,
  `estimated_doubletime` decimal(19,2) DEFAULT NULL,
  `estimated_regular_hour` decimal(19,2) DEFAULT NULL,
  `estimated_overtime_hour` decimal(19,2) DEFAULT NULL,
  `estimated_doubletime_hour` decimal(19,2) DEFAULT NULL,
  `total_amount` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`estimate_id`,`worker_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate_to_worker`
--

LOCK TABLES `redi_estimate_to_worker` WRITE;
/*!40000 ALTER TABLE `redi_estimate_to_worker` DISABLE KEYS */;
INSERT INTO `redi_estimate_to_worker` VALUES (1,1,0.00,10.00,1.00,1.00,10.00,3.00,0.00,0.00),(1,2,0.00,NULL,NULL,NULL,100.00,0.00,18.00,0.00),(2,1,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,2,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,4,9.47,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,5,34.20,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,1,0.00,NULL,NULL,NULL,NULL,NULL,NULL,100.00),(3,2,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,4,9.47,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,5,34.20,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,1,0.00,2.00,1.00,NULL,17.35,3.00,NULL,0.00),(4,2,0.00,6.00,NULL,3.00,27.45,9.00,NULL,0.00),(4,4,9.47,10.00,NULL,NULL,37.00,0.00,NULL,350.39),(4,5,34.20,NULL,NULL,NULL,47.00,0.00,NULL,1607.40),(5,1,0.00,NULL,NULL,NULL,17.35,3.00,NULL,0.00),(5,2,0.00,NULL,NULL,NULL,27.45,9.00,NULL,0.00),(5,4,9.47,NULL,NULL,NULL,37.00,0.00,NULL,350.39),(5,5,34.20,NULL,NULL,NULL,47.00,0.00,NULL,1607.40),(6,1,0.00,NULL,NULL,NULL,17.35,3.00,NULL,0.00),(6,2,0.00,NULL,NULL,NULL,27.45,9.00,NULL,0.00),(6,4,9.47,NULL,NULL,NULL,37.00,0.00,NULL,350.39),(6,5,34.20,NULL,NULL,NULL,47.00,0.00,NULL,1607.40),(7,15,44.13,NULL,NULL,NULL,0.00,0.00,NULL,0.00),(8,39,18.00,NULL,NULL,NULL,1.00,0.00,NULL,18.00),(9,39,18.00,NULL,NULL,NULL,1.00,0.00,NULL,18.00),(9,45,41.00,NULL,NULL,NULL,5.00,0.00,NULL,205.00),(9,46,40.00,NULL,NULL,NULL,0.00,3.00,NULL,120.00),(10,13,47.89,NULL,NULL,NULL,0.00,4.00,NULL,191.56),(11,14,34.20,NULL,NULL,NULL,2.00,0.00,NULL,68.40),(11,44,37.00,NULL,NULL,NULL,0.00,4.00,NULL,148.00),(12,46,40.00,NULL,NULL,NULL,0.00,5.00,NULL,200.00),(13,46,40.00,NULL,NULL,NULL,0.00,5.00,0.00,600.00),(13,44,37.00,NULL,NULL,NULL,0.00,3.00,0.00,333.00),(14,46,40.00,NULL,NULL,NULL,10.00,0.00,0.00,800.00),(15,8,34.81,NULL,NULL,NULL,0.00,6.00,0.00,469.94),(15,5,34.20,NULL,NULL,NULL,6.00,0.00,0.00,307.80),(16,46,40.00,NULL,NULL,NULL,0.00,0.00,NULL,0.00),(17,44,37.00,NULL,NULL,NULL,0.00,5.00,0.00,555.00),(18,21,18.42,NULL,NULL,NULL,0.00,3.00,0.00,165.78),(19,11,51.56,NULL,NULL,NULL,10.00,0.00,0.00,1031.20),(20,6,34.20,NULL,NULL,NULL,7.00,1.00,NULL,363.38),(21,4,9.47,2.00,3.00,2.00,1.00,1.00,NULL,35.51),(22,4,9.47,10.00,4.00,1.00,1.00,1.00,NULL,35.51),(23,4,9.47,44.00,1.00,0.00,44.00,1.00,0.00,430.89),(24,6,34.20,NULL,NULL,NULL,1.00,2.00,1.00,307.80),(25,42,16.00,NULL,NULL,NULL,1.00,1.00,1.00,90.00),(26,46,40.00,NULL,NULL,NULL,1.00,1.00,1.00,360.00),(27,46,40.00,NULL,NULL,NULL,1.00,1.00,1.00,270.00),(28,18,38.70,1.00,0.00,0.00,1.00,0.00,0.00,38.70),(29,45,41.00,NULL,NULL,NULL,1.00,1.00,1.00,322.88),(18,4,9.47,NULL,NULL,NULL,1.00,0.00,0.00,18.94),(31,5,34.20,NULL,NULL,NULL,47.00,0.00,NULL,3214.80),(31,4,9.47,NULL,NULL,NULL,37.00,0.00,NULL,700.78),(31,2,0.00,NULL,NULL,NULL,27.45,9.00,NULL,0.00),(31,1,0.00,NULL,NULL,NULL,17.35,3.00,NULL,0.00),(32,1,0.00,17.35,3.00,NULL,NULL,NULL,NULL,0.00),(32,2,0.00,NULL,9.00,NULL,NULL,NULL,NULL,0.00),(32,4,9.47,37.00,0.00,NULL,NULL,NULL,NULL,700.78),(32,5,34.20,47.00,0.00,NULL,NULL,NULL,NULL,3214.80),(33,1,0.00,17.35,3.00,NULL,NULL,NULL,NULL,0.00),(33,2,0.00,NULL,9.00,NULL,NULL,NULL,NULL,0.00),(33,4,9.47,37.00,0.00,NULL,NULL,NULL,NULL,700.78),(33,5,34.20,47.00,0.00,NULL,NULL,NULL,NULL,3214.80),(34,1,0.00,17.35,3.00,NULL,NULL,NULL,NULL,0.00),(34,2,0.00,NULL,9.00,NULL,NULL,NULL,NULL,0.00),(34,4,9.47,37.00,0.00,NULL,NULL,NULL,NULL,700.78),(34,5,34.20,47.00,0.00,NULL,NULL,NULL,NULL,3214.80),(35,1,0.00,17.35,3.00,NULL,NULL,NULL,NULL,0.00),(35,2,0.00,NULL,9.00,NULL,NULL,NULL,NULL,0.00),(35,4,9.47,37.00,0.00,NULL,NULL,NULL,NULL,700.78),(35,5,34.20,47.00,0.00,NULL,NULL,NULL,NULL,3214.80),(36,1,0.00,17.35,3.00,NULL,NULL,NULL,NULL,0.00),(36,2,0.00,NULL,9.00,NULL,NULL,NULL,NULL,0.00),(36,4,9.47,37.00,0.00,NULL,NULL,NULL,NULL,700.78),(36,5,34.20,47.00,0.00,NULL,NULL,NULL,NULL,3214.80),(37,1,0.00,17.35,3.00,NULL,NULL,NULL,NULL,0.00),(37,2,0.00,NULL,9.00,NULL,NULL,NULL,NULL,0.00),(37,4,9.47,37.00,0.00,NULL,NULL,NULL,NULL,700.78),(37,5,34.20,47.00,0.00,NULL,NULL,NULL,NULL,3214.80),(38,1,0.00,17.35,3.00,NULL,NULL,NULL,NULL,0.00),(38,2,0.00,NULL,9.00,NULL,NULL,NULL,NULL,0.00),(38,4,9.47,37.00,0.00,NULL,NULL,NULL,NULL,700.78),(38,5,34.20,47.00,0.00,NULL,NULL,NULL,NULL,3214.80),(39,1,0.00,17.35,3.00,NULL,NULL,NULL,NULL,0.00),(39,2,0.00,NULL,9.00,NULL,NULL,NULL,NULL,0.00),(39,4,9.47,37.00,0.00,NULL,NULL,NULL,NULL,700.78),(39,5,34.20,47.00,0.00,NULL,NULL,NULL,NULL,3214.80),(40,1,0.00,17.35,3.00,NULL,NULL,NULL,NULL,0.00),(40,2,0.00,NULL,9.00,NULL,NULL,NULL,NULL,0.00),(40,4,9.47,37.00,0.00,NULL,NULL,NULL,NULL,700.78),(40,5,34.20,47.00,0.00,NULL,NULL,NULL,NULL,3214.80),(41,1,0.00,17.35,3.00,NULL,NULL,NULL,NULL,0.00),(41,2,0.00,NULL,9.00,NULL,NULL,NULL,NULL,0.00),(41,4,9.47,37.00,0.00,NULL,NULL,NULL,NULL,700.78),(41,5,34.20,47.00,0.00,NULL,NULL,NULL,NULL,3214.80),(42,1,0.00,17.35,3.00,0.00,NULL,NULL,NULL,0.00),(42,2,0.00,NULL,9.00,10.00,NULL,NULL,NULL,0.00),(42,4,9.47,37.00,0.00,20.00,NULL,NULL,NULL,1458.38),(42,5,34.20,47.00,0.00,0.00,NULL,NULL,NULL,3214.80),(43,1,0.00,17.35,3.00,0.00,NULL,NULL,NULL,0.00),(43,2,0.00,NULL,9.00,10.00,NULL,NULL,NULL,0.00),(43,4,9.47,37.00,0.00,20.00,NULL,NULL,NULL,1458.38),(43,5,34.20,47.00,0.00,0.00,NULL,NULL,NULL,3214.80),(44,1,0.00,17.35,3.00,0.00,NULL,NULL,NULL,NULL),(44,2,0.00,NULL,9.00,10.00,NULL,NULL,NULL,NULL),(44,4,9.47,37.00,0.00,20.00,NULL,NULL,NULL,NULL),(44,5,34.20,47.00,0.00,0.00,NULL,NULL,NULL,NULL),(45,1,0.00,17.35,3.00,0.00,17.35,3.00,0.00,NULL),(45,2,0.00,NULL,9.00,10.00,NULL,9.00,10.00,NULL),(45,4,9.47,37.00,0.00,20.00,37.00,0.00,20.00,NULL),(45,5,34.20,47.00,0.00,0.00,47.00,0.00,0.00,NULL),(46,1,0.00,17.35,3.00,0.00,NULL,NULL,NULL,NULL),(46,2,0.00,0.00,9.00,10.00,NULL,NULL,NULL,NULL),(46,4,9.47,37.00,0.00,20.00,NULL,NULL,NULL,NULL),(46,5,34.20,47.00,0.00,0.00,NULL,NULL,NULL,NULL),(47,1,0.00,17.35,3.00,0.00,NULL,NULL,NULL,NULL),(47,2,0.00,0.00,9.00,10.00,NULL,NULL,NULL,NULL),(47,4,9.47,37.00,0.00,20.00,NULL,NULL,NULL,NULL),(47,5,34.20,47.00,0.00,0.00,NULL,NULL,NULL,NULL),(48,1,0.00,17.35,3.00,0.00,NULL,NULL,NULL,NULL),(48,2,0.00,0.00,9.00,10.00,NULL,NULL,NULL,NULL),(48,4,9.47,37.00,0.00,20.00,NULL,NULL,NULL,NULL),(48,5,34.20,47.00,0.00,0.00,NULL,NULL,NULL,NULL),(49,1,0.00,17.35,3.00,0.00,0.00,0.00,0.00,NULL),(49,2,0.00,0.00,9.00,10.00,0.00,0.00,0.00,NULL),(49,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,NULL),(49,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,NULL),(50,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,NULL),(50,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,NULL),(50,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,NULL),(50,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,NULL),(51,8,34.81,17.35,3.00,0.00,17.35,3.00,0.00,NULL),(51,9,56.55,0.00,9.00,10.00,0.00,9.00,10.00,NULL),(51,4,9.47,37.00,0.00,20.00,37.00,0.00,20.00,NULL),(51,5,34.20,47.00,0.00,0.00,47.00,0.00,0.00,NULL),(52,8,34.81,17.35,3.00,0.00,NULL,NULL,NULL,NULL),(52,9,56.55,0.00,9.00,10.00,NULL,NULL,NULL,NULL),(52,4,9.47,37.00,0.00,20.00,NULL,NULL,NULL,NULL),(52,5,34.20,47.00,0.00,0.00,NULL,NULL,NULL,NULL),(53,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,NULL),(53,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,NULL),(53,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,NULL),(53,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,NULL),(54,8,34.81,17.35,3.00,0.00,NULL,NULL,NULL,NULL),(54,9,56.55,0.00,9.00,10.00,NULL,NULL,NULL,NULL),(54,4,9.47,37.00,0.00,20.00,NULL,NULL,NULL,NULL),(54,5,34.20,47.00,0.00,0.00,NULL,NULL,NULL,NULL),(55,8,34.81,17.35,3.00,0.00,NULL,NULL,NULL,NULL),(55,9,56.55,0.00,9.00,10.00,NULL,NULL,NULL,NULL),(55,4,9.47,37.00,0.00,20.00,NULL,NULL,NULL,NULL),(55,5,34.20,47.00,0.00,0.00,NULL,NULL,NULL,NULL),(56,8,34.81,17.35,3.00,0.00,17.35,3.00,0.00,1521.20),(56,9,56.55,0.00,9.00,10.00,0.00,9.00,10.00,3788.85),(56,4,9.47,37.00,0.00,20.00,37.00,0.00,20.00,1458.38),(56,5,34.20,47.00,0.00,0.00,47.00,0.00,0.00,3214.80),(57,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,12169.58),(57,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,30310.80),(57,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,11667.04),(57,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,25718.40),(58,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,12169.58),(58,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,30310.80),(58,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,11667.04),(58,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,25718.40),(59,8,34.81,17.35,3.00,0.00,17.35,3.00,0.00,1521.20),(59,9,56.55,0.00,9.00,10.00,0.00,9.00,10.00,3788.85),(59,4,9.47,37.00,0.00,20.00,37.00,0.00,20.00,1458.38),(59,5,34.20,47.00,0.00,0.00,47.00,0.00,0.00,3214.80),(60,8,34.81,17.35,3.00,0.00,17.35,3.00,0.00,200.00),(60,9,56.55,0.00,9.00,10.00,0.00,9.00,10.00,3788.85),(60,4,9.47,37.00,0.00,20.00,37.00,0.00,20.00,1458.38),(60,5,34.20,47.00,0.00,0.00,47.00,0.00,0.00,3214.80),(61,8,34.81,17.35,3.00,0.00,17.35,3.00,0.00,200.00),(61,9,56.55,0.00,9.00,10.00,0.00,9.00,10.00,1894.43),(61,4,9.47,37.00,0.00,20.00,37.00,0.00,20.00,729.19),(61,5,34.20,47.00,0.00,0.00,47.00,0.00,0.00,1607.40),(62,8,34.81,17.35,3.00,0.00,17.35,3.00,0.00,200.00),(62,9,56.55,0.00,9.00,10.00,0.00,9.00,10.00,1894.43),(62,4,9.47,37.00,0.00,20.00,37.00,0.00,20.00,729.19),(62,5,34.20,47.00,0.00,0.00,47.00,0.00,0.00,1607.40),(63,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,200.00),(63,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,15155.40),(63,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,5833.52),(63,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,12859.20),(64,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,200.00),(64,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,15155.40),(64,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,5833.52),(64,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,12859.20),(65,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,200.00),(65,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,15155.40),(65,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,5833.52),(65,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,12859.20),(66,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,200.00),(66,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,15155.40),(66,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,5833.52),(66,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,12859.20),(67,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,200.00),(67,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,15155.40),(67,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,5833.52),(67,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,12859.20),(68,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,200.00),(68,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,15155.40),(68,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,5833.52),(68,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,12859.20),(69,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,200.00),(69,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,55.40),(69,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,53.52),(69,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,128.20),(70,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,200.00),(70,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,15155.40),(70,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,5833.52),(70,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,12859.20),(71,8,34.81,17.35,3.00,0.00,138.80,24.00,0.00,200.00),(71,9,56.55,0.00,9.00,10.00,0.00,72.00,80.00,15155.40),(71,4,9.47,37.00,0.00,20.00,296.00,0.00,160.00,5833.52),(71,5,34.20,47.00,0.00,0.00,376.00,0.00,0.00,12859.20);
/*!40000 ALTER TABLE `redi_estimate_to_worker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_estimate_type`
--

DROP TABLE IF EXISTS `redi_estimate_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_estimate_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `status` smallint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate_type`
--

LOCK TABLES `redi_estimate_type` WRITE;
/*!40000 ALTER TABLE `redi_estimate_type` DISABLE KEYS */;
INSERT INTO `redi_estimate_type` VALUES (1,'Let billing department decide',1),(2,'Games',1),(3,'Graphics only',1),(4,'TV / Streaming',1),(5,'Digital',1),(6,'Audio/Visual / Other',1);
/*!40000 ALTER TABLE `redi_estimate_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_graphics_request`
--

DROP TABLE IF EXISTS `redi_graphics_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_graphics_request` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `project_id` bigint(22) DEFAULT NULL,
  `campaign_id` bigint(22) DEFAULT NULL,
  `spot_id` bigint(22) DEFAULT NULL,
  `version_id` bigint(22) DEFAULT NULL,
  `resolution` varchar(200) DEFAULT NULL,
  `resolution_note` text,
  `note` text,
  `status_id` int(11) DEFAULT NULL,
  `urgent` smallint(1) DEFAULT '0',
  `created_by_user_id` bigint(22) DEFAULT NULL,
  `in_house` smallint(1) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_graphics_request`
--

LOCK TABLES `redi_graphics_request` WRITE;
/*!40000 ALTER TABLE `redi_graphics_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `redi_graphics_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_graphics_request_assign`
--

DROP TABLE IF EXISTS `redi_graphics_request_assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_graphics_request_assign` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `graphics_request_id` bigint(22) DEFAULT NULL,
  `assigned_to_user_id` bigint(22) DEFAULT NULL,
  `accepted` smallint(1) DEFAULT '0',
  `created_by_user_id` bigint(22) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_graphics_request_assign`
--

LOCK TABLES `redi_graphics_request_assign` WRITE;
/*!40000 ALTER TABLE `redi_graphics_request_assign` DISABLE KEYS */;
/*!40000 ALTER TABLE `redi_graphics_request_assign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_graphics_request_design`
--

DROP TABLE IF EXISTS `redi_graphics_request_design`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_graphics_request_design` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `graphics_request_id` bigint(22) DEFAULT NULL,
  `frame_rate` varchar(200) DEFAULT NULL,
  `priority` varchar(100) DEFAULT NULL,
  `priority_date` datetime DEFAULT NULL,
  `burn_in` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_graphics_request_design`
--

LOCK TABLES `redi_graphics_request_design` WRITE;
/*!40000 ALTER TABLE `redi_graphics_request_design` DISABLE KEYS */;
INSERT INTO `redi_graphics_request_design` VALUES (1,3,'fr','pr','2017-04-05 00:00:00',NULL),(2,4,'fr','pr','2017-04-05 00:00:00','burnin'),(3,10,'29.97','Lunch tomorrow','2017-07-24 10:37:43','Standard'),(4,13,'24','Morning tomorrow',NULL,'Broadcast/Games');
/*!40000 ALTER TABLE `redi_graphics_request_design` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_graphics_request_file`
--

DROP TABLE IF EXISTS `redi_graphics_request_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_graphics_request_file` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `graphics_request_id` bigint(22) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_graphics_request_file`
--

LOCK TABLES `redi_graphics_request_file` WRITE;
/*!40000 ALTER TABLE `redi_graphics_request_file` DISABLE KEYS */;
INSERT INTO `redi_graphics_request_file` VALUES (1,6,'file 1'),(2,6,'file 2'),(3,6,'file 5'),(45,7,'file 1000'),(44,7,'file 9'),(7,8,'file 1'),(8,8,'file 2'),(9,8,'file 5'),(43,7,'file 2'),(42,7,'file 1'),(46,9,'file 1'),(47,9,'file 2'),(48,9,'file 5'),(57,1,'f2'),(58,1,'f`1'),(60,13,'H1');
/*!40000 ALTER TABLE `redi_graphics_request_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_graphics_request_finishing`
--

DROP TABLE IF EXISTS `redi_graphics_request_finishing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_graphics_request_finishing` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `graphics_request_id` bigint(22) DEFAULT NULL,
  `finisher_id` bigint(22) DEFAULT NULL,
  `format_comped` varchar(200) DEFAULT NULL,
  `format_textless` varchar(200) DEFAULT NULL,
  `format_keyable` varchar(200) DEFAULT NULL,
  `checker_due` varchar(100) DEFAULT NULL,
  `checker_due_date` datetime DEFAULT NULL,
  `final_renders_due` varchar(100) DEFAULT NULL,
  `final_renders_due_date` datetime DEFAULT NULL,
  `finishing_at` varchar(100) DEFAULT NULL,
  `finishing_contact` varchar(200) DEFAULT NULL,
  `project_collect` smallint(1) DEFAULT NULL,
  `project_collect_note` text,
  `stereo_finish` smallint(1) DEFAULT NULL,
  `stereo_finish_note` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_graphics_request_finishing`
--

LOCK TABLES `redi_graphics_request_finishing` WRITE;
/*!40000 ALTER TABLE `redi_graphics_request_finishing` DISABLE KEYS */;
INSERT INTO `redi_graphics_request_finishing` VALUES (1,6,1,'fc','ftl','fka','cd','2017-03-09 00:00:00','frd','2017-09-08 00:00:00','fa','fc',0,'pcn',0,'sfn'),(2,7,11,'fc','ftl','fka','cd','2017-03-09 00:00:00','frd','2017-09-08 00:00:00','fa','fc',0,'pcn',1,'sfn'),(3,8,1,'fc','ftl','fka','cd','2017-03-09 00:00:00','frd','2017-09-08 00:00:00','fa','fc',0,'pcn',1,'sfn'),(4,9,1,'fc','ftl','fka','cd','2017-03-09 00:00:00','frd','2017-09-08 00:00:00','fa','fc',0,'pcn',1,'sfn'),(5,11,2,'Lossless Quicktimes','ProRess 4444','16 Bit Tiffs',NULL,NULL,NULL,'2017-07-26 00:00:00',NULL,'null',1,'null',1,'null'),(6,12,5,'null','null','null',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0,NULL);
/*!40000 ALTER TABLE `redi_graphics_request_finishing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_graphics_request_status`
--

DROP TABLE IF EXISTS `redi_graphics_request_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_graphics_request_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_graphics_request_status`
--

LOCK TABLES `redi_graphics_request_status` WRITE;
/*!40000 ALTER TABLE `redi_graphics_request_status` DISABLE KEYS */;
INSERT INTO `redi_graphics_request_status` VALUES (1,'Draft'),(2,'Approved'),(3,'Accepted');
/*!40000 ALTER TABLE `redi_graphics_request_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_outside_cost`
--

DROP TABLE IF EXISTS `redi_outside_cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_outside_cost` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_outside_cost`
--

LOCK TABLES `redi_outside_cost` WRITE;
/*!40000 ALTER TABLE `redi_outside_cost` DISABLE KEYS */;
INSERT INTO `redi_outside_cost` VALUES (1,'Narration'),(2,'Music licensing'),(3,'Others'),(4,'Exp'),(5,'Test Expense');
/*!40000 ALTER TABLE `redi_outside_cost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project`
--

DROP TABLE IF EXISTS `redi_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(200) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project`
--

LOCK TABLES `redi_project` WRITE;
/*!40000 ALTER TABLE `redi_project` DISABLE KEYS */;
INSERT INTO `redi_project` VALUES (1,'Babysitter',1,NULL),(2,'Before I Wake',2,NULL),(3,'Bravo 14',3,NULL),(4,'Harwood',4,NULL),(5,'Hearthstone',1,NULL),(6,'Jack Reacher 2',2,NULL),(7,'Lights Out',3,NULL),(8,'Mike and Dave',4,NULL),(9,'Mr Robot S2',1,NULL),(10,'Quarry',2,NULL),(11,'Silicon Valley',3,NULL),(12,'Step Sisters',4,NULL),(13,'Storks',1,NULL),(14,'TNT Brand',2,NULL),(15,'What Now',3,NULL),(16,'Veep',4,NULL),(18,'project1',1,'nbc\'s first project'),(19,'newproject',1,'this will be succeed.'),(20,'bat',1,'field'),(21,'Test',3,NULL),(22,'Game of Thrones',3,NULL),(23,'Test2',1,NULL),(24,'Demo Test1',2,NULL),(25,'myTest1',3,NULL),(26,'myTest2',3,NULL),(27,'myTest1',3,NULL),(28,'Independence1',3,'Note'),(29,'TestProj',3,NULL),(30,'NewProject1',3,NULL),(31,'NewProject2',3,NULL),(32,'NewProject3',3,NULL),(33,'NewProject4',3,NULL),(34,'NewProject5',3,NULL),(35,'AnotherTest',3,NULL),(36,'sdf',3,NULL),(37,'sdf',3,NULL),(38,'A project',3,NULL),(39,'change name1',3,NULL),(40,'test 1q',1,NULL),(41,'test 1q',1,NULL),(42,'test 1q',1,NULL);
/*!40000 ALTER TABLE `redi_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_editor_progress`
--

DROP TABLE IF EXISTS `redi_project_editor_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_editor_progress` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `spot_id` int(11) DEFAULT NULL,
  `notes` text,
  `watched` smallint(1) DEFAULT NULL,
  `broken_down` smallint(6) DEFAULT NULL,
  `due` varchar(200) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_editor_progress`
--

LOCK TABLES `redi_project_editor_progress` WRITE;
/*!40000 ALTER TABLE `redi_project_editor_progress` DISABLE KEYS */;
INSERT INTO `redi_project_editor_progress` VALUES (1,2,3,9,'some note plus',NULL,NULL,NULL,'2017-01-04',3,'2017-02-26 19:58:43'),(2,2,3,8,'some note plusddddd11',NULL,NULL,NULL,'2017-01-04',3,'2017-02-26 20:00:36'),(3,2,3,NULL,'some note plusddddd',NULL,NULL,NULL,'2017-01-04',3,'2017-02-26 19:59:36'),(4,10,9,9,'some notes',NULL,NULL,NULL,'2017-01-04',3,'2017-02-26 20:38:20');
/*!40000 ALTER TABLE `redi_project_editor_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_editor_status`
--

DROP TABLE IF EXISTS `redi_project_editor_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_editor_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_editor_status`
--

LOCK TABLES `redi_project_editor_status` WRITE;
/*!40000 ALTER TABLE `redi_project_editor_status` DISABLE KEYS */;
INSERT INTO `redi_project_editor_status` VALUES (1,'Watching'),(2,'Screening'),(3,'Breaking down'),(4,'Revising spot'),(5,'Cutting new spot'),(6,'On fiber'),(7,'Downtime'),(8,'Waiting');
/*!40000 ALTER TABLE `redi_project_editor_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_history`
--

DROP TABLE IF EXISTS `redi_project_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_history` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_history`
--

LOCK TABLES `redi_project_history` WRITE;
/*!40000 ALTER TABLE `redi_project_history` DISABLE KEYS */;
INSERT INTO `redi_project_history` VALUES (1,18,1,'Project \"project1\" created for client \"NBC Universal\"','2017-02-24 17:02:21'),(2,19,1,'Project \"newproject\" created for client \"NBC Universal\"','2017-02-24 17:33:33'),(3,20,1,'Project \"bat\" created for client \"NBC Universal\"','2017-02-25 08:32:11'),(4,9,1,'Campaign \"Graphics Campaign\" was added to project \"Mr Robot S2\"','2017-02-25 17:32:38'),(5,1,1,'Campaign \"Clone\" was added to project \"Babysitter\"','2017-03-02 15:18:00'),(6,1,1,'Campaign \"Clone 30\" was added to project \"Babysitter\"','2017-03-02 15:19:46'),(7,1,1,'Campaign \"Hollo\" was added to project \"Babysitter\"','2017-03-02 15:21:23'),(8,1,1,'Campaign \"Rocky\" was added to project \"Babysitter\"','2017-03-02 15:22:49'),(9,1,1,'Spot \"Ka Spot\" was added to \"AV Campaign\" campaign','2017-03-02 16:17:00'),(10,21,1,'Project \"Test\" created for client \"HBO\"','2017-03-10 03:42:21'),(11,22,1,'Project \"Game of Thrones\" created for client \"HBO\"','2017-03-15 05:40:56'),(12,23,1,'Project \"Test2\" created for client \"NBC Universal\"','2017-03-15 05:54:25'),(13,1,1,'Campaign \"VAA\" was added to project \"Babysitter\"','2017-03-16 07:37:36'),(14,23,1,'Campaign \"Test1\" was added to project \"Test2\"','2017-03-16 07:42:24'),(15,23,1,'Campaign \"Test2\" was added to project \"Test2\"','2017-03-16 09:04:11'),(16,23,1,'Campaign \"Test3\" was added to project \"Test2\"','2017-03-16 09:15:32'),(17,23,1,'Campaign \"Test4\" was added to project \"Test2\"','2017-03-16 09:41:42'),(18,23,1,'Campaign \"Test5\" was added to project \"Test2\"','2017-03-16 09:53:41'),(19,23,1,'Campaign \"Test6\" was added to project \"Test2\"','2017-03-16 09:57:00'),(20,23,1,'Campaign \"Test7\" was added to project \"Test2\"','2017-03-16 10:09:19'),(21,23,1,'Campaign \"AV Campaign\" was added to project \"Test2\"','2017-03-16 11:07:14'),(22,23,1,'Campaign \"AV Campaign\" was added to project \"Test2\"','2017-03-16 11:07:36'),(23,23,1,'Spot \"TestSpot1\" was added to \"Test1\" campaign','2017-03-16 11:44:08'),(24,23,1,'Spot \"TestSpot2\" was added to \"Test1\" campaign','2017-03-16 11:48:22'),(25,23,1,'Spot \"Ttt\" was added to \"Test1\" campaign','2017-03-16 12:11:52'),(26,10,1,'Spot \"Enchantress\" was added to \"AV Campaign\"','2017-03-16 12:57:34'),(27,23,1,'Spot \"Take Over :10\" was added to \"Test1\"','2017-03-16 12:59:34'),(28,23,48,'Spot \"Puppet Master\" was added to \"Test7\"','2017-03-16 16:24:18'),(29,23,1,'Campaign \"CP1\" was added to project \"Test2\"','2017-03-17 02:32:46'),(30,23,1,'Campaign \"Trailer Campaign\" was added to project \"Test2\"','2017-03-17 02:35:22'),(31,23,1,'Campaign \"CAM1\" was added to project \"Test2\"','2017-03-17 02:38:30'),(32,23,1,'Campaign \"Camp3\" was added to project \"Test2\"','2017-03-17 02:40:11'),(33,23,1,'Campaign \"Camp1\" was added to project \"Test2\"','2017-03-17 02:42:31'),(34,23,1,'Spot \"Take Over :10\" was added to \"Test2\"','2017-03-17 02:47:25'),(35,23,1,'Spot \"SP1\" was added to \"Test2\" campaign','2017-03-17 02:51:07'),(36,23,1,'Spot \"SP2\" was added to \"Test2\" campaign','2017-03-17 02:54:19'),(37,23,1,'Campaign \"Graphics Campaign\" was added to project \"Test2\"','2017-03-17 04:33:06'),(38,23,1,'Campaign \"TC1\" was added to project \"Test2\"','2017-03-17 04:33:22'),(39,10,48,'Campaign \"Trailer Two\" was added to project \"Quarry\"','2017-03-23 08:03:22'),(40,10,48,'Campaign \"Teaser\" was added to project \"Quarry\"','2017-03-28 12:56:01'),(41,10,48,'Campaign \"Who\" was added to project \"Quarry\"','2017-03-28 13:02:23'),(42,10,48,'Campaign \"When\" was added to project \"Quarry\"','2017-03-28 13:14:42'),(43,10,48,'Campaign \"What\" was added to project \"Quarry\"','2017-03-28 13:15:38'),(44,10,48,'Campaign \"Why\" was added to project \"Quarry\"','2017-03-28 13:18:03'),(45,23,48,'Campaign \"Trailer\" was added to project \"Test2\"','2017-04-06 06:15:22'),(46,23,48,'Spot \"Vertical Footage\" was added to \"Trailer\"','2017-04-06 07:23:32'),(47,23,48,'Spot \"Test spot\" was added to \"Trailer\" campaign','2017-04-07 07:39:15'),(48,23,48,'Spot \"Test 2\" was added to \"Trailer\" campaign','2017-04-07 08:07:11'),(49,23,48,'Spot \"Test 3\" was added to \"Trailer\" campaign','2017-04-07 08:56:31'),(50,23,48,'Spot \"Test 4\" was added to \"Trailer\" campaign','2017-04-07 08:57:48'),(51,23,48,'Spot \"Test 5\" was added to \"Trailer\" campaign','2017-04-07 09:00:04'),(52,23,48,'Spot \"Test 6\" was added to \"Trailer\" campaign','2017-04-07 09:00:36'),(53,23,48,'Spot \"Test 7\" was added to \"Trailer\" campaign','2017-04-07 09:02:10'),(54,23,48,'Spot \"Test 8\" was added to \"Trailer\" campaign','2017-04-07 09:02:41'),(55,23,48,'Spot \"Test 9\" was added to \"Trailer\" campaign','2017-04-07 09:04:25'),(56,23,48,'Spot \"Test 10\" was added to \"Trailer\" campaign','2017-04-07 09:05:50'),(57,23,48,'Spot \"Test 11\" was added to \"Trailer\" campaign','2017-04-07 09:06:48'),(58,23,48,'Spot \"New spot\" was added to \"Trailer\" campaign','2017-04-10 03:42:20'),(59,23,48,'Spot \"Testing spot for the fiftieth time\" was added to \"Trailer\" campaign','2017-04-10 03:58:05'),(60,23,48,'Spot \"Test 150\" was added to \"Trailer\" campaign','2017-04-10 03:59:18'),(61,23,48,'Campaign \"Teaser\" was added to project \"Test2\"','2017-04-10 04:00:01'),(62,23,48,'Campaign \"Teaser\" was removed from project \"Test2\"','2017-04-10 04:05:44'),(63,23,48,'Spot \"Last\" was added to \"Trailer\" campaign','2017-04-14 13:27:20'),(64,23,48,'Campaign \"Digital\" was added to project \"Test2\"','2017-04-14 13:27:39'),(65,23,48,'Spot \"Instagram\" was added to \"Digital\" campaign','2017-04-14 15:33:59'),(66,9,48,'Campaign \"(:30) TV\" was added to project \"Mr Robot S2\"','2017-04-16 00:05:53'),(67,1,48,'Campaign \"(:30) TV\" was added to project \"Babysitter\"','2017-04-16 13:51:53'),(68,1,48,'Spot \"First Spot for Babysitter (:30) TV\" was added to \"(:30) TV\" campaign','2017-04-16 14:02:50'),(69,1,48,'Campaign \"Graphicss\" was added to project \"Babysitter\"','2017-04-17 19:56:26'),(70,10,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 09:54:36'),(71,10,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 09:54:45'),(72,10,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 10:06:44'),(73,10,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 10:07:06'),(74,10,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 10:07:17'),(75,10,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 10:07:54'),(76,10,48,'Campaign \"(:15) TV\" was added to project \"Quarry\"','2017-04-26 11:49:28'),(77,10,48,'Campaign \"(:15) TV\" was removed from project \"Quarry\"','2017-04-26 11:49:49'),(78,10,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 11:50:15'),(79,10,48,'Campaign \"Teaser\" was added to project \"Quarry\"','2017-04-28 12:38:52'),(80,10,48,'Spot \"First Spot for Teaser\" was added to \"Teaser\" campaign','2017-04-28 12:40:44'),(81,24,48,'Project \"Demo Test1\" created for client \"Warner Bros.\"','2017-04-28 12:44:08'),(82,24,48,'Campaign \"(:30) TV\" was added to project \"Demo Test1\"','2017-05-02 13:34:31'),(83,24,48,'Campaign \"(:30) TV\" was removed from project \"Demo Test1\"','2017-05-02 13:34:39'),(84,24,48,'Campaign \"Trailer\" was added to project \"Demo Test1\"','2017-05-02 13:34:55'),(85,9,48,'Spot \"Episode 405\" was added to \"(:30) TV\" campaign','2017-05-03 16:23:06'),(86,1,48,'Version \"1\" was added to spot \"First Spot for Babysit\"','2017-05-24 09:42:28'),(87,1,48,'Version \"2\" was added to spot \"First Spot for Babysit\"','2017-05-24 09:42:34'),(88,1,48,'Campaign \"Graphicss\" was removed from project \"Babysitter\"','2017-05-24 09:42:56'),(89,1,48,'Campaign \"Graphics\" was added to project \"Babysitter\"','2017-05-24 09:43:08'),(90,19,48,'Campaign \"Trailer\" was added to project \"newproject\"','2017-07-05 10:47:03'),(91,19,48,'Campaign \"Trailer\" was removed from project \"newproject\"','2017-07-05 10:47:28'),(92,25,48,'Project \"myTest1\" created for client \"HBO\"','2017-07-05 10:58:35'),(93,25,48,'Campaign \"How\" was added to project \"myTest1\"','2017-07-05 10:59:23'),(94,25,48,'Campaign \"Trailer\" was added to project \"myTest1\"','2017-07-05 10:59:41'),(95,25,48,'Spot \"spot1\" was added to \"How\" campaign','2017-07-05 11:00:35'),(96,26,48,'Project \"myTest2\" created for client \"HBO\"','2017-07-05 11:37:21'),(97,25,48,'Version \"1\" was added to spot \"spot1\"','2017-07-05 14:15:30'),(98,25,48,'Spot \"spot2\" was added to \"How\" campaign','2017-07-05 14:16:05'),(99,25,48,'Version \"1B\" was added to spot \"spot1\"','2017-07-05 14:16:15'),(100,25,48,'Version \"1 Alt\" was added to spot \"spot2\"','2017-07-05 14:17:09'),(101,25,48,'Version \"2B\" was added to spot \"spot2\"','2017-07-05 14:17:19'),(102,27,48,'Project \"myTest1\" created for client \"HBO\"','2017-07-05 14:58:10'),(103,25,48,'Version \"1B\" was added to spot \"spot2\"','2017-07-05 16:05:32'),(104,26,48,'Campaign \"Home Entertainment\" was added to project \"myTest2\"','2017-07-05 23:49:27'),(105,28,48,'Project \"Independence1\" created for client \"HBO\"','2017-07-06 18:27:57'),(106,28,48,'Campaign \"Teaser\" was added to project \"Independence1\"','2017-07-06 18:48:57'),(107,28,48,'Campaign \"Trailer\" was added to project \"Independence1\"','2017-07-06 20:29:06'),(108,28,48,'Campaign \"Pitch\" was added to project \"Independence1\"','2017-07-06 20:46:47'),(109,25,48,'Campaign \"(:30) TV\" was added to project \"myTest1\"','2017-07-06 20:47:42'),(110,28,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 20:51:51'),(111,28,48,'Campaign \"TV (other)\" was added to project \"Independence1\"','2017-07-06 20:51:55'),(112,28,48,'Campaign \"Home Entertainment\" was added to project \"Independence1\"','2017-07-06 20:52:00'),(113,28,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-06 20:52:03'),(114,28,48,'Campaign \"Broadcast\" was added to project \"Independence1\"','2017-07-06 20:54:51'),(115,28,48,'Campaign \"Games\" was added to project \"Independence1\"','2017-07-06 20:55:43'),(116,28,48,'Campaign \"Angre\" was added to project \"Independence1\"','2017-07-06 21:23:03'),(117,28,48,'Campaign \"Angre\" was added to project \"Independence1\"','2017-07-06 21:23:05'),(118,28,48,'Campaign \"Trailer\" was removed from project \"Independence1\"','2017-07-06 21:28:31'),(119,28,48,'Campaign \"Pitch\" was removed from project \"Independence1\"','2017-07-06 21:28:42'),(120,28,48,'Campaign \"TV (other)\" was removed from project \"Independence1\"','2017-07-06 21:28:51'),(121,28,48,'Campaign \"(:30) TV\" was removed from project \"Independence1\"','2017-07-06 21:28:51'),(122,28,48,'Campaign \"Broadcast\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(123,28,48,'Campaign \"Digital\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(124,28,48,'Campaign \"Games\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(125,28,48,'Campaign \"Home Entertainment\" was removed from project \"Independence1\"','2017-07-06 21:28:57'),(126,28,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 21:29:58'),(127,28,48,'Campaign \"Trailer\" was added to project \"Independence1\"','2017-07-06 22:28:51'),(128,28,48,'Campaign \"How\" was added to project \"Independence1\"','2017-07-06 22:29:03'),(129,28,48,'Campaign \"Home Entertainment\" was added to project \"Independence1\"','2017-07-06 22:29:25'),(130,28,48,'Campaign \"Streaming\" was added to project \"Independence1\"','2017-07-06 22:29:56'),(131,28,48,'Campaign \"Other\" was added to project \"Independence1\"','2017-07-06 22:30:52'),(132,28,48,'Campaign \"Graphics\" was added to project \"Independence1\"','2017-07-06 22:30:59'),(133,28,48,'Campaign \"Trailer Two\" was added to project \"Independence1\"','2017-07-06 22:31:48'),(134,28,48,'Campaign \"What\" was added to project \"Independence1\"','2017-07-06 22:31:56'),(135,28,48,'Campaign \"When\" was added to project \"Independence1\"','2017-07-06 22:31:56'),(136,28,48,'Campaign \"Who\" was added to project \"Independence1\"','2017-07-06 22:34:03'),(137,28,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-06 22:34:29'),(138,28,48,'Campaign \"Teaser\" was removed from project \"Independence1\"','2017-07-06 22:34:43'),(139,28,48,'Campaign \"Streaming\" was removed from project \"Independence1\"','2017-07-06 22:34:44'),(140,28,48,'Campaign \"Home Entertainment\" was removed from project \"Independence1\"','2017-07-06 22:34:46'),(141,28,48,'Campaign \"How\" was removed from project \"Independence1\"','2017-07-06 22:34:48'),(142,28,48,'Campaign \"Angre\" was removed from project \"Independence1\"','2017-07-06 22:34:51'),(143,28,48,'Campaign \"Other\" was removed from project \"Independence1\"','2017-07-06 22:34:51'),(144,28,48,'Campaign \"Graphics\" was removed from project \"Independence1\"','2017-07-06 22:34:54'),(145,28,48,'Campaign \"Trailer\" was removed from project \"Independence1\"','2017-07-06 22:34:57'),(146,28,48,'Campaign \"(:30) TV\" was removed from project \"Independence1\"','2017-07-06 22:34:58'),(147,28,48,'Campaign \"Digital\" was removed from project \"Independence1\"','2017-07-06 22:35:18'),(148,28,48,'Campaign \"When\" was removed from project \"Independence1\"','2017-07-06 22:35:19'),(149,28,48,'Campaign \"Who\" was removed from project \"Independence1\"','2017-07-06 22:35:20'),(150,28,48,'Campaign \"What\" was removed from project \"Independence1\"','2017-07-06 22:35:22'),(151,28,48,'Campaign \"Trailer Two\" was removed from project \"Independence1\"','2017-07-06 22:35:25'),(152,28,48,'Campaign \"Teaser\" was added to project \"Independence1\"','2017-07-06 22:36:08'),(153,28,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 22:36:15'),(154,28,48,'Spot \"spt1\" was added to \"Teaser\" campaign','2017-07-06 22:39:53'),(155,28,48,'Spot \"spt2\" was added to \"Teaser\" campaign','2017-07-07 03:21:10'),(156,28,48,'Spot \"spt3\" was added to \"Teaser\" campaign','2017-07-07 03:28:15'),(157,28,48,'Spot \"spt4\" was added to \"Teaser\" campaign','2017-07-07 03:35:12'),(158,28,48,'Spot \"spt5\" was added to \"Teaser\" campaign','2017-07-07 03:37:04'),(159,28,48,'Spot \"spt5\" was added to \"Teaser\" campaign','2017-07-07 03:37:20'),(160,28,48,'Spot \"spt6\" was added to \"Teaser\" campaign','2017-07-07 03:38:45'),(161,28,48,'Spot \"spt1\" was added to \"(:30) TV\" campaign','2017-07-07 03:39:10'),(162,28,48,'Version \"1\" was added to spot \"spt1\"','2017-07-07 03:42:42'),(163,27,48,'Campaign \"Teaser\" was added to project \"myTest1\"','2017-07-07 15:47:12'),(164,27,48,'Spot \"spt1\" was added to \"Teaser\" campaign','2017-07-07 15:47:22'),(165,27,48,'Spot \"spt1\" was added to \"Teaser\" campaign','2017-07-07 15:47:34'),(166,27,48,'Spot \"spt2\" was added to \"Teaser\" campaign','2017-07-07 15:47:58'),(167,27,48,'Version \"1B\" was added to spot \"spt1\"','2017-07-07 15:52:40'),(168,28,48,'Version \"1A\" was added to spot \"spt5\"','2017-07-07 15:55:00'),(169,28,48,'Version \"1B\" was added to spot \"spt5\"','2017-07-07 15:55:43'),(170,28,48,'Version \"1 Alt\" was added to spot \"spt5\"','2017-07-07 15:55:54'),(171,28,48,'Version \"1 Rev\" was added to spot \"spt5\"','2017-07-07 18:05:49'),(172,28,48,'Version \"2A\" was added to spot \"spt5\"','2017-07-07 18:14:28'),(173,28,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-07 19:27:18'),(174,28,48,'Spot \"spt1\" was added to \"Digital\" campaign','2017-07-07 19:45:21'),(175,28,48,'Version \"1\" was added to spot \"spt1\"','2017-07-07 19:53:38'),(176,28,48,'Campaign \"Why\" was added to project \"Independence1\"','2017-07-07 21:34:56'),(177,28,48,'Spot \"spt1\" was added to \"Why\" campaign','2017-07-07 21:35:18'),(178,29,48,'Project \"TestProj\" created for client \"HBO\"','2017-07-10 04:06:22'),(179,1,48,'Campaign \"Test\" was added to project \"Babysitter\"','2017-07-10 04:24:44'),(180,1,48,'Campaign \"Test\" was added to project \"Babysitter\"','2017-07-10 04:24:46'),(181,1,48,'Spot \"Second spot for Babysitter\" was added to \"(:30) TV\" campaign','2017-07-10 04:26:17'),(182,1,48,'Version \"1\" was added to spot \"Second spot for Babysi\"','2017-07-10 04:27:52'),(183,30,48,'Project \"NewProject1\" created for client \"HBO\"','2017-07-10 22:04:11'),(184,31,48,'Project \"NewProject2\" created for client \"HBO\"','2017-07-10 22:06:01'),(185,32,48,'Project \"NewProject3\" created for client \"HBO\"','2017-07-10 22:34:19'),(186,33,48,'Project \"NewProject4\" created for client \"HBO\"','2017-07-10 22:35:13'),(187,34,48,'Project \"NewProject5\" created for client \"HBO\"','2017-07-10 22:36:20'),(188,30,48,'Campaign \"Teaser\" was added to project \"NewProject1\"','2017-07-10 22:54:56'),(189,30,48,'Campaign \"Trailer\" was added to project \"NewProject1\"','2017-07-10 22:56:02'),(190,30,48,'Campaign \"(:30) TV\" was added to project \"NewProject1\"','2017-07-10 22:57:41'),(191,30,48,'Campaign \"Home Entertainment\" was added to project \"NewProject1\"','2017-07-10 23:02:34'),(192,30,48,'Spot \"spt1\" was added to \"Home Entertainment\" campaign','2017-07-10 23:03:37'),(193,30,48,'Spot \"spt2\" was added to \"Home Entertainment\" campaign','2017-07-10 23:06:47'),(194,30,48,'Version \"1\" was added to spot \"spt2\"','2017-07-10 23:08:01'),(195,30,48,'Version \"1A\" was added to spot \"spt2\"','2017-07-10 23:08:37'),(196,30,48,'Version \"1B\" was added to spot \"spt2\"','2017-07-10 23:09:28'),(197,30,48,'Version \"1 Rev\" was added to spot \"spt2\"','2017-07-10 23:10:46'),(198,35,48,'Project \"AnotherTest\" created for client \"HBO\"','2017-07-12 04:34:54'),(199,30,48,'Campaign \"Test1\" was added to project \"NewProject1\"','2017-07-13 01:02:49'),(200,30,48,'Campaign \"Test1\" was added to project \"NewProject1\"','2017-07-13 01:02:51'),(201,30,48,'Campaign \"Test2\" was added to project \"NewProject1\"','2017-07-15 00:38:50'),(202,36,48,'Project \"sdf\" created for client \"HBO\"','2017-07-18 07:34:11'),(203,37,48,'Project \"sdf\" created for client \"HBO\"','2017-07-18 07:34:11'),(204,1,48,'Version \"1\" was added to spot \"Puppet Master\"','2017-07-28 11:16:12'),(205,38,48,'Project \"A project\" created for client \"HBO\"','2017-08-03 12:28:45'),(206,1,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2017-11-27 11:18:27'),(207,1,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2017-11-27 11:18:31'),(208,1,48,'Version \"1 Alt\" was added to spot \"First Spot for Babysit\"','2017-11-27 11:19:43'),(209,39,51,'Project \"test 1q\" created for client \"NBC Universal\"','2017-12-07 15:44:31'),(210,39,NULL,'Project renamed to \"change name1\" from \"test 1q\"','2017-12-07 16:35:50'),(211,39,51,'Project customer changed to \"HBO\" from \"NBC Universal\"','2017-12-07 16:35:50'),(212,40,51,'Project \"test 1q\" created for client \"NBC Universal\"','2017-12-10 18:07:15'),(213,41,51,'Project \"test 1q\" created for client \"NBC Universal\"','2017-12-10 18:08:57'),(214,2,51,'Campaign \"test campaign1\" was added to project \"Before I Wake\"','2017-12-11 13:31:06'),(215,3,51,'Campaign \"test campaign1\" was added to project \"Bravo 14\"','2017-12-11 13:31:06'),(216,2,51,'Campaign \"test campaign1\" was added to project \"Before I Wake\"','2018-01-14 18:39:57'),(217,3,51,'Campaign \"test campaign1\" was added to project \"Bravo 14\"','2018-01-14 18:39:57'),(218,2,51,'Campaign \"test campaign1\" was added to project \"Before I Wake\"','2018-01-14 18:42:29'),(219,3,51,'Campaign \"test campaign1\" was added to project \"Bravo 14\"','2018-01-14 18:42:29'),(220,2,51,'Campaign \"test campaign1\" was added to project \"Before I Wake\"','2018-01-14 18:45:17'),(221,3,51,'Campaign \"test campaign1\" was added to project \"Bravo 14\"','2018-01-14 18:45:17'),(222,2,51,'Campaign \"test campaign1\" was added to project \"Before I Wake\"','2018-01-14 18:47:59'),(223,3,51,'Campaign \"test campaign1\" was added to project \"Bravo 14\"','2018-01-14 18:47:59'),(224,9,51,'Campaign \"Trailer\" was added to project \"Mr Robot S2\"','2018-01-17 13:17:39'),(225,10,51,'Campaign \"Trailer\" was added to project \"Quarry\"','2018-01-17 13:18:51'),(226,10,51,'Campaign \"Trailer\" was added to project \"Quarry\"','2018-01-17 13:19:06'),(227,11,51,'Campaign \"Trailer\" was added to project \"Silicon Valley\"','2018-01-17 13:19:21'),(228,11,51,'Campaign \"Trailer\" was added to project \"Silicon Valley\"','2018-01-18 14:35:09'),(229,11,51,'Campaign \"Trailer\" was added to project \"Silicon Valley\"','2018-01-18 14:35:30'),(230,11,51,'Campaign \"Trailer\" was added to project \"Silicon Valley\"','2018-01-18 14:48:44'),(231,11,51,'Campaign \"Trailer\" was added to project \"Silicon Valley\"','2018-01-18 14:56:16'),(232,11,51,'Campaign \"Teaser\" was added to project \"Silicon Valley\"','2018-01-21 15:16:51'),(233,12,51,'Campaign \"Teaser\" was added to project \"Step Sisters\"','2018-01-21 15:19:39'),(234,1,51,'Campaign \"How\" was added to project \"Babysitter\"','2018-01-21 17:03:42'),(235,1,51,'Campaign \"Test\" was added to project \"Babysitter\"','2018-01-21 17:09:21'),(236,42,51,'Project \"test 1q\" created for client \"NBC Universal\"','2018-01-22 15:37:25'),(237,12,1,'User \"Alex Kroll\" was added to campaign \"Teaser\"','2018-01-30 15:48:50'),(238,12,1,'User \"Andy Austin\" was removed from campaign \"Teaser\"','2018-01-30 17:56:35'),(239,1,1,'Music team request was changed on campaign \"Test\"','2018-01-30 19:06:35'),(240,1,1,'Writing team request was changed on campaign \"Test\"','2018-01-30 19:06:35'),(241,1,1,'Music team request was changed on campaign \"Test\"','2018-01-30 19:08:00'),(242,1,1,'Writing team request was changed on campaign \"Test\"','2018-01-30 19:08:00'),(243,1,1,'Writing team request was changed on campaign \"Test\"','2018-01-30 19:08:51'),(244,1,1,'Music team request was changed on campaign \"Test\"','2018-01-30 19:09:08'),(245,1,1,'Music team request was changed on campaign \"Test\"','2018-01-30 19:09:28'),(246,1,1,'Writing team request was changed on campaign \"Test\"','2018-01-30 19:10:05'),(247,12,1,'User \"Alex Kroll\" was added to campaign \"Teaser\"','2018-01-30 19:40:07'),(248,12,1,'User \"Alex Kroll\" was added to campaign \"Teaser\"','2018-01-30 19:40:38'),(249,12,1,'User \"Alex Kroll\" was changed to \"Writer\" on campaign \"Teaser\"','2018-01-30 19:41:24'),(250,12,1,'User \"Alex Kroll\" was added to campaign \"Teaser\"','2018-01-30 19:41:24');
/*!40000 ALTER TABLE `redi_project_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_to_campaign`
--

DROP TABLE IF EXISTS `redi_project_to_campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_to_campaign` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `first_point_of_contact_id` int(11) DEFAULT NULL,
  `request_writing_team` tinyint(1) DEFAULT '0',
  `writing_team_notes` text,
  `request_music_team` tinyint(1) DEFAULT '0',
  `music_team_notes` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_to_campaign`
--

LOCK TABLES `redi_project_to_campaign` WRITE;
/*!40000 ALTER TABLE `redi_project_to_campaign` DISABLE KEYS */;
INSERT INTO `redi_project_to_campaign` VALUES (4,9,2,2,0,NULL,0,NULL),(2,12,9,4,1,'some note here 111',1,'some note here 222'),(8,1,70,4,1,'some note here 111',1,'some note here 222'),(5,11,2,4,1,'some note here 111',NULL,NULL),(6,11,1,4,1,'some note here 111',NULL,NULL),(7,12,1,4,1,'some note here 111',1,'some note here 222'),(9,1,72,4,0,'some note here 11',0,'some note here 2229');
/*!40000 ALTER TABLE `redi_project_to_campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_to_campaign_user`
--

DROP TABLE IF EXISTS `redi_project_to_campaign_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_to_campaign_user` (
  `project_campaign_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`project_campaign_id`,`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_to_campaign_user`
--

LOCK TABLES `redi_project_to_campaign_user` WRITE;
/*!40000 ALTER TABLE `redi_project_to_campaign_user` DISABLE KEYS */;
INSERT INTO `redi_project_to_campaign_user` VALUES (7,3,3),(7,1,3),(7,5,4);
/*!40000 ALTER TABLE `redi_project_to_campaign_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_user`
--

DROP TABLE IF EXISTS `redi_project_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_user` (
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`project_id`,`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_user`
--

LOCK TABLES `redi_project_user` WRITE;
/*!40000 ALTER TABLE `redi_project_user` DISABLE KEYS */;
INSERT INTO `redi_project_user` VALUES (39,2,1),(39,10,3),(41,2,2),(41,3,1),(41,6,2),(41,7,4),(42,2,2),(42,3,1),(42,6,2),(42,7,4);
/*!40000 ALTER TABLE `redi_project_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_setting`
--

DROP TABLE IF EXISTS `redi_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) DEFAULT NULL,
  `setting_value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key_UNIQUE` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_setting`
--

LOCK TABLES `redi_setting` WRITE;
/*!40000 ALTER TABLE `redi_setting` DISABLE KEYS */;
INSERT INTO `redi_setting` VALUES (1,'TEMPORARY_STAFF_HOUR_PER_DAY','8'),(2,'TEST','some test value');
/*!40000 ALTER TABLE `redi_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_spot`
--

DROP TABLE IF EXISTS `redi_spot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_spot` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `spot_name` varchar(22) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `revision_not_counted` smallint(1) DEFAULT NULL,
  `notes` text,
  `revisions` int(11) DEFAULT NULL,
  `graphics_revisions` smallint(1) DEFAULT NULL,
  `first_revision_cost` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot`
--

LOCK TABLES `redi_spot` WRITE;
/*!40000 ALTER TABLE `redi_spot` DISABLE KEYS */;
INSERT INTO `redi_spot` VALUES (1,'Take Over :10',23,54,NULL,NULL,NULL,NULL,NULL),(2,'Vertical Footage',23,2,NULL,'null',4,NULL,NULL),(3,'Puddin',1,1,NULL,NULL,NULL,NULL,NULL),(4,'Puppet Master',1,1,NULL,NULL,NULL,NULL,NULL),(5,'Boomer',1,1,NULL,NULL,NULL,NULL,NULL),(6,'Slipknot',1,1,NULL,NULL,NULL,NULL,NULL),(7,'Croc',1,1,NULL,NULL,NULL,NULL,NULL),(8,'Diablo',1,1,NULL,NULL,NULL,NULL,NULL),(9,'Enchantress',10,9,NULL,NULL,NULL,NULL,NULL),(10,'Katana',1,1,NULL,NULL,NULL,NULL,NULL),(11,'Waller',1,1,NULL,NULL,NULL,NULL,NULL),(12,'Deadshot',1,1,NULL,NULL,NULL,NULL,NULL),(13,'Flag',1,1,NULL,NULL,NULL,NULL,NULL),(14,'Joker',1,1,NULL,NULL,NULL,NULL,NULL),(15,'Harley',1,1,NULL,NULL,NULL,NULL,NULL),(16,'Deashot :60',1,1,NULL,NULL,NULL,NULL,NULL),(17,'Take Over :10',2,1,NULL,NULL,NULL,NULL,NULL),(18,'Vertical Footage',2,1,NULL,NULL,NULL,NULL,NULL),(19,'Puddin',2,1,NULL,NULL,NULL,NULL,NULL),(20,'Puppet Master',23,59,NULL,NULL,NULL,NULL,NULL),(21,'Boomer',2,1,NULL,NULL,NULL,NULL,NULL),(22,'Slipknot',2,1,NULL,NULL,NULL,NULL,NULL),(23,'Croc',2,1,NULL,NULL,NULL,NULL,NULL),(24,'Diablo',2,1,NULL,NULL,NULL,NULL,NULL),(25,'Enchantress',2,1,NULL,NULL,NULL,NULL,NULL),(26,'Katana',2,1,NULL,NULL,NULL,NULL,NULL),(27,'Waller',2,1,NULL,NULL,NULL,NULL,NULL),(28,'Deadshot',2,1,NULL,NULL,NULL,NULL,NULL),(29,'Flag',2,1,NULL,NULL,NULL,NULL,NULL),(30,'Joker',2,1,NULL,NULL,NULL,NULL,NULL),(31,'Harley',2,1,NULL,NULL,NULL,NULL,NULL),(32,'Deashot :60',2,1,NULL,NULL,NULL,NULL,NULL),(55,'First Spot for Babysit',1,4,NULL,'This is the very first spot for Babysitter campaign',3,0,10000.00),(54,'Instagram',23,7,NULL,'null',1,1,800.00),(53,'Last',23,2,NULL,'null',0,0,0.00),(63,'spt4',28,1,NULL,'spt4notre',NULL,0,NULL),(62,'spt3',28,1,NULL,'sdf',NULL,0,NULL),(61,'spt2',28,1,NULL,'fsdf',NULL,0,NULL),(60,'spt1',28,1,NULL,'sptnote',0,0,0.00),(59,'spot2',25,70,NULL,'werwe',0,1,100.00),(58,'spot1',25,70,NULL,'spot1 note',0,0,0.00),(57,'Episode 405',9,4,NULL,'null',0,0,0.00),(56,'First Spot for Teaser',10,1,NULL,'null',3,0,35000.00),(64,'spt5',28,1,NULL,'spt5note',NULL,0,NULL),(65,'spt5',28,1,NULL,'spt5note',NULL,0,NULL),(66,'spt6',28,1,NULL,'r',NULL,0,NULL),(67,'spt1',28,4,NULL,'wer',NULL,0,NULL),(69,'spt1',27,1,NULL,'null',0,0,0.00),(70,'spt2',27,1,NULL,'wer',0,0,0.00),(71,'spt1',28,7,NULL,NULL,NULL,0,NULL),(72,'spt1',28,68,NULL,'spt note',NULL,0,NULL),(73,'Second spot for Babysi',1,4,NULL,NULL,NULL,0,NULL),(74,'spt1',30,6,NULL,NULL,NULL,0,NULL),(75,'spt2',30,6,NULL,NULL,NULL,0,NULL);
/*!40000 ALTER TABLE `redi_spot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_spot_sent`
--

DROP TABLE IF EXISTS `redi_spot_sent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_spot_sent` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `work_type_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `sent_via_method_id` int(11) DEFAULT NULL,
  `notes` text,
  `status_id` int(11) DEFAULT NULL,
  `final` smallint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent`
--

LOCK TABLES `redi_spot_sent` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent` DISABLE KEYS */;
INSERT INTO `redi_spot_sent` VALUES (1,1,'2017-05-14 00:00:00',1,'some note',1,NULL),(2,1,'2017-05-14 00:00:00',2,'some note',5,NULL),(3,1,'2017-05-14 00:00:00',3,'some note',5,NULL),(4,1,'2017-05-14 00:00:00',6,'some note',5,NULL);
/*!40000 ALTER TABLE `redi_spot_sent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_spot_sent_file`
--

DROP TABLE IF EXISTS `redi_spot_sent_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_spot_sent_file` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `spot_sent_id` bigint(22) DEFAULT NULL,
  `file_name` varchar(200) DEFAULT NULL,
  `file_description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent_file`
--

LOCK TABLES `redi_spot_sent_file` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent_file` DISABLE KEYS */;
INSERT INTO `redi_spot_sent_file` VALUES (1,4,'file one','some file desc'),(2,4,'file two',NULL),(3,4,'file one','some file desc'),(4,4,'file two',NULL),(5,4,'file one','some file desc'),(6,4,'file two',NULL),(7,4,'file one','some file desc'),(8,4,'file two',NULL);
/*!40000 ALTER TABLE `redi_spot_sent_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_spot_sent_to_customer_contact`
--

DROP TABLE IF EXISTS `redi_spot_sent_to_customer_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_spot_sent_to_customer_contact` (
  `spot_sent_id` bigint(22) NOT NULL,
  `customer_contact_id` int(11) NOT NULL,
  PRIMARY KEY (`spot_sent_id`,`customer_contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent_to_customer_contact`
--

LOCK TABLES `redi_spot_sent_to_customer_contact` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent_to_customer_contact` DISABLE KEYS */;
INSERT INTO `redi_spot_sent_to_customer_contact` VALUES (1,1),(1,2),(1,3),(2,1),(2,2),(2,3),(3,1),(3,2),(3,3),(4,1),(4,2),(4,3);
/*!40000 ALTER TABLE `redi_spot_sent_to_customer_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_spot_sent_to_spot_version`
--

DROP TABLE IF EXISTS `redi_spot_sent_to_spot_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_spot_sent_to_spot_version` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `spot_sent_id` bigint(22) DEFAULT NULL,
  `spot_id` bigint(22) DEFAULT NULL,
  `version_id` bigint(22) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent_to_spot_version`
--

LOCK TABLES `redi_spot_sent_to_spot_version` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent_to_spot_version` DISABLE KEYS */;
INSERT INTO `redi_spot_sent_to_spot_version` VALUES (29,4,1,2),(30,4,2,4);
/*!40000 ALTER TABLE `redi_spot_sent_to_spot_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_spot_sent_to_spot_version_to_editor_designer`
--

DROP TABLE IF EXISTS `redi_spot_sent_to_spot_version_to_editor_designer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_spot_sent_to_spot_version_to_editor_designer` (
  `spot_sent_spot_version_id` bigint(22) NOT NULL,
  `editor_designer_id` int(11) NOT NULL,
  PRIMARY KEY (`spot_sent_spot_version_id`,`editor_designer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent_to_spot_version_to_editor_designer`
--

LOCK TABLES `redi_spot_sent_to_spot_version_to_editor_designer` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent_to_spot_version_to_editor_designer` DISABLE KEYS */;
INSERT INTO `redi_spot_sent_to_spot_version_to_editor_designer` VALUES (29,1),(29,2),(29,3),(29,4),(29,5),(30,4),(30,9),(30,10);
/*!40000 ALTER TABLE `redi_spot_sent_to_spot_version_to_editor_designer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_spot_sent_to_work_stage`
--

DROP TABLE IF EXISTS `redi_spot_sent_to_work_stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_spot_sent_to_work_stage` (
  `spot_sent_id` bigint(22) NOT NULL,
  `work_stage_id` int(11) NOT NULL,
  PRIMARY KEY (`spot_sent_id`,`work_stage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent_to_work_stage`
--

LOCK TABLES `redi_spot_sent_to_work_stage` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent_to_work_stage` DISABLE KEYS */;
INSERT INTO `redi_spot_sent_to_work_stage` VALUES (4,4),(4,5),(4,7);
/*!40000 ALTER TABLE `redi_spot_sent_to_work_stage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_spot_sent_via_method`
--

DROP TABLE IF EXISTS `redi_spot_sent_via_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_spot_sent_via_method` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `work_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent_via_method`
--

LOCK TABLES `redi_spot_sent_via_method` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent_via_method` DISABLE KEYS */;
INSERT INTO `redi_spot_sent_via_method` VALUES (1,'Aspera',NULL,1),(2,'FTP / Transmit',NULL,1),(3,'Wiredrive',NULL,1),(4,'Hard Drive / Physical',NULL,1),(5,'Post',NULL,2),(6,'Fiber',NULL,2),(7,'Email',NULL,2),(8,'Messenger',NULL,2),(9,'Post',8,2),(10,'Fedex',8,2),(11,'Pickup',8,2);
/*!40000 ALTER TABLE `redi_spot_sent_via_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_spot_version`
--

DROP TABLE IF EXISTS `redi_spot_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_spot_version` (
  `spot_id` int(11) NOT NULL,
  `version_id` int(11) NOT NULL,
  `billing_type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`spot_id`,`version_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_version`
--

LOCK TABLES `redi_spot_version` WRITE;
/*!40000 ALTER TABLE `redi_spot_version` DISABLE KEYS */;
INSERT INTO `redi_spot_version` VALUES (58,1,NULL),(55,6,NULL),(55,1,NULL),(20,1,NULL),(2,21,NULL),(2,1,NULL),(2,6,NULL),(2,2,NULL),(58,3,NULL),(59,4,NULL),(59,8,NULL),(59,3,NULL),(60,1,NULL),(69,3,NULL),(64,2,NULL),(64,3,NULL),(64,4,NULL),(64,5,NULL),(64,7,NULL),(71,1,NULL),(73,1,NULL),(75,1,NULL),(75,2,NULL),(75,3,NULL),(75,5,NULL),(4,1,NULL),(55,4,NULL);
/*!40000 ALTER TABLE `redi_spot_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_staff`
--

DROP TABLE IF EXISTS `redi_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `rate` decimal(19,2) DEFAULT NULL,
  `min_hour` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_staff`
--

LOCK TABLES `redi_staff` WRITE;
/*!40000 ALTER TABLE `redi_staff` DISABLE KEYS */;
INSERT INTO `redi_staff` VALUES (1,'Assistant editor',30.00,8),(2,'Senior editor',25.00,8),(3,'JuniorEditor 1',30.00,8),(4,'Junior Editor',22.00,8);
/*!40000 ALTER TABLE `redi_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_status`
--

DROP TABLE IF EXISTS `redi_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_status`
--

LOCK TABLES `redi_status` WRITE;
/*!40000 ALTER TABLE `redi_status` DISABLE KEYS */;
INSERT INTO `redi_status` VALUES (1,'Draft'),(2,'Final'),(3,'Under Review'),(4,'Approved'),(5,'Sent To Customer');
/*!40000 ALTER TABLE `redi_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_time_entry`
--

DROP TABLE IF EXISTS `redi_time_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_time_entry` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  `spot_id` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `duration` decimal(19,2) DEFAULT NULL,
  `activity_type_id` int(11) DEFAULT NULL,
  `activity_description` text,
  `notes` text,
  `non_billable` smallint(1) DEFAULT NULL COMMENT '0/1',
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_time_entry`
--

LOCK TABLES `redi_time_entry` WRITE;
/*!40000 ALTER TABLE `redi_time_entry` DISABLE KEYS */;
INSERT INTO `redi_time_entry` VALUES (25,1,NULL,NULL,NULL,NULL,'2017-01-12 01:30:00',1.15,4,'','',0,1,'2017-01-12 13:51:23',3),(24,47,NULL,NULL,NULL,NULL,'2017-01-11 20:45:28',1.00,4,'','',0,47,'2017-01-10 14:59:39',1),(23,47,NULL,NULL,NULL,NULL,'2017-01-10 20:45:03',1.00,4,'','',0,47,'2017-01-10 14:56:28',1),(22,47,NULL,NULL,NULL,NULL,'2017-01-10 20:30:13',1.00,22,'','',0,47,'2017-01-10 14:39:30',1),(21,47,10,38,NULL,NULL,'2017-01-10 20:30:36',1.00,5,'','',0,47,'2017-01-10 14:38:20',1),(19,47,NULL,NULL,NULL,NULL,'2017-01-09 11:00:24',1.00,22,'','Here are some lorem ipsum notes',0,47,'2017-01-09 03:32:55',1),(20,47,NULL,NULL,NULL,NULL,'2017-01-10 14:00:03',8.00,4,'','',0,47,'2017-01-10 14:33:53',1),(18,47,1,1,NULL,5,'2017-01-09 14:00:00',1.30,14,'','Optional notes....',0,47,'2017-01-09 03:05:39',1),(26,1,5,NULL,NULL,NULL,'2017-01-12 01:30:00',1.30,1,'','',0,1,'2017-01-12 13:56:55',3),(27,1,NULL,NULL,NULL,NULL,'2017-01-13 01:00:02',1.30,4,'','',0,1,'2017-01-12 17:46:14',1),(28,1,NULL,NULL,NULL,NULL,'2017-01-13 04:45:02',2.15,22,'','',0,1,'2017-01-12 17:54:04',1),(29,1,1,1,2,1,'2017-01-16 06:15:18',1.00,1,'','',0,1,'2017-01-17 06:25:31',1),(30,1,1,NULL,NULL,NULL,'2017-01-16 15:30:18',2.00,21,'','',0,1,'2017-01-20 09:34:08',1),(31,1,1,1,2,1,'2017-01-24 11:00:04',3.00,5,'','Editorial works completed.',0,1,'2017-01-24 12:44:08',1);
/*!40000 ALTER TABLE `redi_time_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_user`
--

DROP TABLE IF EXISTS `redi_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `initials` varchar(20) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `token_created` datetime DEFAULT NULL,
  `reset_token` varchar(100) DEFAULT NULL,
  `hourly_rate` decimal(19,2) DEFAULT NULL,
  `salary_type` char(1) DEFAULT NULL COMMENT 'h=hourly, s=salary',
  `salary_amount` decimal(19,2) DEFAULT NULL,
  `min_hour` int(11) DEFAULT NULL,
  `last_login_date` datetime DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `status` smallint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user`
--

LOCK TABLES `redi_user` WRITE;
/*!40000 ALTER TABLE `redi_user` DISABLE KEYS */;
INSERT INTO `redi_user` VALUES (1,'suda','0d107d09f5bbe40cade3de5c71e9e9b7','suda.sampath@indydutch.com','Suda','Sampath','SS','1.jpeg',100,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-01-31 18:57:21',NULL,1),(2,'kansoftkant','0cc175b9c0f1b6a831c399e269772661','kansoftkant@gmail.com','Hans','Kant','HK','2.jpeg',1,NULL,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,1),(3,'webhkp','bce119cb4ae210927afeb7a9d79496f0','webhkp11889@gmail.com','Rizwan','Kader','RK','three.png',1,NULL,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,1),(4,'AndyAustin','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Andy','Austin','AA',NULL,1,NULL,NULL,NULL,9.47,NULL,NULL,8,NULL,NULL,1),(5,'AlexKroll','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Alex','Kroll','AK',NULL,1,NULL,NULL,NULL,34.20,NULL,NULL,8,NULL,NULL,1),(6,'AlexWagner','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Alex','Wagner','AW',NULL,1,NULL,NULL,NULL,34.20,NULL,NULL,8,NULL,NULL,1),(7,'BalindaHuang','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Balinda','Huang','BH',NULL,1,NULL,NULL,NULL,50.78,NULL,NULL,8,NULL,NULL,1),(8,'BenVance','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Ben','Vance','BV',NULL,1,NULL,NULL,NULL,34.81,NULL,NULL,8,NULL,NULL,1),(9,'BethRoy','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Beth','Roy','BR',NULL,1,NULL,NULL,NULL,56.55,NULL,NULL,8,NULL,NULL,1),(10,'BillRude','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Bill','Rude','BRude',NULL,1,NULL,NULL,NULL,41.05,NULL,NULL,8,NULL,NULL,1),(11,'BradBerling','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Brad','Berling','BB',NULL,1,NULL,NULL,NULL,51.56,NULL,NULL,8,NULL,NULL,1),(12,'BruceSchluter','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Bruce','Schluter','BS',NULL,1,NULL,NULL,NULL,39.47,NULL,NULL,8,NULL,NULL,1),(13,'ChrisBrown','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Chris','Brown','CB',NULL,1,NULL,NULL,NULL,47.89,NULL,NULL,8,NULL,NULL,1),(14,'ChrisDehm','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Chris','Dehm','CD',NULL,1,NULL,NULL,NULL,34.20,NULL,NULL,8,NULL,NULL,1),(15,'CarloFloers','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Carlo','Floers','CF',NULL,1,NULL,NULL,NULL,44.13,NULL,NULL,8,NULL,NULL,1),(16,'ChrisHawkins','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Chris','Hawkins','CH',NULL,1,NULL,NULL,NULL,47.80,NULL,NULL,8,NULL,NULL,1),(17,'ChelseaHeneise','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Chelsea','Heneise','CHELH',NULL,1,NULL,NULL,NULL,52.00,NULL,NULL,8,NULL,NULL,1),(18,'DaveDrage','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Dave','Drage','DD',NULL,1,NULL,NULL,NULL,38.70,NULL,NULL,8,NULL,NULL,1),(19,'DanielKim','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Daniel','Kim','DK',NULL,1,NULL,NULL,NULL,22.37,NULL,NULL,8,NULL,NULL,1),(20,'DaveMealer','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Dave','Mealer','DM',NULL,1,NULL,NULL,NULL,26.31,NULL,NULL,8,NULL,NULL,1),(21,'DawnChenette','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Dawn','Chenette','DC',NULL,1,NULL,NULL,NULL,18.42,NULL,NULL,8,NULL,NULL,1),(22,'DiegoStehle','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Diego','Stehle','DS',NULL,1,NULL,NULL,NULL,18.20,NULL,NULL,8,NULL,NULL,1),(23,'FredGago','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Fred','Gago','FG',NULL,1,NULL,NULL,NULL,39.00,NULL,NULL,8,NULL,NULL,1),(24,'GrahamClark','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Graham','Clark','GC',NULL,1,NULL,NULL,NULL,44.00,NULL,NULL,8,NULL,NULL,1),(25,'HalForsstrom','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Hal','Forsstrom','HF',NULL,1,NULL,NULL,NULL,45.00,NULL,NULL,8,NULL,NULL,1),(26,'HarumiShibano','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Harumi','Shibano','HS',NULL,1,NULL,NULL,NULL,33.00,NULL,NULL,8,NULL,NULL,1),(27,'JillDadducci','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Jill','Dadducci','JD',NULL,1,NULL,NULL,NULL,34.00,NULL,NULL,8,NULL,NULL,1),(28,'JonathanReyes','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Jonathan','Reyes','JR',NULL,1,NULL,NULL,NULL,24.00,NULL,NULL,8,NULL,NULL,1),(29,'JanSachs','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Jan','Sachs','JS',NULL,1,NULL,NULL,NULL,45.00,NULL,NULL,8,NULL,NULL,1),(30,'KevinCahill','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Kevin','Cahill','KC',NULL,1,NULL,NULL,NULL,34.00,NULL,NULL,8,NULL,NULL,1),(31,'KeithKolod','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Keith','Kolod','KK',NULL,1,NULL,NULL,NULL,36.00,NULL,NULL,8,NULL,NULL,1),(32,'KateLynn','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Kate','Lynn','KL',NULL,1,NULL,NULL,NULL,13.00,NULL,NULL,8,NULL,NULL,1),(33,'KeithPang','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Keith','Pang','KP',NULL,1,NULL,NULL,NULL,45.00,NULL,NULL,8,NULL,NULL,1),(34,'KyleRomaneck','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Kyle','Romaneck','KR',NULL,1,NULL,NULL,NULL,39.00,NULL,NULL,8,NULL,NULL,1),(35,'MannyHernadez','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Manny','Hernadez','MH',NULL,1,NULL,NULL,NULL,16.00,NULL,NULL,8,NULL,NULL,1),(36,'MakKern','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Mak','Kern','MK',NULL,1,NULL,NULL,NULL,33.00,NULL,NULL,8,NULL,NULL,1),(37,'MaryMiagowicz','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Mary','Miagowicz','MM',NULL,1,NULL,NULL,NULL,11.00,NULL,NULL,8,NULL,NULL,1),(38,'MiraMilkova','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Mira','Milkova','MIRA',NULL,1,NULL,NULL,NULL,23.00,NULL,NULL,8,NULL,NULL,1),(39,'MelissaReeck','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Melissa','Reeck','MR',NULL,1,NULL,NULL,NULL,18.00,NULL,NULL,8,NULL,NULL,1),(40,'NaharaPacheco','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Nahara','Pacheco','NP',NULL,1,NULL,NULL,NULL,41.00,NULL,NULL,8,NULL,NULL,1),(41,'NicolaiStrehl','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Nicolai','Strehl','NS',NULL,1,NULL,NULL,NULL,49.00,NULL,NULL,8,NULL,NULL,1),(42,'PiaAlvendia','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Pia','Alvendia','PA',NULL,1,NULL,NULL,NULL,16.00,NULL,NULL,8,NULL,NULL,1),(43,'RoyCullen','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Roy','Cullen','RC',NULL,1,NULL,NULL,NULL,50.00,NULL,NULL,8,NULL,NULL,1),(44,'VincentDangelo','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Vincent','Dangelo','VD',NULL,1,NULL,NULL,NULL,37.00,NULL,NULL,8,NULL,NULL,1),(45,'WaylandVida','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Wayland','Vida','WV',NULL,1,NULL,NULL,NULL,41.00,NULL,NULL,8,NULL,NULL,1),(46,'RicardoCastro','0d107d09f5bbe40cade3de5c71e9e9b7',NULL,'Ricardo','Castro','RCastro',NULL,1,NULL,NULL,NULL,40.00,NULL,NULL,8,NULL,NULL,1),(47,'vidua','0d107d09f5bbe40cade3de5c71e9e9b7','greg@vidua.pl','Greg','Widla','GW','47.jpeg',100,NULL,'2016-12-14 14:45:35',NULL,NULL,NULL,NULL,8,NULL,NULL,1),(48,'demo','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Demo','User','DU',NULL,100,NULL,NULL,NULL,NULL,NULL,NULL,8,NULL,NULL,1),(49,'editor','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Sample','Editor','SE',NULL,1,NULL,NULL,NULL,30.00,NULL,NULL,8,NULL,NULL,1),(50,'designer','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Sample','Designer','SD',NULL,2,NULL,NULL,NULL,30.00,NULL,NULL,8,NULL,NULL,1),(51,'producer','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Sample','Producer','SP',NULL,3,NULL,'2017-03-16 21:52:57',NULL,NULL,NULL,NULL,8,NULL,NULL,1),(52,'billing','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Sample','Billing','SB',NULL,4,NULL,'2017-03-16 21:52:57',NULL,NULL,NULL,NULL,8,NULL,NULL,1),(53,'writer','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Sample','Writer','SW',NULL,5,NULL,'2017-03-16 21:52:57',NULL,NULL,NULL,NULL,8,NULL,NULL,1),(54,'musician','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Sample','Musician','SM',NULL,6,NULL,'2017-03-16 21:52:57',NULL,NULL,NULL,NULL,8,NULL,NULL,1),(55,'manager','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Sample','Manager','SMgt',NULL,7,NULL,'2017-03-16 21:52:57',NULL,NULL,NULL,NULL,8,NULL,NULL,1),(56,'producer2','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Second','Producer','SP2',NULL,3,NULL,'2017-03-16 21:52:57',NULL,NULL,NULL,NULL,8,NULL,NULL,1),(57,'producer3','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Third','Producer','SP3',NULL,3,NULL,'2017-03-16 21:52:57',NULL,NULL,NULL,NULL,8,NULL,NULL,1),(58,'manager2','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Second','Manager','SMgt2',NULL,7,NULL,'2017-03-16 21:52:57',NULL,NULL,NULL,NULL,8,NULL,NULL,1),(59,'manager3','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Third','Manager','SMgt3',NULL,7,NULL,'2017-03-16 21:52:57',NULL,NULL,NULL,NULL,8,NULL,NULL,1),(60,'admin','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Admin','User','AU',NULL,99,NULL,'2017-08-02 17:04:28',NULL,NULL,NULL,NULL,NULL,'2017-08-02 17:04:33','2017-08-02 17:04:34',1),(61,'gfxteam','0d107d09f5bbe40cade3de5c71e9e9b7','info@indydutch.com','Graphics','Team','GT',NULL,8,NULL,'2017-08-07 21:22:53',NULL,NULL,NULL,NULL,8,'2017-08-07 21:23:00','2017-08-07 21:23:03',1);
/*!40000 ALTER TABLE `redi_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_user_access`
--

DROP TABLE IF EXISTS `redi_user_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user_access` (
  `user_type_id` int(11) NOT NULL,
  `can_access_basic_data` tinyint(1) DEFAULT NULL,
  `can_access_extra_data` tinyint(1) DEFAULT NULL,
  `can_edit` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`user_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_access`
--

LOCK TABLES `redi_user_access` WRITE;
/*!40000 ALTER TABLE `redi_user_access` DISABLE KEYS */;
INSERT INTO `redi_user_access` VALUES (1,1,NULL,NULL),(2,1,NULL,NULL),(3,1,1,NULL),(4,1,1,NULL),(5,1,NULL,NULL),(6,1,NULL,NULL),(7,1,1,NULL),(8,1,1,NULL),(9,1,NULL,NULL),(10,1,1,NULL),(11,1,NULL,NULL),(12,1,1,NULL),(14,1,NULL,NULL),(15,1,NULL,NULL),(16,1,1,NULL),(17,1,1,NULL),(18,1,NULL,NULL),(19,1,NULL,NULL),(20,1,NULL,NULL),(21,1,1,NULL),(22,1,1,NULL),(23,1,1,NULL),(24,1,1,NULL),(25,1,1,NULL),(26,1,1,NULL),(27,1,1,NULL),(28,1,NULL,NULL),(29,1,1,NULL),(30,1,1,NULL),(99,1,1,1),(100,1,1,1);
/*!40000 ALTER TABLE `redi_user_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_user_role`
--

DROP TABLE IF EXISTS `redi_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_role`
--

LOCK TABLES `redi_user_role` WRITE;
/*!40000 ALTER TABLE `redi_user_role` DISABLE KEYS */;
INSERT INTO `redi_user_role` VALUES (1,'Editor'),(2,'Designer'),(3,'Producer'),(4,'Writer'),(5,'Musician'),(6,'Manager'),(7,'Lead Procucer');
/*!40000 ALTER TABLE `redi_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_user_type`
--

DROP TABLE IF EXISTS `redi_user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1021 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_type`
--

LOCK TABLES `redi_user_type` WRITE;
/*!40000 ALTER TABLE `redi_user_type` DISABLE KEYS */;
INSERT INTO `redi_user_type` VALUES (1,'Editor'),(2,'Graphic Designer'),(3,'Producer'),(4,'Billing Coordinator'),(99,'Adminstrator'),(5,'Writer'),(6,'Musicican'),(7,'Manager'),(100,'Super Administrator'),(8,'Graphics Team'),(10,'Senior Billing'),(11,'Music Manager'),(12,'Editorial Manager'),(9,'Admin'),(14,'Admin Manager'),(15,'Assitant Editor'),(16,'Finishing Manager'),(17,'Creative Manager'),(18,'Finishing'),(19,'Games Capture Aritist'),(20,'Games Manager'),(21,'Graphics Coordinator'),(22,'Graphics Dept Heads'),(23,'HR'),(24,'IT'),(25,'IT Manager'),(26,'Production Assistant'),(27,'Production Coordinator'),(28,'Writer Manager'),(29,'Senior Management'),(30,'Owners');
/*!40000 ALTER TABLE `redi_user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_version`
--

DROP TABLE IF EXISTS `redi_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_version` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_version`
--

LOCK TABLES `redi_version` WRITE;
/*!40000 ALTER TABLE `redi_version` DISABLE KEYS */;
INSERT INTO `redi_version` VALUES (1,'1'),(2,'1A'),(3,'1B'),(4,'1 Alt'),(5,'1 Rev'),(6,'2'),(7,'2A'),(8,'2B'),(9,'2 Alt'),(10,'2 Rev'),(11,'3'),(12,'3A'),(13,'3B'),(14,'3 Alt'),(15,'3 Rev'),(16,'4'),(17,'4A'),(18,'4B'),(19,'4 Alt'),(20,'4 Rev'),(21,'5'),(22,'5A'),(23,'5B'),(24,'5 Alt'),(25,'5 Rev'),(26,'6'),(27,'6A'),(28,'6B'),(29,'6 Alt'),(30,'6 Rev'),(31,'7'),(32,'7A'),(33,'7B'),(34,'7 Alt'),(35,'7 Rev'),(36,'8'),(37,'8A'),(38,'8B'),(39,'8 Alt'),(40,'8 Rev'),(41,'9'),(42,'9A'),(43,'9B'),(44,'9 Alt'),(45,'9 Rev'),(46,'10'),(47,'10A'),(48,'10B'),(49,'10 Alt'),(50,'10 Rev');
/*!40000 ALTER TABLE `redi_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_work_stage`
--

DROP TABLE IF EXISTS `redi_work_stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_work_stage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `work_stage` varchar(100) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_work_stage`
--

LOCK TABLES `redi_work_stage` WRITE;
/*!40000 ALTER TABLE `redi_work_stage` DISABLE KEYS */;
INSERT INTO `redi_work_stage` VALUES (1,'Active work',NULL),(2,'Finishing Prep',NULL),(3,'Finished Spot',NULL),(4,'Audio Prep',2),(5,'Picture Prep',2),(6,'Unmatted',2),(7,'Other',2),(8,'MX Cue Sheet Sent',2),(9,'VO Artist',2),(10,'Final Version In-House',2),(11,'Creative Approval',3),(12,'Technical Approval',3),(13,'Delivery / Ingest',3),(14,'Submasters / Assets',3);
/*!40000 ALTER TABLE `redi_work_stage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_work_type`
--

DROP TABLE IF EXISTS `redi_work_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_work_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `work_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_work_type`
--

LOCK TABLES `redi_work_type` WRITE;
/*!40000 ALTER TABLE `redi_work_type` DISABLE KEYS */;
INSERT INTO `redi_work_type` VALUES (1,'Design'),(2,'Audio/Visual');
/*!40000 ALTER TABLE `redi_work_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'buddha_jones'
--

--
-- Dumping routines for database 'buddha_jones'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-01  6:19:59

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
  `name` varchar(255) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `description_required` smallint(1) DEFAULT '0',
  `billable` smallint(1) DEFAULT '1',
  `project_campaign_required` tinyint(1) DEFAULT '0',
  `project_campaign_spot_version_required` tinyint(1) DEFAULT '0',
  `files_included` tinyint(1) DEFAULT '0',
  `status` smallint(1) DEFAULT '1',
  `allowed_in_future` smallint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_activity`
--

LOCK TABLES `redi_activity` WRITE;
/*!40000 ALTER TABLE `redi_activity` DISABLE KEYS */;
INSERT INTO `redi_activity` VALUES (1,'AE Work (NOT Dailies)',1,1,1,1,1,0,1,0),(2,'Breakdown Movie',2,0,1,1,0,0,1,0),(3,'Business Development',2,0,1,0,0,0,1,0),(4,'Dailies Assembly',1,0,1,1,0,0,1,0),(5,'Dailies Import',1,0,1,1,0,0,1,0),(6,'Dialogue Breakdown',2,0,1,1,0,0,1,0),(7,'Downtime (add details)',3,1,1,0,0,0,1,0),(8,'Edit',1,0,1,1,1,0,1,0),(9,'Editing on Fiber',1,0,1,1,1,0,1,0),(10,'Fiber',1,0,1,1,0,0,1,0),(11,'Finish Audio Mix',1,0,1,1,1,0,1,0),(12,'Finish Online',1,0,1,1,1,0,1,0),(13,'Finish Prep',1,1,1,1,1,1,1,0),(14,'Finish Supervision',1,0,1,1,0,0,1,0),(15,'Game Capture',1,0,1,1,0,0,1,0),(16,'General Production',2,0,1,0,0,0,1,0),(17,'Graphic Design',1,0,1,1,0,1,1,0),(18,'Graphic Finish',1,0,1,1,1,1,1,0),(19,'Graphic Styleframes/Boards',1,0,1,1,0,1,1,0),(20,'Graphic Work in Downtime',1,0,1,1,0,1,1,0),(21,'IT Work',3,0,1,1,0,0,1,0),(22,'Lunch Break',3,0,0,0,0,0,1,0),(23,'Meeting (Admin)',3,1,1,0,0,0,1,0),(24,'Meeting (Project Creative)',2,0,1,1,0,0,1,0),(25,'Music Composing',2,0,1,1,0,0,1,0),(26,'Music Creative',2,0,1,1,0,0,1,0),(27,'Music Cue Sheets',1,0,1,1,1,0,1,0),(28,'Music Licensing',2,0,1,1,0,0,1,0),(29,'Music Producing',2,0,1,1,0,0,1,0),(30,'Narration Supervision',1,0,1,0,0,0,1,0),(31,'Office/Admin',3,0,1,0,0,0,1,0),(32,'Produce',2,0,1,1,0,0,1,0),(33,'Screen Movie',2,0,1,1,1,0,1,0),(35,'Time Off (Unpaid)',3,0,1,0,0,0,1,1),(36,'Waiting (add details)',2,1,1,0,0,0,1,0),(37,'Writing',1,0,1,0,0,0,1,0),(40,'Trailer',4,0,0,0,0,0,1,0),(41,'Penalty Meal Pay',3,0,0,0,0,0,1,0),(42,'SUDA NEW',1,1,0,1,0,0,1,0);
/*!40000 ALTER TABLE `redi_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_activity_to_user_type`
--

DROP TABLE IF EXISTS `redi_activity_to_user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_activity_to_user_type` (
  `activity_id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  PRIMARY KEY (`activity_id`,`user_type_id`),
  KEY `activity_id` (`activity_id`),
  KEY `user_type_id` (`user_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_activity_to_user_type`
--

LOCK TABLES `redi_activity_to_user_type` WRITE;
/*!40000 ALTER TABLE `redi_activity_to_user_type` DISABLE KEYS */;
INSERT INTO `redi_activity_to_user_type` VALUES (1,2),(1,4),(1,23),(1,24),(1,25),(2,4),(2,6),(2,7),(2,21),(3,6),(3,20),(3,21),(3,28),(4,4),(5,4),(6,4),(7,1),(7,2),(7,3),(7,4),(7,5),(7,6),(7,7),(7,8),(7,9),(7,10),(7,11),(7,12),(7,13),(7,14),(7,15),(7,16),(7,17),(7,18),(7,19),(7,20),(7,21),(7,22),(7,23),(7,24),(7,25),(7,26),(7,27),(7,28),(7,100),(8,4),(8,7),(8,21),(9,4),(9,7),(9,21),(10,6),(10,7),(10,21),(11,9),(12,4),(12,9),(13,4),(13,9),(13,23),(14,3),(14,9),(14,23),(15,10),(16,3),(16,4),(16,6),(16,7),(16,8),(16,9),(16,10),(16,11),(16,12),(16,13),(16,14),(16,18),(16,19),(16,21),(16,23),(16,26),(16,27),(17,12),(17,13),(17,14),(18,12),(18,13),(18,14),(19,12),(19,13),(19,14),(20,12),(20,13),(20,14),(21,16),(21,17),(22,1),(22,2),(22,3),(22,4),(22,5),(22,6),(22,7),(22,8),(22,9),(22,10),(22,11),(22,12),(22,13),(22,14),(22,15),(22,16),(22,17),(22,18),(22,19),(22,20),(22,21),(22,22),(22,23),(22,24),(22,25),(22,26),(22,27),(22,28),(22,100),(23,1),(23,2),(23,3),(23,4),(23,5),(23,6),(23,7),(23,8),(23,9),(23,10),(23,11),(23,12),(23,13),(23,14),(23,15),(23,16),(23,17),(23,18),(23,19),(23,20),(23,21),(23,22),(23,23),(23,24),(23,25),(23,26),(23,27),(23,28),(23,100),(24,1),(24,2),(24,3),(24,4),(24,5),(24,6),(24,7),(24,8),(24,9),(24,10),(24,11),(24,12),(24,13),(24,14),(24,15),(24,16),(24,17),(24,18),(24,19),(24,20),(24,21),(24,22),(24,23),(24,24),(24,25),(24,26),(24,27),(24,28),(24,100),(25,18),(25,19),(26,7),(26,18),(26,19),(27,4),(27,18),(27,19),(28,18),(28,19),(29,18),(29,19),(30,6),(30,9),(30,21),(31,1),(31,2),(31,5),(31,15),(31,16),(31,17),(31,20),(31,21),(31,24),(31,25),(31,28),(31,100),(32,6),(32,20),(32,21),(32,28),(33,1),(33,2),(33,3),(33,4),(33,5),(33,6),(33,7),(33,8),(33,9),(33,10),(33,11),(33,12),(33,13),(33,14),(33,15),(33,16),(33,17),(33,18),(33,19),(33,20),(33,21),(33,22),(33,23),(33,24),(33,25),(33,26),(33,27),(33,28),(33,100),(35,1),(35,2),(35,3),(35,4),(35,5),(35,6),(35,7),(35,8),(35,9),(35,10),(35,11),(35,12),(35,13),(35,14),(35,15),(35,16),(35,17),(35,18),(35,19),(35,20),(35,21),(35,22),(35,23),(35,24),(35,25),(35,26),(35,27),(35,28),(35,100),(36,7),(36,9),(36,12),(36,13),(36,14),(37,26),(37,27),(42,1),(45,100);
/*!40000 ALTER TABLE `redi_activity_to_user_type` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_activity_type`
--

LOCK TABLES `redi_activity_type` WRITE;
/*!40000 ALTER TABLE `redi_activity_type` DISABLE KEYS */;
INSERT INTO `redi_activity_type` VALUES (1,'Billable'),(2,'Non-Billable Timesheet'),(3,'Internal'),(4,'Rate Card');
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
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_billing`
--

LOCK TABLES `redi_billing` WRITE;
/*!40000 ALTER TABLE `redi_billing` DISABLE KEYS */;
INSERT INTO `redi_billing` VALUES (1,2,2,4,NULL,NULL,0,'2017-03-08 16:26:21'),(2,2,3,4,NULL,NULL,1,'2017-03-08 16:27:37'),(3,2,2,4,NULL,NULL,1,'2017-03-08 16:40:16'),(4,2,2,4,2,NULL,3,'2017-03-09 18:02:43'),(5,2,2,55,2,NULL,1,'2017-03-11 17:58:14'),(6,2,2,55,2,NULL,1,'2017-03-11 17:58:41'),(7,2,2,55,2,NULL,1,'2017-03-11 17:59:13'),(8,2,2,55,2,NULL,1,'2017-03-11 17:59:50'),(9,2,2,55,2,NULL,1,'2017-03-11 18:10:17'),(10,2,2,56,2,NULL,1,'2017-03-11 19:03:26'),(11,2,2,56,2,NULL,1,'2017-03-11 19:04:34'),(12,2,2,56,2,NULL,1,'2017-03-11 19:05:36');
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
INSERT INTO `redi_billing_activity` VALUES (3,9,90.80,7.00),(4,9,90.80,7.00),(8,2,90.80,7.00),(9,5,90.80,7.00),(10,4,90.80,7.30),(11,5,90.80,7.00),(12,9,90.80,7.00),(10,5,30.00,5.45);
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
INSERT INTO `redi_billing_approval` VALUES (4,1,1),(4,2,1),(4,6,1),(4,7,1),(4,4,1),(4,9,1),(8,3,0),(8,4,0),(8,6,0),(8,8,0),(9,3,0),(9,4,1),(9,6,0),(9,8,1);
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
INSERT INTO `redi_billing_estimate` VALUES (1,2),(1,8),(2,2),(2,8),(3,2),(3,8),(4,2),(4,8),(8,2),(8,8),(9,2),(9,8),(10,2),(10,8),(11,2),(11,8),(12,2),(12,8),(12,10),(12,12),(12,13);
/*!40000 ALTER TABLE `redi_billing_estimate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_billing_line`
--

DROP TABLE IF EXISTS `redi_billing_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_billing_line` (
  `line_id` bigint(22) NOT NULL AUTO_INCREMENT,
  `bill_id` bigint(22) DEFAULT NULL,
  `spot_id` bigint(20) DEFAULT NULL,
  `description` text,
  `rate_type` char(1) DEFAULT NULL,
  `hours` varchar(45) DEFAULT NULL,
  `rate` decimal(19,2) DEFAULT NULL,
  `total_before_discount` decimal(19,2) DEFAULT NULL,
  `discount` decimal(19,2) DEFAULT NULL,
  `total` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`line_id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_billing_line`
--

LOCK TABLES `redi_billing_line` WRITE;
/*!40000 ALTER TABLE `redi_billing_line` DISABLE KEYS */;
INSERT INTO `redi_billing_line` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,4,NULL,'Editing v2','F','9.3',150.50,NULL,NULL,1500.00),(25,4,NULL,'Editing v1','F','9.3',50.50,NULL,NULL,500.00);
/*!40000 ALTER TABLE `redi_billing_line` ENABLE KEYS */;
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
  `campaign_name` varchar(50) DEFAULT NULL,
  `description` text,
  `editor_req` text,
  `material_received` datetime DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_campaign`
--

LOCK TABLES `redi_campaign` WRITE;
/*!40000 ALTER TABLE `redi_campaign` DISABLE KEYS */;
INSERT INTO `redi_campaign` VALUES (1,'Theatrical Digital',NULL,NULL,NULL,NULL),(2,'Theatrical Radio',NULL,NULL,NULL,NULL),(3,'Theatrical Sizzle/Reel',NULL,NULL,NULL,NULL),(4,'Theatrical Teaser/Trailer',NULL,NULL,NULL,NULL),(5,'Theatrical TV',NULL,NULL,NULL,NULL),(6,'Theatrical Work',NULL,NULL,NULL,NULL),(7,'Broadcast',NULL,NULL,NULL,NULL),(8,'Comic-con',NULL,NULL,NULL,NULL),(9,'Games',NULL,NULL,NULL,NULL),(10,'Graphics',NULL,NULL,NULL,NULL),(11,'Theatrical Streaming',NULL,NULL,NULL,NULL),(12,'Streaming',NULL,NULL,NULL,NULL),(72,'Teaser Eugene',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `redi_campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_campaign_channel`
--

DROP TABLE IF EXISTS `redi_campaign_channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_campaign_channel` (
  `campaign_id` int(11) NOT NULL,
  `channel_id` int(11) NOT NULL,
  PRIMARY KEY (`campaign_id`,`channel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_campaign_channel`
--

LOCK TABLES `redi_campaign_channel` WRITE;
/*!40000 ALTER TABLE `redi_campaign_channel` DISABLE KEYS */;
INSERT INTO `redi_campaign_channel` VALUES (1,1),(1,8),(2,2),(2,8),(3,2),(3,8),(4,2),(4,8),(5,2),(5,8),(6,2),(6,8),(7,3),(7,8),(8,2),(8,8),(9,4),(9,8),(10,5),(10,8),(11,6),(11,8),(12,7),(12,8);
/*!40000 ALTER TABLE `redi_campaign_channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_channel`
--

DROP TABLE IF EXISTS `redi_channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_channel` (
  `channel_id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`channel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_channel`
--

LOCK TABLES `redi_channel` WRITE;
/*!40000 ALTER TABLE `redi_channel` DISABLE KEYS */;
INSERT INTO `redi_channel` VALUES (1,'Digital'),(2,'AV'),(3,'Broadcast'),(4,'Games'),(5,'Graphics'),(6,'Theatrical Streaming'),(7,'TV Streaming'),(8,'Narration');
/*!40000 ALTER TABLE `redi_channel` ENABLE KEYS */;
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
  `studio_id` int(11) DEFAULT NULL,
  `cardcode` varchar(15) DEFAULT NULL,
  `cardname` varchar(100) DEFAULT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`studio_id`),
  KEY `cardcode` (`cardcode`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer`
--

LOCK TABLES `redi_customer` WRITE;
/*!40000 ALTER TABLE `redi_customer` DISABLE KEYS */;
INSERT INTO `redi_customer` VALUES (1,1,'C00334','Corey Schmidt','Corey Schmidt'),(2,1,'C00583','Danielle Wright','Danielle Wright'),(3,1,'C00341','Dave Dore','Dave Dore\r\n'),(4,1,'C00544','Dean McFlicker','Dean McFlicker\r\n'),(5,1,'C00455','Kendall Bowlin','Kendall Bowlin\r\n'),(6,1,'C00595','Noah Gallico','Noah Gallico\r\n'),(7,1,'C00395','Samantha Jukes-Adams','Samantha Jukes-Adams'),(8,1,'C00500','Scott Herbst','Scott Herbst\r\n'),(9,2,'C00722','Bianka Cisneros','Bianka Cisneros'),(10,2,'C00294','Elisa Iovine','Elisa Iovine\r\n'),(11,2,'C00702','Ariadne Chucholowski','Ariadne Chucholowski\r\n'),(12,2,'C00089','John Stanford','John Stanford\r\n'),(13,2,'C00235','Brian Worsley','Brian Worsley\r\n'),(14,2,'C00720','Brittany Beane','Brittany Beane\r\n'),(15,2,'C00496','Mitchell Davis',' Mitchell Davis\r\n'),(16,2,'C00748','Amanda Miller','Amanda Miller\r\n'),(17,2,'C00306','Christelle Egan','Christelle Egan\r\n'),(18,2,'C00247','Conrad Ellingsworth','Conrad Ellingsworth\r\n'),(19,2,'C00310','Ingrid Enson','Ingrid Enson\r\n'),(20,2,'C00321','Isabel Henderson','Isabel Henderson\r\n'),(21,2,'C00023','Jim Fredrick','Jim Fredrick\r\n'),(22,2,'C00366','John Codi','John Codi\r\n'),(23,2,'C00712','Katy Leigh','Katy Leigh\r\n'),(24,2,'C00118','Keri Moore','Keri Moore\r\n'),(25,2,'C00683','Loren Schwartz','Loren Schwartz\r\n'),(26,2,'C00370','Louis DeMangus','Louis DeMangus\r\n'),(27,2,'C00022','Michelle Jackino','Michelle Jackino\r\n'),(28,2,'C00699','Nick Denogeon','Nick Denogeon\r\n'),(29,2,'C00386','Ryan Pickens','Ryan Pickens\r\n'),(30,2,'C00024','Samantha Bird','Samantha Bird\r\n'),(31,2,'C00081','Stacy Osugi','Stacy Osugi\r\n'),(32,2,'C00632','Susan Brenner','Susan Brenner\r\n'),(33,3,'C00581','Alyson Bradshaw','Alyson Bradshaw\r\n'),(34,3,'C00611','Daniel Zibulsky','Daniel Zibulsky\r\n'),(35,3,'C00606','Erin Dee','Erin Dee\r\n'),(36,3,'C00735','Andrew Thomas','Andrew Thomas\r\n'),(37,3,'C00615','Chris Denniston','Chris Denniston\r\n'),(38,3,'C00588','Melora Soodalter','Melora Soodalter\r\n'),(39,3,'C00627','Natalia Echeverria','Natalia Echeverria\r\n');
/*!40000 ALTER TABLE `redi_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_customer_back`
--

DROP TABLE IF EXISTS `redi_customer_back`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_customer_back` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cardcode` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cardcode` (`cardcode`)
) ENGINE=MyISAM AUTO_INCREMENT=188 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_back`
--

LOCK TABLES `redi_customer_back` WRITE;
/*!40000 ALTER TABLE `redi_customer_back` DISABLE KEYS */;
INSERT INTO `redi_customer_back` VALUES (1,NULL,'NBC Universal'),(2,NULL,'Warner Bros.'),(3,NULL,'HBO'),(4,NULL,'2K Games'),(5,NULL,'505 Games'),(6,NULL,'72andSunny'),(7,NULL,'A24'),(8,NULL,'ABC Entertainment'),(9,NULL,'Activision'),(10,NULL,'AIAS'),(11,NULL,'Alcon Entertainment\r\n'),(12,NULL,'Alliance Films\r\n'),(13,NULL,'Amazon\r\n'),(14,NULL,'Anchor Bay Ent\r\n'),(15,NULL,'Annapurna Pictures\r\n'),(16,NULL,'Arenas\r\n'),(17,NULL,'Articulus Ent.\r\n'),(18,NULL,'Atari, Inc\r\n'),(19,NULL,'Atlas Entertainment\r\n'),(20,NULL,'AwesomenessTV\r\n'),(21,NULL,'Backroom Int\'l\r\n'),(22,NULL,'Bandito Brothers\r\n'),(23,NULL,'Believe Media\r\n'),(24,NULL,'Bethesda\r\n'),(25,NULL,'Black Label Media\r\n'),(26,NULL,'Bleecker Street\r\n'),(27,NULL,'Blizzard Ent.\r\n'),(28,NULL,'Bloom Media\r\n'),(29,NULL,'Blumhouse Prod.\r\n'),(30,NULL,'Boies Schiller Films\r\n'),(31,NULL,'Boom! Studio\r\n'),(32,NULL,'Broad Green Pictures\r\n'),(33,NULL,'Buddha Jones\r\n'),(34,NULL,'Buena Vista\r\n'),(35,NULL,'Capcom Entertainment\r\n'),(36,NULL,'CBS Films\r\n'),(37,NULL,'CBS TV\r\n'),(38,NULL,'CD Projekt\r\n'),(39,NULL,'Cinemarket Film\r\n'),(40,NULL,'Cinemax\r\n'),(41,NULL,'City Interactive\r\n'),(42,NULL,'Columbia\r\n'),(43,NULL,'Creative Artists Age\r\n'),(44,NULL,'Creative Future\r\n'),(45,NULL,'Crystal Dynamics\r\n'),(46,NULL,'Current Entertainmen\r\n'),(47,NULL,'CW TV Network\r\n'),(48,NULL,'Dance On\r\n'),(49,NULL,'Daredevil Films\r\n'),(50,NULL,'Demarest Films\r\n'),(51,NULL,'Dimension\r\n'),(52,NULL,'Discovery\r\n'),(53,NULL,'Disney\r\n'),(54,NULL,'Disney Interactive\r\n'),(55,NULL,'Distant Horizon\r\n'),(56,NULL,'Dolby Laboratories\r\n'),(57,NULL,'Dreamworks Animation\r\n'),(58,NULL,'E! Entertainment\r\n'),(59,NULL,'EA Canada\r\n'),(60,NULL,'EDKO/ Irresistible\r\n'),(61,NULL,'Eidos Montreal\r\n'),(62,NULL,'Electronic Arts\r\n'),(63,NULL,'Electronic Arts Inc\r\n'),(64,NULL,'Element Films\r\n'),(65,NULL,'eOne Entertainment\r\n'),(66,NULL,'Epic Games\r\n'),(67,NULL,'Epix\r\n'),(68,NULL,'ESL Gaming\r\n'),(69,NULL,'Europacorp\r\n'),(70,NULL,'EXE Studio Global\r\n'),(71,NULL,'Factory Productions\r\n'),(72,NULL,'Fallen Angel Prod.\r\n'),(73,NULL,'Film Arcade\r\n'),(74,NULL,'Film District\r\n'),(75,NULL,'Film Nation Ent.\r\n'),(76,NULL,'Fishlabs\r\n'),(77,NULL,'Focus\r\n'),(78,NULL,'Fox\r\n'),(79,NULL,'Fox HE\r\n'),(80,NULL,'Fox Searchlight\r\n'),(81,NULL,'Fox Sports\r\n'),(82,NULL,'Fulfillment Fund\r\n'),(83,NULL,'Heat\r\n'),(84,NULL,'High Moon Studios\r\n'),(85,NULL,'History\r\n'),(86,NULL,'Home Box Office\r\n'),(87,NULL,'Hulu\r\n'),(88,NULL,'Icon Film\r\n'),(89,NULL,'IDW Entertainment\r\n'),(90,NULL,'IFC Films\r\n'),(91,NULL,'IGG\r\n'),(92,NULL,'IGP\r\n'),(93,NULL,'IMAX\r\n'),(94,NULL,'Independent\r\n'),(95,NULL,'Indomitable Ent.\r\n'),(96,NULL,'Informed Enterprises\r\n'),(97,NULL,'Koch Media\r\n'),(98,NULL,'Konami Digital Ent.\r\n'),(99,NULL,'KTM Film LLC\r\n'),(100,NULL,'Larger Than Life\r\n'),(101,NULL,'LD Entertainment\r\n'),(102,NULL,'Legendary\r\n'),(103,NULL,'Lifetime\r\n'),(104,NULL,'Lionsgate\r\n'),(105,NULL,'LM&O Advertising\r\n'),(106,NULL,'Lotus Entertainment\r\n'),(107,NULL,'M ss ng p eces\r\n'),(108,NULL,'Majesco Games\r\n'),(109,NULL,'Mandate\r\n'),(110,NULL,'Mark Burnett Prod.\r\n'),(111,NULL,'Matthew Cohen Create\r\n'),(112,NULL,'MGM/United Artists\r\n'),(113,NULL,'Microsoft Corp\r\n'),(114,NULL,'Millennium Films\r\n'),(115,NULL,'Miramax\r\n'),(116,NULL,'mOcean LA\r\n'),(117,NULL,'Mod Producciones\r\n'),(118,NULL,'Morgan Creek\r\n'),(119,NULL,'Motion Media Service\r\n'),(120,NULL,'MTV\r\n'),(121,NULL,'Mythology Enterterta\r\n'),(122,NULL,'Namco\r\n'),(123,NULL,'National Amusements\r\n'),(124,NULL,'National Geographic\r\n'),(125,NULL,'Naughty Dog\r\n'),(126,NULL,'Neo Art & Logic\r\n'),(127,NULL,'Netflix\r\n'),(128,NULL,'New Line\r\n'),(129,NULL,'New Regency Prod.\r\n'),(130,NULL,'Open Road Films\r\n'),(131,NULL,'Overture\r\n'),(132,NULL,'Pandemic\r\n'),(133,NULL,'Pandemic Marketing\r\n'),(134,NULL,'Paramount\r\n'),(135,NULL,'Picture Shack Ent\r\n'),(136,NULL,'Picturehouse\r\n'),(137,NULL,'Pivot TV Network\r\n'),(138,NULL,'Playstation\r\n'),(139,NULL,'Pocket Gems\r\n'),(140,NULL,'Privateer Holdings\r\n'),(141,NULL,'Providence St. Josep\r\n'),(142,NULL,'Pure F.P.S.\r\n'),(143,NULL,'Radical Ent\r\n'),(144,NULL,'Rainmaker Ent\r\n'),(145,NULL,'Reef Ent.\r\n'),(146,NULL,'Relativity Media\r\n'),(147,NULL,'Reload\r\n'),(148,NULL,'Respawn Ent\r\n'),(149,NULL,'Riders Production\r\n'),(150,NULL,'Roadshow Films\r\n'),(151,NULL,'Showtime\r\n'),(152,NULL,'Sierra Affinity\r\n'),(153,NULL,'Simon & Schuster\r\n'),(154,NULL,'Skinny Mic Prod.\r\n'),(155,NULL,'Skydance Interactive\r\n'),(156,NULL,'SModcast Pictures\r\n'),(157,NULL,'Soap Creative\r\n'),(158,NULL,'Sony Computer Ent Am\r\n'),(159,NULL,'Sony Pictures\r\n'),(160,NULL,'Sony/Screen Gems\r\n'),(161,NULL,'Special 83, LLC\r\n'),(162,NULL,'Stampede\r\n'),(163,NULL,'Starz Ent, LLC\r\n'),(164,NULL,'Studio Canal\r\n'),(165,NULL,'STX\r\n'),(166,NULL,'STX Entertainment\r\n'),(167,NULL,'Summit\r\n'),(168,NULL,'Summit/Lionsgate\r\n'),(169,NULL,'Supercell\r\n'),(170,NULL,'Survios\r\n'),(171,NULL,'TBS\r\n'),(172,NULL,'Tecmo Koei Am. Corp\r\n'),(173,NULL,'Tencent\r\n'),(174,NULL,'The Orchard\r\n'),(175,NULL,'The Rogue Initiative\r\n'),(176,NULL,'THQ Inc\r\n'),(177,NULL,'TNT\r\n'),(178,NULL,'Tooley Entertainment\r\n'),(179,NULL,'Tremolo Productions\r\n'),(180,NULL,'Turner Ent\r\n'),(181,NULL,'Ubisoft\r\n'),(182,NULL,'Universal\r\n'),(183,NULL,'UTV Ignition\r\n'),(184,NULL,'Water\'s End Prod.\r\n'),(185,NULL,'Wayfare Ent.\r\n'),(186,NULL,'Weinstein Company\r\n'),(187,NULL,'Xbox\r\n');
/*!40000 ALTER TABLE `redi_customer_back` ENABLE KEYS */;
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
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile_phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_contact`
--

LOCK TABLES `redi_customer_contact` WRITE;
/*!40000 ALTER TABLE `redi_customer_contact` DISABLE KEYS */;
INSERT INTO `redi_customer_contact` VALUES (1,1,'Corey Schmidt','Creative Exec','corey.schmidt@email.com','(226) 906-2721'),(2,2,'Danielle Wright','Creative Exec',NULL,NULL),(3,3,'Dave Dore\r\n','Creative Exec',NULL,NULL),(4,4,'Dean McFlicker','Creative Exec',NULL,NULL),(5,5,'Kendall Bowlin\r\n','Creative Exec',NULL,NULL),(6,6,'Noah Gallico\r\n','Creative Exec',NULL,NULL),(7,7,'Samantha Jukes-Adams','Creative Exec',NULL,NULL),(8,8,'Scott Herbst\r\n','Creative Exec',NULL,NULL),(9,9,'Bianka Cisneros','Creative Exec','Bianka.Cisneros@warnerbros.com',NULL),(10,10,'Elisa Iovine\r\n','Creative Exec','Elisa.Iovine@warnerbros.com\r\n',NULL),(11,11,'Ariadne Chucholowski\r\n','Creative Exec',NULL,NULL),(12,12,'John Stanford\r\n','Creative Exec',NULL,NULL),(13,13,'Brian Worsley\r\n','Creative Exec',NULL,NULL),(14,14,'Brittany Beane\r\n','Creative Exec',NULL,NULL),(15,15,' Mitchell Davis\r\n','Creative Exec',NULL,NULL),(16,16,'Amanda Miller\r\n','Creative Exec',NULL,NULL),(17,17,'Christelle Egan\r\n','Creative Exec',NULL,NULL),(18,18,'Conrad Ellingsworth\r\n','Creative Exec',NULL,NULL),(19,19,'Ingrid Enson\r\n','Creative Exec',NULL,NULL),(20,20,'Isabel Henderson\r\n','Creative Exec',NULL,NULL),(21,21,'Jim Fredrick\r\n','Creative Exec',NULL,NULL),(22,22,'John Codi\r\n','Creative Exec',NULL,NULL),(23,23,'Katy Leigh\r\n','Creative Exec',NULL,NULL),(24,24,'Keri Moore\r\n','Creative Exec',NULL,NULL),(25,25,'Loren Schwartz\r\n','Creative Exec',NULL,NULL),(26,26,'Louis DeMangus\r\n','Creative Exec',NULL,NULL),(27,27,'Michelle Jackino\r\n','Creative Exec',NULL,NULL),(28,28,'Nick Denogeon\r\n','Creative Exec',NULL,NULL),(29,29,'Ryan Pickens\r\n','Creative Exec',NULL,NULL),(30,30,'Samantha Bird\r\n','Creative Exec',NULL,NULL),(31,31,'Stacy Osugi\r\n','Creative Exec',NULL,NULL),(32,32,'Susan Brenner\r\n','Creative Exec',NULL,NULL),(33,33,'Alyson Bradshaw\r\n','Creative Exec','Alyson.Bradshaw@hbo.com\r\n',NULL),(34,34,'Daniel Zibulsky\r\n','Creative Exec','Daniel.Zibulsky@hbo.com\r\n',NULL),(35,35,'Erin Dee\r\n','Creative Exec','Erin.Dee@hbo.com\r\n',NULL),(36,36,'Andrew Thomas\r\n','Creative Exec',NULL,NULL),(37,37,'Chris Denniston\r\n','Creative Exec',NULL,NULL),(38,38,'Melora Soodalter\r\n','Creative Exec',NULL,NULL),(39,39,'Natalia Echeverria\r\n','Creative Exec',NULL,NULL),(47,16,'Super User','Mega','aaa@bb.com','13123'),(46,16,'Test User','Test title','s@ff.com','24234234'),(45,16,'Alex Alex','FE dev','aa@bb.com','13132132'),(44,16,'Yuriy Balaka','Project Manager','ybalaka@gmail.com','48-665665565'),(48,13,'Suda Sampath','Helper','suda.sampath@outlook.com','9492317996'),(49,9,'Prime User','CEO','dd@gg.com','124124124'),(50,9,'Super User','ABC','aa@sdfsdf.com','234243'),(51,9,'Mega User','AYT','dsdf@sadfsd.com','234234'),(52,9,'Donald Trump','President','aa@bb.com','1321321'),(53,9,'Donald Duck','Big Boss','aa@gg.com','23234243'),(54,9,'Spider Man','Superhero','aa@ads.com','234234');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_contact_to_project_campaign`
--

LOCK TABLES `redi_customer_contact_to_project_campaign` WRITE;
/*!40000 ALTER TABLE `redi_customer_contact_to_project_campaign` DISABLE KEYS */;
INSERT INTO `redi_customer_contact_to_project_campaign` VALUES (1,3,105),(2,1,105),(3,2,105),(4,4,105),(5,5,105),(6,7,105),(7,12,162),(8,10,194),(9,13,194),(10,13,194),(11,12,199);
/*!40000 ALTER TABLE `redi_customer_contact_to_project_campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_customer_new`
--

DROP TABLE IF EXISTS `redi_customer_new`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_customer_new` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studio_id` int(11) DEFAULT NULL,
  `studio_name` varchar(100) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip` varchar(8) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `billing_contact` varchar(100) DEFAULT NULL,
  `billing_email` varchar(100) DEFAULT NULL,
  `billing_phone` varchar(45) DEFAULT NULL,
  `completed` smallint(6) DEFAULT '0',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_new`
--

LOCK TABLES `redi_customer_new` WRITE;
/*!40000 ALTER TABLE `redi_customer_new` DISABLE KEYS */;
/*!40000 ALTER TABLE `redi_customer_new` ENABLE KEYS */;
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
  `type` char(1) NOT NULL DEFAULT 'A',
  `price` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`customer_id`,`activity_id`,`type`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_price`
--

LOCK TABLES `redi_customer_price` WRITE;
/*!40000 ALTER TABLE `redi_customer_price` DISABLE KEYS */;
INSERT INTO `redi_customer_price` VALUES (2,2,'A',55.00),(2,9,'A',NULL),(2,4,'A',99.80),(10,12,'A',80.00),(7,15,'A',10.00),(4,1,'A',0.00),(32,5,'A',10.00),(15,8,'A',0.00),(15,10,'A',0.00);
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate`
--

LOCK TABLES `redi_estimate` WRITE;
/*!40000 ALTER TABLE `redi_estimate` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate_history`
--

LOCK TABLES `redi_estimate_history` WRITE;
/*!40000 ALTER TABLE `redi_estimate_history` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate_temporary_staff`
--

LOCK TABLES `redi_estimate_temporary_staff` WRITE;
/*!40000 ALTER TABLE `redi_estimate_temporary_staff` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_estimate_to_outside_cost`
--

LOCK TABLES `redi_estimate_to_outside_cost` WRITE;
/*!40000 ALTER TABLE `redi_estimate_to_outside_cost` DISABLE KEYS */;
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
-- Table structure for table `redi_finishing_house`
--

DROP TABLE IF EXISTS `redi_finishing_house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_finishing_house` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_finishing_house`
--

LOCK TABLES `redi_finishing_house` WRITE;
/*!40000 ALTER TABLE `redi_finishing_house` DISABLE KEYS */;
INSERT INTO `redi_finishing_house` VALUES (1,'CABIN 21'),(2,'CO3'),(3,'DISNEY'),(4,'FOCUS FEATURES'),(5,'FOTOKEM'),(6,'KMP'),(7,'MOCEAN'),(8,'MPI'),(9,'MSP'),(10,'NEW WAVE'),(11,'PICTUREHEAD'),(12,'PIXWEL'),(13,'SOURCE SOUND'),(14,'SSI'),(15,'STAMPEDE'),(16,'TECHNICOLOR'),(17,'TURNER ASPERA'),(18,'UNIVERSAL'),(19,'VANDAM'),(20,'WILD TRACKS'),(21,'WISER'),(22,'AAAAA'),(23,'BBBB'),(24,'TESTING 123');
/*!40000 ALTER TABLE `redi_finishing_house` ENABLE KEYS */;
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
-- Table structure for table `redi_module`
--

DROP TABLE IF EXISTS `redi_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_module`
--

LOCK TABLES `redi_module` WRITE;
/*!40000 ALTER TABLE `redi_module` DISABLE KEYS */;
INSERT INTO `redi_module` VALUES (1,'Spot Sent'),(2,'Rate Card');
/*!40000 ALTER TABLE `redi_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_notification`
--

DROP TABLE IF EXISTS `redi_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_notification` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message_type_id` int(11) DEFAULT NULL,
  `message` text,
  `link` text,
  `note` text,
  `confirm` smallint(1) DEFAULT '0',
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_notification`
--

LOCK TABLES `redi_notification` WRITE;
/*!40000 ALTER TABLE `redi_notification` DISABLE KEYS */;
INSERT INTO `redi_notification` VALUES (1,3,'Spot sent reqeust for #1 Interrogation is sent',NULL,NULL,0,1,'2019-01-17 14:04:12',NULL,NULL),(2,3,'Spot sent reqeust for #1 Interrogation is sent',NULL,NULL,0,1,'2019-01-17 15:00:31',NULL,NULL),(3,3,'Spot sent reqeust for #1 Theory aka \"Truce\" is sent',NULL,NULL,0,1,'2019-01-17 15:03:53',NULL,NULL),(4,3,'Spot sent reqeust for #1 Theory aka \"Truce\" is sent',NULL,NULL,0,1,'2019-01-17 15:05:50',NULL,NULL),(5,3,'Spot sent reqeust for #1 Theory aka \"Truce\" is sent',NULL,NULL,0,1,'2019-01-17 16:27:45',NULL,NULL),(6,3,'Spot sent reqeust for #1 Interrogation is sent',NULL,NULL,0,5,'2019-01-18 12:54:20',NULL,NULL);
/*!40000 ALTER TABLE `redi_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_notification_data`
--

DROP TABLE IF EXISTS `redi_notification_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_notification_data` (
  `notification_id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`notification_id`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_notification_data`
--

LOCK TABLES `redi_notification_data` WRITE;
/*!40000 ALTER TABLE `redi_notification_data` DISABLE KEYS */;
INSERT INTO `redi_notification_data` VALUES (1,'campaignId','2'),(1,'campaignName','Theatrical Radio'),(1,'projectId','47'),(1,'projectName','Annihilation'),(1,'spotId','84'),(1,'spotLineStatusId','2'),(1,'spotName','#1 Interrogation'),(1,'spotSentId','171'),(1,'studioId','2'),(1,'studioName','Warner Bros.'),(1,'versionId','1'),(1,'versionName','1'),(2,'campaignId','2'),(2,'campaignName','Theatrical Radio'),(2,'projectId','47'),(2,'projectName','Annihilation'),(2,'spotId','84'),(2,'spotLineStatusId','2'),(2,'spotName','#1 Interrogation'),(2,'spotSentId','172'),(2,'studioId','2'),(2,'studioName','Warner Bros.'),(2,'versionId','3'),(2,'versionName','1B'),(3,'campaignId','4'),(3,'campaignName','Theatrical Teaser/Trailer'),(3,'projectId','47'),(3,'projectName','Annihilation'),(3,'spotId','78'),(3,'spotLineStatusId','2'),(3,'spotName','#1 Theory aka \"Truce\"'),(3,'spotSentId','173'),(3,'studioId','2'),(3,'studioName','Warner Bros.'),(3,'versionId','90'),(3,'versionName','11'),(4,'campaignId','4'),(4,'campaignName','Theatrical Teaser/Trailer'),(4,'projectId','47'),(4,'projectName','Annihilation'),(4,'spotId','78'),(4,'spotLineStatusId','2'),(4,'spotName','#1 Theory aka \"Truce\"'),(4,'spotSentId','176'),(4,'studioId','2'),(4,'studioName','Warner Bros.'),(4,'versionId','90'),(4,'versionName','11'),(5,'campaignId','4'),(5,'campaignName','Theatrical Teaser/Trailer'),(5,'projectId','47'),(5,'projectName','Annihilation'),(5,'spotId','78'),(5,'spotLineStatusId','2'),(5,'spotName','#1 Theory aka \"Truce\"'),(5,'spotSentId','177'),(5,'studioId','2'),(5,'studioName','Warner Bros.'),(5,'versionId','1'),(5,'versionName','1'),(6,'campaignId','2'),(6,'campaignName','Theatrical Radio'),(6,'projectId','47'),(6,'projectName','Annihilation'),(6,'spotId','84'),(6,'spotLineStatusId','2'),(6,'spotName','#1 Interrogation'),(6,'spotSentId','167'),(6,'studioId','2'),(6,'studioName','Warner Bros.'),(6,'versionId',NULL),(6,'versionName',NULL);
/*!40000 ALTER TABLE `redi_notification_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_notification_message_type`
--

DROP TABLE IF EXISTS `redi_notification_message_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_notification_message_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `message` text,
  `link` text,
  `params` text,
  PRIMARY KEY (`id`),
  KEY `key` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_notification_message_type`
--

LOCK TABLES `redi_notification_message_type` WRITE;
/*!40000 ALTER TABLE `redi_notification_message_type` DISABLE KEYS */;
INSERT INTO `redi_notification_message_type` VALUES (1,'request_music_team','Music team request created on project #{projectName}  for campaign #{campaignName}','/portal/project/#{studioId}/#{studioName}/#{projectId}/#{projectName}','{\"projectId\":true,\"projectName\":true,\"campaignId\":true,\"campaignName\":true,\"studioId\":true,\"studioName\":true}'),(2,'request_writing_team','Writing team request created on project #{projectName}  for campaign #{campaignName}','/portal/project/#{studioId}/#{studioName}/#{projectId}/#{projectName}','{\"projectId\":true,\"projectName\":true,\"campaignId\":true,\"campaignName\":true,\"studioId\":true,\"studioName\":true}'),(3,'spot_sent_notify_sent_to_post','Spot sent reqeust for #{spotName} is sent',NULL,'{\"spotSentId\":true,\"projectId\":true,\"projectName\":true,\"campaignId\":true,\"campaignName\":true,\"studioId\":true,\"studioName\":true,\"spotId\":true,\"spotName\":true,\"versionId\":false,\"versionName\":false}');
/*!40000 ALTER TABLE `redi_notification_message_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_notification_user`
--

DROP TABLE IF EXISTS `redi_notification_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_notification_user` (
  `notification_id` bigint(20) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`notification_id`,`user_type_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_notification_user`
--

LOCK TABLES `redi_notification_user` WRITE;
/*!40000 ALTER TABLE `redi_notification_user` DISABLE KEYS */;
INSERT INTO `redi_notification_user` VALUES (1,3,0),(1,4,0),(1,9,0),(1,13,0),(1,19,0),(1,23,0),(2,3,0),(2,4,0),(2,9,0),(2,13,0),(2,19,0),(2,23,0),(3,3,0),(3,23,0),(4,3,0),(4,4,0),(4,9,0),(4,13,0),(4,19,0),(4,23,0),(5,3,0),(5,23,0),(6,3,0),(6,23,0);
/*!40000 ALTER TABLE `redi_notification_user` ENABLE KEYS */;
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
  `project_code` varchar(100) DEFAULT NULL,
  `project_prefix` varchar(10) DEFAULT NULL,
  `project_release` datetime DEFAULT NULL,
  `studio_id` int(11) DEFAULT NULL,
  `notes` text,
  `created_by_user_id` int(11) DEFAULT NULL,
  `type` char(1) DEFAULT 'B',
  `confidential` smallint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_name` (`project_name`),
  KEY `project_code` (`project_code`)
) ENGINE=MyISAM AUTO_INCREMENT=82 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project`
--

LOCK TABLES `redi_project` WRITE;
/*!40000 ALTER TABLE `redi_project` DISABLE KEYS */;
INSERT INTO `redi_project` VALUES (1,'Babysitter','BAB',NULL,'2018-06-05 00:00:00',1,'Project has no description',NULL,'B',0),(47,'Annihilation',NULL,NULL,'2018-02-23 00:00:00',2,'Job # 5195\nadding Customer Contact here: Anu Bhatia',NULL,'B',0),(2,'Before I Wake',NULL,NULL,'2018-06-05 00:00:00',1,NULL,NULL,'B',0),(3,'Bravo 14',NULL,NULL,'2018-06-05 00:00:00',1,NULL,NULL,'B',0),(5,'Hearthstone',NULL,NULL,'2018-06-05 00:00:00',1,NULL,NULL,'B',0),(6,'Jack Reacher 2',NULL,NULL,'2018-06-05 00:00:00',1,NULL,NULL,'B',0),(7,'Lights Out',NULL,NULL,'2018-04-26 00:00:00',1,NULL,NULL,'B',0),(9,'Mr Robot S2',NULL,NULL,'2018-04-26 00:00:00',1,NULL,NULL,'B',0),(10,'Quarry',NULL,NULL,'2018-04-26 00:00:00',1,NULL,NULL,'B',0),(11,'Silicon Valley',NULL,NULL,'2018-04-26 00:00:00',1,'Silicon Valley is an American comedy television series created by Mike Judge, John Altschuler and Dave Krinsky. The series focuses on five young men who founded a startup company in Silicon Valley. The series premiered on April 6, 2014 on HBO.',NULL,'B',0),(13,'Storks',NULL,NULL,'2018-04-26 00:00:00',1,NULL,NULL,'B',0),(14,'TNT Brand',NULL,NULL,'2018-02-23 00:00:00',1,NULL,NULL,'B',0),(15,'What Now',NULL,NULL,'2018-02-23 00:00:00',1,NULL,NULL,'B',0),(16,'Veep','Code Name',NULL,'2018-04-26 00:00:00',1,NULL,NULL,'B',0),(22,'Game of Thrones',NULL,NULL,'2018-02-23 00:00:00',1,NULL,NULL,'B',0),(28,'Independence',NULL,NULL,'2018-02-23 00:00:00',1,NULL,NULL,'B',0),(39,'Game of Thrones',NULL,NULL,'2018-02-23 00:00:00',1,'George R.R. Martin\'s best-selling book series \"A Song of Ice and Fire\" is brought to the screen as HBO sinks its considerable storytelling teeth into the medieval fantasy epic. test string added',NULL,'B',0),(46,'Project abk',NULL,NULL,'2018-02-23 00:00:00',1,'test desc for project abk',NULL,'B',0),(50,'Demo project1','demo1',NULL,NULL,1,'some note for project. this is dummy text',1,'B',0),(49,'Aquaman','Ahab',NULL,'2018-05-31 00:00:00',1,NULL,1,'B',0),(51,'Godzilla 2','Fathom',NULL,'2018-09-28 00:00:00',1,NULL,1,'B',0),(52,'The Muppets','Parts',NULL,'2018-11-23 00:00:00',1,NULL,1,'B',0),(53,'Shazam','Franklin',NULL,'2019-04-05 00:00:00',1,NULL,1,'B',0),(54,'Wreck It Ralph 2','Popcorn',NULL,'2018-11-21 00:00:00',2,'International Campaign',1,'B',0),(55,'On the Basis of Sex',NULL,NULL,NULL,2,NULL,1,'B',0),(56,'Elephants',NULL,NULL,NULL,3,NULL,1,'B',0),(57,'Marina Doesn\'t Care','Carrots',NULL,'2018-12-24 00:00:00',3,'testing testing',1,'B',0),(74,'webhkp test project','wtp',NULL,'2019-10-31 00:00:00',2,'some test note for project',1,'B',0),(75,'NEW MOVIE','NM1',NULL,NULL,53,'This a a brand new movie from Disney. All info to be kept confidential.',1,'B',0),(76,'my test project','Proj name',NULL,'2018-12-15 00:00:00',122,'Some optional note',1,'B',0),(77,'New test','test name',NULL,NULL,53,NULL,1,'B',0),(78,'Name test1','code test1','pref22',NULL,48,NULL,1,'B',0),(79,'Name test2','codename2','pfdfdf',NULL,53,NULL,1,'B',0),(80,'test3','name test3','preftest3','2018-12-01 00:00:00',3,NULL,1,'B',0),(81,'test4','test4','12345','2018-12-02 00:00:00',48,NULL,1,'B',0);
/*!40000 ALTER TABLE `redi_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_campaign_manager`
--

DROP TABLE IF EXISTS `redi_project_campaign_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_campaign_manager` (
  `project_campaign_id` int(11) NOT NULL,
  `manager_id` int(11) NOT NULL,
  PRIMARY KEY (`project_campaign_id`,`manager_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_campaign_manager`
--

LOCK TABLES `redi_project_campaign_manager` WRITE;
/*!40000 ALTER TABLE `redi_project_campaign_manager` DISABLE KEYS */;
INSERT INTO `redi_project_campaign_manager` VALUES (103,55),(105,55),(105,59),(112,55);
/*!40000 ALTER TABLE `redi_project_campaign_manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_campaign_producer`
--

DROP TABLE IF EXISTS `redi_project_campaign_producer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_campaign_producer` (
  `project_campaign_id` int(11) NOT NULL,
  `producer_id` int(11) NOT NULL,
  PRIMARY KEY (`project_campaign_id`,`producer_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_campaign_producer`
--

LOCK TABLES `redi_project_campaign_producer` WRITE;
/*!40000 ALTER TABLE `redi_project_campaign_producer` DISABLE KEYS */;
INSERT INTO `redi_project_campaign_producer` VALUES (103,51),(104,57),(105,51),(105,56),(106,57),(109,51),(109,57),(112,56),(112,57),(117,51),(150,51);
/*!40000 ALTER TABLE `redi_project_campaign_producer` ENABLE KEYS */;
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
  `campaign_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1141 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_history`
--

LOCK TABLES `redi_project_history` WRITE;
/*!40000 ALTER TABLE `redi_project_history` DISABLE KEYS */;
INSERT INTO `redi_project_history` VALUES (4,9,NULL,1,'Campaign \"Graphics Campaign\" was added to project \"Mr Robot S2\"','2017-02-25 17:32:38'),(5,1,NULL,1,'Campaign \"Clone\" was added to project \"Babysitter\"','2017-03-02 15:18:00'),(6,1,NULL,1,'Campaign \"Clone 30\" was added to project \"Babysitter\"','2017-03-02 15:19:46'),(7,1,NULL,1,'Campaign \"Hollo\" was added to project \"Babysitter\"','2017-03-02 15:21:23'),(8,1,NULL,1,'Campaign \"Rocky\" was added to project \"Babysitter\"','2017-03-02 15:22:49'),(9,1,NULL,1,'Spot \"Ka Spot\" was added to \"AV Campaign\" campaign','2017-03-02 16:17:00'),(11,22,NULL,1,'Project \"Game of Thrones\" created for client \"HBO\"','2017-03-15 05:40:56'),(13,1,NULL,1,'Campaign \"VAA\" was added to project \"Babysitter\"','2017-03-16 07:37:36'),(26,10,NULL,1,'Spot \"Enchantress\" was added to \"AV Campaign\"','2017-03-16 12:57:34'),(39,10,NULL,48,'Campaign \"Trailer Two\" was added to project \"Quarry\"','2017-03-23 08:03:22'),(40,10,NULL,48,'Campaign \"Teaser\" was added to project \"Quarry\"','2017-03-28 12:56:01'),(41,10,NULL,48,'Campaign \"Who\" was added to project \"Quarry\"','2017-03-28 13:02:23'),(42,10,NULL,48,'Campaign \"When\" was added to project \"Quarry\"','2017-03-28 13:14:42'),(43,10,NULL,48,'Campaign \"What\" was added to project \"Quarry\"','2017-03-28 13:15:38'),(44,10,NULL,48,'Campaign \"Why\" was added to project \"Quarry\"','2017-03-28 13:18:03'),(66,9,NULL,48,'Campaign \"(:30) TV\" was added to project \"Mr Robot S2\"','2017-04-16 00:05:53'),(67,1,NULL,48,'Campaign \"(:30) TV\" was added to project \"Babysitter\"','2017-04-16 13:51:53'),(68,1,NULL,48,'Spot \"First Spot for Babysitter (:30) TV\" was added to \"(:30) TV\" campaign','2017-04-16 14:02:50'),(69,1,NULL,48,'Campaign \"Graphicss\" was added to project \"Babysitter\"','2017-04-17 19:56:26'),(70,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 09:54:36'),(71,10,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 09:54:45'),(72,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 10:06:44'),(73,10,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 10:07:06'),(74,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 10:07:17'),(75,10,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 10:07:54'),(76,10,NULL,48,'Campaign \"(:15) TV\" was added to project \"Quarry\"','2017-04-26 11:49:28'),(77,10,NULL,48,'Campaign \"(:15) TV\" was removed from project \"Quarry\"','2017-04-26 11:49:49'),(78,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 11:50:15'),(79,10,NULL,48,'Campaign \"Teaser\" was added to project \"Quarry\"','2017-04-28 12:38:52'),(80,10,NULL,48,'Spot \"First Spot for Teaser\" was added to \"Teaser\" campaign','2017-04-28 12:40:44'),(85,9,NULL,48,'Spot \"Episode 405\" was added to \"(:30) TV\" campaign','2017-05-03 16:23:06'),(86,1,NULL,48,'Version \"1\" was added to spot \"First Spot for Babysit\"','2017-05-24 09:42:28'),(87,1,NULL,48,'Version \"2\" was added to spot \"First Spot for Babysit\"','2017-05-24 09:42:34'),(88,1,NULL,48,'Campaign \"Graphicss\" was removed from project \"Babysitter\"','2017-05-24 09:42:56'),(89,1,NULL,48,'Campaign \"Graphics\" was added to project \"Babysitter\"','2017-05-24 09:43:08'),(105,28,NULL,48,'Project \"Independence1\" created for client \"HBO\"','2017-07-06 18:27:57'),(106,28,NULL,48,'Campaign \"Teaser\" was added to project \"Independence1\"','2017-07-06 18:48:57'),(107,28,NULL,48,'Campaign \"Trailer\" was added to project \"Independence1\"','2017-07-06 20:29:06'),(108,28,NULL,48,'Campaign \"Pitch\" was added to project \"Independence1\"','2017-07-06 20:46:47'),(110,28,NULL,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 20:51:51'),(111,28,NULL,48,'Campaign \"TV (other)\" was added to project \"Independence1\"','2017-07-06 20:51:55'),(112,28,NULL,48,'Campaign \"Home Entertainment\" was added to project \"Independence1\"','2017-07-06 20:52:00'),(113,28,NULL,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-06 20:52:03'),(114,28,NULL,48,'Campaign \"Broadcast\" was added to project \"Independence1\"','2017-07-06 20:54:51'),(115,28,NULL,48,'Campaign \"Games\" was added to project \"Independence1\"','2017-07-06 20:55:43'),(116,28,NULL,48,'Campaign \"Angre\" was added to project \"Independence1\"','2017-07-06 21:23:03'),(117,28,NULL,48,'Campaign \"Angre\" was added to project \"Independence1\"','2017-07-06 21:23:05'),(118,28,NULL,48,'Campaign \"Trailer\" was removed from project \"Independence1\"','2017-07-06 21:28:31'),(119,28,NULL,48,'Campaign \"Pitch\" was removed from project \"Independence1\"','2017-07-06 21:28:42'),(120,28,NULL,48,'Campaign \"TV (other)\" was removed from project \"Independence1\"','2017-07-06 21:28:51'),(121,28,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Independence1\"','2017-07-06 21:28:51'),(122,28,NULL,48,'Campaign \"Broadcast\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(123,28,NULL,48,'Campaign \"Digital\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(124,28,NULL,48,'Campaign \"Games\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(125,28,NULL,48,'Campaign \"Home Entertainment\" was removed from project \"Independence1\"','2017-07-06 21:28:57'),(126,28,NULL,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 21:29:58'),(127,28,NULL,48,'Campaign \"Trailer\" was added to project \"Independence1\"','2017-07-06 22:28:51'),(128,28,NULL,48,'Campaign \"How\" was added to project \"Independence1\"','2017-07-06 22:29:03'),(129,28,NULL,48,'Campaign \"Home Entertainment\" was added to project \"Independence1\"','2017-07-06 22:29:25'),(130,28,NULL,48,'Campaign \"Streaming\" was added to project \"Independence1\"','2017-07-06 22:29:56'),(131,28,NULL,48,'Campaign \"Other\" was added to project \"Independence1\"','2017-07-06 22:30:52'),(132,28,NULL,48,'Campaign \"Graphics\" was added to project \"Independence1\"','2017-07-06 22:30:59'),(133,28,NULL,48,'Campaign \"Trailer Two\" was added to project \"Independence1\"','2017-07-06 22:31:48'),(134,28,NULL,48,'Campaign \"What\" was added to project \"Independence1\"','2017-07-06 22:31:56'),(135,28,NULL,48,'Campaign \"When\" was added to project \"Independence1\"','2017-07-06 22:31:56'),(136,28,NULL,48,'Campaign \"Who\" was added to project \"Independence1\"','2017-07-06 22:34:03'),(137,28,NULL,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-06 22:34:29'),(138,28,NULL,48,'Campaign \"Teaser\" was removed from project \"Independence1\"','2017-07-06 22:34:43'),(139,28,NULL,48,'Campaign \"Streaming\" was removed from project \"Independence1\"','2017-07-06 22:34:44'),(140,28,NULL,48,'Campaign \"Home Entertainment\" was removed from project \"Independence1\"','2017-07-06 22:34:46'),(141,28,NULL,48,'Campaign \"How\" was removed from project \"Independence1\"','2017-07-06 22:34:48'),(142,28,NULL,48,'Campaign \"Angre\" was removed from project \"Independence1\"','2017-07-06 22:34:51'),(143,28,NULL,48,'Campaign \"Other\" was removed from project \"Independence1\"','2017-07-06 22:34:51'),(144,28,NULL,48,'Campaign \"Graphics\" was removed from project \"Independence1\"','2017-07-06 22:34:54'),(145,28,NULL,48,'Campaign \"Trailer\" was removed from project \"Independence1\"','2017-07-06 22:34:57'),(146,28,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Independence1\"','2017-07-06 22:34:58'),(147,28,NULL,48,'Campaign \"Digital\" was removed from project \"Independence1\"','2017-07-06 22:35:18'),(148,28,NULL,48,'Campaign \"When\" was removed from project \"Independence1\"','2017-07-06 22:35:19'),(149,28,NULL,48,'Campaign \"Who\" was removed from project \"Independence1\"','2017-07-06 22:35:20'),(150,28,NULL,48,'Campaign \"What\" was removed from project \"Independence1\"','2017-07-06 22:35:22'),(151,28,NULL,48,'Campaign \"Trailer Two\" was removed from project \"Independence1\"','2017-07-06 22:35:25'),(152,28,NULL,48,'Campaign \"Teaser\" was added to project \"Independence1\"','2017-07-06 22:36:08'),(153,28,NULL,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 22:36:15'),(154,28,NULL,48,'Spot \"spt1\" was added to \"Teaser\" campaign','2017-07-06 22:39:53'),(155,28,NULL,48,'Spot \"spt2\" was added to \"Teaser\" campaign','2017-07-07 03:21:10'),(156,28,NULL,48,'Spot \"spt3\" was added to \"Teaser\" campaign','2017-07-07 03:28:15'),(157,28,NULL,48,'Spot \"spt4\" was added to \"Teaser\" campaign','2017-07-07 03:35:12'),(158,28,NULL,48,'Spot \"spt5\" was added to \"Teaser\" campaign','2017-07-07 03:37:04'),(159,28,NULL,48,'Spot \"spt5\" was added to \"Teaser\" campaign','2017-07-07 03:37:20'),(160,28,NULL,48,'Spot \"spt6\" was added to \"Teaser\" campaign','2017-07-07 03:38:45'),(161,28,NULL,48,'Spot \"spt1\" was added to \"(:30) TV\" campaign','2017-07-07 03:39:10'),(162,28,NULL,48,'Version \"1\" was added to spot \"spt1\"','2017-07-07 03:42:42'),(168,28,NULL,48,'Version \"1A\" was added to spot \"spt5\"','2017-07-07 15:55:00'),(169,28,NULL,48,'Version \"1B\" was added to spot \"spt5\"','2017-07-07 15:55:43'),(170,28,NULL,48,'Version \"1 Alt\" was added to spot \"spt5\"','2017-07-07 15:55:54'),(171,28,NULL,48,'Version \"1 Rev\" was added to spot \"spt5\"','2017-07-07 18:05:49'),(172,28,NULL,48,'Version \"2A\" was added to spot \"spt5\"','2017-07-07 18:14:28'),(173,28,NULL,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-07 19:27:18'),(174,28,NULL,48,'Spot \"spt1\" was added to \"Digital\" campaign','2017-07-07 19:45:21'),(175,28,NULL,48,'Version \"1\" was added to spot \"spt1\"','2017-07-07 19:53:38'),(176,28,NULL,48,'Campaign \"Why\" was added to project \"Independence1\"','2017-07-07 21:34:56'),(177,28,NULL,48,'Spot \"spt1\" was added to \"Why\" campaign','2017-07-07 21:35:18'),(179,1,NULL,48,'Campaign \"Test\" was added to project \"Babysitter\"','2017-07-10 04:24:44'),(180,1,NULL,48,'Campaign \"Test\" was added to project \"Babysitter\"','2017-07-10 04:24:46'),(181,1,NULL,48,'Spot \"Second spot for Babysitter\" was added to \"(:30) TV\" campaign','2017-07-10 04:26:17'),(182,1,NULL,48,'Version \"1\" was added to spot \"Second spot for Babysi\"','2017-07-10 04:27:52'),(204,1,NULL,48,'Version \"1\" was added to spot \"Puppet Master\"','2017-07-28 11:16:12'),(206,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2017-11-27 11:18:27'),(207,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2017-11-27 11:18:31'),(208,1,NULL,48,'Version \"1 Alt\" was added to spot \"First Spot for Babysit\"','2017-11-27 11:19:43'),(209,1,NULL,48,'Campaign \"Teaser\" was added to project \"Babysitter\"','2017-12-07 09:12:57'),(210,1,NULL,48,'Campaign \"Teaser\" was removed from project \"Babysitter\"','2017-12-07 09:13:46'),(211,1,NULL,48,'Campaign \"Test2\" was added to project \"Babysitter\"','2017-12-07 11:09:16'),(212,1,NULL,48,'Campaign \"Test2\" was removed from project \"Babysitter\"','2017-12-07 11:09:21'),(217,2,NULL,48,'Project \"Before I Wake\" created for client \"Warner Bros.\"','2017-03-15 05:40:56'),(220,3,NULL,48,'Project \"Bravo 14\" created for client \"HBO\"','2018-01-11 15:50:36'),(221,6,NULL,48,'Project \"Jack Reacher 2\" created for client \"Warner Bros.\"','2018-01-11 15:51:25'),(222,5,NULL,48,'Project \"Hearthstone\" created for client \"NBC Universal\"','2018-01-11 15:52:00'),(224,7,NULL,48,'Project \"Lights Out\" created for client \"HBO\"','2018-01-11 15:55:35'),(226,11,NULL,48,'Project \"Silicon Valley\" created for client \"HBO\"','2018-01-11 15:56:57'),(227,14,NULL,48,'Project \"TNT Brand\" created for client \"Warner Bros.\"','2018-01-11 15:57:28'),(228,13,NULL,48,'Project \"Storks\" created for client \"NBC Universal\"','2018-01-11 15:57:53'),(229,16,NULL,48,'Project \"Veep\" was created','2018-01-11 15:58:17'),(230,15,NULL,48,'Project \"What Now\" created for client \"HBO\"','2018-01-11 15:58:42'),(231,1,NULL,48,'Campaign \"Test\" was removed from project \"Babysitter\"','2018-01-14 16:59:23'),(232,1,NULL,48,'Campaign \"Graphics\" was removed from project \"Babysitter\"','2018-01-14 17:16:43'),(233,1,NULL,48,'Campaign \"Test1\" was added to project \"Babysitter\"','2018-01-14 17:20:48'),(234,1,NULL,48,'Campaign \"Test1\" was removed from project \"Babysitter\"','2018-01-14 17:20:54'),(235,1,NULL,48,'Campaign \"Test2\" was added to project \"Babysitter\"','2018-01-14 17:21:06'),(236,1,NULL,48,'Campaign \"Test2\" was removed from project \"Babysitter\"','2018-01-14 17:21:09'),(237,1,NULL,48,'Version \"2\" was removed from spot \"First Spot for Babysit\"','2018-01-15 08:28:43'),(238,1,NULL,48,'Version \"1 Alt\" was removed from spot \"First Spot for Babysit\"','2018-01-15 08:29:54'),(239,1,NULL,48,'Version \"1 Alt\" was added to spot \"First Spot for Babysit\"','2018-01-16 06:40:48'),(240,1,NULL,48,'Version \"2\" was added to spot \"First Spot for Babysit\"','2018-01-16 07:16:38'),(241,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:07:02'),(242,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:07:27'),(243,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:10:57'),(244,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:12:18'),(245,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:12:23'),(246,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:18:04'),(247,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:18:10'),(248,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:18:14'),(249,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:18:18'),(250,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:20:26'),(251,1,NULL,48,'Version \"2\" was added to spot \"Second spot\"','2018-01-16 11:00:14'),(252,1,NULL,48,'Version \"3\" was added to spot \"Second spot\"','2018-01-16 11:00:18'),(253,1,NULL,48,'Spot \"Another spot\" was added to \"(:30) TV\" campaign','2018-01-16 11:02:09'),(254,1,NULL,48,'Version \"2\" was removed from spot \"First Spot\"','2018-01-29 10:33:29'),(255,1,NULL,48,'Version \"2\" was added to spot \"First Spot\"','2018-01-29 10:33:34'),(256,1,NULL,48,'Spot \"Third spot for Babysitter\" was added to \"(:30) TV\" campaign','2018-01-29 17:17:00'),(257,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-03-06 17:44:54'),(258,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-03-06 17:54:47'),(259,45,NULL,48,'Project \"Game of Thrones\" created for client \"HBO\"','2018-03-30 00:14:17'),(260,1,NULL,1,'Project renamed to \"\"Babysitter\" (codename: \"BBY\")\" from \"Babysitter\"','2018-04-02 08:02:49'),(261,1,NULL,1,'Project renamed to \"\"Babysitter\" (codename: \"BAB\")\" from \"Babysitter\"','2018-04-02 11:24:55'),(262,46,NULL,1,'Project \"Project abk\" created for client \"ABC Entertainment\"','2018-04-02 16:55:44'),(263,1,1,48,'Campaign \"Teaser\" was added to project \"Babysitter\"','2018-04-13 05:57:40'),(264,1,4,48,'User \"Mark Lafontant\" was removed from campaign \"(:30) TV\"','2018-04-16 09:09:16'),(265,1,4,48,'User \"Julie Davis\" was removed from campaign \"(:30) TV\"','2018-04-16 09:09:34'),(266,1,4,48,'Editor \"Sample Manager\" was added to campaign \"(:30) TV\"','2018-04-16 10:00:53'),(267,1,4,48,'Editor \"Sample Manager\" was removed from campaign \"(:30) TV\"','2018-04-16 10:01:00'),(268,1,4,48,'Designer \"Katherine Barlow\" was added to campaign \"(:30) TV\"','2018-04-16 10:01:15'),(269,1,4,48,'Designer \"Maxine Renning\" was added to campaign \"(:30) TV\"','2018-04-16 10:01:42'),(270,1,4,48,'Designer \"Maxine Renning\" was removed from campaign \"(:30) TV\"','2018-04-16 10:01:52'),(271,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-16 23:18:35'),(272,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-16 23:18:54'),(273,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-16 23:20:29'),(274,1,NULL,48,'Version \"1\" was added to spot \"Third spot for Babysitter\"','2018-04-17 08:12:23'),(275,1,NULL,48,'Version \"1\" was removed from spot \"Third spot for Babysitter\"','2018-04-17 08:18:35'),(276,1,NULL,48,'Version \"1\" was added to spot \"Third spot for Babysitter\"','2018-04-17 08:18:46'),(277,1,7,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-04-17 12:14:45'),(278,1,7,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-04-17 12:35:57'),(279,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:24:43'),(280,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:24:44'),(281,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:33:40'),(282,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:33:41'),(283,1,4,48,'User \"Macklin Sameth\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-04-18 13:26:37'),(284,1,4,48,'User \"Macklin Sameth\" was added to campaign \"(:30) TV\"','2018-04-18 13:26:37'),(285,1,4,48,'User \"Macklin Sameth\" was changed to \"Graphics Coordinator\" on campaign \"(:30) TV\"','2018-04-18 13:26:49'),(286,1,4,48,'User \"Macklin Sameth\" was added to campaign \"(:30) TV\"','2018-04-18 13:26:49'),(287,15,4,48,'Campaign \"(:30) TV\" was added to project \"What Now\"','2018-04-19 08:24:43'),(288,46,4,48,'Campaign \"(:30) TV\" was added to project \"Project abk\"','2018-04-19 10:39:43'),(289,46,7,1,'Campaign \"Digital\" was added to project \"Project abk\"','2018-04-19 13:38:51'),(290,46,4,1,'Campaign \"(:30) TV\" was removed from project \"Project abk\"','2018-04-19 13:44:18'),(291,46,7,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"Digital\"','2018-04-19 14:03:35'),(292,46,7,1,'User \"JUSTINE TALLY SMITH\" was added to campaign \"Digital\"','2018-04-19 14:03:41'),(293,46,7,1,'User \"MAXWELL ALBORN\" was added to campaign \"Digital\"','2018-04-19 14:03:47'),(294,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-04-24 13:56:21'),(295,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-04-24 13:56:21'),(296,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-25 04:04:45'),(297,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-04-26 17:38:44'),(298,1,4,1,'User \"JOHN FAGAN\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-04-26 17:49:26'),(299,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:26'),(300,1,4,1,'User \"WILLIAM NEIL\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-04-26 17:49:30'),(301,1,4,1,'User \"WILLIAM NEIL\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:30'),(302,1,4,1,'User \"JORDAN MICHAEL GODFREY\" was changed to \"Editorial Manager\" on campaign \"(:30) TV\"','2018-04-26 17:49:32'),(303,1,4,1,'User \"JORDAN MICHAEL GODFREY\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:32'),(304,1,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:43'),(305,1,4,1,'User \"JAMIE ZAKOSKI\" was removed from campaign \"(:30) TV\"','2018-04-26 17:49:49'),(306,1,4,1,'User \"CHRISTINE ADALID\" was removed from campaign \"(:30) TV\"','2018-04-26 17:49:53'),(307,1,4,1,'User \"WILLIAM NEIL\" was removed from campaign \"(:30) TV\"','2018-04-26 17:49:55'),(308,1,4,1,'Billing user \"SOPHIA SISSON\" was added to campaign \"(:30) TV\"','2018-04-26 17:50:54'),(309,1,4,1,'Editor \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-26 17:51:50'),(310,1,4,1,'Editor \"JORDAN MICHAEL GODFREY\" was added to campaign \"(:30) TV\"','2018-04-26 17:51:54'),(311,1,4,1,'Editor \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-04-26 17:51:57'),(312,1,4,1,'Designer \"JULIE DAVIS\" was added to campaign \"(:30) TV\"','2018-04-26 17:52:02'),(313,1,4,1,'User \"JOHN FAGAN\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-04-26 17:52:46'),(314,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-26 17:52:46'),(315,1,4,1,'User \"JOHN FAGAN\" was changed to \"Graphics Coordinator\" on campaign \"(:30) TV\"','2018-04-26 17:52:52'),(316,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-26 17:52:52'),(317,1,NULL,1,'Version \"10\" was added to spot \"\"Busy\"\"','2018-04-26 18:10:19'),(318,1,NULL,1,'Version \"3A\" was added to spot \"\"Busy\"\"','2018-04-26 18:10:23'),(319,1,NULL,1,'Version \"10B\" was added to spot \"Second spot\"','2018-04-26 18:18:33'),(320,16,4,1,'Campaign \"(:30) TV\" was added to project \"Veep\"','2018-04-26 18:38:32'),(321,16,NULL,1,'Project renamed to \"\"Veep\" (codename: \"VPE\")\" from \"Veep\"','2018-04-26 20:47:32'),(322,16,NULL,1,'Project renamed to \"\"Veep\" (codename: \"Code Name\")\" from \"Veep\"','2018-04-26 20:47:46'),(323,16,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:35'),(324,16,4,1,'User \"JULIE DAVIS\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:40'),(325,16,4,1,'User \"JAMIE ZAKOSKI\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-04-30 15:18:44'),(326,16,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:44'),(327,16,4,1,'User \"JULIE DAVIS\" was changed to \"Associate Producer\" on campaign \"(:30) TV\"','2018-04-30 15:18:46'),(328,16,4,1,'User \"JULIE DAVIS\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:46'),(329,1,2,1,'Campaign \"Trailer\" was added to project \"Babysitter\"','2018-05-02 16:46:03'),(330,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-02 16:47:33'),(331,47,NULL,1,'Project \"Annihilation\" created for client \"Paramount\r\n\"','2018-05-03 15:34:28'),(332,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-03 15:34:38'),(333,47,2,1,'Campaign \"Trailer\" was added to project \"Annihilation\"','2018-05-03 15:34:46'),(334,47,71,1,'Campaign \"Test\" was added to project \"Annihilation\"','2018-05-03 15:35:05'),(335,47,4,1,'User \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-05-03 15:58:26'),(336,47,4,1,'User \"ALEXANDRA BATES\" was added to campaign \"(:30) TV\"','2018-05-03 15:58:32'),(337,47,4,1,'Editor \"WILLIAM NEIL\" was added to campaign \"(:30) TV\"','2018-05-03 16:00:04'),(338,47,4,1,'Editor \"JACOB LAWRENCE MOSKOW\" was added to campaign \"(:30) TV\"','2018-05-03 16:01:41'),(339,47,4,1,'Billing user \"MAXWELL ALBORN\" was added to campaign \"(:30) TV\"','2018-05-03 16:07:45'),(340,47,4,1,'Designer \"BRADFORD BERLING\" was added to campaign \"(:30) TV\"','2018-05-03 16:08:08'),(341,47,4,1,'Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"','2018-05-03 16:08:14'),(342,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:08:58'),(343,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:09:23'),(344,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-03 16:09:23'),(345,47,NULL,1,'Spot \"#1 Theory\" was added to \"(:30) TV\" campaign','2018-05-03 16:13:31'),(346,47,NULL,1,'Spot \"#2 Saved\" was added to \"(:30) TV\" campaign','2018-05-03 16:15:31'),(347,47,NULL,1,'Spot \"#3 Need\" was added to \"(:30) TV\" campaign','2018-05-03 16:16:40'),(348,47,NULL,1,'Spot \"#4 Inside\" was added to \"(:30) TV\" campaign','2018-05-03 16:17:03'),(349,47,NULL,1,'Spot \"#5 Threat\" was added to \"(:30) TV\" campaign','2018-05-03 16:17:20'),(350,47,NULL,1,'Spot \"#6 Rescue\" was added to \"(:30) TV\" campaign','2018-05-03 16:17:55'),(351,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(352,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(353,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(354,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(355,47,2,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"Trailer\"','2018-05-03 16:23:47'),(356,47,2,1,'User \"MARIE BYRNES\" was added to campaign \"Trailer\"','2018-05-03 16:23:57'),(357,47,2,1,'Billing user \"JESSICA DADON\" was added to campaign \"Trailer\"','2018-05-03 16:24:25'),(358,47,2,1,'Billing user \"JULIE DAVIS\" was added to campaign \"Trailer\"','2018-05-03 16:24:48'),(359,47,2,1,'Editor \"MEKO WINBUSH\" was added to campaign \"Trailer\"','2018-05-03 16:25:17'),(360,47,2,1,'Designer \"BOBBY SALZANO\" was added to campaign \"Trailer\"','2018-05-03 16:25:30'),(361,47,2,1,'Writing team request was changed on campaign \"Trailer\"','2018-05-03 16:25:46'),(362,47,NULL,1,'Spot \"#1 Interrogation\" was added to \"Trailer\" campaign','2018-05-03 16:26:26'),(363,47,71,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Test\"','2018-05-03 16:32:09'),(364,47,71,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Test\"','2018-05-03 16:32:13'),(365,47,71,1,'Billing user \"TONY FANG\" was added to campaign \"Test\"','2018-05-03 16:32:19'),(366,47,71,1,'Editor \"DANIEL ASMA\" was added to campaign \"Test\"','2018-05-03 16:32:34'),(367,47,71,1,'Editor \"JOHN ONEIL\" was added to campaign \"Test\"','2018-05-03 16:32:43'),(368,47,71,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Test\"','2018-05-03 16:45:05'),(369,47,71,1,'Designer \"JONATHAN REYES\" was added to campaign \"Test\"','2018-05-03 16:45:15'),(370,47,71,1,'Music team request was changed on campaign \"Test\"','2018-05-03 16:45:24'),(371,47,71,1,'Music team request was changed on campaign \"Test\"','2018-05-03 16:45:32'),(372,47,71,1,'Writing team request was changed on campaign \"Test\"','2018-05-03 16:45:33'),(373,47,NULL,1,'Spot \"#1 Reason\" was added to \"Test\" campaign','2018-05-03 16:46:04'),(374,47,NULL,1,'Spot \"#2 Creation\" was added to \"Test\" campaign','2018-05-03 16:46:22'),(375,47,NULL,1,'Spot \"#3 Everywhere\" was added to \"Test\" campaign','2018-05-03 16:47:48'),(376,47,NULL,1,'Spot \"#4 Need\" was added to \"Test\" campaign','2018-05-03 16:48:38'),(377,47,NULL,1,'Spot \"#3 Everywhere\" was added to \"Test\" campaign','2018-05-03 16:49:33'),(378,47,NULL,1,'Spot \"#5 Succeed/YouTube\" was added to \"Test\" campaign','2018-05-03 17:21:25'),(379,47,NULL,1,'Version \"1\" was added to spot \"#1 Theory\"','2018-05-11 03:28:39'),(380,47,NULL,1,'Version \"1\" was removed from spot \"#1 Theory\"','2018-05-11 03:32:55'),(381,47,NULL,1,'Spot \"Test\" was added to \"Trailer\" campaign','2018-05-11 05:00:08'),(382,47,NULL,1,'Version \"1\" was added to spot \"#1 Theory\"','2018-05-11 13:03:40'),(383,47,NULL,1,'Version \"1 Alt\" was added to spot \"#1 Theory\"','2018-05-11 13:03:41'),(384,47,NULL,1,'Version \"2\" was added to spot \"#1 Theory\"','2018-05-11 13:03:44'),(385,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:02'),(386,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:02'),(387,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:03'),(388,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:03'),(389,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(390,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(391,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(392,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(393,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:18'),(394,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:18'),(395,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:47'),(396,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:47'),(397,47,NULL,1,'Spot \"New test spot\" was added to \"(:30) TV\" campaign','2018-05-14 06:45:06'),(398,5,6,1,'Campaign \"Home Entertainment\" was added to project \"Hearthstone\"','2018-05-14 14:01:42'),(399,5,NULL,1,'Spot \"test\" was added to \"Home Entertainment\" campaign','2018-05-14 14:05:21'),(400,5,NULL,1,'Spot \"abc\" was added to \"Home Entertainment\" campaign','2018-05-14 14:08:24'),(401,47,NULL,1,'Spot \"Test\" was added to \"(:30) TV\" campaign','2018-05-14 23:34:23'),(402,47,NULL,1,'Spot \"Test2\" was added to \"(:30) TV\" campaign','2018-05-14 23:38:42'),(403,47,71,1,'Music team request was changed on campaign \"Test\"','2018-05-16 16:17:51'),(404,47,71,1,'Writing team request was changed on campaign \"Test\"','2018-05-16 16:17:51'),(405,47,1,1,'Campaign \"Teaser\" was added to project \"Annihilation\"','2018-05-16 16:27:10'),(406,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-16 16:34:06'),(407,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-16 16:34:06'),(408,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-05-16 16:35:06'),(409,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:40:33'),(410,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:40:33'),(411,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:46'),(412,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:46'),(413,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:47'),(414,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:47'),(415,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:49'),(416,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:49'),(417,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:50'),(418,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:50'),(419,47,4,1,'Billing user \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-05-17 19:47:34'),(420,47,4,1,'Billing user \"MAXWELL ALBORN\" was removed from campaign \"(:30) TV\"','2018-05-17 19:47:50'),(421,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:09'),(422,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:09'),(423,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:45'),(424,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:45'),(425,47,NULL,1,'Version \"3\" was added to spot \"#1 Theory\"','2018-05-17 20:04:31'),(426,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:09:20'),(427,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:17:20'),(428,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:18:22'),(429,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:18:22'),(430,49,NULL,1,'Project \"Aquaman - Massey\" (codename: \"Ahab\") created for client \"Warner Bros.\"','2018-05-18 13:16:37'),(431,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman - Massey\"','2018-05-18 13:17:29'),(432,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman - Massey\"','2018-05-18 13:18:53'),(433,49,4,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"(:30) TV\"','2018-05-18 14:44:15'),(434,49,4,1,'Designer \"MEGAN LAUREN YOON\" was removed from campaign \"(:30) TV\"','2018-05-18 14:44:26'),(435,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman - Massey\"','2018-05-24 16:13:55'),(436,47,4,1,'User \"ALEXANDRA BATES\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-05-24 16:30:03'),(437,47,4,1,'User \"ALEXANDRA BATES\" was added to campaign \"(:30) TV\"','2018-05-24 16:30:03'),(438,47,4,1,'User \"MARK LAFONTANT\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-05-24 16:30:08'),(439,47,4,1,'User \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-05-24 16:30:09'),(440,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-24 16:48:24'),(441,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-24 16:48:24'),(442,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-24 16:53:20'),(443,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-24 16:53:20'),(444,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-24 18:08:34'),(445,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-24 18:08:34'),(446,47,4,1,'Editor \"KELLI GRIGGS\" was added to campaign \"(:30) TV\"','2018-05-24 18:13:12'),(447,47,4,1,'Editor \"JUSTINE TALLY SMITH\" was added to campaign \"(:30) TV\"','2018-05-24 18:13:15'),(448,47,4,1,'Editor \"JUSTINE TALLY SMITH\" was removed from campaign \"(:30) TV\"','2018-05-24 18:13:23'),(449,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-05-28 08:39:38'),(450,47,7,1,'Campaign \"Digital\" was removed from project \"Annihilation\"','2018-05-28 08:40:23'),(451,47,68,1,'Campaign \"Why\" was removed from project \"Annihilation\"','2018-05-28 08:51:33'),(452,47,NULL,1,'Version \"3\" was removed from spot \"#1 Theory\"','2018-05-28 09:20:59'),(453,47,NULL,1,'Version \"2\" was removed from spot \"#1 Theory\"','2018-05-28 09:21:01'),(454,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-05-28 11:21:13'),(455,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:32'),(456,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:32'),(457,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:55'),(458,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:55'),(459,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 08:15:47'),(460,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-05-29 08:17:13'),(461,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 08:20:43'),(462,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-05-29 08:21:56'),(463,47,2,1,'Campaign \"Trailer\" was added to project \"Annihilation\"','2018-05-29 09:51:35'),(464,47,2,1,'Campaign \"Trailer\" was added to project \"Annihilation\"','2018-05-29 13:29:21'),(465,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 15:19:01'),(466,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 16:13:59'),(467,47,1,1,'Campaign \"Teaser\" was removed from project \"Annihilation\"','2018-05-30 08:21:22'),(468,47,7,1,'Campaign \"Digital\" was removed from project \"Annihilation\"','2018-05-30 08:21:24'),(469,47,68,1,'Campaign \"Why\" was removed from project \"Annihilation\"','2018-05-30 08:21:27'),(470,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-31 09:02:43'),(471,49,NULL,1,'Spot \"Water\" was added to \"(:30) TV\" campaign','2018-06-05 13:05:36'),(472,49,NULL,1,'Spot \"Agua\" was added to \"(:30) TV\" campaign','2018-06-05 13:07:01'),(473,49,NULL,1,'Spot \"eau\" was added to \"(:30) TV\" campaign','2018-06-05 13:09:50'),(474,49,NULL,1,'Spot \"Acqua\" was added to \"(:30) TV\" campaign','2018-06-05 13:11:17'),(475,49,NULL,1,'Version \"1\" was added to spot \"Acqua\"','2018-06-05 13:14:08'),(476,49,NULL,1,'Version \"2\" was added to spot \"Acqua\"','2018-06-05 13:14:18'),(477,49,NULL,1,'Version \"1\" was added to spot \"Water\"','2018-06-05 13:16:07'),(478,49,NULL,1,'Version \"2\" was added to spot \"Water\"','2018-06-05 13:16:10'),(479,49,NULL,1,'Version \"2\" was removed from spot \"Water\"','2018-06-05 13:16:29'),(480,49,NULL,1,'Spot \"Mizu\" was added to \"(:30) TV\" campaign','2018-06-05 13:21:30'),(481,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman - Massey\"','2018-06-05 19:48:06'),(482,49,7,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Digital\"','2018-06-06 13:27:33'),(483,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:34:34'),(484,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:11'),(485,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:18'),(486,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:35'),(487,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:43'),(488,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:36:16'),(489,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman - Massey\"','2018-06-06 13:36:29'),(490,49,1,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Teaser\"','2018-06-06 13:47:06'),(491,49,1,1,'Designer \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-06 13:47:11'),(492,49,1,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Teaser\"','2018-06-06 13:47:16'),(493,49,1,1,'Editor \"DAVID CREAL\" was added to campaign \"Teaser\"','2018-06-06 13:47:22'),(494,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-06 13:48:07'),(495,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-06 13:48:35'),(496,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-06 13:48:35'),(497,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-06 13:48:38'),(498,49,NULL,1,'Project renamed to \"\"Aquaman\" (codename: \"Ahab\")\" from \"Aquaman - Massey\"','2018-06-06 13:49:11'),(499,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman\"','2018-06-06 17:21:21'),(500,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-06 17:26:40'),(501,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-06 17:27:04'),(502,50,NULL,1,'Project \"Demo project1\" (codename: \"demo1\") created for client \"National Amusements\r\n\"','2018-06-07 13:02:53'),(503,50,4,1,'Campaign \"(:30) TV\" was added to project \"Demo project1\"','2018-06-07 13:03:07'),(504,50,6,1,'Campaign \"Home Entertainment\" was added to project \"Demo project1\"','2018-06-07 13:03:19'),(505,50,1,1,'Campaign \"Teaser\" was added to project \"Demo project1\"','2018-06-07 13:03:35'),(506,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-07 17:23:58'),(507,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-07 17:34:54'),(508,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-07 17:35:01'),(509,49,7,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Digital\"','2018-06-12 18:25:13'),(510,49,7,1,'Designer \"BETH ROY\" was added to campaign \"Digital\"','2018-06-12 18:25:14'),(511,49,NULL,1,'Spot \"Master\" was added to \"Teaser\" campaign','2018-06-12 20:26:54'),(512,49,70,1,'Campaign \"How\" was added to project \"Aquaman\"','2018-06-13 00:27:40'),(513,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-13 00:28:14'),(514,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-06-13 00:30:46'),(515,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-06-13 00:31:56'),(516,47,7,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Digital\"','2018-06-13 16:29:33'),(517,47,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-13 16:29:36'),(518,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-13 16:39:14'),(519,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman\"','2018-06-14 18:03:49'),(520,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-14 18:06:42'),(521,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-14 18:06:42'),(522,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-14 18:13:49'),(523,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-14 18:13:49'),(524,49,4,1,'User \"ASHLEY CAPUTO\" was added to campaign \"(:30) TV\"','2018-06-14 18:18:02'),(525,49,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-06-14 18:18:26'),(526,49,4,1,'Billing user \"ASHLEY CAPUTO\" was added to campaign \"(:30) TV\"','2018-06-14 18:21:19'),(527,49,4,1,'Editor \"DAVID CREAL\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:14'),(528,49,4,1,'Editor \"WESLEY NISBETT\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:25'),(529,49,4,1,'Editor \"BRYAN COLEMAN\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:31'),(530,49,4,1,'Designer \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:52'),(531,49,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-14 18:25:08'),(532,51,NULL,1,'Project \"Godzilla 2\" (codename: \"Fathom\") created for client \"Warner Bros.\"','2018-06-14 19:11:45'),(533,51,NULL,1,'Project renamed to \"\"Godzilla 2\" (codename: \"Fathom\")\" from \"Godzilla 2\"','2018-06-14 19:12:21'),(534,51,68,1,'Campaign \"Why\" was added to project \"Godzilla 2\"','2018-06-14 19:14:48'),(535,51,73,1,'Campaign \"Comicon\" was added to project \"Godzilla 2\"','2018-06-14 19:16:07'),(536,51,73,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Comicon\"','2018-06-14 19:37:26'),(537,51,73,1,'User \"ANDREW FARBER\" was added to campaign \"Comicon\"','2018-06-14 19:37:35'),(538,51,73,1,'User \"BETH ROY\" was added to campaign \"Comicon\"','2018-06-14 19:38:29'),(539,51,73,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"Comicon\"','2018-06-14 19:38:56'),(540,51,73,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Comicon\"','2018-06-14 19:40:26'),(541,51,73,1,'Editor \"DAVID CREAL\" was added to campaign \"Comicon\"','2018-06-14 19:40:38'),(542,51,73,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Comicon\"','2018-06-14 19:41:33'),(543,51,73,1,'Designer \"DAWN CHENETTE\" was added to campaign \"Comicon\"','2018-06-14 19:41:37'),(544,51,NULL,1,'Spot \"Tears\" was added to \"Comicon\" campaign','2018-06-14 19:51:11'),(545,51,4,1,'Campaign \"(:30) TV\" was added to project \"Godzilla 2\"','2018-06-14 19:57:26'),(546,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:15'),(547,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:16'),(548,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:17'),(549,51,4,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:25'),(550,51,4,1,'Editor \"DAVID CREAL\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:30'),(551,51,4,1,'Editor \"WESLEY NISBETT\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:30'),(552,51,4,1,'Designer \"DAWN CHENETTE\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:36'),(553,51,4,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:37'),(554,51,4,1,'Campaign \"(:30) TV\" was added to project \"Godzilla 2\"','2018-06-15 17:29:04'),(555,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-15 17:29:27'),(556,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-15 17:29:27'),(557,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-15 17:29:28'),(558,49,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-15 17:38:03'),(559,49,1,1,'User \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-15 20:12:50'),(560,49,1,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Teaser\"','2018-06-15 20:12:51'),(561,49,1,1,'User \"DAVID LIGORNER\" was added to campaign \"Teaser\"','2018-06-15 20:12:52'),(562,52,NULL,1,'Project \"The Muppets\" (codename: \"Parts\") created for client \"Disney\r\n\"','2018-06-19 17:17:29'),(563,52,1,1,'Campaign \"Teaser\" was added to project \"The Muppets\"','2018-06-19 17:19:12'),(564,52,1,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Teaser\"','2018-06-19 17:20:15'),(565,52,1,1,'Billing user \"KRYSTLE OPPENHEIMER\" was added to campaign \"Teaser\"','2018-06-19 17:20:51'),(566,52,1,1,'Editor \"STEVEN PINTO\" was added to campaign \"Teaser\"','2018-06-19 17:21:00'),(567,52,1,1,'Editor \"ULRICH SCHLEGEL\" was added to campaign \"Teaser\"','2018-06-19 17:21:09'),(568,52,1,1,'Designer \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-19 17:21:38'),(569,NULL,NULL,1,'Version \"1 Test\" was added to spot \"Master\"','2018-06-20 07:28:19'),(570,49,1,1,'Version \"2\" was added to spot \"Master\"','2018-06-22 17:29:32'),(571,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman\"','2018-06-22 17:38:09'),(572,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman\"','2018-06-22 17:39:49'),(573,47,NULL,1,'Spot \":15 TV Blue\" was added to \"(:30) TV\" campaign','2018-06-22 17:48:52'),(574,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-06-22 17:49:11'),(575,49,4,1,'Billing user \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-06-22 18:52:59'),(576,49,4,1,'Version \"2\" was added to spot \"Water\"','2018-06-22 18:55:44'),(577,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman\"','2018-06-22 19:16:42'),(578,49,NULL,1,'Spot \"Doran spot 1\" was added to \"Digital\" campaign','2018-06-22 19:18:33'),(579,49,7,1,'Version \"1\" was added to spot \"Doran spot 1\"','2018-06-22 19:18:39'),(580,49,NULL,1,'Spot \"Brodner Spot 1\" was added to \"Digital\" campaign','2018-06-22 19:19:09'),(581,49,NULL,1,'Spot \"Brodner Spot 2\" was added to \"Digital\" campaign','2018-06-22 19:19:42'),(582,49,NULL,1,'Spot \"New Spot\" was added to \"Digital\" campaign','2018-06-22 19:20:40'),(583,49,7,1,'Version \"1\" was added to spot \"New Spot\"','2018-06-22 19:20:47'),(584,49,7,1,'Version \"1\" was added to spot \"Brodner Spot 2\"','2018-06-22 19:20:57'),(585,49,7,1,'Version \"1\" was added to spot \"Brodner Spot 1\"','2018-06-22 19:21:07'),(586,49,NULL,1,'Spot \"Tracy\" was added to \"Digital\" campaign','2018-06-22 19:23:01'),(587,49,7,1,'Version \"2\" was added to spot \"Brodner Spot 2/Lyle took over\"','2018-06-22 19:30:52'),(588,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-22 19:41:12'),(589,49,4,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"(:30) TV\"','2018-06-22 20:05:36'),(590,49,4,1,'Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"','2018-06-22 20:05:39'),(591,49,4,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"(:30) TV\"','2018-06-22 20:05:47'),(592,49,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-06-22 20:07:21'),(593,49,1,1,'Version \"2\" was removed from spot \"Master\"','2018-06-23 00:05:13'),(594,49,1,1,'User \"DAVID LIGORNER\" was removed from campaign \"Teaser\"','2018-06-25 07:44:15'),(595,49,1,1,'User \"ASHLEY CAPUTO\" was changed to \"Producer\" on campaign \"Teaser\"','2018-06-25 07:44:21'),(596,49,1,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Teaser\"','2018-06-25 07:44:21'),(597,49,4,1,'User \"BETH ROY\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-06-25 09:40:00'),(598,49,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-25 09:40:00'),(599,52,1,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Producer\" on campaign \"Teaser\"','2018-06-26 13:10:43'),(600,52,1,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Teaser\"','2018-06-26 13:10:43'),(601,49,1,1,'User \"EUGENE FILLIOS\" was added to campaign \"Teaser\"','2018-06-26 13:11:25'),(602,49,1,1,'User \"EUGENE FILLIOS\" was changed to \"Lead Producer\" on campaign \"Teaser\"','2018-06-26 13:11:27'),(603,49,1,1,'User \"EUGENE FILLIOS\" was added to campaign \"Teaser\"','2018-06-26 13:11:27'),(604,49,1,1,'User \"ASHLEY CAPUTO\" was removed from campaign \"Teaser\"','2018-06-26 13:11:32'),(605,49,1,1,'User \"ANGELIQUE BENSON\" was added to campaign \"Teaser\"','2018-06-26 13:11:43'),(606,49,1,1,'User \"ANGELIQUE BENSON\" was changed to \"Associate Producer\" on campaign \"Teaser\"','2018-06-26 13:11:46'),(607,49,1,1,'User \"ANGELIQUE BENSON\" was added to campaign \"Teaser\"','2018-06-26 13:11:46'),(608,49,1,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"Teaser\"','2018-06-26 13:11:52'),(609,49,1,1,'User \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-26 13:11:52'),(610,49,4,1,'User \"DAVID LIGORNER\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-06-26 13:12:12'),(611,49,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-06-26 13:12:12'),(612,49,4,1,'User \"MACKLIN SAMETH\" was changed to \"Associate Producer\" on campaign \"(:30) TV\"','2018-06-26 13:12:16'),(613,49,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-06-26 13:12:16'),(614,49,4,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-06-26 13:12:25'),(615,49,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-26 13:12:25'),(616,49,4,1,'User \"ASHLEY CAPUTO\" was removed from campaign \"(:30) TV\"','2018-06-26 13:12:27'),(617,49,7,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"Digital\"','2018-06-26 13:12:51'),(618,49,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-26 13:12:51'),(619,49,2,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Trailer\"','2018-06-26 13:13:10'),(620,49,2,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"Trailer\"','2018-06-26 13:13:12'),(621,49,2,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Trailer\"','2018-06-26 13:13:12'),(622,49,2,1,'User \"ANDREW FARBER\" was added to campaign \"Trailer\"','2018-06-26 13:13:17'),(623,49,2,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"Trailer\"','2018-06-26 13:13:21'),(624,49,2,1,'User \"ANDREW FARBER\" was added to campaign \"Trailer\"','2018-06-26 13:13:21'),(625,51,73,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"Comicon\"','2018-06-26 13:13:45'),(626,51,73,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Comicon\"','2018-06-26 13:13:45'),(627,51,73,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"Comicon\"','2018-06-26 13:13:49'),(628,51,73,1,'User \"BETH ROY\" was added to campaign \"Comicon\"','2018-06-26 13:13:49'),(629,51,73,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"Comicon\"','2018-06-26 13:13:54'),(630,51,73,1,'User \"ANDREW FARBER\" was added to campaign \"Comicon\"','2018-06-26 13:13:54'),(631,51,4,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-06-26 13:14:13'),(632,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-26 13:14:13'),(633,51,4,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-06-26 13:14:19'),(634,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-26 13:14:19'),(635,51,4,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-06-26 13:14:26'),(636,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-26 13:14:26'),(637,51,4,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-06-26 13:32:16'),(638,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-26 13:32:16'),(639,51,4,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-06-26 13:32:24'),(640,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-26 13:32:24'),(641,51,4,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-06-26 13:32:27'),(642,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-26 13:32:27'),(643,47,4,1,'Version \"1\" was added to spot \"#2 Saved\"','2018-06-26 13:37:23'),(644,51,73,1,'Version \"1\" was added to spot \"Tears\"','2018-06-26 13:39:33'),(645,51,NULL,1,'Spot \"Brodner Spot 1\" was added to \"(:30) TV\" campaign','2018-06-26 13:45:03'),(646,51,4,1,'Version \"1\" was added to spot \"Brodner Spot 1\"','2018-06-26 13:45:11'),(647,51,NULL,1,'Spot \"Creal Spot 1\" was added to \"(:30) TV\" campaign','2018-06-26 13:46:11'),(648,51,4,1,'Version \"1\" was added to spot \"Creal Spot 1\"','2018-06-26 13:46:15'),(649,51,NULL,1,'Spot \"Schlegs Spot 1\" was added to \"(:30) TV\" campaign','2018-06-26 13:49:25'),(650,51,4,1,'Version \"1\" was added to spot \"Schlegs Spot 1\"','2018-06-26 13:49:30'),(651,51,NULL,1,'Spot \"Brodner Spot 2\" was added to \"(:30) TV\" campaign','2018-06-26 13:53:36'),(652,51,4,1,'Version \"1\" was added to spot \"Brodner Spot 2\"','2018-06-26 13:54:15'),(653,51,4,1,'Version \"1ARev\" was added to spot \"Creal Spot 1\"','2018-06-26 14:05:18'),(654,51,4,1,'Version \"1BRev\" was added to spot \"Creal Spot 1\"','2018-06-26 14:05:42'),(655,51,4,1,'Version \"2Rev\" was added to spot \"Schlegs Spot 1\"','2018-06-26 14:06:44'),(656,51,4,1,'Version \"2A Rev\" was added to spot \"Schlegs Spot 1\"','2018-06-26 14:09:00'),(657,51,73,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"Comicon\"','2018-06-26 17:05:20'),(658,51,73,1,'Version \"21A\" was added to spot \"Tears\"','2018-06-26 19:19:39'),(659,51,4,1,'Version \"2\" was added to spot \"Brodner Spot 1\"','2018-06-27 16:26:21'),(660,51,7,1,'Campaign \"Digital\" was added to project \"Godzilla 2\"','2018-06-27 19:12:38'),(661,51,7,1,'User \"ANDREW FARBER\" was added to campaign \"Digital\"','2018-06-27 19:12:51'),(662,51,7,1,'User \"BETH ROY\" was added to campaign \"Digital\"','2018-06-27 19:12:52'),(663,51,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-27 19:12:53'),(664,51,7,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-27 19:13:57'),(665,51,7,1,'Editor \"DAVID CREAL\" was added to campaign \"Digital\"','2018-06-27 19:14:03'),(666,51,7,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Digital\"','2018-06-27 19:14:04'),(667,51,7,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"Digital\"','2018-06-27 19:14:11'),(668,51,7,1,'Designer \"DAWN CHENETTE\" was added to campaign \"Digital\"','2018-06-27 19:14:15'),(669,51,7,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Digital\"','2018-06-27 19:14:16'),(670,51,73,1,'Version \"20B\" was added to spot \"Tears\"','2018-06-29 11:05:55'),(671,51,73,1,'Version \"21C\" was added to spot \"Tears\"','2018-06-29 12:08:00'),(672,53,NULL,1,'Project \"Shazam\" (codename: \"Franklin\") created for client \"Warner Bros.\"','2018-07-06 18:09:38'),(673,53,73,1,'Campaign \"Comicon\" was added to project \"Shazam\"','2018-07-06 18:10:02'),(674,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 18:54:39'),(675,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-06 18:54:49'),(676,53,73,1,'User \"DAVID LIGORNER\" was changed to \"Lead Producer\" on campaign \"Comicon\"','2018-07-06 18:54:53'),(677,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 18:54:53'),(678,53,73,1,'User \"MACKLIN SAMETH\" was changed to \"Associate Producer\" on campaign \"Comicon\"','2018-07-06 18:55:05'),(679,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-06 18:55:05'),(680,53,73,1,'Billing user \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 18:55:22'),(681,53,73,1,'Editor \"DAVID CREAL\" was added to campaign \"Comicon\"','2018-07-06 18:56:19'),(682,53,73,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Comicon\"','2018-07-06 18:57:25'),(683,53,73,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"Comicon\"','2018-07-06 18:57:44'),(684,53,73,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Comicon\"','2018-07-06 18:58:56'),(685,53,73,1,'Designer \"MARY ELIZABETH COX\" was added to campaign \"Comicon\"','2018-07-06 18:59:48'),(686,53,73,1,'Designer \"SARAH SHAE HALAS WERBER\" was added to campaign \"Comicon\"','2018-07-06 19:00:19'),(687,53,73,1,'Designer \"SARAH SHAE HALAS WERBER\" was removed from campaign \"Comicon\"','2018-07-06 19:00:29'),(688,53,NULL,1,'Spot \"Power Outage\" was added to \"Comicon\" campaign','2018-07-06 19:03:10'),(689,53,73,1,'Campaign \"Comicon\" was added to project \"Shazam\"','2018-07-06 19:03:21'),(690,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-06 19:04:45'),(691,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 19:04:46'),(692,53,73,1,'Billing user \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 19:04:53'),(693,53,73,1,'Editor \"DAVID CREAL\" was added to campaign \"Comicon\"','2018-07-06 19:05:02'),(694,53,73,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Comicon\"','2018-07-06 19:05:10'),(695,53,73,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Comicon\"','2018-07-06 19:05:11'),(696,53,73,1,'Designer \"MARY ELIZABETH COX\" was added to campaign \"Comicon\"','2018-07-06 19:05:12'),(697,53,73,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"Comicon\"','2018-07-06 19:05:13'),(698,53,NULL,1,'Spot \"Blitz\" was added to \"Comicon\" campaign','2018-07-06 19:07:40'),(699,53,73,1,'Version \"1\" was added to spot \"Power Outage\"','2018-07-06 19:14:43'),(700,51,NULL,1,'Spot \"Fears\" was added to \"Comicon\" campaign','2018-07-06 19:50:27'),(701,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-24 18:33:04'),(702,53,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-07-24 18:33:16'),(703,53,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-07-24 18:33:17'),(704,53,4,1,'User \"MACKLIN SAMETH\" was removed from campaign \"(:30) TV\"','2018-07-24 18:33:46'),(705,53,4,1,'User \"DAVID LIGORNER\" was removed from campaign \"(:30) TV\"','2018-07-24 18:33:48'),(706,53,73,1,'User \"MACKLIN SAMETH\" was changed to \"Associate Producer\" on campaign \"Comicon\"','2018-07-24 18:34:09'),(707,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-24 18:34:09'),(708,53,73,1,'User \"DAVID LIGORNER\" was changed to \"Lead Producer\" on campaign \"Comicon\"','2018-07-24 18:34:12'),(709,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-24 18:34:12'),(710,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-24 18:34:27'),(711,53,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-07-24 18:34:38'),(712,53,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-07-24 18:34:39'),(713,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-24 18:37:22'),(714,53,NULL,1,'Spot \"Red\" was added to \"(:30) TV\" campaign','2018-07-24 18:40:02'),(715,53,4,1,'Version \"1\" was added to spot \"Red\"','2018-07-24 18:40:09'),(716,53,NULL,1,'Spot \"Green\" was added to \"(:30) TV\" campaign','2018-07-24 18:40:25'),(717,53,4,1,'Version \"1\" was added to spot \"Green\"','2018-07-24 18:40:30'),(718,53,4,1,'Version \"2alt\" was added to spot \"Red\"','2018-07-24 18:53:29'),(719,53,4,1,'Version \"2alt\" was removed from spot \"Red\"','2018-07-24 18:53:48'),(720,53,4,1,'Version \"2alt\" was added to spot \"Red\"','2018-07-24 18:54:02'),(721,53,4,1,'Version \"2\" was added to spot \"Red\"','2018-07-24 18:54:10'),(722,53,4,1,'Version \"2A Rev 2\" was added to spot \"Red\"','2018-07-24 18:54:47'),(723,53,4,1,'Version \"2A Rev 3\" was added to spot \"Red\"','2018-07-24 18:55:05'),(724,53,4,1,'Version \"2A Rev 4\" was added to spot \"Red\"','2018-07-24 18:55:26'),(725,53,4,1,'Version \"3ARev2\" was added to spot \"Red\"','2018-07-24 19:00:47'),(726,53,NULL,1,'Spot \"Blue\" was added to \"(:30) TV\" campaign','2018-07-24 19:26:48'),(727,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-25 14:41:12'),(728,54,NULL,1,'Project \"Wreck It Ralph 2\" (codename: \"Popcorn\") created for client \"Disney\r\n\"','2018-07-26 16:51:49'),(729,54,2,1,'Campaign \"Trailer\" was added to project \"Wreck It Ralph 2\"','2018-07-26 16:52:01'),(730,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 16:52:44'),(731,54,2,1,'Billing user \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 16:52:52'),(732,54,2,1,'Editor \"STEVEN PINTO\" was added to campaign \"Trailer\"','2018-07-26 16:53:00'),(733,54,2,1,'Designer \"DAWN CHENETTE\" was added to campaign \"Trailer\"','2018-07-26 16:53:06'),(734,54,2,1,'Designer \"BOBBY SALZANO\" was added to campaign \"Trailer\"','2018-07-26 16:53:21'),(735,54,2,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Trailer\"','2018-07-26 16:53:27'),(736,54,2,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"Trailer\"','2018-07-26 16:53:35'),(737,54,NULL,1,'Spot \"Unbelievable\" was added to \"Trailer\" campaign','2018-07-26 16:54:54'),(738,54,2,1,'Version \"1\" was added to spot \"Unbelievable\"','2018-07-26 16:55:00'),(739,54,2,1,'Version \"1 Rev\" was added to spot \"Unbelievable\"','2018-07-26 16:55:04'),(740,54,2,1,'Version \"2\" was added to spot \"Unbelievable\"','2018-07-26 16:55:37'),(741,54,2,1,'Version \"2alt\" was added to spot \"Unbelievable\"','2018-07-26 16:55:48'),(742,54,2,1,'Version \"2altrev\" was added to spot \"Unbelievable\"','2018-07-26 16:56:07'),(743,54,2,1,'Version \"2Rev\" was added to spot \"Unbelievable\"','2018-07-26 16:56:21'),(744,54,2,1,'Version \"3\" was added to spot \"Unbelievable\"','2018-07-26 16:56:34'),(745,54,2,1,'Version \"4\" was added to spot \"Unbelievable\"','2018-07-26 16:56:41'),(746,54,2,1,'Version \"4 Alt\" was added to spot \"Unbelievable\"','2018-07-26 16:56:45'),(747,54,2,1,'Version \"5\" was added to spot \"Unbelievable\"','2018-07-26 16:56:56'),(748,54,2,1,'Version \"5 Alt\" was added to spot \"Unbelievable\"','2018-07-26 16:56:59'),(749,54,2,1,'Version \"6\" was added to spot \"Unbelievable\"','2018-07-26 16:57:08'),(750,54,2,1,'Version \"6 Rev\" was added to spot \"Unbelievable\"','2018-07-26 16:57:27'),(751,54,2,1,'Version \"7\" was added to spot \"Unbelievable\"','2018-07-26 16:57:34'),(752,54,2,1,'Version \"2alt\" was removed from spot \"Unbelievable\"','2018-07-26 17:02:26'),(753,54,2,1,'Version \"2altrev\" was removed from spot \"Unbelievable\"','2018-07-26 17:02:35'),(754,54,2,1,'Version \"2Rev\" was removed from spot \"Unbelievable\"','2018-07-26 17:06:07'),(755,54,2,1,'Version \"3 Alt\" was added to spot \"Unbelievable\"','2018-07-26 17:06:29'),(756,54,2,1,'Version \"5 Alt2\" was added to spot \"Unbelievable\"','2018-07-26 17:07:59'),(757,54,2,1,'Version \"5 Alt3\" was added to spot \"Unbelievable\"','2018-07-26 17:08:32'),(758,54,2,1,'Version \"6 Rev\" was removed from spot \"Unbelievable\"','2018-07-26 17:08:41'),(759,54,2,1,'Version \"8\" was added to spot \"Unbelievable\"','2018-07-26 17:08:50'),(760,54,NULL,1,'Spot \"Searching\" was added to \"Trailer\" campaign','2018-07-26 17:16:28'),(761,54,2,1,'Version \"1\" was added to spot \"Searching\"','2018-07-26 17:17:42'),(762,54,2,1,'Version \"1 Alt\" was added to spot \"Searching\"','2018-07-26 17:17:47'),(763,54,2,1,'Version \"2\" was added to spot \"Searching\"','2018-07-26 17:17:51'),(764,54,2,1,'Version \"2 Alt\" was added to spot \"Searching\"','2018-07-26 17:17:54'),(765,54,2,1,'Version \"2 Rev\" was added to spot \"Searching\"','2018-07-26 17:18:02'),(766,54,2,1,'Version \"2 AltRev\" was added to spot \"Searching\"','2018-07-26 17:18:47'),(767,54,2,1,'Version \"3\" was added to spot \"Searching\"','2018-07-26 17:18:59'),(768,54,2,1,'Version \"4\" was added to spot \"Searching\"','2018-07-26 17:19:05'),(769,54,2,1,'Version \"4 Alt\" was added to spot \"Searching\"','2018-07-26 17:19:11'),(770,54,2,1,'Version \"5\" was added to spot \"Searching\"','2018-07-26 17:20:56'),(771,54,2,1,'Version \"5 Alt\" was added to spot \"Searching\"','2018-07-26 17:21:03'),(772,54,2,1,'Version \"6\" was added to spot \"Searching\"','2018-07-26 17:21:10'),(773,54,2,1,'Version \"6 Alt\" was added to spot \"Searching\"','2018-07-26 17:21:14'),(774,54,2,1,'Version \"6 Alt\" was removed from spot \"Searching\"','2018-07-26 17:21:23'),(775,54,2,1,'Version \"6 Rev\" was added to spot \"Searching\"','2018-07-26 17:21:30'),(776,54,2,1,'Version \"7\" was added to spot \"Searching\"','2018-07-26 17:21:37'),(777,54,2,1,'Version \"8\" was added to spot \"Searching\"','2018-07-26 17:21:42'),(778,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Lead Producer\" on campaign \"Trailer\"','2018-07-26 17:22:41'),(779,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 17:22:41'),(780,54,2,1,'User \"MARK LAFONTANT\" was added to campaign \"Trailer\"','2018-07-26 17:22:48'),(781,54,2,1,'User \"MARK LAFONTANT\" was changed to \"Producer\" on campaign \"Trailer\"','2018-07-26 17:22:51'),(782,54,2,1,'User \"MARK LAFONTANT\" was added to campaign \"Trailer\"','2018-07-26 17:22:51'),(783,54,2,1,'User \"MARK LAFONTANT\" was removed from campaign \"Trailer\"','2018-07-26 17:23:00'),(784,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Producer\" on campaign \"Trailer\"','2018-07-26 17:23:04'),(785,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 17:23:04'),(786,47,4,1,'User \"ALEXANDRA BATES\" was added to campaign \"(:30) TV\"','2018-08-01 19:35:55'),(787,47,4,1,'User \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-08-01 19:35:55'),(788,47,4,1,'Billing user \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:11'),(789,47,4,1,'Editor \"JACOB LAWRENCE MOSKOW\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:18'),(790,47,4,1,'Editor \"KELLI GRIGGS\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:19'),(791,47,4,1,'Editor \"WILLIAM NEIL\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:20'),(792,47,4,1,'Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:27'),(793,47,4,1,'Designer \"BRADFORD BERLING\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:27'),(794,47,4,1,'User \"MARK LAFONTANT\" was removed from campaign \"(:30) TV\"','2018-08-01 19:38:45'),(795,47,4,1,'User \"ALEXANDRA BATES\" was removed from campaign \"(:30) TV\"','2018-08-01 19:38:48'),(796,47,4,1,'User \"TONY FANG\" was added to campaign \"(:30) TV\"','2018-08-01 19:39:01'),(797,49,4,1,'Version \"3\" was added to spot \"Water\"','2018-08-13 15:59:29'),(798,54,2,1,'Version \"9\" was added to spot \"Unbelievable\"','2018-08-15 14:43:28'),(799,54,2,1,'Version \"9 Alt\" was added to spot \"Unbelievable\"','2018-08-15 14:43:31'),(800,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-08-20 03:41:20'),(801,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-08-20 03:41:20'),(802,47,2,1,'Version \"1A\" was added to spot \"#1 Interrogation\"','2018-08-20 03:45:18'),(803,55,NULL,1,'Project \"On the Basis of Sex\" created for client \"Focus\r\n\"','2018-08-21 16:59:00'),(804,55,4,1,'Campaign \"(:30) TV\" was added to project \"On the Basis of Sex\"','2018-08-21 16:59:25'),(805,55,4,1,'User \"TIZIANA GRACE SIMPSON\" was added to campaign \"(:30) TV\"','2018-08-21 17:00:48'),(806,55,4,1,'User \"ASHLEY CAPUTO\" was added to campaign \"(:30) TV\"','2018-08-21 17:00:55'),(807,55,4,1,'Billing user \"TIZIANA GRACE SIMPSON\" was added to campaign \"(:30) TV\"','2018-08-21 17:01:04'),(808,55,4,1,'Editor \"ULRICH SCHLEGEL\" was added to campaign \"(:30) TV\"','2018-08-21 17:01:15'),(809,55,4,1,'Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"','2018-08-21 17:01:48'),(810,55,4,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"(:30) TV\"','2018-08-21 17:01:53'),(811,55,NULL,1,'Spot \"Legendary\" was added to \"(:30) TV\" campaign','2018-08-21 17:02:14'),(812,55,4,1,'Version \"1\" was added to spot \"Legendary\"','2018-08-21 17:02:20'),(813,56,NULL,1,'Project \"Elephants\" created for client \"Disney\r\n\"','2018-08-21 18:04:42'),(814,56,4,1,'Campaign \"(:30) TV\" was added to project \"Elephants\"','2018-08-21 18:04:57'),(815,56,7,1,'Campaign \"Digital\" was added to project \"Elephants\"','2018-08-21 21:43:56'),(816,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-08-24 13:26:26'),(817,47,6,1,'Campaign \"Home Entertainment\" was added to project \"Annihilation\"','2018-09-06 18:19:37'),(818,47,6,1,'User \"ALEXANDRA BATES\" was added to campaign \"Home Entertainment\"','2018-09-06 18:20:42'),(819,47,6,1,'User \"MARK LAFONTANT\" was added to campaign \"Home Entertainment\"','2018-09-06 18:20:43'),(820,47,4,1,'Version \"1A\" was added to spot \"#5 Threat\"','2018-09-23 17:13:19'),(821,47,4,1,'Version \"1A\" was removed from spot \"#5 Threat\"','2018-09-23 17:14:44'),(822,47,4,1,'Version \"1A\" was added to spot \"#5 Threat\"','2018-09-23 17:15:03'),(823,47,4,1,'Version \"1A\" was removed from spot \"#5 Threat\"','2018-09-23 17:59:16'),(824,57,NULL,1,'Project \"Marina Doesn\'t Care\" (codename: \"Carrots\") created for client \"Naughty Dog\r\n\"','2018-09-26 20:47:15'),(825,47,2,1,'Version \"1\" was added to spot \"#1 Interrogation\"','2018-10-03 16:27:09'),(826,47,2,1,'Version \"1B\" was added to spot \"#1 Interrogation\"','2018-10-03 16:27:37'),(827,47,2,1,'Version \"2\" was added to spot \"#1 Interrogation\"','2018-10-03 21:18:54'),(828,47,70,1,'Campaign \"How\" was added to project \"Annihilation\"','2018-10-07 05:53:06'),(829,54,2,1,'User \"TIZIANA GRACE SIMPSON\" was added to campaign \"Trailer\"','2018-10-11 19:34:43'),(830,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Lead Producer\" on campaign \"Trailer\"','2018-10-11 19:34:51'),(831,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-10-11 19:34:51'),(832,54,2,1,'User \"TIZIANA GRACE SIMPSON\" was changed to \"Producer\" on campaign \"Trailer\"','2018-10-11 19:34:53'),(833,54,2,1,'User \"TIZIANA GRACE SIMPSON\" was added to campaign \"Trailer\"','2018-10-11 19:34:53'),(834,54,2,1,'Designer \"MEGAN LAUREN YOON\" was removed from campaign \"Trailer\"','2018-10-11 19:36:49'),(835,54,4,1,'Campaign \"(:30) TV\" was added to project \"Wreck It Ralph 2\"','2018-10-11 19:38:17'),(836,54,4,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"(:30) TV\"','2018-10-11 19:39:31'),(837,54,4,1,'User \"TIZIANA GRACE SIMPSON\" was added to campaign \"(:30) TV\"','2018-10-11 19:39:32'),(838,54,4,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-10-11 19:39:47'),(839,54,4,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"(:30) TV\"','2018-10-11 19:39:47'),(840,54,4,1,'User \"TIZIANA GRACE SIMPSON\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-10-11 19:39:49'),(841,54,4,1,'User \"TIZIANA GRACE SIMPSON\" was added to campaign \"(:30) TV\"','2018-10-11 19:39:49'),(842,54,4,1,'User \"TIZIANA GRACE SIMPSON\" was removed from campaign \"(:30) TV\"','2018-10-11 19:39:56'),(843,54,4,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-10-11 19:40:02'),(844,54,4,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:02'),(845,54,4,1,'Billing user \"KRYSTLE OPPENHEIMER\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:18'),(846,54,4,1,'Editor \"STEVEN PINTO\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:32'),(847,54,4,1,'Designer \"BOBBY SALZANO\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:41'),(848,54,4,1,'Designer \"DAWN CHENETTE\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:42'),(849,54,4,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:43'),(850,54,NULL,1,'Spot \"Ralph\" was added to \"(:30) TV\" campaign','2018-10-11 19:42:29'),(851,54,4,1,'Version \"1\" was added to spot \"Ralph\"','2018-10-11 19:43:27'),(852,47,73,1,'Campaign \"Comicon\" was added to project \"Annihilation\"','2018-10-14 14:39:49'),(853,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-10-15 17:44:43'),(854,47,2,1,'Billing user \"MARK LAFONTANT\" was added to campaign \"Trailer\"','2018-10-17 16:53:03'),(855,47,7,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"Digital\"','2018-10-17 16:54:26'),(856,47,7,1,'User \"MARIE BYRNES\" was added to campaign \"Digital\"','2018-10-17 16:54:28'),(857,54,2,1,'User \"TIZIANA GRACE SIMPSON\" was removed from campaign \"Trailer\"','2018-10-18 14:23:12'),(858,54,NULL,1,'Spot \"China 30\" was added to \"(:30) TV\" campaign','2018-10-19 13:42:29'),(859,54,4,1,'Version \"1\" was added to spot \"China 30\"','2018-10-19 13:42:42'),(860,54,4,1,'Version \"2\" was added to spot \"China 30\"','2018-10-19 13:42:50'),(861,54,4,1,'Version \"3\" was added to spot \"China 30\"','2018-10-19 13:42:56'),(862,54,2,1,'Editor \"JESSICA DADON\" was added to campaign \"Trailer\"','2018-10-19 13:50:34'),(863,54,4,1,'Editor \"JESSICA DADON\" was added to campaign \"(:30) TV\"','2018-10-19 13:50:48'),(864,47,NULL,1,'Project renamed to \"\"Annihilation1\"\" from \"Annihilation\"','2018-10-21 08:06:45'),(865,47,NULL,1,'Project renamed to \"\"Annihilation\"\" from \"Annihilation1\"','2018-10-21 08:07:32'),(866,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-10-21 10:14:09'),(867,47,70,1,'Campaign \"How\" was added to project \"Annihilation\"','2018-10-21 10:14:17'),(868,47,1,1,'Campaign \"Teaser\" was added to project \"Annihilation\"','2018-10-21 10:18:06'),(869,47,3,1,'Campaign \"AV Sizzle/Reel\" was added to project \"Annihilation\"','2018-10-21 19:17:36'),(870,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-10-21 19:19:07'),(871,47,70,1,'Campaign \"How\" was added to project \"Annihilation\"','2018-10-21 19:19:20'),(872,47,70,1,'Campaign \"How\" was added to project \"Annihilation\"','2018-10-21 19:19:42'),(873,47,70,1,'Campaign \"How\" was added to project \"Annihilation\"','2018-10-21 19:19:53'),(874,47,2,1,'Campaign \"AV Radio\" was added to project \"Annihilation\"','2018-10-21 20:35:16'),(875,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-10-21 20:35:38'),(876,39,NULL,1,'Project created','2018-10-22 22:16:36'),(877,58,NULL,1,'Project created','2018-10-22 22:16:36'),(878,59,NULL,1,'Project created','2018-10-22 22:16:36'),(879,60,NULL,1,'Project created','2018-10-22 22:16:36'),(880,61,NULL,1,'Project created','2018-10-22 22:16:36'),(881,62,NULL,1,'Project created','2018-10-22 22:16:36'),(882,63,NULL,1,'Project created','2018-10-22 22:16:36'),(883,64,NULL,1,'Project created','2018-10-22 22:16:36'),(884,65,NULL,1,'Project created','2018-10-22 22:16:36'),(885,66,NULL,1,'Project created','2018-10-22 22:16:36'),(886,67,NULL,1,'Project created','2018-10-22 22:16:36'),(887,68,NULL,1,'Project created','2018-10-22 22:16:36'),(888,69,NULL,1,'Project created','2018-10-22 22:16:36'),(889,70,NULL,1,'Project created','2018-10-22 22:16:36'),(890,71,NULL,1,'Project created','2018-10-22 22:16:36'),(891,72,NULL,1,'Project created with name \"\"a p\" (codename: \"abc\")\"','2018-10-22 18:30:02'),(892,73,NULL,1,'Project created with name \"\"Test 1\" (codename: \"Test 22222\")\"','2018-10-23 12:41:35'),(893,39,NULL,1,'Project renamed to \"\"Game of Thrones1\"\" from \"Game of Thrones\"','2018-10-23 13:12:00'),(894,39,NULL,1,'Project renamed to \"\"Game of Thrones\"\" from \"Game of Thrones1\"','2018-10-23 13:12:33'),(895,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-23 17:29:26'),(896,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-23 17:29:26'),(897,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 05:44:11'),(898,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 05:44:11'),(899,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 05:51:27'),(900,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 05:51:27'),(901,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:11:50'),(902,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:11:50'),(903,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:18:46'),(904,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:18:46'),(905,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:41:32'),(906,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:41:32'),(907,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:48:30'),(908,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:48:30'),(909,47,4,1,'Version \"11test\" was added to spot \"#1 Theory aka \"Truce\"\"','2018-10-27 13:32:08'),(910,47,NULL,1,'Version \"11test223345\" was added to spot\"#1 Theory aka \"Truce\"\" from \"AV Teaser/Trailer\" campaign','2018-10-27 14:18:50'),(911,47,NULL,1,'Version \"11test2233456\" was added to spot\"#1 Theory aka \"Truce\"\" from \"AV Teaser/Trailer\" campaign','2018-10-27 14:19:00'),(912,47,NULL,1,'Version \"1111\" was added to spot\"#1 Theory aka \"Truce\"\" from \"AV Teaser/Trailer\" campaign','2018-10-27 14:21:05'),(913,47,NULL,1,'Version \"111188\" was added to spot\"#1 Theory aka \"Truce\"\" from \"AV Teaser/Trailer\" campaign','2018-10-27 14:23:57'),(914,47,NULL,1,'Version \"1111886\" was added to spot\"#1 Theory aka \"Truce\"\" from \"AV Teaser/Trailer\" campaign','2018-10-27 14:25:47'),(915,47,NULL,1,'Version \"112233445566\" was added to spot\"#1 Theory aka \"Truce\"\" from \"AV Teaser/Trailer\" campaign','2018-10-27 14:26:09'),(916,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:45:02'),(917,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:45:02'),(918,47,4,1,'Version \"1A\" was added to spot \"#1 Theory aka \"Truce\"\"','2018-10-27 15:10:16'),(919,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-30 18:21:45'),(920,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-30 18:21:45'),(921,47,4,1,'User \"JULIE DAVIS\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 03:53:17'),(922,47,4,1,'User \"JULIE DAVIS\" was changed to \"Producer\" on campaign \"AV Teaser/Trailer\"','2018-10-31 03:53:23'),(923,47,4,1,'User \"JULIE DAVIS\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 03:53:23'),(924,47,4,1,'User \"MARIE BYRNES\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 03:53:39'),(925,47,4,1,'User \"JULIE DAVIS\" was removed from campaign \"AV Teaser/Trailer\"','2018-10-31 03:53:53'),(926,47,4,1,'User \"MARIE BYRNES\" was removed from campaign \"AV Teaser/Trailer\"','2018-10-31 03:53:57'),(927,47,4,1,'Billing user \"ASHLEY CAPUTO\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 03:54:43'),(928,47,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 03:55:21'),(929,47,4,1,'User \"TONY FANG\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 03:57:16'),(930,47,4,1,'User \"TONY FANG\" was removed from campaign \"AV Teaser/Trailer\"','2018-10-31 03:59:03'),(931,47,4,1,'User \"JAMIE ZAKOSKI\" was removed from campaign \"AV Teaser/Trailer\"','2018-10-31 03:59:06'),(932,47,4,1,'User \"MARIE BYRNES\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 03:59:13'),(933,47,4,1,'User \"MARIE BYRNES\" was changed to \"Lead Producer\" on campaign \"AV Teaser/Trailer\"','2018-10-31 03:59:28'),(934,47,4,1,'User \"MARIE BYRNES\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 03:59:28'),(935,47,4,1,'User \"MARIE BYRNES\" was removed from campaign \"AV Teaser/Trailer\"','2018-10-31 03:59:36'),(936,47,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 10:22:32'),(937,47,4,1,'User \"JAMIE ZAKOSKI\" was changed to \"Lead Producer\" on campaign \"AV Teaser/Trailer\"','2018-10-31 10:22:47'),(938,47,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 10:22:47'),(939,47,4,1,'User \"MARIE BYRNES\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 10:22:57'),(940,47,4,1,'User \"BLAKE HILL\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 18:54:07'),(941,47,4,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 19:14:09'),(942,39,1,1,'Campaign \"AV Digital\" was added to project \"Game of Thrones\"','2018-10-31 19:16:06'),(943,47,4,1,'User \"JULIE DAVIS\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 23:25:53'),(944,47,4,1,'User \"JULIE DAVIS\" was removed from campaign \"AV Teaser/Trailer\"','2018-10-31 23:26:15'),(945,47,NULL,1,'Version \"11\" was added to spot\"#1 Theory aka \"Truce\"\" from \"AV Teaser/Trailer\" campaign','2018-11-01 12:28:14'),(946,47,NULL,1,'Spot \"a\" was added to \"Broadcast\" campaign','2018-11-01 13:31:28'),(947,47,NULL,1,'Version \"9AbcDefGhi\" was added to spot\"a\" from \"Broadcast\" campaign','2018-11-01 13:31:57'),(948,47,NULL,1,'Version \"9AbcDefGhi111222\" was added to spot\"a\" from \"Broadcast\" campaign','2018-11-01 13:41:53'),(949,47,72,1,'Campaign \"Teaser Eugene\" was added to project \"Annihilation\"','2018-11-01 17:46:44'),(950,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-02 05:10:53'),(951,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-02 05:10:53'),(952,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-02 05:20:23'),(953,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-02 05:20:23'),(954,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-02 14:53:09'),(955,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-02 14:53:09'),(956,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-02 16:58:42'),(957,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-02 16:58:42'),(958,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 09:11:29'),(959,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 09:11:29'),(960,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 09:21:32'),(961,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 09:21:33'),(962,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 09:24:38'),(963,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 09:24:38'),(964,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 09:26:13'),(965,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 09:26:13'),(966,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 10:40:26'),(967,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 10:40:26'),(968,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 10:51:33'),(969,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 10:51:33'),(970,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 15:31:27'),(971,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-04 15:31:27'),(972,47,71,1,'Music team request was changed on campaign \"Test\"','2018-11-04 15:35:27'),(973,47,71,1,'Writing team request was changed on campaign \"Test\"','2018-11-04 15:35:27'),(974,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-05 15:45:25'),(975,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-05 15:45:25'),(976,51,3,1,'Campaign \"AV Sizzle/Reel\" was added to project \"Godzilla 2\"','2018-11-06 08:23:33'),(977,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-06 16:21:04'),(978,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-06 16:21:04'),(979,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-06 17:08:14'),(980,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-06 17:08:14'),(981,47,2,1,'Writing team request was changed on campaign \"AV Radio\"','2018-11-07 17:07:26'),(982,3,1,1,'Campaign \"AV Digital\" was added to project \"Bravo 14\"','2018-11-08 13:33:03'),(983,74,NULL,1,'Project created with name \"\"webhkp test project\" (codename: \"wtp\")\"','2018-11-08 13:36:13'),(984,74,1,1,'Campaign \"AV Digital\" was added to project \"webhkp test project\"','2018-11-08 13:36:27'),(985,74,4,1,'Campaign \"AV Teaser/Trailer\" was added to project \"webhkp test project\"','2018-11-08 13:38:05'),(986,74,NULL,1,'Spot \"spot a\" was added to \"AV Digital\" campaign','2018-11-08 15:52:53'),(987,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-15 13:51:02'),(988,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-15 13:51:02'),(989,47,NULL,1,'Spot \"test spot 1\" was added to \"Theatrical Teaser/Trai\" campaign','2018-11-19 20:24:49'),(990,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-26 16:40:32'),(991,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-26 16:40:32'),(992,47,2,1,'Writing team request was changed on campaign \"Theatrical Radio\"','2018-11-26 16:40:36'),(993,75,NULL,1,'Project created with name \"\"NEW MOVIE\" (codename: \"NM1\")\"','2018-11-29 10:01:23'),(994,75,1,1,'Campaign \"Theatrical Digital\" was added to project \"NEW MOVIE\"','2018-11-29 10:02:03'),(995,75,1,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Theatrical Digital\"','2018-11-29 10:06:52'),(996,75,1,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Producer\" on campaign \"Theatrical Digital\"','2018-11-29 10:06:55'),(997,75,1,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Theatrical Digital\"','2018-11-29 10:06:55'),(998,75,1,1,'Editor \"ASHLEY CAPUTO\" was added to campaign \"Theatrical Digital\"','2018-11-29 10:07:38'),(999,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:15:51'),(1000,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:15:51'),(1001,47,4,1,'User \"MARK LAFONTANT\" was changed to \"Lead Producer\" on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:16:29'),(1002,47,4,1,'User \"MARK LAFONTANT\" was added to campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:16:29'),(1003,47,4,1,'User \"TONY FANG\" was added to campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:18:07'),(1004,47,4,1,'User \"TONY FANG\" was changed to \"Lead Producer\" on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:18:10'),(1005,47,4,1,'User \"TONY FANG\" was added to campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:18:10'),(1006,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:19:44'),(1007,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:19:44'),(1008,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:24:30'),(1009,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:24:30'),(1010,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:03'),(1011,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:03'),(1012,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:12'),(1013,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:12'),(1014,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:18'),(1015,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:18'),(1016,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:26'),(1017,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:26'),(1018,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:31'),(1019,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:31'),(1020,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:52'),(1021,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:27:52'),(1022,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:40:38'),(1023,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:40:38'),(1024,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:40:48'),(1025,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:40:48'),(1026,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:40:54'),(1027,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:40:54'),(1028,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:41:00'),(1029,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:41:00'),(1030,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:41:04'),(1031,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-30 15:41:04'),(1032,75,1,1,'Music team request was changed on campaign \"Theatrical Digital\"','2018-12-01 11:33:51'),(1033,75,1,1,'Music team request was changed on campaign \"Theatrical Digital\"','2018-12-01 11:34:08'),(1034,75,1,1,'Music team request was changed on campaign \"Theatrical Digital\"','2018-12-01 11:34:34'),(1035,75,1,1,'Writing team request was changed on campaign \"Theatrical Digital\"','2018-12-01 11:34:34'),(1036,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:24:33'),(1037,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:24:33'),(1038,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:24:55'),(1039,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:24:55'),(1040,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:30:23'),(1041,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:30:23'),(1042,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:30:34'),(1043,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:30:34'),(1044,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:30:35'),(1045,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:30:35'),(1046,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:42:01'),(1047,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:42:01'),(1048,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:42:10'),(1049,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:42:10'),(1050,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:42:11'),(1051,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-04 16:42:11'),(1052,76,NULL,1,'Project created with name \"\"my test project\" (codename: \"Proj name\")\"','2018-12-14 09:09:06'),(1053,47,4,1,'User \"JULIE DAVIS\" was added to campaign \"Theatrical Teaser/Trai\"','2018-12-17 04:40:09'),(1054,77,NULL,1,'Project created with name \"\"New test\" (codename: \"test name\")\"','2018-12-17 09:02:47'),(1055,78,NULL,1,'Project created with name \"\"Name test1\" (codename: \"code test1\")\"','2018-12-17 09:11:00'),(1056,47,2,1,'User \"JAMIE ZAKOSKI\" was changed to \"Lead Producer\" on campaign \"Theatrical Radio\"','2018-12-17 10:16:12'),(1057,47,2,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"Theatrical Radio\"','2018-12-17 10:16:12'),(1058,47,2,1,'User \"MARIE BYRNES\" was changed to \"Producer\" on campaign \"Theatrical Radio\"','2018-12-17 10:16:15'),(1059,47,2,1,'User \"MARIE BYRNES\" was added to campaign \"Theatrical Radio\"','2018-12-17 10:16:15'),(1060,79,NULL,1,'Project created with name \"\"Name test2\" (codename: \"codename2\")\"','2018-12-17 11:15:32'),(1061,80,NULL,1,'Project created with name \"\"test3\" (codename: \"name test3\")\"','2018-12-18 08:33:29'),(1062,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:40:49'),(1063,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:40:49'),(1064,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:41:23'),(1065,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:41:23'),(1066,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:42:18'),(1067,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:42:18'),(1068,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:48:43'),(1069,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:48:43'),(1070,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:49:17'),(1071,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:49:17'),(1072,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:49:45'),(1073,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 07:49:45'),(1074,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:00:42'),(1075,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:00:42'),(1076,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:01:17'),(1077,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:01:17'),(1078,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:01:46'),(1079,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:01:46'),(1080,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:02:38'),(1081,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:02:38'),(1082,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:08:30'),(1083,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:08:30'),(1084,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:09:40'),(1085,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:09:40'),(1086,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:13:13'),(1087,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:13:13'),(1088,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:14:37'),(1089,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:14:37'),(1090,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:17:31'),(1091,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:17:31'),(1092,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:18:33'),(1093,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:18:33'),(1094,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:19:21'),(1095,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:19:21'),(1096,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:23:51'),(1097,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:23:51'),(1098,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:29:36'),(1099,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:29:36'),(1100,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:29:48'),(1101,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:29:48'),(1102,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:29:57'),(1103,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:29:57'),(1104,80,7,1,'Campaign \"Broadcast\" was added to project \"test3\"','2018-12-19 08:35:41'),(1105,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:43:42'),(1106,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-19 08:43:42'),(1107,47,4,106,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-20 13:18:38'),(1108,47,4,106,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-12-20 13:18:38'),(1109,47,2,106,'Writing team request was changed on campaign \"Theatrical Radio\"','2018-12-20 13:18:52'),(1110,81,NULL,1,'Project created with name \"\"test4\" (codename: \"test4\")\"','2018-12-21 06:54:19'),(1111,81,7,1,'Campaign \"Broadcast\" was added to project \"test4\"','2018-12-26 14:44:57'),(1112,81,10,1,'Campaign \"Graphics\" was added to project \"test4\"','2018-12-26 14:45:01'),(1113,47,4,1,'User \"BLAKE HILL\" was added to campaign \"Theatrical Teaser/Trailer\"','2019-01-07 16:01:27'),(1114,47,4,1,'User \"BLAKE HILL\" was changed to \"Associate Producer\" on campaign \"Theatrical Teaser/Trailer\"','2019-01-07 16:01:31'),(1115,47,4,1,'User \"BLAKE HILL\" was added to campaign \"Theatrical Teaser/Trailer\"','2019-01-07 16:01:31'),(1116,47,4,1,'Version \"1A\" was added to spot \"#2 Saved\"','2019-01-10 16:34:25'),(1117,47,4,1,'Version \"1Rev\" was added to spot \"#2 Saved\"','2019-01-10 16:34:28'),(1118,47,4,1,'Version \"2\" was added to spot \"#2 Saved\"','2019-01-10 16:34:31'),(1119,47,4,1,'Version \"2Alt\" was added to spot \"#2 Saved\"','2019-01-10 16:34:35'),(1120,47,4,1,'Version \"1Rev\" was added to spot \"#1 Theory aka \"Truce\"\"','2019-01-11 08:20:14'),(1121,47,4,1,'Version \"3Alt\" was added to spot \"#4 Inside\"','2019-01-11 08:41:18'),(1122,47,4,1,'Version \"1\" was added to spot \"#5 Threat\"','2019-01-11 08:44:23'),(1123,47,4,1,'Version \"2B\" was added to spot \"#6 Rescue\"','2019-01-11 08:49:13'),(1124,47,4,1,'Version \"1Rev\" was added to spot \"Test2\"','2019-01-11 08:50:11'),(1125,47,4,1,'User \"KRYSTLE OPPENHEIMER\" was removed from campaign \"Theatrical Teaser/Trailer\"','2019-01-11 15:00:09'),(1126,47,4,1,'User \"JULIE DAVIS\" was removed from campaign \"Theatrical Teaser/Trailer\"','2019-01-11 15:00:15'),(1127,47,4,1,'User \"MARIE BYRNES\" was removed from campaign \"Theatrical Teaser/Trailer\"','2019-01-11 15:00:26'),(1128,47,4,1,'User \"TONY FANG\" was removed from campaign \"Theatrical Teaser/Trailer\"','2019-01-11 15:00:29'),(1129,47,4,1,'User \"BLAKE HILL\" was removed from campaign \"Theatrical Teaser/Trailer\"','2019-01-11 15:00:32'),(1130,47,4,1,'User \"JAMIE ZAKOSKI\" was removed from campaign \"Theatrical Teaser/Trailer\"','2019-01-11 15:00:37'),(1131,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trailer\"','2019-01-14 10:12:34'),(1132,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trailer\"','2019-01-14 10:12:34'),(1133,47,4,106,'Music team request was changed on campaign \"Theatrical Teaser/Trailer\"','2019-01-14 10:43:51'),(1134,47,4,106,'Writing team request was changed on campaign \"Theatrical Teaser/Trailer\"','2019-01-14 10:43:51'),(1135,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trailer\"','2019-01-15 04:38:57'),(1136,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trailer\"','2019-01-15 04:38:57'),(1137,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trailer\"','2019-01-15 04:39:25'),(1138,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trailer\"','2019-01-15 04:39:25'),(1139,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trailer\"','2019-01-15 04:39:26'),(1140,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trailer\"','2019-01-15 04:39:26');
/*!40000 ALTER TABLE `redi_project_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_manager`
--

DROP TABLE IF EXISTS `redi_project_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_manager` (
  `project_id` int(11) NOT NULL,
  `manager_id` int(11) NOT NULL,
  PRIMARY KEY (`project_id`,`manager_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_manager`
--

LOCK TABLES `redi_project_manager` WRITE;
/*!40000 ALTER TABLE `redi_project_manager` DISABLE KEYS */;
INSERT INTO `redi_project_manager` VALUES (19,1),(19,2),(19,6),(19,7),(20,2),(20,3),(20,6),(20,7);
/*!40000 ALTER TABLE `redi_project_manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_permissions`
--

DROP TABLE IF EXISTS `redi_project_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_permissions` (
  `id` int(11) NOT NULL,
  `key` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_permissions`
--

LOCK TABLES `redi_project_permissions` WRITE;
/*!40000 ALTER TABLE `redi_project_permissions` DISABLE KEYS */;
INSERT INTO `redi_project_permissions` VALUES (1,'project-create','Create project page'),(2,'project-name','Project name'),(3,'project-release-date','Project release date'),(4,'project-history','Project history and changelog'),(5,'project-description','Project description'),(6,'project-campaigns','Project campaigns list'),(7,'campaign-description','Campaign description'),(8,'campaign-details','Campaign details'),(9,'campaign-contacts','Campaign contacts'),(10,'campaign-people-creative','Campaign creative team'),(11,'campaign-people-billing','Campaign billing team'),(12,'campaign-people-editorial','Campaign editorial team'),(13,'campaign-people-design','Campaign graphic design team'),(14,'campaign-writing-team','Campaign writing team'),(15,'campaign-music-team','Campaign music team'),(200,'all-projects-campaigns','All projects campaigns'),(17,'date-material-received','Campaign date materials will be received'),(18,'campaign-budget','Campaign budget'),(19,'campaign-notes','Campaign notes'),(20,'campaign-por','Campaign POR'),(21,'campaign-invoice-contact','Campaign invoice contact'),(22,'spot','Spots list'),(23,'spot-first-revision-cost','Spot first revision rate'),(24,'spot-internal-due-date','Spot internal due date'),(25,'spot-client-due-date','Spot client due date'),(26,'spot-revision','Spot revisions and versions'),(27,'spot-graphics-revision','Spot graphics included'),(100,'user-permission','User permission'),(28,'campaign-customer-contact','Campaign customer contact'),(29,'version-status','Version status'),(30,'version-note','Version note'),(31,'project-codename','Project code name'),(32,'campaign-channel','Campaign Channel'),(33,'new-customer-approval','New customer approval'),(34,'project-prefix','Project prefix'),(35,'spot-sent-finish-prod-accept','Spot sent finish and prod accept');
/*!40000 ALTER TABLE `redi_project_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_producer`
--

DROP TABLE IF EXISTS `redi_project_producer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_producer` (
  `project_id` int(11) NOT NULL,
  `producer_id` int(11) NOT NULL,
  PRIMARY KEY (`project_id`,`producer_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_producer`
--

LOCK TABLES `redi_project_producer` WRITE;
/*!40000 ALTER TABLE `redi_project_producer` DISABLE KEYS */;
INSERT INTO `redi_project_producer` VALUES (19,4),(19,6),(19,9),(20,4),(20,6),(20,9);
/*!40000 ALTER TABLE `redi_project_producer` ENABLE KEYS */;
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
  `customer_id` int(11) DEFAULT NULL,
  `first_point_of_contact_id` int(11) DEFAULT NULL,
  `request_writing_team` tinyint(1) DEFAULT '0',
  `writing_team_notes` text,
  `request_music_team` tinyint(1) DEFAULT '0',
  `music_team_notes` text,
  `note` text,
  `budget` text,
  `budget_note` text,
  `graphics_budget_note` text,
  `POR` varchar(200) DEFAULT NULL,
  `invoice_contact` varchar(200) DEFAULT NULL,
  `material_receive_date` datetime DEFAULT NULL,
  `approved_by_billing` tinyint(1) DEFAULT '0',
  `channel_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=232 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_to_campaign`
--

LOCK TABLES `redi_project_to_campaign` WRITE;
/*!40000 ALTER TABLE `redi_project_to_campaign` DISABLE KEYS */;
INSERT INTO `redi_project_to_campaign` VALUES (104,9,4,1,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(105,1,4,1,7,0,NULL,1,'This is the place for notes','(:30) TV Campaign','5000',NULL,NULL,NULL,NULL,NULL,0,NULL),(156,47,4,9,51,1,'both conceptual ideas and copy',1,'cue sheets only as we\'re using cleared music from theatrical campaign to start','Massey','4','test note for budget 123','test graphics notes',NULL,NULL,'2018-12-06 23:00:00',1,8),(157,47,2,13,48,1,'just a blurb',NULL,NULL,NULL,'45000',NULL,NULL,NULL,NULL,'2018-01-18 08:00:00',1,NULL),(158,47,71,11,NULL,1,'once upon a time',1,'do ta do','(:15) TV','0','on spec; billable if revised',NULL,NULL,NULL,'2017-12-02 08:00:00',0,NULL),(111,10,4,2,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(112,10,1,2,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(143,28,1,3,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(144,28,4,3,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(146,28,7,3,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(147,28,68,3,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(149,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(151,15,4,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(154,16,4,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(153,46,7,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(155,1,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(159,5,6,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(169,49,1,2,12,1,'Hey guys!  Can you watch when this comes in, should be sometime late week and then we\'ll do a creative kick off meeting early next week!',1,'Hey guys!  Can you watch when this comes in, should be sometime late week and then we\'ll do a creative kick off meeting early next week!','Trailer Campaign Eugene','25000','reduced rate trailer, no revisions included',NULL,NULL,NULL,NULL,0,NULL),(182,47,7,13,13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,8),(203,55,4,30,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(162,49,4,2,12,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(163,49,7,2,NULL,NULL,NULL,NULL,NULL,'Digital: Stanford',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(200,53,4,2,NULL,NULL,NULL,NULL,NULL,'Massey',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(181,47,4,13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(173,50,4,3,NULL,NULL,NULL,NULL,NULL,'test  k',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(174,50,6,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(175,50,1,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(176,49,2,2,NULL,NULL,NULL,NULL,NULL,'Trailer Campaign Kazadi',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(196,53,73,2,NULL,NULL,NULL,NULL,NULL,'Hall H',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(194,49,2,2,13,NULL,NULL,NULL,NULL,'Comicon Trailer',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(186,51,73,2,NULL,NULL,NULL,NULL,NULL,'Trailer',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(187,51,4,2,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(188,51,4,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(195,51,7,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(189,52,1,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(190,49,4,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(193,49,7,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(192,47,4,13,48,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(197,53,73,2,NULL,NULL,NULL,NULL,NULL,'Trailer',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(199,53,4,2,12,NULL,NULL,NULL,NULL,'Stanford',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(201,53,4,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(202,54,2,10,NULL,NULL,NULL,NULL,NULL,'International',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(204,56,4,33,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(205,56,7,33,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(207,47,6,19,NULL,NULL,NULL,NULL,NULL,'Cananda',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(209,54,4,10,NULL,NULL,NULL,NULL,NULL,'International',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(210,47,73,13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(211,47,7,13,48,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(222,39,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(230,81,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(224,51,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(225,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(226,74,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4000','some budget note11',NULL,NULL,NULL,NULL,0,NULL),(227,74,4,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,8),(228,75,1,0,NULL,1,'Testing Writing notes',1,'Music team follow email for documentation of requirements','New campaign','35000','null',NULL,NULL,NULL,NULL,1,1),(231,81,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL);
/*!40000 ALTER TABLE `redi_project_to_campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_to_campaign_billing`
--

DROP TABLE IF EXISTS `redi_project_to_campaign_billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_to_campaign_billing` (
  `project_campaign_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` char(1) DEFAULT NULL,
  PRIMARY KEY (`project_campaign_id`,`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_to_campaign_billing`
--

LOCK TABLES `redi_project_to_campaign_billing` WRITE;
/*!40000 ALTER TABLE `redi_project_to_campaign_billing` DISABLE KEYS */;
INSERT INTO `redi_project_to_campaign_billing` VALUES (105,146,NULL),(105,180,NULL),(105,13,NULL),(162,19,NULL),(157,40,NULL),(157,9,NULL),(158,15,NULL),(156,97,NULL),(186,89,NULL),(187,89,NULL),(189,95,NULL),(162,96,NULL),(195,89,NULL),(196,96,NULL),(197,96,NULL),(202,95,NULL),(192,97,NULL),(203,88,NULL),(209,95,NULL),(157,97,NULL),(156,19,NULL);
/*!40000 ALTER TABLE `redi_project_to_campaign_billing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_to_campaign_cc`
--

DROP TABLE IF EXISTS `redi_project_to_campaign_cc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_to_campaign_cc` (
  `project_campaign_id` int(11) NOT NULL,
  `customer_contact_id` int(11) NOT NULL,
  PRIMARY KEY (`project_campaign_id`,`customer_contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_to_campaign_cc`
--

LOCK TABLES `redi_project_to_campaign_cc` WRITE;
/*!40000 ALTER TABLE `redi_project_to_campaign_cc` DISABLE KEYS */;
INSERT INTO `redi_project_to_campaign_cc` VALUES (104,1),(105,1),(111,2),(112,2),(143,3),(144,3),(146,3),(147,3),(149,1),(151,3),(153,8),(154,3),(155,1),(156,9),(157,13),(157,48),(158,11),(159,1),(162,2),(163,2),(169,2),(173,3),(174,3),(175,3),(176,2),(182,13),(186,2),(187,2),(188,2),(189,7),(190,2),(192,13),(192,48),(193,2),(194,2),(195,2),(196,2),(197,2),(199,2),(200,2),(201,2),(202,10),(203,30),(204,33),(205,33),(207,19),(209,10),(210,13),(211,13),(211,48);
/*!40000 ALTER TABLE `redi_project_to_campaign_cc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_to_campaign_designer`
--

DROP TABLE IF EXISTS `redi_project_to_campaign_designer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_to_campaign_designer` (
  `project_campaign_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`project_campaign_id`,`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_to_campaign_designer`
--

LOCK TABLES `redi_project_to_campaign_designer` WRITE;
/*!40000 ALTER TABLE `redi_project_to_campaign_designer` DISABLE KEYS */;
INSERT INTO `redi_project_to_campaign_designer` VALUES (105,9),(105,136),(156,64),(156,67),(157,66),(158,69),(158,70),(162,61),(162,63),(162,67),(162,69),(163,61),(163,63),(169,61),(169,63),(186,69),(186,73),(187,69),(187,73),(189,63),(192,64),(192,67),(195,69),(195,73),(196,60),(196,61),(196,62),(196,69),(197,60),(197,61),(197,62),(197,69),(202,61),(202,66),(202,73),(203,61),(203,67),(209,61),(209,66),(209,73);
/*!40000 ALTER TABLE `redi_project_to_campaign_designer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_to_campaign_editor`
--

DROP TABLE IF EXISTS `redi_project_to_campaign_editor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_to_campaign_editor` (
  `project_campaign_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`project_campaign_id`,`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_to_campaign_editor`
--

LOCK TABLES `redi_project_to_campaign_editor` WRITE;
/*!40000 ALTER TABLE `redi_project_to_campaign_editor` DISABLE KEYS */;
INSERT INTO `redi_project_to_campaign_editor` VALUES (1,5),(1,6),(1,10),(105,6),(105,87),(105,89),(149,5),(149,6),(149,12),(156,37),(156,44),(156,48),(157,32),(158,26),(158,86),(162,30),(162,36),(162,41),(163,41),(169,36),(169,41),(186,35),(186,36),(186,41),(187,36),(187,41),(189,29),(189,31),(192,37),(192,44),(192,48),(195,35),(195,36),(195,41),(196,36),(197,36),(202,29),(202,40),(203,31),(209,29),(209,40),(228,19);
/*!40000 ALTER TABLE `redi_project_to_campaign_editor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_project_to_campaign_mgt`
--

DROP TABLE IF EXISTS `redi_project_to_campaign_mgt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_project_to_campaign_mgt` (
  `project_campaign_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`project_campaign_id`,`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_to_campaign_mgt`
--

LOCK TABLES `redi_project_to_campaign_mgt` WRITE;
/*!40000 ALTER TABLE `redi_project_to_campaign_mgt` DISABLE KEYS */;
INSERT INTO `redi_project_to_campaign_mgt` VALUES (105,67);
/*!40000 ALTER TABLE `redi_project_to_campaign_mgt` ENABLE KEYS */;
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
INSERT INTO `redi_project_to_campaign_user` VALUES (156,23,4),(156,97,1),(105,10,7),(153,7,NULL),(105,87,8),(154,6,1),(105,121,2),(105,146,7),(105,161,2),(153,8,NULL),(154,9,3),(105,101,1),(153,6,NULL),(157,6,1),(157,11,2),(158,89,NULL),(158,19,NULL),(182,19,NULL),(182,89,NULL),(176,89,1),(162,96,1),(162,63,6),(186,89,1),(186,22,4),(186,63,6),(187,22,4),(187,63,6),(187,89,1),(188,22,4),(188,63,6),(188,89,1),(163,89,1),(169,63,6),(169,20,3),(169,90,1),(189,95,2),(162,25,3),(176,22,4),(195,22,NULL),(195,63,NULL),(195,89,NULL),(196,96,1),(196,25,3),(197,25,3),(197,96,1),(199,96,NULL),(199,25,NULL),(202,95,1),(192,15,NULL),(203,88,NULL),(203,19,NULL),(207,23,NULL),(207,97,NULL),(209,95,2),(211,6,NULL),(211,11,NULL),(228,95,2),(181,12,3);
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
/*!40000 ALTER TABLE `redi_project_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_ratecard_type`
--

DROP TABLE IF EXISTS `redi_ratecard_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_ratecard_type` (
  `ratecard_id` int(11) NOT NULL AUTO_INCREMENT,
  `studio_id` int(11) DEFAULT NULL,
  `ratecard_name` varchar(50) DEFAULT NULL,
  `ratecard_note` text,
  `file` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ratecard_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_ratecard_type`
--

LOCK TABLES `redi_ratecard_type` WRITE;
/*!40000 ALTER TABLE `redi_ratecard_type` DISABLE KEYS */;
INSERT INTO `redi_ratecard_type` VALUES (1,3,'A','some note',NULL),(6,2,'Warner Rate Card new',NULL,NULL),(20,2,'Warner Rate Card',NULL,NULL),(27,4,'Rate Card 1','Note1 \nsome changed not\n\nnew price note',NULL),(28,4,'Rate Card 2','21321321 adsas das daa sd asdasd',NULL),(29,4,'Rate Card 3','af afasdf',NULL),(30,7,'New Rate Card',NULL,NULL),(31,7,'New Rate Card3',NULL,NULL),(32,7,'New Rate Card 4',NULL,NULL),(33,4,'Rate Card 1',NULL,NULL),(34,10,'New',NULL,NULL),(35,10,'Gago',NULL,NULL),(38,8,'adasdsa',NULL,NULL),(39,9,'asdsadsa',NULL,NULL),(45,16,'dsaas',NULL,NULL),(46,4,'rate card 2',NULL,NULL),(48,77,'Features Rate Card',NULL,'642e92efb79421734881b53e1e1b18b6.pdf'),(49,77,'Focus 2',NULL,NULL),(50,4,'rate card b',NULL,NULL);
/*!40000 ALTER TABLE `redi_ratecard_type` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_setting`
--

LOCK TABLES `redi_setting` WRITE;
/*!40000 ALTER TABLE `redi_setting` DISABLE KEYS */;
INSERT INTO `redi_setting` VALUES (1,'TEMPORARY_STAFF_HOUR_PER_DAY','8'),(2,'TEST','some test value'),(3,'MAX_SPOT_SENT_REQUEST_ID','90');
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
  `spot_name` varchar(255) DEFAULT NULL,
  `project_campaign_id` int(11) DEFAULT NULL,
  `revision_not_counted` smallint(1) DEFAULT NULL,
  `notes` text,
  `revisions` int(11) DEFAULT NULL,
  `graphics_revisions` smallint(1) DEFAULT NULL,
  `first_revision_cost` decimal(19,2) DEFAULT NULL,
  `internal_deadline` datetime DEFAULT NULL,
  `client_deadline` datetime DEFAULT NULL,
  `billing_type` char(1) DEFAULT NULL,
  `billing_note` text,
  `trt_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=128 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot`
--

LOCK TABLES `redi_spot` WRITE;
/*!40000 ALTER TABLE `redi_spot` DISABLE KEYS */;
INSERT INTO `redi_spot` VALUES (3,'Puddin',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(4,'Puppet Master',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(5,'Boomer',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(6,'Slipknot',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(7,'Croc',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(8,'Diablo',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(9,'Enchantress',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(10,'Katana',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(11,'Waller',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(12,'Deadshot',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(13,'Flag',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(14,'Joker',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(15,'Harley',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(16,'Deashot :60',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(17,'Take Over :10',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(18,'Vertical Footage',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(19,'Puddin',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(21,'Boomer',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(22,'Slipknot',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(23,'Croc',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(24,'Diablo',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(25,'Enchantress',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(26,'Katana',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(27,'Waller',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(28,'Deadshot',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(29,'Flag',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(30,'Joker',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(31,'Harley',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(32,'Deashot :60',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5),(55,'\"Busy\"',105,NULL,'Based on \"Busy\" :60',2,1,10000.00,'2018-04-26 00:00:00','2018-04-26 00:00:00',NULL,NULL,5),(63,'spt4',143,NULL,'spt4notre',NULL,0,NULL,NULL,NULL,NULL,NULL,5),(62,'spt3',143,NULL,'sdf',NULL,0,NULL,NULL,NULL,NULL,NULL,5),(61,'spt2',143,NULL,'fsdf',NULL,0,NULL,NULL,NULL,NULL,NULL,5),(60,'spt1',143,NULL,'sptnote',0,0,0.00,NULL,NULL,NULL,NULL,5),(57,'Episode 405',104,NULL,'null',0,0,0.00,NULL,NULL,NULL,NULL,5),(56,'First Spot for Teaser',112,NULL,'null',3,0,35000.00,NULL,NULL,NULL,NULL,5),(64,'spt5',143,NULL,'spt5note',NULL,0,NULL,NULL,NULL,NULL,NULL,5),(65,'spt5',143,NULL,'spt5note',NULL,0,NULL,NULL,NULL,NULL,NULL,5),(66,'spt6',143,NULL,'r',NULL,0,NULL,NULL,NULL,NULL,NULL,5),(67,'spt1',144,NULL,'wer',NULL,0,NULL,NULL,NULL,NULL,NULL,5),(71,'spt1',146,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,5),(72,'spt1',147,NULL,'spt note',NULL,0,NULL,NULL,NULL,NULL,NULL,5),(73,'Spot #2\"Really Tired\"',105,NULL,'Secondary spot is important as well',5,1,500.00,'2018-04-26 00:00:00','2018-04-26 00:00:00',NULL,NULL,5),(77,'Third spot for Babysitter project',105,NULL,'Some notes for reference',0,0,0.00,'2018-06-16 00:00:00','2018-07-19 00:00:00',NULL,NULL,5),(78,'#1 Theory aka \"Truce\"',156,NULL,'Kris Brown cut v.1',3,0,11000.00,'2018-05-11 00:00:00','2018-05-14 00:00:00','R','Spec revised, is billable',5),(79,'#2 Saved',156,NULL,'null',3,0,11000.00,NULL,'2018-05-14 00:00:00','B',NULL,5),(80,'#3 Need',156,NULL,'null',3,0,11000.00,NULL,'2019-01-12 00:00:00','B',NULL,5),(81,'#4 Inside',156,NULL,'null',3,0,11000.00,NULL,NULL,'B',NULL,5),(82,'#5 Threat',156,NULL,'null',3,0,11000.00,NULL,NULL,NULL,NULL,5),(83,'#6 Rescue',156,NULL,'OT billable',2,0,9000.00,NULL,NULL,'B',NULL,5),(84,'#1 Interrogation',157,NULL,'null',5,0,45000.00,NULL,NULL,NULL,NULL,5),(85,'#1 Reason',158,NULL,'null',3,0,5000.00,NULL,NULL,NULL,NULL,5),(86,'#2 Creation',158,NULL,'null',3,0,5000.00,NULL,NULL,NULL,NULL,5),(87,'#3 Everywhere',158,NULL,'null',3,0,5000.00,NULL,NULL,NULL,NULL,5),(88,'#4 Need',158,NULL,'based on digital :15 v.6',0,0,5000.00,NULL,NULL,NULL,NULL,5),(89,'#3 Everywhere',158,NULL,'based on digital 15 v.6',0,0,0.00,NULL,NULL,NULL,NULL,5),(90,'#5 Succeed/YouTube',158,NULL,'based on digital 15 v.3',0,0,5000.00,NULL,NULL,NULL,NULL,5),(91,'Test',157,NULL,'null',0,0,0.00,NULL,NULL,NULL,NULL,5),(92,'New test spot',156,NULL,'Edit sample note',0,0,0.00,NULL,NULL,'B',NULL,5),(93,'test',159,NULL,'null',0,0,0.00,NULL,NULL,NULL,NULL,5),(94,'abc',159,NULL,'test',0,0,0.00,NULL,NULL,NULL,NULL,5),(95,'Test3',156,NULL,NULL,0,0,0.00,NULL,NULL,NULL,NULL,5),(96,'Test2',156,NULL,NULL,0,0,0.00,'2018-11-08 00:00:00',NULL,'B',NULL,5),(97,'Water',162,NULL,'spot renamed',0,0,12000.00,NULL,'2018-06-12 00:00:00','S','reduced rate',5),(98,'Agua',162,NULL,NULL,5,0,12000.00,'2018-06-08 00:00:00','2018-06-12 00:00:00','B','Client asked for this spot specifically. Billable for sure!',5),(99,'eau',162,NULL,NULL,0,0,0.00,'2018-06-08 00:00:00','2018-06-12 00:00:00','S','Client didn\'t order spot and the spot never got to a point where it was sendable.',5),(100,'Wasser aka \"Acqua\"',162,NULL,'Production please be aware the client is changing the name of the spot on V.2, original name was \"Acqua\"',3,0,10000.00,NULL,'2018-06-12 00:00:00','R','Client loved the spot, billing discount WB TV rate, only 3 revisions included with discount',5),(101,'Mizu',162,NULL,NULL,0,0,12000.00,'2018-06-08 00:00:00','2018-06-12 00:00:00','S',NULL,5),(102,'Master',169,NULL,NULL,3,0,48000.00,'2018-06-22 00:00:00','2018-06-26 00:00:00','B',NULL,5),(103,'Tears',186,NULL,'Wes\' cut',0,0,45000.00,NULL,'2018-06-21 00:00:00','S','Cutting two pieces, massey ordered 1, TBD on which to bill and if we can bill one hourly or not',5),(104,':15 TV Blue',156,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,5),(105,'Waves',193,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,5),(106,'Brodner Spot 1',193,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,5),(107,'Warrior',193,NULL,NULL,4,0,12500.00,NULL,NULL,'R','Massey loved spot, bill this one.',5),(108,'Lyle Spot 1',193,NULL,'\"Sand\"',0,0,0.00,NULL,NULL,'B',NULL,5),(109,'Tracy',193,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,5),(110,'Brodner Spot 1',187,NULL,NULL,0,0,0.00,NULL,'2018-06-25 00:00:00','S',NULL,5),(111,'Creal Spot 1',187,NULL,'Will retitle once we know what we are calling it!',4,0,12500.00,'2018-06-22 00:00:00','2018-06-25 00:00:00','B',NULL,5),(112,'Schlegs Spot 1',187,NULL,NULL,0,0,0.00,NULL,'2018-06-25 00:00:00','S',NULL,5),(113,'Brodner Spot 2',187,NULL,NULL,0,0,0.00,'2018-06-25 00:00:00','2018-06-25 00:00:00','S','Brodner finished his first spot quickly and had another idea for a second spot.',5),(114,'Power Outage',196,NULL,'Hall H piece',4,0,0.00,NULL,NULL,'B',NULL,5),(115,'Blitz',197,NULL,NULL,4,0,45000.00,NULL,NULL,'B','MJ said cannot go over 45 and will probably need a reduction.',5),(116,'Fears',186,NULL,NULL,0,0,0.00,NULL,NULL,'S',NULL,5),(117,'Red',200,NULL,NULL,4,0,12500.00,'2018-07-04 00:00:00','2018-07-06 00:00:00','B',NULL,5),(118,'Green',199,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,5),(119,'Blue',200,NULL,NULL,4,0,12500.00,NULL,NULL,'B',NULL,5),(120,'Unbelievable',202,NULL,'French Trailer :90',2,0,45000.00,'2018-07-12 00:00:00','2018-07-13 00:00:00','B','Rate discussed and approved with client',5),(121,'Searching',202,NULL,'German/general international trailer 2:00 or less',2,0,30000.00,'2018-07-16 00:00:00','2018-07-17 00:00:00','B','budget discussed and approved by client',5),(122,'Legendary',203,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,5),(123,'Ralph',209,NULL,NULL,3,0,125000.00,'2018-10-18 00:00:00','2018-10-22 00:00:00','B',NULL,5),(124,'China 30',209,NULL,NULL,0,0,0.00,NULL,NULL,'B','hourly',5),(125,'a',211,NULL,'a',0,0,0.00,NULL,NULL,'B',NULL,5),(126,'spot a',226,NULL,'spot a note',0,0,1000.00,'2018-11-30 00:00:00','2018-11-30 00:00:00','B',NULL,5),(127,'test spot 1',156,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,0);
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
  `request_id` bigint(22) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `project_campaign_id` int(11) DEFAULT NULL,
  `full_lock` smallint(1) DEFAULT NULL,
  `sent_via_method` varchar(100) DEFAULT NULL,
  `finish_request` smallint(1) DEFAULT NULL,
  `finish_option` varchar(10) DEFAULT NULL,
  `notes` text,
  `internal_note` text,
  `studio_note` text,
  `deadline` datetime DEFAULT NULL,
  `finishing_house` int(11) DEFAULT NULL,
  `framerate` varchar(100) DEFAULT NULL,
  `framerate_note` text,
  `raster_size` varchar(100) DEFAULT NULL,
  `raster_size_note` text,
  `music_cue_sheet` smallint(1) DEFAULT NULL,
  `music_note` text,
  `gfx_finish` smallint(1) DEFAULT NULL,
  `audio_prep` smallint(1) DEFAULT NULL,
  `audio` varchar(45) DEFAULT NULL,
  `audio_note` text,
  `video_prep` smallint(1) DEFAULT NULL,
  `graphics_finish` smallint(1) DEFAULT NULL,
  `spec_note` text,
  `spec_sheet_file` text,
  `tag_chart` text,
  `delivery_to_client` varchar(45) DEFAULT NULL,
  `delivery_note` text,
  `spot_resend` smallint(1) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `editor` varchar(100) DEFAULT NULL,
  `customer_contact` varchar(100) DEFAULT NULL,
  `spot_id` int(11) DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  `spot_version_id` int(11) DEFAULT NULL,
  `prod_accept` smallint(1) DEFAULT NULL,
  `finish_accept` smallint(1) DEFAULT NULL,
  `line_status_id` int(11) DEFAULT NULL,
  `spot_sent_date` datetime DEFAULT NULL,
  `bill_id` bigint(20) DEFAULT NULL,
  `bill_line_id` bigint(20) DEFAULT NULL,
  `spot_sent_type` smallint(1) DEFAULT '1' COMMENT '1=AV, 2=Graphics only',
  `no_graphics` smallint(1) DEFAULT '0',
  `is_pdf` smallint(1) DEFAULT '0',
  `all_graphics_resend` smallint(6) DEFAULT NULL,
  `graphics_status_id` int(11) DEFAULT NULL,
  `graphics_note` text,
  `final_narr` varchar(20) DEFAULT NULL COMMENT 'Options are ''yes'', ''no'', ''not applicable''',
  `qc_approved` smallint(1) DEFAULT NULL,
  `qc_note` text,
  `qc_link` varchar(200) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent`
--

LOCK TABLES `redi_spot_sent` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent` DISABLE KEYS */;
INSERT INTO `redi_spot_sent` VALUES (126,48,47,4,156,0,'2',1,'1,1','','','',NULL,NULL,'','',NULL,'',1,NULL,0,0,'',NULL,0,0,'',NULL,NULL,'null','',0,NULL,'37','[]',84,3,104,1,1,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2019-01-02 03:24:45','2019-01-12 07:44:14'),(128,79,47,4,156,0,'3,2,1',1,'1,1','','','',NULL,NULL,'','',NULL,'',0,NULL,0,0,'',NULL,0,1,'',NULL,NULL,'null','',0,NULL,'44','[]',82,1,127,1,1,2,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2019-01-12 07:47:51','2019-01-12 07:49:29'),(129,83,47,4,156,0,'2',1,'2,1','','','',NULL,NULL,'','',NULL,'',0,NULL,0,0,'',NULL,0,0,'',NULL,NULL,'null','',0,NULL,NULL,'[]',79,2,121,0,0,1,NULL,NULL,NULL,1,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,'2019-01-13 19:42:57',NULL),(142,45,47,4,156,0,'1,4,5',1,'2,2','','a','b',NULL,NULL,'','',NULL,'',0,NULL,0,0,'',NULL,0,0,'',NULL,NULL,'null','',0,NULL,'37','[]',78,2,117,1,1,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2018-11-13 16:46:08','2019-01-15 09:27:20'),(143,45,47,4,156,0,NULL,0,'2,2','','a','b',NULL,NULL,'','',NULL,'',0,NULL,0,0,'',NULL,0,0,'',NULL,NULL,'null','',0,NULL,NULL,'[]',78,4,35,0,0,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2018-11-13 16:46:08','2019-01-15 09:27:20'),(144,50,47,4,156,0,NULL,1,'2,1','','1232','123',NULL,NULL,'23.98p','','4K UHD','',0,NULL,1,0,'1',NULL,0,0,'',NULL,NULL,'null','',0,NULL,NULL,'[]',79,6,123,1,1,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2019-01-03 10:34:43','2019-01-15 09:30:59'),(158,38,47,2,157,0,NULL,1,'2,1','','some note','ssss',NULL,NULL,'','',NULL,'',0,NULL,0,0,'','',0,0,'','[\"cfcd208495d565ef66e7dff9f98764da.jpg\"]',NULL,'null','',1,NULL,NULL,'[]',84,1,103,0,0,3,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,1,1,'2018-11-09 16:25:17','2019-01-16 03:56:25'),(160,74,47,2,157,0,'2,4,5',1,'2,1','','','',NULL,NULL,'23.98p,29.97i','','1X1','',0,'null',0,0,'','',0,0,'',NULL,NULL,'null','',0,NULL,NULL,'[]',84,6,105,0,0,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'null','null',NULL,NULL,NULL,1,1,'2019-01-11 06:08:24','2019-01-16 05:41:59'),(165,52,47,4,156,0,'3',1,'2,1','','','',NULL,NULL,'','','HD (16X9)','',0,'null',0,0,'1,2,3','',0,0,'','[\"cfcd208495d565ef66e7dff9f98764da.png\",\"c4ca4238a0b923820dcc509a6f75849b.png\",\"c81e728d9d4c2f636f067f89cc14862c.png\",\"eccbc87e4b5ce2fe28308fd9f2a7baf3.png\",\"a87ff679a2f3e71d9181a67b7542122c.png\"]',NULL,'null','',0,NULL,NULL,'[]',81,14,126,1,0,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'null','no',NULL,NULL,NULL,1,1,'2019-01-07 15:12:55','2019-01-16 09:19:47'),(166,85,9,4,104,1,NULL,1,'2,3','some note','','','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,'null',1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','[]',97,6,40,0,0,2,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'null','null',NULL,NULL,NULL,1,1,'2019-01-13 19:47:11','2019-01-16 10:06:03'),(171,73,47,2,157,0,'5',1,'2,1','','','',NULL,NULL,'23.98p,29.97i','','HD (16X9)','',0,'null',0,0,'','',0,0,'',NULL,NULL,'null','',0,NULL,NULL,'[]',84,1,103,0,0,2,NULL,NULL,NULL,1,NULL,NULL,0,NULL,'null','null',0,NULL,'test link here',1,1,'2019-01-11 06:07:24','2019-01-17 14:04:12'),(172,75,47,2,157,0,'4,3,2,1',1,'2,1','','','',NULL,NULL,'23.98p,29.97i','','4K UHD','',0,'null',0,0,'','',0,0,'',NULL,NULL,'null','',0,NULL,NULL,'[]',84,3,104,0,0,2,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'null','null',NULL,NULL,NULL,1,1,'2019-01-11 06:13:14','2019-01-17 15:00:31'),(182,89,47,4,156,0,'1,2',0,'1,1',NULL,'adsf','afasdf','2019-01-31 00:00:00',3,'[]',NULL,'[]',NULL,0,'some  music note here',0,0,NULL,NULL,0,0,NULL,NULL,NULL,'null',NULL,1,NULL,'12,4,5,3,4','[]',97,6,40,NULL,NULL,4,'2018-09-12 00:00:00',NULL,NULL,1,NULL,0,1,NULL,'some graphics note','no',NULL,'some qc note',NULL,1,5,'2019-01-16 08:56:03','2019-01-20 18:19:31');
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
  `resend` smallint(1) DEFAULT '0',
  `creative_user_id` varchar(50) DEFAULT NULL COMMENT 'Comma separated ids of user who has time entry with this file',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent_file`
--

LOCK TABLES `redi_spot_sent_file` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent_file` DISABLE KEYS */;
INSERT INTO `redi_spot_sent_file` VALUES (27,182,'abc1.jpg','some desc112',1,NULL),(28,182,'def3.jpg',NULL,1,NULL);
/*!40000 ALTER TABLE `redi_spot_sent_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_spot_sent_option`
--

DROP TABLE IF EXISTS `redi_spot_sent_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_spot_sent_option` (
  `key` varchar(100) NOT NULL,
  `value` text,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent_option`
--

LOCK TABLES `redi_spot_sent_option` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent_option` DISABLE KEYS */;
INSERT INTO `redi_spot_sent_option` VALUES ('audio_option','[{\"id\":1,\"name\":\"Broadcast Stereo\"},{\"id\":2,\"name\":\"Broadcast 5.1\"},{\"id\":3,\"name\":\"Digital Stereo\"},{\"id\":4,\"name\":\"Event Stereo\"},{\"id\":5,\"name\":\"Event 5.1\"}]'),('delivery_to_client_option','[{\"id\":2,\"name\":\"TV/Streaming\",\"sort\":1,\"children\":[{\"id\":1,\"name\":\"Wiredrive\",\"sort\":1},{\"id\":2,\"name\":\"HBO Aspera\",\"sort\":2},{\"id\":3,\"name\":\"USA MediaSilo\",\"sort\":3}]},{\"id\":3,\"name\":\"Gaming\",\"sort\":2,\"children\":[{\"id\":1,\"name\":\"Wiredrive\",\"sort\":1},{\"id\":2,\"name\":\"Microsoft Aspera\",\"sort\":2}]}]'),('finishing_option','[{\"id\":1,\"name\":\"OOH Finish Prep\",\"sort\":1,\"children\":[{\"id\":1,\"name\":\"Theatrical\",\"sort\":1},{\"id\":2,\"name\":\"TV Streaming\",\"sort\":2},{\"id\":3,\"name\":\"Games\",\"sort\":3}]},{\"id\":2,\"name\":\"In-House Finish\",\"sort\":2,\"children\":[{\"id\":1,\"name\":\"Theatrical\",\"sort\":1},{\"id\":2,\"name\":\"TV Streaming\",\"sort\":2},{\"id\":3,\"name\":\"Games\",\"sort\":3}]}]'),('framerate_option','[\"23.98p\",\"29.97i\",\"29.97p\",\"25p\",\"59.94p\"]'),('graphics_sent_via_method','[{\"id\":1,\"name\":\"Email\",\"sort\":1},{\"id\":2,\"name\":\"Wire Drive\",\"sort\":2},{\"id\":3,\"name\":\"Aspera\",\"sort\":3},{\"id\":4,\"name\":\"Internal Link\",\"sort\":4},{\"id\":5,\"name\":\"In House Presentation\",\"sort\":5}]'),('graphics_status','[{\"id\":1,\"name\":\"Pending\",\"sort\":1},{\"id\":2,\"name\":\"Waiting for EDL\",\"sort\":2},{\"id\":3,\"name\":\"EDL Exported\",\"sort\":3},{\"id\":4,\"name\":\"Completed\",\"sort\":4}]'),('raster_size_option','[\"4K UHD\",\"HD (16X9)\",\"9X16\",\"1X1\"]'),('sent_via_method','[{\"id\":1,\"name\":\"Fiber/Flex\",\"sort\":1},{\"id\":2,\"name\":\"Post\",\"sort\":2},{\"id\":3,\"name\":\"Email Link\",\"sort\":3},{\"id\":4,\"name\":\"Internal Link\",\"sort\":4},{\"id\":5,\"name\":\"In House Presentation\",\"sort\":5}]'),('status','[{\"id\":1,\"name\":\"Draft\",\"sort\":1},{\"id\":2,\"name\":\"Sent to post\",\"sort\":2},{\"id\":3,\"name\":\"Accepted\",\"sort\":3},{\"id\":4,\"name\":\"Pending QC\",\"sort\":4},{\"id\":5,\"name\":\"QC approved\",\"sort\":5},{\"id\":6,\"name\":\"Completed\",\"sort\":6},{\"id\":7,\"name\":\"Billed\",\"sort\":7}]');
/*!40000 ALTER TABLE `redi_spot_sent_option` ENABLE KEYS */;
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
INSERT INTO `redi_spot_sent_to_customer_contact` VALUES (37,9);
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
  `spot_version_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent_to_spot_version`
--

LOCK TABLES `redi_spot_sent_to_spot_version` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent_to_spot_version` DISABLE KEYS */;
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
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `spot_id` int(11) NOT NULL,
  `version_id` int(11) NOT NULL,
  `version_status_id` int(11) DEFAULT NULL,
  `version_note` text,
  `billing_type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=130 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_version`
--

LOCK TABLES `redi_spot_version` WRITE;
/*!40000 ALTER TABLE `redi_spot_version` DISABLE KEYS */;
INSERT INTO `redi_spot_version` VALUES (1,58,1,NULL,NULL,NULL),(2,55,6,NULL,NULL,NULL),(3,55,1,NULL,NULL,NULL),(4,20,1,NULL,NULL,NULL),(5,2,21,NULL,NULL,NULL),(6,2,1,NULL,NULL,NULL),(7,2,6,NULL,NULL,NULL),(8,2,2,NULL,NULL,NULL),(9,58,3,NULL,NULL,NULL),(10,59,4,NULL,NULL,NULL),(11,59,8,NULL,NULL,NULL),(12,59,3,NULL,NULL,NULL),(13,60,1,NULL,NULL,NULL),(14,69,3,NULL,NULL,NULL),(15,64,2,NULL,NULL,NULL),(16,64,3,NULL,NULL,NULL),(17,64,4,NULL,NULL,NULL),(18,64,5,NULL,NULL,NULL),(19,64,7,NULL,NULL,NULL),(20,71,1,NULL,NULL,NULL),(21,73,1,NULL,NULL,NULL),(22,75,1,NULL,NULL,NULL),(23,75,2,NULL,NULL,NULL),(24,75,3,NULL,NULL,NULL),(25,75,5,NULL,NULL,NULL),(26,4,1,NULL,NULL,NULL),(27,55,4,NULL,NULL,NULL),(28,73,6,NULL,NULL,NULL),(29,73,11,NULL,NULL,NULL),(30,77,1,NULL,NULL,NULL),(31,55,46,NULL,NULL,NULL),(32,55,12,NULL,NULL,NULL),(33,73,48,NULL,NULL,NULL),(34,78,1,4,'Waiting on Brad to approve the first round while the team is continuing to work !!',NULL),(35,78,4,7,'we need all red graphics',NULL),(36,100,1,3,'null',NULL),(37,100,6,NULL,NULL,NULL),(38,97,1,3,'null',NULL),(39,102,53,9,'Test version note of random length',NULL),(40,97,6,9,'remove shot of the clown add shot of the elephant.\r\nLose all dogs.\r\nAdd in barks.',NULL),(41,105,1,3,'null',NULL),(42,108,1,3,'null',NULL),(43,107,1,3,'null',NULL),(44,106,1,3,'null',NULL),(45,107,6,NULL,NULL,NULL),(46,79,1,3,'null',NULL),(47,103,1,9,'Cut an amazing V.1',NULL),(48,110,1,6,'null',NULL),(49,111,1,9,'null',NULL),(50,112,1,4,'null',NULL),(51,113,1,9,'null',NULL),(52,111,54,NULL,NULL,NULL),(53,111,55,NULL,NULL,NULL),(54,112,56,9,'null',NULL),(55,112,57,6,'null',NULL),(56,103,58,NULL,NULL,NULL),(57,110,6,3,'add more monkey',NULL),(58,103,61,NULL,NULL,NULL),(59,103,63,NULL,NULL,NULL),(60,114,1,NULL,NULL,NULL),(61,117,1,NULL,NULL,NULL),(62,118,1,NULL,NULL,NULL),(63,117,66,9,'null',NULL),(64,117,6,NULL,NULL,NULL),(65,117,67,NULL,NULL,NULL),(66,117,68,NULL,NULL,NULL),(67,117,69,NULL,NULL,NULL),(68,117,70,NULL,NULL,NULL),(69,120,1,NULL,NULL,NULL),(70,120,5,NULL,NULL,NULL),(71,120,6,NULL,NULL,NULL),(72,120,75,7,'null',NULL),(73,120,74,7,'null',NULL),(74,120,14,NULL,NULL,NULL),(75,120,11,NULL,NULL,NULL),(76,120,16,NULL,NULL,NULL),(77,120,19,7,'null',NULL),(78,120,21,NULL,NULL,NULL),(79,120,24,NULL,NULL,NULL),(80,120,26,NULL,NULL,NULL),(81,120,36,NULL,NULL,NULL),(82,120,31,NULL,NULL,NULL),(83,121,1,NULL,NULL,NULL),(84,121,4,NULL,NULL,NULL),(85,121,6,NULL,NULL,NULL),(86,121,9,NULL,NULL,NULL),(87,121,10,NULL,NULL,NULL),(88,121,76,NULL,NULL,NULL),(89,121,11,NULL,NULL,NULL),(90,121,16,NULL,NULL,NULL),(91,121,19,NULL,NULL,NULL),(92,121,21,NULL,NULL,NULL),(93,121,24,NULL,NULL,NULL),(94,121,26,NULL,NULL,NULL),(95,121,30,NULL,NULL,NULL),(96,121,31,3,'null',NULL),(97,121,36,10,'null',NULL),(98,97,11,NULL,NULL,NULL),(99,120,41,7,'use shark joke, shorten lose “nice kitty nice kitty” boom – if you didn’t have that wouldn’t be as scary. Can it work without it.\r\n\r\n.  Flush out more time of the racing, in slaughter house.  \r\n\r\nOkay kid show me what you got.  See them racing against each other. Her in car going at it.\r\n\r\nDon’t lose flossing\r\n\r\nDon’t get too dark and gang infested. \r\n“Slaughter Race, This is the most dangerous of all the racing games.”\r\n“Slaughter Race, this game’s dangerous!”\r\nSlaughter house this the \r\nHesitant nervous ralph – \r\n+Stay in your lane, there are no lanes here we can go anywhere!\r\n\r\nPulled up her hood “see what you got kid” – unstoppable (far shot so don’t have too)',NULL),(100,120,44,3,'null',NULL),(101,84,2,3,'null',NULL),(102,122,1,NULL,NULL,NULL),(103,84,1,4,'test note',NULL),(104,84,3,NULL,NULL,NULL),(105,84,6,0,'null',NULL),(106,123,1,3,'null',NULL),(107,124,1,7,'null',NULL),(108,124,6,7,'null',NULL),(109,124,11,3,'null',NULL),(110,78,79,NULL,NULL,NULL),(111,78,84,NULL,NULL,NULL),(112,78,85,NULL,NULL,NULL),(113,78,86,NULL,NULL,NULL),(114,78,87,NULL,NULL,NULL),(115,78,88,NULL,NULL,NULL),(116,78,89,NULL,NULL,NULL),(117,78,2,NULL,NULL,NULL),(118,78,90,NULL,NULL,NULL),(119,125,91,NULL,NULL,NULL),(120,125,92,NULL,NULL,NULL),(121,79,2,NULL,NULL,NULL),(122,79,5,NULL,NULL,NULL),(123,79,6,NULL,NULL,NULL),(124,79,9,NULL,NULL,NULL),(125,78,5,NULL,NULL,NULL),(126,81,14,5,'null',NULL),(127,82,1,NULL,NULL,NULL),(128,83,8,NULL,NULL,NULL),(129,96,5,NULL,NULL,NULL);
/*!40000 ALTER TABLE `redi_spot_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_spot_version_editor`
--

DROP TABLE IF EXISTS `redi_spot_version_editor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_spot_version_editor` (
  `spot_version_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`spot_version_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_version_editor`
--

LOCK TABLES `redi_spot_version_editor` WRITE;
/*!40000 ALTER TABLE `redi_spot_version_editor` DISABLE KEYS */;
INSERT INTO `redi_spot_version_editor` VALUES (1,37),(3,32),(4,37),(27,0),(34,48),(35,37),(40,3),(40,4),(40,5),(40,12),(46,37),(46,44),(101,37),(103,44),(103,48),(104,37),(117,37),(118,44),(127,44);
/*!40000 ALTER TABLE `redi_spot_version_editor` ENABLE KEYS */;
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
-- Table structure for table `redi_studio`
--

DROP TABLE IF EXISTS `redi_studio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_studio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cardcode` varchar(15) DEFAULT NULL,
  `studio_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cardcode` (`cardcode`)
) ENGINE=MyISAM AUTO_INCREMENT=188 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_studio`
--

LOCK TABLES `redi_studio` WRITE;
/*!40000 ALTER TABLE `redi_studio` DISABLE KEYS */;
INSERT INTO `redi_studio` VALUES (1,NULL,'NBC Universal'),(2,NULL,'Warner Bros.'),(3,NULL,'HBO'),(4,NULL,'2K Games'),(5,NULL,'505 Games'),(6,NULL,'72andSunny'),(7,NULL,'A24'),(8,NULL,'ABC Entertainment'),(9,NULL,'Activision'),(10,NULL,'AIAS'),(11,NULL,'Alcon Entertainment\r\n'),(12,NULL,'Alliance Films\r\n'),(13,NULL,'Amazon\r\n'),(14,NULL,'Anchor Bay Ent\r\n'),(15,NULL,'Annapurna Pictures\r\n'),(16,NULL,'Arenas\r\n'),(17,NULL,'Articulus Ent.\r\n'),(18,NULL,'Atari, Inc\r\n'),(19,NULL,'Atlas Entertainment\r\n'),(20,NULL,'AwesomenessTV\r\n'),(21,NULL,'Backroom Int\'l\r\n'),(22,NULL,'Bandito Brothers\r\n'),(23,NULL,'Believe Media\r\n'),(24,NULL,'Bethesda\r\n'),(25,NULL,'Black Label Media\r\n'),(26,NULL,'Bleecker Street\r\n'),(27,NULL,'Blizzard Ent.\r\n'),(28,NULL,'Bloom Media\r\n'),(29,NULL,'Blumhouse Prod.\r\n'),(30,NULL,'Boies Schiller Films\r\n'),(31,NULL,'Boom! Studio\r\n'),(32,NULL,'Broad Green Pictures\r\n'),(33,NULL,'Buddha Jones\r\n'),(34,NULL,'Buena Vista\r\n'),(35,NULL,'Capcom Entertainment\r\n'),(36,NULL,'CBS Films\r\n'),(37,NULL,'CBS TV\r\n'),(38,NULL,'CD Projekt\r\n'),(39,NULL,'Cinemarket Film\r\n'),(40,NULL,'Cinemax\r\n'),(41,NULL,'City Interactive\r\n'),(42,NULL,'Columbia\r\n'),(43,NULL,'Creative Artists Age\r\n'),(44,NULL,'Creative Future\r\n'),(45,NULL,'Crystal Dynamics\r\n'),(46,NULL,'Current Entertainmen\r\n'),(47,NULL,'CW TV Network\r\n'),(48,NULL,'Dance On\r\n'),(49,NULL,'Daredevil Films\r\n'),(50,NULL,'Demarest Films\r\n'),(51,NULL,'Dimension\r\n'),(52,NULL,'Discovery\r\n'),(53,NULL,'Disney\r\n'),(54,NULL,'Disney Interactive\r\n'),(55,NULL,'Distant Horizon\r\n'),(56,NULL,'Dolby Laboratories\r\n'),(57,NULL,'Dreamworks Animation\r\n'),(58,NULL,'E! Entertainment\r\n'),(59,NULL,'EA Canada\r\n'),(60,NULL,'EDKO/ Irresistible\r\n'),(61,NULL,'Eidos Montreal\r\n'),(62,NULL,'Electronic Arts\r\n'),(63,NULL,'Electronic Arts Inc\r\n'),(64,NULL,'Element Films\r\n'),(65,NULL,'eOne Entertainment\r\n'),(66,NULL,'Epic Games\r\n'),(67,NULL,'Epix\r\n'),(68,NULL,'ESL Gaming\r\n'),(69,NULL,'Europacorp\r\n'),(70,NULL,'EXE Studio Global\r\n'),(71,NULL,'Factory Productions\r\n'),(72,NULL,'Fallen Angel Prod.\r\n'),(73,NULL,'Film Arcade\r\n'),(74,NULL,'Film District\r\n'),(75,NULL,'Film Nation Ent.\r\n'),(76,NULL,'Fishlabs\r\n'),(77,NULL,'Focus\r\n'),(78,NULL,'Fox\r\n'),(79,NULL,'Fox HE\r\n'),(80,NULL,'Fox Searchlight\r\n'),(81,NULL,'Fox Sports\r\n'),(82,NULL,'Fulfillment Fund\r\n'),(83,NULL,'Heat\r\n'),(84,NULL,'High Moon Studios\r\n'),(85,NULL,'History\r\n'),(86,NULL,'Home Box Office\r\n'),(87,NULL,'Hulu\r\n'),(88,NULL,'Icon Film\r\n'),(89,NULL,'IDW Entertainment\r\n'),(90,NULL,'IFC Films\r\n'),(91,NULL,'IGG\r\n'),(92,NULL,'IGP\r\n'),(93,NULL,'IMAX\r\n'),(94,NULL,'Independent\r\n'),(95,NULL,'Indomitable Ent.\r\n'),(96,NULL,'Informed Enterprises\r\n'),(97,NULL,'Koch Media\r\n'),(98,NULL,'Konami Digital Ent.\r\n'),(99,NULL,'KTM Film LLC\r\n'),(100,NULL,'Larger Than Life\r\n'),(101,NULL,'LD Entertainment\r\n'),(102,NULL,'Legendary\r\n'),(103,NULL,'Lifetime\r\n'),(104,NULL,'Lionsgate\r\n'),(105,NULL,'LM&O Advertising\r\n'),(106,NULL,'Lotus Entertainment\r\n'),(107,NULL,'M ss ng p eces\r\n'),(108,NULL,'Majesco Games\r\n'),(109,NULL,'Mandate\r\n'),(110,NULL,'Mark Burnett Prod.\r\n'),(111,NULL,'Matthew Cohen Create\r\n'),(112,NULL,'MGM/United Artists\r\n'),(113,NULL,'Microsoft Corp\r\n'),(114,NULL,'Millennium Films\r\n'),(115,NULL,'Miramax\r\n'),(116,NULL,'mOcean LA\r\n'),(117,NULL,'Mod Producciones\r\n'),(118,NULL,'Morgan Creek\r\n'),(119,NULL,'Motion Media Service\r\n'),(120,NULL,'MTV\r\n'),(121,NULL,'Mythology Enterterta\r\n'),(122,NULL,'Namco\r\n'),(123,NULL,'National Amusements\r\n'),(124,NULL,'National Geographic\r\n'),(125,NULL,'Naughty Dog\r\n'),(126,NULL,'Neo Art & Logic\r\n'),(127,NULL,'Netflix\r\n'),(128,NULL,'New Line\r\n'),(129,NULL,'New Regency Prod.\r\n'),(130,NULL,'Open Road Films\r\n'),(131,NULL,'Overture\r\n'),(132,NULL,'Pandemic\r\n'),(133,NULL,'Pandemic Marketing\r\n'),(134,NULL,'Paramount\r\n'),(135,NULL,'Picture Shack Ent\r\n'),(136,NULL,'Picturehouse\r\n'),(137,NULL,'Pivot TV Network\r\n'),(138,NULL,'Playstation\r\n'),(139,NULL,'Pocket Gems\r\n'),(140,NULL,'Privateer Holdings\r\n'),(141,NULL,'Providence St. Josep\r\n'),(142,NULL,'Pure F.P.S.\r\n'),(143,NULL,'Radical Ent\r\n'),(144,NULL,'Rainmaker Ent\r\n'),(145,NULL,'Reef Ent.\r\n'),(146,NULL,'Relativity Media\r\n'),(147,NULL,'Reload\r\n'),(148,NULL,'Respawn Ent\r\n'),(149,NULL,'Riders Production\r\n'),(150,NULL,'Roadshow Films\r\n'),(151,NULL,'Showtime\r\n'),(152,NULL,'Sierra Affinity\r\n'),(153,NULL,'Simon & Schuster\r\n'),(154,NULL,'Skinny Mic Prod.\r\n'),(155,NULL,'Skydance Interactive\r\n'),(156,NULL,'SModcast Pictures\r\n'),(157,NULL,'Soap Creative\r\n'),(158,NULL,'Sony Computer Ent Am\r\n'),(159,NULL,'Sony Pictures\r\n'),(160,NULL,'Sony/Screen Gems\r\n'),(161,NULL,'Special 83, LLC\r\n'),(162,NULL,'Stampede\r\n'),(163,NULL,'Starz Ent, LLC\r\n'),(164,NULL,'Studio Canal\r\n'),(165,NULL,'STX\r\n'),(166,NULL,'STX Entertainment\r\n'),(167,NULL,'Summit\r\n'),(168,NULL,'Summit/Lionsgate\r\n'),(169,NULL,'Supercell\r\n'),(170,NULL,'Survios\r\n'),(171,NULL,'TBS\r\n'),(172,NULL,'Tecmo Koei Am. Corp\r\n'),(173,NULL,'Tencent\r\n'),(174,NULL,'The Orchard\r\n'),(175,NULL,'The Rogue Initiative\r\n'),(176,NULL,'THQ Inc\r\n'),(177,NULL,'TNT\r\n'),(178,NULL,'Tooley Entertainment\r\n'),(179,NULL,'Tremolo Productions\r\n'),(180,NULL,'Turner Ent\r\n'),(181,NULL,'Ubisoft\r\n'),(182,NULL,'Universal\r\n'),(183,NULL,'UTV Ignition\r\n'),(184,NULL,'Water\'s End Prod.\r\n'),(185,NULL,'Wayfare Ent.\r\n'),(186,NULL,'Weinstein Company\r\n'),(187,NULL,'Xbox\r\n');
/*!40000 ALTER TABLE `redi_studio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_studio_ratecard`
--

DROP TABLE IF EXISTS `redi_studio_ratecard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_studio_ratecard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ratecard_id` int(11) DEFAULT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `trt_id` int(11) DEFAULT NULL,
  `revision_inc` int(11) DEFAULT NULL,
  `note` text,
  `type` char(1) DEFAULT NULL,
  `rate` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1614 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_studio_ratecard`
--

LOCK TABLES `redi_studio_ratecard` WRITE;
/*!40000 ALTER TABLE `redi_studio_ratecard` DISABLE KEYS */;
INSERT INTO `redi_studio_ratecard` VALUES (21,1,1,NULL,NULL,NULL,'H',NULL),(22,1,4,NULL,NULL,NULL,'H',NULL),(23,1,5,NULL,NULL,NULL,'H',NULL),(24,1,8,NULL,NULL,NULL,'H',NULL),(25,1,9,NULL,NULL,NULL,'H',NULL),(26,1,10,NULL,NULL,NULL,'H',NULL),(28,1,12,NULL,NULL,NULL,'H',NULL),(29,1,13,NULL,NULL,NULL,'H',NULL),(30,1,14,NULL,NULL,NULL,'H',NULL),(31,1,15,NULL,NULL,NULL,'H',NULL),(32,1,17,NULL,NULL,NULL,'H',NULL),(33,1,18,NULL,NULL,NULL,'H',NULL),(34,1,19,NULL,NULL,NULL,'H',NULL),(35,1,20,NULL,NULL,NULL,'H',NULL),(36,1,27,NULL,NULL,NULL,'H',NULL),(37,1,30,NULL,NULL,NULL,'H',NULL),(38,1,37,NULL,NULL,NULL,'H',NULL),(145,6,1,NULL,NULL,'some note','H',300.00),(146,6,4,NULL,NULL,'new note','H',180.00),(147,6,5,NULL,NULL,NULL,'H',NULL),(148,6,8,NULL,NULL,NULL,'H',NULL),(149,6,9,NULL,NULL,NULL,'H',NULL),(150,6,10,NULL,NULL,NULL,'H',NULL),(151,6,11,NULL,NULL,NULL,'H',NULL),(152,6,12,NULL,NULL,NULL,'H',NULL),(153,6,13,NULL,NULL,NULL,'H',NULL),(154,6,14,NULL,NULL,NULL,'H',NULL),(155,6,15,NULL,NULL,NULL,'H',NULL),(156,6,17,NULL,NULL,NULL,'H',NULL),(157,6,18,NULL,NULL,NULL,'H',NULL),(158,6,19,NULL,NULL,NULL,'H',NULL),(159,6,20,NULL,NULL,NULL,'H',NULL),(160,6,27,NULL,NULL,NULL,'H',NULL),(161,6,30,NULL,NULL,NULL,'H',NULL),(162,6,37,NULL,NULL,NULL,'H',NULL),(579,20,1,NULL,NULL,NULL,'H',NULL),(580,20,4,NULL,NULL,NULL,'H',NULL),(581,20,5,NULL,NULL,NULL,'H',NULL),(582,20,8,NULL,NULL,NULL,'H',NULL),(583,20,9,NULL,NULL,NULL,'H',NULL),(584,20,10,NULL,NULL,NULL,'H',NULL),(585,20,11,NULL,NULL,NULL,'H',NULL),(586,20,12,NULL,NULL,NULL,'H',NULL),(587,20,13,NULL,NULL,NULL,'H',NULL),(588,20,14,NULL,NULL,NULL,'H',NULL),(589,20,15,NULL,NULL,NULL,'H',NULL),(590,20,17,NULL,NULL,NULL,'H',NULL),(591,20,18,NULL,NULL,NULL,'H',NULL),(592,20,19,NULL,NULL,NULL,'H',NULL),(593,20,20,NULL,NULL,NULL,'H',NULL),(594,20,27,NULL,NULL,NULL,'H',NULL),(595,20,30,NULL,NULL,NULL,'H',NULL),(596,20,37,NULL,NULL,NULL,'H',NULL),(796,27,1,6,1,'NOte','H',121.00),(797,27,4,NULL,2,NULL,'H',123.00),(798,27,5,NULL,NULL,NULL,'H',NULL),(799,27,8,NULL,NULL,NULL,'H',NULL),(800,27,9,NULL,NULL,NULL,'H',NULL),(801,27,10,NULL,NULL,NULL,'H',NULL),(802,27,11,NULL,NULL,NULL,'H',NULL),(803,27,12,NULL,NULL,NULL,'H',NULL),(804,27,13,NULL,NULL,NULL,'H',NULL),(805,27,14,NULL,NULL,NULL,'H',NULL),(806,27,15,NULL,NULL,NULL,'H',NULL),(807,27,17,NULL,NULL,NULL,'H',NULL),(808,27,18,NULL,NULL,NULL,'H',NULL),(809,27,19,NULL,NULL,NULL,'H',NULL),(810,27,20,NULL,NULL,NULL,'H',NULL),(811,27,27,NULL,NULL,'some note','H',100.00),(812,27,30,NULL,NULL,NULL,'H',NULL),(813,27,37,NULL,NULL,NULL,'H',NULL),(827,1,42,NULL,NULL,NULL,'H',NULL),(828,6,42,NULL,NULL,NULL,'H',NULL),(836,20,42,NULL,NULL,NULL,'H',NULL),(841,27,42,NULL,NULL,NULL,'H',NULL),(842,28,1,NULL,NULL,'bla','H',NULL),(843,28,4,NULL,NULL,NULL,'H',NULL),(844,28,5,NULL,NULL,NULL,'H',NULL),(845,28,8,NULL,NULL,NULL,'H',NULL),(846,28,9,NULL,NULL,NULL,'H',NULL),(847,28,10,NULL,NULL,NULL,'H',NULL),(848,28,11,NULL,NULL,NULL,'H',NULL),(849,28,12,NULL,NULL,NULL,'H',NULL),(850,28,13,NULL,NULL,NULL,'H',NULL),(851,28,14,NULL,NULL,NULL,'H',NULL),(852,28,15,NULL,NULL,NULL,'H',NULL),(853,28,17,NULL,NULL,NULL,'H',NULL),(854,28,18,NULL,NULL,NULL,'H',NULL),(855,28,19,NULL,NULL,NULL,'H',NULL),(856,28,20,NULL,NULL,NULL,'H',NULL),(857,28,27,NULL,NULL,NULL,'H',NULL),(858,28,30,NULL,NULL,NULL,'H',NULL),(859,28,37,NULL,NULL,NULL,'H',NULL),(860,28,42,NULL,NULL,NULL,'H',NULL),(873,29,1,NULL,NULL,NULL,'H',NULL),(874,29,4,NULL,NULL,NULL,'H',NULL),(875,29,5,NULL,NULL,NULL,'H',NULL),(876,29,8,NULL,NULL,NULL,'H',NULL),(877,29,9,NULL,NULL,NULL,'H',NULL),(878,29,10,NULL,NULL,NULL,'H',NULL),(879,29,11,NULL,NULL,NULL,'H',NULL),(880,29,12,NULL,NULL,NULL,'H',NULL),(881,29,13,NULL,NULL,NULL,'H',NULL),(882,29,14,NULL,NULL,NULL,'H',NULL),(883,29,15,NULL,NULL,NULL,'H',NULL),(884,29,17,NULL,NULL,NULL,'H',NULL),(885,29,18,NULL,NULL,NULL,'H',NULL),(886,29,19,NULL,NULL,NULL,'H',NULL),(887,29,20,NULL,NULL,'nore','H',NULL),(888,29,27,NULL,NULL,NULL,'H',NULL),(889,29,30,NULL,NULL,NULL,'H',NULL),(890,29,37,NULL,NULL,NULL,'H',NULL),(891,29,42,NULL,NULL,NULL,'H',NULL),(904,30,1,NULL,NULL,NULL,'H',NULL),(905,30,4,NULL,NULL,NULL,'H',NULL),(906,30,5,NULL,NULL,NULL,'H',NULL),(907,30,8,NULL,NULL,NULL,'H',NULL),(908,30,9,NULL,NULL,NULL,'H',NULL),(909,30,10,NULL,NULL,NULL,'H',NULL),(910,30,11,NULL,NULL,NULL,'H',NULL),(911,30,12,NULL,NULL,NULL,'H',NULL),(912,30,13,NULL,NULL,NULL,'H',NULL),(913,30,14,NULL,NULL,NULL,'H',NULL),(914,30,15,NULL,NULL,NULL,'H',NULL),(915,30,17,NULL,NULL,NULL,'H',NULL),(916,30,18,NULL,NULL,NULL,'H',NULL),(917,30,19,NULL,NULL,NULL,'H',NULL),(918,30,20,NULL,NULL,NULL,'H',NULL),(919,30,27,NULL,NULL,NULL,'H',NULL),(920,30,30,NULL,NULL,NULL,'H',NULL),(921,30,37,NULL,NULL,NULL,'H',NULL),(922,30,42,NULL,NULL,NULL,'H',NULL),(935,31,1,NULL,NULL,'asd','H',13.00),(936,31,4,NULL,NULL,NULL,'H',NULL),(937,31,5,NULL,NULL,NULL,'H',NULL),(938,31,8,NULL,NULL,NULL,'H',NULL),(939,31,9,NULL,NULL,NULL,'H',NULL),(940,31,10,NULL,NULL,NULL,'H',NULL),(941,31,11,NULL,NULL,NULL,'H',NULL),(942,31,12,NULL,NULL,NULL,'H',NULL),(943,31,13,NULL,NULL,NULL,'H',NULL),(944,31,14,NULL,NULL,NULL,'H',NULL),(945,31,15,NULL,NULL,NULL,'H',NULL),(946,31,17,NULL,NULL,NULL,'H',NULL),(947,31,18,NULL,NULL,NULL,'H',NULL),(948,31,19,NULL,NULL,NULL,'H',NULL),(949,31,20,NULL,NULL,NULL,'H',NULL),(950,31,27,NULL,NULL,NULL,'H',NULL),(951,31,30,NULL,NULL,NULL,'H',NULL),(952,31,37,NULL,NULL,NULL,'H',NULL),(953,31,42,NULL,NULL,NULL,'H',NULL),(966,30,16,9,12,'12',NULL,12.00),(967,30,15,8,12,'asd',NULL,12.00),(968,30,13,4,12,'asd',NULL,123.00),(969,30,15,8,21,'23',NULL,23.00),(970,32,1,NULL,NULL,NULL,'H',NULL),(971,32,4,NULL,NULL,NULL,'H',NULL),(972,32,5,NULL,NULL,NULL,'H',NULL),(973,32,8,NULL,NULL,NULL,'H',NULL),(974,32,9,NULL,NULL,NULL,'H',NULL),(975,32,10,NULL,NULL,NULL,'H',NULL),(976,32,11,NULL,NULL,NULL,'H',NULL),(977,32,12,NULL,NULL,NULL,'H',NULL),(978,32,13,NULL,NULL,NULL,'H',NULL),(979,32,14,NULL,NULL,NULL,'H',NULL),(980,32,15,NULL,NULL,NULL,'H',NULL),(981,32,17,NULL,NULL,NULL,'H',NULL),(982,32,18,NULL,NULL,NULL,'H',NULL),(983,32,19,NULL,NULL,NULL,'H',NULL),(984,32,20,NULL,NULL,NULL,'H',NULL),(985,32,27,NULL,NULL,NULL,'H',NULL),(986,32,30,NULL,NULL,NULL,'H',NULL),(987,32,37,NULL,NULL,NULL,'H',NULL),(988,32,42,NULL,NULL,NULL,'H',NULL),(1001,31,1,5,12,'23',NULL,23.00),(1010,6,40,5,1,NULL,NULL,350.00),(1011,6,40,9,1,NULL,NULL,4500.00),(1013,27,40,8,12,'dasdsadas',NULL,123.00),(1014,27,40,10,12,'adasdsadsa',NULL,12.00),(1015,27,40,9,23,'1adsdadasd',NULL,212312.00),(1016,27,40,1,12,'12312',NULL,12.00),(1020,28,40,NULL,12,'asd',NULL,12.00),(1021,33,1,NULL,NULL,NULL,'H',NULL),(1022,33,4,NULL,NULL,NULL,'H',NULL),(1023,33,5,NULL,NULL,NULL,'H',NULL),(1024,33,8,NULL,NULL,NULL,'H',NULL),(1025,33,9,NULL,NULL,NULL,'H',NULL),(1026,33,10,NULL,NULL,NULL,'H',NULL),(1027,33,11,NULL,NULL,NULL,'H',NULL),(1028,33,12,NULL,NULL,NULL,'H',NULL),(1029,33,13,NULL,NULL,NULL,'H',NULL),(1030,33,14,NULL,NULL,NULL,'H',NULL),(1031,33,15,NULL,NULL,NULL,'H',NULL),(1032,33,17,NULL,NULL,NULL,'H',NULL),(1033,33,18,NULL,NULL,NULL,'H',NULL),(1034,33,19,NULL,NULL,NULL,'H',NULL),(1035,33,20,NULL,NULL,NULL,'H',NULL),(1036,33,27,NULL,NULL,NULL,'H',NULL),(1037,33,30,NULL,NULL,NULL,'H',NULL),(1038,33,37,NULL,NULL,NULL,'H',NULL),(1039,33,42,NULL,NULL,NULL,'H',NULL),(1052,29,40,NULL,2,NULL,NULL,22.00),(1053,34,1,NULL,NULL,NULL,'H',NULL),(1054,34,4,NULL,NULL,NULL,'H',NULL),(1055,34,5,NULL,NULL,NULL,'H',NULL),(1056,34,8,NULL,NULL,NULL,'H',NULL),(1057,34,9,NULL,NULL,NULL,'H',NULL),(1058,34,10,NULL,NULL,NULL,'H',NULL),(1059,34,11,NULL,NULL,NULL,'H',NULL),(1060,34,12,NULL,NULL,NULL,'H',NULL),(1061,34,13,NULL,NULL,NULL,'H',NULL),(1062,34,14,NULL,NULL,NULL,'H',NULL),(1063,34,15,NULL,NULL,NULL,'H',NULL),(1064,34,17,NULL,NULL,NULL,'H',NULL),(1065,34,18,NULL,NULL,NULL,'H',NULL),(1066,34,19,NULL,NULL,NULL,'H',NULL),(1067,34,20,NULL,NULL,NULL,'H',NULL),(1068,34,27,NULL,NULL,NULL,'H',NULL),(1069,34,30,NULL,NULL,NULL,'H',NULL),(1070,34,37,NULL,NULL,NULL,'H',NULL),(1071,34,42,NULL,NULL,NULL,'H',NULL),(1084,35,1,NULL,NULL,NULL,'H',NULL),(1085,35,4,NULL,NULL,NULL,'H',NULL),(1086,35,5,NULL,NULL,NULL,'H',NULL),(1087,35,8,NULL,NULL,NULL,'H',NULL),(1088,35,9,NULL,NULL,NULL,'H',NULL),(1089,35,10,NULL,NULL,NULL,'H',NULL),(1090,35,11,NULL,NULL,NULL,'H',NULL),(1091,35,12,NULL,NULL,NULL,'H',NULL),(1092,35,13,NULL,NULL,NULL,'H',NULL),(1093,35,14,NULL,NULL,NULL,'H',NULL),(1094,35,15,NULL,NULL,NULL,'H',NULL),(1095,35,17,NULL,NULL,NULL,'H',NULL),(1096,35,18,NULL,NULL,NULL,'H',NULL),(1097,35,19,NULL,NULL,NULL,'H',NULL),(1098,35,20,NULL,NULL,NULL,'H',NULL),(1099,35,27,NULL,NULL,NULL,'H',NULL),(1100,35,30,NULL,NULL,NULL,'H',NULL),(1101,35,37,NULL,NULL,NULL,'H',NULL),(1102,35,42,NULL,NULL,NULL,'H',NULL),(1177,38,1,NULL,NULL,NULL,'H',NULL),(1178,38,4,NULL,NULL,NULL,'H',NULL),(1179,38,5,NULL,NULL,NULL,'H',NULL),(1180,38,8,NULL,NULL,NULL,'H',NULL),(1181,38,9,NULL,NULL,NULL,'H',NULL),(1182,38,10,NULL,NULL,NULL,'H',NULL),(1183,38,11,NULL,NULL,NULL,'H',NULL),(1184,38,12,NULL,NULL,NULL,'H',NULL),(1185,38,13,NULL,NULL,NULL,'H',NULL),(1186,38,14,NULL,NULL,NULL,'H',NULL),(1187,38,15,NULL,NULL,NULL,'H',NULL),(1188,38,17,NULL,NULL,NULL,'H',NULL),(1189,38,18,NULL,NULL,NULL,'H',NULL),(1190,38,19,NULL,NULL,NULL,'H',NULL),(1191,38,20,NULL,NULL,NULL,'H',NULL),(1192,38,27,NULL,NULL,NULL,'H',NULL),(1193,38,30,NULL,NULL,NULL,'H',NULL),(1194,38,37,NULL,NULL,NULL,'H',NULL),(1195,38,42,NULL,NULL,NULL,'H',NULL),(1208,39,1,NULL,NULL,NULL,'H',NULL),(1209,39,4,NULL,NULL,NULL,'H',NULL),(1210,39,5,NULL,NULL,NULL,'H',NULL),(1211,39,8,NULL,NULL,NULL,'H',NULL),(1212,39,9,NULL,NULL,NULL,'H',NULL),(1213,39,10,NULL,NULL,NULL,'H',NULL),(1214,39,11,NULL,NULL,NULL,'H',NULL),(1215,39,12,NULL,NULL,NULL,'H',NULL),(1216,39,13,NULL,NULL,NULL,'H',NULL),(1217,39,14,NULL,NULL,NULL,'H',NULL),(1218,39,15,NULL,NULL,NULL,'H',NULL),(1219,39,17,NULL,NULL,NULL,'H',NULL),(1220,39,18,NULL,NULL,NULL,'H',NULL),(1221,39,19,NULL,NULL,NULL,'H',NULL),(1222,39,20,NULL,NULL,NULL,'H',NULL),(1223,39,27,NULL,NULL,NULL,'H',NULL),(1224,39,30,NULL,NULL,NULL,'H',NULL),(1225,39,37,NULL,NULL,NULL,'H',NULL),(1226,39,42,NULL,NULL,NULL,'H',NULL),(1394,45,1,NULL,NULL,NULL,'H',NULL),(1395,45,4,NULL,NULL,NULL,'H',NULL),(1396,45,5,NULL,NULL,NULL,'H',NULL),(1397,45,8,NULL,NULL,NULL,'H',NULL),(1398,45,9,NULL,NULL,NULL,'H',NULL),(1399,45,10,NULL,NULL,NULL,'H',NULL),(1400,45,11,NULL,NULL,NULL,'H',NULL),(1401,45,12,NULL,NULL,NULL,'H',NULL),(1402,45,13,NULL,NULL,NULL,'H',NULL),(1403,45,14,NULL,NULL,NULL,'H',NULL),(1404,45,15,NULL,NULL,NULL,'H',NULL),(1405,45,17,NULL,NULL,NULL,'H',NULL),(1406,45,18,NULL,NULL,NULL,'H',NULL),(1407,45,19,NULL,NULL,NULL,'H',NULL),(1408,45,20,NULL,NULL,NULL,'H',NULL),(1409,45,27,NULL,NULL,NULL,'H',NULL),(1410,45,30,NULL,NULL,NULL,'H',NULL),(1411,45,37,NULL,NULL,NULL,'H',NULL),(1412,45,42,NULL,NULL,NULL,'H',NULL),(1425,46,1,NULL,NULL,NULL,'H',NULL),(1426,46,4,NULL,NULL,NULL,'H',NULL),(1427,46,5,NULL,NULL,NULL,'H',NULL),(1428,46,8,NULL,NULL,NULL,'H',NULL),(1429,46,9,NULL,NULL,NULL,'H',NULL),(1430,46,10,NULL,NULL,NULL,'H',NULL),(1431,46,11,NULL,NULL,NULL,'H',NULL),(1432,46,12,NULL,NULL,NULL,'H',NULL),(1433,46,13,NULL,NULL,NULL,'H',NULL),(1434,46,14,NULL,NULL,NULL,'H',NULL),(1435,46,15,NULL,NULL,NULL,'H',NULL),(1436,46,17,NULL,NULL,NULL,'H',NULL),(1437,46,18,NULL,NULL,NULL,'H',NULL),(1438,46,19,NULL,NULL,NULL,'H',NULL),(1439,46,20,NULL,NULL,NULL,'H',NULL),(1440,46,27,NULL,NULL,NULL,'H',NULL),(1441,46,30,NULL,NULL,NULL,'H',NULL),(1442,46,37,NULL,NULL,NULL,'H',NULL),(1443,46,42,NULL,NULL,NULL,'H',NULL),(1487,48,1,NULL,NULL,NULL,'H',NULL),(1488,48,4,NULL,NULL,NULL,'H',NULL),(1489,48,5,NULL,NULL,NULL,'H',NULL),(1490,48,8,NULL,NULL,NULL,'H',NULL),(1491,48,9,NULL,NULL,NULL,'H',NULL),(1492,48,10,NULL,NULL,NULL,'H',NULL),(1493,48,11,NULL,NULL,NULL,'H',NULL),(1494,48,12,NULL,NULL,NULL,'H',NULL),(1495,48,13,NULL,NULL,NULL,'H',NULL),(1496,48,14,NULL,NULL,NULL,'H',NULL),(1497,48,15,NULL,NULL,NULL,'H',NULL),(1498,48,17,NULL,NULL,NULL,'H',NULL),(1499,48,18,NULL,NULL,NULL,'H',NULL),(1500,48,19,NULL,NULL,NULL,'H',NULL),(1501,48,20,NULL,NULL,NULL,'H',NULL),(1502,48,27,NULL,NULL,NULL,'H',NULL),(1503,48,30,NULL,NULL,NULL,'H',NULL),(1504,48,37,NULL,NULL,NULL,'H',NULL),(1505,48,42,NULL,NULL,NULL,'H',NULL),(1518,49,1,NULL,NULL,NULL,'H',NULL),(1519,49,4,NULL,NULL,NULL,'H',NULL),(1520,49,5,NULL,NULL,NULL,'H',NULL),(1521,49,8,NULL,NULL,NULL,'H',NULL),(1522,49,9,NULL,NULL,NULL,'H',NULL),(1523,49,10,NULL,NULL,NULL,'H',NULL),(1524,49,11,NULL,NULL,NULL,'H',NULL),(1525,49,12,NULL,NULL,NULL,'H',NULL),(1526,49,13,NULL,NULL,NULL,'H',NULL),(1527,49,14,NULL,NULL,NULL,'H',NULL),(1528,49,15,NULL,NULL,NULL,'H',NULL),(1529,49,17,NULL,NULL,NULL,'H',NULL),(1530,49,18,NULL,NULL,NULL,'H',NULL),(1531,49,19,NULL,NULL,NULL,'H',NULL),(1532,49,20,NULL,NULL,NULL,'H',NULL),(1533,49,27,NULL,NULL,NULL,'H',NULL),(1534,49,30,NULL,NULL,NULL,'H',NULL),(1535,49,37,NULL,NULL,NULL,'H',NULL),(1536,49,42,NULL,NULL,NULL,'H',NULL),(1549,49,40,5,1,NULL,NULL,15000.00),(1550,50,1,NULL,NULL,NULL,'H',NULL),(1551,50,4,NULL,NULL,NULL,'H',NULL),(1552,50,5,NULL,NULL,NULL,'H',NULL),(1553,50,8,NULL,NULL,NULL,'H',NULL),(1554,50,9,NULL,NULL,NULL,'H',NULL),(1555,50,10,NULL,NULL,NULL,'H',NULL),(1556,50,11,NULL,NULL,NULL,'H',NULL),(1557,50,12,NULL,NULL,NULL,'H',NULL),(1558,50,13,NULL,NULL,NULL,'H',NULL),(1559,50,14,NULL,NULL,NULL,'H',NULL),(1560,50,15,NULL,NULL,NULL,'H',NULL),(1561,50,17,NULL,NULL,NULL,'H',NULL),(1562,50,18,NULL,NULL,NULL,'H',NULL),(1563,50,19,NULL,NULL,NULL,'H',NULL),(1564,50,20,NULL,NULL,NULL,'H',NULL),(1565,50,27,NULL,NULL,NULL,'H',NULL),(1566,50,30,NULL,NULL,NULL,'H',NULL),(1567,50,37,NULL,NULL,NULL,'H',NULL),(1568,50,42,NULL,NULL,NULL,'H',NULL),(1613,48,40,5,1,NULL,NULL,13500.00);
/*!40000 ALTER TABLE `redi_studio_ratecard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_sub_module`
--

DROP TABLE IF EXISTS `redi_sub_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_sub_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) DEFAULT NULL,
  `sub_module_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_sub_module`
--

LOCK TABLES `redi_sub_module` WRITE;
/*!40000 ALTER TABLE `redi_sub_module` DISABLE KEYS */;
INSERT INTO `redi_sub_module` VALUES (1,1,'Initiate Spot Sent'),(2,1,'Post spot sent'),(3,1,'Finish spot sent'),(4,1,'Graphics for Spot'),(5,1,'EDL for Spot'),(6,1,'Spot Billing'),(7,1,'Graphics Spot Sent'),(8,1,'Spot Post/Finish Request'),(9,1,'Spot to QC');
/*!40000 ALTER TABLE `redi_sub_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_sub_module_access`
--

DROP TABLE IF EXISTS `redi_sub_module_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_sub_module_access` (
  `sub_module_id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  PRIMARY KEY (`sub_module_id`,`user_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_sub_module_access`
--

LOCK TABLES `redi_sub_module_access` WRITE;
/*!40000 ALTER TABLE `redi_sub_module_access` DISABLE KEYS */;
INSERT INTO `redi_sub_module_access` VALUES (1,3),(1,6),(1,9),(1,13),(1,14),(1,21),(1,23),(1,100),(2,100),(3,100),(4,3),(4,100),(5,3),(5,100),(6,100),(7,3),(7,13),(7,14),(7,100),(8,100),(9,100);
/*!40000 ALTER TABLE `redi_sub_module_access` ENABLE KEYS */;
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
  `project_campaign_id` int(11) DEFAULT NULL,
  `version_id` int(11) DEFAULT NULL,
  `spot_id` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `duration` decimal(19,2) DEFAULT NULL,
  `straight_time` decimal(19,2) DEFAULT NULL,
  `over_time` decimal(19,2) DEFAULT NULL,
  `double_time` decimal(19,2) DEFAULT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `activity_description` text,
  `notes` text,
  `non_billable` smallint(1) DEFAULT NULL COMMENT '0/1',
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  `bill_status` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=178 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_time_entry`
--

LOCK TABLES `redi_time_entry` WRITE;
/*!40000 ALTER TABLE `redi_time_entry` DISABLE KEYS */;
INSERT INTO `redi_time_entry` VALUES (176,1,NULL,NULL,NULL,'2018-12-19 08:15:00',5.30,5.30,NULL,NULL,23,'qwe',NULL,0,1,'2019-01-14 02:35:51',NULL,NULL,2,NULL),(175,1,156,NULL,92,'2019-01-07 12:30:00',0.30,NULL,NULL,NULL,24,'',NULL,0,1,'2019-01-10 18:33:58',NULL,NULL,1,NULL),(174,1,NULL,NULL,NULL,'2018-12-18 12:15:00',1.00,NULL,NULL,NULL,22,'',NULL,0,1,'2018-12-31 15:36:37',NULL,NULL,2,NULL),(173,67,182,91,125,'2018-12-25 13:00:00',1.00,NULL,NULL,NULL,17,'',NULL,0,67,'2018-12-28 07:21:12',NULL,NULL,1,NULL),(172,67,156,NULL,NULL,'2018-12-23 14:30:00',1.00,NULL,NULL,NULL,17,'',NULL,0,67,'2018-12-26 15:37:51',NULL,NULL,1,NULL),(171,1,156,1,78,'2018-12-19 16:00:00',6.15,2.30,3.45,NULL,24,'',NULL,0,1,'2018-12-21 11:11:11',NULL,NULL,2,NULL),(170,67,182,92,125,'2018-12-11 20:45:00',1.45,NULL,NULL,NULL,24,'yty',NULL,0,67,'2018-12-20 10:10:28',NULL,NULL,1,NULL),(169,67,NULL,NULL,NULL,'2018-12-11 12:45:00',8.00,NULL,NULL,NULL,7,'dse',NULL,0,67,'2018-12-20 10:00:04',NULL,NULL,1,NULL),(168,1,162,1,100,'2018-12-18 13:30:00',9.00,4.45,4.00,0.15,24,'adasdasdsa',NULL,0,1,'2018-12-16 02:41:10',NULL,NULL,2,NULL),(167,1,NULL,NULL,NULL,'2018-12-18 11:15:00',1.00,NULL,NULL,NULL,22,'sadsadsads',NULL,0,1,'2018-12-16 02:37:24',NULL,NULL,2,NULL),(32,1,NULL,NULL,NULL,'2018-05-03 10:15:26',1.00,NULL,NULL,NULL,3,'','',0,1,'2018-05-03 04:20:58',NULL,NULL,1,NULL),(33,1,157,NULL,84,'2018-05-03 14:15:18',1.00,NULL,NULL,NULL,2,'','',0,1,'2018-05-03 17:29:25',NULL,NULL,1,NULL),(34,1,156,NULL,79,'2018-05-04 15:15:14',2.30,NULL,NULL,NULL,8,'','did a lot of stuff',0,1,'2018-05-03 18:21:29',NULL,NULL,1,NULL),(166,1,NULL,NULL,NULL,'2018-12-18 08:00:00',3.15,3.15,NULL,NULL,7,'asdsadsadsa',NULL,0,1,'2018-12-16 02:34:59',NULL,NULL,2,NULL),(38,1,156,4,78,'2018-06-05 09:00:00',1.00,NULL,NULL,NULL,3,'test abc',NULL,0,1,'2018-06-05 17:29:14',NULL,NULL,3,NULL),(36,1,NULL,2,1,'2018-06-05 00:00:00',9.00,NULL,NULL,NULL,3,NULL,'some note',0,1,'2018-06-05 12:55:13',NULL,NULL,3,NULL),(39,1,NULL,NULL,NULL,'2018-06-06 15:00:00',1.00,NULL,NULL,NULL,7,'Sample description lorem ipsum...',NULL,0,1,'2018-06-06 10:05:45',NULL,NULL,3,NULL),(40,1,156,NULL,81,'2018-06-04 09:00:00',1.00,NULL,NULL,NULL,2,'Breaking down movie.',NULL,0,1,'2018-06-06 10:31:54',NULL,NULL,5,NULL),(41,1,NULL,NULL,NULL,'2018-06-07 12:00:51',8.00,NULL,NULL,NULL,7,'Waiting for John Doe',NULL,0,1,'2018-06-07 07:13:25',NULL,NULL,3,NULL),(42,1,NULL,NULL,NULL,'2018-06-07 12:15:54',1.00,NULL,NULL,NULL,7,'Waiting',NULL,0,1,'2018-06-07 07:21:18',NULL,NULL,3,NULL),(43,1,NULL,NULL,NULL,'2018-06-06 17:00:00',0.30,NULL,NULL,NULL,30,'',NULL,0,1,'2018-06-07 12:33:48',NULL,NULL,3,NULL),(44,1,NULL,NULL,NULL,'2018-06-06 17:00:00',1.00,NULL,NULL,NULL,35,'',NULL,0,1,'2018-06-07 13:00:36',NULL,NULL,3,NULL),(45,1,NULL,NULL,NULL,'2018-06-06 18:00:00',1.00,NULL,NULL,NULL,7,'asd',NULL,0,1,'2018-06-07 13:02:12',NULL,NULL,3,NULL),(46,1,NULL,NULL,NULL,'2018-06-06 18:00:00',1.00,NULL,NULL,NULL,37,'',NULL,0,1,'2018-06-07 13:07:30',NULL,NULL,3,NULL),(47,1,NULL,NULL,NULL,'2018-06-06 18:00:00',1.00,NULL,NULL,NULL,34,'',NULL,0,1,'2018-06-07 13:12:05',NULL,NULL,3,NULL),(48,1,NULL,NULL,NULL,'2018-06-08 13:00:00',0.30,NULL,NULL,NULL,22,'',NULL,0,1,'2018-06-07 17:06:11',NULL,NULL,3,NULL),(49,1,NULL,NULL,NULL,'2018-06-06 13:00:00',1.00,NULL,NULL,NULL,36,'waiting on finishing to approve finish',NULL,0,1,'2018-06-07 17:11:11',NULL,NULL,3,NULL),(50,1,156,1,78,'2018-06-06 14:00:00',1.30,NULL,NULL,NULL,8,'',NULL,0,1,'2018-06-07 18:53:57',NULL,NULL,3,NULL),(51,1,4,NULL,98,'2018-06-08 14:00:00',4.00,NULL,NULL,NULL,32,'',NULL,0,1,'2018-06-07 18:59:45',NULL,NULL,3,NULL),(52,1,156,1,78,'2018-06-08 08:00:00',1.00,NULL,NULL,NULL,31,'',NULL,0,1,'2018-06-08 12:41:10',NULL,NULL,3,NULL),(54,1,NULL,NULL,NULL,'2018-06-08 08:45:43',1.00,NULL,NULL,NULL,16,'production meeting',NULL,0,1,'2018-06-08 12:57:01',NULL,NULL,3,NULL),(56,1,181,NULL,79,'2018-06-15 08:00:00',3.30,NULL,NULL,NULL,2,'',NULL,0,1,'2018-06-15 07:50:06',NULL,NULL,1,NULL),(57,1,169,NULL,NULL,'2018-06-15 16:45:58',6.00,NULL,NULL,NULL,2,'',NULL,0,1,'2018-06-15 07:55:11',NULL,NULL,1,NULL),(58,1,162,NULL,NULL,'2018-06-08 09:00:00',1.00,NULL,NULL,NULL,8,'',NULL,0,1,'2018-06-15 10:10:50',NULL,NULL,3,NULL),(59,1,156,NULL,NULL,'2018-06-14 09:15:00',1.00,NULL,NULL,NULL,32,'',NULL,0,1,'2018-06-15 16:02:36',NULL,NULL,1,NULL),(60,1,157,NULL,NULL,'2018-06-08 15:00:00',1.00,NULL,NULL,NULL,2,'',NULL,0,1,'2018-06-15 16:51:32',NULL,NULL,3,NULL),(61,1,NULL,NULL,NULL,'2018-06-14 11:30:00',2.30,NULL,NULL,NULL,16,'',NULL,0,1,'2018-06-15 17:03:57',NULL,NULL,1,NULL),(62,1,186,NULL,103,'2018-06-20 09:00:26',3.45,NULL,NULL,NULL,32,'',NULL,0,1,'2018-06-20 15:10:35',NULL,NULL,1,NULL),(63,6,156,NULL,NULL,'2018-07-06 12:30:00',1.00,NULL,NULL,NULL,1,'omf',NULL,0,6,'2018-07-06 16:38:01',NULL,NULL,1,NULL),(64,1,NULL,NULL,NULL,'2018-07-06 14:30:00',1.00,NULL,NULL,NULL,16,'',NULL,0,1,'2018-07-06 17:22:57',NULL,NULL,1,NULL),(65,1,182,NULL,NULL,'2018-07-06 14:00:00',1.00,NULL,NULL,NULL,4,'',NULL,0,1,'2018-07-06 18:20:16',NULL,NULL,1,NULL),(164,1,NULL,NULL,NULL,'2018-11-13 08:45:00',4.45,4.45,NULL,NULL,7,'Waiting for work',NULL,0,1,'2018-12-14 10:01:40',NULL,NULL,2,NULL),(72,1,156,NULL,83,'2018-07-19 09:00:00',5.30,NULL,NULL,NULL,2,'',NULL,0,1,'2018-07-19 19:24:37',NULL,NULL,1,NULL),(75,1,NULL,NULL,NULL,'2018-07-05 10:30:00',2.00,NULL,NULL,NULL,34,'',NULL,0,1,'2018-07-26 14:40:42',NULL,NULL,1,NULL),(69,1,NULL,NULL,NULL,'2018-06-19 16:00:00',0.30,NULL,NULL,NULL,22,'null',NULL,0,1,'2018-07-18 00:12:34',NULL,NULL,1,NULL),(70,1,NULL,NULL,NULL,'2018-06-19 14:00:00',1.00,NULL,NULL,NULL,22,'null',NULL,0,1,'2018-07-18 00:13:37',NULL,NULL,1,NULL),(71,1,NULL,NULL,NULL,'2018-06-15 15:00:00',0.30,NULL,NULL,NULL,22,'null',NULL,0,1,'2018-07-18 00:21:45',NULL,NULL,1,NULL),(73,1,NULL,NULL,NULL,'2018-07-19 14:30:00',0.45,NULL,NULL,NULL,22,'',NULL,0,1,'2018-07-19 19:24:52',NULL,NULL,1,NULL),(74,1,NULL,NULL,NULL,'2018-07-19 15:15:00',2.45,NULL,NULL,NULL,36,'Waiting for details',NULL,0,1,'2018-07-19 19:30:19',NULL,NULL,1,NULL),(76,115,186,NULL,NULL,'2018-07-26 11:00:00',2.00,NULL,NULL,NULL,33,'',NULL,0,115,'2018-07-26 15:21:29',NULL,NULL,1,NULL),(77,115,156,NULL,NULL,'2018-07-26 13:00:00',1.00,NULL,NULL,NULL,24,'',NULL,0,115,'2018-07-26 15:22:17',NULL,NULL,1,NULL),(78,1,162,NULL,98,'2018-07-19 01:15:00',1.00,NULL,NULL,NULL,2,'fa',NULL,0,1,'2018-09-23 16:23:10',NULL,NULL,1,NULL),(79,1,162,NULL,98,'2018-09-29 01:15:00',1.00,NULL,NULL,NULL,18,'asdfsadf',NULL,0,1,'2018-09-23 16:26:43',NULL,NULL,1,NULL),(81,1,NULL,NULL,NULL,'2018-10-13 21:30:00',1.00,NULL,NULL,NULL,16,'test',NULL,0,1,'2018-10-08 12:40:19',NULL,NULL,1,NULL),(82,1,4,NULL,NULL,'2018-10-29 19:00:00',1.00,NULL,NULL,NULL,42,'',NULL,0,1,'2018-11-03 14:15:54',NULL,NULL,1,NULL),(83,1,4,NULL,NULL,'2018-10-30 19:45:00',1.00,NULL,NULL,NULL,42,'dsadsa',NULL,0,1,'2018-11-03 15:00:10',NULL,NULL,1,NULL),(84,1,NULL,NULL,NULL,'2018-10-30 20:45:00',1.00,NULL,NULL,NULL,44,'123',NULL,0,1,'2018-11-03 15:31:59',NULL,NULL,1,NULL),(85,1,NULL,NULL,NULL,'2018-10-30 21:45:00',1.00,NULL,NULL,NULL,44,'sdsadsad123',NULL,0,1,'2018-11-03 15:34:45',NULL,NULL,1,NULL),(86,1,4,NULL,78,'2018-10-31 20:30:00',1.00,NULL,NULL,NULL,42,'',NULL,0,1,'2018-11-03 15:36:50',NULL,NULL,1,NULL),(87,1,NULL,NULL,NULL,'2018-10-31 21:30:00',1.00,NULL,NULL,NULL,44,'123',NULL,0,1,'2018-11-03 15:50:19',NULL,NULL,1,NULL),(114,1,NULL,NULL,NULL,'2018-11-12 17:15:00',1.00,NULL,NULL,NULL,22,'',NULL,0,1,'2018-11-11 12:30:01',NULL,NULL,1,NULL),(102,1,NULL,NULL,NULL,'2018-11-05 07:00:00',4.00,NULL,NULL,NULL,31,'Organizing stuff',NULL,0,1,'2018-11-07 18:15:54',NULL,NULL,1,NULL),(90,19,NULL,NULL,NULL,'2018-11-05 14:00:00',1.00,NULL,NULL,NULL,16,'',NULL,0,19,'2018-11-04 15:11:53',NULL,NULL,1,NULL),(91,19,4,NULL,78,'2018-11-05 15:00:00',1.00,NULL,NULL,NULL,8,'',NULL,0,19,'2018-11-04 15:12:37',NULL,NULL,1,NULL),(93,1,156,4,78,'2018-11-06 22:15:00',1.00,NULL,NULL,NULL,23,'123',NULL,0,1,'2018-11-04 16:35:32',NULL,NULL,1,NULL),(94,1,NULL,NULL,NULL,'2018-11-06 23:15:00',1.00,NULL,NULL,NULL,0,NULL,NULL,0,1,'2018-11-04 16:40:16',NULL,NULL,1,NULL),(95,1,156,1,84,'2018-11-06 00:15:00',1.00,NULL,NULL,NULL,21,'',NULL,0,1,'2018-11-04 17:24:21',NULL,NULL,1,NULL),(104,19,156,NULL,NULL,'2018-11-05 07:00:00',1.00,NULL,NULL,NULL,33,'',NULL,0,19,'2018-11-08 08:11:12',NULL,NULL,1,NULL),(97,1,157,NULL,NULL,'2018-11-07 19:15:00',1.00,NULL,NULL,NULL,21,'test',NULL,0,1,'2018-11-05 14:24:57',NULL,NULL,1,NULL),(98,1,4,NULL,NULL,'2018-11-06 01:15:00',1.00,NULL,NULL,NULL,21,'',NULL,0,1,'2018-11-06 17:23:35',NULL,NULL,1,NULL),(99,1,156,NULL,NULL,'2018-11-07 00:00:00',1.00,NULL,NULL,NULL,21,'qweqwe',NULL,0,1,'2018-11-06 18:19:20',NULL,NULL,1,NULL),(100,1,NULL,NULL,NULL,'2018-11-07 21:45:00',1.00,NULL,NULL,NULL,22,'',NULL,0,1,'2018-11-07 15:53:32',NULL,NULL,1,NULL),(101,1,156,4,78,'2018-11-07 01:00:00',1.00,NULL,NULL,NULL,24,'123',NULL,0,1,'2018-11-07 17:21:34',NULL,NULL,1,NULL),(105,19,NULL,NULL,NULL,'2018-11-05 08:30:00',1.00,NULL,NULL,NULL,30,'',NULL,0,19,'2018-11-08 09:44:43',NULL,NULL,1,NULL),(110,19,156,NULL,NULL,'2018-11-05 09:30:00',1.00,NULL,NULL,NULL,2,'',NULL,0,19,'2018-11-09 08:34:55',NULL,NULL,1,NULL),(109,1,181,90,78,'2018-11-05 11:00:00',1.00,NULL,NULL,NULL,31,'',NULL,0,1,'2018-11-09 05:37:36',NULL,NULL,1,NULL),(111,19,NULL,NULL,NULL,'2018-11-05 09:30:00',1.00,NULL,NULL,NULL,22,'',NULL,0,19,'2018-11-09 08:36:03',NULL,NULL,1,NULL),(112,1,156,1,78,'2018-11-05 21:15:00',1.00,NULL,NULL,NULL,21,'aaaa',NULL,0,1,'2018-11-09 16:27:46',NULL,NULL,1,NULL),(113,1,163,1,106,'2018-11-05 12:00:00',1.00,NULL,NULL,NULL,33,'',NULL,0,1,'2018-11-10 03:35:40',NULL,NULL,1,NULL),(115,1,156,NULL,NULL,'2018-11-12 21:15:00',1.00,NULL,NULL,NULL,24,'',NULL,0,1,'2018-11-14 15:22:32',NULL,NULL,1,NULL),(139,19,156,NULL,NULL,'2018-11-13 18:00:00',3.30,NULL,NULL,NULL,10,'',NULL,0,19,'2018-11-15 21:06:10',NULL,NULL,1,NULL),(144,1,181,1,78,'2018-11-19 19:15:00',1.15,NULL,NULL,NULL,33,'',NULL,0,1,'2018-11-18 13:29:20',NULL,NULL,1,NULL),(145,1,156,4,78,'2018-11-22 03:00:00',1.00,NULL,NULL,NULL,24,'',NULL,0,1,'2018-11-20 17:16:57',NULL,NULL,3,NULL),(127,1,NULL,NULL,NULL,'2018-11-13 12:45:00',1.00,NULL,NULL,NULL,22,'',NULL,0,1,'2018-11-14 15:25:03',NULL,NULL,2,NULL),(128,1,156,4,78,'2018-11-13 09:45:00',10.30,3.15,4.00,3.15,33,'',NULL,0,1,'2018-11-14 15:26:14',NULL,NULL,2,NULL),(165,1,156,NULL,83,'2018-11-14 01:15:00',20.00,NULL,NULL,NULL,21,'dadasdsad',NULL,0,1,'2018-12-16 02:33:28',NULL,NULL,1,NULL),(130,1,156,NULL,NULL,'2018-11-14 00:15:00',1.00,NULL,NULL,NULL,24,'',NULL,0,1,'2018-11-14 15:29:18',NULL,NULL,1,NULL),(131,1,156,NULL,NULL,'2018-11-14 21:15:00',1.00,NULL,NULL,NULL,21,'',NULL,0,1,'2018-11-14 15:31:09',NULL,NULL,1,NULL),(132,1,156,NULL,NULL,'2018-11-14 22:15:00',1.00,NULL,NULL,NULL,21,'',NULL,0,1,'2018-11-14 15:32:05',NULL,NULL,1,NULL),(133,19,156,NULL,NULL,'2018-11-12 09:00:00',3.00,NULL,NULL,NULL,2,'',NULL,0,19,'2018-11-14 19:24:26',NULL,NULL,3,NULL),(134,19,156,4,78,'2018-11-12 11:15:00',2.45,NULL,NULL,NULL,8,'Editing work',NULL,0,19,'2018-11-14 19:25:51',NULL,NULL,3,NULL),(135,19,NULL,NULL,NULL,'2018-11-12 14:00:00',0.45,NULL,NULL,NULL,22,'',NULL,0,19,'2018-11-14 19:26:31',NULL,NULL,3,NULL),(137,19,NULL,NULL,NULL,'2018-11-12 15:00:00',2.00,NULL,NULL,NULL,23,'Was meeting to discuss new admin activities',NULL,0,19,'2018-11-14 19:27:54',NULL,NULL,3,NULL),(138,19,156,2,78,'2018-11-12 17:00:00',7.15,NULL,NULL,NULL,8,'',NULL,0,19,'2018-11-14 19:28:52',NULL,NULL,3,NULL),(147,67,156,NULL,NULL,'2018-11-26 09:30:00',3.00,NULL,NULL,NULL,17,'Worked on graphics design.',NULL,0,67,'2018-11-27 12:47:53',NULL,NULL,2,NULL),(148,67,NULL,NULL,NULL,'2018-11-26 12:30:00',4.00,NULL,NULL,NULL,23,'Admin stuff',NULL,0,67,'2018-11-27 12:48:34',NULL,NULL,2,NULL),(149,19,156,NULL,NULL,'2018-11-26 07:45:00',5.00,NULL,NULL,NULL,2,'',NULL,0,19,'2018-11-27 12:58:38',NULL,NULL,1,NULL),(150,19,156,4,78,'2018-11-26 12:45:00',5.00,NULL,NULL,NULL,8,'',NULL,0,19,'2018-11-27 12:59:11',NULL,NULL,1,NULL),(151,19,NULL,NULL,NULL,'2018-11-26 17:45:00',1.00,NULL,NULL,NULL,7,'Waiting for details',NULL,0,19,'2018-11-27 12:59:55',NULL,NULL,1,NULL),(152,19,228,NULL,NULL,'2018-11-27 08:00:00',4.30,NULL,NULL,NULL,2,'',NULL,0,19,'2018-11-29 10:12:01',NULL,NULL,2,NULL),(153,19,NULL,NULL,NULL,'2018-11-27 12:30:00',1.00,NULL,NULL,NULL,22,'',NULL,0,19,'2018-11-29 10:12:32',NULL,NULL,2,NULL),(154,19,228,NULL,NULL,'2018-11-27 13:30:00',6.00,NULL,NULL,NULL,2,'',NULL,0,19,'2018-11-29 10:13:09',NULL,NULL,2,NULL),(155,19,156,1,78,'2018-11-28 03:30:00',3.30,3.30,NULL,NULL,8,'',NULL,0,19,'2018-11-29 17:36:17',NULL,NULL,2,NULL),(156,19,182,91,125,'2018-11-28 07:00:00',1.00,NULL,NULL,NULL,33,'',NULL,0,19,'2018-11-29 17:38:09',NULL,NULL,2,NULL),(157,19,156,1,79,'2018-11-28 08:00:00',7.45,4.30,3.15,NULL,8,'',NULL,0,19,'2018-11-29 17:38:48',NULL,NULL,2,NULL),(158,19,NULL,NULL,NULL,'2018-11-28 15:45:00',1.00,NULL,0.45,0.15,22,'',NULL,0,19,'2018-11-29 17:40:11',NULL,NULL,2,NULL),(159,19,156,2,78,'2018-11-28 16:45:00',1.00,NULL,NULL,1.15,8,'',NULL,0,19,'2018-11-29 17:42:33',NULL,NULL,2,NULL),(160,19,156,2,78,'2018-11-29 00:30:00',12.45,8.00,4.00,0.45,9,'',NULL,0,19,'2018-11-29 18:49:05',NULL,NULL,2,NULL),(161,19,NULL,NULL,NULL,'2018-11-29 13:15:00',1.00,NULL,NULL,NULL,22,'',NULL,0,19,'2018-11-29 18:50:08',NULL,NULL,2,NULL),(162,1,181,2,78,'2018-12-11 22:45:00',1.00,1.00,NULL,NULL,21,'asdasdas',NULL,0,1,'2018-12-10 15:00:29',NULL,NULL,2,NULL),(163,1,156,1,78,'2018-12-12 07:45:00',11.15,8.00,3.15,NULL,24,'jjjjj',NULL,0,1,'2018-12-12 14:52:50',NULL,NULL,2,NULL),(177,1,NULL,NULL,NULL,'2019-01-08 08:00:00',9.15,NULL,NULL,NULL,7,'not having work !!',NULL,0,1,'2019-01-15 09:10:52',NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `redi_time_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_time_entry_bill_status`
--

DROP TABLE IF EXISTS `redi_time_entry_bill_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_time_entry_bill_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_time_entry_bill_status`
--

LOCK TABLES `redi_time_entry_bill_status` WRITE;
/*!40000 ALTER TABLE `redi_time_entry_bill_status` DISABLE KEYS */;
INSERT INTO `redi_time_entry_bill_status` VALUES (1,'Bill'),(2,'In Approval'),(3,'Approved'),(4,'Bill Sent');
/*!40000 ALTER TABLE `redi_time_entry_bill_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_time_entry_file`
--

DROP TABLE IF EXISTS `redi_time_entry_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_time_entry_file` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `time_entry_id` bigint(22) NOT NULL,
  `file_name` varchar(200) DEFAULT NULL,
  `description` text,
  `duration` decimal(19,2) DEFAULT '1.00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_time_entry_file`
--

LOCK TABLES `redi_time_entry_file` WRITE;
/*!40000 ALTER TABLE `redi_time_entry_file` DISABLE KEYS */;
INSERT INTO `redi_time_entry_file` VALUES (1,35,'test1.jpg','some description 100',199.20),(2,35,'test1.jpg',NULL,921.20),(3,35,'test1.jpg',NULL,1.00),(4,37,'test1.jpg','some description 100',199.20),(5,37,'test1.jpg',NULL,921.20),(6,37,'test1.jpg',NULL,1.00),(7,66,'test1.jpg','some description 100',199.20),(8,66,'test1.jpg',NULL,921.20),(9,66,'test1.jpg',NULL,1.00),(13,79,'test file.jpg','some desc for test 123',1.00),(14,84,'12','dfsgf',1.00),(16,85,'13asd','sfdsadsd',1.00),(17,87,'1232','13213',1.00),(18,147,'truce.png','truce png work',3.00),(19,172,'test.jpg',NULL,1.00),(20,173,'q',NULL,1.00);
/*!40000 ALTER TABLE `redi_time_entry_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_time_entry_status`
--

DROP TABLE IF EXISTS `redi_time_entry_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_time_entry_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_time_entry_status`
--

LOCK TABLES `redi_time_entry_status` WRITE;
/*!40000 ALTER TABLE `redi_time_entry_status` DISABLE KEYS */;
INSERT INTO `redi_time_entry_status` VALUES (1,'DRAFT'),(2,'UNDER REVIEW'),(3,'APPROVED');
/*!40000 ALTER TABLE `redi_time_entry_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_trt`
--

DROP TABLE IF EXISTS `redi_trt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_trt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `runtime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_trt`
--

LOCK TABLES `redi_trt` WRITE;
/*!40000 ALTER TABLE `redi_trt` DISABLE KEYS */;
INSERT INTO `redi_trt` VALUES (1,':06'),(2,':10'),(3,':15'),(4,':20'),(5,':30'),(6,':45'),(7,':60'),(8,':90'),(9,'2:00'),(10,'2:30'),(11,'Other');
/*!40000 ALTER TABLE `redi_trt` ENABLE KEYS */;
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
  `nick_name` varchar(50) DEFAULT NULL,
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
) ENGINE=MyISAM AUTO_INCREMENT=124 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user`
--

LOCK TABLES `redi_user` WRITE;
/*!40000 ALTER TABLE `redi_user` DISABLE KEYS */;
INSERT INTO `redi_user` VALUES (1,'demo','0d107d09f5bbe40cade3de5c71e9e9b7','demo@indydutch.com','Demo','User','Demo','DU','1.jpeg',100,NULL,NULL,NULL,10.00,NULL,NULL,8,'2019-01-21 18:41:57',NULL,1),(2,'AZEIGLER','0d107d09f5bbe40cade3de5c71e9e9b7','ashleyz@buddha-jones.com','ASHLEY','ZEIGLER','ASHLEY','AZ','2.jpeg',1,NULL,NULL,NULL,15.00,'H',0.00,0,'2018-11-14 19:25:58',NULL,1),(3,'KBOTHWELL','0d107d09f5bbe40cade3de5c71e9e9b7','katrinab@buddha-jones.com','KATRINA','BOTHWELL','KATRINA','KB','3.jpeg',1,NULL,NULL,NULL,10.00,'n',0.00,0,NULL,NULL,1),(4,'DFRASER','0d107d09f5bbe40cade3de5c71e9e9b7','davidf@buddha-jones.com','DAVID LEITH','FRASER','DAVID LEITH','DF',NULL,2,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(5,'MBACHMAN','0d107d09f5bbe40cade3de5c71e9e9b7','MOLLYB@BUDDHA-JONES.COM','MOLLY','BACHMAN','MOLLY','MB',NULL,3,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2019-01-21 16:58:46',NULL,1),(6,'JZAKOSKI','0d107d09f5bbe40cade3de5c71e9e9b7','JAMIEZ@BUDDHA-JONES.COM','JAMIE','ZAKOSKI','JAMIE','JZ',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-06 16:29:06',NULL,1),(7,'MALBORN','0d107d09f5bbe40cade3de5c71e9e9b7','MAXA@BUDDHA-JONES.COM','MAXWELL','ALBORN','MAXWELL','MA',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-16 16:13:54',NULL,1),(8,'JSMITH','0d107d09f5bbe40cade3de5c71e9e9b7','TALLYS@BUDDHA-JONES.COM','JUSTINE TALLY','SMITH','JUSTINE TALLY','JS',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(9,'JDAVIS','0d107d09f5bbe40cade3de5c71e9e9b7','JULIED@BUDDHA-JONES.COM','JULIE','DAVIS','JULIE','JD',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(10,'JFAGAN','0d107d09f5bbe40cade3de5c71e9e9b7','JOHNF@BUDDHA-JONES.COM','JOHN','FAGAN','JOHN','JF',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(11,'MBYRNES','0d107d09f5bbe40cade3de5c71e9e9b7','MARIEB@BUDDHA-JONES.COM','MARIE','BYRNES','MARIE','MB',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(12,'BHILL','0d107d09f5bbe40cade3de5c71e9e9b7','BLAKEH@BUDDHA-JONES.COM','BLAKE','HILL','BLAKE','BH',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(13,'SSISSON','0d107d09f5bbe40cade3de5c71e9e9b7','SOPHIAS@BUDDHA-JONES.COM','SOPHIA','SISSON','SOPHIA','SS',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(14,'BSANDEN','0d107d09f5bbe40cade3de5c71e9e9b7','BRITTONYAS@BUDDHA-JONES.COM','BRITTONYA','SANDEN','BRITTONYA','BS',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(15,'TFANG','0d107d09f5bbe40cade3de5c71e9e9b7','TONYF@BUDDHA-JONES.COM','TONY','FANG','TONY','TF',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-12-19 20:32:42',NULL,1),(16,'TJENG','0d107d09f5bbe40cade3de5c71e9e9b7','TRACYJ@BUDDHA-JONES.COM','TRACY','JENG','TRACY','TJ',NULL,5,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-11-17 15:20:04',NULL,1),(17,'GKUSUMA','0d107d09f5bbe40cade3de5c71e9e9b7','gregk@buddha-jones.com','GREGORIUS KENETH','KUSUMA','GREGORIUS KENETH','GK',NULL,5,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(18,'SROBERTSON','0d107d09f5bbe40cade3de5c71e9e9b7','STEVER@BUDDHA-JONES.COM','STEVEN','ROBERTSON','STEVEN','SR',NULL,27,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(19,'ACAPUTO','0d107d09f5bbe40cade3de5c71e9e9b7','ASHLEYC@BUDDHA-JONES.COM','ASHLEY','CAPUTO','ASHLEY','AC',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-11-29 17:35:06',NULL,1),(20,'ABENSON','0d107d09f5bbe40cade3de5c71e9e9b7','angeliqueb@buddha-jones.com','ANGELIQUE','BENSON','ANGELIQUE','AB',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(21,'JPRICE','0d107d09f5bbe40cade3de5c71e9e9b7','JENNIFERP@BUDDHA-JONES.COM','JENNIFER','PRICE','JENNIFER','JP',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(22,'AFARBER','0d107d09f5bbe40cade3de5c71e9e9b7','DREWF@BUDDHA-JONES.COM','ANDREW','FARBER','ANDREW','AF',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(23,'ABATES','0d107d09f5bbe40cade3de5c71e9e9b7','ALEXB@BUDDHA-JONES.COM','ALEXANDRA','BATES','ALEXANDRA','AB',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(24,'AGOULET','0d107d09f5bbe40cade3de5c71e9e9b7','ANDREWG@BUDDHA-JONES.COM','ANDREW','GOULET','ANDREW','AG',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-27 13:40:58',NULL,1),(25,'MSAMETH','0d107d09f5bbe40cade3de5c71e9e9b7','MACKS@BUDDHA-JONES.COM','MACKLIN','SAMETH','MACKLIN','MS',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-08-05 20:29:28',NULL,1),(26,'JONEIL','0d107d09f5bbe40cade3de5c71e9e9b7','JOHNNYO@BUDDHA-JONES.COM','JOHN','ONEIL','JOHN','JO',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-27 10:57:19',NULL,1),(27,'CPOWELL','0d107d09f5bbe40cade3de5c71e9e9b7','ericp@buddha-jones.com','CHRISTOPHER ERIC','POWELL','CHRISTOPHER ERIC','CP',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(28,'DOPPENHEIMER','0d107d09f5bbe40cade3de5c71e9e9b7','DORANO@BUDDHA-JONES.COM','DORAN','OPPENHEIMER','DORAN','DO',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(29,'SPINTO','0d107d09f5bbe40cade3de5c71e9e9b7','STEVEP@BUDDHA-JONES.COM','STEVEN','PINTO','STEVEN','SP',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(30,'BCOLEMAN','0d107d09f5bbe40cade3de5c71e9e9b7','BRYANC@BUDDHA-JONES.COM','BRYAN','COLEMAN','BRYAN','BC',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(31,'USCHLEGEL','0d107d09f5bbe40cade3de5c71e9e9b7','ROBS@BUDDHA-JONES.COM','ULRICH','SCHLEGEL','ULRICH','US',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(32,'MWINBUSH','0d107d09f5bbe40cade3de5c71e9e9b7','MEKOW@BUDDHA-JONES.COM','MEKO','WINBUSH','MEKO','MW',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(33,'TRINKENBERGER','0d107d09f5bbe40cade3de5c71e9e9b7','TROYR@BUDDHA-JONES.COM','TROY','RINKENBERGER','TROY','TR',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(34,'DTAYLOR','0d107d09f5bbe40cade3de5c71e9e9b7','LYNNT@BUDDHA-JONES.COM','DANIEL','TAYLOR','DANIEL','DT',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-06-04 01:25:48',NULL,1),(35,'MBRODNER','0d107d09f5bbe40cade3de5c71e9e9b7','MIKEB@BUDDHA-JONES.COM','MICHAEL','BRODNER','MICHAEL','MB',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2019-01-11 15:18:40',NULL,1),(36,'DCREAL','0d107d09f5bbe40cade3de5c71e9e9b7','DAVECREAL@BUDDHA-JONES.COM','DAVID','CREAL','DAVID','DC',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-26 14:33:36',NULL,1),(37,'KGRIGGS','0d107d09f5bbe40cade3de5c71e9e9b7','KELLIG@BUDDHA-JONES.COM','KELLI','GRIGGS','KELLI','KG',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(38,'WMASSUNG','0d107d09f5bbe40cade3de5c71e9e9b7','BILLYM@BUDDHA-JONES.COM','WILLIAM','MASSUNG','WILLIAM','WM',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(39,'CNORDIGIAN','0d107d09f5bbe40cade3de5c71e9e9b7','CAITLINN@BUDDHA-JONES.COM','CAITLIN','NORDIGIAN','CAITLIN','CN',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(40,'JDADON','0d107d09f5bbe40cade3de5c71e9e9b7','jessicad@buddha-jones.com','JESSICA','DADON','JESSICA','JD',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(41,'WNISBETT','0d107d09f5bbe40cade3de5c71e9e9b7','WESLEYN@BUDDHA-JONES.COM','WESLEY','NISBETT','WESLEY','WN',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(42,'MMERENDA','0d107d09f5bbe40cade3de5c71e9e9b7','matthewm@buddha-jones.com','MATTHEW','MERENDA','MATTHEW','MM',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(43,'KBROWN','0d107d09f5bbe40cade3de5c71e9e9b7','krisb@buddha-jones.com','KRISTOPHER ROBERT','BROWN','KRISTOPHER ROBERT','KB',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(44,'JMOSKOW','0d107d09f5bbe40cade3de5c71e9e9b7','jacobm@buddha-jones.com','JACOB LAWRENCE','MOSKOW','JACOB LAWRENCE','JM',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(45,'LGOODALE','0d107d09f5bbe40cade3de5c71e9e9b7','lyleg@buddha-jones.com','LYLE','GOODALE','LYLE','LG',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(46,'MFERMAN','0d107d09f5bbe40cade3de5c71e9e9b7','michaelf@buddha-jones.com','MICHAEL ALEXANDER','FERMAN','MICHAEL ALEXANDER','MF',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(47,'RTHOMAS','0d107d09f5bbe40cade3de5c71e9e9b7','RICT@BUDDHA-JONES.COM','RICHARD MICHAEL','THOMAS','RICHARD MICHAEL','RT',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(48,'WNEIL','0d107d09f5bbe40cade3de5c71e9e9b7','BILLN@BUDDHA-JONES.COM','WILLIAM','NEIL','WILLIAM','WN',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(49,'JDUPPER','0d107d09f5bbe40cade3de5c71e9e9b7','JORDAND@BUDDHA-JONES.COM','JORDAN','DUPPER','JORDAN','JD','49.jpeg',9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2019-01-14 10:47:46',NULL,1),(50,'KBARLOW','0d107d09f5bbe40cade3de5c71e9e9b7','KATIEB@BUDDHA-JONES.COM','KATHERINE','BARLOW','KATHERINE','KB',NULL,8,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(51,'SROCHA','0d107d09f5bbe40cade3de5c71e9e9b7','SERGIOR@BUDDHA-JONES.COM','SERGIO','ROCHA','SERGIO','SR',NULL,9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(52,'KNASH','0d107d09f5bbe40cade3de5c71e9e9b7','KEVINN@BUDDHA-JONES.COM','KEVIN','NASH','KEVIN','KN',NULL,9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(53,'BROTH','0d107d09f5bbe40cade3de5c71e9e9b7','BENR@BUDDHA-JONES.COM','BENJAMIN','ROTH','BENJAMIN','BR',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(54,'JDIAZ','0d107d09f5bbe40cade3de5c71e9e9b7','JOHND@BUDDHA-JONES.COM','JOHN','DIAZ','JOHN','JD',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(55,'CMYERS','0d107d09f5bbe40cade3de5c71e9e9b7','christopherm@buddha-jones.com','CHRISTOPHER KYLO','MYERS','CHRISTOPHER KYLO','CM',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(56,'KSTOKES','0d107d09f5bbe40cade3de5c71e9e9b7','kelseys@buddha-jones.com','KELSEY ELISE','STOKES','KELSEY ELISE','KS',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(57,'ABARRAZA','0d107d09f5bbe40cade3de5c71e9e9b7','ALFREDOB@BUDDHA-JONES.COM','ALFREDO','BARRAZA','ALFREDO','AB',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(58,'MNAZAR','0d107d09f5bbe40cade3de5c71e9e9b7','mohamedn@buddha-jones.com','MOHAMED RAED','NAZAR','MOHAMED RAED','MN',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(59,'SCARSON','0d107d09f5bbe40cade3de5c71e9e9b7','CARSON@BUDDHA-JONES.COM','SCOTT','CARSON','SCOTT','SC',NULL,11,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(60,'MYOON','0d107d09f5bbe40cade3de5c71e9e9b7','megany@buddha-jones.com','MEGAN LAUREN','YOON','MEGAN LAUREN','MY',NULL,13,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(61,'KABIGAIL','0d107d09f5bbe40cade3de5c71e9e9b7','KATELYNNA@BUDDHA-JONES.COM','KATHERINE','ABIGAIL','KATHERINE','KA',NULL,13,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(62,'MCOX','0d107d09f5bbe40cade3de5c71e9e9b7','maryc@buddha-jones.com','MARY ELIZABETH','COX','MARY ELIZABETH','MC',NULL,13,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(63,'BROY','0d107d09f5bbe40cade3de5c71e9e9b7','BETHR@BUDDHA-JONES.COM','BETH','ROY','BETH','BR',NULL,14,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(64,'BBERLING','0d107d09f5bbe40cade3de5c71e9e9b7','BRADB@BUDDHA-JONES.COM','BRADFORD','BERLING','BRADFORD','BB',NULL,14,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-26 14:47:20',NULL,1),(65,'HSHIBANO','0d107d09f5bbe40cade3de5c71e9e9b7','HARUMIS@BUDDHA-JONES.COM','HARUMI','SHIBANO','HARUMI','HS',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(66,'BSALZANO','0d107d09f5bbe40cade3de5c71e9e9b7','bobs@buddha-jones.com','BOBBY','SALZANO','BOBBY','BS',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(67,'KPANG','0d107d09f5bbe40cade3de5c71e9e9b7','KEITHP@BUDDHA-JONES.COM','KEITH','PANG','KEITH','KP',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2019-01-15 03:59:27',NULL,1),(68,'RCASTRO','0d107d09f5bbe40cade3de5c71e9e9b7','RICARDOC@BUDDHA-JONES.COM','RICARDO','CASTRO','RICARDO','RC',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(69,'HFORSSTROM','0d107d09f5bbe40cade3de5c71e9e9b7','HALF@BUDDHA-JONES.COM','HEINO','FORSSTROM','HEINO','HF',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(70,'JREYES','0d107d09f5bbe40cade3de5c71e9e9b7','JONATHANR@BUDDHA-JONES.COM','JONATHAN','REYES','JONATHAN','JR',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(71,'DMEALER','0d107d09f5bbe40cade3de5c71e9e9b7','DAVEM@BUDDHA-JONES.COM','DAVE','MEALER','DAVE','DM',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(72,'BVANCE','0d107d09f5bbe40cade3de5c71e9e9b7','BENV@BUDDHA-JONES.COM','BENJAMIN','VANCE','BENJAMIN','BV',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(73,'DCHENETTE','0d107d09f5bbe40cade3de5c71e9e9b7','DAWNC@BUDDHA-JONES.COM','DAWN','CHENETTE','DAWN','DC',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(74,'SWERBER','0d107d09f5bbe40cade3de5c71e9e9b7','sarahw@buddha-jones.com','SARAH SHAE HALAS','WERBER','SARAH SHAE HALAS','SW',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(75,'DTSAI','0d107d09f5bbe40cade3de5c71e9e9b7','davidtsai@buddha-jones.com','DAVID','TSAI','DAVID','DT',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(76,'RFLORES','0d107d09f5bbe40cade3de5c71e9e9b7','REBECCAF@BUDDHA-JONES.COM','REBECCA','FLORES','REBECCA','RF',NULL,15,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(77,'MPOCOCK','0d107d09f5bbe40cade3de5c71e9e9b7','mayap@buddha-jones.com','MAYA','POCOCK','MAYA','MP',NULL,15,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(78,'CPAYNE','0d107d09f5bbe40cade3de5c71e9e9b7','CRYSTALP@BUDDHA-JONES.COM','CRYSTAL','PAYNE','CRYSTAL','CP',NULL,16,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(79,'JWALKER','0d107d09f5bbe40cade3de5c71e9e9b7','JACOBW@BUDDHA-JONES.COM','JACOB','WALKER','JACOB','JW',NULL,16,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(80,'CCASE','0d107d09f5bbe40cade3de5c71e9e9b7','CHRISTIANC@BUDDHA-JONES.COM','CHRISTIAN','CASE','CHRISTIAN','CC',NULL,17,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(81,'DLINDBLAD','0d107d09f5bbe40cade3de5c71e9e9b7','DAVELINDBLAD@BUDDHA-JONES.COM','DAVID','LINDBLAD','DAVID','DL',NULL,18,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-11-14 19:26:07',NULL,1),(82,'GSMITH','0d107d09f5bbe40cade3de5c71e9e9b7','gregs@buddha-jones.com','GREGORY','SMITH','GREGORY','GS',NULL,18,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(83,'MBARBOUR','0d107d09f5bbe40cade3de5c71e9e9b7','MEGANB@BUDDHA-JONES.COM','MEGAN','BARBOUR','MEGAN','MB',NULL,18,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(84,'PHASTY','0d107d09f5bbe40cade3de5c71e9e9b7','PETEH@BUDDHA-JONES.COM','PETER','HASTY','PETER','PH',NULL,19,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(85,'JLONG','0d107d09f5bbe40cade3de5c71e9e9b7','john@buddha-jones.com','JOHN','LONG','JOHN','JL',NULL,20,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(86,'DASMA','0d107d09f5bbe40cade3de5c71e9e9b7','dan@buddha-jones.com','DANIEL','ASMA','DANIEL','DA',NULL,28,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(87,'JGODFREY','0d107d09f5bbe40cade3de5c71e9e9b7','jordang@buddha-jones.com','JORDAN MICHAEL','GODFREY','JORDAN MICHAEL','JG',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(88,'TSIMPSON','0d107d09f5bbe40cade3de5c71e9e9b7','tizs@buddha-jones.com','TIZIANA GRACE','SIMPSON','TIZIANA GRACE','TS',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(89,'KKATAMBWA','0d107d09f5bbe40cade3de5c71e9e9b7','KAZADIK@BUDDHA-JONES.COM','KAZADI','KATAMBWA','KAZADI','KK',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(90,'EFILLIOS','0d107d09f5bbe40cade3de5c71e9e9b7','EUGENEF@BUDDHA-JONES.COM','EUGENE','FILLIOS','EUGENE','EF',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(91,'RONDARZA','0d107d09f5bbe40cade3de5c71e9e9b7','ROBO@BUDDHA-JONES.COM','ROBERT','ONDARZA','ROBERT','RO',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(92,'AARMENISE','0d107d09f5bbe40cade3de5c71e9e9b7','ANTHONYA@BUDDHA-JONES.COM','ANTHONY','ARMENISE','ANTHONY','AA',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(93,'JROGERS','0d107d09f5bbe40cade3de5c71e9e9b7','JOSHUAR@BUDDHA-JONES.COM','JOSHUA','ROGERS','JOSHUA','JR',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-12-21 15:08:45',NULL,1),(94,'JFINCH','0d107d09f5bbe40cade3de5c71e9e9b7','JENNIF@BUDDHA-JONES.COM','JENNIFER','FINCH','JENNIFER','JF',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(95,'KOPPENHEIMER','0d107d09f5bbe40cade3de5c71e9e9b7','KRYSTLE@BUDDHA-JONES.COM','KRYSTLE','OPPENHEIMER','KRYSTLE','KO',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-23 12:35:25',NULL,1),(96,'DLIGORNER','0d107d09f5bbe40cade3de5c71e9e9b7','DAVEL@BUDDHA-JONES.COM','DAVID','LIGORNER','DAVID','DL',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(97,'MLAFONTANT','0d107d09f5bbe40cade3de5c71e9e9b7','MARK.LAFONTANT@BUDDHA-JONES.COM','MARK','LAFONTANT','MARK','ML',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(98,'MKELLEY','0d107d09f5bbe40cade3de5c71e9e9b7','MATTHEWK@BUDDHA-JONES.COM','MATTHEW','KELLEY','MATTHEW','MK',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(99,'SCASTLE','0d107d09f5bbe40cade3de5c71e9e9b7','shainac@buddha-jones.com','SHAINA PAGE','CASTLE','SHAINA PAGE','SC',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(100,'BCURTIS','0d107d09f5bbe40cade3de5c71e9e9b7','brettc@buddha-jones.com','BRETT ALEXANDER','CURTIS','BRETT ALEXANDER','BC',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(101,'EDELK','0d107d09f5bbe40cade3de5c71e9e9b7','emilyd@buddha-jones.com','EMILY COLETTE','DELK','EMILY COLETTE','ED',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(102,'ESINGLETON','0d107d09f5bbe40cade3de5c71e9e9b7','lizs@buddha-jones.com','ELIZABETH SHANNON','SINGLETON','ELIZABETH SHANNON','ES','102.jpeg',23,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(103,'ECORRADO','0d107d09f5bbe40cade3de5c71e9e9b7','EDC@BUDDHA-JONES.COM','EDUARDO','CORRADO','EDUARDO','EC',NULL,9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(104,'JRANDALL','0d107d09f5bbe40cade3de5c71e9e9b7','JOER@BUDDHA-JONES.COM','JOSEPH','RANDALL','JOSEPH','JR',NULL,23,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(105,'PHENNESSY','0d107d09f5bbe40cade3de5c71e9e9b7','paulh@buddha-jones.com','PAUL TIMOTHY','HENNESSY','PAUL TIMOTHY','PH',NULL,23,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(106,'MORTIZ','0d107d09f5bbe40cade3de5c71e9e9b7','MONIKAO@BUDDHA-JONES.COM','MONIKA','ORTIZ','MONIKA','MO',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2019-01-14 10:50:52',NULL,1),(107,'MCAUICH','0d107d09f5bbe40cade3de5c71e9e9b7','monicac@buddha-jones.com','MONICA MARIE','CAUICH','MONICA MARIE','MC',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(108,'CADALID','0d107d09f5bbe40cade3de5c71e9e9b7','CHRISTINEA@BUDDHA-JONES.COM','CHRISTINE','ADALID','CHRISTINE','CA',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(109,'LCERVANTES','0d107d09f5bbe40cade3de5c71e9e9b7','LAURAC@BUDDHA-JONES.COM','LAURA','CERVANTES','LAURA','LC',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-06 17:13:14',NULL,1),(110,'PLONG','0d107d09f5bbe40cade3de5c71e9e9b7','pharida@buddha-jones.com','PHARIDA','LONG','PHARIDA','PL',NULL,25,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(111,'MLIPSKY','0d107d09f5bbe40cade3de5c71e9e9b7','MARKL@BUDDHA-JONES.COM','MARK','LIPSKY','MARK','ML',NULL,25,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(112,'MMILLER','0d107d09f5bbe40cade3de5c71e9e9b7','MARINAM@BUDDHA-JONES.COM','MARINA','MILLER','MARINA','MM',NULL,100,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(113,'WHENES','0d107d09f5bbe40cade3de5c71e9e9b7','ALEXH@BUDDHA-JONES.COM','WILLIAM','HENES','WILLIAM','WH',NULL,26,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(114,'NSHEPTAK','0d107d09f5bbe40cade3de5c71e9e9b7','NICKS@BUDDHA-JONES.COM','NICHOLAS','SHEPTAK','NICHOLAS','NS',NULL,26,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(115,'VAMES','0d107d09f5bbe40cade3de5c71e9e9b7','VALERIEA@BUDDHA-JONES.COM','VALERIE','AMES','VALERIE','VA',NULL,26,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-26 15:09:10',NULL,1),(116,'WebHkp29384744','0d107d09f5bbe40cade3de5c71e9e9b7','webhkp1217333223@gmail.com','first','last','','dd','116.jpeg',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-11-11 13:31:44',1),(117,'WebHkp293847449','0d107d09f5bbe40cade3de5c71e9e9b7','webhkp12173332239@gmail.com','first','last','','dd','117.jpeg',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-11-11 13:34:12',1),(118,'WebHkp2938474492','0d107d09f5bbe40cade3de5c71e9e9b7','webhkp121733322392@gmail.com','first','last','','dd','118.jpeg',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-11-11 13:36:29',1),(119,'WebHkp29384744926','0d107d09f5bbe40cade3de5c71e9e9b7','webhkp1217333223927@gmail.com','first','last','','dd','119.jpeg',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-11-11 13:44:02',1),(120,'WebHkp293847449uu26112q2222','ebf435a9504e0a1f89f00da0e3093589','webhkp12173332239227122222jj@gmail.com','first','last','','dd','120.jpeg',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-11-11 17:11:03',1),(121,'WebHkp2938474ikk49uu26112q2222','6f82901f3d83470cea91af950dbf458f','webhkp1217333223922712992222jj@gmail.com','first','last','','dd','121.jpeg',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-11-11 17:12:34',1),(122,'WebHkp2938474ikk49uuw26112q2222','c8a4f6e69c77f09813439f48447964f5','webhkp12173332239227129922w22jj@gmail.com','first','last','','dd','122.jpeg',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-11-11 17:17:41',1),(123,'webhkp','0d107d09f5bbe40cade3de5c71e9e9b7','webhkp@protonmail.com','first','last','','dd','123.jpeg',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-11-11 18:21:12','2018-11-11 18:20:20',1);
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
-- Table structure for table `redi_user_clockin`
--

DROP TABLE IF EXISTS `redi_user_clockin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user_clockin` (
  `id` bigint(22) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `clockin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY ` clockin` (`clockin`)
) ENGINE=InnoDB AUTO_INCREMENT=382 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_clockin`
--

LOCK TABLES `redi_user_clockin` WRITE;
/*!40000 ALTER TABLE `redi_user_clockin` DISABLE KEYS */;
INSERT INTO `redi_user_clockin` VALUES (1,1,'2018-11-25 08:05:00'),(2,2,'2018-11-25 08:05:00'),(3,3,'2018-11-25 08:05:00'),(4,4,'2018-11-25 08:05:00'),(5,5,'2018-11-25 08:05:00'),(6,6,'2018-11-25 08:05:00'),(7,7,'2018-11-25 08:05:00'),(8,8,'2018-11-25 08:05:00'),(9,9,'2018-11-25 08:05:00'),(10,10,'2018-11-25 08:05:00'),(11,11,'2018-11-25 08:05:00'),(12,12,'2018-11-25 08:05:00'),(13,13,'2018-11-25 08:05:00'),(14,14,'2018-11-25 08:05:00'),(15,15,'2018-11-25 08:05:00'),(16,16,'2018-11-25 08:05:00'),(17,17,'2018-11-25 08:05:00'),(18,18,'2018-11-25 08:05:00'),(19,19,'2018-11-25 08:05:00'),(20,20,'2018-11-25 08:05:00'),(21,21,'2018-11-25 08:05:00'),(22,22,'2018-11-25 08:05:00'),(23,23,'2018-11-25 08:05:00'),(24,24,'2018-11-25 08:05:00'),(25,25,'2018-11-25 08:05:00'),(26,26,'2018-11-25 08:05:00'),(27,27,'2018-11-25 08:05:00'),(28,28,'2018-11-25 08:05:00'),(29,29,'2018-11-25 08:05:00'),(30,30,'2018-11-25 08:05:00'),(31,31,'2018-11-25 08:05:00'),(32,32,'2018-11-25 08:05:00'),(33,33,'2018-11-25 08:05:00'),(34,34,'2018-11-25 08:05:00'),(35,35,'2018-11-25 08:05:00'),(36,36,'2018-11-25 08:05:00'),(37,37,'2018-11-25 08:05:00'),(38,38,'2018-11-25 08:05:00'),(39,39,'2018-11-25 08:05:00'),(40,40,'2018-11-25 08:05:00'),(41,41,'2018-11-25 08:05:00'),(42,42,'2018-11-25 08:05:00'),(43,43,'2018-11-25 08:05:00'),(44,44,'2018-11-25 08:05:00'),(45,45,'2018-11-25 08:05:00'),(46,46,'2018-11-25 08:05:00'),(47,47,'2018-11-25 08:05:00'),(48,48,'2018-11-25 08:05:00'),(49,49,'2018-11-25 08:05:00'),(50,50,'2018-11-25 08:05:00'),(51,51,'2018-11-25 08:05:00'),(52,52,'2018-11-25 08:05:00'),(53,53,'2018-11-25 08:05:00'),(54,54,'2018-11-25 08:05:00'),(55,55,'2018-11-25 08:05:00'),(56,56,'2018-11-25 08:05:00'),(57,57,'2018-11-25 08:05:00'),(58,58,'2018-11-25 08:05:00'),(59,59,'2018-11-25 08:05:00'),(60,60,'2018-11-25 08:05:00'),(61,61,'2018-11-25 08:05:00'),(62,62,'2018-11-25 08:05:00'),(63,63,'2018-11-25 08:05:00'),(64,64,'2018-11-25 08:05:00'),(65,65,'2018-11-25 08:05:00'),(66,66,'2018-11-25 08:05:00'),(67,67,'2018-11-25 08:05:00'),(68,68,'2018-11-25 08:05:00'),(69,69,'2018-11-25 08:05:00'),(70,70,'2018-11-25 08:05:00'),(71,71,'2018-11-25 08:05:00'),(72,72,'2018-11-25 08:05:00'),(73,73,'2018-11-25 08:05:00'),(74,74,'2018-11-25 08:05:00'),(75,75,'2018-11-25 08:05:00'),(76,76,'2018-11-25 08:05:00'),(77,77,'2018-11-25 08:05:00'),(78,78,'2018-11-25 08:05:00'),(79,79,'2018-11-25 08:05:00'),(80,80,'2018-11-25 08:05:00'),(81,81,'2018-11-25 08:05:00'),(82,82,'2018-11-25 08:05:00'),(83,83,'2018-11-25 08:05:00'),(84,84,'2018-11-25 08:05:00'),(85,85,'2018-11-25 08:05:00'),(86,86,'2018-11-25 08:05:00'),(87,87,'2018-11-25 08:05:00'),(88,88,'2018-11-25 08:05:00'),(89,89,'2018-11-25 08:05:00'),(90,90,'2018-11-25 08:05:00'),(91,91,'2018-11-25 08:05:00'),(92,92,'2018-11-25 08:05:00'),(93,93,'2018-11-25 08:05:00'),(94,94,'2018-11-25 08:05:00'),(95,95,'2018-11-25 08:05:00'),(96,96,'2018-11-25 08:05:00'),(97,97,'2018-11-25 08:05:00'),(98,98,'2018-11-25 08:05:00'),(99,99,'2018-11-25 08:05:00'),(100,100,'2018-11-25 08:05:00'),(101,101,'2018-11-25 08:05:00'),(102,102,'2018-11-25 08:05:00'),(103,103,'2018-11-25 08:05:00'),(104,104,'2018-11-25 08:05:00'),(105,105,'2018-11-25 08:05:00'),(106,106,'2018-11-25 08:05:00'),(107,107,'2018-11-25 08:05:00'),(108,108,'2018-11-25 08:05:00'),(109,109,'2018-11-25 08:05:00'),(110,110,'2018-11-25 08:05:00'),(111,111,'2018-11-25 08:05:00'),(112,112,'2018-11-25 08:05:00'),(113,113,'2018-11-25 08:05:00'),(114,114,'2018-11-25 08:05:00'),(115,115,'2018-11-25 08:05:00'),(116,116,'2018-11-25 08:05:00'),(117,117,'2018-11-25 08:05:00'),(118,118,'2018-11-25 08:05:00'),(119,119,'2018-11-25 08:05:00'),(120,120,'2018-11-25 08:05:00'),(121,121,'2018-11-25 08:05:00'),(122,122,'2018-11-25 08:05:00'),(123,123,'2018-11-25 08:05:00'),(128,1,'2018-11-25 08:05:00'),(129,2,'2018-11-25 08:05:00'),(130,3,'2018-11-25 08:05:00'),(131,4,'2018-11-25 08:05:00'),(132,5,'2018-11-25 08:05:00'),(133,6,'2018-11-25 08:05:00'),(134,7,'2018-11-25 08:05:00'),(135,8,'2018-11-25 08:05:00'),(136,9,'2018-11-25 08:05:00'),(137,10,'2018-11-25 08:05:00'),(138,11,'2018-11-25 08:05:00'),(139,12,'2018-11-25 08:05:00'),(140,13,'2018-11-25 08:05:00'),(141,14,'2018-11-25 08:05:00'),(142,15,'2018-11-25 08:05:00'),(143,16,'2018-11-25 08:05:00'),(144,17,'2018-11-25 08:05:00'),(145,18,'2018-11-25 08:05:00'),(146,19,'2018-11-25 08:05:00'),(147,20,'2018-11-25 08:05:00'),(148,21,'2018-11-25 08:05:00'),(149,22,'2018-11-25 08:05:00'),(150,23,'2018-11-25 08:05:00'),(151,24,'2018-11-25 08:05:00'),(152,25,'2018-11-25 08:05:00'),(153,26,'2018-11-25 08:05:00'),(154,27,'2018-11-25 08:05:00'),(155,28,'2018-11-25 08:05:00'),(156,29,'2018-11-25 08:05:00'),(157,30,'2018-11-25 08:05:00'),(158,31,'2018-11-25 08:05:00'),(159,32,'2018-11-25 08:05:00'),(160,33,'2018-11-25 08:05:00'),(161,34,'2018-11-25 08:05:00'),(162,35,'2018-11-25 08:05:00'),(163,36,'2018-11-25 08:05:00'),(164,37,'2018-11-25 08:05:00'),(165,38,'2018-11-25 08:05:00'),(166,39,'2018-11-25 08:05:00'),(167,40,'2018-11-25 08:05:00'),(168,41,'2018-11-25 08:05:00'),(169,42,'2018-11-25 08:05:00'),(170,43,'2018-11-25 08:05:00'),(171,44,'2018-11-25 08:05:00'),(172,45,'2018-11-25 08:05:00'),(173,46,'2018-11-25 08:05:00'),(174,47,'2018-11-25 08:05:00'),(175,48,'2018-11-25 08:05:00'),(176,49,'2018-11-25 08:05:00'),(177,50,'2018-11-25 08:05:00'),(178,51,'2018-11-25 08:05:00'),(179,52,'2018-11-25 08:05:00'),(180,53,'2018-11-25 08:05:00'),(181,54,'2018-11-25 08:05:00'),(182,55,'2018-11-25 08:05:00'),(183,56,'2018-11-25 08:05:00'),(184,57,'2018-11-25 08:05:00'),(185,58,'2018-11-25 08:05:00'),(186,59,'2018-11-25 08:05:00'),(187,60,'2018-11-25 08:05:00'),(188,61,'2018-11-25 08:05:00'),(189,62,'2018-11-25 08:05:00'),(190,63,'2018-11-25 08:05:00'),(191,64,'2018-11-25 08:05:00'),(192,65,'2018-11-25 08:05:00'),(193,66,'2018-11-25 08:05:00'),(194,67,'2018-11-25 08:05:00'),(195,68,'2018-11-25 08:05:00'),(196,69,'2018-11-25 08:05:00'),(197,70,'2018-11-25 08:05:00'),(198,71,'2018-11-25 08:05:00'),(199,72,'2018-11-25 08:05:00'),(200,73,'2018-11-25 08:05:00'),(201,74,'2018-11-25 08:05:00'),(202,75,'2018-11-25 08:05:00'),(203,76,'2018-11-25 08:05:00'),(204,77,'2018-11-25 08:05:00'),(205,78,'2018-11-25 08:05:00'),(206,79,'2018-11-25 08:05:00'),(207,80,'2018-11-25 08:05:00'),(208,81,'2018-11-25 08:05:00'),(209,82,'2018-11-25 08:05:00'),(210,83,'2018-11-25 08:05:00'),(211,84,'2018-11-25 08:05:00'),(212,85,'2018-11-25 08:05:00'),(213,86,'2018-11-25 08:05:00'),(214,87,'2018-11-25 08:05:00'),(215,88,'2018-11-25 08:05:00'),(216,89,'2018-11-25 08:05:00'),(217,90,'2018-11-25 08:05:00'),(218,91,'2018-11-25 08:05:00'),(219,92,'2018-11-25 08:05:00'),(220,93,'2018-11-25 08:05:00'),(221,94,'2018-11-25 08:05:00'),(222,95,'2018-11-25 08:05:00'),(223,96,'2018-11-25 08:05:00'),(224,97,'2018-11-25 08:05:00'),(225,98,'2018-11-25 08:05:00'),(226,99,'2018-11-25 08:05:00'),(227,100,'2018-11-25 08:05:00'),(228,101,'2018-11-25 08:05:00'),(229,102,'2018-11-25 08:05:00'),(230,103,'2018-11-25 08:05:00'),(231,104,'2018-11-25 08:05:00'),(232,105,'2018-11-25 08:05:00'),(233,106,'2018-11-25 08:05:00'),(234,107,'2018-11-25 08:05:00'),(235,108,'2018-11-25 08:05:00'),(236,109,'2018-11-25 08:05:00'),(237,110,'2018-11-25 08:05:00'),(238,111,'2018-11-25 08:05:00'),(239,112,'2018-11-25 08:05:00'),(240,113,'2018-11-25 08:05:00'),(241,114,'2018-11-25 08:05:00'),(242,115,'2018-11-25 08:05:00'),(243,116,'2018-11-25 08:05:00'),(244,117,'2018-11-25 08:05:00'),(245,118,'2018-11-25 08:05:00'),(246,119,'2018-11-25 08:05:00'),(247,120,'2018-11-25 08:05:00'),(248,121,'2018-11-25 08:05:00'),(249,122,'2018-11-25 08:05:00'),(250,123,'2018-11-25 08:05:00'),(255,1,'2018-11-26 08:05:00'),(256,2,'2018-11-26 08:05:00'),(257,3,'2018-11-26 08:05:00'),(258,4,'2018-11-26 08:05:00'),(259,5,'2018-11-26 08:05:00'),(260,6,'2018-11-26 08:05:00'),(261,7,'2018-11-26 08:05:00'),(262,8,'2018-11-26 08:05:00'),(263,9,'2018-11-26 08:05:00'),(264,10,'2018-11-26 08:05:00'),(265,11,'2018-11-26 08:05:00'),(266,12,'2018-11-26 08:05:00'),(267,13,'2018-11-26 08:05:00'),(268,14,'2018-11-26 08:05:00'),(269,15,'2018-11-26 08:05:00'),(270,16,'2018-11-26 08:05:00'),(271,17,'2018-11-26 08:05:00'),(272,18,'2018-11-26 08:05:00'),(273,19,'2018-11-26 08:05:00'),(274,20,'2018-11-26 08:05:00'),(275,21,'2018-11-26 08:05:00'),(276,22,'2018-11-26 08:05:00'),(277,23,'2018-11-26 08:05:00'),(278,24,'2018-11-26 08:05:00'),(279,25,'2018-11-26 08:05:00'),(280,26,'2018-11-26 08:05:00'),(281,27,'2018-11-26 08:05:00'),(282,28,'2018-11-26 08:05:00'),(283,29,'2018-11-26 08:05:00'),(284,30,'2018-11-26 08:05:00'),(285,31,'2018-11-26 08:05:00'),(286,32,'2018-11-26 08:05:00'),(287,33,'2018-11-26 08:05:00'),(288,34,'2018-11-26 08:05:00'),(289,35,'2018-11-26 08:05:00'),(290,36,'2018-11-26 08:05:00'),(291,37,'2018-11-26 08:05:00'),(292,38,'2018-11-26 08:05:00'),(293,39,'2018-11-26 08:05:00'),(294,40,'2018-11-26 08:05:00'),(295,41,'2018-11-26 08:05:00'),(296,42,'2018-11-26 08:05:00'),(297,43,'2018-11-26 08:05:00'),(298,44,'2018-11-26 08:05:00'),(299,45,'2018-11-26 08:05:00'),(300,46,'2018-11-26 08:05:00'),(301,47,'2018-11-26 08:05:00'),(302,48,'2018-11-26 08:05:00'),(303,49,'2018-11-26 08:05:00'),(304,50,'2018-11-26 08:05:00'),(305,51,'2018-11-26 08:05:00'),(306,52,'2018-11-26 08:05:00'),(307,53,'2018-11-26 08:05:00'),(308,54,'2018-11-26 08:05:00'),(309,55,'2018-11-26 08:05:00'),(310,56,'2018-11-26 08:05:00'),(311,57,'2018-11-26 08:05:00'),(312,58,'2018-11-26 08:05:00'),(313,59,'2018-11-26 08:05:00'),(314,60,'2018-11-26 08:05:00'),(315,61,'2018-11-26 08:05:00'),(316,62,'2018-11-26 08:05:00'),(317,63,'2018-11-26 08:05:00'),(318,64,'2018-11-26 08:05:00'),(319,65,'2018-11-26 08:05:00'),(320,66,'2018-11-26 08:05:00'),(321,67,'2018-11-26 08:05:00'),(322,68,'2018-11-26 08:05:00'),(323,69,'2018-11-26 08:05:00'),(324,70,'2018-11-26 08:05:00'),(325,71,'2018-11-26 08:05:00'),(326,72,'2018-11-26 08:05:00'),(327,73,'2018-11-26 08:05:00'),(328,74,'2018-11-26 08:05:00'),(329,75,'2018-11-26 08:05:00'),(330,76,'2018-11-26 08:05:00'),(331,77,'2018-11-26 08:05:00'),(332,78,'2018-11-26 08:05:00'),(333,79,'2018-11-26 08:05:00'),(334,80,'2018-11-26 08:05:00'),(335,81,'2018-11-26 08:05:00'),(336,82,'2018-11-26 08:05:00'),(337,83,'2018-11-26 08:05:00'),(338,84,'2018-11-26 08:05:00'),(339,85,'2018-11-26 08:05:00'),(340,86,'2018-11-26 08:05:00'),(341,87,'2018-11-26 08:05:00'),(342,88,'2018-11-26 08:05:00'),(343,89,'2018-11-26 08:05:00'),(344,90,'2018-11-26 08:05:00'),(345,91,'2018-11-26 08:05:00'),(346,92,'2018-11-26 08:05:00'),(347,93,'2018-11-26 08:05:00'),(348,94,'2018-11-26 08:05:00'),(349,95,'2018-11-26 08:05:00'),(350,96,'2018-11-26 08:05:00'),(351,97,'2018-11-26 08:05:00'),(352,98,'2018-11-26 08:05:00'),(353,99,'2018-11-26 08:05:00'),(354,100,'2018-11-26 08:05:00'),(355,101,'2018-11-26 08:05:00'),(356,102,'2018-11-26 08:05:00'),(357,103,'2018-11-26 08:05:00'),(358,104,'2018-11-26 08:05:00'),(359,105,'2018-11-26 08:05:00'),(360,106,'2018-11-26 08:05:00'),(361,107,'2018-11-26 08:05:00'),(362,108,'2018-11-26 08:05:00'),(363,109,'2018-11-26 08:05:00'),(364,110,'2018-11-26 08:05:00'),(365,111,'2018-11-26 08:05:00'),(366,112,'2018-11-26 08:05:00'),(367,113,'2018-11-26 08:05:00'),(368,114,'2018-11-26 08:05:00'),(369,115,'2018-11-26 08:05:00'),(370,116,'2018-11-26 08:05:00'),(371,117,'2018-11-26 08:05:00'),(372,118,'2018-11-26 08:05:00'),(373,119,'2018-11-26 08:05:00'),(374,120,'2018-11-26 08:05:00'),(375,121,'2018-11-26 08:05:00'),(376,122,'2018-11-26 08:05:00'),(377,123,'2018-11-26 08:05:00');
/*!40000 ALTER TABLE `redi_user_clockin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_user_resource`
--

DROP TABLE IF EXISTS `redi_user_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `controller` varchar(45) DEFAULT NULL,
  `method` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_resource`
--

LOCK TABLES `redi_user_resource` WRITE;
/*!40000 ALTER TABLE `redi_user_resource` DISABLE KEYS */;
/*!40000 ALTER TABLE `redi_user_resource` ENABLE KEYS */;
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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_role`
--

LOCK TABLES `redi_user_role` WRITE;
/*!40000 ALTER TABLE `redi_user_role` DISABLE KEYS */;
INSERT INTO `redi_user_role` VALUES (1,'Lead Producer'),(2,'Producer'),(3,'Associate Producer'),(4,'Creative Manager'),(5,'Creative Coordinator'),(6,'Graphics Art Director'),(7,'Graphics Coordinator'),(8,'Editorial Manager');
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
) ENGINE=MyISAM AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_type`
--

LOCK TABLES `redi_user_type` WRITE;
/*!40000 ALTER TABLE `redi_user_type` DISABLE KEYS */;
INSERT INTO `redi_user_type` VALUES (1,'Admin'),(2,'Admin Manager'),(3,'AE/Finishing Manager'),(4,'Assistant Editor'),(5,'Billing Coordinator'),(6,'Creative Manager/Coordinator'),(7,'Editor'),(8,'Editorial Manager'),(9,'Finishing'),(10,'Games Capture Artist'),(11,'Games Manager'),(12,'Graphic Designer'),(13,'Graphic Coordinator'),(14,'Graphic Dept Head'),(15,'HR'),(16,'IT'),(17,'IT Manager'),(18,'Music'),(19,'Music Manager'),(20,'Owner'),(21,'Producer'),(22,'Production Assistant'),(23,'Production Coordinator'),(24,'Senior Billing'),(25,'Senior Management'),(26,'Writer'),(27,'Creative Director (Steve)'),(100,'Super Administrator'),(28,'Co-owner');
/*!40000 ALTER TABLE `redi_user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_user_type_class`
--

DROP TABLE IF EXISTS `redi_user_type_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user_type_class` (
  `type_id` int(11) NOT NULL,
  `class` char(1) NOT NULL,
  PRIMARY KEY (`type_id`,`class`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_type_class`
--

LOCK TABLES `redi_user_type_class` WRITE;
/*!40000 ALTER TABLE `redi_user_type_class` DISABLE KEYS */;
INSERT INTO `redi_user_type_class` VALUES (4,'C'),(4,'E'),(6,'B'),(6,'C'),(7,'C'),(7,'E'),(8,'E'),(12,'C'),(12,'G'),(13,'C'),(13,'G'),(14,'C'),(14,'G'),(20,'C'),(21,'B'),(21,'C'),(21,'E'),(28,'B');
/*!40000 ALTER TABLE `redi_user_type_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_user_type_class_name`
--

DROP TABLE IF EXISTS `redi_user_type_class_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user_type_class_name` (
  `class` char(1) NOT NULL,
  `class_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`class`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_type_class_name`
--

LOCK TABLES `redi_user_type_class_name` WRITE;
/*!40000 ALTER TABLE `redi_user_type_class_name` DISABLE KEYS */;
INSERT INTO `redi_user_type_class_name` VALUES ('B','Billing'),('C','Creative'),('E','Editor'),('G','Graphics');
/*!40000 ALTER TABLE `redi_user_type_class_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_user_type_project_permission`
--

DROP TABLE IF EXISTS `redi_user_type_project_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user_type_project_permission` (
  `user_type_id` int(11) NOT NULL,
  `project_permission_id` int(11) NOT NULL,
  `can_view` tinyint(1) DEFAULT '0',
  `can_edit` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_type_id`,`project_permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_type_project_permission`
--

LOCK TABLES `redi_user_type_project_permission` WRITE;
/*!40000 ALTER TABLE `redi_user_type_project_permission` DISABLE KEYS */;
INSERT INTO `redi_user_type_project_permission` VALUES (1,1,1,1),(1,2,1,1),(1,3,1,1),(1,4,1,1),(1,5,1,1),(1,6,1,1),(1,7,1,1),(1,8,1,1),(1,9,1,1),(1,10,1,1),(1,11,1,1),(1,12,1,1),(1,13,1,1),(1,14,1,1),(1,15,1,1),(1,17,1,1),(1,18,1,1),(1,19,1,1),(1,20,1,1),(1,21,1,1),(1,22,1,1),(1,23,1,1),(1,24,1,1),(1,25,1,1),(1,26,1,1),(1,27,1,1),(1,28,1,1),(1,29,1,1),(1,30,1,1),(1,31,1,1),(1,32,1,1),(1,33,1,1),(1,34,1,0),(1,100,1,1),(1,200,1,1),(2,1,1,0),(2,2,1,0),(2,3,1,0),(2,4,1,0),(2,5,1,0),(2,6,1,0),(2,7,1,0),(2,8,1,0),(2,9,1,0),(2,10,1,0),(2,11,1,0),(2,12,1,0),(2,13,1,0),(2,14,1,0),(2,15,1,0),(2,17,1,0),(2,18,1,0),(2,19,1,0),(2,20,1,0),(2,21,1,0),(2,22,1,0),(2,23,1,0),(2,24,1,0),(2,25,1,0),(2,26,1,0),(2,27,1,0),(2,28,1,0),(2,29,1,1),(2,30,1,1),(2,31,1,0),(2,34,1,0),(2,100,1,0),(2,200,1,1),(3,1,1,0),(3,2,1,0),(3,3,1,0),(3,4,0,0),(3,5,1,0),(3,6,1,0),(3,7,0,0),(3,8,0,0),(3,9,0,0),(3,10,1,0),(3,11,0,0),(3,12,1,1),(3,13,1,0),(3,14,0,0),(3,15,0,0),(3,17,1,0),(3,18,0,0),(3,19,0,0),(3,20,0,0),(3,21,0,0),(3,22,1,0),(3,23,0,0),(3,24,0,0),(3,25,0,0),(3,26,1,0),(3,27,0,0),(3,28,0,0),(3,29,1,1),(3,30,1,1),(3,31,0,0),(3,32,0,0),(3,33,0,0),(3,34,1,1),(3,35,1,1),(3,100,0,0),(3,200,1,1),(4,1,1,0),(4,2,1,0),(4,3,1,0),(4,5,1,0),(4,6,1,0),(4,10,1,0),(4,11,0,0),(4,12,0,0),(4,13,1,0),(4,14,0,0),(4,15,0,0),(4,17,1,0),(4,18,0,0),(4,19,0,0),(4,20,0,0),(4,21,0,0),(4,22,1,0),(4,23,0,0),(4,24,0,0),(4,25,0,0),(4,26,1,0),(4,29,1,1),(4,30,1,1),(4,34,1,1),(4,35,1,1),(4,200,1,1),(5,1,1,1),(5,2,1,1),(5,3,1,1),(5,4,0,0),(5,5,1,1),(5,6,1,1),(5,7,0,0),(5,8,0,0),(5,9,0,0),(5,10,1,1),(5,11,1,1),(5,12,1,0),(5,13,1,1),(5,14,1,0),(5,15,1,0),(5,17,1,1),(5,18,1,1),(5,19,1,1),(5,20,1,1),(5,21,1,1),(5,22,1,1),(5,23,1,1),(5,24,1,1),(5,25,1,1),(5,26,1,1),(5,27,0,0),(5,28,0,0),(5,29,1,1),(5,30,1,1),(5,31,0,0),(5,32,0,0),(5,33,1,1),(5,34,1,0),(5,100,0,0),(5,200,1,1),(6,1,1,1),(6,2,1,1),(6,3,1,1),(6,5,1,1),(6,6,1,1),(6,10,1,1),(6,11,1,1),(6,12,1,1),(6,13,1,0),(6,14,1,1),(6,15,1,1),(6,17,1,1),(6,18,1,1),(6,19,1,1),(6,20,1,0),(6,21,1,0),(6,22,1,1),(6,23,1,1),(6,24,1,1),(6,25,1,1),(6,26,1,1),(6,29,1,1),(6,30,1,1),(6,34,1,0),(7,1,1,0),(7,2,1,0),(7,3,1,0),(7,5,1,0),(7,6,1,0),(7,10,1,0),(7,11,0,0),(7,12,0,0),(7,13,1,0),(7,14,0,0),(7,15,0,0),(7,17,1,0),(7,18,0,0),(7,19,0,0),(7,20,0,0),(7,21,0,0),(7,22,1,0),(7,23,0,0),(7,24,0,0),(7,25,0,0),(7,26,1,0),(7,29,1,1),(7,30,1,1),(7,34,1,0),(8,1,1,1),(8,2,1,1),(8,3,1,1),(8,5,1,1),(8,6,1,1),(8,10,1,1),(8,11,0,0),(8,12,1,1),(8,13,1,1),(8,14,1,0),(8,15,1,1),(8,17,1,1),(8,18,0,0),(8,19,0,0),(8,20,0,0),(8,21,0,0),(8,22,1,1),(8,23,0,0),(8,24,1,1),(8,25,1,1),(8,26,1,1),(8,29,1,1),(8,30,1,1),(8,34,1,0),(9,1,1,0),(9,2,1,0),(9,3,1,0),(9,4,0,0),(9,5,1,0),(9,6,1,0),(9,7,0,0),(9,8,0,0),(9,9,0,0),(9,10,1,0),(9,11,1,0),(9,12,1,1),(9,13,1,0),(9,14,0,0),(9,15,0,0),(9,17,1,0),(9,18,0,0),(9,19,0,0),(9,20,0,0),(9,21,0,0),(9,22,1,0),(9,23,0,0),(9,24,0,0),(9,25,0,0),(9,26,1,0),(9,27,0,0),(9,28,0,0),(9,29,1,1),(9,30,1,1),(9,31,0,0),(9,32,0,0),(9,33,0,0),(9,34,1,1),(9,35,1,1),(9,100,0,0),(9,200,1,1),(10,1,1,0),(10,2,1,0),(10,3,1,0),(10,5,1,0),(10,6,1,0),(10,10,1,0),(10,11,0,0),(10,12,0,0),(10,13,1,0),(10,14,0,0),(10,15,0,0),(10,17,1,0),(10,18,0,0),(10,19,0,0),(10,20,0,0),(10,21,0,0),(10,22,1,0),(10,23,0,0),(10,24,0,0),(10,25,0,0),(10,26,1,0),(10,29,1,1),(10,30,1,1),(10,34,1,1),(11,1,1,1),(11,2,1,1),(11,3,1,1),(11,5,1,1),(11,6,1,1),(11,10,1,1),(11,11,1,1),(11,12,0,0),(11,13,1,0),(11,14,0,0),(11,15,0,0),(11,17,1,1),(11,18,1,1),(11,19,1,1),(11,20,0,0),(11,21,0,0),(11,22,1,1),(11,23,1,1),(11,24,0,0),(11,25,0,0),(11,26,1,1),(11,29,1,1),(11,30,1,1),(11,34,1,0),(12,1,1,0),(12,2,1,0),(12,3,1,0),(12,5,1,0),(12,6,1,0),(12,10,1,0),(12,11,0,0),(12,12,0,0),(12,13,1,0),(12,14,0,0),(12,15,0,0),(12,17,1,0),(12,18,0,0),(12,19,0,0),(12,20,0,0),(12,21,0,0),(12,22,1,0),(12,23,0,0),(12,24,0,0),(12,25,0,0),(12,26,1,0),(12,29,1,1),(12,30,1,1),(12,34,1,0),(13,1,1,1),(13,2,1,1),(13,3,1,1),(13,4,0,0),(13,5,1,1),(13,6,1,1),(13,7,0,0),(13,8,0,0),(13,9,0,0),(13,10,1,1),(13,11,0,0),(13,12,1,1),(13,13,1,1),(13,14,0,0),(13,15,0,0),(13,17,1,1),(13,18,0,0),(13,19,0,0),(13,20,0,0),(13,21,0,0),(13,22,1,1),(13,23,0,0),(13,24,1,0),(13,25,0,0),(13,26,1,1),(13,27,0,0),(13,28,0,0),(13,29,1,1),(13,30,1,1),(13,31,0,0),(13,32,0,0),(13,33,0,0),(13,34,1,1),(13,35,0,0),(13,100,0,0),(13,200,0,0),(14,1,1,1),(14,2,1,1),(14,3,1,1),(14,5,1,1),(14,6,1,1),(14,10,1,1),(14,11,1,1),(14,12,0,0),(14,13,1,1),(14,14,0,0),(14,15,0,0),(14,17,1,1),(14,18,1,1),(14,19,1,1),(14,20,0,0),(14,21,0,0),(14,22,1,1),(14,23,1,1),(14,24,1,1),(14,25,1,1),(14,26,1,1),(14,29,1,1),(14,30,1,1),(14,34,1,0),(15,1,1,0),(15,2,1,0),(15,3,1,0),(15,5,1,0),(15,6,1,0),(15,10,1,0),(15,11,0,0),(15,12,0,0),(15,13,1,0),(15,14,0,0),(15,15,0,0),(15,17,1,0),(15,18,0,0),(15,19,0,0),(15,20,0,0),(15,21,0,0),(15,22,1,0),(15,23,0,0),(15,24,0,0),(15,25,0,0),(15,26,1,0),(15,29,1,1),(15,30,1,1),(15,34,1,0),(16,1,1,0),(16,2,1,0),(16,3,1,0),(16,5,1,0),(16,6,1,0),(16,10,1,0),(16,11,0,0),(16,12,0,0),(16,13,1,0),(16,14,0,0),(16,15,0,0),(16,17,1,0),(16,18,0,0),(16,19,0,0),(16,20,0,0),(16,21,0,0),(16,22,1,0),(16,23,0,0),(16,24,0,0),(16,25,0,0),(16,26,1,0),(16,29,1,1),(16,30,1,1),(16,34,1,1),(17,1,1,0),(17,2,1,0),(17,3,1,0),(17,5,1,0),(17,6,1,0),(17,10,1,0),(17,11,0,0),(17,12,0,0),(17,13,1,0),(17,14,0,0),(17,15,0,0),(17,17,1,0),(17,18,0,0),(17,19,0,0),(17,20,0,0),(17,21,0,0),(17,22,1,0),(17,23,0,0),(17,24,0,0),(17,25,0,0),(17,26,1,0),(17,29,1,1),(17,30,1,1),(17,34,1,1),(18,1,1,0),(18,2,1,0),(18,3,1,0),(18,4,0,0),(18,5,1,0),(18,6,1,0),(18,7,0,0),(18,8,0,0),(18,9,0,0),(18,10,1,0),(18,11,0,0),(18,12,1,1),(18,13,1,0),(18,14,0,0),(18,15,1,1),(18,17,1,0),(18,18,0,0),(18,19,0,0),(18,20,0,0),(18,21,0,0),(18,22,1,0),(18,23,0,0),(18,24,0,0),(18,25,0,0),(18,26,1,0),(18,27,0,0),(18,28,0,0),(18,29,1,1),(18,30,1,1),(18,31,0,0),(18,32,0,0),(18,33,0,0),(18,34,1,0),(18,35,1,1),(18,100,0,0),(18,200,1,1),(19,1,1,0),(19,2,1,0),(19,3,1,0),(19,4,0,0),(19,5,1,0),(19,6,1,0),(19,7,0,0),(19,8,0,0),(19,9,0,0),(19,10,1,0),(19,11,0,0),(19,12,1,1),(19,13,1,0),(19,14,0,0),(19,15,1,1),(19,17,1,0),(19,18,0,0),(19,19,0,0),(19,20,0,0),(19,21,0,0),(19,22,1,0),(19,23,0,0),(19,24,0,0),(19,25,0,0),(19,26,1,0),(19,27,0,0),(19,28,0,0),(19,29,1,1),(19,30,1,1),(19,31,0,0),(19,32,0,0),(19,33,0,0),(19,34,1,0),(19,35,0,0),(19,100,0,0),(19,200,1,1),(20,1,1,0),(20,2,1,0),(20,3,1,0),(20,5,1,0),(20,6,1,0),(20,10,1,0),(20,11,0,0),(20,12,0,0),(20,13,1,0),(20,14,0,0),(20,15,0,0),(20,17,1,0),(20,18,1,0),(20,19,1,0),(20,20,0,0),(20,21,0,0),(20,22,1,0),(20,23,1,0),(20,24,0,0),(20,25,0,0),(20,26,1,0),(20,29,1,1),(20,30,1,1),(20,34,1,0),(21,1,1,1),(21,2,1,1),(21,3,1,1),(21,5,1,1),(21,6,1,1),(21,10,1,1),(21,11,1,1),(21,12,1,1),(21,13,1,0),(21,14,1,1),(21,15,1,1),(21,17,1,1),(21,18,1,1),(21,19,1,1),(21,20,1,0),(21,21,1,0),(21,22,1,1),(21,23,1,1),(21,24,1,1),(21,25,1,1),(21,26,1,1),(21,29,1,1),(21,30,1,1),(21,34,1,0),(22,1,0,0),(22,2,0,0),(22,3,0,0),(22,5,0,0),(22,6,0,0),(22,10,0,0),(22,11,0,0),(22,12,0,0),(22,13,0,0),(22,14,0,0),(22,15,0,0),(22,17,0,0),(22,18,0,0),(22,19,0,0),(22,20,0,0),(22,21,0,0),(22,22,0,0),(22,23,0,0),(22,24,0,0),(22,25,0,0),(22,26,0,0),(22,29,1,1),(22,30,1,1),(22,34,1,0),(23,1,1,0),(23,2,1,0),(23,3,1,0),(23,4,0,0),(23,5,1,0),(23,6,1,0),(23,7,0,0),(23,8,0,0),(23,9,0,0),(23,10,1,0),(23,11,0,0),(23,12,1,1),(23,13,1,0),(23,14,0,0),(23,15,0,0),(23,17,1,0),(23,18,0,0),(23,19,0,0),(23,20,0,0),(23,21,0,0),(23,22,1,0),(23,23,0,0),(23,24,0,0),(23,25,0,0),(23,26,1,0),(23,27,0,0),(23,28,0,0),(23,29,1,1),(23,30,1,1),(23,31,0,0),(23,32,0,0),(23,33,0,0),(23,34,1,1),(23,35,1,1),(23,100,0,0),(23,200,0,0),(24,1,1,1),(24,2,1,1),(24,3,1,1),(24,4,0,0),(24,5,1,1),(24,6,1,1),(24,7,0,0),(24,8,0,0),(24,9,0,0),(24,10,1,1),(24,11,1,1),(24,12,1,1),(24,13,1,1),(24,14,1,1),(24,15,1,1),(24,17,1,1),(24,18,1,1),(24,19,1,1),(24,20,1,1),(24,21,1,1),(24,22,1,1),(24,23,1,1),(24,24,1,1),(24,25,1,1),(24,26,1,1),(24,27,0,0),(24,28,0,0),(24,29,1,1),(24,30,1,1),(24,31,0,0),(24,32,0,0),(24,33,1,1),(24,34,1,0),(24,100,0,0),(24,200,1,1),(25,1,1,1),(25,2,1,1),(25,3,1,1),(25,5,1,1),(25,6,1,0),(25,10,1,0),(25,11,0,0),(25,12,1,0),(25,13,1,0),(25,14,1,0),(25,15,1,0),(25,17,1,1),(25,18,1,1),(25,19,1,1),(25,20,1,1),(25,21,1,1),(25,22,1,1),(25,23,1,1),(25,24,1,0),(25,25,1,0),(25,26,1,1),(25,29,1,1),(25,30,1,1),(25,34,1,0),(26,1,1,0),(26,2,1,0),(26,3,1,0),(26,5,1,0),(26,6,1,0),(26,10,1,0),(26,11,0,0),(26,12,0,0),(26,13,1,0),(26,14,1,1),(26,15,0,0),(26,17,1,0),(26,18,0,0),(26,19,0,0),(26,20,0,0),(26,21,0,0),(26,22,1,0),(26,23,0,0),(26,24,0,0),(26,25,0,0),(26,26,1,0),(26,29,1,1),(26,30,1,1),(26,34,1,0),(26,200,1,1),(27,1,1,0),(27,2,1,0),(27,3,1,0),(27,5,1,0),(27,6,1,0),(27,10,1,0),(27,11,0,0),(27,12,0,0),(27,13,1,0),(27,14,1,1),(27,15,0,0),(27,17,1,0),(27,18,0,0),(27,19,0,0),(27,20,0,0),(27,21,0,0),(27,22,1,0),(27,23,0,0),(27,24,0,0),(27,25,0,0),(27,26,1,0),(27,29,1,1),(27,30,1,1),(27,34,1,0),(28,29,1,1),(28,30,1,1),(28,34,1,0),(100,1,1,1),(100,2,1,1),(100,3,1,1),(100,4,1,1),(100,5,1,1),(100,6,1,1),(100,7,1,1),(100,8,1,1),(100,9,1,1),(100,10,1,1),(100,11,1,1),(100,12,1,1),(100,13,1,1),(100,14,1,1),(100,15,1,1),(100,17,1,1),(100,18,1,1),(100,19,1,1),(100,20,1,1),(100,21,1,1),(100,22,1,1),(100,23,1,1),(100,24,1,1),(100,25,1,1),(100,26,1,1),(100,27,1,1),(100,28,1,1),(100,29,1,1),(100,30,1,1),(100,31,1,1),(100,32,1,1),(100,33,1,1),(100,34,1,1),(100,35,1,1),(100,100,1,1),(100,200,1,1);
/*!40000 ALTER TABLE `redi_user_type_project_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_user_type_resource`
--

DROP TABLE IF EXISTS `redi_user_type_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user_type_resource` (
  `user_type_id` int(11) NOT NULL,
  `resource_id` varchar(45) DEFAULT NULL,
  `allow` varchar(45) DEFAULT '0',
  PRIMARY KEY (`user_type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_type_resource`
--

LOCK TABLES `redi_user_type_resource` WRITE;
/*!40000 ALTER TABLE `redi_user_type_resource` DISABLE KEYS */;
/*!40000 ALTER TABLE `redi_user_type_resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_user_type_time_approval_permission`
--

DROP TABLE IF EXISTS `redi_user_type_time_approval_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user_type_time_approval_permission` (
  `approver_user_type_id` int(11) NOT NULL,
  `submitting_user_type_id` int(11) NOT NULL,
  PRIMARY KEY (`approver_user_type_id`,`submitting_user_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_type_time_approval_permission`
--

LOCK TABLES `redi_user_type_time_approval_permission` WRITE;
/*!40000 ALTER TABLE `redi_user_type_time_approval_permission` DISABLE KEYS */;
INSERT INTO `redi_user_type_time_approval_permission` VALUES (1,1),(1,5),(2,1),(2,5),(2,22),(3,4),(3,5),(3,9),(3,23),(5,1),(5,6),(5,21),(6,5),(8,7),(8,26),(11,10),(13,12),(14,12),(15,22),(19,18),(21,5),(24,6),(24,21),(100,2),(100,3),(100,4),(100,6),(100,7),(100,8),(100,9),(100,10),(100,11),(100,12),(100,13),(100,14),(100,15),(100,16),(100,17),(100,18),(100,19),(100,20),(100,21),(100,22),(100,23),(100,24),(100,25),(100,26),(100,27),(100,28),(100,100);
/*!40000 ALTER TABLE `redi_user_type_time_approval_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_user_type_time_entry_permission`
--

DROP TABLE IF EXISTS `redi_user_type_time_entry_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_user_type_time_entry_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_type_time_entry_permission`
--

LOCK TABLES `redi_user_type_time_entry_permission` WRITE;
/*!40000 ALTER TABLE `redi_user_type_time_entry_permission` DISABLE KEYS */;
INSERT INTO `redi_user_type_time_entry_permission` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `redi_user_type_time_entry_permission` ENABLE KEYS */;
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
  `seq` smallint(4) DEFAULT '1',
  `custom` smallint(4) DEFAULT '1',
  `active` smallint(4) DEFAULT '1',
  `created_user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_user_id` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=93 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_version`
--

LOCK TABLES `redi_version` WRITE;
/*!40000 ALTER TABLE `redi_version` DISABLE KEYS */;
INSERT INTO `redi_version` VALUES (1,'1',1,0,1,NULL,NULL,NULL,NULL),(2,'1A',2,0,1,NULL,NULL,NULL,NULL),(3,'1B',3,0,1,NULL,NULL,NULL,NULL),(4,'1Alt',4,0,1,NULL,NULL,NULL,NULL),(5,'1Rev',5,0,1,NULL,NULL,NULL,NULL),(6,'2',6,0,1,NULL,NULL,NULL,NULL),(7,'2A',7,0,1,NULL,NULL,NULL,NULL),(8,'2B',8,0,1,NULL,NULL,NULL,NULL),(9,'2Alt',9,0,1,NULL,NULL,NULL,NULL),(10,'2Rev',10,0,1,NULL,NULL,NULL,NULL),(11,'3',11,0,1,NULL,NULL,NULL,NULL),(12,'3A',12,0,1,NULL,NULL,NULL,NULL),(13,'3B',13,0,1,NULL,NULL,NULL,NULL),(14,'3Alt',14,0,1,NULL,NULL,NULL,NULL),(15,'3Rev',15,0,1,NULL,NULL,NULL,NULL),(16,'4',16,0,1,NULL,NULL,NULL,NULL),(17,'4A',17,0,1,NULL,NULL,NULL,NULL),(18,'4B',18,0,1,NULL,NULL,NULL,NULL),(19,'4Alt',19,0,1,NULL,NULL,NULL,NULL),(20,'4Rev',20,0,1,NULL,NULL,NULL,NULL),(21,'5',21,0,1,NULL,NULL,NULL,NULL),(22,'5A',22,0,1,NULL,NULL,NULL,NULL),(23,'5B',23,0,1,NULL,NULL,NULL,NULL),(24,'5Alt',24,0,1,NULL,NULL,NULL,NULL),(25,'5Rev',25,0,1,NULL,NULL,NULL,NULL),(26,'6',26,0,1,NULL,NULL,NULL,NULL),(27,'6A',27,0,1,NULL,NULL,NULL,NULL),(28,'6B',28,0,1,NULL,NULL,NULL,NULL),(29,'6Alt',29,0,1,NULL,NULL,NULL,NULL),(30,'6Rev',30,0,1,NULL,NULL,NULL,NULL),(31,'7',31,0,1,NULL,NULL,NULL,NULL),(32,'7A',32,0,1,NULL,NULL,NULL,NULL),(33,'7B',33,0,1,NULL,NULL,NULL,NULL),(34,'7Alt',34,0,1,NULL,NULL,NULL,NULL),(35,'7Rev',35,0,1,NULL,NULL,NULL,NULL),(36,'8',36,0,1,NULL,NULL,NULL,NULL),(37,'8A',37,0,1,NULL,NULL,NULL,NULL),(38,'8B',38,0,1,NULL,NULL,NULL,NULL),(39,'8Alt',39,0,1,NULL,NULL,NULL,NULL),(40,'8Rev',40,0,1,NULL,NULL,NULL,NULL),(41,'9',41,0,1,NULL,NULL,NULL,NULL),(42,'9A',42,0,1,NULL,NULL,NULL,NULL),(43,'9B',43,0,1,NULL,NULL,NULL,NULL),(44,'9Alt',44,0,1,NULL,NULL,NULL,NULL),(45,'9Rev',45,0,1,NULL,NULL,NULL,NULL),(46,'10',46,0,1,NULL,NULL,NULL,NULL),(47,'10A',47,0,1,NULL,NULL,NULL,NULL),(48,'10B',48,0,1,NULL,NULL,NULL,NULL),(49,'10Alt',49,0,1,NULL,NULL,NULL,NULL),(50,'10Rev',50,0,1,NULL,NULL,NULL,NULL),(54,'1ARev',NULL,1,1,1,'2018-06-26 14:05:07',NULL,NULL),(53,'1Test',NULL,1,1,1,'2018-06-20 06:34:32',NULL,NULL),(55,'1BRev',NULL,1,1,1,'2018-06-26 14:05:30',NULL,NULL),(56,'2Rev',NULL,1,1,1,'2018-06-26 14:06:36',NULL,NULL),(57,'2ARev',NULL,1,1,1,'2018-06-26 14:07:18',NULL,NULL),(58,'21A',NULL,1,1,1,'2018-06-26 16:20:35',NULL,NULL),(59,'49A',NULL,1,1,1,'2018-06-29 09:36:13',NULL,NULL),(60,'11B',NULL,1,1,1,'2018-06-29 09:38:47',NULL,NULL),(61,'20B',NULL,1,1,1,'2018-06-29 10:55:22',NULL,NULL),(62,'20A',NULL,1,1,1,'2018-06-29 11:53:34',NULL,NULL),(63,'21C',NULL,1,1,1,'2018-06-29 12:07:06',NULL,NULL),(64,'2Aalt',NULL,1,1,1,'2018-07-24 18:52:55',NULL,NULL),(65,'2AAlt',NULL,1,1,1,'2018-07-24 18:53:06',NULL,NULL),(66,'2alt',NULL,1,1,1,'2018-07-24 18:53:20',NULL,NULL),(67,'2ARev2',NULL,1,1,1,'2018-07-24 18:54:31',NULL,NULL),(68,'2ARev3',NULL,1,1,1,'2018-07-24 18:54:56',NULL,NULL),(69,'2ARev4',NULL,1,1,1,'2018-07-24 18:55:16',NULL,NULL),(70,'3ARev2',NULL,1,1,1,'2018-07-24 19:00:42',NULL,NULL),(71,'2altrev',NULL,1,1,1,'2018-07-26 16:56:02',NULL,NULL),(72,'6rev',NULL,1,1,1,'2018-07-26 16:57:15',NULL,NULL),(73,'3Alt2',NULL,1,1,1,'2018-07-26 17:06:43',NULL,NULL),(74,'5Alt2',NULL,1,1,1,'2018-07-26 17:07:13',NULL,NULL),(75,'5Alt3',NULL,1,1,1,'2018-07-26 17:08:06',NULL,NULL),(76,'2AltRev',NULL,1,1,1,'2018-07-26 17:18:14',NULL,NULL),(77,'10revA',NULL,1,1,1,'2018-10-02 18:26:12',NULL,NULL),(78,'4Alt2',NULL,1,1,1,'2018-10-07 08:45:53',NULL,NULL),(90,'11',NULL,1,1,1,'2018-11-01 12:28:14',NULL,NULL),(91,'9AbcDefGhi',NULL,1,1,1,'2018-11-01 13:31:57',NULL,NULL),(92,'9AbcDefGhi111222',NULL,1,1,1,'2018-11-01 13:41:53',NULL,NULL);
/*!40000 ALTER TABLE `redi_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redi_version_status`
--

DROP TABLE IF EXISTS `redi_version_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redi_version_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_version_status`
--

LOCK TABLES `redi_version_status` WRITE;
/*!40000 ALTER TABLE `redi_version_status` DISABLE KEYS */;
INSERT INTO `redi_version_status` VALUES (1,'Finished'),(2,'Graphics work in progress'),(3,'Need to Assign'),(4,'On Hold/or spot killed'),(5,'Prepping'),(6,'Ready to send'),(7,'Sent'),(8,'Testing'),(9,'Waiting on Producer'),(10,'Work in progress');
/*!40000 ALTER TABLE `redi_version_status` ENABLE KEYS */;
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
/*!50003 DROP PROCEDURE IF EXISTS `redi_calculate_user_time_entry` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `redi_calculate_user_time_entry`(IN param_user_id INT, IN param_entry_date VARCHAR(100))
BEGIN
	
	DECLARE done INT DEFAULT FALSE;
	DECLARE cur1_time_entry_id INT;
	DECLARE cur1_start_date DATETIME;
	DECLARE cur1_duration DECIMAL(19,2);
	DECLARE prev_duration_sum DECIMAL(19,2);
	DECLARE duration_sum DECIMAL(19,2);
	DECLARE cur1_duration_float decimal(19,2);

	DECLARE cur1 CURSOR FOR SELECT 
															te.id,
															te.start_date,
															te.duration
														FROM
															redi_time_entry te
														WHERE
															te.activity_id NOT IN  (22, 35)
															AND te.user_id=param_user_id 
															AND DATE(te.start_date) = param_entry_date 
														ORDER BY start_date;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
	
	/** clean calculated time fields */
	UPDATE 
		redi_time_entry te
	SET
		te.straight_time = null, 
		te.over_time=null, 
		te.double_time=null
	WHERE
		te.user_id=param_user_id 
		AND DATE(te.start_date) = param_entry_date;

	SET prev_duration_sum = 0.00;
	SET duration_sum = 0.00;
	SET cur1_duration_float = 0.00;

	OPEN cur1;

	read_loop: LOOP
		FETCH cur1 INTO cur1_time_entry_id, cur1_start_date, cur1_duration;

		IF done THEN
			LEAVE read_loop;
		END IF;
		
		SET cur1_duration_float =  CAST((SUBSTRING_INDEX(cur1_duration, '.', 1) + (SUBSTRING_INDEX(cur1_duration, '.', - 1)) / 60) AS DECIMAL(19,2));
		SET prev_duration_sum = duration_sum;
		SET duration_sum = duration_sum + cur1_duration_float;

		IF duration_sum <= 8 THEN
			UPDATE redi_time_entry SET straight_time = cur1_duration_float, over_time = null, double_time = null WHERE id = cur1_time_entry_id;
		ELSE 
			IF duration_sum > 8 AND duration_sum <=12 THEN
				UPDATE redi_time_entry SET straight_time = (8 - prev_duration_sum), over_time = (duration_sum - 8),  double_time = null WHERE id = cur1_time_entry_id;
			ELSE 
				UPDATE redi_time_entry 
					SET 
						straight_time = IF(prev_duration_sum < 8, (8 - prev_duration_sum), null), 
						over_time = IF(prev_duration_sum < 12, (12 - prev_duration_sum - IF(prev_duration_sum <= 8, (8 - prev_duration_sum), 0)), null),  
						double_time = (duration_sum - 12) 
					WHERE id = cur1_time_entry_id;
			END IF;
		END IF;

	UPDATE 
			redi_time_entry
	SET 
		straight_time = CAST((SUBSTRING_INDEX(straight_time, '.', 1) + (SUBSTRING_INDEX(straight_time, '.', - 1)) * 60/10000) AS DECIMAL(19,2)),
		over_time = CAST((SUBSTRING_INDEX(over_time, '.', 1) + (SUBSTRING_INDEX(over_time, '.', - 1)) * 60/10000) AS DECIMAL(19,2)),  
		double_time = CAST((SUBSTRING_INDEX(double_time, '.', 1) + (SUBSTRING_INDEX(double_time, '.', - 1)) * 60/10000) AS DECIMAL(19,2)) 
	WHERE id = cur1_time_entry_id;

	END LOOP;

	CLOSE cur1;

	SELECT 
    *
FROM
    redi_time_entry
WHERE
    user_id = param_user_id
	AND date(start_date) = param_entry_date
ORDER BY start_date;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-23  2:28:30

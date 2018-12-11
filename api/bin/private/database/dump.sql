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
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_activity`
--

LOCK TABLES `redi_activity` WRITE;
/*!40000 ALTER TABLE `redi_activity` DISABLE KEYS */;
INSERT INTO `redi_activity` VALUES (1,'AE Work (NOT Dailies)',1,1,1,1,0,0,1,0),(2,'Breakdown Movie',2,0,1,1,0,0,1,0),(3,'Business Development',2,0,1,0,0,0,1,0),(4,'Dailies Assembly',1,0,1,1,0,0,1,0),(5,'Dailies Import',1,0,1,1,0,0,1,0),(6,'Dialogue Breakdown',2,0,1,1,0,0,1,0),(7,'Downtime (add details)',3,1,1,0,0,0,1,0),(8,'Edit',1,0,1,1,1,0,1,0),(9,'Editing on Fiber',1,0,1,1,1,0,1,0),(10,'Fiber',1,0,1,1,0,0,1,0),(11,'Finish Audio Mix',1,0,1,1,1,0,1,0),(12,'Finish Online',1,0,1,1,1,0,1,0),(13,'Finish Prep',1,1,1,1,1,1,1,0),(14,'Finish Supervision',1,0,1,1,0,0,1,0),(15,'Game Capture',1,0,1,1,0,0,1,0),(16,'General Production',2,0,1,0,0,0,1,0),(17,'Graphic Design',1,0,1,1,0,1,1,0),(18,'Graphic Finish',1,0,1,1,1,1,1,0),(19,'Graphic Styleframes/Boards',1,0,1,1,0,1,1,0),(20,'Graphic Work in Downtime',1,0,1,1,0,1,1,0),(21,'IT Work',3,0,1,1,0,0,1,0),(22,'Lunch Break',3,0,0,0,0,0,1,0),(23,'Meeting (Admin)',3,1,1,0,0,0,1,0),(24,'Meeting (Project Creative)',2,0,1,1,0,0,1,0),(25,'Music Composing',2,0,1,1,0,0,1,0),(26,'Music Creative',2,0,1,1,0,0,1,0),(27,'Music Cue Sheets',1,0,1,1,1,0,1,0),(28,'Music Licensing',2,0,1,1,0,0,1,0),(29,'Music Producing',2,0,1,1,0,0,1,0),(30,'Narration Supervision',1,0,1,0,0,0,1,0),(31,'Office/Admin',3,0,1,0,0,0,1,0),(32,'Produce',2,0,1,1,0,0,1,0),(33,'Screen Movie',2,0,1,1,1,0,1,0),(35,'Time Off (Unpaid)',3,0,1,0,0,0,1,1),(36,'Waiting (add details)',2,1,1,0,0,0,1,0),(37,'Writing',1,0,1,0,0,0,1,0),(40,'Trailer',4,0,0,0,0,0,1,0),(41,'Penalty Meal Pay',3,0,0,0,0,0,1,0),(42,'test activity982u2133a',NULL,1,1,1,1,1,1,1),(43,'some label for activity',2,1,0,1,1,1,0,1),(44,'test activit333',2,1,1,1,1,1,1,1);
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
INSERT INTO `redi_activity_to_user_type` VALUES (1,4),(2,4),(2,6),(2,7),(2,21),(3,6),(3,20),(3,21),(3,28),(4,4),(5,4),(6,4),(7,1),(7,2),(7,3),(7,4),(7,5),(7,6),(7,7),(7,8),(7,9),(7,10),(7,11),(7,12),(7,13),(7,14),(7,15),(7,16),(7,17),(7,18),(7,19),(7,20),(7,21),(7,22),(7,23),(7,24),(7,25),(7,26),(7,27),(7,28),(7,100),(8,4),(8,7),(8,21),(9,4),(9,7),(9,21),(10,6),(10,7),(10,21),(11,9),(12,4),(12,9),(13,4),(13,9),(13,23),(14,3),(14,9),(14,23),(15,10),(16,3),(16,4),(16,6),(16,7),(16,8),(16,9),(16,10),(16,11),(16,12),(16,13),(16,14),(16,18),(16,19),(16,21),(16,23),(16,26),(16,27),(17,12),(17,13),(17,14),(18,12),(18,13),(18,14),(19,12),(19,13),(19,14),(20,12),(20,13),(20,14),(21,1),(21,2),(21,3),(21,4),(21,5),(21,6),(21,7),(21,8),(21,9),(21,10),(21,11),(21,12),(21,13),(21,14),(21,15),(21,16),(21,17),(21,18),(21,19),(21,20),(21,21),(21,22),(21,23),(21,24),(21,25),(21,26),(21,27),(21,28),(21,100),(22,1),(22,2),(22,3),(22,4),(22,5),(22,6),(22,7),(22,8),(22,9),(22,10),(22,11),(22,12),(22,13),(22,14),(22,15),(22,16),(22,17),(22,18),(22,19),(22,20),(22,21),(22,22),(22,23),(22,24),(22,25),(22,26),(22,27),(22,28),(22,100),(23,1),(23,2),(23,3),(23,4),(23,5),(23,6),(23,7),(23,8),(23,9),(23,10),(23,11),(23,12),(23,13),(23,14),(23,15),(23,16),(23,17),(23,18),(23,19),(23,20),(23,21),(23,22),(23,23),(23,24),(23,25),(23,26),(23,27),(23,28),(23,100),(24,1),(24,2),(24,3),(24,4),(24,5),(24,6),(24,7),(24,8),(24,9),(24,10),(24,11),(24,12),(24,13),(24,14),(24,15),(24,16),(24,17),(24,18),(24,19),(24,20),(24,21),(24,22),(24,23),(24,24),(24,25),(24,26),(24,27),(24,28),(24,100),(25,18),(25,19),(26,7),(26,18),(26,19),(27,4),(27,18),(27,19),(28,18),(28,19),(29,18),(29,19),(30,6),(30,9),(30,21),(31,1),(31,2),(31,5),(31,15),(31,16),(31,17),(31,20),(31,21),(31,24),(31,25),(31,28),(31,100),(32,6),(32,20),(32,21),(32,28),(33,1),(33,2),(33,3),(33,4),(33,5),(33,6),(33,7),(33,8),(33,9),(33,10),(33,11),(33,12),(33,13),(33,14),(33,15),(33,16),(33,17),(33,18),(33,19),(33,20),(33,21),(33,22),(33,23),(33,24),(33,25),(33,26),(33,27),(33,28),(33,100),(35,1),(35,2),(35,3),(35,4),(35,5),(35,6),(35,7),(35,8),(35,9),(35,10),(35,11),(35,12),(35,13),(35,14),(35,15),(35,16),(35,17),(35,18),(35,19),(35,20),(35,21),(35,22),(35,23),(35,24),(35,25),(35,26),(35,27),(35,28),(35,100),(36,7),(36,9),(36,12),(36,13),(36,14),(37,26),(37,27),(42,1),(42,2),(42,3),(42,4),(42,7),(43,2),(43,4),(43,5),(43,8),(44,1),(44,2),(44,3),(44,4),(44,7);
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
  `editor_req` text,
  `material_received` datetime DEFAULT NULL,
  `created_by_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_campaign`
--

LOCK TABLES `redi_campaign` WRITE;
/*!40000 ALTER TABLE `redi_campaign` DISABLE KEYS */;
INSERT INTO `redi_campaign` VALUES (1,'Theatrical Digital',NULL,NULL,NULL,NULL),(2,'Theatrical Radio',NULL,NULL,NULL,NULL),(3,'Theatrical Sizzle/Reel',NULL,NULL,NULL,NULL),(4,'Theatrical Teaser/Trai',NULL,NULL,NULL,NULL),(5,'Theatrical TV',NULL,NULL,NULL,NULL),(6,'Theatrical Work',NULL,NULL,NULL,NULL),(7,'Broadcast',NULL,NULL,NULL,NULL),(8,'Comic-con',NULL,NULL,NULL,NULL),(9,'Games',NULL,NULL,NULL,NULL),(10,'Graphics',NULL,NULL,NULL,NULL),(11,'Theatrical Streaming',NULL,NULL,NULL,NULL),(12,'Streaming',NULL,NULL,NULL,NULL);
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
INSERT INTO `redi_customer` VALUES (1,1,'C00334','Corey Schmidt','Corey Schmidt'),(2,1,'C00583','Danielle Wright','Danielle Wright'),(3,1,'C00341\r\n','Dave Dore\r\n','Dave Dore\r\n'),(4,1,'C00544\r\n','Dean McFlicker\r\n','Dean McFlicker\r\n'),(5,1,'C00455\r\n','Kendall Bowlin\r\n','Kendall Bowlin\r\n'),(6,1,'C00595\r\n','Noah Gallico\r\n','Noah Gallico\r\n'),(7,1,'C00395','Samantha Jukes-Adams','Samantha Jukes-Adams'),(8,1,'C00500\r\n','Scott Herbst\r\n','Scott Herbst\r\n'),(9,2,'C00722','Bianka Cisneros','Bianka Cisneros'),(10,2,'C00294\r\n','Elisa Iovine\r\n','Elisa Iovine\r\n'),(11,2,'C00702\r\n','Ariadne Chucholowski\r\n','Ariadne Chucholowski\r\n'),(12,2,'C00089\r\n','John Stanford\r\n','John Stanford\r\n'),(13,2,'C00235\r\n','Brian Worsley\r\n','Brian Worsley\r\n'),(14,2,'C00720\r\n','Brittany Beane\r\n','Brittany Beane\r\n'),(15,2,'C00496\r\n','Mitchell Davis\r\n','Mitchell Davis\r\n'),(16,2,'C00748\r\n','Amanda Miller\r\n','Amanda Miller\r\n'),(17,2,'C00306\r\n','Christelle Egan\r\n','Christelle Egan\r\n'),(18,2,'C00247\r\n','Conrad Ellingsworth\r\n','Conrad Ellingsworth\r\n'),(19,2,'C00310\r\n','Ingrid Enson\r\n','Ingrid Enson\r\n'),(20,2,'C00321\r\n','Isabel Henderson\r\n','Isabel Henderson\r\n'),(21,2,'C00023\r\n','Jim Fredrick\r\n','Jim Fredrick\r\n'),(22,2,'C00366\r\n','John Codi\r\n','John Codi\r\n'),(23,2,'C00712\r\n','Katy Leigh\r\n','Katy Leigh\r\n'),(24,2,'C00118\r\n','Keri Moore\r\n','Keri Moore\r\n'),(25,2,'C00683\r\n','Loren Schwartz\r\n','Loren Schwartz\r\n'),(26,2,'C00370\r\n','Louis DeMangus\r\n','Louis DeMangus\r\n'),(27,2,'C00022\r\n','Michelle Jackino\r\n','Michelle Jackino\r\n'),(28,2,'C00699\r\n','Nick Denogeon\r\n','Nick Denogeon\r\n'),(29,2,'C00386\r\n','Ryan Pickens\r\n','Ryan Pickens\r\n'),(30,2,'C00024\r\n','Samantha Bird\r\n','Samantha Bird\r\n'),(31,2,'C00081\r\n','Stacy Osugi\r\n','Stacy Osugi\r\n'),(32,2,'C00632\r\n','Susan Brenner\r\n','Susan Brenner\r\n'),(33,3,'C00581','Alyson Bradshaw\r\n','Alyson Bradshaw\r\n'),(34,3,'C00611\r\n','Daniel Zibulsky\r\n','Daniel Zibulsky\r\n'),(35,3,'C00606\r\n','Erin Dee\r\n','Erin Dee\r\n'),(36,3,'C00735\r\n','Andrew Thomas\r\n','Andrew Thomas\r\n'),(37,3,'C00615\r\n','Chris Denniston\r\n','Chris Denniston\r\n'),(38,3,'C00588\r\n','Melora Soodalter\r\n','Melora Soodalter\r\n'),(39,3,'C00627\r\n','Natalia Echeverria\r\n','Natalia Echeverria\r\n');
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
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile_phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_contact`
--

LOCK TABLES `redi_customer_contact` WRITE;
/*!40000 ALTER TABLE `redi_customer_contact` DISABLE KEYS */;
INSERT INTO `redi_customer_contact` VALUES (1,1,'Corey Schmidt','Creative Executive','corey.schmidt@email.com','(226) 906-2721'),(2,2,'Danielle Wright','Creative Executive',NULL,NULL),(3,3,'Dave Dore\r\n','Creative Executive',NULL,NULL),(4,4,'Dean McFlicker','Creative Executive',NULL,NULL),(5,5,'Kendall Bowlin\r\n','Creative Executive',NULL,NULL),(6,6,'Noah Gallico\r\n','Creative Executive',NULL,NULL),(7,7,'Samantha Jukes-Adams','Creative Executive',NULL,NULL),(8,8,'Scott Herbst\r\n','Creative Executive',NULL,NULL),(9,9,'Bianka Cisneros','Creative Executive','Bianka.Cisneros@warnerbros.com',NULL),(10,10,'Elisa Iovine\r\n','Creative Executive','Elisa.Iovine@warnerbros.com\r\n',NULL),(11,11,'Ariadne Chucholowski\r\n','Creative Executive',NULL,NULL),(12,12,'John Stanford\r\n','Creative Executive',NULL,NULL),(13,13,'Brian Worsley\r\n','Creative Executive',NULL,NULL),(14,14,'Brittany Beane\r\n','Creative Executive',NULL,NULL),(15,15,'Mitchell Davis\r\n','Creative Executive',NULL,NULL),(16,16,'Amanda Miller\r\n','Creative Executive',NULL,NULL),(17,17,'Christelle Egan\r\n','Creative Executive',NULL,NULL),(18,18,'Conrad Ellingsworth\r\n','Creative Executive',NULL,NULL),(19,19,'Ingrid Enson\r\n','Creative Executive',NULL,NULL),(20,20,'Isabel Henderson\r\n','Creative Executive',NULL,NULL),(21,21,'Jim Fredrick\r\n','Creative Executive',NULL,NULL),(22,22,'John Codi\r\n','Creative Executive',NULL,NULL),(23,23,'Katy Leigh\r\n','Creative Executive',NULL,NULL),(24,24,'Keri Moore\r\n','Creative Executive',NULL,NULL),(25,25,'Loren Schwartz\r\n','Creative Executive',NULL,NULL),(26,26,'Louis DeMangus\r\n','Creative Executive',NULL,NULL),(27,27,'Michelle Jackino\r\n','Creative Executive',NULL,NULL),(28,28,'Nick Denogeon\r\n','Creative Executive',NULL,NULL),(29,29,'Ryan Pickens\r\n','Creative Executive',NULL,NULL),(30,30,'Samantha Bird\r\n','Creative Executive',NULL,NULL),(31,31,'Stacy Osugi\r\n','Creative Executive',NULL,NULL),(32,32,'Susan Brenner\r\n','Creative Executive',NULL,NULL),(33,33,'Alyson Bradshaw\r\n','Creative Executive','Alyson.Bradshaw@hbo.com\r\n',NULL),(34,34,'Daniel Zibulsky\r\n','Creative Executive','Daniel.Zibulsky@hbo.com\r\n',NULL),(35,35,'Erin Dee\r\n','Creative Executive','Erin.Dee@hbo.com\r\n',NULL),(36,36,'Andrew Thomas\r\n','Creative Executive',NULL,NULL),(37,37,'Chris Denniston\r\n','Creative Executive',NULL,NULL),(38,38,'Melora Soodalter\r\n','Creative Executive',NULL,NULL),(39,39,'Natalia Echeverria\r\n','Creative Executive',NULL,NULL);
/*!40000 ALTER TABLE `redi_customer_contact` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_new`
--

LOCK TABLES `redi_customer_new` WRITE;
/*!40000 ALTER TABLE `redi_customer_new` DISABLE KEYS */;
INSERT INTO `redi_customer_new` VALUES (1,36,'CBS Films\r\n','some name','test street','tes city','test st','9229','ab@ab.com','888888','abc dk','ab@bb.com','99933333',0,81,NULL,'2018-11-14 16:21:22',NULL),(2,36,'CBS Films\r\n','some name1','test street','tes city','test st','9229','ab@ab.com','888888','abc dk','ab@bb.com','99933333',1,81,1,'2018-11-14 16:21:28','2018-11-14 17:32:46'),(3,36,'CBS Films\r\n','some name12','test street','tes city','test st','9229','ab@ab.com','888888','abc dk','ab@bb.com','99933333',0,81,NULL,'2018-11-14 16:21:31',NULL),(4,36,'CBS Films\r\n','some name123','test street','tes city','test st','9229','ab@ab.com','888888','abc dk','ab@bb.com','99933333',0,81,NULL,'2018-11-14 16:21:35',NULL),(5,36,'CBS Films\r\n','some name1234','test street','tes city','test st','9229','ab@ab.com','888888','abc dk','ab@bb.com','99933333',0,81,NULL,'2018-11-14 16:21:39',NULL),(6,36,'CBS Films\r\n','some name12345','test street','tes city','test st','9229','ab@ab.com','888888','abc dk','ab@bb.com','99933333',0,81,NULL,'2018-11-14 16:21:44',NULL);
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
INSERT INTO `redi_customer_price` VALUES (2,2,'A',55.00),(2,9,'A',NULL),(2,4,'A',101.00),(10,12,'A',80.00),(7,15,'A',10.00),(4,1,'A',0.00),(32,5,'A',10.00),(15,8,'A',0.00),(15,10,'A',0.00),(2,4,'B',101.00);
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
  `confirm` smallint(1) DEFAULT '0',
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_notification`
--

LOCK TABLES `redi_notification` WRITE;
/*!40000 ALTER TABLE `redi_notification` DISABLE KEYS */;
INSERT INTO `redi_notification` VALUES (1,2,'Writing team request created on project Annihilation  for campaign (:30) TV','/portal/project/34/Buena Vista/47/Annihilation',0,1,'2018-11-07 18:57:56',NULL,NULL),(2,2,'Writing team request created on project Annihilation  for campaign (:30) TV','/portal/project/34/Buena Vista/47/Annihilation',0,1,'2018-11-07 19:00:42',NULL,NULL),(3,2,'Writing team request created on project Annihilation  for campaign (:30) TV','/portal/project/34/Buena Vista/47/Annihilation',0,1,'2018-11-07 19:05:52',NULL,NULL),(4,1,'Music team request created on project Annihilation  for campaign (:30) TV','/portal/project/34/Buena Vista/47/Annihilation',0,1,'2018-11-07 19:06:25',NULL,NULL),(5,2,'Writing team request created on project Annihilation  for campaign (:30) TV','/portal/project/34/Buena Vista/47/Annihilation',0,1,'2018-11-07 19:06:25',NULL,NULL),(6,1,'Music team request created on project Annihilation  for campaign (:30) TV','/portal/project/34/Buena Vista/47/Annihilation',0,1,'2018-11-07 19:07:30',NULL,NULL),(7,2,'Writing team request created on project Annihilation  for campaign (:30) TV','/portal/project/34/Buena Vista/47/Annihilation',0,1,'2018-11-07 19:07:30',NULL,NULL),(8,2,'Writing team request created on project Annihilation  for campaign (:30) TV','/portal/project/34/Buena Vista/47/Annihilation',0,1,'2018-11-07 19:08:09',NULL,NULL),(9,1,'Music team request created on project Annihilation  for campaign (:30) TV','/portal/project/34/Buena Vista/47/Annihilation',0,1,'2018-11-07 19:09:30',NULL,NULL),(10,2,'Writing team request created on project Annihilation  for campaign (:30) TV','/portal/project/34/Buena Vista/47/Annihilation',1,1,'2018-11-07 19:09:30',1,'2018-11-19 19:51:29'),(11,1,'Music team request created on project Annihilation  for campaign Theatrical Teaser/Trai','/portal/project/2/Warner Bros./47/Annihilation',0,1,'2018-11-19 18:10:15',NULL,NULL),(12,1,'Music team request created on project Annihilation  for campaign Theatrical Teaser/Trai','/portal/project/2/Warner Bros./47/Annihilation',0,1,'2018-11-19 18:13:31',NULL,NULL),(13,1,'Music team request created on project Annihilation  for campaign Theatrical Teaser/Trai','/portal/project/2/Warner Bros./47/Annihilation',0,1,'2018-11-19 18:14:28',NULL,NULL),(14,2,'Writing team request created on project Annihilation  for campaign Theatrical Teaser/Trai','/portal/project/2/Warner Bros./47/Annihilation',0,1,'2018-11-19 18:14:28',NULL,NULL),(15,1,'Music team request created on project Annihilation  for campaign Theatrical Teaser/Trai','/portal/project/2/Warner Bros./47/Annihilation',0,1,'2018-11-19 18:17:14',NULL,NULL),(16,2,'Writing team request created on project Annihilation  for campaign Theatrical Teaser/Trai','/portal/project/2/Warner Bros./47/Annihilation',0,1,'2018-11-19 18:17:14',NULL,NULL);
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
INSERT INTO `redi_notification_data` VALUES (1,'campaignId','4'),(1,'campaignName','(:30) TV'),(1,'projectCampaignId','156'),(1,'projectId','47'),(1,'projectName','Annihilation'),(1,'studioId','34'),(1,'studioName','Buena Vista\r\n'),(2,'campaignId','4'),(2,'campaignName','(:30) TV'),(2,'projectCampaignId','156'),(2,'projectId','47'),(2,'projectName','Annihilation'),(2,'studioId','34'),(2,'studioName','Buena Vista\r\n'),(3,'campaignId','4'),(3,'campaignName','(:30) TV'),(3,'projectCampaignId','156'),(3,'projectId','47'),(3,'projectName','Annihilation'),(3,'studioId','34'),(3,'studioName','Buena Vista\r\n'),(4,'campaignId','4'),(4,'campaignName','(:30) TV'),(4,'projectCampaignId','156'),(4,'projectId','47'),(4,'projectName','Annihilation'),(4,'studioId','34'),(4,'studioName','Buena Vista\r\n'),(5,'campaignId','4'),(5,'campaignName','(:30) TV'),(5,'projectCampaignId','156'),(5,'projectId','47'),(5,'projectName','Annihilation'),(5,'studioId','34'),(5,'studioName','Buena Vista\r\n'),(6,'campaignId','4'),(6,'campaignName','(:30) TV'),(6,'projectCampaignId','156'),(6,'projectId','47'),(6,'projectName','Annihilation'),(6,'studioId','34'),(6,'studioName','Buena Vista\r\n'),(7,'campaignId','4'),(7,'campaignName','(:30) TV'),(7,'projectCampaignId','156'),(7,'projectId','47'),(7,'projectName','Annihilation'),(7,'studioId','34'),(7,'studioName','Buena Vista\r\n'),(8,'campaignId','4'),(8,'campaignName','(:30) TV'),(8,'projectCampaignId','156'),(8,'projectId','47'),(8,'projectName','Annihilation'),(8,'studioId','34'),(8,'studioName','Buena Vista\r\n'),(9,'campaignId','4'),(9,'campaignName','(:30) TV'),(9,'projectCampaignId','156'),(9,'projectId','47'),(9,'projectName','Annihilation'),(9,'studioId','34'),(9,'studioName','Buena Vista\r\n'),(10,'campaignId','4'),(10,'campaignName','(:30) TV'),(10,'projectCampaignId','156'),(10,'projectId','47'),(10,'projectName','Annihilation'),(10,'studioId','34'),(10,'studioName','Buena Vista\r\n'),(13,'campaignId','4'),(13,'campaignName','Theatrical Teaser/Trai'),(13,'projectCampaignId','156'),(13,'projectId','47'),(13,'projectName','Annihilation'),(13,'studioId','2'),(13,'studioName','Warner Bros.'),(14,'campaignId','4'),(14,'campaignName','Theatrical Teaser/Trai'),(14,'projectCampaignId','156'),(14,'projectId','47'),(14,'projectName','Annihilation'),(14,'studioId','2'),(14,'studioName','Warner Bros.'),(15,'campaignId','4'),(15,'campaignName','Theatrical Teaser/Trai'),(15,'projectCampaignId','156'),(15,'projectId','47'),(15,'projectName','Annihilation'),(15,'studioId','2'),(15,'studioName','Warner Bros.'),(16,'campaignId','4'),(16,'campaignName','Theatrical Teaser/Trai'),(16,'projectCampaignId','156'),(16,'projectId','47'),(16,'projectName','Annihilation'),(16,'studioId','2'),(16,'studioName','Warner Bros.');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_notification_message_type`
--

LOCK TABLES `redi_notification_message_type` WRITE;
/*!40000 ALTER TABLE `redi_notification_message_type` DISABLE KEYS */;
INSERT INTO `redi_notification_message_type` VALUES (1,'request_music_team','Music team request created on project #{projectName}  for campaign #{campaignName}','/portal/project/#{studioId}/#{studioName}/#{projectId}/#{projectName}','{\"projectId\":true,\"projectName\":true,\"campaignId\":true,\"campaignName\":true,\"studioId\":true,\"studioName\":true}'),(2,'request_writing_team','Writing team request created on project #{projectName}  for campaign #{campaignName}','/portal/project/#{studioId}/#{studioName}/#{projectId}/#{projectName}','{\"projectId\":true,\"projectName\":true,\"campaignId\":true,\"campaignName\":true,\"studioId\":true,\"studioName\":true}');
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
  PRIMARY KEY (`notification_id`,`user_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_notification_user`
--

LOCK TABLES `redi_notification_user` WRITE;
/*!40000 ALTER TABLE `redi_notification_user` DISABLE KEYS */;
INSERT INTO `redi_notification_user` VALUES (4,82),(4,83),(4,84),(4,100),(6,81),(6,83),(6,84),(6,100),(9,81),(9,82),(9,83),(9,84),(10,100),(10,113),(10,114),(13,18),(13,19),(14,26),(15,18),(15,19),(16,26);
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
  `project_release` datetime DEFAULT NULL,
  `studio_id` int(11) DEFAULT NULL,
  `notes` text,
  `created_by_user_id` int(11) DEFAULT NULL,
  `type` char(1) DEFAULT 'B',
  PRIMARY KEY (`id`),
  KEY `project_name` (`project_name`),
  KEY `project_code` (`project_code`)
) ENGINE=MyISAM AUTO_INCREMENT=77 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project`
--

LOCK TABLES `redi_project` WRITE;
/*!40000 ALTER TABLE `redi_project` DISABLE KEYS */;
INSERT INTO `redi_project` VALUES (1,'Babysitter','BAB','2018-06-05 00:00:00',1,'Project has no description',NULL,'B'),(47,'Annihilation',NULL,'2018-02-23 00:00:00',2,'Job # 5195\nadding Customer Contact here: Anu Bhatia',NULL,'B'),(2,'Before I Wake',NULL,'2018-06-05 00:00:00',1,NULL,NULL,'B'),(3,'Bravo 14',NULL,'2018-06-05 00:00:00',1,NULL,NULL,'B'),(5,'Hearthstone',NULL,'2018-06-05 00:00:00',1,NULL,NULL,'B'),(6,'Jack Reacher 2',NULL,'2018-06-05 00:00:00',1,NULL,NULL,'B'),(7,'Lights Out',NULL,'2018-04-26 00:00:00',1,NULL,NULL,'B'),(9,'Mr Robot S2',NULL,'2018-04-26 00:00:00',1,NULL,NULL,'B'),(10,'Quarry',NULL,'2018-04-26 00:00:00',1,NULL,NULL,'B'),(11,'Silicon Valley',NULL,'2018-04-26 00:00:00',1,'Silicon Valley is an American comedy television series created by Mike Judge, John Altschuler and Dave Krinsky. The series focuses on five young men who founded a startup company in Silicon Valley. The series premiered on April 6, 2014 on HBO.',NULL,'B'),(13,'Storks',NULL,'2018-04-26 00:00:00',1,NULL,NULL,'B'),(14,'TNT Brand',NULL,'2018-02-23 00:00:00',1,NULL,NULL,'B'),(15,'What Now',NULL,'2018-02-23 00:00:00',1,NULL,NULL,'B'),(16,'Veep','Code Name','2018-04-26 00:00:00',1,NULL,NULL,'B'),(22,'Game of Thrones',NULL,'2018-02-23 00:00:00',1,NULL,NULL,'B'),(28,'Independence',NULL,'2018-02-23 00:00:00',1,NULL,NULL,'B'),(39,'Game of Thrones',NULL,'2018-02-23 00:00:00',1,'George R.R. Martin\'s best-selling book series \"A Song of Ice and Fire\" is brought to the screen as HBO sinks its considerable storytelling teeth into the medieval fantasy epic. test string added',NULL,'B'),(46,'Project abk',NULL,'2018-02-23 00:00:00',1,'test desc for project abk',NULL,'B'),(50,'Demo project1','demo1',NULL,1,'some note for project. this is dummy text',1,'B'),(49,'Aquaman','Ahab','2018-05-31 00:00:00',1,NULL,1,'B'),(51,'Godzilla 2','Fathom','2018-09-28 00:00:00',1,NULL,1,'B'),(52,'The Muppets','Parts','2018-11-23 00:00:00',1,NULL,1,'B'),(53,'Shazam','Franklin','2019-04-05 00:00:00',1,NULL,1,'B'),(54,'Wreck It Ralph 2','Popcorn','2018-11-21 00:00:00',2,'International Campaign',1,'B'),(55,'On the Basis of Sex',NULL,NULL,2,NULL,1,'B'),(56,'Elephants',NULL,NULL,3,NULL,1,'B'),(57,'Marina Doesn\'t Care','Carrots','2018-12-24 00:00:00',3,'testing testing',1,'B'),(76,'Powder Puff','cotton candy',NULL,2,NULL,1,'B'),(75,'Mario',NULL,NULL,125,NULL,1,'B'),(74,'Mowgli',NULL,'2018-12-07 00:00:00',127,NULL,1,'B');
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
) ENGINE=InnoDB AUTO_INCREMENT=1169 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_history`
--

LOCK TABLES `redi_project_history` WRITE;
/*!40000 ALTER TABLE `redi_project_history` DISABLE KEYS */;
INSERT INTO `redi_project_history` VALUES (4,9,NULL,1,'Campaign \"Graphics Campaign\" was added to project \"Mr Robot S2\"','2017-02-25 17:32:38'),(5,1,NULL,1,'Campaign \"Clone\" was added to project \"Babysitter\"','2017-03-02 15:18:00'),(6,1,NULL,1,'Campaign \"Clone 30\" was added to project \"Babysitter\"','2017-03-02 15:19:46'),(7,1,NULL,1,'Campaign \"Hollo\" was added to project \"Babysitter\"','2017-03-02 15:21:23'),(8,1,NULL,1,'Campaign \"Rocky\" was added to project \"Babysitter\"','2017-03-02 15:22:49'),(9,1,NULL,1,'Spot \"Ka Spot\" was added to \"AV Campaign\" campaign','2017-03-02 16:17:00'),(11,22,NULL,1,'Project \"Game of Thrones\" created for client \"HBO\"','2017-03-15 05:40:56'),(13,1,NULL,1,'Campaign \"VAA\" was added to project \"Babysitter\"','2017-03-16 07:37:36'),(26,10,NULL,1,'Spot \"Enchantress\" was added to \"AV Campaign\"','2017-03-16 12:57:34'),(39,10,NULL,48,'Campaign \"Trailer Two\" was added to project \"Quarry\"','2017-03-23 08:03:22'),(40,10,NULL,48,'Campaign \"Teaser\" was added to project \"Quarry\"','2017-03-28 12:56:01'),(41,10,NULL,48,'Campaign \"Who\" was added to project \"Quarry\"','2017-03-28 13:02:23'),(42,10,NULL,48,'Campaign \"When\" was added to project \"Quarry\"','2017-03-28 13:14:42'),(43,10,NULL,48,'Campaign \"What\" was added to project \"Quarry\"','2017-03-28 13:15:38'),(44,10,NULL,48,'Campaign \"Why\" was added to project \"Quarry\"','2017-03-28 13:18:03'),(66,9,NULL,48,'Campaign \"(:30) TV\" was added to project \"Mr Robot S2\"','2017-04-16 00:05:53'),(67,1,NULL,48,'Campaign \"(:30) TV\" was added to project \"Babysitter\"','2017-04-16 13:51:53'),(68,1,NULL,48,'Spot \"First Spot for Babysitter (:30) TV\" was added to \"(:30) TV\" campaign','2017-04-16 14:02:50'),(69,1,NULL,48,'Campaign \"Graphicss\" was added to project \"Babysitter\"','2017-04-17 19:56:26'),(70,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 09:54:36'),(71,10,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 09:54:45'),(72,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 10:06:44'),(73,10,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 10:07:06'),(74,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 10:07:17'),(75,10,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 10:07:54'),(76,10,NULL,48,'Campaign \"(:15) TV\" was added to project \"Quarry\"','2017-04-26 11:49:28'),(77,10,NULL,48,'Campaign \"(:15) TV\" was removed from project \"Quarry\"','2017-04-26 11:49:49'),(78,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 11:50:15'),(79,10,NULL,48,'Campaign \"Teaser\" was added to project \"Quarry\"','2017-04-28 12:38:52'),(80,10,NULL,48,'Spot \"First Spot for Teaser\" was added to \"Teaser\" campaign','2017-04-28 12:40:44'),(85,9,NULL,48,'Spot \"Episode 405\" was added to \"(:30) TV\" campaign','2017-05-03 16:23:06'),(86,1,NULL,48,'Version \"1\" was added to spot \"First Spot for Babysit\"','2017-05-24 09:42:28'),(87,1,NULL,48,'Version \"2\" was added to spot \"First Spot for Babysit\"','2017-05-24 09:42:34'),(88,1,NULL,48,'Campaign \"Graphicss\" was removed from project \"Babysitter\"','2017-05-24 09:42:56'),(89,1,NULL,48,'Campaign \"Graphics\" was added to project \"Babysitter\"','2017-05-24 09:43:08'),(105,28,NULL,48,'Project \"Independence1\" created for client \"HBO\"','2017-07-06 18:27:57'),(106,28,NULL,48,'Campaign \"Teaser\" was added to project \"Independence1\"','2017-07-06 18:48:57'),(107,28,NULL,48,'Campaign \"Trailer\" was added to project \"Independence1\"','2017-07-06 20:29:06'),(108,28,NULL,48,'Campaign \"Pitch\" was added to project \"Independence1\"','2017-07-06 20:46:47'),(110,28,NULL,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 20:51:51'),(111,28,NULL,48,'Campaign \"TV (other)\" was added to project \"Independence1\"','2017-07-06 20:51:55'),(112,28,NULL,48,'Campaign \"Home Entertainment\" was added to project \"Independence1\"','2017-07-06 20:52:00'),(113,28,NULL,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-06 20:52:03'),(114,28,NULL,48,'Campaign \"Broadcast\" was added to project \"Independence1\"','2017-07-06 20:54:51'),(115,28,NULL,48,'Campaign \"Games\" was added to project \"Independence1\"','2017-07-06 20:55:43'),(116,28,NULL,48,'Campaign \"Angre\" was added to project \"Independence1\"','2017-07-06 21:23:03'),(117,28,NULL,48,'Campaign \"Angre\" was added to project \"Independence1\"','2017-07-06 21:23:05'),(118,28,NULL,48,'Campaign \"Trailer\" was removed from project \"Independence1\"','2017-07-06 21:28:31'),(119,28,NULL,48,'Campaign \"Pitch\" was removed from project \"Independence1\"','2017-07-06 21:28:42'),(120,28,NULL,48,'Campaign \"TV (other)\" was removed from project \"Independence1\"','2017-07-06 21:28:51'),(121,28,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Independence1\"','2017-07-06 21:28:51'),(122,28,NULL,48,'Campaign \"Broadcast\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(123,28,NULL,48,'Campaign \"Digital\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(124,28,NULL,48,'Campaign \"Games\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(125,28,NULL,48,'Campaign \"Home Entertainment\" was removed from project \"Independence1\"','2017-07-06 21:28:57'),(126,28,NULL,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 21:29:58'),(127,28,NULL,48,'Campaign \"Trailer\" was added to project \"Independence1\"','2017-07-06 22:28:51'),(128,28,NULL,48,'Campaign \"How\" was added to project \"Independence1\"','2017-07-06 22:29:03'),(129,28,NULL,48,'Campaign \"Home Entertainment\" was added to project \"Independence1\"','2017-07-06 22:29:25'),(130,28,NULL,48,'Campaign \"Streaming\" was added to project \"Independence1\"','2017-07-06 22:29:56'),(131,28,NULL,48,'Campaign \"Other\" was added to project \"Independence1\"','2017-07-06 22:30:52'),(132,28,NULL,48,'Campaign \"Graphics\" was added to project \"Independence1\"','2017-07-06 22:30:59'),(133,28,NULL,48,'Campaign \"Trailer Two\" was added to project \"Independence1\"','2017-07-06 22:31:48'),(134,28,NULL,48,'Campaign \"What\" was added to project \"Independence1\"','2017-07-06 22:31:56'),(135,28,NULL,48,'Campaign \"When\" was added to project \"Independence1\"','2017-07-06 22:31:56'),(136,28,NULL,48,'Campaign \"Who\" was added to project \"Independence1\"','2017-07-06 22:34:03'),(137,28,NULL,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-06 22:34:29'),(138,28,NULL,48,'Campaign \"Teaser\" was removed from project \"Independence1\"','2017-07-06 22:34:43'),(139,28,NULL,48,'Campaign \"Streaming\" was removed from project \"Independence1\"','2017-07-06 22:34:44'),(140,28,NULL,48,'Campaign \"Home Entertainment\" was removed from project \"Independence1\"','2017-07-06 22:34:46'),(141,28,NULL,48,'Campaign \"How\" was removed from project \"Independence1\"','2017-07-06 22:34:48'),(142,28,NULL,48,'Campaign \"Angre\" was removed from project \"Independence1\"','2017-07-06 22:34:51'),(143,28,NULL,48,'Campaign \"Other\" was removed from project \"Independence1\"','2017-07-06 22:34:51'),(144,28,NULL,48,'Campaign \"Graphics\" was removed from project \"Independence1\"','2017-07-06 22:34:54'),(145,28,NULL,48,'Campaign \"Trailer\" was removed from project \"Independence1\"','2017-07-06 22:34:57'),(146,28,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Independence1\"','2017-07-06 22:34:58'),(147,28,NULL,48,'Campaign \"Digital\" was removed from project \"Independence1\"','2017-07-06 22:35:18'),(148,28,NULL,48,'Campaign \"When\" was removed from project \"Independence1\"','2017-07-06 22:35:19'),(149,28,NULL,48,'Campaign \"Who\" was removed from project \"Independence1\"','2017-07-06 22:35:20'),(150,28,NULL,48,'Campaign \"What\" was removed from project \"Independence1\"','2017-07-06 22:35:22'),(151,28,NULL,48,'Campaign \"Trailer Two\" was removed from project \"Independence1\"','2017-07-06 22:35:25'),(152,28,NULL,48,'Campaign \"Teaser\" was added to project \"Independence1\"','2017-07-06 22:36:08'),(153,28,NULL,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 22:36:15'),(154,28,NULL,48,'Spot \"spt1\" was added to \"Teaser\" campaign','2017-07-06 22:39:53'),(155,28,NULL,48,'Spot \"spt2\" was added to \"Teaser\" campaign','2017-07-07 03:21:10'),(156,28,NULL,48,'Spot \"spt3\" was added to \"Teaser\" campaign','2017-07-07 03:28:15'),(157,28,NULL,48,'Spot \"spt4\" was added to \"Teaser\" campaign','2017-07-07 03:35:12'),(158,28,NULL,48,'Spot \"spt5\" was added to \"Teaser\" campaign','2017-07-07 03:37:04'),(159,28,NULL,48,'Spot \"spt5\" was added to \"Teaser\" campaign','2017-07-07 03:37:20'),(160,28,NULL,48,'Spot \"spt6\" was added to \"Teaser\" campaign','2017-07-07 03:38:45'),(161,28,NULL,48,'Spot \"spt1\" was added to \"(:30) TV\" campaign','2017-07-07 03:39:10'),(162,28,NULL,48,'Version \"1\" was added to spot \"spt1\"','2017-07-07 03:42:42'),(168,28,NULL,48,'Version \"1A\" was added to spot \"spt5\"','2017-07-07 15:55:00'),(169,28,NULL,48,'Version \"1B\" was added to spot \"spt5\"','2017-07-07 15:55:43'),(170,28,NULL,48,'Version \"1 Alt\" was added to spot \"spt5\"','2017-07-07 15:55:54'),(171,28,NULL,48,'Version \"1 Rev\" was added to spot \"spt5\"','2017-07-07 18:05:49'),(172,28,NULL,48,'Version \"2A\" was added to spot \"spt5\"','2017-07-07 18:14:28'),(173,28,NULL,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-07 19:27:18'),(174,28,NULL,48,'Spot \"spt1\" was added to \"Digital\" campaign','2017-07-07 19:45:21'),(175,28,NULL,48,'Version \"1\" was added to spot \"spt1\"','2017-07-07 19:53:38'),(176,28,NULL,48,'Campaign \"Why\" was added to project \"Independence1\"','2017-07-07 21:34:56'),(177,28,NULL,48,'Spot \"spt1\" was added to \"Why\" campaign','2017-07-07 21:35:18'),(179,1,NULL,48,'Campaign \"Test\" was added to project \"Babysitter\"','2017-07-10 04:24:44'),(180,1,NULL,48,'Campaign \"Test\" was added to project \"Babysitter\"','2017-07-10 04:24:46'),(181,1,NULL,48,'Spot \"Second spot for Babysitter\" was added to \"(:30) TV\" campaign','2017-07-10 04:26:17'),(182,1,NULL,48,'Version \"1\" was added to spot \"Second spot for Babysi\"','2017-07-10 04:27:52'),(204,1,NULL,48,'Version \"1\" was added to spot \"Puppet Master\"','2017-07-28 11:16:12'),(206,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2017-11-27 11:18:27'),(207,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2017-11-27 11:18:31'),(208,1,NULL,48,'Version \"1 Alt\" was added to spot \"First Spot for Babysit\"','2017-11-27 11:19:43'),(209,1,NULL,48,'Campaign \"Teaser\" was added to project \"Babysitter\"','2017-12-07 09:12:57'),(210,1,NULL,48,'Campaign \"Teaser\" was removed from project \"Babysitter\"','2017-12-07 09:13:46'),(211,1,NULL,48,'Campaign \"Test2\" was added to project \"Babysitter\"','2017-12-07 11:09:16'),(212,1,NULL,48,'Campaign \"Test2\" was removed from project \"Babysitter\"','2017-12-07 11:09:21'),(217,2,NULL,48,'Project \"Before I Wake\" created for client \"Warner Bros.\"','2017-03-15 05:40:56'),(220,3,NULL,48,'Project \"Bravo 14\" created for client \"HBO\"','2018-01-11 15:50:36'),(221,6,NULL,48,'Project \"Jack Reacher 2\" created for client \"Warner Bros.\"','2018-01-11 15:51:25'),(222,5,NULL,48,'Project \"Hearthstone\" created for client \"NBC Universal\"','2018-01-11 15:52:00'),(224,7,NULL,48,'Project \"Lights Out\" created for client \"HBO\"','2018-01-11 15:55:35'),(226,11,NULL,48,'Project \"Silicon Valley\" created for client \"HBO\"','2018-01-11 15:56:57'),(227,14,NULL,48,'Project \"TNT Brand\" created for client \"Warner Bros.\"','2018-01-11 15:57:28'),(228,13,NULL,48,'Project \"Storks\" created for client \"NBC Universal\"','2018-01-11 15:57:53'),(229,16,NULL,48,'Project \"Veep\" was created','2018-01-11 15:58:17'),(230,15,NULL,48,'Project \"What Now\" created for client \"HBO\"','2018-01-11 15:58:42'),(231,1,NULL,48,'Campaign \"Test\" was removed from project \"Babysitter\"','2018-01-14 16:59:23'),(232,1,NULL,48,'Campaign \"Graphics\" was removed from project \"Babysitter\"','2018-01-14 17:16:43'),(233,1,NULL,48,'Campaign \"Test1\" was added to project \"Babysitter\"','2018-01-14 17:20:48'),(234,1,NULL,48,'Campaign \"Test1\" was removed from project \"Babysitter\"','2018-01-14 17:20:54'),(235,1,NULL,48,'Campaign \"Test2\" was added to project \"Babysitter\"','2018-01-14 17:21:06'),(236,1,NULL,48,'Campaign \"Test2\" was removed from project \"Babysitter\"','2018-01-14 17:21:09'),(237,1,NULL,48,'Version \"2\" was removed from spot \"First Spot for Babysit\"','2018-01-15 08:28:43'),(238,1,NULL,48,'Version \"1 Alt\" was removed from spot \"First Spot for Babysit\"','2018-01-15 08:29:54'),(239,1,NULL,48,'Version \"1 Alt\" was added to spot \"First Spot for Babysit\"','2018-01-16 06:40:48'),(240,1,NULL,48,'Version \"2\" was added to spot \"First Spot for Babysit\"','2018-01-16 07:16:38'),(241,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:07:02'),(242,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:07:27'),(243,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:10:57'),(244,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:12:18'),(245,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:12:23'),(246,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:18:04'),(247,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:18:10'),(248,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:18:14'),(249,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:18:18'),(250,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:20:26'),(251,1,NULL,48,'Version \"2\" was added to spot \"Second spot\"','2018-01-16 11:00:14'),(252,1,NULL,48,'Version \"3\" was added to spot \"Second spot\"','2018-01-16 11:00:18'),(253,1,NULL,48,'Spot \"Another spot\" was added to \"(:30) TV\" campaign','2018-01-16 11:02:09'),(254,1,NULL,48,'Version \"2\" was removed from spot \"First Spot\"','2018-01-29 10:33:29'),(255,1,NULL,48,'Version \"2\" was added to spot \"First Spot\"','2018-01-29 10:33:34'),(256,1,NULL,48,'Spot \"Third spot for Babysitter\" was added to \"(:30) TV\" campaign','2018-01-29 17:17:00'),(257,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-03-06 17:44:54'),(258,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-03-06 17:54:47'),(259,45,NULL,48,'Project \"Game of Thrones\" created for client \"HBO\"','2018-03-30 00:14:17'),(260,1,NULL,1,'Project renamed to \"\"Babysitter\" (codename: \"BBY\")\" from \"Babysitter\"','2018-04-02 08:02:49'),(261,1,NULL,1,'Project renamed to \"\"Babysitter\" (codename: \"BAB\")\" from \"Babysitter\"','2018-04-02 11:24:55'),(262,46,NULL,1,'Project \"Project abk\" created for client \"ABC Entertainment\"','2018-04-02 16:55:44'),(263,1,1,48,'Campaign \"Teaser\" was added to project \"Babysitter\"','2018-04-13 05:57:40'),(264,1,4,48,'User \"Mark Lafontant\" was removed from campaign \"(:30) TV\"','2018-04-16 09:09:16'),(265,1,4,48,'User \"Julie Davis\" was removed from campaign \"(:30) TV\"','2018-04-16 09:09:34'),(266,1,4,48,'Editor \"Sample Manager\" was added to campaign \"(:30) TV\"','2018-04-16 10:00:53'),(267,1,4,48,'Editor \"Sample Manager\" was removed from campaign \"(:30) TV\"','2018-04-16 10:01:00'),(268,1,4,48,'Designer \"Katherine Barlow\" was added to campaign \"(:30) TV\"','2018-04-16 10:01:15'),(269,1,4,48,'Designer \"Maxine Renning\" was added to campaign \"(:30) TV\"','2018-04-16 10:01:42'),(270,1,4,48,'Designer \"Maxine Renning\" was removed from campaign \"(:30) TV\"','2018-04-16 10:01:52'),(271,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-16 23:18:35'),(272,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-16 23:18:54'),(273,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-16 23:20:29'),(274,1,NULL,48,'Version \"1\" was added to spot \"Third spot for Babysitter\"','2018-04-17 08:12:23'),(275,1,NULL,48,'Version \"1\" was removed from spot \"Third spot for Babysitter\"','2018-04-17 08:18:35'),(276,1,NULL,48,'Version \"1\" was added to spot \"Third spot for Babysitter\"','2018-04-17 08:18:46'),(277,1,7,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-04-17 12:14:45'),(278,1,7,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-04-17 12:35:57'),(279,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:24:43'),(280,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:24:44'),(281,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:33:40'),(282,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:33:41'),(283,1,4,48,'User \"Macklin Sameth\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-04-18 13:26:37'),(284,1,4,48,'User \"Macklin Sameth\" was added to campaign \"(:30) TV\"','2018-04-18 13:26:37'),(285,1,4,48,'User \"Macklin Sameth\" was changed to \"Graphics Coordinator\" on campaign \"(:30) TV\"','2018-04-18 13:26:49'),(286,1,4,48,'User \"Macklin Sameth\" was added to campaign \"(:30) TV\"','2018-04-18 13:26:49'),(287,15,4,48,'Campaign \"(:30) TV\" was added to project \"What Now\"','2018-04-19 08:24:43'),(288,46,4,48,'Campaign \"(:30) TV\" was added to project \"Project abk\"','2018-04-19 10:39:43'),(289,46,7,1,'Campaign \"Digital\" was added to project \"Project abk\"','2018-04-19 13:38:51'),(290,46,4,1,'Campaign \"(:30) TV\" was removed from project \"Project abk\"','2018-04-19 13:44:18'),(291,46,7,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"Digital\"','2018-04-19 14:03:35'),(292,46,7,1,'User \"JUSTINE TALLY SMITH\" was added to campaign \"Digital\"','2018-04-19 14:03:41'),(293,46,7,1,'User \"MAXWELL ALBORN\" was added to campaign \"Digital\"','2018-04-19 14:03:47'),(294,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-04-24 13:56:21'),(295,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-04-24 13:56:21'),(296,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-25 04:04:45'),(297,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-04-26 17:38:44'),(298,1,4,1,'User \"JOHN FAGAN\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-04-26 17:49:26'),(299,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:26'),(300,1,4,1,'User \"WILLIAM NEIL\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-04-26 17:49:30'),(301,1,4,1,'User \"WILLIAM NEIL\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:30'),(302,1,4,1,'User \"JORDAN MICHAEL GODFREY\" was changed to \"Editorial Manager\" on campaign \"(:30) TV\"','2018-04-26 17:49:32'),(303,1,4,1,'User \"JORDAN MICHAEL GODFREY\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:32'),(304,1,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:43'),(305,1,4,1,'User \"JAMIE ZAKOSKI\" was removed from campaign \"(:30) TV\"','2018-04-26 17:49:49'),(306,1,4,1,'User \"CHRISTINE ADALID\" was removed from campaign \"(:30) TV\"','2018-04-26 17:49:53'),(307,1,4,1,'User \"WILLIAM NEIL\" was removed from campaign \"(:30) TV\"','2018-04-26 17:49:55'),(308,1,4,1,'Billing user \"SOPHIA SISSON\" was added to campaign \"(:30) TV\"','2018-04-26 17:50:54'),(309,1,4,1,'Editor \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-26 17:51:50'),(310,1,4,1,'Editor \"JORDAN MICHAEL GODFREY\" was added to campaign \"(:30) TV\"','2018-04-26 17:51:54'),(311,1,4,1,'Editor \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-04-26 17:51:57'),(312,1,4,1,'Designer \"JULIE DAVIS\" was added to campaign \"(:30) TV\"','2018-04-26 17:52:02'),(313,1,4,1,'User \"JOHN FAGAN\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-04-26 17:52:46'),(314,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-26 17:52:46'),(315,1,4,1,'User \"JOHN FAGAN\" was changed to \"Graphics Coordinator\" on campaign \"(:30) TV\"','2018-04-26 17:52:52'),(316,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-26 17:52:52'),(317,1,NULL,1,'Version \"10\" was added to spot \"\"Busy\"\"','2018-04-26 18:10:19'),(318,1,NULL,1,'Version \"3A\" was added to spot \"\"Busy\"\"','2018-04-26 18:10:23'),(319,1,NULL,1,'Version \"10B\" was added to spot \"Second spot\"','2018-04-26 18:18:33'),(320,16,4,1,'Campaign \"(:30) TV\" was added to project \"Veep\"','2018-04-26 18:38:32'),(321,16,NULL,1,'Project renamed to \"\"Veep\" (codename: \"VPE\")\" from \"Veep\"','2018-04-26 20:47:32'),(322,16,NULL,1,'Project renamed to \"\"Veep\" (codename: \"Code Name\")\" from \"Veep\"','2018-04-26 20:47:46'),(323,16,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:35'),(324,16,4,1,'User \"JULIE DAVIS\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:40'),(325,16,4,1,'User \"JAMIE ZAKOSKI\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-04-30 15:18:44'),(326,16,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:44'),(327,16,4,1,'User \"JULIE DAVIS\" was changed to \"Associate Producer\" on campaign \"(:30) TV\"','2018-04-30 15:18:46'),(328,16,4,1,'User \"JULIE DAVIS\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:46'),(329,1,2,1,'Campaign \"Trailer\" was added to project \"Babysitter\"','2018-05-02 16:46:03'),(330,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-02 16:47:33'),(331,47,NULL,1,'Project \"Annihilation\" created for client \"Paramount\r\n\"','2018-05-03 15:34:28'),(332,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-03 15:34:38'),(333,47,2,1,'Campaign \"Trailer\" was added to project \"Annihilation\"','2018-05-03 15:34:46'),(334,47,71,1,'Campaign \"Test\" was added to project \"Annihilation\"','2018-05-03 15:35:05'),(335,47,4,1,'User \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-05-03 15:58:26'),(336,47,4,1,'User \"ALEXANDRA BATES\" was added to campaign \"(:30) TV\"','2018-05-03 15:58:32'),(337,47,4,1,'Editor \"WILLIAM NEIL\" was added to campaign \"(:30) TV\"','2018-05-03 16:00:04'),(338,47,4,1,'Editor \"JACOB LAWRENCE MOSKOW\" was added to campaign \"(:30) TV\"','2018-05-03 16:01:41'),(339,47,4,1,'Billing user \"MAXWELL ALBORN\" was added to campaign \"(:30) TV\"','2018-05-03 16:07:45'),(340,47,4,1,'Designer \"BRADFORD BERLING\" was added to campaign \"(:30) TV\"','2018-05-03 16:08:08'),(341,47,4,1,'Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"','2018-05-03 16:08:14'),(342,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:08:58'),(343,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:09:23'),(344,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-03 16:09:23'),(345,47,NULL,1,'Spot \"#1 Theory\" was added to \"(:30) TV\" campaign','2018-05-03 16:13:31'),(346,47,NULL,1,'Spot \"#2 Saved\" was added to \"(:30) TV\" campaign','2018-05-03 16:15:31'),(347,47,NULL,1,'Spot \"#3 Need\" was added to \"(:30) TV\" campaign','2018-05-03 16:16:40'),(348,47,NULL,1,'Spot \"#4 Inside\" was added to \"(:30) TV\" campaign','2018-05-03 16:17:03'),(349,47,NULL,1,'Spot \"#5 Threat\" was added to \"(:30) TV\" campaign','2018-05-03 16:17:20'),(350,47,NULL,1,'Spot \"#6 Rescue\" was added to \"(:30) TV\" campaign','2018-05-03 16:17:55'),(351,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(352,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(353,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(354,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(355,47,2,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"Trailer\"','2018-05-03 16:23:47'),(356,47,2,1,'User \"MARIE BYRNES\" was added to campaign \"Trailer\"','2018-05-03 16:23:57'),(357,47,2,1,'Billing user \"JESSICA DADON\" was added to campaign \"Trailer\"','2018-05-03 16:24:25'),(358,47,2,1,'Billing user \"JULIE DAVIS\" was added to campaign \"Trailer\"','2018-05-03 16:24:48'),(359,47,2,1,'Editor \"MEKO WINBUSH\" was added to campaign \"Trailer\"','2018-05-03 16:25:17'),(360,47,2,1,'Designer \"BOBBY SALZANO\" was added to campaign \"Trailer\"','2018-05-03 16:25:30'),(361,47,2,1,'Writing team request was changed on campaign \"Trailer\"','2018-05-03 16:25:46'),(362,47,NULL,1,'Spot \"#1 Interrogation\" was added to \"Trailer\" campaign','2018-05-03 16:26:26'),(363,47,71,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Test\"','2018-05-03 16:32:09'),(364,47,71,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Test\"','2018-05-03 16:32:13'),(365,47,71,1,'Billing user \"TONY FANG\" was added to campaign \"Test\"','2018-05-03 16:32:19'),(366,47,71,1,'Editor \"DANIEL ASMA\" was added to campaign \"Test\"','2018-05-03 16:32:34'),(367,47,71,1,'Editor \"JOHN ONEIL\" was added to campaign \"Test\"','2018-05-03 16:32:43'),(368,47,71,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Test\"','2018-05-03 16:45:05'),(369,47,71,1,'Designer \"JONATHAN REYES\" was added to campaign \"Test\"','2018-05-03 16:45:15'),(370,47,71,1,'Music team request was changed on campaign \"Test\"','2018-05-03 16:45:24'),(371,47,71,1,'Music team request was changed on campaign \"Test\"','2018-05-03 16:45:32'),(372,47,71,1,'Writing team request was changed on campaign \"Test\"','2018-05-03 16:45:33'),(373,47,NULL,1,'Spot \"#1 Reason\" was added to \"Test\" campaign','2018-05-03 16:46:04'),(374,47,NULL,1,'Spot \"#2 Creation\" was added to \"Test\" campaign','2018-05-03 16:46:22'),(375,47,NULL,1,'Spot \"#3 Everywhere\" was added to \"Test\" campaign','2018-05-03 16:47:48'),(376,47,NULL,1,'Spot \"#4 Need\" was added to \"Test\" campaign','2018-05-03 16:48:38'),(377,47,NULL,1,'Spot \"#3 Everywhere\" was added to \"Test\" campaign','2018-05-03 16:49:33'),(378,47,NULL,1,'Spot \"#5 Succeed/YouTube\" was added to \"Test\" campaign','2018-05-03 17:21:25'),(379,47,NULL,1,'Version \"1\" was added to spot \"#1 Theory\"','2018-05-11 03:28:39'),(380,47,NULL,1,'Version \"1\" was removed from spot \"#1 Theory\"','2018-05-11 03:32:55'),(381,47,NULL,1,'Spot \"Test\" was added to \"Trailer\" campaign','2018-05-11 05:00:08'),(382,47,NULL,1,'Version \"1\" was added to spot \"#1 Theory\"','2018-05-11 13:03:40'),(383,47,NULL,1,'Version \"1 Alt\" was added to spot \"#1 Theory\"','2018-05-11 13:03:41'),(384,47,NULL,1,'Version \"2\" was added to spot \"#1 Theory\"','2018-05-11 13:03:44'),(385,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:02'),(386,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:02'),(387,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:03'),(388,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:03'),(389,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(390,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(391,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(392,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(393,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:18'),(394,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:18'),(395,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:47'),(396,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:47'),(397,47,NULL,1,'Spot \"New test spot\" was added to \"(:30) TV\" campaign','2018-05-14 06:45:06'),(398,5,6,1,'Campaign \"Home Entertainment\" was added to project \"Hearthstone\"','2018-05-14 14:01:42'),(399,5,NULL,1,'Spot \"test\" was added to \"Home Entertainment\" campaign','2018-05-14 14:05:21'),(400,5,NULL,1,'Spot \"abc\" was added to \"Home Entertainment\" campaign','2018-05-14 14:08:24'),(401,47,NULL,1,'Spot \"Test\" was added to \"(:30) TV\" campaign','2018-05-14 23:34:23'),(402,47,NULL,1,'Spot \"Test2\" was added to \"(:30) TV\" campaign','2018-05-14 23:38:42'),(403,47,71,1,'Music team request was changed on campaign \"Test\"','2018-05-16 16:17:51'),(404,47,71,1,'Writing team request was changed on campaign \"Test\"','2018-05-16 16:17:51'),(405,47,1,1,'Campaign \"Teaser\" was added to project \"Annihilation\"','2018-05-16 16:27:10'),(406,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-16 16:34:06'),(407,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-16 16:34:06'),(408,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-05-16 16:35:06'),(409,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:40:33'),(410,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:40:33'),(411,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:46'),(412,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:46'),(413,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:47'),(414,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:47'),(415,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:49'),(416,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:49'),(417,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:50'),(418,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:50'),(419,47,4,1,'Billing user \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-05-17 19:47:34'),(420,47,4,1,'Billing user \"MAXWELL ALBORN\" was removed from campaign \"(:30) TV\"','2018-05-17 19:47:50'),(421,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:09'),(422,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:09'),(423,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:45'),(424,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:45'),(425,47,NULL,1,'Version \"3\" was added to spot \"#1 Theory\"','2018-05-17 20:04:31'),(426,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:09:20'),(427,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:17:20'),(428,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:18:22'),(429,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:18:22'),(430,49,NULL,1,'Project \"Aquaman - Massey\" (codename: \"Ahab\") created for client \"Warner Bros.\"','2018-05-18 13:16:37'),(431,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman - Massey\"','2018-05-18 13:17:29'),(432,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman - Massey\"','2018-05-18 13:18:53'),(433,49,4,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"(:30) TV\"','2018-05-18 14:44:15'),(434,49,4,1,'Designer \"MEGAN LAUREN YOON\" was removed from campaign \"(:30) TV\"','2018-05-18 14:44:26'),(435,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman - Massey\"','2018-05-24 16:13:55'),(436,47,4,1,'User \"ALEXANDRA BATES\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-05-24 16:30:03'),(437,47,4,1,'User \"ALEXANDRA BATES\" was added to campaign \"(:30) TV\"','2018-05-24 16:30:03'),(438,47,4,1,'User \"MARK LAFONTANT\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-05-24 16:30:08'),(439,47,4,1,'User \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-05-24 16:30:09'),(440,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-24 16:48:24'),(441,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-24 16:48:24'),(442,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-24 16:53:20'),(443,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-24 16:53:20'),(444,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-24 18:08:34'),(445,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-24 18:08:34'),(446,47,4,1,'Editor \"KELLI GRIGGS\" was added to campaign \"(:30) TV\"','2018-05-24 18:13:12'),(447,47,4,1,'Editor \"JUSTINE TALLY SMITH\" was added to campaign \"(:30) TV\"','2018-05-24 18:13:15'),(448,47,4,1,'Editor \"JUSTINE TALLY SMITH\" was removed from campaign \"(:30) TV\"','2018-05-24 18:13:23'),(449,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-05-28 08:39:38'),(450,47,7,1,'Campaign \"Digital\" was removed from project \"Annihilation\"','2018-05-28 08:40:23'),(451,47,68,1,'Campaign \"Why\" was removed from project \"Annihilation\"','2018-05-28 08:51:33'),(452,47,NULL,1,'Version \"3\" was removed from spot \"#1 Theory\"','2018-05-28 09:20:59'),(453,47,NULL,1,'Version \"2\" was removed from spot \"#1 Theory\"','2018-05-28 09:21:01'),(454,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-05-28 11:21:13'),(455,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:32'),(456,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:32'),(457,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:55'),(458,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:55'),(459,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 08:15:47'),(460,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-05-29 08:17:13'),(461,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 08:20:43'),(462,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-05-29 08:21:56'),(463,47,2,1,'Campaign \"Trailer\" was added to project \"Annihilation\"','2018-05-29 09:51:35'),(464,47,2,1,'Campaign \"Trailer\" was added to project \"Annihilation\"','2018-05-29 13:29:21'),(465,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 15:19:01'),(466,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 16:13:59'),(467,47,1,1,'Campaign \"Teaser\" was removed from project \"Annihilation\"','2018-05-30 08:21:22'),(468,47,7,1,'Campaign \"Digital\" was removed from project \"Annihilation\"','2018-05-30 08:21:24'),(469,47,68,1,'Campaign \"Why\" was removed from project \"Annihilation\"','2018-05-30 08:21:27'),(470,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-31 09:02:43'),(471,49,NULL,1,'Spot \"Water\" was added to \"(:30) TV\" campaign','2018-06-05 13:05:36'),(472,49,NULL,1,'Spot \"Agua\" was added to \"(:30) TV\" campaign','2018-06-05 13:07:01'),(473,49,NULL,1,'Spot \"eau\" was added to \"(:30) TV\" campaign','2018-06-05 13:09:50'),(474,49,NULL,1,'Spot \"Acqua\" was added to \"(:30) TV\" campaign','2018-06-05 13:11:17'),(475,49,NULL,1,'Version \"1\" was added to spot \"Acqua\"','2018-06-05 13:14:08'),(476,49,NULL,1,'Version \"2\" was added to spot \"Acqua\"','2018-06-05 13:14:18'),(477,49,NULL,1,'Version \"1\" was added to spot \"Water\"','2018-06-05 13:16:07'),(478,49,NULL,1,'Version \"2\" was added to spot \"Water\"','2018-06-05 13:16:10'),(479,49,NULL,1,'Version \"2\" was removed from spot \"Water\"','2018-06-05 13:16:29'),(480,49,NULL,1,'Spot \"Mizu\" was added to \"(:30) TV\" campaign','2018-06-05 13:21:30'),(481,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman - Massey\"','2018-06-05 19:48:06'),(482,49,7,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Digital\"','2018-06-06 13:27:33'),(483,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:34:34'),(484,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:11'),(485,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:18'),(486,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:35'),(487,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:43'),(488,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:36:16'),(489,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman - Massey\"','2018-06-06 13:36:29'),(490,49,1,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Teaser\"','2018-06-06 13:47:06'),(491,49,1,1,'Designer \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-06 13:47:11'),(492,49,1,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Teaser\"','2018-06-06 13:47:16'),(493,49,1,1,'Editor \"DAVID CREAL\" was added to campaign \"Teaser\"','2018-06-06 13:47:22'),(494,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-06 13:48:07'),(495,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-06 13:48:35'),(496,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-06 13:48:35'),(497,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-06 13:48:38'),(498,49,NULL,1,'Project renamed to \"\"Aquaman\" (codename: \"Ahab\")\" from \"Aquaman - Massey\"','2018-06-06 13:49:11'),(499,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman\"','2018-06-06 17:21:21'),(500,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-06 17:26:40'),(501,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-06 17:27:04'),(502,50,NULL,1,'Project \"Demo project1\" (codename: \"demo1\") created for client \"National Amusements\r\n\"','2018-06-07 13:02:53'),(503,50,4,1,'Campaign \"(:30) TV\" was added to project \"Demo project1\"','2018-06-07 13:03:07'),(504,50,6,1,'Campaign \"Home Entertainment\" was added to project \"Demo project1\"','2018-06-07 13:03:19'),(505,50,1,1,'Campaign \"Teaser\" was added to project \"Demo project1\"','2018-06-07 13:03:35'),(506,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-07 17:23:58'),(507,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-07 17:34:54'),(508,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-07 17:35:01'),(509,49,7,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Digital\"','2018-06-12 18:25:13'),(510,49,7,1,'Designer \"BETH ROY\" was added to campaign \"Digital\"','2018-06-12 18:25:14'),(511,49,NULL,1,'Spot \"Master\" was added to \"Teaser\" campaign','2018-06-12 20:26:54'),(512,49,70,1,'Campaign \"How\" was added to project \"Aquaman\"','2018-06-13 00:27:40'),(513,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-13 00:28:14'),(514,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-06-13 00:30:46'),(515,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-06-13 00:31:56'),(516,47,7,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Digital\"','2018-06-13 16:29:33'),(517,47,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-13 16:29:36'),(518,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-13 16:39:14'),(519,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman\"','2018-06-14 18:03:49'),(520,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-14 18:06:42'),(521,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-14 18:06:42'),(522,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-14 18:13:49'),(523,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-14 18:13:49'),(524,49,4,1,'User \"ASHLEY CAPUTO\" was added to campaign \"(:30) TV\"','2018-06-14 18:18:02'),(525,49,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-06-14 18:18:26'),(526,49,4,1,'Billing user \"ASHLEY CAPUTO\" was added to campaign \"(:30) TV\"','2018-06-14 18:21:19'),(527,49,4,1,'Editor \"DAVID CREAL\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:14'),(528,49,4,1,'Editor \"WESLEY NISBETT\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:25'),(529,49,4,1,'Editor \"BRYAN COLEMAN\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:31'),(530,49,4,1,'Designer \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:52'),(531,49,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-14 18:25:08'),(532,51,NULL,1,'Project \"Godzilla 2\" (codename: \"Fathom\") created for client \"Warner Bros.\"','2018-06-14 19:11:45'),(533,51,NULL,1,'Project renamed to \"\"Godzilla 2\" (codename: \"Fathom\")\" from \"Godzilla 2\"','2018-06-14 19:12:21'),(534,51,68,1,'Campaign \"Why\" was added to project \"Godzilla 2\"','2018-06-14 19:14:48'),(535,51,73,1,'Campaign \"Comicon\" was added to project \"Godzilla 2\"','2018-06-14 19:16:07'),(536,51,73,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Comicon\"','2018-06-14 19:37:26'),(537,51,73,1,'User \"ANDREW FARBER\" was added to campaign \"Comicon\"','2018-06-14 19:37:35'),(538,51,73,1,'User \"BETH ROY\" was added to campaign \"Comicon\"','2018-06-14 19:38:29'),(539,51,73,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"Comicon\"','2018-06-14 19:38:56'),(540,51,73,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Comicon\"','2018-06-14 19:40:26'),(541,51,73,1,'Editor \"DAVID CREAL\" was added to campaign \"Comicon\"','2018-06-14 19:40:38'),(542,51,73,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Comicon\"','2018-06-14 19:41:33'),(543,51,73,1,'Designer \"DAWN CHENETTE\" was added to campaign \"Comicon\"','2018-06-14 19:41:37'),(544,51,NULL,1,'Spot \"Tears\" was added to \"Comicon\" campaign','2018-06-14 19:51:11'),(545,51,4,1,'Campaign \"(:30) TV\" was added to project \"Godzilla 2\"','2018-06-14 19:57:26'),(546,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:15'),(547,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:16'),(548,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:17'),(549,51,4,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:25'),(550,51,4,1,'Editor \"DAVID CREAL\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:30'),(551,51,4,1,'Editor \"WESLEY NISBETT\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:30'),(552,51,4,1,'Designer \"DAWN CHENETTE\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:36'),(553,51,4,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:37'),(554,51,4,1,'Campaign \"(:30) TV\" was added to project \"Godzilla 2\"','2018-06-15 17:29:04'),(555,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-15 17:29:27'),(556,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-15 17:29:27'),(557,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-15 17:29:28'),(558,49,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-15 17:38:03'),(559,49,1,1,'User \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-15 20:12:50'),(560,49,1,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Teaser\"','2018-06-15 20:12:51'),(561,49,1,1,'User \"DAVID LIGORNER\" was added to campaign \"Teaser\"','2018-06-15 20:12:52'),(562,52,NULL,1,'Project \"The Muppets\" (codename: \"Parts\") created for client \"Disney\r\n\"','2018-06-19 17:17:29'),(563,52,1,1,'Campaign \"Teaser\" was added to project \"The Muppets\"','2018-06-19 17:19:12'),(564,52,1,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Teaser\"','2018-06-19 17:20:15'),(565,52,1,1,'Billing user \"KRYSTLE OPPENHEIMER\" was added to campaign \"Teaser\"','2018-06-19 17:20:51'),(566,52,1,1,'Editor \"STEVEN PINTO\" was added to campaign \"Teaser\"','2018-06-19 17:21:00'),(567,52,1,1,'Editor \"ULRICH SCHLEGEL\" was added to campaign \"Teaser\"','2018-06-19 17:21:09'),(568,52,1,1,'Designer \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-19 17:21:38'),(569,NULL,NULL,1,'Version \"1 Test\" was added to spot \"Master\"','2018-06-20 07:28:19'),(570,49,1,1,'Version \"2\" was added to spot \"Master\"','2018-06-22 17:29:32'),(571,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman\"','2018-06-22 17:38:09'),(572,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman\"','2018-06-22 17:39:49'),(573,47,NULL,1,'Spot \":15 TV Blue\" was added to \"(:30) TV\" campaign','2018-06-22 17:48:52'),(574,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-06-22 17:49:11'),(575,49,4,1,'Billing user \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-06-22 18:52:59'),(576,49,4,1,'Version \"2\" was added to spot \"Water\"','2018-06-22 18:55:44'),(577,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman\"','2018-06-22 19:16:42'),(578,49,NULL,1,'Spot \"Doran spot 1\" was added to \"Digital\" campaign','2018-06-22 19:18:33'),(579,49,7,1,'Version \"1\" was added to spot \"Doran spot 1\"','2018-06-22 19:18:39'),(580,49,NULL,1,'Spot \"Brodner Spot 1\" was added to \"Digital\" campaign','2018-06-22 19:19:09'),(581,49,NULL,1,'Spot \"Brodner Spot 2\" was added to \"Digital\" campaign','2018-06-22 19:19:42'),(582,49,NULL,1,'Spot \"New Spot\" was added to \"Digital\" campaign','2018-06-22 19:20:40'),(583,49,7,1,'Version \"1\" was added to spot \"New Spot\"','2018-06-22 19:20:47'),(584,49,7,1,'Version \"1\" was added to spot \"Brodner Spot 2\"','2018-06-22 19:20:57'),(585,49,7,1,'Version \"1\" was added to spot \"Brodner Spot 1\"','2018-06-22 19:21:07'),(586,49,NULL,1,'Spot \"Tracy\" was added to \"Digital\" campaign','2018-06-22 19:23:01'),(587,49,7,1,'Version \"2\" was added to spot \"Brodner Spot 2/Lyle took over\"','2018-06-22 19:30:52'),(588,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-22 19:41:12'),(589,49,4,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"(:30) TV\"','2018-06-22 20:05:36'),(590,49,4,1,'Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"','2018-06-22 20:05:39'),(591,49,4,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"(:30) TV\"','2018-06-22 20:05:47'),(592,49,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-06-22 20:07:21'),(593,49,1,1,'Version \"2\" was removed from spot \"Master\"','2018-06-23 00:05:13'),(594,49,1,1,'User \"DAVID LIGORNER\" was removed from campaign \"Teaser\"','2018-06-25 07:44:15'),(595,49,1,1,'User \"ASHLEY CAPUTO\" was changed to \"Producer\" on campaign \"Teaser\"','2018-06-25 07:44:21'),(596,49,1,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Teaser\"','2018-06-25 07:44:21'),(597,49,4,1,'User \"BETH ROY\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-06-25 09:40:00'),(598,49,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-25 09:40:00'),(599,52,1,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Producer\" on campaign \"Teaser\"','2018-06-26 13:10:43'),(600,52,1,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Teaser\"','2018-06-26 13:10:43'),(601,49,1,1,'User \"EUGENE FILLIOS\" was added to campaign \"Teaser\"','2018-06-26 13:11:25'),(602,49,1,1,'User \"EUGENE FILLIOS\" was changed to \"Lead Producer\" on campaign \"Teaser\"','2018-06-26 13:11:27'),(603,49,1,1,'User \"EUGENE FILLIOS\" was added to campaign \"Teaser\"','2018-06-26 13:11:27'),(604,49,1,1,'User \"ASHLEY CAPUTO\" was removed from campaign \"Teaser\"','2018-06-26 13:11:32'),(605,49,1,1,'User \"ANGELIQUE BENSON\" was added to campaign \"Teaser\"','2018-06-26 13:11:43'),(606,49,1,1,'User \"ANGELIQUE BENSON\" was changed to \"Associate Producer\" on campaign \"Teaser\"','2018-06-26 13:11:46'),(607,49,1,1,'User \"ANGELIQUE BENSON\" was added to campaign \"Teaser\"','2018-06-26 13:11:46'),(608,49,1,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"Teaser\"','2018-06-26 13:11:52'),(609,49,1,1,'User \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-26 13:11:52'),(610,49,4,1,'User \"DAVID LIGORNER\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-06-26 13:12:12'),(611,49,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-06-26 13:12:12'),(612,49,4,1,'User \"MACKLIN SAMETH\" was changed to \"Associate Producer\" on campaign \"(:30) TV\"','2018-06-26 13:12:16'),(613,49,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-06-26 13:12:16'),(614,49,4,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-06-26 13:12:25'),(615,49,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-26 13:12:25'),(616,49,4,1,'User \"ASHLEY CAPUTO\" was removed from campaign \"(:30) TV\"','2018-06-26 13:12:27'),(617,49,7,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"Digital\"','2018-06-26 13:12:51'),(618,49,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-26 13:12:51'),(619,49,2,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Trailer\"','2018-06-26 13:13:10'),(620,49,2,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"Trailer\"','2018-06-26 13:13:12'),(621,49,2,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Trailer\"','2018-06-26 13:13:12'),(622,49,2,1,'User \"ANDREW FARBER\" was added to campaign \"Trailer\"','2018-06-26 13:13:17'),(623,49,2,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"Trailer\"','2018-06-26 13:13:21'),(624,49,2,1,'User \"ANDREW FARBER\" was added to campaign \"Trailer\"','2018-06-26 13:13:21'),(625,51,73,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"Comicon\"','2018-06-26 13:13:45'),(626,51,73,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Comicon\"','2018-06-26 13:13:45'),(627,51,73,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"Comicon\"','2018-06-26 13:13:49'),(628,51,73,1,'User \"BETH ROY\" was added to campaign \"Comicon\"','2018-06-26 13:13:49'),(629,51,73,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"Comicon\"','2018-06-26 13:13:54'),(630,51,73,1,'User \"ANDREW FARBER\" was added to campaign \"Comicon\"','2018-06-26 13:13:54'),(631,51,4,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-06-26 13:14:13'),(632,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-26 13:14:13'),(633,51,4,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-06-26 13:14:19'),(634,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-26 13:14:19'),(635,51,4,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-06-26 13:14:26'),(636,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-26 13:14:26'),(637,51,4,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-06-26 13:32:16'),(638,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-26 13:32:16'),(639,51,4,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-06-26 13:32:24'),(640,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-26 13:32:24'),(641,51,4,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-06-26 13:32:27'),(642,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-26 13:32:27'),(643,47,4,1,'Version \"1\" was added to spot \"#2 Saved\"','2018-06-26 13:37:23'),(644,51,73,1,'Version \"1\" was added to spot \"Tears\"','2018-06-26 13:39:33'),(645,51,NULL,1,'Spot \"Brodner Spot 1\" was added to \"(:30) TV\" campaign','2018-06-26 13:45:03'),(646,51,4,1,'Version \"1\" was added to spot \"Brodner Spot 1\"','2018-06-26 13:45:11'),(647,51,NULL,1,'Spot \"Creal Spot 1\" was added to \"(:30) TV\" campaign','2018-06-26 13:46:11'),(648,51,4,1,'Version \"1\" was added to spot \"Creal Spot 1\"','2018-06-26 13:46:15'),(649,51,NULL,1,'Spot \"Schlegs Spot 1\" was added to \"(:30) TV\" campaign','2018-06-26 13:49:25'),(650,51,4,1,'Version \"1\" was added to spot \"Schlegs Spot 1\"','2018-06-26 13:49:30'),(651,51,NULL,1,'Spot \"Brodner Spot 2\" was added to \"(:30) TV\" campaign','2018-06-26 13:53:36'),(652,51,4,1,'Version \"1\" was added to spot \"Brodner Spot 2\"','2018-06-26 13:54:15'),(653,51,4,1,'Version \"1ARev\" was added to spot \"Creal Spot 1\"','2018-06-26 14:05:18'),(654,51,4,1,'Version \"1BRev\" was added to spot \"Creal Spot 1\"','2018-06-26 14:05:42'),(655,51,4,1,'Version \"2Rev\" was added to spot \"Schlegs Spot 1\"','2018-06-26 14:06:44'),(656,51,4,1,'Version \"2A Rev\" was added to spot \"Schlegs Spot 1\"','2018-06-26 14:09:00'),(657,51,73,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"Comicon\"','2018-06-26 17:05:20'),(658,51,73,1,'Version \"21A\" was added to spot \"Tears\"','2018-06-26 19:19:39'),(659,51,4,1,'Version \"2\" was added to spot \"Brodner Spot 1\"','2018-06-27 16:26:21'),(660,51,7,1,'Campaign \"Digital\" was added to project \"Godzilla 2\"','2018-06-27 19:12:38'),(661,51,7,1,'User \"ANDREW FARBER\" was added to campaign \"Digital\"','2018-06-27 19:12:51'),(662,51,7,1,'User \"BETH ROY\" was added to campaign \"Digital\"','2018-06-27 19:12:52'),(663,51,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-27 19:12:53'),(664,51,7,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-27 19:13:57'),(665,51,7,1,'Editor \"DAVID CREAL\" was added to campaign \"Digital\"','2018-06-27 19:14:03'),(666,51,7,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Digital\"','2018-06-27 19:14:04'),(667,51,7,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"Digital\"','2018-06-27 19:14:11'),(668,51,7,1,'Designer \"DAWN CHENETTE\" was added to campaign \"Digital\"','2018-06-27 19:14:15'),(669,51,7,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Digital\"','2018-06-27 19:14:16'),(670,51,73,1,'Version \"20B\" was added to spot \"Tears\"','2018-06-29 11:05:55'),(671,51,73,1,'Version \"21C\" was added to spot \"Tears\"','2018-06-29 12:08:00'),(672,53,NULL,1,'Project \"Shazam\" (codename: \"Franklin\") created for client \"Warner Bros.\"','2018-07-06 18:09:38'),(673,53,73,1,'Campaign \"Comicon\" was added to project \"Shazam\"','2018-07-06 18:10:02'),(674,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 18:54:39'),(675,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-06 18:54:49'),(676,53,73,1,'User \"DAVID LIGORNER\" was changed to \"Lead Producer\" on campaign \"Comicon\"','2018-07-06 18:54:53'),(677,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 18:54:53'),(678,53,73,1,'User \"MACKLIN SAMETH\" was changed to \"Associate Producer\" on campaign \"Comicon\"','2018-07-06 18:55:05'),(679,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-06 18:55:05'),(680,53,73,1,'Billing user \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 18:55:22'),(681,53,73,1,'Editor \"DAVID CREAL\" was added to campaign \"Comicon\"','2018-07-06 18:56:19'),(682,53,73,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Comicon\"','2018-07-06 18:57:25'),(683,53,73,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"Comicon\"','2018-07-06 18:57:44'),(684,53,73,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Comicon\"','2018-07-06 18:58:56'),(685,53,73,1,'Designer \"MARY ELIZABETH COX\" was added to campaign \"Comicon\"','2018-07-06 18:59:48'),(686,53,73,1,'Designer \"SARAH SHAE HALAS WERBER\" was added to campaign \"Comicon\"','2018-07-06 19:00:19'),(687,53,73,1,'Designer \"SARAH SHAE HALAS WERBER\" was removed from campaign \"Comicon\"','2018-07-06 19:00:29'),(688,53,NULL,1,'Spot \"Power Outage\" was added to \"Comicon\" campaign','2018-07-06 19:03:10'),(689,53,73,1,'Campaign \"Comicon\" was added to project \"Shazam\"','2018-07-06 19:03:21'),(690,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-06 19:04:45'),(691,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 19:04:46'),(692,53,73,1,'Billing user \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 19:04:53'),(693,53,73,1,'Editor \"DAVID CREAL\" was added to campaign \"Comicon\"','2018-07-06 19:05:02'),(694,53,73,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Comicon\"','2018-07-06 19:05:10'),(695,53,73,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Comicon\"','2018-07-06 19:05:11'),(696,53,73,1,'Designer \"MARY ELIZABETH COX\" was added to campaign \"Comicon\"','2018-07-06 19:05:12'),(697,53,73,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"Comicon\"','2018-07-06 19:05:13'),(698,53,NULL,1,'Spot \"Blitz\" was added to \"Comicon\" campaign','2018-07-06 19:07:40'),(699,53,73,1,'Version \"1\" was added to spot \"Power Outage\"','2018-07-06 19:14:43'),(700,51,NULL,1,'Spot \"Fears\" was added to \"Comicon\" campaign','2018-07-06 19:50:27'),(701,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-24 18:33:04'),(702,53,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-07-24 18:33:16'),(703,53,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-07-24 18:33:17'),(704,53,4,1,'User \"MACKLIN SAMETH\" was removed from campaign \"(:30) TV\"','2018-07-24 18:33:46'),(705,53,4,1,'User \"DAVID LIGORNER\" was removed from campaign \"(:30) TV\"','2018-07-24 18:33:48'),(706,53,73,1,'User \"MACKLIN SAMETH\" was changed to \"Associate Producer\" on campaign \"Comicon\"','2018-07-24 18:34:09'),(707,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-24 18:34:09'),(708,53,73,1,'User \"DAVID LIGORNER\" was changed to \"Lead Producer\" on campaign \"Comicon\"','2018-07-24 18:34:12'),(709,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-24 18:34:12'),(710,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-24 18:34:27'),(711,53,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-07-24 18:34:38'),(712,53,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-07-24 18:34:39'),(713,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-24 18:37:22'),(714,53,NULL,1,'Spot \"Red\" was added to \"(:30) TV\" campaign','2018-07-24 18:40:02'),(715,53,4,1,'Version \"1\" was added to spot \"Red\"','2018-07-24 18:40:09'),(716,53,NULL,1,'Spot \"Green\" was added to \"(:30) TV\" campaign','2018-07-24 18:40:25'),(717,53,4,1,'Version \"1\" was added to spot \"Green\"','2018-07-24 18:40:30'),(718,53,4,1,'Version \"2alt\" was added to spot \"Red\"','2018-07-24 18:53:29'),(719,53,4,1,'Version \"2alt\" was removed from spot \"Red\"','2018-07-24 18:53:48'),(720,53,4,1,'Version \"2alt\" was added to spot \"Red\"','2018-07-24 18:54:02'),(721,53,4,1,'Version \"2\" was added to spot \"Red\"','2018-07-24 18:54:10'),(722,53,4,1,'Version \"2A Rev 2\" was added to spot \"Red\"','2018-07-24 18:54:47'),(723,53,4,1,'Version \"2A Rev 3\" was added to spot \"Red\"','2018-07-24 18:55:05'),(724,53,4,1,'Version \"2A Rev 4\" was added to spot \"Red\"','2018-07-24 18:55:26'),(725,53,4,1,'Version \"3ARev2\" was added to spot \"Red\"','2018-07-24 19:00:47'),(726,53,NULL,1,'Spot \"Blue\" was added to \"(:30) TV\" campaign','2018-07-24 19:26:48'),(727,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-25 14:41:12'),(728,54,NULL,1,'Project \"Wreck It Ralph 2\" (codename: \"Popcorn\") created for client \"Disney\r\n\"','2018-07-26 16:51:49'),(729,54,2,1,'Campaign \"Trailer\" was added to project \"Wreck It Ralph 2\"','2018-07-26 16:52:01'),(730,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 16:52:44'),(731,54,2,1,'Billing user \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 16:52:52'),(732,54,2,1,'Editor \"STEVEN PINTO\" was added to campaign \"Trailer\"','2018-07-26 16:53:00'),(733,54,2,1,'Designer \"DAWN CHENETTE\" was added to campaign \"Trailer\"','2018-07-26 16:53:06'),(734,54,2,1,'Designer \"BOBBY SALZANO\" was added to campaign \"Trailer\"','2018-07-26 16:53:21'),(735,54,2,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Trailer\"','2018-07-26 16:53:27'),(736,54,2,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"Trailer\"','2018-07-26 16:53:35'),(737,54,NULL,1,'Spot \"Unbelievable\" was added to \"Trailer\" campaign','2018-07-26 16:54:54'),(738,54,2,1,'Version \"1\" was added to spot \"Unbelievable\"','2018-07-26 16:55:00'),(739,54,2,1,'Version \"1 Rev\" was added to spot \"Unbelievable\"','2018-07-26 16:55:04'),(740,54,2,1,'Version \"2\" was added to spot \"Unbelievable\"','2018-07-26 16:55:37'),(741,54,2,1,'Version \"2alt\" was added to spot \"Unbelievable\"','2018-07-26 16:55:48'),(742,54,2,1,'Version \"2altrev\" was added to spot \"Unbelievable\"','2018-07-26 16:56:07'),(743,54,2,1,'Version \"2Rev\" was added to spot \"Unbelievable\"','2018-07-26 16:56:21'),(744,54,2,1,'Version \"3\" was added to spot \"Unbelievable\"','2018-07-26 16:56:34'),(745,54,2,1,'Version \"4\" was added to spot \"Unbelievable\"','2018-07-26 16:56:41'),(746,54,2,1,'Version \"4 Alt\" was added to spot \"Unbelievable\"','2018-07-26 16:56:45'),(747,54,2,1,'Version \"5\" was added to spot \"Unbelievable\"','2018-07-26 16:56:56'),(748,54,2,1,'Version \"5 Alt\" was added to spot \"Unbelievable\"','2018-07-26 16:56:59'),(749,54,2,1,'Version \"6\" was added to spot \"Unbelievable\"','2018-07-26 16:57:08'),(750,54,2,1,'Version \"6 Rev\" was added to spot \"Unbelievable\"','2018-07-26 16:57:27'),(751,54,2,1,'Version \"7\" was added to spot \"Unbelievable\"','2018-07-26 16:57:34'),(752,54,2,1,'Version \"2alt\" was removed from spot \"Unbelievable\"','2018-07-26 17:02:26'),(753,54,2,1,'Version \"2altrev\" was removed from spot \"Unbelievable\"','2018-07-26 17:02:35'),(754,54,2,1,'Version \"2Rev\" was removed from spot \"Unbelievable\"','2018-07-26 17:06:07'),(755,54,2,1,'Version \"3 Alt\" was added to spot \"Unbelievable\"','2018-07-26 17:06:29'),(756,54,2,1,'Version \"5 Alt2\" was added to spot \"Unbelievable\"','2018-07-26 17:07:59'),(757,54,2,1,'Version \"5 Alt3\" was added to spot \"Unbelievable\"','2018-07-26 17:08:32'),(758,54,2,1,'Version \"6 Rev\" was removed from spot \"Unbelievable\"','2018-07-26 17:08:41'),(759,54,2,1,'Version \"8\" was added to spot \"Unbelievable\"','2018-07-26 17:08:50'),(760,54,NULL,1,'Spot \"Searching\" was added to \"Trailer\" campaign','2018-07-26 17:16:28'),(761,54,2,1,'Version \"1\" was added to spot \"Searching\"','2018-07-26 17:17:42'),(762,54,2,1,'Version \"1 Alt\" was added to spot \"Searching\"','2018-07-26 17:17:47'),(763,54,2,1,'Version \"2\" was added to spot \"Searching\"','2018-07-26 17:17:51'),(764,54,2,1,'Version \"2 Alt\" was added to spot \"Searching\"','2018-07-26 17:17:54'),(765,54,2,1,'Version \"2 Rev\" was added to spot \"Searching\"','2018-07-26 17:18:02'),(766,54,2,1,'Version \"2 AltRev\" was added to spot \"Searching\"','2018-07-26 17:18:47'),(767,54,2,1,'Version \"3\" was added to spot \"Searching\"','2018-07-26 17:18:59'),(768,54,2,1,'Version \"4\" was added to spot \"Searching\"','2018-07-26 17:19:05'),(769,54,2,1,'Version \"4 Alt\" was added to spot \"Searching\"','2018-07-26 17:19:11'),(770,54,2,1,'Version \"5\" was added to spot \"Searching\"','2018-07-26 17:20:56'),(771,54,2,1,'Version \"5 Alt\" was added to spot \"Searching\"','2018-07-26 17:21:03'),(772,54,2,1,'Version \"6\" was added to spot \"Searching\"','2018-07-26 17:21:10'),(773,54,2,1,'Version \"6 Alt\" was added to spot \"Searching\"','2018-07-26 17:21:14'),(774,54,2,1,'Version \"6 Alt\" was removed from spot \"Searching\"','2018-07-26 17:21:23'),(775,54,2,1,'Version \"6 Rev\" was added to spot \"Searching\"','2018-07-26 17:21:30'),(776,54,2,1,'Version \"7\" was added to spot \"Searching\"','2018-07-26 17:21:37'),(777,54,2,1,'Version \"8\" was added to spot \"Searching\"','2018-07-26 17:21:42'),(778,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Lead Producer\" on campaign \"Trailer\"','2018-07-26 17:22:41'),(779,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 17:22:41'),(780,54,2,1,'User \"MARK LAFONTANT\" was added to campaign \"Trailer\"','2018-07-26 17:22:48'),(781,54,2,1,'User \"MARK LAFONTANT\" was changed to \"Producer\" on campaign \"Trailer\"','2018-07-26 17:22:51'),(782,54,2,1,'User \"MARK LAFONTANT\" was added to campaign \"Trailer\"','2018-07-26 17:22:51'),(783,54,2,1,'User \"MARK LAFONTANT\" was removed from campaign \"Trailer\"','2018-07-26 17:23:00'),(784,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Producer\" on campaign \"Trailer\"','2018-07-26 17:23:04'),(785,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 17:23:04'),(786,47,4,1,'User \"ALEXANDRA BATES\" was added to campaign \"(:30) TV\"','2018-08-01 19:35:55'),(787,47,4,1,'User \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-08-01 19:35:55'),(788,47,4,1,'Billing user \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:11'),(789,47,4,1,'Editor \"JACOB LAWRENCE MOSKOW\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:18'),(790,47,4,1,'Editor \"KELLI GRIGGS\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:19'),(791,47,4,1,'Editor \"WILLIAM NEIL\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:20'),(792,47,4,1,'Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:27'),(793,47,4,1,'Designer \"BRADFORD BERLING\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:27'),(794,47,4,1,'User \"MARK LAFONTANT\" was removed from campaign \"(:30) TV\"','2018-08-01 19:38:45'),(795,47,4,1,'User \"ALEXANDRA BATES\" was removed from campaign \"(:30) TV\"','2018-08-01 19:38:48'),(796,47,4,1,'User \"TONY FANG\" was added to campaign \"(:30) TV\"','2018-08-01 19:39:01'),(797,49,4,1,'Version \"3\" was added to spot \"Water\"','2018-08-13 15:59:29'),(798,54,2,1,'Version \"9\" was added to spot \"Unbelievable\"','2018-08-15 14:43:28'),(799,54,2,1,'Version \"9 Alt\" was added to spot \"Unbelievable\"','2018-08-15 14:43:31'),(800,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-08-20 03:41:20'),(801,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-08-20 03:41:20'),(802,47,2,1,'Version \"1A\" was added to spot \"#1 Interrogation\"','2018-08-20 03:45:18'),(803,55,NULL,1,'Project \"On the Basis of Sex\" created for client \"Focus\r\n\"','2018-08-21 16:59:00'),(804,55,4,1,'Campaign \"(:30) TV\" was added to project \"On the Basis of Sex\"','2018-08-21 16:59:25'),(805,55,4,1,'User \"TIZIANA GRACE SIMPSON\" was added to campaign \"(:30) TV\"','2018-08-21 17:00:48'),(806,55,4,1,'User \"ASHLEY CAPUTO\" was added to campaign \"(:30) TV\"','2018-08-21 17:00:55'),(807,55,4,1,'Billing user \"TIZIANA GRACE SIMPSON\" was added to campaign \"(:30) TV\"','2018-08-21 17:01:04'),(808,55,4,1,'Editor \"ULRICH SCHLEGEL\" was added to campaign \"(:30) TV\"','2018-08-21 17:01:15'),(809,55,4,1,'Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"','2018-08-21 17:01:48'),(810,55,4,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"(:30) TV\"','2018-08-21 17:01:53'),(811,55,NULL,1,'Spot \"Legendary\" was added to \"(:30) TV\" campaign','2018-08-21 17:02:14'),(812,55,4,1,'Version \"1\" was added to spot \"Legendary\"','2018-08-21 17:02:20'),(813,56,NULL,1,'Project \"Elephants\" created for client \"Disney\r\n\"','2018-08-21 18:04:42'),(814,56,4,1,'Campaign \"(:30) TV\" was added to project \"Elephants\"','2018-08-21 18:04:57'),(815,56,7,1,'Campaign \"Digital\" was added to project \"Elephants\"','2018-08-21 21:43:56'),(816,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-08-24 13:26:26'),(817,47,6,1,'Campaign \"Home Entertainment\" was added to project \"Annihilation\"','2018-09-06 18:19:37'),(818,47,6,1,'User \"ALEXANDRA BATES\" was added to campaign \"Home Entertainment\"','2018-09-06 18:20:42'),(819,47,6,1,'User \"MARK LAFONTANT\" was added to campaign \"Home Entertainment\"','2018-09-06 18:20:43'),(820,47,4,1,'Version \"1A\" was added to spot \"#5 Threat\"','2018-09-23 17:13:19'),(821,47,4,1,'Version \"1A\" was removed from spot \"#5 Threat\"','2018-09-23 17:14:44'),(822,47,4,1,'Version \"1A\" was added to spot \"#5 Threat\"','2018-09-23 17:15:03'),(823,47,4,1,'Version \"1A\" was removed from spot \"#5 Threat\"','2018-09-23 17:59:16'),(824,57,NULL,1,'Project \"Marina Doesn\'t Care\" (codename: \"Carrots\") created for client \"Naughty Dog\r\n\"','2018-09-26 20:47:15'),(825,47,2,1,'Version \"1\" was added to spot \"#1 Interrogation\"','2018-10-03 16:27:09'),(826,47,2,1,'Version \"1B\" was added to spot \"#1 Interrogation\"','2018-10-03 16:27:37'),(827,47,2,1,'Version \"2\" was added to spot \"#1 Interrogation\"','2018-10-03 21:18:54'),(828,47,70,1,'Campaign \"How\" was added to project \"Annihilation\"','2018-10-07 05:53:06'),(829,54,2,1,'User \"TIZIANA GRACE SIMPSON\" was added to campaign \"Trailer\"','2018-10-11 19:34:43'),(830,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Lead Producer\" on campaign \"Trailer\"','2018-10-11 19:34:51'),(831,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-10-11 19:34:51'),(832,54,2,1,'User \"TIZIANA GRACE SIMPSON\" was changed to \"Producer\" on campaign \"Trailer\"','2018-10-11 19:34:53'),(833,54,2,1,'User \"TIZIANA GRACE SIMPSON\" was added to campaign \"Trailer\"','2018-10-11 19:34:53'),(834,54,2,1,'Designer \"MEGAN LAUREN YOON\" was removed from campaign \"Trailer\"','2018-10-11 19:36:49'),(835,54,4,1,'Campaign \"(:30) TV\" was added to project \"Wreck It Ralph 2\"','2018-10-11 19:38:17'),(836,54,4,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"(:30) TV\"','2018-10-11 19:39:31'),(837,54,4,1,'User \"TIZIANA GRACE SIMPSON\" was added to campaign \"(:30) TV\"','2018-10-11 19:39:32'),(838,54,4,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-10-11 19:39:47'),(839,54,4,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"(:30) TV\"','2018-10-11 19:39:47'),(840,54,4,1,'User \"TIZIANA GRACE SIMPSON\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-10-11 19:39:49'),(841,54,4,1,'User \"TIZIANA GRACE SIMPSON\" was added to campaign \"(:30) TV\"','2018-10-11 19:39:49'),(842,54,4,1,'User \"TIZIANA GRACE SIMPSON\" was removed from campaign \"(:30) TV\"','2018-10-11 19:39:56'),(843,54,4,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-10-11 19:40:02'),(844,54,4,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:02'),(845,54,4,1,'Billing user \"KRYSTLE OPPENHEIMER\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:18'),(846,54,4,1,'Editor \"STEVEN PINTO\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:32'),(847,54,4,1,'Designer \"BOBBY SALZANO\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:41'),(848,54,4,1,'Designer \"DAWN CHENETTE\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:42'),(849,54,4,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"(:30) TV\"','2018-10-11 19:40:43'),(850,54,NULL,1,'Spot \"Ralph\" was added to \"(:30) TV\" campaign','2018-10-11 19:42:29'),(851,54,4,1,'Version \"1\" was added to spot \"Ralph\"','2018-10-11 19:43:27'),(852,47,73,1,'Campaign \"Comicon\" was added to project \"Annihilation\"','2018-10-14 14:39:49'),(853,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-10-15 17:44:43'),(854,47,2,1,'Billing user \"MARK LAFONTANT\" was added to campaign \"Trailer\"','2018-10-17 16:53:03'),(855,47,7,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"Digital\"','2018-10-17 16:54:26'),(856,47,7,1,'User \"MARIE BYRNES\" was added to campaign \"Digital\"','2018-10-17 16:54:28'),(857,54,2,1,'User \"TIZIANA GRACE SIMPSON\" was removed from campaign \"Trailer\"','2018-10-18 14:23:12'),(858,54,NULL,1,'Spot \"China 30\" was added to \"(:30) TV\" campaign','2018-10-19 13:42:29'),(859,54,4,1,'Version \"1\" was added to spot \"China 30\"','2018-10-19 13:42:42'),(860,54,4,1,'Version \"2\" was added to spot \"China 30\"','2018-10-19 13:42:50'),(861,54,4,1,'Version \"3\" was added to spot \"China 30\"','2018-10-19 13:42:56'),(862,54,2,1,'Editor \"JESSICA DADON\" was added to campaign \"Trailer\"','2018-10-19 13:50:34'),(863,54,4,1,'Editor \"JESSICA DADON\" was added to campaign \"(:30) TV\"','2018-10-19 13:50:48'),(864,47,NULL,1,'Project renamed to \"\"Annihilation1\"\" from \"Annihilation\"','2018-10-21 08:06:45'),(865,47,NULL,1,'Project renamed to \"\"Annihilation\"\" from \"Annihilation1\"','2018-10-21 08:07:32'),(866,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-10-21 10:14:09'),(867,47,70,1,'Campaign \"How\" was added to project \"Annihilation\"','2018-10-21 10:14:17'),(868,47,1,1,'Campaign \"Teaser\" was added to project \"Annihilation\"','2018-10-21 10:18:06'),(869,47,3,1,'Campaign \"AV Sizzle/Reel\" was added to project \"Annihilation\"','2018-10-21 19:17:36'),(870,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-10-21 19:19:07'),(871,47,70,1,'Campaign \"How\" was added to project \"Annihilation\"','2018-10-21 19:19:20'),(872,47,70,1,'Campaign \"How\" was added to project \"Annihilation\"','2018-10-21 19:19:42'),(873,47,70,1,'Campaign \"How\" was added to project \"Annihilation\"','2018-10-21 19:19:53'),(874,47,2,1,'Campaign \"AV Radio\" was added to project \"Annihilation\"','2018-10-21 20:35:16'),(875,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-10-21 20:35:38'),(876,39,NULL,1,'Project created','2018-10-22 22:16:36'),(877,58,NULL,1,'Project created','2018-10-22 22:16:36'),(878,59,NULL,1,'Project created','2018-10-22 22:16:36'),(879,60,NULL,1,'Project created','2018-10-22 22:16:36'),(880,61,NULL,1,'Project created','2018-10-22 22:16:36'),(881,62,NULL,1,'Project created','2018-10-22 22:16:36'),(882,63,NULL,1,'Project created','2018-10-22 22:16:36'),(883,64,NULL,1,'Project created','2018-10-22 22:16:36'),(884,65,NULL,1,'Project created','2018-10-22 22:16:36'),(885,66,NULL,1,'Project created','2018-10-22 22:16:36'),(886,67,NULL,1,'Project created','2018-10-22 22:16:36'),(887,68,NULL,1,'Project created','2018-10-22 22:16:36'),(888,69,NULL,1,'Project created','2018-10-22 22:16:36'),(889,70,NULL,1,'Project created','2018-10-22 22:16:36'),(890,71,NULL,1,'Project created','2018-10-22 22:16:36'),(891,72,NULL,1,'Project created with name \"\"a p\" (codename: \"abc\")\"','2018-10-22 18:30:02'),(892,73,NULL,1,'Project created with name \"\"Test 1\" (codename: \"Test 22222\")\"','2018-10-23 12:41:35'),(893,39,NULL,1,'Project renamed to \"\"Game of Thrones1\"\" from \"Game of Thrones\"','2018-10-23 13:12:00'),(894,39,NULL,1,'Project renamed to \"\"Game of Thrones\"\" from \"Game of Thrones1\"','2018-10-23 13:12:33'),(895,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-23 17:29:26'),(896,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-23 17:29:26'),(897,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 05:44:11'),(898,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 05:44:11'),(899,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 05:51:27'),(900,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 05:51:27'),(901,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:11:50'),(902,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:11:50'),(903,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:18:46'),(904,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:18:46'),(905,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:41:32'),(906,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:41:32'),(907,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:48:30'),(908,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-24 06:48:30'),(909,54,5,1,'Campaign \"AV TV\" was added to project \"Wreck It Ralph 2\"','2018-10-25 13:19:33'),(910,54,5,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"AV TV\"','2018-10-25 13:20:07'),(911,54,5,1,'Billing user \"KRYSTLE OPPENHEIMER\" was added to campaign \"AV TV\"','2018-10-25 13:20:15'),(912,54,5,1,'Editor \"JESSICA DADON\" was added to campaign \"AV TV\"','2018-10-25 13:21:00'),(913,54,5,1,'Editor \"STEVEN PINTO\" was added to campaign \"AV TV\"','2018-10-25 13:21:00'),(914,54,5,1,'Designer \"BOBBY SALZANO\" was added to campaign \"AV TV\"','2018-10-25 13:21:07'),(915,54,5,1,'Designer \"DAWN CHENETTE\" was added to campaign \"AV TV\"','2018-10-25 13:21:08'),(916,54,5,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"AV TV\"','2018-10-25 13:21:09'),(917,54,NULL,1,'Spot \"China 60\" was added to \"AV TV\" campaign','2018-10-25 13:22:37'),(918,54,5,1,'Version \"1\" was added to spot \"China 60\"','2018-10-25 13:22:44'),(919,54,5,1,'Version \"2\" was added to spot \"China 60\"','2018-10-25 13:22:52'),(920,54,5,1,'Version \"3\" was added to spot \"China 60\"','2018-10-25 13:22:59'),(921,54,5,1,'Version \"4\" was added to spot \"China 60\"','2018-10-25 13:23:06'),(922,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-25 13:26:18'),(923,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-25 13:26:18'),(924,74,NULL,1,'Project created with name \"\"Mowgli\"\"','2018-10-25 13:34:53'),(925,74,4,1,'Campaign \"AV Teaser/Trailer\" was added to project \"Mowgli\"','2018-10-25 13:35:12'),(926,74,NULL,1,'Spot \"Torn\" was added to \"AV Teaser/Trailer\" campaign','2018-10-25 17:59:53'),(927,74,4,1,'Version \"1\" was added to spot \"Torn\"','2018-10-25 18:00:09'),(928,74,4,1,'Version \"2A\" was added to spot \"Torn\"','2018-10-25 18:00:17'),(929,74,4,1,'Version \"2B\" was added to spot \"Torn\"','2018-10-25 18:00:27'),(930,74,4,1,'Version \"3\" was added to spot \"Torn\"','2018-10-25 18:00:36'),(931,74,4,1,'Version \"3Alt\" was added to spot \"Torn\"','2018-10-25 18:00:43'),(932,74,4,1,'Version \"4\" was added to spot \"Torn\"','2018-10-25 18:00:57'),(933,74,4,1,'Version \"4Alt\" was added to spot \"Torn\"','2018-10-25 18:01:04'),(934,74,4,1,'Version \"5\" was added to spot \"Torn\"','2018-10-25 18:01:25'),(935,74,4,1,'Version \"5Alt\" was added to spot \"Torn\"','2018-10-25 18:01:33'),(936,74,4,1,'Version \"6\" was added to spot \"Torn\"','2018-10-25 18:01:42'),(937,74,4,1,'Version \"6Alt\" was added to spot \"Torn\"','2018-10-25 18:01:45'),(938,74,4,1,'Version \"7\" was added to spot \"Torn\"','2018-10-25 18:01:54'),(939,74,4,1,'Version \"7Alt\" was added to spot \"Torn\"','2018-10-25 18:02:00'),(940,74,4,1,'Version \"8\" was added to spot \"Torn\"','2018-10-25 18:02:06'),(941,74,4,1,'Version \"9\" was added to spot \"Torn\"','2018-10-25 18:02:18'),(942,74,4,1,'Version \"9Alt\" was added to spot \"Torn\"','2018-10-25 18:02:26'),(943,74,4,1,'Version \"10A\" was added to spot \"Torn\"','2018-10-25 18:02:39'),(944,74,4,1,'Version \"10B\" was added to spot \"Torn\"','2018-10-25 18:02:43'),(945,74,4,1,'Version \"10C\" was added to spot \"Torn\"','2018-10-25 18:03:51'),(946,74,4,1,'Version \"11B\" was added to spot \"Torn\"','2018-10-25 18:05:21'),(947,74,4,1,'Version \"11B\" was removed from spot \"Torn\"','2018-10-25 18:05:33'),(948,74,5,1,'Campaign \"AV TV\" was added to project \"Mowgli\"','2018-10-25 18:24:26'),(949,74,NULL,1,'Spot \"Two Worlds\" was added to \"AV TV\" campaign','2018-10-26 13:26:52'),(950,74,5,1,'Version \"1\" was added to spot \"Two Worlds\"','2018-10-26 13:27:00'),(951,74,5,1,'Version \"2\" was added to spot \"Two Worlds\"','2018-10-26 13:27:17'),(952,74,5,1,'Version \"3\" was added to spot \"Two Worlds\"','2018-10-26 13:28:05'),(953,74,5,1,'Version \"3Alt\" was added to spot \"Two Worlds\"','2018-10-26 13:28:08'),(954,74,5,1,'Version \"4\" was added to spot \"Two Worlds\"','2018-10-26 13:28:37'),(955,74,5,1,'Version \"4Rev\" was added to spot \"Two Worlds\"','2018-10-26 13:28:53'),(956,74,5,1,'Version \"5\" was added to spot \"Two Worlds\"','2018-10-26 13:29:08'),(957,74,5,1,'Version \"5Rev\" was added to spot \"Two Worlds\"','2018-10-26 13:29:11'),(958,74,5,1,'Version \"5Rev2\" was added to spot \"Two Worlds\"','2018-10-26 13:31:10'),(959,74,NULL,1,'Spot \"Hope\" was added to \"AV TV\" campaign','2018-10-26 13:34:36'),(960,74,5,1,'Version \"1\" was added to spot \"Hope\"','2018-10-26 13:34:54'),(961,74,5,1,'Version \"2\" was added to spot \"Hope\"','2018-10-26 13:35:08'),(962,74,5,1,'Version \"3\" was added to spot \"Hope\"','2018-10-26 13:35:25'),(963,74,5,1,'Version \"4WIP\" was added to spot \"Hope\"','2018-10-26 13:36:05'),(964,74,5,1,'Version \"4\" was added to spot \"Hope\"','2018-10-26 13:38:25'),(965,74,5,1,'Version \"4WIP\" was removed from spot \"Hope\"','2018-10-26 13:40:32'),(966,74,5,1,'Version \"4\" was removed from spot \"Hope\"','2018-10-26 13:40:38'),(967,74,5,1,'Version \"3Rev\" was added to spot \"Hope\"','2018-10-26 13:40:47'),(968,74,5,1,'Version \"3Rev2\" was added to spot \"Hope\"','2018-10-26 13:41:21'),(969,74,5,1,'Version \"3Rev3\" was added to spot \"Hope\"','2018-10-26 13:41:54'),(970,74,NULL,1,'Spot \"Belong\" was added to \"AV TV\" campaign','2018-10-26 13:43:02'),(971,74,5,1,'Version \"1\" was added to spot \"Belong\"','2018-10-26 13:43:10'),(972,74,5,1,'Version \"2\" was added to spot \"Belong\"','2018-10-26 13:43:22'),(973,74,5,1,'Version \"2Alt\" was added to spot \"Belong\"','2018-10-26 13:43:35'),(974,74,5,1,'Version \"3\" was added to spot \"Belong\"','2018-10-26 13:43:55'),(975,74,5,1,'Version \"4WIP\" was added to spot \"Belong\"','2018-10-26 13:44:09'),(976,74,5,1,'Version \"4\" was added to spot \"Belong\"','2018-10-26 13:44:16'),(977,74,5,1,'Version \"5\" was added to spot \"Belong\"','2018-10-26 13:44:43'),(978,74,5,1,'Version \"6\" was added to spot \"Belong\"','2018-10-26 14:37:02'),(979,74,5,1,'Version \"6Rev\" was added to spot \"Belong\"','2018-10-26 14:37:10'),(980,74,5,1,'Version \"6rev\" was added to spot \"Belong\"','2018-10-26 14:37:29'),(981,74,5,1,'Version \"6rev\" was removed from spot \"Belong\"','2018-10-26 14:37:43'),(982,74,5,1,'Version \"6rev\" was added to spot \"Belong\"','2018-10-26 14:37:51'),(983,74,5,1,'Version \"6rev\" was removed from spot \"Belong\"','2018-10-26 14:38:01'),(984,74,5,1,'Version \"6Rev2\" was added to spot \"Belong\"','2018-10-26 14:45:04'),(985,74,NULL,1,'Spot \"Follow Me\" was added to \"AV TV\" campaign','2018-10-26 14:45:50'),(986,74,5,1,'Version \"1\" was added to spot \"Follow Me\"','2018-10-26 14:46:00'),(987,74,5,1,'Version \"2\" was added to spot \"Follow Me\"','2018-10-26 14:46:20'),(988,74,5,1,'Version \"3\" was added to spot \"Follow Me\"','2018-10-26 14:46:28'),(989,74,5,1,'Version \"4\" was added to spot \"Follow Me\"','2018-10-26 14:46:41'),(990,74,5,1,'Version \"4Rev\" was added to spot \"Follow Me\"','2018-10-26 14:46:49'),(991,74,5,1,'Version \"4Rev2\" was added to spot \"Follow Me\"','2018-10-26 14:47:35'),(992,74,5,1,'Version \"5\" was added to spot \"Follow Me\"','2018-10-26 14:47:46'),(993,74,5,1,'Version \"6\" was added to spot \"Follow Me\"','2018-10-26 14:47:56'),(994,74,5,1,'Version \"6Rev\" was added to spot \"Follow Me\"','2018-10-26 14:48:09'),(995,74,5,1,'Version \"6Rev2\" was added to spot \"Follow Me\"','2018-10-26 14:48:21'),(996,74,NULL,1,'Spot \"Torn 60\" was added to \"AV TV\" campaign','2018-10-26 14:53:03'),(997,74,5,1,'Version \"1\" was added to spot \"Torn 60\"','2018-10-26 14:53:23'),(998,74,5,1,'Version \"2\" was added to spot \"Torn 60\"','2018-10-26 14:53:33'),(999,74,5,1,'Version \"3\" was added to spot \"Torn 60\"','2018-10-26 14:53:37'),(1000,74,5,1,'Version \"4\" was added to spot \"Torn 60\"','2018-10-26 14:53:47'),(1001,74,NULL,1,'Spot \"Two Worlds 20\" was added to \"AV TV\" campaign','2018-10-26 14:54:56'),(1002,74,5,1,'Version \"1\" was added to spot \"Two Worlds 20\"','2018-10-26 14:55:10'),(1003,74,5,1,'Version \"2\" was added to spot \"Two Worlds 20\"','2018-10-26 14:55:13'),(1004,74,5,1,'Version \"2Rev\" was added to spot \"Two Worlds 20\"','2018-10-26 14:55:18'),(1005,74,NULL,1,'Spot \"Hope 20\" was added to \"AV TV\" campaign','2018-10-26 14:55:59'),(1006,74,5,1,'Version \"1\" was added to spot \"Hope 20\"','2018-10-26 14:56:07'),(1007,74,5,1,'Version \"2\" was added to spot \"Hope 20\"','2018-10-26 14:56:16'),(1008,74,5,1,'Version \"3\" was added to spot \"Hope 20\"','2018-10-26 14:56:20'),(1009,74,5,1,'Version \"3Rev\" was added to spot \"Hope 20\"','2018-10-26 14:56:25'),(1010,74,NULL,1,'Spot \"Special Event\" was added to \"AV TV\" campaign','2018-10-26 14:59:55'),(1011,74,5,1,'Version \"1\" was added to spot \"Special Event\"','2018-10-26 15:00:01'),(1012,74,5,1,'Version \"2\" was added to spot \"Special Event\"','2018-10-26 15:00:11'),(1013,74,5,1,'Version \"3\" was added to spot \"Special Event\"','2018-10-26 15:00:20'),(1014,74,5,1,'Version \"3Alt\" was added to spot \"Special Event\"','2018-10-26 15:00:26'),(1015,74,5,1,'Version \"3Rev\" was added to spot \"Special Event\"','2018-10-26 15:00:47'),(1016,74,5,1,'Version \"3AltRev\" was added to spot \"Special Event\"','2018-10-26 15:01:10'),(1017,74,5,1,'Version \"4\" was added to spot \"Special Event\"','2018-10-26 15:01:33'),(1018,74,NULL,1,'Spot \"Believe\" was added to \"AV TV\" campaign','2018-10-26 15:09:49'),(1019,74,5,1,'Version \"1\" was added to spot \"Believe\"','2018-10-26 15:09:56'),(1020,74,5,1,'Version \"2\" was added to spot \"Believe\"','2018-10-26 15:10:04'),(1021,74,5,1,'Version \"3\" was added to spot \"Believe\"','2018-10-26 15:10:10'),(1022,74,5,1,'Version \"3Alt\" was added to spot \"Believe\"','2018-10-26 15:10:17'),(1023,74,5,1,'Version \"4\" was added to spot \"Believe\"','2018-10-26 15:10:23'),(1024,74,5,1,'Version \"4Rev\" was added to spot \"Believe\"','2018-10-26 15:10:32'),(1025,74,5,1,'Version \"4Rev2\" was added to spot \"Believe\"','2018-10-26 15:10:50'),(1026,74,5,1,'Version \"5\" was added to spot \"Believe\"','2018-10-26 15:11:07'),(1027,74,5,1,'Version \"5Rev\" was added to spot \"Believe\"','2018-10-26 15:11:10'),(1028,74,5,1,'Version \"5Rev2\" was added to spot \"Believe\"','2018-10-26 15:11:14'),(1029,74,5,1,'Version \"5Rev3\" was added to spot \"Believe\"','2018-10-26 15:12:11'),(1030,74,NULL,1,'Spot \"Protect\" was added to \"AV TV\" campaign','2018-10-26 15:13:09'),(1031,74,5,1,'Version \"1\" was added to spot \"Protect\"','2018-10-26 15:13:23'),(1032,74,5,1,'Version \"2\" was added to spot \"Protect\"','2018-10-26 15:13:27'),(1033,74,5,1,'Version \"2Alt\" was added to spot \"Protect\"','2018-10-26 15:13:32'),(1034,74,5,1,'Version \"3\" was added to spot \"Protect\"','2018-10-26 15:14:34'),(1035,74,5,1,'Version \"3Rev\" was added to spot \"Protect\"','2018-10-26 15:14:39'),(1036,74,5,1,'Version \"3Rev2\" was added to spot \"Protect\"','2018-10-26 15:14:51'),(1037,74,NULL,1,'Spot \"Training\" was added to \"AV TV\" campaign','2018-10-26 15:15:19'),(1038,74,5,1,'Version \"1\" was added to spot \"Training\"','2018-10-26 15:15:42'),(1039,74,5,1,'Version \"2\" was added to spot \"Training\"','2018-10-26 15:15:58'),(1040,74,5,1,'Version \"3\" was added to spot \"Training\"','2018-10-26 15:16:01'),(1041,74,5,1,'Version \"3Rev\" was added to spot \"Training\"','2018-10-26 15:16:11'),(1042,74,5,1,'Version \"3Rev2\" was added to spot \"Training\"','2018-10-26 15:16:19'),(1043,74,1,1,'Campaign \"AV Digital\" was added to project \"Mowgli\"','2018-10-26 15:19:19'),(1044,74,NULL,1,'Spot \"Torn 60 1X1\" was added to \"AV Digital\" campaign','2018-10-26 15:20:11'),(1045,74,1,1,'Version \"1\" was added to spot \"Torn 60 1X1\"','2018-10-26 15:20:19'),(1046,39,1,1,'Campaign \"AV Digital\" was added to project \"Game of Thrones\"','2018-10-26 17:05:14'),(1047,47,9,1,'Campaign \"Games\" was added to project \"Annihilation\"','2018-10-26 17:24:03'),(1048,47,4,1,'Version \"11Alt\" was added to spot \"#1 Theory aka \"Truce\"\"','2018-10-27 13:09:58'),(1049,47,4,106,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:49:33'),(1050,47,4,106,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:49:33'),(1051,47,4,19,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:50:26'),(1052,47,4,19,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:50:26'),(1053,47,4,19,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:50:37'),(1054,47,4,19,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:50:37'),(1055,47,4,19,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:50:57'),(1056,47,4,19,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:50:57'),(1057,47,4,106,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:54:05'),(1058,47,4,106,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:54:05'),(1059,47,4,106,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:54:21'),(1060,47,4,106,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-27 14:54:21'),(1061,47,4,1,'Version \"11Alt\" was removed from spot \"#1 Theory aka \"Truce\"\"','2018-10-27 15:23:37'),(1062,47,4,106,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-28 10:42:05'),(1063,47,4,106,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-28 10:42:05'),(1064,47,4,106,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 16:01:31'),(1065,47,4,106,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 16:01:31'),(1066,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 16:53:16'),(1067,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 16:53:16'),(1068,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 17:08:39'),(1069,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 17:08:39'),(1070,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 17:08:48'),(1071,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 17:08:48'),(1072,47,4,1,'User \"Demo User\" was added to campaign \"AV Teaser/Trailer\"','2018-10-29 17:17:07'),(1073,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 17:36:45'),(1074,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 17:36:45'),(1075,47,2,1,'Writing team request was changed on campaign \"AV Radio\"','2018-10-29 17:41:45'),(1076,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 17:52:24'),(1077,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-29 17:52:24'),(1078,47,2,1,'Writing team request was changed on campaign \"AV Radio\"','2018-10-30 08:35:31'),(1079,47,4,106,'User \"Demo User\" was removed from campaign \"AV Teaser/Trailer\"','2018-10-30 09:43:03'),(1080,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-30 16:58:16'),(1081,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-30 16:58:16'),(1082,47,2,1,'Version \"1Rev\" was added to spot \"#1 Interrogation\"','2018-10-30 17:09:22'),(1083,47,2,1,'Version \"1Rev\" was removed from spot \"#1 Interrogation\"','2018-10-30 17:09:32'),(1084,47,4,1,'User \"TONY FANG\" was added to campaign \"AV Teaser/Trailer\"','2018-10-30 17:32:46'),(1085,47,4,1,'User \"JUSTINE TALLY SMITH\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 12:40:34'),(1086,47,4,1,'User \"DANIEL TAYLOR\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 12:44:27'),(1087,47,4,1,'User \"LYLE GOODALE\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 13:05:31'),(1088,47,4,1,'Billing user \"JORDAN MICHAEL GODFREY\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 13:07:20'),(1089,47,4,1,'User \"STEVEN PINTO\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 13:12:02'),(1090,47,4,1,'User \"ANDREW FARBER\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 13:13:26'),(1091,47,4,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 13:14:20'),(1092,47,4,1,'User \"HEINO FORSSTROM\" was added to campaign \"AV Teaser/Trailer\"','2018-10-31 13:17:51'),(1093,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-31 14:49:17'),(1094,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-10-31 14:49:17'),(1095,47,7,106,'Campaign \"Broadcast\" was added to project \"Annihilation\"','2018-11-01 16:14:29'),(1096,47,4,106,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-01 16:23:12'),(1097,47,4,106,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-01 16:23:12'),(1098,39,5,1,'Campaign \"AV TV\" was added to project \"Game of Thrones\"','2018-11-05 13:57:42'),(1099,39,76,1,'Campaign \"TV 30\" was added to project \"Game of Thrones\"','2018-11-05 14:01:10'),(1100,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-05 14:42:20'),(1101,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-05 14:42:20'),(1102,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-05 14:42:50'),(1103,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-05 14:42:50'),(1104,74,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:39:30'),(1105,74,4,1,'User \"ANDREW FARBER\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:39:36'),(1106,74,4,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"AV Teaser/Trailer\"','2018-11-06 14:39:47'),(1107,74,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:39:47'),(1108,74,4,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"AV Teaser/Trailer\"','2018-11-06 14:39:51'),(1109,74,4,1,'User \"ANDREW FARBER\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:39:51'),(1110,74,4,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:40:03'),(1111,74,4,1,'Editor \"KAZADI KATAMBWA\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:40:29'),(1112,74,4,1,'Editor \"DANIEL TAYLOR\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:40:38'),(1113,74,4,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:40:43'),(1114,74,4,1,'Designer \"RICARDO CASTRO\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:41:00'),(1115,74,4,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:41:07'),(1116,74,4,1,'Designer \"BENJAMIN VANCE\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:41:14'),(1117,74,4,1,'Designer \"DAWN CHENETTE\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:41:30'),(1118,74,5,1,'User \"KAZADI KATAMBWA\" was added to campaign \"AV TV\"','2018-11-06 14:41:55'),(1119,74,5,1,'User \"ANDREW FARBER\" was added to campaign \"AV TV\"','2018-11-06 14:41:56'),(1120,74,5,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"AV TV\"','2018-11-06 14:42:56'),(1121,74,5,1,'User \"KAZADI KATAMBWA\" was added to campaign \"AV TV\"','2018-11-06 14:42:56'),(1122,74,5,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"AV TV\"','2018-11-06 14:42:58'),(1123,74,5,1,'User \"ANDREW FARBER\" was added to campaign \"AV TV\"','2018-11-06 14:42:58'),(1124,74,5,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"AV TV\"','2018-11-06 14:43:04'),(1125,74,5,1,'Editor \"KAZADI KATAMBWA\" was added to campaign \"AV TV\"','2018-11-06 14:43:11'),(1126,74,5,1,'Editor \"DANIEL TAYLOR\" was added to campaign \"AV TV\"','2018-11-06 14:43:12'),(1127,74,5,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"AV TV\"','2018-11-06 14:43:13'),(1128,74,5,1,'Designer \"RICARDO CASTRO\" was added to campaign \"AV TV\"','2018-11-06 14:43:21'),(1129,74,5,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"AV TV\"','2018-11-06 14:43:22'),(1130,74,5,1,'Designer \"BENJAMIN VANCE\" was added to campaign \"AV TV\"','2018-11-06 14:43:23'),(1131,74,5,1,'Designer \"DAWN CHENETTE\" was added to campaign \"AV TV\"','2018-11-06 14:43:24'),(1132,74,5,1,'Editor \"DORAN OPPENHEIMER\" was added to campaign \"AV TV\"','2018-11-06 14:43:40'),(1133,74,5,1,'Editor \"BLAKE HILL\" was added to campaign \"AV TV\"','2018-11-06 14:44:10'),(1134,74,1,1,'User \"KAZADI KATAMBWA\" was added to campaign \"AV Digital\"','2018-11-06 14:44:27'),(1135,74,1,1,'User \"ANDREW FARBER\" was added to campaign \"AV Digital\"','2018-11-06 14:44:27'),(1136,74,1,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"AV Digital\"','2018-11-06 14:44:30'),(1137,74,1,1,'Editor \"KAZADI KATAMBWA\" was added to campaign \"AV Digital\"','2018-11-06 14:44:37'),(1138,74,1,1,'Editor \"DANIEL TAYLOR\" was added to campaign \"AV Digital\"','2018-11-06 14:44:38'),(1139,74,1,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"AV Digital\"','2018-11-06 14:44:39'),(1140,74,1,1,'Designer \"RICARDO CASTRO\" was added to campaign \"AV Digital\"','2018-11-06 14:44:43'),(1141,74,1,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"AV Digital\"','2018-11-06 14:44:45'),(1142,74,1,1,'Designer \"BENJAMIN VANCE\" was added to campaign \"AV Digital\"','2018-11-06 14:44:46'),(1143,74,1,1,'Designer \"DAWN CHENETTE\" was added to campaign \"AV Digital\"','2018-11-06 14:44:48'),(1144,49,4,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:47:24'),(1145,47,4,1,'Music team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-06 14:48:19'),(1146,47,4,1,'Writing team request was changed on campaign \"AV Teaser/Trailer\"','2018-11-06 14:48:19'),(1147,47,4,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:48:38'),(1148,54,4,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:49:03'),(1149,53,4,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"AV Teaser/Trailer\"','2018-11-06 14:49:37'),(1150,75,NULL,1,'Project created with name \"\"Mario\"\"','2018-11-06 19:45:12'),(1151,75,9,1,'Campaign \"Games\" was added to project \"Mario\"','2018-11-06 19:45:34'),(1152,76,NULL,1,'Project created with name \"\"Powder Puff\" (codename: \"cotton candy\")\"','2018-11-06 19:47:30'),(1153,76,4,1,'Campaign \"AV Teaser/Trailer\" was added to project \"Powder Puff\"','2018-11-06 19:47:42'),(1154,54,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"AV Teaser/Trailer\"','2018-11-08 12:54:54'),(1155,54,4,1,'User \"MACKLIN SAMETH\" was changed to \"Associate Producer\" on campaign \"AV Teaser/Trailer\"','2018-11-08 12:54:56'),(1156,54,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"AV Teaser/Trailer\"','2018-11-08 12:54:56'),(1157,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:09:56'),(1158,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:09:56'),(1159,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:10:15'),(1160,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:13:03'),(1161,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:13:31'),(1162,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:14:20'),(1163,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:14:28'),(1164,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:14:28'),(1165,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:17:09'),(1166,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:17:09'),(1167,47,4,1,'Music team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:17:14'),(1168,47,4,1,'Writing team request was changed on campaign \"Theatrical Teaser/Trai\"','2018-11-19 18:17:14');
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
INSERT INTO `redi_project_permissions` VALUES (1,'project-create','Create project page'),(2,'project-name','Project name'),(3,'project-release-date','Project release date'),(4,'project-history','Project history and changelog'),(5,'project-description','Project description'),(6,'project-campaigns','Project campaigns list'),(7,'campaign-description','Campaign description'),(8,'campaign-details','Campaign details'),(9,'campaign-contacts','Campaign contacts'),(10,'campaign-people-creative','Campaign creative team'),(11,'campaign-people-billing','Campaign billing team'),(12,'campaign-people-editorial','Campaign editorial team'),(13,'campaign-people-design','Campaign graphic design team'),(14,'campaign-writing-team','Campaign writing team'),(15,'campaign-music-team','Campaign music team'),(200,'all-projects-campaigns','All projects campaigns'),(17,'date-material-received','Campaign date materials will be received'),(18,'campaign-budget','Campaign budget'),(19,'campaign-notes','Campaign notes'),(20,'campaign-por','Campaign POR'),(21,'campaign-invoice-contact','Campaign invoice contact'),(22,'spot','Spots list'),(23,'spot-first-revision-cost','Spot first revision rate'),(24,'spot-internal-due-date','Spot internal due date'),(25,'spot-client-due-date','Spot client due date'),(26,'spot-revision','Spot revisions and versions'),(27,'spot-graphics-revision','Spot graphics included'),(100,'user-permission','User permission'),(28,'campaign-customer-contact','Campaign customer contact'),(29,'version-status','Version status'),(30,'version-note','Version note'),(31,'project-codename','Project code name'),(32,'campaign-channel','Campaign channel'),(33,'new-customer-approval','New customer approval');
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
  `POR` varchar(200) DEFAULT NULL,
  `invoice_contact` varchar(200) DEFAULT NULL,
  `material_receive_date` datetime DEFAULT NULL,
  `approved_by_billing` tinyint(1) DEFAULT '0',
  `channel_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=233 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_to_campaign`
--

LOCK TABLES `redi_project_to_campaign` WRITE;
/*!40000 ALTER TABLE `redi_project_to_campaign` DISABLE KEYS */;
INSERT INTO `redi_project_to_campaign` VALUES (104,9,4,1,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(105,1,4,1,7,0,NULL,1,'This is the place for notes','(:30) TV Campaign','5000',NULL,NULL,NULL,NULL,0,NULL),(156,47,4,13,15,1,'both conceptual ideas and copy',1,'some note','Should be TV campaign','0','budget per spot',NULL,NULL,'2018-05-05 07:00:00',1,2),(157,47,2,13,13,1,'just a blurb',NULL,NULL,NULL,'45000',NULL,NULL,NULL,'2018-01-18 08:00:00',1,2),(158,47,71,13,NULL,1,'once upon a time',1,'do ta do','(:15) TV','0','on spec; billable if revised',NULL,NULL,'2017-12-02 08:00:00',0,NULL),(111,10,4,2,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(112,10,1,2,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(143,28,1,3,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(144,28,4,3,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(146,28,7,3,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(147,28,68,3,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(149,1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(151,15,4,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(154,16,4,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(153,46,7,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(155,1,2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(159,5,6,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(169,49,1,2,12,1,'Hey guys!  Can you watch when this comes in, should be sometime late week and then we\'ll do a creative kick off meeting early next week!',1,'Hey guys!  Can you watch when this comes in, should be sometime late week and then we\'ll do a creative kick off meeting early next week!','Trailer Campaign Eugene','25000','reduced rate trailer, no revisions included',NULL,NULL,NULL,0,NULL),(182,47,7,13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(203,55,4,30,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(162,49,4,2,12,NULL,NULL,NULL,NULL,'TV Campaign',NULL,NULL,NULL,NULL,NULL,0,NULL),(163,49,7,2,NULL,NULL,NULL,NULL,NULL,'Digital: Stanford',NULL,NULL,NULL,NULL,NULL,0,NULL),(200,53,4,2,NULL,NULL,NULL,NULL,NULL,'Massey',NULL,NULL,NULL,NULL,NULL,0,NULL),(173,50,4,3,NULL,NULL,NULL,NULL,NULL,'test  k',NULL,NULL,NULL,NULL,NULL,0,NULL),(174,50,6,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(175,50,1,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(176,49,2,2,NULL,NULL,NULL,NULL,NULL,'Trailer Campaign Kazadi',NULL,NULL,NULL,NULL,NULL,0,NULL),(196,53,73,2,NULL,NULL,NULL,NULL,NULL,'Hall H',NULL,NULL,NULL,NULL,NULL,0,NULL),(194,49,2,2,13,NULL,NULL,NULL,NULL,'Comicon Trailer',NULL,NULL,NULL,NULL,NULL,0,NULL),(186,51,73,2,NULL,NULL,NULL,NULL,NULL,'Trailer',NULL,NULL,NULL,NULL,NULL,0,NULL),(187,51,4,2,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,NULL),(188,51,4,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(195,51,7,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(189,52,1,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(190,49,4,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(193,49,7,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(192,47,4,13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(197,53,73,2,NULL,NULL,NULL,NULL,NULL,'Trailer',NULL,NULL,NULL,NULL,NULL,0,NULL),(199,53,4,2,12,NULL,NULL,NULL,NULL,'Stanford',NULL,NULL,NULL,NULL,NULL,0,NULL),(201,53,4,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(202,54,4,9,13,NULL,NULL,NULL,NULL,'International',NULL,NULL,NULL,NULL,NULL,0,2),(204,56,4,33,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(205,56,7,33,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(207,47,6,19,19,NULL,NULL,NULL,NULL,'Cananda',NULL,NULL,NULL,NULL,NULL,1,2),(209,54,4,10,NULL,NULL,NULL,NULL,NULL,'International',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(210,47,73,13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(211,47,7,13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,3),(223,74,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(222,54,5,15,NULL,NULL,NULL,NULL,NULL,'International',NULL,NULL,NULL,NULL,NULL,0,NULL),(224,74,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(225,74,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(228,47,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,3),(229,39,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(231,75,9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(232,76,4,NULL,NULL,NULL,NULL,NULL,NULL,'Trailer',NULL,NULL,NULL,NULL,NULL,0,NULL);
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
INSERT INTO `redi_project_to_campaign_billing` VALUES (105,146,NULL),(105,180,NULL),(105,13,NULL),(162,19,NULL),(157,40,NULL),(157,9,NULL),(158,15,NULL),(156,97,NULL),(186,89,NULL),(187,89,NULL),(189,95,NULL),(162,96,NULL),(195,89,NULL),(196,96,NULL),(197,96,NULL),(202,95,NULL),(192,97,NULL),(203,88,NULL),(209,95,NULL),(157,97,NULL),(222,95,NULL),(156,87,NULL),(223,89,NULL),(224,89,NULL),(225,89,NULL);
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
INSERT INTO `redi_project_to_campaign_cc` VALUES (104,1),(105,1),(111,2),(112,2),(143,3),(144,3),(146,3),(147,3),(149,1),(151,3),(153,8),(154,3),(155,1),(156,15),(157,13),(158,13),(159,1),(162,2),(163,2),(169,2),(173,3),(174,3),(175,3),(176,2),(182,13),(186,2),(187,2),(188,2),(189,7),(190,2),(192,13),(193,2),(194,2),(195,2),(196,2),(197,2),(199,2),(200,2),(201,2),(202,10),(203,30),(204,33),(205,33),(207,19),(209,10),(210,13),(211,13),(222,15);
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
INSERT INTO `redi_project_to_campaign_designer` VALUES (105,9),(105,136),(156,64),(156,67),(157,66),(158,69),(158,70),(162,61),(162,63),(162,67),(162,69),(163,61),(163,63),(169,61),(169,63),(186,69),(186,73),(187,69),(187,73),(189,63),(192,64),(192,67),(195,69),(195,73),(196,60),(196,61),(196,62),(196,69),(197,60),(197,61),(197,62),(197,69),(202,61),(202,66),(202,73),(203,61),(203,67),(209,61),(209,66),(209,73),(222,61),(222,66),(222,73),(223,68),(223,69),(223,72),(223,73),(224,68),(224,69),(224,72),(224,73),(225,68),(225,69),(225,72),(225,73);
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
INSERT INTO `redi_project_to_campaign_editor` VALUES (105,6),(105,87),(105,89),(156,35),(156,37),(156,44),(156,48),(157,32),(158,26),(158,86),(162,30),(162,35),(162,36),(162,41),(163,41),(169,36),(169,41),(186,35),(186,36),(186,41),(187,36),(187,41),(189,29),(189,31),(192,37),(192,44),(192,48),(195,35),(195,36),(195,41),(196,36),(197,36),(200,35),(202,29),(202,35),(202,40),(203,31),(209,29),(209,40),(222,29),(222,40),(223,34),(223,35),(223,89),(224,12),(224,28),(224,34),(224,35),(224,89),(225,34),(225,35),(225,89);
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
INSERT INTO `redi_project_to_campaign_user` VALUES (156,23,4),(156,97,2),(105,10,7),(153,7,NULL),(105,87,8),(154,6,1),(105,121,2),(105,146,7),(105,161,2),(153,8,NULL),(154,9,3),(105,101,1),(153,6,NULL),(157,6,NULL),(157,11,NULL),(158,89,NULL),(158,19,NULL),(182,19,NULL),(182,89,NULL),(176,89,1),(162,96,1),(162,63,6),(186,89,1),(186,22,4),(186,63,6),(187,22,4),(187,63,6),(187,89,1),(188,22,4),(188,63,6),(188,89,1),(163,89,1),(169,63,6),(169,20,3),(169,90,1),(189,95,2),(162,25,3),(176,22,4),(195,22,NULL),(195,63,NULL),(195,89,NULL),(196,96,1),(196,25,3),(197,25,3),(197,96,1),(199,96,NULL),(199,25,NULL),(202,95,1),(192,15,NULL),(203,88,NULL),(203,19,NULL),(207,23,NULL),(207,97,NULL),(222,95,NULL),(209,95,2),(211,6,NULL),(211,11,NULL),(156,15,NULL),(156,8,NULL),(156,34,NULL),(156,45,NULL),(156,29,NULL),(156,22,NULL),(156,95,NULL),(156,69,NULL),(223,89,1),(223,22,4),(224,89,1),(224,22,4),(225,89,NULL),(225,22,NULL),(202,25,3);
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
INSERT INTO `redi_setting` VALUES (1,'TEMPORARY_STAFF_HOUR_PER_DAY','8'),(2,'TEST','some test value'),(3,'MAX_SPOT_SENT_REQUEST_ID','66');
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
) ENGINE=MyISAM AUTO_INCREMENT=139 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot`
--

LOCK TABLES `redi_spot` WRITE;
/*!40000 ALTER TABLE `redi_spot` DISABLE KEYS */;
INSERT INTO `redi_spot` VALUES (3,'Puddin',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'Puppet Master',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Boomer',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'Slipknot',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'Croc',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'Diablo',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'Enchantress',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'Katana',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4),(11,'Waller',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'Deadshot',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'Flag',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'Joker',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'Harley',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'Deashot :60',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'Take Over :10',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'Vertical Footage',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'Puddin',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'Boomer',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,'Slipknot',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'Croc',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,'Diablo',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,'Enchantress',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,'Katana',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'Waller',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,'Deadshot',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'Flag',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,'Joker',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,'Harley',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,'Deashot :60',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(55,'\"Busy\"',105,NULL,'Based on \"Busy\" :60',2,1,10000.00,'2018-04-26 00:00:00','2018-04-26 00:00:00',NULL,NULL,NULL),(63,'spt4',143,NULL,'spt4notre',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL),(62,'spt3',143,NULL,'sdf',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL),(61,'spt2',143,NULL,'fsdf',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL),(60,'spt1',143,NULL,'sptnote',0,0,0.00,NULL,NULL,NULL,NULL,NULL),(57,'Episode 405',104,NULL,'null',0,0,0.00,NULL,NULL,NULL,NULL,NULL),(56,'First Spot for Teaser',112,NULL,'null',3,0,35000.00,NULL,NULL,NULL,NULL,NULL),(64,'spt5',143,NULL,'spt5note',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL),(65,'spt5',143,NULL,'spt5note',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL),(66,'spt6',143,NULL,'r',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL),(67,'spt1',144,NULL,'wer',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL),(71,'spt1',146,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL),(72,'spt1',147,NULL,'spt note',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL),(73,'Spot #2\"Really Tired\"',105,NULL,'Secondary spot is important as well',5,1,500.00,'2018-04-26 00:00:00','2018-04-26 00:00:00',NULL,NULL,NULL),(77,'Third spot for Babysitter project',105,NULL,'Some notes for reference',0,0,0.00,'2018-06-16 00:00:00','2018-07-19 00:00:00',NULL,NULL,NULL),(78,'#1 Theory aka \"Truce\"',156,NULL,'Kris Brown cut v.1',3,0,11000.00,'2018-05-11 00:00:00','2018-05-14 00:00:00','R','Spec revised, is billable',NULL),(79,'#2 Saved',156,NULL,'null',3,0,11000.00,NULL,'2018-05-14 00:00:00',NULL,NULL,NULL),(80,'#3 Need',156,NULL,'null',3,0,11000.00,NULL,NULL,NULL,NULL,NULL),(81,'#4 Inside',156,NULL,'null',3,0,11000.00,NULL,NULL,NULL,NULL,NULL),(82,'#5 Threat',156,NULL,'null',3,0,11000.00,NULL,NULL,NULL,NULL,NULL),(83,'#6 Rescue',156,NULL,'OT billable',2,0,9000.00,NULL,NULL,NULL,NULL,NULL),(84,'#1 Interrogation',157,NULL,'null',5,0,45000.00,NULL,NULL,NULL,NULL,NULL),(85,'#1 Reason',158,NULL,'null',3,0,5000.00,NULL,NULL,NULL,NULL,NULL),(86,'#2 Creation',158,NULL,'null',3,0,5000.00,NULL,NULL,NULL,NULL,NULL),(87,'#3 Everywhere',158,NULL,'null',3,0,5000.00,NULL,NULL,NULL,NULL,NULL),(88,'#4 Need',158,NULL,'based on digital :15 v.6',0,0,5000.00,NULL,NULL,NULL,NULL,NULL),(89,'#3 Everywhere',158,NULL,'based on digital 15 v.6',0,0,0.00,NULL,NULL,NULL,NULL,NULL),(90,'#5 Succeed/YouTube',158,NULL,'based on digital 15 v.3',0,0,5000.00,NULL,NULL,NULL,NULL,NULL),(91,'Test',157,NULL,'null',0,0,0.00,NULL,NULL,NULL,NULL,NULL),(92,'New test spot',156,NULL,'Edit sample note',0,0,0.00,NULL,NULL,NULL,NULL,NULL),(93,'test',159,NULL,'null',0,0,0.00,NULL,NULL,NULL,NULL,NULL),(94,'abc',159,NULL,'test',0,0,0.00,NULL,NULL,NULL,NULL,NULL),(95,'Test3',156,NULL,NULL,0,0,0.00,NULL,NULL,NULL,NULL,NULL),(96,'Test2',156,NULL,NULL,0,0,0.00,NULL,NULL,NULL,NULL,NULL),(97,'Water',162,NULL,'spot renamed',0,0,12000.00,NULL,'2018-06-12 00:00:00','S','reduced rate',2),(98,'Agua',162,NULL,NULL,5,0,12000.00,'2018-06-08 00:00:00','2018-06-12 00:00:00','B','Client asked for this spot specifically. Billable for sure!',NULL),(99,'eau',162,NULL,NULL,0,0,0.00,'2018-06-08 00:00:00','2018-06-12 00:00:00','S','Client didn\'t order spot and the spot never got to a point where it was sendable.',NULL),(100,'Wasser aka \"Acqua\"',162,NULL,'Production please be aware the client is changing the name of the spot on V.2, original name was \"Acqua\"',3,0,10000.00,NULL,'2018-06-12 00:00:00','R','Client loved the spot, billing discount WB TV rate, only 3 revisions included with discount',NULL),(101,'Mizu',162,NULL,NULL,0,0,12000.00,'2018-06-08 00:00:00','2018-06-12 00:00:00','S',NULL,NULL),(102,'Master',169,NULL,NULL,3,0,48000.00,'2018-06-22 00:00:00','2018-06-26 00:00:00','B',NULL,NULL),(103,'Tears',186,NULL,'Wes\' cut',0,0,45000.00,NULL,'2018-06-21 00:00:00','S','Cutting two pieces, massey ordered 1, TBD on which to bill and if we can bill one hourly or not',NULL),(104,':15 TV Blue',156,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,NULL),(105,'Waves',193,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,NULL),(106,'Brodner Spot 1',193,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,NULL),(107,'Warrior',193,NULL,NULL,4,0,12500.00,NULL,NULL,'R','Massey loved spot, bill this one.',NULL),(108,'Lyle Spot 1',193,NULL,'\"Sand\"',0,0,0.00,NULL,NULL,'B',NULL,NULL),(109,'Tracy',193,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,NULL),(110,'Brodner Spot 1',187,NULL,NULL,0,0,0.00,NULL,'2018-06-25 00:00:00','S',NULL,NULL),(111,'Creal Spot 1',187,NULL,'Will retitle once we know what we are calling it!',4,0,12500.00,'2018-06-22 00:00:00','2018-06-25 00:00:00','B',NULL,NULL),(112,'Schlegs Spot 1',187,NULL,NULL,0,0,0.00,NULL,'2018-06-25 00:00:00','S',NULL,NULL),(113,'Brodner Spot 2',187,NULL,NULL,0,0,0.00,'2018-06-25 00:00:00','2018-06-25 00:00:00','S','Brodner finished his first spot quickly and had another idea for a second spot.',NULL),(114,'Power Outage',196,NULL,'Hall H piece',4,0,0.00,NULL,NULL,'B',NULL,NULL),(115,'Blitz',197,NULL,NULL,4,0,45000.00,NULL,NULL,'B','MJ said cannot go over 45 and will probably need a reduction.',NULL),(116,'Fears',186,NULL,NULL,0,0,0.00,NULL,NULL,'S',NULL,NULL),(117,'Red',200,NULL,NULL,4,0,12500.00,'2018-07-04 00:00:00','2018-07-06 00:00:00','B',NULL,NULL),(118,'Green',199,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,NULL),(119,'Blue',200,NULL,NULL,4,0,12500.00,NULL,NULL,'B',NULL,NULL),(120,'Unbelievable',202,NULL,'French Trailer :90',2,0,30000.00,'2018-07-12 00:00:00','2018-07-13 00:00:00','B','Rate discussed and approved with client',NULL),(121,'Searching',202,NULL,'German/general international trailer 2:00 or less',2,0,30000.00,'2018-07-16 00:00:00','2018-07-17 00:00:00','B','budget discussed and approved by client',NULL),(122,'Legendary',203,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,NULL),(123,'Ralph',209,NULL,NULL,3,0,125000.00,'2018-10-18 00:00:00','2018-10-22 00:00:00','B',NULL,NULL),(124,'China 30',209,NULL,NULL,0,0,0.00,NULL,NULL,'B','hourly',NULL),(125,'China 60',222,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL,NULL),(126,'Torn',223,NULL,NULL,0,0,0.00,'2018-09-18 00:00:00','2018-09-20 00:00:00','B',NULL,NULL),(127,'Two Worlds',224,NULL,'Cole',4,0,12500.00,NULL,'2018-10-05 00:00:00','B',NULL,NULL),(128,'Hope',224,NULL,'Cole',4,0,12500.00,NULL,'2018-10-05 00:00:00','B',NULL,NULL),(129,'Belong',224,NULL,'Lynn',4,0,12500.00,NULL,'2018-10-05 00:00:00','B',NULL,NULL),(130,'Follow Me',224,NULL,'Brodner',4,0,12500.00,NULL,'2018-10-05 00:00:00','B',NULL,NULL),(131,'Torn 60',224,NULL,'Trailer cutdown\nCole',0,0,0.00,NULL,'2018-10-10 00:00:00','B','Trailer cutdown billing :60 hourly',NULL),(132,'Two Worlds 20',224,NULL,'Blake',4,0,4000.00,NULL,'2018-10-22 00:00:00','B','Cutdown from :30 TV spot',NULL),(133,'Hope 20',224,NULL,'Blake',4,0,4000.00,NULL,'2018-10-22 00:00:00','B','Cutdown from :30 TV spot',NULL),(134,'Special Event',224,NULL,':15 TV Spot\nDoran',4,0,7000.00,NULL,'2018-10-23 00:00:00','B',NULL,NULL),(135,'Believe',224,NULL,':30 TV Spot\nCole',4,0,12500.00,NULL,'2018-10-05 00:00:00','B',NULL,NULL),(136,'Protect',224,NULL,':15 TV Spot\nCole',4,0,7000.00,NULL,'2018-10-23 00:00:00','B',NULL,NULL),(137,'Training',224,NULL,':15 TV Spot\nCole',4,0,7000.00,NULL,'2018-10-23 00:00:00','B',NULL,NULL),(138,'Torn 60 1X1',225,NULL,'Cole',0,0,0.00,NULL,'2018-10-19 00:00:00','B','Repurposig 60 to fit in the 1X1 framing',NULL);
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
  `prod_accept` smallint(1) DEFAULT '0',
  `finish_accept` smallint(1) DEFAULT '0',
  `line_status_id` int(11) DEFAULT NULL,
  `spot_sent_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `request_id` (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent`
--

LOCK TABLES `redi_spot_sent` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent` DISABLE KEYS */;
INSERT INTO `redi_spot_sent` VALUES (1,43,NULL,156,NULL,0,NULL,0,'1,1',NULL,NULL,NULL,NULL,NULL,'null',NULL,'null',NULL,0,0,0,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,0,1,NULL,1,NULL,'2018-11-08 12:51:58',NULL),(2,44,NULL,156,NULL,0,NULL,0,'1,1',NULL,NULL,NULL,NULL,NULL,'null',NULL,'null',NULL,0,0,0,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,0,1,NULL,1,NULL,'2018-11-09 18:07:47',NULL),(3,45,NULL,156,NULL,0,'1',0,'1,1',NULL,'Set up fiber with WB on line 415 in Paul\'s bay, call us in there to test/patch',NULL,NULL,NULL,'null',NULL,'null',NULL,0,0,0,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,0,1,NULL,35,NULL,'2018-11-09 18:16:38',NULL),(36,47,47,4,156,1,NULL,0,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','test audio note',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,10,9',97,6,40,0,0,2,'2018-02-20 00:00:00',81,NULL,'2018-11-13 15:59:43',NULL),(37,47,47,2,157,1,'1,2,4',1,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','test audio note',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,10,9',99,2,NULL,0,0,1,'2018-02-20 00:00:00',81,NULL,'2018-11-13 15:59:43',NULL),(47,50,47,4,156,0,'3,4',0,'1,1','','a','b',NULL,NULL,'null','','null','',0,0,0,'','',0,0,'',NULL,NULL,'null','',0,NULL,'37','50',79,NULL,NULL,0,0,1,NULL,81,NULL,'2018-11-13 16:24:47',NULL),(48,51,NULL,4,156,0,NULL,0,'1,1','','','',NULL,NULL,'null','','null','',0,0,0,'','',0,0,'',NULL,NULL,'null','',0,NULL,NULL,'[]',NULL,NULL,NULL,0,0,1,NULL,81,NULL,'2018-11-13 16:30:01',NULL),(49,52,47,4,156,0,NULL,0,'1,1','','','',NULL,NULL,'null','','null','',0,0,0,'','',0,0,'',NULL,NULL,'null','',0,NULL,NULL,'[]',NULL,NULL,NULL,0,0,1,NULL,81,NULL,'2018-11-13 16:34:33',NULL),(50,53,47,4,156,1,NULL,0,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','test audio note',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,10,9',97,6,40,0,0,2,'2018-02-20 00:00:00',81,NULL,'2018-11-13 18:09:26',NULL),(51,53,47,2,157,1,'1,2,4',1,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','test audio note',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,10,9',99,2,NULL,0,0,1,'2018-02-20 00:00:00',81,NULL,'2018-11-13 18:09:26',NULL),(55,54,47,4,156,1,NULL,0,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','test audio note',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,10,9',97,6,40,0,0,2,'2018-02-20 00:00:00',16,NULL,'2018-11-17 15:38:06',NULL),(56,54,47,2,157,1,'1,2,4',1,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','test audio note',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,10,9',99,2,NULL,0,0,1,'2018-02-20 00:00:00',16,NULL,'2018-11-17 15:38:06',NULL),(57,64,45,4,NULL,1,NULL,0,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','test audio note',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,10,9',97,6,40,0,0,2,'2018-02-20 00:00:00',16,NULL,'2018-11-18 16:09:30',NULL),(64,46,47,1,NULL,1,NULL,0,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','test audio note',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','[]',97,6,40,1,1,1,'2018-02-20 00:00:00',81,16,'2018-11-13 14:30:11','2018-11-18 18:34:11'),(65,46,47,4,156,1,NULL,1,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','test audio note',1,1,'some note',NULL,NULL,'2,1','some note',0,2,NULL,'[]',99,2,NULL,0,0,1,'2018-02-20 00:00:00',81,16,'2018-11-13 14:30:11','2018-11-18 18:34:11'),(66,46,47,68,NULL,1,NULL,0,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','test audio note',1,1,'some note',NULL,NULL,'2,1','some note',1,2,NULL,'[]',97,6,40,0,0,1,'2018-02-20 00:00:00',81,16,'2018-11-13 14:30:11','2018-11-18 18:34:11'),(67,66,45,3,NULL,1,NULL,0,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','test audio note',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,10,9',97,6,40,0,0,2,'2018-02-20 00:00:00',16,NULL,'2018-11-18 19:59:54',NULL);
/*!40000 ALTER TABLE `redi_spot_sent` ENABLE KEYS */;
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
INSERT INTO `redi_spot_sent_option` VALUES ('audio_option','[{\"id\":1,\"name\":\"Broadcast Stereo\"},{\"id\":2,\"name\":\"Broadcast 5.1\"},{\"id\":3,\"name\":\"Digital Stereo\"},{\"id\":4,\"name\":\"Event Stereo\"},{\"id\":5,\"name\":\"Event 5.1\"}]'),('delivery_to_client_option','[{\"id\":2,\"name\":\"TV/Streaming\",\"sort\":1,\"children\":[{\"id\":1,\"name\":\"Wiredrive\",\"sort\":1},{\"id\":2,\"name\":\"HBO Aspera\",\"sort\":2},{\"id\":3,\"name\":\"USA MediaSilo\",\"sort\":3}]},{\"id\":3,\"name\":\"Gaming\",\"sort\":2,\"children\":[{\"id\":1,\"name\":\"Wiredrive\",\"sort\":1},{\"id\":2,\"name\":\"Microsoft Aspera\",\"sort\":2}]}]'),('finishing_option','[{\"id\":1,\"name\":\"OOH Finish Prep\",\"sort\":1,\"children\":[{\"id\":1,\"name\":\"Theatrical\",\"sort\":1},{\"id\":2,\"name\":\"TV Streaming\",\"sort\":2},{\"id\":3,\"name\":\"Games\",\"sort\":3}]},{\"id\":2,\"name\":\"In-House Finish\",\"sort\":2,\"children\":[{\"id\":1,\"name\":\"Theatrical\",\"sort\":1},{\"id\":2,\"name\":\"TV Streaming\",\"sort\":2},{\"id\":3,\"name\":\"Games\",\"sort\":3}]}]'),('framerate_option','[\"23.98p\",\"29.97i\",\"29.97p\",\"25p\",\"59.94p\"]'),('raster_size_option','[\"4K UHD\",\"HD (16X9)\",\"9X16\",\"1X1\"]'),('sent_via_method','[{\"id\":1,\"name\":\"Fiber/Flex\",\"sort\":1},{\"id\":2,\"name\":\"Post\",\"sort\":2},{\"id\":3,\"name\":\"Email Link\",\"sort\":3},{\"id\":4,\"name\":\"Internal Link\",\"sort\":4},{\"id\":5,\"name\":\"In House Presentation\",\"sort\":5}]'),('status','[{\"id\":1,\"name\":\"Draft\",\"sort\":1},{\"id\":2,\"name\":\"Sent to post\",\"sort\":2}]');
/*!40000 ALTER TABLE `redi_spot_sent_option` ENABLE KEYS */;
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
) ENGINE=MyISAM AUTO_INCREMENT=216 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_version`
--

LOCK TABLES `redi_spot_version` WRITE;
/*!40000 ALTER TABLE `redi_spot_version` DISABLE KEYS */;
INSERT INTO `redi_spot_version` VALUES (1,58,1,NULL,NULL,NULL),(2,55,6,NULL,NULL,NULL),(3,55,1,NULL,NULL,NULL),(4,20,1,NULL,NULL,NULL),(5,2,21,NULL,NULL,NULL),(6,2,1,NULL,NULL,NULL),(7,2,6,NULL,NULL,NULL),(8,2,2,NULL,NULL,NULL),(9,58,3,NULL,NULL,NULL),(10,59,4,NULL,NULL,NULL),(11,59,8,NULL,NULL,NULL),(12,59,3,NULL,NULL,NULL),(13,60,1,NULL,NULL,NULL),(14,69,3,NULL,NULL,NULL),(15,64,2,NULL,NULL,NULL),(16,64,3,NULL,NULL,NULL),(17,64,4,NULL,NULL,NULL),(18,64,5,NULL,NULL,NULL),(19,64,7,NULL,NULL,NULL),(20,71,1,NULL,NULL,NULL),(21,73,1,NULL,NULL,NULL),(22,75,1,NULL,NULL,NULL),(23,75,2,NULL,NULL,NULL),(24,75,3,NULL,NULL,NULL),(25,75,5,NULL,NULL,NULL),(26,4,1,NULL,NULL,NULL),(27,55,4,NULL,NULL,NULL),(28,73,6,NULL,NULL,NULL),(29,73,11,NULL,NULL,NULL),(30,77,1,NULL,NULL,NULL),(31,55,46,NULL,NULL,NULL),(32,55,12,NULL,NULL,NULL),(33,73,48,NULL,NULL,NULL),(34,78,1,4,'Waiting on Brad to approve the first round while the team is continuing to work !!',NULL),(35,78,4,7,'we need all red graphics',NULL),(36,100,1,3,'null',NULL),(37,100,6,NULL,NULL,NULL),(38,97,1,3,'null',NULL),(39,102,53,9,'Test version note of random length',NULL),(40,97,6,9,'remove shot of the clown add shot of the elephant.\r\nLose all dogs.\r\nAdd in barks.',NULL),(41,105,1,3,'null',NULL),(42,108,1,3,'null',NULL),(43,107,1,3,'null',NULL),(44,106,1,3,'null',NULL),(45,107,6,NULL,NULL,NULL),(46,79,1,3,'null',NULL),(47,103,1,9,'Cut an amazing V.1',NULL),(48,110,1,6,'null',NULL),(49,111,1,9,'null',NULL),(50,112,1,4,'null',NULL),(51,113,1,9,'null',NULL),(52,111,54,NULL,NULL,NULL),(53,111,55,NULL,NULL,NULL),(54,112,56,9,'null',NULL),(55,112,57,6,'null',NULL),(56,103,58,NULL,NULL,NULL),(57,110,6,3,'add more monkey',NULL),(58,103,61,NULL,NULL,NULL),(59,103,63,NULL,NULL,NULL),(60,114,1,NULL,NULL,NULL),(61,117,1,NULL,NULL,NULL),(62,118,1,NULL,NULL,NULL),(63,117,66,9,'null',NULL),(64,117,6,NULL,NULL,NULL),(65,117,67,NULL,NULL,NULL),(66,117,68,NULL,NULL,NULL),(67,117,69,NULL,NULL,NULL),(68,117,70,NULL,NULL,NULL),(69,120,1,NULL,NULL,NULL),(70,120,5,NULL,NULL,NULL),(71,120,6,NULL,NULL,NULL),(72,120,75,7,'null',NULL),(73,120,74,7,'null',NULL),(74,120,14,NULL,NULL,NULL),(75,120,11,NULL,NULL,NULL),(76,120,16,NULL,NULL,NULL),(77,120,19,7,'null',NULL),(78,120,21,NULL,NULL,NULL),(79,120,24,NULL,NULL,NULL),(80,120,26,NULL,NULL,NULL),(81,120,36,NULL,NULL,NULL),(82,120,31,NULL,NULL,NULL),(83,121,1,NULL,NULL,NULL),(84,121,4,NULL,NULL,NULL),(85,121,6,NULL,NULL,NULL),(86,121,9,NULL,NULL,NULL),(87,121,10,NULL,NULL,NULL),(88,121,76,NULL,NULL,NULL),(89,121,11,NULL,NULL,NULL),(90,121,16,NULL,NULL,NULL),(91,121,19,NULL,NULL,NULL),(92,121,21,NULL,NULL,NULL),(93,121,24,NULL,NULL,NULL),(94,121,26,NULL,NULL,NULL),(95,121,30,NULL,NULL,NULL),(96,121,31,3,'null',NULL),(97,121,36,10,'null',NULL),(98,97,11,NULL,NULL,NULL),(99,120,41,7,'use shark joke, shorten lose “nice kitty nice kitty” boom – if you didn’t have that wouldn’t be as scary. Can it work without it.\r\n\r\n.  Flush out more time of the racing, in slaughter house.  \r\n\r\nOkay kid show me what you got.  See them racing against each other. Her in car going at it.\r\n\r\nDon’t lose flossing\r\n\r\nDon’t get too dark and gang infested. \r\n“Slaughter Race, This is the most dangerous of all the racing games.”\r\n“Slaughter Race, this game’s dangerous!”\r\nSlaughter house this the \r\nHesitant nervous ralph – \r\n+Stay in your lane, there are no lanes here we can go anywhere!\r\n\r\nPulled up her hood “see what you got kid” – unstoppable (far shot so don’t have too)',NULL),(100,120,44,3,'null',NULL),(101,84,2,3,'null',NULL),(102,122,1,NULL,NULL,NULL),(103,84,1,4,'test note',NULL),(104,84,3,NULL,NULL,NULL),(105,84,6,0,'null',NULL),(106,123,1,3,'null',NULL),(107,124,1,7,'null',NULL),(108,124,6,7,'null',NULL),(109,124,11,3,'null',NULL),(110,125,1,7,'null',NULL),(111,125,6,7,'null',NULL),(112,125,11,7,'null',NULL),(113,125,16,7,'null',NULL),(114,126,1,7,'null',NULL),(115,126,7,7,'null',NULL),(116,126,8,7,'null',NULL),(117,126,11,7,'null',NULL),(118,126,14,7,'null',NULL),(119,126,16,7,'null',NULL),(120,126,19,7,'null',NULL),(121,126,21,7,'null',NULL),(122,126,24,7,'null',NULL),(123,126,26,7,'null',NULL),(124,126,29,7,'null',NULL),(125,126,31,7,'null',NULL),(126,126,34,7,'null',NULL),(127,126,36,7,'null',NULL),(128,126,41,7,'null',NULL),(129,126,44,7,'null',NULL),(130,126,47,7,'null',NULL),(131,126,48,7,'null',NULL),(132,126,79,7,'null',NULL),(134,127,1,7,'null',NULL),(135,127,6,7,'null',NULL),(136,127,11,7,'null',NULL),(137,127,14,7,'null',NULL),(138,127,16,7,'null',NULL),(139,127,20,7,'null',NULL),(140,127,21,7,'null',NULL),(141,127,25,5,'null',NULL),(142,127,80,7,'null',NULL),(143,128,1,7,'null',NULL),(144,128,6,7,'null',NULL),(145,128,11,7,'null',NULL),(149,128,82,7,'null',NULL),(148,128,15,7,'null',NULL),(150,128,83,5,'null',NULL),(151,129,1,7,'null',NULL),(152,129,6,7,'null',NULL),(153,129,9,7,'null',NULL),(154,129,11,7,'null',NULL),(155,129,81,10,'null',NULL),(156,129,16,7,'null',NULL),(157,129,21,7,'null',NULL),(158,129,26,7,'null',NULL),(159,129,30,7,'null',NULL),(162,129,84,6,'null',NULL),(163,130,1,NULL,NULL,NULL),(164,130,6,NULL,NULL,NULL),(165,130,11,NULL,NULL,NULL),(166,130,16,NULL,NULL,NULL),(167,130,20,NULL,NULL,NULL),(168,130,85,NULL,NULL,NULL),(169,130,21,NULL,NULL,NULL),(170,130,26,NULL,NULL,NULL),(171,130,30,NULL,NULL,NULL),(172,130,84,NULL,NULL,NULL),(173,131,1,7,'null',NULL),(174,131,6,7,'null',NULL),(175,131,11,7,'null',NULL),(176,131,16,1,'null',NULL),(177,132,1,NULL,NULL,NULL),(178,132,6,NULL,NULL,NULL),(179,132,10,NULL,NULL,NULL),(180,133,1,NULL,NULL,NULL),(181,133,6,NULL,NULL,NULL),(182,133,11,NULL,NULL,NULL),(183,133,15,NULL,NULL,NULL),(184,134,1,NULL,NULL,NULL),(185,134,6,NULL,NULL,NULL),(186,134,11,NULL,NULL,NULL),(187,134,14,NULL,NULL,NULL),(188,134,15,NULL,NULL,NULL),(189,134,86,NULL,NULL,NULL),(190,134,16,NULL,NULL,NULL),(191,135,1,NULL,NULL,NULL),(192,135,6,NULL,NULL,NULL),(193,135,11,NULL,NULL,NULL),(194,135,14,NULL,NULL,NULL),(195,135,16,NULL,NULL,NULL),(196,135,20,NULL,NULL,NULL),(197,135,85,NULL,NULL,NULL),(198,135,21,NULL,NULL,NULL),(199,135,25,NULL,NULL,NULL),(200,135,80,NULL,NULL,NULL),(201,135,87,NULL,NULL,NULL),(202,136,1,NULL,NULL,NULL),(203,136,6,NULL,NULL,NULL),(204,136,9,NULL,NULL,NULL),(205,136,11,NULL,NULL,NULL),(206,136,15,NULL,NULL,NULL),(207,136,82,NULL,NULL,NULL),(208,137,1,NULL,NULL,NULL),(209,137,6,NULL,NULL,NULL),(210,137,11,NULL,NULL,NULL),(211,137,15,NULL,NULL,NULL),(212,137,82,NULL,NULL,NULL),(213,138,1,NULL,NULL,NULL);
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
INSERT INTO `redi_spot_version_editor` VALUES (1,37),(3,32),(4,37),(27,0),(34,0),(35,0),(40,3),(40,4),(40,5),(40,12);
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
) ENGINE=MyISAM AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_time_entry`
--

LOCK TABLES `redi_time_entry` WRITE;
/*!40000 ALTER TABLE `redi_time_entry` DISABLE KEYS */;
INSERT INTO `redi_time_entry` VALUES (25,1,NULL,NULL,NULL,'2017-01-12 01:30:00',1.15,NULL,NULL,NULL,4,'','',0,1,'2017-01-12 13:51:23',NULL,NULL,3,NULL),(24,47,NULL,NULL,NULL,'2017-01-11 20:45:28',1.00,NULL,NULL,NULL,4,'','',0,47,'2017-01-10 14:59:39',NULL,NULL,1,NULL),(23,47,NULL,NULL,NULL,'2017-01-10 20:45:03',1.00,NULL,NULL,NULL,4,'','',0,47,'2017-01-10 14:56:28',NULL,NULL,1,NULL),(22,47,NULL,NULL,NULL,'2017-01-10 20:30:13',1.00,NULL,NULL,NULL,22,'','',0,47,'2017-01-10 14:39:30',NULL,NULL,1,NULL),(21,47,NULL,NULL,NULL,'2017-01-10 20:30:36',1.00,NULL,NULL,NULL,5,'','',0,47,'2017-01-10 14:38:20',NULL,NULL,1,NULL),(19,2,NULL,NULL,NULL,'2017-01-09 11:00:24',1.00,NULL,NULL,NULL,22,'','Here are some lorem ipsum notes',0,47,'2017-01-09 03:32:55',NULL,NULL,3,NULL),(20,2,NULL,NULL,NULL,'2017-01-10 14:00:03',8.00,NULL,NULL,NULL,4,'','',0,47,'2017-01-10 14:33:53',NULL,NULL,1,NULL),(18,47,149,NULL,5,'2017-01-09 14:00:00',1.30,NULL,NULL,NULL,14,'','Optional notes....',0,47,'2017-01-09 03:05:39',NULL,NULL,1,NULL),(26,6,NULL,NULL,NULL,'2017-01-12 01:30:00',1.30,NULL,NULL,NULL,1,'','',0,1,'2017-01-12 13:56:55',NULL,NULL,3,NULL),(27,6,NULL,NULL,NULL,'2017-01-13 01:00:02',1.30,NULL,NULL,NULL,4,'','',0,1,'2017-01-12 17:46:14',NULL,NULL,1,NULL),(28,7,NULL,NULL,NULL,'2017-01-13 04:45:02',2.15,NULL,NULL,NULL,22,'','',0,1,'2017-01-12 17:54:04',NULL,NULL,1,NULL),(29,9,149,2,1,'2017-01-16 06:15:18',1.00,NULL,NULL,NULL,1,'','',0,1,'2017-01-17 06:25:31',NULL,NULL,1,NULL),(30,1,NULL,NULL,NULL,'2017-01-16 15:30:18',2.00,NULL,NULL,NULL,21,'','',0,1,'2017-01-20 09:34:08',NULL,NULL,3,NULL),(31,1,149,2,1,'2017-01-24 11:00:04',3.00,NULL,NULL,NULL,5,'','Editorial works completed.',0,1,'2017-01-24 12:44:08',NULL,NULL,1,NULL),(32,1,NULL,NULL,NULL,'2018-05-03 10:15:26',1.00,NULL,NULL,NULL,3,'','',0,1,'2018-05-03 04:20:58',NULL,NULL,1,NULL),(33,1,157,NULL,84,'2018-05-03 14:15:18',1.00,NULL,NULL,NULL,2,'','',0,1,'2018-05-03 17:29:25',NULL,NULL,1,NULL),(34,1,156,NULL,79,'2018-05-04 15:15:14',2.30,NULL,NULL,NULL,8,'','did a lot of stuff',0,1,'2018-05-03 18:21:29',NULL,NULL,1,NULL),(35,1,NULL,2,1,'2016-04-15 00:00:00',9.00,NULL,NULL,NULL,3,NULL,'some note',0,1,'2018-05-27 21:00:25',NULL,NULL,1,NULL),(38,1,156,4,78,'2018-06-05 09:00:00',1.00,NULL,NULL,NULL,3,'test abc',NULL,0,1,'2018-06-05 17:29:14',NULL,NULL,3,NULL),(36,1,NULL,2,1,'2018-06-05 00:00:00',9.00,NULL,NULL,NULL,3,NULL,'some note',0,1,'2018-06-05 12:55:13',NULL,NULL,3,NULL),(39,1,NULL,NULL,NULL,'2018-06-06 15:00:00',1.00,NULL,NULL,NULL,7,'Sample description lorem ipsum...',NULL,0,1,'2018-06-06 10:05:45',NULL,NULL,3,NULL),(40,1,156,NULL,81,'2018-06-04 09:00:00',1.00,NULL,NULL,NULL,2,'Breaking down movie.',NULL,0,1,'2018-06-06 10:31:54',NULL,NULL,5,NULL),(41,1,NULL,NULL,NULL,'2018-06-07 12:00:51',8.00,NULL,NULL,NULL,7,'Waiting for John Doe',NULL,0,1,'2018-06-07 07:13:25',NULL,NULL,3,NULL),(42,1,NULL,NULL,NULL,'2018-06-07 12:15:54',1.00,NULL,NULL,NULL,7,'Waiting',NULL,0,1,'2018-06-07 07:21:18',NULL,NULL,3,NULL),(43,1,NULL,NULL,NULL,'2018-06-06 17:00:00',0.30,NULL,NULL,NULL,30,'',NULL,0,1,'2018-06-07 12:33:48',NULL,NULL,3,NULL),(44,1,NULL,NULL,NULL,'2018-06-06 17:00:00',1.00,NULL,NULL,NULL,35,'',NULL,0,1,'2018-06-07 13:00:36',NULL,NULL,3,NULL),(45,1,NULL,NULL,NULL,'2018-06-06 18:00:00',1.00,NULL,NULL,NULL,7,'asd',NULL,0,1,'2018-06-07 13:02:12',NULL,NULL,3,NULL),(46,1,NULL,NULL,NULL,'2018-06-06 18:00:00',1.00,NULL,NULL,NULL,37,'',NULL,0,1,'2018-06-07 13:07:30',NULL,NULL,3,NULL),(47,1,NULL,NULL,NULL,'2018-06-06 18:00:00',1.00,NULL,NULL,NULL,34,'',NULL,0,1,'2018-06-07 13:12:05',NULL,NULL,3,NULL),(48,1,NULL,NULL,NULL,'2018-06-08 13:00:00',0.30,NULL,NULL,NULL,22,'',NULL,0,1,'2018-06-07 17:06:11',NULL,NULL,3,NULL),(49,1,NULL,NULL,NULL,'2018-06-06 13:00:00',1.00,NULL,NULL,NULL,36,'waiting on finishing to approve finish',NULL,0,1,'2018-06-07 17:11:11',NULL,NULL,3,NULL),(50,1,156,1,78,'2018-06-06 14:00:00',1.30,NULL,NULL,NULL,8,'',NULL,0,1,'2018-06-07 18:53:57',NULL,NULL,3,NULL),(51,1,4,NULL,98,'2018-06-08 14:00:00',4.00,NULL,NULL,NULL,32,'',NULL,0,1,'2018-06-07 18:59:45',NULL,NULL,3,NULL),(52,1,156,1,78,'2018-06-08 08:00:00',1.00,NULL,NULL,NULL,31,'',NULL,0,1,'2018-06-08 12:41:10',NULL,NULL,3,NULL),(54,1,NULL,NULL,NULL,'2018-06-08 08:45:43',1.00,NULL,NULL,NULL,16,'production meeting',NULL,0,1,'2018-06-08 12:57:01',NULL,NULL,3,NULL),(56,1,181,NULL,79,'2018-06-15 08:00:00',3.30,NULL,NULL,NULL,2,'',NULL,0,1,'2018-06-15 07:50:06',NULL,NULL,1,NULL),(57,1,169,NULL,NULL,'2018-06-15 16:45:58',6.00,NULL,NULL,NULL,2,'',NULL,0,1,'2018-06-15 07:55:11',NULL,NULL,1,NULL),(58,1,162,NULL,NULL,'2018-06-08 09:00:00',1.00,NULL,NULL,NULL,8,'',NULL,0,1,'2018-06-15 10:10:50',NULL,NULL,3,NULL),(59,1,156,NULL,NULL,'2018-06-14 09:15:00',1.00,NULL,NULL,NULL,32,'',NULL,0,1,'2018-06-15 16:02:36',NULL,NULL,1,NULL),(60,1,157,NULL,NULL,'2018-06-08 15:00:00',1.00,NULL,NULL,NULL,2,'',NULL,0,1,'2018-06-15 16:51:32',NULL,NULL,3,NULL),(61,1,NULL,NULL,NULL,'2018-06-14 11:30:00',2.30,NULL,NULL,NULL,16,'',NULL,0,1,'2018-06-15 17:03:57',NULL,NULL,1,NULL),(62,1,186,NULL,103,'2018-06-20 09:00:26',3.45,NULL,NULL,NULL,32,'',NULL,0,1,'2018-06-20 15:10:35',NULL,NULL,1,NULL),(63,6,156,NULL,NULL,'2018-07-06 12:30:00',1.00,NULL,NULL,NULL,1,'omf',NULL,0,6,'2018-07-06 16:38:01',NULL,NULL,1,NULL),(64,1,NULL,NULL,NULL,'2018-07-06 14:30:00',1.00,NULL,NULL,NULL,16,'',NULL,0,1,'2018-07-06 17:22:57',NULL,NULL,1,NULL),(65,1,182,NULL,NULL,'2018-07-06 14:00:00',1.00,NULL,NULL,NULL,4,'',NULL,0,1,'2018-07-06 18:20:16',NULL,NULL,1,NULL),(66,1,NULL,2,1,'2016-04-15 00:00:00',9.00,NULL,NULL,NULL,0,NULL,'some note',0,1,'2018-07-16 15:08:09',NULL,NULL,1,NULL),(72,1,156,NULL,83,'2018-07-19 09:00:00',5.30,NULL,NULL,NULL,2,'',NULL,0,1,'2018-07-19 19:24:37',NULL,NULL,1,NULL),(75,1,NULL,NULL,NULL,'2018-07-05 10:30:00',2.00,NULL,NULL,NULL,34,'',NULL,0,1,'2018-07-26 14:40:42',NULL,NULL,1,NULL),(69,1,NULL,NULL,NULL,'2018-06-19 16:00:00',0.30,NULL,NULL,NULL,22,'null',NULL,0,1,'2018-07-18 00:12:34',NULL,NULL,1,NULL),(70,1,NULL,NULL,NULL,'2018-06-19 14:00:00',1.00,NULL,NULL,NULL,22,'null',NULL,0,1,'2018-07-18 00:13:37',NULL,NULL,1,NULL),(71,1,NULL,NULL,NULL,'2018-06-15 15:00:00',0.30,NULL,NULL,NULL,22,'null',NULL,0,1,'2018-07-18 00:21:45',NULL,NULL,1,NULL),(73,1,NULL,NULL,NULL,'2018-07-19 14:30:00',0.45,NULL,NULL,NULL,22,'',NULL,0,1,'2018-07-19 19:24:52',NULL,NULL,1,NULL),(74,1,NULL,NULL,NULL,'2018-07-19 15:15:00',2.45,NULL,NULL,NULL,36,'Waiting for details',NULL,0,1,'2018-07-19 19:30:19',NULL,NULL,1,NULL),(76,115,186,NULL,NULL,'2018-07-26 11:00:00',2.00,NULL,NULL,NULL,3,'',NULL,0,115,'2018-07-26 15:21:29',NULL,NULL,1,NULL),(77,115,156,NULL,NULL,'2018-07-26 13:00:00',1.00,NULL,NULL,NULL,24,'',NULL,0,115,'2018-07-26 15:22:17',NULL,NULL,1,NULL),(78,1,162,NULL,98,'2018-07-19 01:15:00',1.00,NULL,NULL,NULL,2,'fa',NULL,0,1,'2018-09-23 16:23:10',NULL,NULL,1,NULL),(79,1,162,NULL,98,'2018-09-29 01:15:00',1.00,NULL,NULL,NULL,18,'asdfsadf',NULL,0,1,'2018-09-23 16:26:43',NULL,NULL,1,NULL),(81,1,NULL,NULL,NULL,'2018-10-13 21:30:00',1.00,NULL,NULL,NULL,16,'test',NULL,0,1,'2018-10-08 12:40:19',NULL,NULL,1,NULL),(83,19,4,NULL,78,'2018-10-29 14:00:00',2.45,NULL,NULL,NULL,8,'',NULL,0,19,'2018-11-03 16:54:01',NULL,NULL,1,NULL),(84,19,207,NULL,78,'2018-11-06 04:30:00',13.00,7.00,4.00,2.00,5,'',NULL,0,19,'2018-11-04 18:40:03',NULL,NULL,2,NULL),(85,19,228,NULL,NULL,'2018-11-06 00:45:00',1.00,1.00,NULL,NULL,5,'',NULL,0,19,'2018-11-05 14:57:42',NULL,NULL,2,NULL),(86,1,223,NULL,NULL,'2018-11-05 10:15:00',1.00,NULL,NULL,NULL,23,'Creative meeting',NULL,0,1,'2018-11-06 14:25:57',NULL,NULL,1,NULL),(87,1,NULL,NULL,NULL,'2018-11-05 09:00:00',8.00,NULL,NULL,NULL,35,'',NULL,0,1,'2018-11-08 14:32:37',NULL,NULL,1,NULL),(89,1,156,4,78,'2018-11-05 18:00:00',1.00,NULL,NULL,NULL,21,'',NULL,0,1,'2018-11-09 12:14:55',NULL,NULL,1,NULL),(90,1,156,4,78,'2018-11-05 19:00:00',1.00,NULL,NULL,NULL,21,'',NULL,0,1,'2018-11-09 12:24:56',NULL,NULL,1,NULL),(91,1,157,NULL,NULL,'2018-06-08 15:00:00',1.45,NULL,NULL,NULL,2,'',NULL,0,1,'2018-06-15 16:51:32',NULL,NULL,3,NULL),(92,1,157,NULL,NULL,'2018-06-08 15:00:00',1.30,NULL,NULL,NULL,2,'',NULL,0,1,'2018-06-15 16:51:32',NULL,NULL,3,NULL),(93,1,157,NULL,NULL,'2018-06-08 15:00:00',1.15,NULL,NULL,NULL,2,'',NULL,0,1,'2018-06-15 16:51:32',NULL,NULL,3,NULL),(94,16,157,NULL,NULL,'2018-01-04 19:00:00',6.30,NULL,NULL,NULL,5,'',NULL,0,1,'2018-06-15 16:51:32',NULL,NULL,2,NULL),(95,16,163,NULL,NULL,'2018-01-04 07:00:00',1.00,NULL,NULL,NULL,5,'test desc 123',NULL,0,16,'2018-11-18 14:14:44',NULL,NULL,2,NULL),(96,16,163,NULL,10,'2018-01-04 08:00:00',5.30,NULL,NULL,NULL,5,'test desc 123',NULL,0,16,'2018-11-18 14:18:04',NULL,NULL,2,NULL),(97,16,163,NULL,10,'2018-01-04 14:30:00',3.45,NULL,NULL,NULL,5,'test desc 123',NULL,0,16,'2018-11-18 14:23:20',NULL,NULL,2,NULL),(98,160,163,NULL,10,'2018-01-04 16:00:00',2.45,NULL,NULL,NULL,5,'test desc 123',NULL,0,16,'2018-11-18 14:23:20',NULL,NULL,1,NULL),(99,16,163,NULL,10,'2018-01-06 16:00:00',9.50,NULL,NULL,NULL,5,'test desc 123',NULL,0,16,'2018-11-18 14:23:20',NULL,NULL,1,NULL),(100,16,163,NULL,10,'2018-01-06 16:00:00',5.00,NULL,NULL,NULL,5,'test desc 123',NULL,0,16,'2018-11-18 14:23:20',NULL,NULL,1,NULL);
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
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_time_entry_file`
--

LOCK TABLES `redi_time_entry_file` WRITE;
/*!40000 ALTER TABLE `redi_time_entry_file` DISABLE KEYS */;
INSERT INTO `redi_time_entry_file` VALUES (1,35,'test1.jpg','some description 100',199.20),(2,35,'test1.jpg',NULL,921.20),(3,35,'test1.jpg',NULL,1.00),(4,37,'test1.jpg','some description 100',199.20),(5,37,'test1.jpg',NULL,921.20),(6,37,'test1.jpg',NULL,1.00),(7,66,'test1.jpg','some description 100',199.20),(8,66,'test1.jpg',NULL,921.20),(9,66,'test1.jpg',NULL,1.00),(13,79,'test file.jpg','some desc for test 123',1.00),(14,95,'test1.jpg','some description 100',23.50),(15,95,'test1.jpg',NULL,921.20),(16,95,'test1.jpg',NULL,1.00),(17,96,'test1.jpg','some description 100',23.50),(18,96,'test1.jpg',NULL,921.20),(19,96,'test1.jpg',NULL,1.00),(20,97,'test1.jpg','some description 100',23.50),(21,97,'test1.jpg',NULL,921.20),(22,97,'test1.jpg',NULL,1.00);
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
) ENGINE=MyISAM AUTO_INCREMENT=116 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user`
--

LOCK TABLES `redi_user` WRITE;
/*!40000 ALTER TABLE `redi_user` DISABLE KEYS */;
INSERT INTO `redi_user` VALUES (1,'demo','0d107d09f5bbe40cade3de5c71e9e9b7','demo@indydutch.com','Demo','User','Demo','DU','1.png',100,NULL,NULL,NULL,10.00,NULL,NULL,8,'2018-11-29 16:27:48',NULL,1),(2,'AZEIGLER','0d107d09f5bbe40cade3de5c71e9e9b7','ashleyz@buddha-jones.com','ASHLEY','ZEIGLER','ASHLEY','AZ',NULL,1,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-09-14 12:17:47',NULL,1),(3,'KBOTHWELL','0d107d09f5bbe40cade3de5c71e9e9b7','katrinab@buddha-jones.com','KATRINA','BOTHWELL','KATRINA','KB',NULL,1,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(4,'DFRASER','0d107d09f5bbe40cade3de5c71e9e9b7','davidf@buddha-jones.com','DAVID LEITH','FRASER','DAVID LEITH','DF',NULL,2,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(5,'MBACHMAN','0d107d09f5bbe40cade3de5c71e9e9b7','MOLLYB@BUDDHA-JONES.COM','MOLLY','BACHMAN','MOLLY','MB',NULL,3,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(6,'JZAKOSKI','0d107d09f5bbe40cade3de5c71e9e9b7','JAMIEZ@BUDDHA-JONES.COM','JAMIE','ZAKOSKI','JAMIE','JZ',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-06 16:29:06',NULL,1),(7,'MALBORN','0d107d09f5bbe40cade3de5c71e9e9b7','MAXA@BUDDHA-JONES.COM','MAXWELL','ALBORN','MAXWELL','MA',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-16 16:13:54',NULL,1),(8,'JSMITH','0d107d09f5bbe40cade3de5c71e9e9b7','TALLYS@BUDDHA-JONES.COM','JUSTINE TALLY','SMITH','JUSTINE TALLY','JS',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(9,'JDAVIS','0d107d09f5bbe40cade3de5c71e9e9b7','JULIED@BUDDHA-JONES.COM','JULIE','DAVIS','JULIE','JD',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(10,'JFAGAN','0d107d09f5bbe40cade3de5c71e9e9b7','JOHNF@BUDDHA-JONES.COM','JOHN','FAGAN','JOHN','JF',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(11,'MBYRNES','0d107d09f5bbe40cade3de5c71e9e9b7','MARIEB@BUDDHA-JONES.COM','MARIE','BYRNES','MARIE','MB',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(12,'BHILL','0d107d09f5bbe40cade3de5c71e9e9b7','BLAKEH@BUDDHA-JONES.COM','BLAKE','HILL','BLAKE','BH',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(13,'SSISSON','0d107d09f5bbe40cade3de5c71e9e9b7','SOPHIAS@BUDDHA-JONES.COM','SOPHIA','SISSON','SOPHIA','SS',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(14,'BSANDEN','0d107d09f5bbe40cade3de5c71e9e9b7','BRITTONYAS@BUDDHA-JONES.COM','BRITTONYA','SANDEN','BRITTONYA','BS',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(15,'TFANG','0d107d09f5bbe40cade3de5c71e9e9b7','TONYF@BUDDHA-JONES.COM','TONY','FANG','TONY','TF',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-27 10:56:35',NULL,1),(16,'TJENG','0d107d09f5bbe40cade3de5c71e9e9b7','TRACYJ@BUDDHA-JONES.COM','TRACY','JENG','TRACY','TJ',NULL,5,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-11-18 12:56:12',NULL,1),(17,'GKUSUMA','0d107d09f5bbe40cade3de5c71e9e9b7','gregk@buddha-jones.com','GREGORIUS KENETH','KUSUMA','GREGORIUS KENETH','GK',NULL,5,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(18,'SROBERTSON','0d107d09f5bbe40cade3de5c71e9e9b7','STEVER@BUDDHA-JONES.COM','STEVEN','ROBERTSON','STEVEN','SR',NULL,27,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(19,'ACAPUTO','0d107d09f5bbe40cade3de5c71e9e9b7','ASHLEYC@BUDDHA-JONES.COM','ASHLEY','CAPUTO','ASHLEY','AC',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-11-04 14:25:46',NULL,1),(20,'ABENSON','0d107d09f5bbe40cade3de5c71e9e9b7','angeliqueb@buddha-jones.com','ANGELIQUE','BENSON','ANGELIQUE','AB',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(21,'JPRICE','0d107d09f5bbe40cade3de5c71e9e9b7','JENNIFERP@BUDDHA-JONES.COM','JENNIFER','PRICE','JENNIFER','JP',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(22,'AFARBER','0d107d09f5bbe40cade3de5c71e9e9b7','DREWF@BUDDHA-JONES.COM','ANDREW','FARBER','ANDREW','AF',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(23,'ABATES','0d107d09f5bbe40cade3de5c71e9e9b7','ALEXB@BUDDHA-JONES.COM','ALEXANDRA','BATES','ALEXANDRA','AB',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(24,'AGOULET','0d107d09f5bbe40cade3de5c71e9e9b7','ANDREWG@BUDDHA-JONES.COM','ANDREW','GOULET','ANDREW','AG',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-27 13:40:58',NULL,1),(25,'MSAMETH','0d107d09f5bbe40cade3de5c71e9e9b7','MACKS@BUDDHA-JONES.COM','MACKLIN','SAMETH','MACKLIN','MS',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-08-05 20:29:28',NULL,1),(26,'JONEIL','0d107d09f5bbe40cade3de5c71e9e9b7','JOHNNYO@BUDDHA-JONES.COM','JOHN','ONEIL','JOHN','JO',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-27 10:57:19',NULL,1),(27,'CPOWELL','0d107d09f5bbe40cade3de5c71e9e9b7','ericp@buddha-jones.com','CHRISTOPHER ERIC','POWELL','CHRISTOPHER ERIC','CP',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(28,'DOPPENHEIMER','0d107d09f5bbe40cade3de5c71e9e9b7','DORANO@BUDDHA-JONES.COM','DORAN','OPPENHEIMER','DORAN','DO',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(29,'SPINTO','0d107d09f5bbe40cade3de5c71e9e9b7','STEVEP@BUDDHA-JONES.COM','STEVEN','PINTO','STEVEN','SP',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-11-01 16:39:36',NULL,1),(30,'BCOLEMAN','0d107d09f5bbe40cade3de5c71e9e9b7','BRYANC@BUDDHA-JONES.COM','BRYAN','COLEMAN','BRYAN','BC',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(31,'USCHLEGEL','0d107d09f5bbe40cade3de5c71e9e9b7','ROBS@BUDDHA-JONES.COM','ULRICH','SCHLEGEL','ULRICH','US',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(32,'MWINBUSH','0d107d09f5bbe40cade3de5c71e9e9b7','MEKOW@BUDDHA-JONES.COM','MEKO','WINBUSH','MEKO','MW',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(33,'TRINKENBERGER','0d107d09f5bbe40cade3de5c71e9e9b7','TROYR@BUDDHA-JONES.COM','TROY','RINKENBERGER','TROY','TR',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(34,'DTAYLOR','0d107d09f5bbe40cade3de5c71e9e9b7','LYNNT@BUDDHA-JONES.COM','DANIEL','TAYLOR','DANIEL','DT',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-06-04 01:25:48',NULL,1),(35,'MBRODNER','0d107d09f5bbe40cade3de5c71e9e9b7','MIKEB@BUDDHA-JONES.COM','MICHAEL','BRODNER','MICHAEL','MB',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-11-08 14:52:00',NULL,1),(36,'DCREAL','0d107d09f5bbe40cade3de5c71e9e9b7','DAVECREAL@BUDDHA-JONES.COM','DAVID','CREAL','DAVID','DC',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-26 14:33:36',NULL,1),(37,'KGRIGGS','0d107d09f5bbe40cade3de5c71e9e9b7','KELLIG@BUDDHA-JONES.COM','KELLI','GRIGGS','KELLI','KG',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(38,'WMASSUNG','0d107d09f5bbe40cade3de5c71e9e9b7','BILLYM@BUDDHA-JONES.COM','WILLIAM','MASSUNG','WILLIAM','WM',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(39,'CNORDIGIAN','0d107d09f5bbe40cade3de5c71e9e9b7','CAITLINN@BUDDHA-JONES.COM','CAITLIN','NORDIGIAN','CAITLIN','CN',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(40,'JDADON','0d107d09f5bbe40cade3de5c71e9e9b7','jessicad@buddha-jones.com','JESSICA','DADON','JESSICA','JD',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(41,'WNISBETT','0d107d09f5bbe40cade3de5c71e9e9b7','WESLEYN@BUDDHA-JONES.COM','WESLEY','NISBETT','WESLEY','WN',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(42,'MMERENDA','0d107d09f5bbe40cade3de5c71e9e9b7','matthewm@buddha-jones.com','MATTHEW','MERENDA','MATTHEW','MM',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(43,'KBROWN','0d107d09f5bbe40cade3de5c71e9e9b7','krisb@buddha-jones.com','KRISTOPHER ROBERT','BROWN','KRISTOPHER ROBERT','KB',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(44,'JMOSKOW','0d107d09f5bbe40cade3de5c71e9e9b7','jacobm@buddha-jones.com','JACOB LAWRENCE','MOSKOW','JACOB LAWRENCE','JM',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(45,'LGOODALE','0d107d09f5bbe40cade3de5c71e9e9b7','lyleg@buddha-jones.com','LYLE','GOODALE','LYLE','LG',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(46,'MFERMAN','0d107d09f5bbe40cade3de5c71e9e9b7','michaelf@buddha-jones.com','MICHAEL ALEXANDER','FERMAN','MICHAEL ALEXANDER','MF',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(47,'RTHOMAS','0d107d09f5bbe40cade3de5c71e9e9b7','RICT@BUDDHA-JONES.COM','RICHARD MICHAEL','THOMAS','RICHARD MICHAEL','RT',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(48,'WNEIL','0d107d09f5bbe40cade3de5c71e9e9b7','BILLN@BUDDHA-JONES.COM','WILLIAM','NEIL','WILLIAM','WN',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(49,'JDUPPER','0d107d09f5bbe40cade3de5c71e9e9b7','JORDAND@BUDDHA-JONES.COM','JORDAN','DUPPER','JORDAN','JD',NULL,9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(50,'KBARLOW','0d107d09f5bbe40cade3de5c71e9e9b7','KATIEB@BUDDHA-JONES.COM','KATHERINE','BARLOW','KATHERINE','KB',NULL,8,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(51,'SROCHA','0d107d09f5bbe40cade3de5c71e9e9b7','SERGIOR@BUDDHA-JONES.COM','SERGIO','ROCHA','SERGIO','SR',NULL,9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(52,'KNASH','0d107d09f5bbe40cade3de5c71e9e9b7','KEVINN@BUDDHA-JONES.COM','KEVIN','NASH','KEVIN','KN',NULL,9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(53,'BROTH','0d107d09f5bbe40cade3de5c71e9e9b7','BENR@BUDDHA-JONES.COM','BENJAMIN','ROTH','BENJAMIN','BR',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(54,'JDIAZ','0d107d09f5bbe40cade3de5c71e9e9b7','JOHND@BUDDHA-JONES.COM','JOHN','DIAZ','JOHN','JD',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(55,'CMYERS','0d107d09f5bbe40cade3de5c71e9e9b7','christopherm@buddha-jones.com','CHRISTOPHER KYLO','MYERS','CHRISTOPHER KYLO','CM',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(56,'KSTOKES','0d107d09f5bbe40cade3de5c71e9e9b7','kelseys@buddha-jones.com','KELSEY ELISE','STOKES','KELSEY ELISE','KS',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(57,'ABARRAZA','0d107d09f5bbe40cade3de5c71e9e9b7','ALFREDOB@BUDDHA-JONES.COM','ALFREDO','BARRAZA','ALFREDO','AB',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(58,'MNAZAR','0d107d09f5bbe40cade3de5c71e9e9b7','mohamedn@buddha-jones.com','MOHAMED RAED','NAZAR','MOHAMED RAED','MN',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(59,'SCARSON','0d107d09f5bbe40cade3de5c71e9e9b7','CARSON@BUDDHA-JONES.COM','SCOTT','CARSON','SCOTT','SC',NULL,11,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(60,'MYOON','0d107d09f5bbe40cade3de5c71e9e9b7','megany@buddha-jones.com','MEGAN LAUREN','YOON','MEGAN LAUREN','MY',NULL,13,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(61,'KABIGAIL','0d107d09f5bbe40cade3de5c71e9e9b7','KATELYNNA@BUDDHA-JONES.COM','KATHERINE','ABIGAIL','KATHERINE','KA',NULL,13,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(62,'MCOX','0d107d09f5bbe40cade3de5c71e9e9b7','maryc@buddha-jones.com','MARY ELIZABETH','COX','MARY ELIZABETH','MC',NULL,13,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(63,'BROY','0d107d09f5bbe40cade3de5c71e9e9b7','BETHR@BUDDHA-JONES.COM','BETH','ROY','BETH','BR',NULL,14,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(64,'BBERLING','0d107d09f5bbe40cade3de5c71e9e9b7','BRADB@BUDDHA-JONES.COM','BRADFORD','BERLING','BRADFORD','BB',NULL,14,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-26 14:47:20',NULL,1),(65,'HSHIBANO','0d107d09f5bbe40cade3de5c71e9e9b7','HARUMIS@BUDDHA-JONES.COM','HARUMI','SHIBANO','HARUMI','HS',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(66,'BSALZANO','0d107d09f5bbe40cade3de5c71e9e9b7','bobs@buddha-jones.com','BOBBY','SALZANO','BOBBY','BS',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(67,'KPANG','0d107d09f5bbe40cade3de5c71e9e9b7','KEITHP@BUDDHA-JONES.COM','KEITH','PANG','KEITH','KP',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-06-04 18:38:20',NULL,1),(68,'RCASTRO','0d107d09f5bbe40cade3de5c71e9e9b7','RICARDOC@BUDDHA-JONES.COM','RICARDO','CASTRO','RICARDO','RC',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(69,'HFORSSTROM','0d107d09f5bbe40cade3de5c71e9e9b7','HALF@BUDDHA-JONES.COM','HEINO','FORSSTROM','HEINO','HF',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(70,'JREYES','0d107d09f5bbe40cade3de5c71e9e9b7','JONATHANR@BUDDHA-JONES.COM','JONATHAN','REYES','JONATHAN','JR',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(71,'DMEALER','0d107d09f5bbe40cade3de5c71e9e9b7','DAVEM@BUDDHA-JONES.COM','DAVE','MEALER','DAVE','DM',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(72,'BVANCE','0d107d09f5bbe40cade3de5c71e9e9b7','BENV@BUDDHA-JONES.COM','BENJAMIN','VANCE','BENJAMIN','BV',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(73,'DCHENETTE','0d107d09f5bbe40cade3de5c71e9e9b7','DAWNC@BUDDHA-JONES.COM','DAWN','CHENETTE','DAWN','DC',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(74,'SWERBER','0d107d09f5bbe40cade3de5c71e9e9b7','sarahw@buddha-jones.com','SARAH SHAE HALAS','WERBER','SARAH SHAE HALAS','SW',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(75,'DTSAI','0d107d09f5bbe40cade3de5c71e9e9b7','davidtsai@buddha-jones.com','DAVID','TSAI','DAVID','DT',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(76,'RFLORES','0d107d09f5bbe40cade3de5c71e9e9b7','REBECCAF@BUDDHA-JONES.COM','REBECCA','FLORES','REBECCA','RF',NULL,15,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-11-07 20:14:03',NULL,1),(77,'MPOCOCK','0d107d09f5bbe40cade3de5c71e9e9b7','mayap@buddha-jones.com','MAYA','POCOCK','MAYA','MP',NULL,15,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(78,'CPAYNE','0d107d09f5bbe40cade3de5c71e9e9b7','CRYSTALP@BUDDHA-JONES.COM','CRYSTAL','PAYNE','CRYSTAL','CP',NULL,16,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(79,'JWALKER','0d107d09f5bbe40cade3de5c71e9e9b7','JACOBW@BUDDHA-JONES.COM','JACOB','WALKER','JACOB','JW',NULL,16,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(80,'CCASE','0d107d09f5bbe40cade3de5c71e9e9b7','CHRISTIANC@BUDDHA-JONES.COM','CHRISTIAN','CASE','CHRISTIAN','CC',NULL,17,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(81,'DLINDBLAD','0d107d09f5bbe40cade3de5c71e9e9b7','DAVELINDBLAD@BUDDHA-JONES.COM','DAVID','LINDBLAD','DAVID','DL',NULL,18,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-11-14 16:20:47',NULL,1),(82,'GSMITH','0d107d09f5bbe40cade3de5c71e9e9b7','gregs@buddha-jones.com','GREGORY','SMITH','GREGORY','GS',NULL,18,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(83,'MBARBOUR','0d107d09f5bbe40cade3de5c71e9e9b7','MEGANB@BUDDHA-JONES.COM','MEGAN','BARBOUR','MEGAN','MB',NULL,18,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(84,'PHASTY','0d107d09f5bbe40cade3de5c71e9e9b7','PETEH@BUDDHA-JONES.COM','PETER','HASTY','PETER','PH',NULL,19,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(85,'JLONG','0d107d09f5bbe40cade3de5c71e9e9b7','john@buddha-jones.com','JOHN','LONG','JOHN','JL',NULL,20,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(86,'DASMA','0d107d09f5bbe40cade3de5c71e9e9b7','dan@buddha-jones.com','DANIEL','ASMA','DANIEL','DA',NULL,28,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(87,'JGODFREY','0d107d09f5bbe40cade3de5c71e9e9b7','jordang@buddha-jones.com','JORDAN MICHAEL','GODFREY','JORDAN MICHAEL','JG',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(88,'TSIMPSON','0d107d09f5bbe40cade3de5c71e9e9b7','tizs@buddha-jones.com','TIZIANA GRACE','SIMPSON','TIZIANA GRACE','TS',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(89,'KKATAMBWA','0d107d09f5bbe40cade3de5c71e9e9b7','KAZADIK@BUDDHA-JONES.COM','KAZADI','KATAMBWA','KAZADI','KK',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(90,'EFILLIOS','0d107d09f5bbe40cade3de5c71e9e9b7','EUGENEF@BUDDHA-JONES.COM','EUGENE','FILLIOS','EUGENE','EF',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(91,'RONDARZA','0d107d09f5bbe40cade3de5c71e9e9b7','ROBO@BUDDHA-JONES.COM','ROBERT','ONDARZA','ROBERT','RO',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(92,'AARMENISE','0d107d09f5bbe40cade3de5c71e9e9b7','ANTHONYA@BUDDHA-JONES.COM','ANTHONY','ARMENISE','ANTHONY','AA',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(93,'JROGERS','0d107d09f5bbe40cade3de5c71e9e9b7','JOSHUAR@BUDDHA-JONES.COM','JOSHUA','ROGERS','JOSHUA','JR',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(94,'JFINCH','0d107d09f5bbe40cade3de5c71e9e9b7','JENNIF@BUDDHA-JONES.COM','JENNIFER','FINCH','JENNIFER','JF',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(95,'KOPPENHEIMER','0d107d09f5bbe40cade3de5c71e9e9b7','KRYSTLE@BUDDHA-JONES.COM','KRYSTLE','OPPENHEIMER','KRYSTLE','KO',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-10-26 19:27:17',NULL,1),(96,'DLIGORNER','0d107d09f5bbe40cade3de5c71e9e9b7','DAVEL@BUDDHA-JONES.COM','DAVID','LIGORNER','DAVID','DL',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(97,'MLAFONTANT','0d107d09f5bbe40cade3de5c71e9e9b7','MARK.LAFONTANT@BUDDHA-JONES.COM','MARK','LAFONTANT','MARK','ML',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(98,'MKELLEY','0d107d09f5bbe40cade3de5c71e9e9b7','MATTHEWK@BUDDHA-JONES.COM','MATTHEW','KELLEY','MATTHEW','MK',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(99,'SCASTLE','0d107d09f5bbe40cade3de5c71e9e9b7','shainac@buddha-jones.com','SHAINA PAGE','CASTLE','SHAINA PAGE','SC',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(100,'BCURTIS','0d107d09f5bbe40cade3de5c71e9e9b7','brettc@buddha-jones.com','BRETT ALEXANDER','CURTIS','BRETT ALEXANDER','BC',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(101,'EDELK','0d107d09f5bbe40cade3de5c71e9e9b7','emilyd@buddha-jones.com','EMILY COLETTE','DELK','EMILY COLETTE','ED',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(102,'ESINGLETON','0d107d09f5bbe40cade3de5c71e9e9b7','lizs@buddha-jones.com','ELIZABETH SHANNON','SINGLETON','ELIZABETH SHANNON','ES',NULL,23,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(103,'ECORRADO','0d107d09f5bbe40cade3de5c71e9e9b7','EDC@BUDDHA-JONES.COM','EDUARDO','CORRADO','EDUARDO','EC',NULL,9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(104,'JRANDALL','0d107d09f5bbe40cade3de5c71e9e9b7','JOER@BUDDHA-JONES.COM','JOSEPH','RANDALL','JOSEPH','JR',NULL,23,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(105,'PHENNESSY','0d107d09f5bbe40cade3de5c71e9e9b7','paulh@buddha-jones.com','PAUL TIMOTHY','HENNESSY','PAUL TIMOTHY','PH',NULL,23,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(106,'MORTIZ','0d107d09f5bbe40cade3de5c71e9e9b7','MONIKAO@BUDDHA-JONES.COM','MONIKA','ORTIZ','MONIKA','MO',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-11-14 19:17:45',NULL,1),(107,'MCAUICH','0d107d09f5bbe40cade3de5c71e9e9b7','monicac@buddha-jones.com','MONICA MARIE','CAUICH','MONICA MARIE','MC',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(108,'CADALID','0d107d09f5bbe40cade3de5c71e9e9b7','CHRISTINEA@BUDDHA-JONES.COM','CHRISTINE','ADALID','CHRISTINE','CA',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(109,'LCERVANTES','0d107d09f5bbe40cade3de5c71e9e9b7','LAURAC@BUDDHA-JONES.COM','LAURA','CERVANTES','LAURA','LC',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-06 17:13:14',NULL,1),(110,'PLONG','0d107d09f5bbe40cade3de5c71e9e9b7','pharida@buddha-jones.com','PHARIDA','LONG','PHARIDA','PL',NULL,25,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(111,'MLIPSKY','0d107d09f5bbe40cade3de5c71e9e9b7','MARKL@BUDDHA-JONES.COM','MARK','LIPSKY','MARK','ML',NULL,25,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(112,'MMILLER','0d107d09f5bbe40cade3de5c71e9e9b7','MARINAM@BUDDHA-JONES.COM','MARINA','MILLER','MARINA','MM',NULL,100,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(113,'WHENES','0d107d09f5bbe40cade3de5c71e9e9b7','ALEXH@BUDDHA-JONES.COM','WILLIAM','HENES','WILLIAM','WH',NULL,26,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(114,'NSHEPTAK','0d107d09f5bbe40cade3de5c71e9e9b7','NICKS@BUDDHA-JONES.COM','NICHOLAS','SHEPTAK','NICHOLAS','NS',NULL,26,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(115,'VAMES','0d107d09f5bbe40cade3de5c71e9e9b7','VALERIEA@BUDDHA-JONES.COM','VALERIE','AMES','VALERIE','VA',NULL,26,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-26 15:09:10',NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=261 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_clockin`
--

LOCK TABLES `redi_user_clockin` WRITE;
/*!40000 ALTER TABLE `redi_user_clockin` DISABLE KEYS */;
INSERT INTO `redi_user_clockin` VALUES (2,2,'2018-11-27 09:05:00'),(3,3,'2018-11-27 09:05:00'),(4,4,'2018-11-27 09:05:00'),(5,5,'2018-11-27 09:05:00'),(6,6,'2018-11-27 09:05:00'),(7,7,'2018-11-27 09:05:00'),(8,8,'2018-11-27 09:05:00'),(9,9,'2018-11-27 09:05:00'),(10,10,'2018-11-27 09:05:00'),(11,11,'2018-11-27 09:05:00'),(12,12,'2018-11-27 09:05:00'),(13,13,'2018-11-27 09:05:00'),(14,14,'2018-11-27 09:05:00'),(15,15,'2018-11-27 09:05:00'),(16,16,'2018-11-27 09:05:00'),(17,17,'2018-11-27 09:05:00'),(18,18,'2018-11-27 09:05:00'),(19,19,'2018-11-27 09:05:00'),(20,20,'2018-11-27 09:05:00'),(21,21,'2018-11-27 09:05:00'),(22,22,'2018-11-27 09:05:00'),(23,23,'2018-11-27 09:05:00'),(24,24,'2018-11-27 09:05:00'),(25,25,'2018-11-27 09:05:00'),(26,26,'2018-11-27 09:05:00'),(27,27,'2018-11-27 09:05:00'),(28,28,'2018-11-27 09:05:00'),(29,29,'2018-11-27 09:05:00'),(30,30,'2018-11-27 09:05:00'),(31,31,'2018-11-27 09:05:00'),(32,32,'2018-11-27 09:05:00'),(33,33,'2018-11-27 09:05:00'),(34,34,'2018-11-27 09:05:00'),(35,35,'2018-11-27 09:05:00'),(36,36,'2018-11-27 09:05:00'),(37,37,'2018-11-27 09:05:00'),(38,38,'2018-11-27 09:05:00'),(39,39,'2018-11-27 09:05:00'),(40,40,'2018-11-27 09:05:00'),(41,41,'2018-11-27 09:05:00'),(42,42,'2018-11-27 09:05:00'),(43,43,'2018-11-27 09:05:00'),(44,44,'2018-11-27 09:05:00'),(45,45,'2018-11-27 09:05:00'),(46,46,'2018-11-27 09:05:00'),(47,47,'2018-11-27 09:05:00'),(48,48,'2018-11-27 09:05:00'),(49,49,'2018-11-27 09:05:00'),(50,50,'2018-11-27 09:05:00'),(51,51,'2018-11-27 09:05:00'),(52,52,'2018-11-27 09:05:00'),(53,53,'2018-11-27 09:05:00'),(54,54,'2018-11-27 09:05:00'),(55,55,'2018-11-27 09:05:00'),(56,56,'2018-11-27 09:05:00'),(57,57,'2018-11-27 09:05:00'),(58,58,'2018-11-27 09:05:00'),(59,59,'2018-11-27 09:05:00'),(60,60,'2018-11-27 09:05:00'),(61,61,'2018-11-27 09:05:00'),(62,62,'2018-11-27 09:05:00'),(63,63,'2018-11-27 09:05:00'),(64,64,'2018-11-27 09:05:00'),(65,65,'2018-11-27 09:05:00'),(66,66,'2018-11-27 09:05:00'),(67,67,'2018-11-27 09:05:00'),(68,68,'2018-11-27 09:05:00'),(69,69,'2018-11-27 09:05:00'),(70,70,'2018-11-27 09:05:00'),(71,71,'2018-11-27 09:05:00'),(72,72,'2018-11-27 09:05:00'),(73,73,'2018-11-27 09:05:00'),(74,74,'2018-11-27 09:05:00'),(75,75,'2018-11-27 09:05:00'),(76,76,'2018-11-27 09:05:00'),(77,77,'2018-11-27 09:05:00'),(78,78,'2018-11-27 09:05:00'),(79,79,'2018-11-27 09:05:00'),(80,80,'2018-11-27 09:05:00'),(81,81,'2018-11-27 09:05:00'),(82,82,'2018-11-27 09:05:00'),(83,83,'2018-11-27 09:05:00'),(84,84,'2018-11-27 09:05:00'),(85,85,'2018-11-27 09:05:00'),(86,86,'2018-11-27 09:05:00'),(87,87,'2018-11-27 09:05:00'),(88,88,'2018-11-27 09:05:00'),(89,89,'2018-11-27 09:05:00'),(90,90,'2018-11-27 09:05:00'),(91,91,'2018-11-27 09:05:00'),(92,92,'2018-11-27 09:05:00'),(93,93,'2018-11-27 09:05:00'),(94,94,'2018-11-27 09:05:00'),(95,95,'2018-11-27 09:05:00'),(96,96,'2018-11-27 09:05:00'),(97,97,'2018-11-27 09:05:00'),(98,98,'2018-11-27 09:05:00'),(99,99,'2018-11-27 09:05:00'),(100,100,'2018-11-27 09:05:00'),(101,101,'2018-11-27 09:05:00'),(102,102,'2018-11-27 09:05:00'),(103,103,'2018-11-27 09:05:00'),(104,104,'2018-11-27 09:05:00'),(105,105,'2018-11-27 09:05:00'),(106,106,'2018-11-27 09:05:00'),(107,107,'2018-11-27 09:05:00'),(108,108,'2018-11-27 09:05:00'),(109,109,'2018-11-27 09:05:00'),(110,110,'2018-11-27 09:05:00'),(111,111,'2018-11-27 09:05:00'),(112,112,'2018-11-27 09:05:00'),(113,113,'2018-11-27 09:05:00'),(114,114,'2018-11-27 09:05:00'),(115,115,'2018-11-27 09:05:00'),(129,2,'2018-11-26 08:05:00'),(130,3,'2018-11-26 08:05:00'),(131,4,'2018-11-26 08:05:00'),(132,5,'2018-11-26 08:05:00'),(133,6,'2018-11-26 08:05:00'),(134,7,'2018-11-26 08:05:00'),(135,8,'2018-11-26 08:05:00'),(136,9,'2018-11-26 08:05:00'),(137,10,'2018-11-26 08:05:00'),(138,11,'2018-11-26 08:05:00'),(139,12,'2018-11-26 08:05:00'),(140,13,'2018-11-26 08:05:00'),(141,14,'2018-11-26 08:05:00'),(142,15,'2018-11-26 08:05:00'),(143,16,'2018-11-26 08:05:00'),(144,17,'2018-11-26 08:05:00'),(145,18,'2018-11-26 08:05:00'),(146,19,'2018-11-26 08:05:00'),(147,20,'2018-11-26 08:05:00'),(148,21,'2018-11-26 08:05:00'),(149,22,'2018-11-26 08:05:00'),(150,23,'2018-11-26 08:05:00'),(151,24,'2018-11-26 08:05:00'),(152,25,'2018-11-26 08:05:00'),(153,26,'2018-11-26 08:05:00'),(154,27,'2018-11-26 08:05:00'),(155,28,'2018-11-26 08:05:00'),(156,29,'2018-11-26 08:05:00'),(157,30,'2018-11-26 08:05:00'),(158,31,'2018-11-26 08:05:00'),(159,32,'2018-11-26 08:05:00'),(160,33,'2018-11-26 08:05:00'),(161,34,'2018-11-26 08:05:00'),(162,35,'2018-11-26 08:05:00'),(163,36,'2018-11-26 08:05:00'),(164,37,'2018-11-26 08:05:00'),(165,38,'2018-11-26 08:05:00'),(166,39,'2018-11-26 08:05:00'),(167,40,'2018-11-26 08:05:00'),(168,41,'2018-11-26 08:05:00'),(169,42,'2018-11-26 08:05:00'),(170,43,'2018-11-26 08:05:00'),(171,44,'2018-11-26 08:05:00'),(172,45,'2018-11-26 08:05:00'),(173,46,'2018-11-26 08:05:00'),(174,47,'2018-11-26 08:05:00'),(175,48,'2018-11-26 08:05:00'),(176,49,'2018-11-26 08:05:00'),(177,50,'2018-11-26 08:05:00'),(178,51,'2018-11-26 08:05:00'),(179,52,'2018-11-26 08:05:00'),(180,53,'2018-11-26 08:05:00'),(181,54,'2018-11-26 08:05:00'),(182,55,'2018-11-26 08:05:00'),(183,56,'2018-11-26 08:05:00'),(184,57,'2018-11-26 08:05:00'),(185,58,'2018-11-26 08:05:00'),(186,59,'2018-11-26 08:05:00'),(187,60,'2018-11-26 08:05:00'),(188,61,'2018-11-26 08:05:00'),(189,62,'2018-11-26 08:05:00'),(190,63,'2018-11-26 08:05:00'),(191,64,'2018-11-26 08:05:00'),(192,65,'2018-11-26 08:05:00'),(193,66,'2018-11-26 08:05:00'),(194,67,'2018-11-26 08:05:00'),(195,68,'2018-11-26 08:05:00'),(196,69,'2018-11-26 08:05:00'),(197,70,'2018-11-26 08:05:00'),(198,71,'2018-11-26 08:05:00'),(199,72,'2018-11-26 08:05:00'),(200,73,'2018-11-26 08:05:00'),(201,74,'2018-11-26 08:05:00'),(202,75,'2018-11-26 08:05:00'),(203,76,'2018-11-26 08:05:00'),(204,77,'2018-11-26 08:05:00'),(205,78,'2018-11-26 08:05:00'),(206,79,'2018-11-26 08:05:00'),(207,80,'2018-11-26 08:05:00'),(208,81,'2018-11-26 08:05:00'),(209,82,'2018-11-26 08:05:00'),(210,83,'2018-11-26 08:05:00'),(211,84,'2018-11-26 08:05:00'),(212,85,'2018-11-26 08:05:00'),(213,86,'2018-11-26 08:05:00'),(214,87,'2018-11-26 08:05:00'),(215,88,'2018-11-26 08:05:00'),(216,89,'2018-11-26 08:05:00'),(217,90,'2018-11-26 08:05:00'),(218,91,'2018-11-26 08:05:00'),(219,92,'2018-11-26 08:05:00'),(220,93,'2018-11-26 08:05:00'),(221,94,'2018-11-26 08:05:00'),(222,95,'2018-11-26 08:05:00'),(223,96,'2018-11-26 08:05:00'),(224,97,'2018-11-26 08:05:00'),(225,98,'2018-11-26 08:05:00'),(226,99,'2018-11-26 08:05:00'),(227,100,'2018-11-26 08:05:00'),(228,101,'2018-11-26 08:05:00'),(229,102,'2018-11-26 08:05:00'),(230,103,'2018-11-26 08:05:00'),(231,104,'2018-11-26 08:05:00'),(232,105,'2018-11-26 08:05:00'),(233,106,'2018-11-26 08:05:00'),(234,107,'2018-11-26 08:05:00'),(235,108,'2018-11-26 08:05:00'),(236,109,'2018-11-26 08:05:00'),(237,110,'2018-11-26 08:05:00'),(238,111,'2018-11-26 08:05:00'),(239,112,'2018-11-26 08:05:00'),(240,113,'2018-11-26 08:05:00'),(241,114,'2018-11-26 08:05:00'),(242,115,'2018-11-26 08:05:00'),(260,1,'2018-11-27 15:42:06');
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
INSERT INTO `redi_user_type_class` VALUES (4,'C'),(4,'E'),(6,'C'),(7,'C'),(7,'E'),(8,'E'),(12,'C'),(12,'G'),(13,'C'),(13,'G'),(14,'C'),(14,'G'),(20,'C'),(21,'B'),(21,'C'),(21,'E'),(28,'B');
/*!40000 ALTER TABLE `redi_user_type_class` ENABLE KEYS */;
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
INSERT INTO `redi_user_type_project_permission` VALUES (1,1,1,1),(1,2,1,1),(1,3,1,1),(1,4,1,1),(1,5,1,1),(1,6,1,1),(1,7,1,1),(1,8,1,1),(1,9,1,1),(1,10,1,1),(1,11,1,1),(1,12,1,1),(1,13,1,1),(1,14,1,1),(1,15,1,1),(1,17,1,1),(1,18,1,1),(1,19,1,1),(1,20,1,1),(1,21,1,1),(1,22,1,1),(1,23,1,1),(1,24,1,1),(1,25,1,1),(1,26,1,1),(1,27,1,1),(1,28,1,1),(1,29,1,1),(1,30,1,1),(1,31,1,1),(1,32,1,1),(1,100,1,1),(1,200,1,1),(2,1,1,0),(2,2,1,0),(2,3,1,0),(2,4,1,0),(2,5,1,0),(2,6,1,0),(2,7,1,0),(2,8,1,0),(2,9,1,0),(2,10,1,0),(2,11,1,0),(2,12,1,0),(2,13,1,0),(2,14,1,0),(2,15,1,0),(2,17,1,0),(2,18,1,0),(2,19,1,0),(2,20,1,0),(2,21,1,0),(2,22,1,0),(2,23,1,0),(2,24,1,0),(2,25,1,0),(2,26,1,0),(2,27,1,0),(2,28,1,0),(2,29,1,1),(2,30,1,1),(2,31,1,0),(2,100,1,0),(2,200,1,1),(3,1,1,0),(3,2,1,0),(3,3,1,0),(3,5,1,0),(3,6,1,0),(3,10,1,0),(3,11,0,0),(3,12,0,0),(3,13,1,0),(3,14,0,0),(3,15,0,0),(3,17,1,0),(3,18,0,0),(3,19,0,0),(3,20,0,0),(3,21,0,0),(3,22,1,0),(3,23,0,0),(3,24,0,0),(3,25,0,0),(3,26,1,0),(3,29,1,1),(3,30,1,1),(3,200,1,1),(4,1,1,0),(4,2,1,0),(4,3,1,0),(4,5,1,0),(4,6,1,0),(4,10,1,0),(4,11,0,0),(4,12,0,0),(4,13,1,0),(4,14,0,0),(4,15,0,0),(4,17,1,0),(4,18,0,0),(4,19,0,0),(4,20,0,0),(4,21,0,0),(4,22,1,0),(4,23,0,0),(4,24,0,0),(4,25,0,0),(4,26,1,0),(4,29,1,1),(4,30,1,1),(4,200,1,1),(5,1,1,1),(5,2,1,1),(5,3,1,1),(5,4,0,0),(5,5,1,1),(5,6,1,1),(5,7,0,0),(5,8,0,0),(5,9,0,0),(5,10,1,1),(5,11,1,1),(5,12,1,0),(5,13,1,1),(5,14,1,0),(5,15,1,0),(5,17,1,1),(5,18,1,1),(5,19,1,1),(5,20,1,1),(5,21,1,1),(5,22,1,1),(5,23,1,1),(5,24,1,1),(5,25,1,1),(5,26,1,1),(5,27,0,0),(5,28,0,0),(5,29,1,1),(5,30,1,1),(5,31,0,0),(5,32,1,1),(5,100,0,0),(5,200,1,1),(6,1,1,1),(6,2,1,1),(6,3,1,1),(6,5,1,1),(6,6,1,1),(6,10,1,1),(6,11,1,1),(6,12,1,1),(6,13,1,0),(6,14,1,1),(6,15,1,1),(6,17,1,1),(6,18,1,1),(6,19,1,1),(6,20,1,0),(6,21,1,0),(6,22,1,1),(6,23,1,1),(6,24,1,1),(6,25,1,1),(6,26,1,1),(6,29,1,1),(6,30,1,1),(7,1,1,0),(7,2,1,0),(7,3,1,0),(7,5,1,0),(7,6,1,0),(7,10,1,0),(7,11,0,0),(7,12,0,0),(7,13,1,0),(7,14,0,0),(7,15,0,0),(7,17,1,0),(7,18,0,0),(7,19,0,0),(7,20,0,0),(7,21,0,0),(7,22,1,0),(7,23,0,0),(7,24,0,0),(7,25,0,0),(7,26,1,0),(7,29,1,1),(7,30,1,1),(8,1,1,1),(8,2,1,1),(8,3,1,1),(8,5,1,1),(8,6,1,1),(8,10,1,1),(8,11,0,0),(8,12,1,1),(8,13,1,1),(8,14,1,0),(8,15,1,1),(8,17,1,1),(8,18,0,0),(8,19,0,0),(8,20,0,0),(8,21,0,0),(8,22,1,1),(8,23,0,0),(8,24,1,1),(8,25,1,1),(8,26,1,1),(8,29,1,1),(8,30,1,1),(9,1,1,0),(9,2,1,0),(9,3,1,0),(9,5,1,0),(9,6,1,0),(9,10,1,0),(9,11,0,0),(9,12,0,0),(9,13,1,0),(9,14,0,0),(9,15,0,0),(9,17,1,0),(9,18,0,0),(9,19,0,0),(9,20,0,0),(9,21,0,0),(9,22,1,0),(9,23,0,0),(9,24,0,0),(9,25,0,0),(9,26,1,0),(9,29,1,1),(9,30,1,1),(9,200,1,1),(10,1,1,0),(10,2,1,0),(10,3,1,0),(10,5,1,0),(10,6,1,0),(10,10,1,0),(10,11,0,0),(10,12,0,0),(10,13,1,0),(10,14,0,0),(10,15,0,0),(10,17,1,0),(10,18,0,0),(10,19,0,0),(10,20,0,0),(10,21,0,0),(10,22,1,0),(10,23,0,0),(10,24,0,0),(10,25,0,0),(10,26,1,0),(10,29,1,1),(10,30,1,1),(11,1,1,1),(11,2,1,1),(11,3,1,1),(11,5,1,1),(11,6,1,1),(11,10,1,1),(11,11,1,1),(11,12,0,0),(11,13,1,0),(11,14,0,0),(11,15,0,0),(11,17,1,1),(11,18,1,1),(11,19,1,1),(11,20,0,0),(11,21,0,0),(11,22,1,1),(11,23,1,1),(11,24,0,0),(11,25,0,0),(11,26,1,1),(11,29,1,1),(11,30,1,1),(12,1,1,0),(12,2,1,0),(12,3,1,0),(12,5,1,0),(12,6,1,0),(12,10,1,0),(12,11,0,0),(12,12,0,0),(12,13,1,0),(12,14,0,0),(12,15,0,0),(12,17,1,0),(12,18,0,0),(12,19,0,0),(12,20,0,0),(12,21,0,0),(12,22,1,0),(12,23,0,0),(12,24,0,0),(12,25,0,0),(12,26,1,0),(12,29,1,1),(12,30,1,1),(13,1,1,1),(13,2,1,1),(13,3,1,1),(13,5,1,1),(13,6,1,1),(13,10,1,1),(13,11,0,0),(13,12,0,0),(13,13,1,1),(13,14,0,0),(13,15,0,0),(13,17,1,1),(13,18,0,0),(13,19,0,0),(13,20,0,0),(13,21,0,0),(13,22,1,1),(13,23,0,0),(13,24,1,0),(13,25,0,0),(13,26,1,1),(13,29,1,1),(13,30,1,1),(14,1,1,1),(14,2,1,1),(14,3,1,1),(14,5,1,1),(14,6,1,1),(14,10,1,1),(14,11,1,1),(14,12,0,0),(14,13,1,1),(14,14,0,0),(14,15,0,0),(14,17,1,1),(14,18,1,1),(14,19,1,1),(14,20,0,0),(14,21,0,0),(14,22,1,1),(14,23,1,1),(14,24,1,1),(14,25,1,1),(14,26,1,1),(14,29,1,1),(14,30,1,1),(15,1,1,0),(15,2,1,0),(15,3,1,0),(15,5,1,0),(15,6,1,0),(15,10,1,0),(15,11,0,0),(15,12,0,0),(15,13,1,0),(15,14,0,0),(15,15,0,0),(15,17,1,0),(15,18,0,0),(15,19,0,0),(15,20,0,0),(15,21,0,0),(15,22,1,0),(15,23,0,0),(15,24,0,0),(15,25,0,0),(15,26,1,0),(15,29,1,1),(15,30,1,1),(16,1,1,0),(16,2,1,0),(16,3,1,0),(16,5,1,0),(16,6,1,0),(16,10,1,0),(16,11,0,0),(16,12,0,0),(16,13,1,0),(16,14,0,0),(16,15,0,0),(16,17,1,0),(16,18,0,0),(16,19,0,0),(16,20,0,0),(16,21,0,0),(16,22,1,0),(16,23,0,0),(16,24,0,0),(16,25,0,0),(16,26,1,0),(16,29,1,1),(16,30,1,1),(17,1,1,0),(17,2,1,0),(17,3,1,0),(17,5,1,0),(17,6,1,0),(17,10,1,0),(17,11,0,0),(17,12,0,0),(17,13,1,0),(17,14,0,0),(17,15,0,0),(17,17,1,0),(17,18,0,0),(17,19,0,0),(17,20,0,0),(17,21,0,0),(17,22,1,0),(17,23,0,0),(17,24,0,0),(17,25,0,0),(17,26,1,0),(17,29,1,1),(17,30,1,1),(18,1,1,0),(18,2,1,0),(18,3,1,0),(18,5,1,0),(18,6,1,0),(18,10,1,0),(18,11,0,0),(18,12,0,0),(18,13,1,0),(18,14,0,0),(18,15,1,1),(18,17,1,0),(18,18,0,0),(18,19,0,0),(18,20,0,0),(18,21,0,0),(18,22,1,0),(18,23,0,0),(18,24,0,0),(18,25,0,0),(18,26,1,0),(18,29,1,1),(18,30,1,1),(18,200,1,1),(19,1,1,0),(19,2,1,0),(19,3,1,0),(19,5,1,0),(19,6,1,0),(19,10,1,0),(19,11,0,0),(19,12,0,0),(19,13,1,0),(19,14,0,0),(19,15,1,1),(19,17,1,0),(19,18,0,0),(19,19,0,0),(19,20,0,0),(19,21,0,0),(19,22,1,0),(19,23,0,0),(19,24,0,0),(19,25,0,0),(19,26,1,0),(19,29,1,1),(19,30,1,1),(19,200,1,1),(20,1,1,0),(20,2,1,0),(20,3,1,0),(20,5,1,0),(20,6,1,0),(20,10,1,0),(20,11,0,0),(20,12,0,0),(20,13,1,0),(20,14,0,0),(20,15,0,0),(20,17,1,0),(20,18,1,0),(20,19,1,0),(20,20,0,0),(20,21,0,0),(20,22,1,0),(20,23,1,0),(20,24,0,0),(20,25,0,0),(20,26,1,0),(20,29,1,1),(20,30,1,1),(21,1,1,1),(21,2,1,1),(21,3,1,1),(21,5,1,1),(21,6,1,1),(21,10,1,1),(21,11,1,1),(21,12,1,1),(21,13,1,0),(21,14,1,1),(21,15,1,1),(21,17,1,1),(21,18,1,1),(21,19,1,1),(21,20,1,0),(21,21,1,0),(21,22,1,1),(21,23,1,1),(21,24,1,1),(21,25,1,1),(21,26,1,1),(21,29,1,1),(21,30,1,1),(22,1,0,0),(22,2,0,0),(22,3,0,0),(22,5,0,0),(22,6,0,0),(22,10,0,0),(22,11,0,0),(22,12,0,0),(22,13,0,0),(22,14,0,0),(22,15,0,0),(22,17,0,0),(22,18,0,0),(22,19,0,0),(22,20,0,0),(22,21,0,0),(22,22,0,0),(22,23,0,0),(22,24,0,0),(22,25,0,0),(22,26,0,0),(22,29,1,1),(22,30,1,1),(23,1,1,0),(23,2,1,0),(23,3,1,0),(23,5,1,0),(23,6,1,0),(23,10,1,0),(23,11,0,0),(23,12,0,0),(23,13,1,0),(23,14,0,0),(23,15,0,0),(23,17,1,0),(23,18,0,0),(23,19,0,0),(23,20,0,0),(23,21,0,0),(23,22,1,0),(23,23,0,0),(23,24,0,0),(23,25,0,0),(23,26,1,0),(23,29,1,1),(23,30,1,1),(24,1,1,1),(24,2,1,1),(24,3,1,1),(24,4,0,0),(24,5,1,1),(24,6,1,1),(24,7,0,0),(24,8,0,0),(24,9,0,0),(24,10,1,1),(24,11,1,1),(24,12,1,1),(24,13,1,1),(24,14,1,1),(24,15,1,1),(24,17,1,1),(24,18,1,1),(24,19,1,1),(24,20,1,1),(24,21,1,1),(24,22,1,1),(24,23,1,1),(24,24,1,1),(24,25,1,1),(24,26,1,1),(24,27,0,0),(24,28,0,0),(24,29,1,1),(24,30,1,1),(24,31,0,0),(24,32,1,1),(24,100,0,0),(24,200,1,1),(25,1,1,1),(25,2,1,1),(25,3,1,1),(25,5,1,1),(25,6,1,0),(25,10,1,0),(25,11,0,0),(25,12,1,0),(25,13,1,0),(25,14,1,0),(25,15,1,0),(25,17,1,1),(25,18,1,1),(25,19,1,1),(25,20,1,1),(25,21,1,1),(25,22,1,1),(25,23,1,1),(25,24,1,0),(25,25,1,0),(25,26,1,1),(25,29,1,1),(25,30,1,1),(26,1,1,0),(26,2,1,0),(26,3,1,0),(26,5,1,0),(26,6,1,0),(26,10,1,0),(26,11,0,0),(26,12,0,0),(26,13,1,0),(26,14,1,1),(26,15,0,0),(26,17,1,0),(26,18,0,0),(26,19,0,0),(26,20,0,0),(26,21,0,0),(26,22,1,0),(26,23,0,0),(26,24,0,0),(26,25,0,0),(26,26,1,0),(26,29,1,1),(26,30,1,1),(26,200,1,1),(27,1,1,0),(27,2,1,0),(27,3,1,0),(27,5,1,0),(27,6,1,0),(27,10,1,0),(27,11,0,0),(27,12,0,0),(27,13,1,0),(27,14,1,1),(27,15,0,0),(27,17,1,0),(27,18,0,0),(27,19,0,0),(27,20,0,0),(27,21,0,0),(27,22,1,0),(27,23,0,0),(27,24,0,0),(27,25,0,0),(27,26,1,0),(27,29,1,1),(27,30,1,1),(28,29,1,1),(28,30,1,1),(100,1,1,1),(100,2,1,1),(100,3,1,1),(100,4,1,1),(100,5,1,1),(100,6,1,1),(100,7,1,1),(100,8,1,1),(100,9,1,1),(100,10,1,1),(100,11,1,1),(100,12,1,1),(100,13,1,1),(100,14,1,1),(100,15,1,1),(100,17,1,1),(100,18,1,1),(100,19,1,1),(100,20,1,1),(100,21,1,1),(100,22,1,1),(100,23,1,1),(100,24,1,1),(100,25,1,1),(100,26,1,1),(100,27,1,1),(100,28,1,1),(100,29,1,1),(100,30,1,1),(100,31,1,1),(100,32,1,1),(100,33,1,1),(100,100,1,1),(100,200,1,1);
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
INSERT INTO `redi_user_type_time_approval_permission` VALUES (2,1),(2,22),(3,4),(3,9),(3,23),(5,6),(5,21),(8,7),(8,26),(11,10),(13,12),(14,12),(15,1),(15,22),(19,18),(24,6),(24,21),(100,1),(100,4),(100,6),(100,7),(100,9),(100,10),(100,12),(100,18),(100,21),(100,22),(100,23),(100,26);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_type_time_entry_permission`
--

LOCK TABLES `redi_user_type_time_entry_permission` WRITE;
/*!40000 ALTER TABLE `redi_user_type_time_entry_permission` DISABLE KEYS */;
INSERT INTO `redi_user_type_time_entry_permission` VALUES (1,2),(3,8),(4,11),(5,15),(6,16),(7,17),(8,25);
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
) ENGINE=MyISAM AUTO_INCREMENT=89 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_version`
--

LOCK TABLES `redi_version` WRITE;
/*!40000 ALTER TABLE `redi_version` DISABLE KEYS */;
INSERT INTO `redi_version` VALUES (1,'1',1,0,1,NULL,NULL,NULL,NULL),(2,'1A',2,0,1,NULL,NULL,NULL,NULL),(3,'1B',3,0,1,NULL,NULL,NULL,NULL),(4,'1Alt',4,0,1,NULL,NULL,NULL,NULL),(5,'1Rev',5,0,1,NULL,NULL,NULL,NULL),(6,'2',6,0,1,NULL,NULL,NULL,NULL),(7,'2A',7,0,1,NULL,NULL,NULL,NULL),(8,'2B',8,0,1,NULL,NULL,NULL,NULL),(9,'2Alt',9,0,1,NULL,NULL,NULL,NULL),(10,'2Rev',10,0,1,NULL,NULL,NULL,NULL),(11,'3',11,0,1,NULL,NULL,NULL,NULL),(12,'3A',12,0,1,NULL,NULL,NULL,NULL),(13,'3B',13,0,1,NULL,NULL,NULL,NULL),(14,'3Alt',14,0,1,NULL,NULL,NULL,NULL),(15,'3Rev',15,0,1,NULL,NULL,NULL,NULL),(16,'4',16,0,1,NULL,NULL,NULL,NULL),(17,'4A',17,0,1,NULL,NULL,NULL,NULL),(18,'4B',18,0,1,NULL,NULL,NULL,NULL),(19,'4Alt',19,0,1,NULL,NULL,NULL,NULL),(20,'4Rev',20,0,1,NULL,NULL,NULL,NULL),(21,'5',21,0,1,NULL,NULL,NULL,NULL),(22,'5A',22,0,1,NULL,NULL,NULL,NULL),(23,'5B',23,0,1,NULL,NULL,NULL,NULL),(24,'5Alt',24,0,1,NULL,NULL,NULL,NULL),(25,'5Rev',25,0,1,NULL,NULL,NULL,NULL),(26,'6',26,0,1,NULL,NULL,NULL,NULL),(27,'6A',27,0,1,NULL,NULL,NULL,NULL),(28,'6B',28,0,1,NULL,NULL,NULL,NULL),(29,'6Alt',29,0,1,NULL,NULL,NULL,NULL),(30,'6Rev',30,0,1,NULL,NULL,NULL,NULL),(31,'7',31,0,1,NULL,NULL,NULL,NULL),(32,'7A',32,0,1,NULL,NULL,NULL,NULL),(33,'7B',33,0,1,NULL,NULL,NULL,NULL),(34,'7Alt',34,0,1,NULL,NULL,NULL,NULL),(35,'7Rev',35,0,1,NULL,NULL,NULL,NULL),(36,'8',36,0,1,NULL,NULL,NULL,NULL),(37,'8A',37,0,1,NULL,NULL,NULL,NULL),(38,'8B',38,0,1,NULL,NULL,NULL,NULL),(39,'8Alt',39,0,1,NULL,NULL,NULL,NULL),(40,'8Rev',40,0,1,NULL,NULL,NULL,NULL),(41,'9',41,0,1,NULL,NULL,NULL,NULL),(42,'9A',42,0,1,NULL,NULL,NULL,NULL),(43,'9B',43,0,1,NULL,NULL,NULL,NULL),(44,'9Alt',44,0,1,NULL,NULL,NULL,NULL),(45,'9Rev',45,0,1,NULL,NULL,NULL,NULL),(46,'10',46,0,1,NULL,NULL,NULL,NULL),(47,'10A',47,0,1,NULL,NULL,NULL,NULL),(48,'10B',48,0,1,NULL,NULL,NULL,NULL),(49,'10Alt',49,0,1,NULL,NULL,NULL,NULL),(50,'10Rev',50,0,1,NULL,NULL,NULL,NULL),(54,'1ARev',NULL,1,1,1,'2018-06-26 14:05:07',NULL,NULL),(53,'1Test',NULL,1,1,1,'2018-06-20 06:34:32',NULL,NULL),(55,'1BRev',NULL,1,1,1,'2018-06-26 14:05:30',NULL,NULL),(56,'2Rev',NULL,1,1,1,'2018-06-26 14:06:36',NULL,NULL),(57,'2ARev',NULL,1,1,1,'2018-06-26 14:07:18',NULL,NULL),(58,'21A',NULL,1,1,1,'2018-06-26 16:20:35',NULL,NULL),(59,'49A',NULL,1,1,1,'2018-06-29 09:36:13',NULL,NULL),(60,'11B',NULL,1,1,1,'2018-06-29 09:38:47',NULL,NULL),(61,'20B',NULL,1,1,1,'2018-06-29 10:55:22',NULL,NULL),(62,'20A',NULL,1,1,1,'2018-06-29 11:53:34',NULL,NULL),(63,'21C',NULL,1,1,1,'2018-06-29 12:07:06',NULL,NULL),(64,'2Aalt',NULL,1,1,1,'2018-07-24 18:52:55',NULL,NULL),(65,'2AAlt',NULL,1,1,1,'2018-07-24 18:53:06',NULL,NULL),(66,'2alt',NULL,1,1,1,'2018-07-24 18:53:20',NULL,NULL),(67,'2ARev2',NULL,1,1,1,'2018-07-24 18:54:31',NULL,NULL),(68,'2ARev3',NULL,1,1,1,'2018-07-24 18:54:56',NULL,NULL),(69,'2ARev4',NULL,1,1,1,'2018-07-24 18:55:16',NULL,NULL),(70,'3ARev2',NULL,1,1,1,'2018-07-24 19:00:42',NULL,NULL),(71,'2altrev',NULL,1,1,1,'2018-07-26 16:56:02',NULL,NULL),(72,'6rev',NULL,1,1,1,'2018-07-26 16:57:15',NULL,NULL),(73,'3Alt2',NULL,1,1,1,'2018-07-26 17:06:43',NULL,NULL),(74,'5Alt2',NULL,1,1,1,'2018-07-26 17:07:13',NULL,NULL),(75,'5Alt3',NULL,1,1,1,'2018-07-26 17:08:06',NULL,NULL),(76,'2AltRev',NULL,1,1,1,'2018-07-26 17:18:14',NULL,NULL),(77,'10revA',NULL,1,1,1,'2018-10-02 18:26:12',NULL,NULL),(78,'4Alt2',NULL,1,1,1,'2018-10-07 08:45:53',NULL,NULL),(79,'10C',NULL,1,1,1,'2018-10-25 18:02:56',NULL,NULL),(80,'5Rev2',NULL,1,1,1,'2018-10-26 13:30:51',NULL,NULL),(81,'4WIP',NULL,1,1,1,'2018-10-26 13:35:57',NULL,NULL),(82,'3Rev2',NULL,1,1,1,'2018-10-26 13:41:05',NULL,NULL),(83,'3Rev3',NULL,1,1,1,'2018-10-26 13:41:45',NULL,NULL),(84,'6Rev2',NULL,1,1,1,'2018-10-26 14:44:58',NULL,NULL),(85,'4Rev2',NULL,1,1,1,'2018-10-26 14:47:06',NULL,NULL),(86,'3AltRev',NULL,1,1,1,'2018-10-26 15:01:01',NULL,NULL),(87,'5Rev3',NULL,1,1,1,'2018-10-26 15:12:01',NULL,NULL),(88,'11Alt',NULL,1,1,1,'2018-10-27 13:05:41',NULL,NULL);
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
/*!50003 DROP PROCEDURE IF EXISTS `redi_calculate_user_time_enty` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `redi_calculate_user_time_enty`(IN param_user_id INT, IN param_entry_date VARCHAR(100))
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
																LEFT JOIN
															redi_activity a ON te.activity_id = a.id
														WHERE
															a.type_id NOT IN (2 , 3) 
															AND te.user_id=param_user_id 
															AND DATE(te.start_date) = param_entry_date 
														ORDER BY start_date;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
	
	/** clean calculated time fields */
	UPDATE 
		redi_time_entry te
		LEFT JOIN
			redi_activity a ON te.activity_id = a.id
	SET
		te.straight_time = null, 
		te.over_time=null, 
		te.double_time=null
	WHERE
		a.type_id NOT IN (2 , 3) 
		AND te.user_id=param_user_id 
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
						over_time = (12 - prev_duration_sum - IF(prev_duration_sum < 8, (8 - prev_duration_sum), 0) ),  
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

-- Dump completed on 2018-11-30  3:39:55

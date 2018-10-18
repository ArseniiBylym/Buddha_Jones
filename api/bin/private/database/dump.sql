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
) ENGINE=MyISAM AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_activity`
--

LOCK TABLES `redi_activity` WRITE;
/*!40000 ALTER TABLE `redi_activity` DISABLE KEYS */;
INSERT INTO `redi_activity` VALUES (1,'AE Work (NOT Dailies)',1,1,1,1,0,0,1,0),(2,'Breakdown Movie',2,0,1,1,0,0,1,0),(3,'Business Development',2,0,1,1,0,0,1,0),(4,'Dailies Assembly',1,0,1,1,0,0,1,0),(5,'Dailies Import',1,0,1,1,0,0,1,0),(6,'Dialogue Breakdown',2,0,1,1,0,0,1,0),(7,'Downtime (add details)',3,1,1,0,0,0,1,0),(8,'Edit',1,0,1,1,0,0,1,0),(9,'Editing on Fiber',1,0,1,1,0,0,1,0),(10,'Fiber',1,0,1,1,0,0,1,0),(11,'Finish Audio Mix',1,0,1,1,0,0,1,0),(12,'Finish Online',1,0,1,1,0,0,1,0),(13,'Finish Prep',1,1,1,1,1,1,1,0),(14,'Finish Supervision',1,0,1,1,0,0,1,0),(15,'Game Capture',1,0,1,1,0,0,1,0),(16,'General Production',2,0,1,0,0,0,1,0),(17,'Graphic Design',1,0,1,1,0,1,1,0),(18,'Graphic Finish',1,0,1,1,0,1,1,0),(19,'Graphic Styleframes/Boards',1,0,1,1,0,1,1,0),(20,'Graphic Work in Downtime',1,0,1,1,0,1,1,0),(21,'IT Work',3,0,1,1,0,0,1,0),(22,'Lunch Break',3,0,0,0,0,0,1,0),(23,'Meeting (Admin)',3,1,1,1,0,0,1,0),(24,'Meeting (Project Creative)',2,0,1,1,0,0,1,0),(25,'Music Composing',2,0,1,1,0,0,1,0),(26,'Music Creative',2,0,1,1,0,0,1,0),(27,'Music Cue Sheets',1,0,1,1,0,0,1,0),(28,'Music Licensing',2,0,1,1,0,0,1,0),(29,'Music Producing',2,0,1,1,0,0,1,0),(30,'Narration Supervision',1,0,1,0,0,0,1,0),(31,'Office/Admin',3,0,1,0,0,0,1,0),(32,'Produce',2,0,1,1,0,0,1,0),(33,'Screen Movie',2,0,1,1,0,0,1,0),(34,'Time Off (Paid)',3,0,1,0,0,0,1,1),(35,'Time Off (Unpaid)',3,0,1,0,0,0,1,1),(36,'Waiting (add details)',2,1,1,0,0,0,1,0),(37,'Writing',1,0,1,0,0,0,1,0),(40,'Trailer',NULL,0,0,0,0,0,1,0),(41,'Penalty Meal Pay',NULL,0,0,0,0,0,1,0),(42,'test activity',NULL,1,1,1,0,1,1,0),(43,'test activity',NULL,1,1,1,0,1,1,0),(44,'test activity',NULL,1,1,1,0,1,1,0),(45,'test activity',NULL,1,1,1,0,1,1,0),(46,'test activityadsfdsf',NULL,1,1,1,0,1,1,0),(47,'test activityadsfdsfq',NULL,1,1,1,0,1,1,0),(48,'test activityadsfdsfq1',NULL,1,1,1,0,1,1,0),(49,'test activityadsfdsfq12',NULL,1,1,1,0,1,1,0),(50,'test activityadsfdsfq121',NULL,1,1,1,0,1,1,0),(51,'test activityadsfdsfq1212',NULL,1,1,1,0,1,1,0),(52,'test activityadsfdsfq12122',NULL,1,1,1,0,1,1,0),(53,'test activityadsfdsfq121223',NULL,1,1,1,0,1,1,0),(54,'test activityadsfdsfq1212232',NULL,1,1,1,0,1,1,0),(55,'test activityadsfdsfq12122322dasdasd',NULL,1,1,1,0,1,1,0),(56,'some label f',NULL,1,0,NULL,NULL,NULL,0,0),(57,'test activityadsfdsfq12122322dasdas',NULL,1,1,1,0,1,1,0),(58,'test activityadsfdsfq12122322dasda',NULL,1,1,1,0,1,1,0),(59,'test activity982u2133a',NULL,1,1,1,1,1,1,1);
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
  PRIMARY KEY (`activity_id`,`type_id`),
  KEY `activity_id` (`activity_id`),
  KEY `type_id` (`type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_activity_to_type`
--

LOCK TABLES `redi_activity_to_type` WRITE;
/*!40000 ALTER TABLE `redi_activity_to_type` DISABLE KEYS */;
INSERT INTO `redi_activity_to_type` VALUES (1,1),(2,2),(3,2),(4,1),(5,1),(6,2),(7,3),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,2),(17,1),(18,1),(19,1),(20,1),(21,3),(22,3),(23,3),(24,2),(25,2),(26,2),(27,1),(28,2),(29,2),(30,1),(31,3),(32,2),(33,2),(34,3),(35,3),(36,2),(37,1),(38,2),(39,1),(40,4),(41,3),(56,2),(57,1),(57,3),(58,1),(58,3),(59,1),(59,3);
/*!40000 ALTER TABLE `redi_activity_to_type` ENABLE KEYS */;
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
INSERT INTO `redi_activity_to_user_type` VALUES (1,4),(1,100),(2,4),(2,6),(2,7),(2,21),(2,100),(3,6),(3,20),(3,21),(3,100),(4,4),(4,100),(5,4),(5,100),(6,4),(6,100),(7,1),(7,2),(7,3),(7,4),(7,5),(7,6),(7,7),(7,8),(7,9),(7,10),(7,11),(7,12),(7,13),(7,14),(7,15),(7,16),(7,17),(7,18),(7,19),(7,20),(7,21),(7,22),(7,23),(7,24),(7,25),(7,26),(7,27),(7,100),(8,4),(8,7),(8,21),(8,100),(9,4),(9,7),(9,21),(9,100),(10,6),(10,7),(10,21),(10,100),(11,9),(11,100),(12,4),(12,9),(12,100),(13,4),(13,9),(13,23),(13,100),(14,3),(14,9),(14,23),(14,100),(15,10),(15,100),(16,3),(16,4),(16,6),(16,7),(16,8),(16,9),(16,10),(16,11),(16,12),(16,13),(16,14),(16,18),(16,19),(16,21),(16,23),(16,26),(16,27),(16,100),(17,12),(17,13),(17,14),(17,100),(18,12),(18,13),(18,14),(18,100),(19,12),(19,13),(19,14),(19,100),(20,12),(20,13),(20,14),(20,100),(21,1),(21,2),(21,3),(21,4),(21,5),(21,6),(21,7),(21,8),(21,9),(21,10),(21,11),(21,12),(21,13),(21,14),(21,15),(21,16),(21,17),(21,18),(21,19),(21,20),(21,21),(21,22),(21,23),(21,24),(21,25),(21,26),(21,27),(21,100),(22,1),(22,2),(22,3),(22,4),(22,5),(22,6),(22,7),(22,8),(22,9),(22,10),(22,11),(22,12),(22,13),(22,14),(22,15),(22,16),(22,17),(22,18),(22,19),(22,20),(22,21),(22,22),(22,23),(22,24),(22,25),(22,26),(22,27),(22,100),(23,1),(23,2),(23,3),(23,4),(23,5),(23,6),(23,7),(23,8),(23,9),(23,10),(23,11),(23,12),(23,13),(23,14),(23,15),(23,16),(23,17),(23,18),(23,19),(23,20),(23,21),(23,22),(23,23),(23,24),(23,25),(23,26),(23,27),(23,100),(24,1),(24,2),(24,3),(24,4),(24,5),(24,6),(24,7),(24,8),(24,9),(24,10),(24,11),(24,12),(24,13),(24,14),(24,15),(24,16),(24,17),(24,18),(24,19),(24,20),(24,21),(24,22),(24,23),(24,24),(24,25),(24,26),(24,27),(24,100),(25,18),(25,19),(25,100),(26,7),(26,18),(26,19),(26,100),(27,4),(27,18),(27,19),(27,100),(28,18),(28,19),(28,100),(29,18),(29,19),(29,100),(30,6),(30,9),(30,21),(30,100),(31,1),(31,2),(31,5),(31,15),(31,16),(31,17),(31,20),(31,21),(31,24),(31,25),(31,100),(32,6),(32,20),(32,21),(32,100),(33,1),(33,2),(33,3),(33,4),(33,5),(33,6),(33,7),(33,8),(33,9),(33,10),(33,11),(33,12),(33,13),(33,14),(33,15),(33,16),(33,17),(33,18),(33,19),(33,20),(33,21),(33,22),(33,23),(33,24),(33,25),(33,26),(33,27),(33,100),(34,1),(34,2),(34,3),(34,4),(34,5),(34,6),(34,7),(34,8),(34,9),(34,10),(34,11),(34,12),(34,13),(34,14),(34,15),(34,16),(34,17),(34,18),(34,19),(34,20),(34,21),(34,22),(34,23),(34,24),(34,25),(34,26),(34,27),(34,100),(35,1),(35,2),(35,3),(35,4),(35,5),(35,6),(35,7),(35,8),(35,9),(35,10),(35,11),(35,12),(35,13),(35,14),(35,15),(35,16),(35,17),(35,18),(35,19),(35,20),(35,21),(35,22),(35,23),(35,24),(35,25),(35,26),(35,27),(35,100),(36,7),(36,9),(36,12),(36,13),(36,14),(36,100),(37,26),(37,27),(37,100),(38,2),(38,4),(38,5),(39,1),(39,2),(39,3),(39,4),(39,26),(49,1),(49,2),(49,3),(49,4),(49,7),(50,1),(50,2),(50,3),(50,4),(50,7),(51,1),(51,2),(51,3),(51,4),(51,7),(52,1),(52,2),(52,3),(52,4),(52,7),(53,1),(53,2),(53,3),(53,4),(53,7),(54,1),(54,2),(54,3),(54,4),(54,7),(56,2),(56,4),(57,1),(57,2),(57,3),(57,4),(57,7),(58,1),(58,2),(58,3),(58,4),(58,7),(59,1),(59,2),(59,3),(59,4),(59,7);
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
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_billing`
--

LOCK TABLES `redi_billing` WRITE;
/*!40000 ALTER TABLE `redi_billing` DISABLE KEYS */;
INSERT INTO `redi_billing` VALUES (1,2,2,4,NULL,NULL,0,'2017-03-08 16:26:21'),(2,2,3,4,NULL,NULL,1,'2017-03-08 16:27:37'),(3,2,2,4,NULL,NULL,1,'2017-03-08 16:40:16'),(4,2,2,4,2,NULL,3,'2017-03-09 18:02:43'),(5,2,2,55,2,NULL,1,'2017-03-11 17:58:14'),(6,2,2,55,2,NULL,1,'2017-03-11 17:58:41'),(7,2,2,55,2,NULL,1,'2017-03-11 17:59:13'),(8,2,2,55,2,NULL,1,'2017-03-11 17:59:50'),(9,2,2,55,2,NULL,1,'2017-03-11 18:10:17'),(10,2,2,56,2,NULL,1,'2017-03-11 19:03:26'),(11,2,2,56,2,NULL,1,'2017-03-11 19:04:34'),(12,2,2,56,2,NULL,1,'2017-03-11 19:05:36'),(13,2,39,4,2,NULL,1,'2018-09-16 18:56:20'),(14,2,39,4,2,NULL,1,'2018-09-16 19:03:10'),(15,2,39,4,2,NULL,1,'2018-09-16 19:04:52');
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
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_campaign`
--

LOCK TABLES `redi_campaign` WRITE;
/*!40000 ALTER TABLE `redi_campaign` DISABLE KEYS */;
INSERT INTO `redi_campaign` VALUES (1,'Teaser',NULL,NULL,NULL,NULL),(2,'Trailer',NULL,NULL,NULL,NULL),(4,'(:30) TV',NULL,NULL,NULL,NULL),(6,'Home Entertainment',NULL,NULL,NULL,NULL),(7,'Digital',NULL,NULL,NULL,NULL),(68,'Why',NULL,NULL,NULL,NULL),(70,'How',NULL,NULL,NULL,NULL),(71,'Test',NULL,NULL,NULL,NULL),(72,'Teaser Eugene',NULL,NULL,NULL,1),(73,'Comicon',NULL,NULL,NULL,1),(74,NULL,'test desc',NULL,NULL,NULL),(75,NULL,'test desc',NULL,NULL,NULL),(76,NULL,'test desc',NULL,NULL,NULL),(77,'test campaign1','test desc',NULL,'2018-01-01 00:00:00',NULL),(78,'test campaign1','test desc',NULL,'2018-01-01 00:00:00',NULL),(79,'test campaign1','test desc',NULL,'2018-01-01 00:00:00',NULL),(80,'test campaign1','test desc','test req','2018-01-01 00:00:00',NULL),(81,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(82,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(83,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(84,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(85,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(86,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(87,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(88,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(89,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(90,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(91,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(92,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(93,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(94,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(95,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(96,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(97,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(98,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(99,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(100,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(101,'test campaign12323','test desc22','test req','2018-01-01 00:00:00',1),(102,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(103,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(104,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(105,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(106,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(107,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(108,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(109,'test campaign1','test desc','test req','2018-01-01 00:00:00',1),(110,'test campaign123','test desc','test req','2018-01-01 00:00:00',1);
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
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_comment`
--

LOCK TABLES `redi_comment` WRITE;
/*!40000 ALTER TABLE `redi_comment` DISABLE KEYS */;
INSERT INTO `redi_comment` VALUES (1,'asd falkj flfd\r\nasldfjasf\r\nasdf asdf',1,1,1,0,'2016-12-13 00:03:36'),(2,'aasdfa\r\nlasdfj \r\n\r\nalsdfj as;ld fkjasdlfkj',2,3,2,0,'2016-12-13 00:03:58'),(3,'a	ddkddkdd',1,2,3,0,'2016-12-13 00:04:30'),(4,'las falsdjfas;ld f\r\nasflasdjf\r\nasf\r\n\r\nasd;flkasdjf',1,1,1,0,'2016-12-13 00:14:00'),(5,'test 123',1,11,2,0,'2016-12-12 16:41:10'),(6,'test 1',1,11,2,0,'2016-12-12 16:49:08'),(7,'test',1,1,1,0,'2016-12-13 15:52:27'),(8,'test again',1,1,1,0,'2016-12-13 15:53:59'),(9,'posting?',1,1,1,0,'2016-12-13 16:05:01'),(68,'Please review',1,29,2,0,'2017-01-17 06:40:18'),(19,'works fine?',1,1,1,0,'2016-12-13 16:27:39'),(20,'really?',1,1,1,0,'2016-12-13 16:27:48'),(21,'First comment ;)',1,1,2,0,'2016-12-13 16:30:01'),(22,'What about comment #2?',1,1,2,0,'2016-12-14 00:28:49'),(41,'can be updated?',1,1,2,0,'2016-12-16 08:51:04'),(40,'x',1,1,2,0,'2016-12-16 08:44:08'),(39,'saved?',1,1,2,0,'2016-12-16 08:43:29'),(38,'a',1,1,2,0,'2016-12-16 08:40:58'),(37,'hi',1,1,2,0,'2016-12-16 08:37:33'),(36,'hello',1,1,2,0,'2016-12-15 14:23:22'),(35,'aaa',1,1,2,0,'2016-12-15 12:23:34'),(34,'efasefae',1,1,2,0,'2016-12-15 12:12:58'),(33,'Hello',1,1,2,0,'2016-12-15 12:12:30'),(42,'great',1,1,2,0,'2016-12-16 08:53:43'),(44,'hi',1,24,2,0,'2016-12-20 15:44:32'),(43,'huh?af',1,1,2,0,'2016-12-16 08:54:00'),(45,'YY',1,15,2,0,'2017-01-03 08:29:02'),(46,'asf',1,24,2,0,'2017-01-05 13:05:55'),(47,'Hello',1,25,2,0,'2017-01-09 09:26:10'),(48,'hi',1,25,2,0,'2017-01-09 09:34:14'),(69,'0',1,11,2,NULL,'2017-04-06 14:25:51'),(70,'notes regarding..',48,25,3,0,'2017-07-05 11:01:10'),(71,'Here is note 2',48,25,3,0,'2017-07-06 18:50:41'),(72,'test 1',1,11,2,0,'2018-09-16 19:05:46');
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
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_contact`
--

LOCK TABLES `redi_customer_contact` WRITE;
/*!40000 ALTER TABLE `redi_customer_contact` DISABLE KEYS */;
INSERT INTO `redi_customer_contact` VALUES (1,1,'C00334','Corey Schmidt','corey.schmidt@email.com','(226) 906-2721',NULL,'7855 Lakeshore Drive, Miami Beach, FL 33139'),(2,1,'C00583','Danielle Wright',NULL,NULL,NULL,NULL),(3,1,'C00341\r\n','Dave Dore\r\n',NULL,NULL,NULL,NULL),(4,1,'C00544\r\n','Dean McFlicker\r\n',NULL,NULL,NULL,NULL),(5,1,'C00455\r\n','Kendall Bowlin\r\n',NULL,NULL,NULL,NULL),(6,1,'C00595\r\n','Noah Gallico\r\n',NULL,NULL,NULL,NULL),(7,1,'C00395','Samantha Jukes-Adams',NULL,NULL,NULL,NULL),(8,1,'C00500\r\n','Scott Herbst\r\n',NULL,NULL,NULL,NULL),(9,2,'C00722','Bianka Cisneros','Bianka.Cisneros@warnerbros.com',NULL,NULL,NULL),(10,2,'C00294\r\n','Elisa Iovine\r\n','Elisa.Iovine@warnerbros.com\r\n',NULL,NULL,NULL),(11,2,'C00702\r\n','Ariadne Chucholowski\r\n',NULL,NULL,NULL,NULL),(12,2,'C00089\r\n','John Stanford\r\n',NULL,NULL,NULL,NULL),(13,2,'C00235\r\n','Brian Worsley\r\n',NULL,NULL,NULL,NULL),(14,2,'C00720\r\n','Brittany Beane\r\n',NULL,NULL,NULL,NULL),(15,2,'C00496\r\n',' Mitchell Davis\r\n',NULL,NULL,NULL,NULL),(16,2,'C00748\r\n','Amanda Miller\r\n',NULL,NULL,NULL,NULL),(17,2,'C00306\r\n','Christelle Egan\r\n',NULL,NULL,NULL,NULL),(18,2,'C00247\r\n','Conrad Ellingsworth\r\n',NULL,NULL,NULL,NULL),(19,2,'C00310\r\n','Ingrid Enson\r\n',NULL,NULL,NULL,NULL),(20,2,'C00321\r\n','Isabel Henderson\r\n',NULL,NULL,NULL,NULL),(21,2,'C00023\r\n','Jim Fredrick\r\n',NULL,NULL,NULL,NULL),(22,2,'C00366\r\n','John Codi\r\n',NULL,NULL,NULL,NULL),(23,2,'C00712\r\n','Katy Leigh\r\n',NULL,NULL,NULL,NULL),(24,2,'C00118\r\n','Keri Moore\r\n',NULL,NULL,NULL,NULL),(25,2,'C00683\r\n','Loren Schwartz\r\n',NULL,NULL,NULL,NULL),(26,2,'C00370\r\n','Louis DeMangus\r\n',NULL,NULL,NULL,NULL),(27,2,'C00022\r\n','Michelle Jackino\r\n',NULL,NULL,NULL,NULL),(28,2,'C00699\r\n','Nick Denogeon\r\n',NULL,NULL,NULL,NULL),(29,2,'C00386\r\n','Ryan Pickens\r\n',NULL,NULL,NULL,NULL),(30,2,'C00024\r\n','Samantha Bird\r\n',NULL,NULL,NULL,NULL),(31,2,'C00081\r\n','Stacy Osugi\r\n',NULL,NULL,NULL,NULL),(32,2,'C00632\r\n','Susan Brenner\r\n',NULL,NULL,NULL,NULL),(33,3,'C00581','Alyson Bradshaw\r\n','Alyson.Bradshaw@hbo.com\r\n',NULL,NULL,NULL),(34,3,'C00611\r\n','Daniel Zibulsky\r\n','Daniel.Zibulsky@hbo.com\r\n',NULL,NULL,NULL),(35,3,'C00606\r\n','Erin Dee\r\n','Erin.Dee@hbo.com\r\n',NULL,NULL,NULL),(36,3,'C00735\r\n','Andrew Thomas\r\n',NULL,NULL,NULL,NULL),(37,3,'C00615\r\n','Chris Denniston\r\n',NULL,NULL,NULL,NULL),(38,3,'C00588\r\n','Melora Soodalter\r\n',NULL,NULL,NULL,NULL),(39,3,'C00627\r\n','Natalia Echeverria\r\n',NULL,NULL,NULL,NULL),(40,10,NULL,'cc 101','test@gmail.com',NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_contact_to_project_campaign`
--

LOCK TABLES `redi_customer_contact_to_project_campaign` WRITE;
/*!40000 ALTER TABLE `redi_customer_contact_to_project_campaign` DISABLE KEYS */;
INSERT INTO `redi_customer_contact_to_project_campaign` VALUES (1,3,105),(2,1,105),(3,2,105),(4,4,105),(5,5,105),(6,7,105),(7,12,162),(8,10,194),(9,13,194),(10,13,194),(11,12,199),(12,40,155),(13,40,222);
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
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_new`
--

LOCK TABLES `redi_customer_new` WRITE;
/*!40000 ALTER TABLE `redi_customer_new` DISABLE KEYS */;
INSERT INTO `redi_customer_new` VALUES (1,38,'CD Projekt\r\n','some name','','','','','','','','','',1,NULL),(2,38,'CD Projekt\r\n','some name','','','','','','','','','',1,'2018-10-16 18:16:18'),(3,38,'CD Projekt\r\n','some name','a','b','test c','92292','ab','888888','abc dk','','99933333',1,'2018-10-16 18:20:09'),(4,38,'CD Projekt\r\n','some name','a','b','test c','92292','ab','888888','abc dk','abdddd','99933333',1,'2018-10-16 18:20:44'),(5,38,'CD Projekt\r\n','some name','test street','tes city','test st','9229','ab@ab.com','888888','abc dk','ab@bb.com','99933333',1,'2018-10-16 18:25:29');
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
  `price` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`customer_id`,`activity_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_customer_price`
--

LOCK TABLES `redi_customer_price` WRITE;
/*!40000 ALTER TABLE `redi_customer_price` DISABLE KEYS */;
INSERT INTO `redi_customer_price` VALUES (2,2,55.00),(2,9,NULL),(2,4,101.00),(10,12,80.00),(7,15,10.00),(2,40,200.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_finishing_house`
--

LOCK TABLES `redi_finishing_house` WRITE;
/*!40000 ALTER TABLE `redi_finishing_house` DISABLE KEYS */;
INSERT INTO `redi_finishing_house` VALUES (1,'CABIN 21'),(2,'CO3'),(3,'DISNEY'),(4,'FOCUS FEATURES'),(5,'FOTOKEM'),(6,'KMP'),(7,'MOCEAN'),(8,'MPI'),(9,'MSP'),(10,'NEW WAVE'),(11,'PICTUREHEAD'),(12,'PIXWEL'),(13,'SOURCE SOUND'),(14,'SSI'),(15,'STAMPEDE'),(16,'TECHNICOLOR'),(17,'TURNER ASPERA'),(18,'UNIVERSAL'),(19,'VANDAM'),(20,'WILD TRACKS'),(21,'WISER');
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
  `customer_id` int(11) DEFAULT NULL,
  `notes` text,
  `created_by_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_name` (`project_name`),
  KEY `project_code` (`project_code`)
) ENGINE=MyISAM AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project`
--

LOCK TABLES `redi_project` WRITE;
/*!40000 ALTER TABLE `redi_project` DISABLE KEYS */;
INSERT INTO `redi_project` VALUES (1,'Babysitter','BAB','2018-06-05 00:00:00',1,'Project has no description',NULL),(47,'Annihilation',NULL,'2018-02-23 00:00:00',134,'Job # 5195\nadding Customer Contact here: Anu Bhatia',NULL),(2,'Before I Wake',NULL,'2018-06-05 00:00:00',2,NULL,NULL),(3,'Bravo 14',NULL,'2018-06-05 00:00:00',3,NULL,NULL),(5,'Hearthstone',NULL,'2018-06-05 00:00:00',1,NULL,NULL),(6,'Jack Reacher 2',NULL,'2018-06-05 00:00:00',2,NULL,NULL),(7,'Lights Out',NULL,'2018-04-26 00:00:00',3,NULL,NULL),(9,'Mr Robot S2',NULL,'2018-04-26 00:00:00',1,NULL,NULL),(10,'Quarry',NULL,'2018-04-26 00:00:00',2,NULL,NULL),(11,'Silicon Valley',NULL,'2018-04-26 00:00:00',3,'Silicon Valley is an American comedy television series created by Mike Judge, John Altschuler and Dave Krinsky. The series focuses on five young men who founded a startup company in Silicon Valley. The series premiered on April 6, 2014 on HBO.',NULL),(13,'Storks',NULL,'2018-04-26 00:00:00',1,NULL,NULL),(14,'TNT Brand',NULL,'2018-02-23 00:00:00',2,NULL,NULL),(15,'What Now',NULL,'2018-02-23 00:00:00',3,NULL,NULL),(16,'Veep','Code Name','2018-04-26 00:00:00',3,NULL,NULL),(22,'Game of Thrones',NULL,'2018-02-23 00:00:00',3,NULL,NULL),(28,'Independence',NULL,'2018-02-23 00:00:00',3,NULL,NULL),(39,'Game of Thrones',NULL,'2018-02-23 00:00:00',3,'George R.R. Martin\'s best-selling book series \"A Song of Ice and Fire\" is brought to the screen as HBO sinks its considerable storytelling teeth into the medieval fantasy epic.',NULL),(46,'Project abk',NULL,'2018-02-23 00:00:00',8,'test desc for project abk',NULL),(50,'Demo project1','demo1',NULL,123,'some note for project. this is dummy text',1),(49,'Test project 1232','TPO','2018-06-02 00:00:00',1,NULL,1),(51,'Godzilla 2','Fathom','2018-09-28 00:00:00',2,NULL,1),(52,'The Muppets','Parts','2018-11-23 00:00:00',53,NULL,1),(53,'Shazam','Franklin','2019-04-05 00:00:00',2,NULL,1),(54,'Wreck It Ralph 2','Popcorn','2018-11-21 00:00:00',53,'International Campaign',1),(55,'Test Project One22','TPO','2018-06-01 00:00:00',1,NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=867 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_history`
--

LOCK TABLES `redi_project_history` WRITE;
/*!40000 ALTER TABLE `redi_project_history` DISABLE KEYS */;
INSERT INTO `redi_project_history` VALUES (4,9,NULL,1,'Campaign \"Graphics Campaign\" was added to project \"Mr Robot S2\"','2017-02-25 17:32:38'),(5,1,NULL,1,'Campaign \"Clone\" was added to project \"Babysitter\"','2017-03-02 15:18:00'),(6,1,NULL,1,'Campaign \"Clone 30\" was added to project \"Babysitter\"','2017-03-02 15:19:46'),(7,1,NULL,1,'Campaign \"Hollo\" was added to project \"Babysitter\"','2017-03-02 15:21:23'),(8,1,NULL,1,'Campaign \"Rocky\" was added to project \"Babysitter\"','2017-03-02 15:22:49'),(9,1,NULL,1,'Spot \"Ka Spot\" was added to \"AV Campaign\" campaign','2017-03-02 16:17:00'),(11,22,NULL,1,'Project \"Game of Thrones\" created for client \"HBO\"','2017-03-15 05:40:56'),(13,1,NULL,1,'Campaign \"VAA\" was added to project \"Babysitter\"','2017-03-16 07:37:36'),(26,10,NULL,1,'Spot \"Enchantress\" was added to \"AV Campaign\"','2017-03-16 12:57:34'),(39,10,NULL,48,'Campaign \"Trailer Two\" was added to project \"Quarry\"','2017-03-23 08:03:22'),(40,10,NULL,48,'Campaign \"Teaser\" was added to project \"Quarry\"','2017-03-28 12:56:01'),(41,10,NULL,48,'Campaign \"Who\" was added to project \"Quarry\"','2017-03-28 13:02:23'),(42,10,NULL,48,'Campaign \"When\" was added to project \"Quarry\"','2017-03-28 13:14:42'),(43,10,NULL,48,'Campaign \"What\" was added to project \"Quarry\"','2017-03-28 13:15:38'),(44,10,NULL,48,'Campaign \"Why\" was added to project \"Quarry\"','2017-03-28 13:18:03'),(66,9,NULL,48,'Campaign \"(:30) TV\" was added to project \"Mr Robot S2\"','2017-04-16 00:05:53'),(67,1,NULL,48,'Campaign \"(:30) TV\" was added to project \"Babysitter\"','2017-04-16 13:51:53'),(68,1,NULL,48,'Spot \"First Spot for Babysitter (:30) TV\" was added to \"(:30) TV\" campaign','2017-04-16 14:02:50'),(69,1,NULL,48,'Campaign \"Graphicss\" was added to project \"Babysitter\"','2017-04-17 19:56:26'),(70,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 09:54:36'),(71,10,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 09:54:45'),(72,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 10:06:44'),(73,10,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 10:07:06'),(74,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 10:07:17'),(75,10,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Quarry\"','2017-04-26 10:07:54'),(76,10,NULL,48,'Campaign \"(:15) TV\" was added to project \"Quarry\"','2017-04-26 11:49:28'),(77,10,NULL,48,'Campaign \"(:15) TV\" was removed from project \"Quarry\"','2017-04-26 11:49:49'),(78,10,NULL,48,'Campaign \"(:30) TV\" was added to project \"Quarry\"','2017-04-26 11:50:15'),(79,10,NULL,48,'Campaign \"Teaser\" was added to project \"Quarry\"','2017-04-28 12:38:52'),(80,10,NULL,48,'Spot \"First Spot for Teaser\" was added to \"Teaser\" campaign','2017-04-28 12:40:44'),(85,9,NULL,48,'Spot \"Episode 405\" was added to \"(:30) TV\" campaign','2017-05-03 16:23:06'),(86,1,NULL,48,'Version \"1\" was added to spot \"First Spot for Babysit\"','2017-05-24 09:42:28'),(87,1,NULL,48,'Version \"2\" was added to spot \"First Spot for Babysit\"','2017-05-24 09:42:34'),(88,1,NULL,48,'Campaign \"Graphicss\" was removed from project \"Babysitter\"','2017-05-24 09:42:56'),(89,1,NULL,48,'Campaign \"Graphics\" was added to project \"Babysitter\"','2017-05-24 09:43:08'),(105,28,NULL,48,'Project \"Independence1\" created for client \"HBO\"','2017-07-06 18:27:57'),(106,28,NULL,48,'Campaign \"Teaser\" was added to project \"Independence1\"','2017-07-06 18:48:57'),(107,28,NULL,48,'Campaign \"Trailer\" was added to project \"Independence1\"','2017-07-06 20:29:06'),(108,28,NULL,48,'Campaign \"Pitch\" was added to project \"Independence1\"','2017-07-06 20:46:47'),(110,28,NULL,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 20:51:51'),(111,28,NULL,48,'Campaign \"TV (other)\" was added to project \"Independence1\"','2017-07-06 20:51:55'),(112,28,NULL,48,'Campaign \"Home Entertainment\" was added to project \"Independence1\"','2017-07-06 20:52:00'),(113,28,NULL,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-06 20:52:03'),(114,28,NULL,48,'Campaign \"Broadcast\" was added to project \"Independence1\"','2017-07-06 20:54:51'),(115,28,NULL,48,'Campaign \"Games\" was added to project \"Independence1\"','2017-07-06 20:55:43'),(116,28,NULL,48,'Campaign \"Angre\" was added to project \"Independence1\"','2017-07-06 21:23:03'),(117,28,NULL,48,'Campaign \"Angre\" was added to project \"Independence1\"','2017-07-06 21:23:05'),(118,28,NULL,48,'Campaign \"Trailer\" was removed from project \"Independence1\"','2017-07-06 21:28:31'),(119,28,NULL,48,'Campaign \"Pitch\" was removed from project \"Independence1\"','2017-07-06 21:28:42'),(120,28,NULL,48,'Campaign \"TV (other)\" was removed from project \"Independence1\"','2017-07-06 21:28:51'),(121,28,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Independence1\"','2017-07-06 21:28:51'),(122,28,NULL,48,'Campaign \"Broadcast\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(123,28,NULL,48,'Campaign \"Digital\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(124,28,NULL,48,'Campaign \"Games\" was removed from project \"Independence1\"','2017-07-06 21:28:56'),(125,28,NULL,48,'Campaign \"Home Entertainment\" was removed from project \"Independence1\"','2017-07-06 21:28:57'),(126,28,NULL,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 21:29:58'),(127,28,NULL,48,'Campaign \"Trailer\" was added to project \"Independence1\"','2017-07-06 22:28:51'),(128,28,NULL,48,'Campaign \"How\" was added to project \"Independence1\"','2017-07-06 22:29:03'),(129,28,NULL,48,'Campaign \"Home Entertainment\" was added to project \"Independence1\"','2017-07-06 22:29:25'),(130,28,NULL,48,'Campaign \"Streaming\" was added to project \"Independence1\"','2017-07-06 22:29:56'),(131,28,NULL,48,'Campaign \"Other\" was added to project \"Independence1\"','2017-07-06 22:30:52'),(132,28,NULL,48,'Campaign \"Graphics\" was added to project \"Independence1\"','2017-07-06 22:30:59'),(133,28,NULL,48,'Campaign \"Trailer Two\" was added to project \"Independence1\"','2017-07-06 22:31:48'),(134,28,NULL,48,'Campaign \"What\" was added to project \"Independence1\"','2017-07-06 22:31:56'),(135,28,NULL,48,'Campaign \"When\" was added to project \"Independence1\"','2017-07-06 22:31:56'),(136,28,NULL,48,'Campaign \"Who\" was added to project \"Independence1\"','2017-07-06 22:34:03'),(137,28,NULL,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-06 22:34:29'),(138,28,NULL,48,'Campaign \"Teaser\" was removed from project \"Independence1\"','2017-07-06 22:34:43'),(139,28,NULL,48,'Campaign \"Streaming\" was removed from project \"Independence1\"','2017-07-06 22:34:44'),(140,28,NULL,48,'Campaign \"Home Entertainment\" was removed from project \"Independence1\"','2017-07-06 22:34:46'),(141,28,NULL,48,'Campaign \"How\" was removed from project \"Independence1\"','2017-07-06 22:34:48'),(142,28,NULL,48,'Campaign \"Angre\" was removed from project \"Independence1\"','2017-07-06 22:34:51'),(143,28,NULL,48,'Campaign \"Other\" was removed from project \"Independence1\"','2017-07-06 22:34:51'),(144,28,NULL,48,'Campaign \"Graphics\" was removed from project \"Independence1\"','2017-07-06 22:34:54'),(145,28,NULL,48,'Campaign \"Trailer\" was removed from project \"Independence1\"','2017-07-06 22:34:57'),(146,28,NULL,48,'Campaign \"(:30) TV\" was removed from project \"Independence1\"','2017-07-06 22:34:58'),(147,28,NULL,48,'Campaign \"Digital\" was removed from project \"Independence1\"','2017-07-06 22:35:18'),(148,28,NULL,48,'Campaign \"When\" was removed from project \"Independence1\"','2017-07-06 22:35:19'),(149,28,NULL,48,'Campaign \"Who\" was removed from project \"Independence1\"','2017-07-06 22:35:20'),(150,28,NULL,48,'Campaign \"What\" was removed from project \"Independence1\"','2017-07-06 22:35:22'),(151,28,NULL,48,'Campaign \"Trailer Two\" was removed from project \"Independence1\"','2017-07-06 22:35:25'),(152,28,NULL,48,'Campaign \"Teaser\" was added to project \"Independence1\"','2017-07-06 22:36:08'),(153,28,NULL,48,'Campaign \"(:30) TV\" was added to project \"Independence1\"','2017-07-06 22:36:15'),(154,28,NULL,48,'Spot \"spt1\" was added to \"Teaser\" campaign','2017-07-06 22:39:53'),(155,28,NULL,48,'Spot \"spt2\" was added to \"Teaser\" campaign','2017-07-07 03:21:10'),(156,28,NULL,48,'Spot \"spt3\" was added to \"Teaser\" campaign','2017-07-07 03:28:15'),(157,28,NULL,48,'Spot \"spt4\" was added to \"Teaser\" campaign','2017-07-07 03:35:12'),(158,28,NULL,48,'Spot \"spt5\" was added to \"Teaser\" campaign','2017-07-07 03:37:04'),(159,28,NULL,48,'Spot \"spt5\" was added to \"Teaser\" campaign','2017-07-07 03:37:20'),(160,28,NULL,48,'Spot \"spt6\" was added to \"Teaser\" campaign','2017-07-07 03:38:45'),(161,28,NULL,48,'Spot \"spt1\" was added to \"(:30) TV\" campaign','2017-07-07 03:39:10'),(162,28,NULL,48,'Version \"1\" was added to spot \"spt1\"','2017-07-07 03:42:42'),(168,28,NULL,48,'Version \"1A\" was added to spot \"spt5\"','2017-07-07 15:55:00'),(169,28,NULL,48,'Version \"1B\" was added to spot \"spt5\"','2017-07-07 15:55:43'),(170,28,NULL,48,'Version \"1 Alt\" was added to spot \"spt5\"','2017-07-07 15:55:54'),(171,28,NULL,48,'Version \"1 Rev\" was added to spot \"spt5\"','2017-07-07 18:05:49'),(172,28,NULL,48,'Version \"2A\" was added to spot \"spt5\"','2017-07-07 18:14:28'),(173,28,NULL,48,'Campaign \"Digital\" was added to project \"Independence1\"','2017-07-07 19:27:18'),(174,28,NULL,48,'Spot \"spt1\" was added to \"Digital\" campaign','2017-07-07 19:45:21'),(175,28,NULL,48,'Version \"1\" was added to spot \"spt1\"','2017-07-07 19:53:38'),(176,28,NULL,48,'Campaign \"Why\" was added to project \"Independence1\"','2017-07-07 21:34:56'),(177,28,NULL,48,'Spot \"spt1\" was added to \"Why\" campaign','2017-07-07 21:35:18'),(179,1,NULL,48,'Campaign \"Test\" was added to project \"Babysitter\"','2017-07-10 04:24:44'),(180,1,NULL,48,'Campaign \"Test\" was added to project \"Babysitter\"','2017-07-10 04:24:46'),(181,1,NULL,48,'Spot \"Second spot for Babysitter\" was added to \"(:30) TV\" campaign','2017-07-10 04:26:17'),(182,1,NULL,48,'Version \"1\" was added to spot \"Second spot for Babysi\"','2017-07-10 04:27:52'),(204,1,NULL,48,'Version \"1\" was added to spot \"Puppet Master\"','2017-07-28 11:16:12'),(206,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2017-11-27 11:18:27'),(207,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2017-11-27 11:18:31'),(208,1,NULL,48,'Version \"1 Alt\" was added to spot \"First Spot for Babysit\"','2017-11-27 11:19:43'),(209,1,NULL,48,'Campaign \"Teaser\" was added to project \"Babysitter\"','2017-12-07 09:12:57'),(210,1,NULL,48,'Campaign \"Teaser\" was removed from project \"Babysitter\"','2017-12-07 09:13:46'),(211,1,NULL,48,'Campaign \"Test2\" was added to project \"Babysitter\"','2017-12-07 11:09:16'),(212,1,NULL,48,'Campaign \"Test2\" was removed from project \"Babysitter\"','2017-12-07 11:09:21'),(217,2,NULL,48,'Project \"Before I Wake\" created for client \"Warner Bros.\"','2017-03-15 05:40:56'),(220,3,NULL,48,'Project \"Bravo 14\" created for client \"HBO\"','2018-01-11 15:50:36'),(221,6,NULL,48,'Project \"Jack Reacher 2\" created for client \"Warner Bros.\"','2018-01-11 15:51:25'),(222,5,NULL,48,'Project \"Hearthstone\" created for client \"NBC Universal\"','2018-01-11 15:52:00'),(224,7,NULL,48,'Project \"Lights Out\" created for client \"HBO\"','2018-01-11 15:55:35'),(226,11,NULL,48,'Project \"Silicon Valley\" created for client \"HBO\"','2018-01-11 15:56:57'),(227,14,NULL,48,'Project \"TNT Brand\" created for client \"Warner Bros.\"','2018-01-11 15:57:28'),(228,13,NULL,48,'Project \"Storks\" created for client \"NBC Universal\"','2018-01-11 15:57:53'),(229,16,NULL,48,'Project \"Veep\" was created','2018-01-11 15:58:17'),(230,15,NULL,48,'Project \"What Now\" created for client \"HBO\"','2018-01-11 15:58:42'),(231,1,NULL,48,'Campaign \"Test\" was removed from project \"Babysitter\"','2018-01-14 16:59:23'),(232,1,NULL,48,'Campaign \"Graphics\" was removed from project \"Babysitter\"','2018-01-14 17:16:43'),(233,1,NULL,48,'Campaign \"Test1\" was added to project \"Babysitter\"','2018-01-14 17:20:48'),(234,1,NULL,48,'Campaign \"Test1\" was removed from project \"Babysitter\"','2018-01-14 17:20:54'),(235,1,NULL,48,'Campaign \"Test2\" was added to project \"Babysitter\"','2018-01-14 17:21:06'),(236,1,NULL,48,'Campaign \"Test2\" was removed from project \"Babysitter\"','2018-01-14 17:21:09'),(237,1,NULL,48,'Version \"2\" was removed from spot \"First Spot for Babysit\"','2018-01-15 08:28:43'),(238,1,NULL,48,'Version \"1 Alt\" was removed from spot \"First Spot for Babysit\"','2018-01-15 08:29:54'),(239,1,NULL,48,'Version \"1 Alt\" was added to spot \"First Spot for Babysit\"','2018-01-16 06:40:48'),(240,1,NULL,48,'Version \"2\" was added to spot \"First Spot for Babysit\"','2018-01-16 07:16:38'),(241,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:07:02'),(242,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:07:27'),(243,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:10:57'),(244,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:12:18'),(245,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:12:23'),(246,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:18:04'),(247,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:18:10'),(248,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:18:14'),(249,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-01-16 08:18:18'),(250,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-01-16 08:20:26'),(251,1,NULL,48,'Version \"2\" was added to spot \"Second spot\"','2018-01-16 11:00:14'),(252,1,NULL,48,'Version \"3\" was added to spot \"Second spot\"','2018-01-16 11:00:18'),(253,1,NULL,48,'Spot \"Another spot\" was added to \"(:30) TV\" campaign','2018-01-16 11:02:09'),(254,1,NULL,48,'Version \"2\" was removed from spot \"First Spot\"','2018-01-29 10:33:29'),(255,1,NULL,48,'Version \"2\" was added to spot \"First Spot\"','2018-01-29 10:33:34'),(256,1,NULL,48,'Spot \"Third spot for Babysitter\" was added to \"(:30) TV\" campaign','2018-01-29 17:17:00'),(257,1,NULL,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-03-06 17:44:54'),(258,1,NULL,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-03-06 17:54:47'),(259,45,NULL,48,'Project \"Game of Thrones\" created for client \"HBO\"','2018-03-30 00:14:17'),(260,1,NULL,NULL,'Project renamed to \"\"Babysitter\" (codename: \"BBY\")\" from \"Babysitter\"','2018-04-02 08:02:49'),(261,1,NULL,NULL,'Project renamed to \"\"Babysitter\" (codename: \"BAB\")\" from \"Babysitter\"','2018-04-02 11:24:55'),(262,46,NULL,1,'Project \"Project abk\" created for client \"ABC Entertainment\"','2018-04-02 16:55:44'),(263,1,1,48,'Campaign \"Teaser\" was added to project \"Babysitter\"','2018-04-13 05:57:40'),(264,1,4,48,'User \"Mark Lafontant\" was removed from campaign \"(:30) TV\"','2018-04-16 09:09:16'),(265,1,4,48,'User \"Julie Davis\" was removed from campaign \"(:30) TV\"','2018-04-16 09:09:34'),(266,1,4,48,'Editor \"Sample Manager\" was added to campaign \"(:30) TV\"','2018-04-16 10:00:53'),(267,1,4,48,'Editor \"Sample Manager\" was removed from campaign \"(:30) TV\"','2018-04-16 10:01:00'),(268,1,4,48,'Designer \"Katherine Barlow\" was added to campaign \"(:30) TV\"','2018-04-16 10:01:15'),(269,1,4,48,'Designer \"Maxine Renning\" was added to campaign \"(:30) TV\"','2018-04-16 10:01:42'),(270,1,4,48,'Designer \"Maxine Renning\" was removed from campaign \"(:30) TV\"','2018-04-16 10:01:52'),(271,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-16 23:18:35'),(272,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-16 23:18:54'),(273,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-16 23:20:29'),(274,1,NULL,48,'Version \"1\" was added to spot \"Third spot for Babysitter\"','2018-04-17 08:12:23'),(275,1,NULL,48,'Version \"1\" was removed from spot \"Third spot for Babysitter\"','2018-04-17 08:18:35'),(276,1,NULL,48,'Version \"1\" was added to spot \"Third spot for Babysitter\"','2018-04-17 08:18:46'),(277,1,7,48,'Campaign \"Digital\" was added to project \"Babysitter\"','2018-04-17 12:14:45'),(278,1,7,48,'Campaign \"Digital\" was removed from project \"Babysitter\"','2018-04-17 12:35:57'),(279,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:24:43'),(280,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:24:44'),(281,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:33:40'),(282,1,4,48,'Music team request was changed on campaign \"(:30) TV\"','2018-04-17 15:33:41'),(283,1,4,48,'User \"Macklin Sameth\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-04-18 13:26:37'),(284,1,4,48,'User \"Macklin Sameth\" was added to campaign \"(:30) TV\"','2018-04-18 13:26:37'),(285,1,4,48,'User \"Macklin Sameth\" was changed to \"Graphics Coordinator\" on campaign \"(:30) TV\"','2018-04-18 13:26:49'),(286,1,4,48,'User \"Macklin Sameth\" was added to campaign \"(:30) TV\"','2018-04-18 13:26:49'),(287,15,4,48,'Campaign \"(:30) TV\" was added to project \"What Now\"','2018-04-19 08:24:43'),(288,46,4,48,'Campaign \"(:30) TV\" was added to project \"Project abk\"','2018-04-19 10:39:43'),(289,46,7,1,'Campaign \"Digital\" was added to project \"Project abk\"','2018-04-19 13:38:51'),(290,46,4,1,'Campaign \"(:30) TV\" was removed from project \"Project abk\"','2018-04-19 13:44:18'),(291,46,7,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"Digital\"','2018-04-19 14:03:35'),(292,46,7,1,'User \"JUSTINE TALLY SMITH\" was added to campaign \"Digital\"','2018-04-19 14:03:41'),(293,46,7,1,'User \"MAXWELL ALBORN\" was added to campaign \"Digital\"','2018-04-19 14:03:47'),(294,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-04-24 13:56:21'),(295,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-04-24 13:56:21'),(296,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-25 04:04:45'),(297,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-04-26 17:38:44'),(298,1,4,1,'User \"JOHN FAGAN\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-04-26 17:49:26'),(299,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:26'),(300,1,4,1,'User \"WILLIAM NEIL\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-04-26 17:49:30'),(301,1,4,1,'User \"WILLIAM NEIL\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:30'),(302,1,4,1,'User \"JORDAN MICHAEL GODFREY\" was changed to \"Editorial Manager\" on campaign \"(:30) TV\"','2018-04-26 17:49:32'),(303,1,4,1,'User \"JORDAN MICHAEL GODFREY\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:32'),(304,1,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-26 17:49:43'),(305,1,4,1,'User \"JAMIE ZAKOSKI\" was removed from campaign \"(:30) TV\"','2018-04-26 17:49:49'),(306,1,4,1,'User \"CHRISTINE ADALID\" was removed from campaign \"(:30) TV\"','2018-04-26 17:49:53'),(307,1,4,1,'User \"WILLIAM NEIL\" was removed from campaign \"(:30) TV\"','2018-04-26 17:49:55'),(308,1,4,1,'Billing user \"SOPHIA SISSON\" was added to campaign \"(:30) TV\"','2018-04-26 17:50:54'),(309,1,4,1,'Editor \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-26 17:51:50'),(310,1,4,1,'Editor \"JORDAN MICHAEL GODFREY\" was added to campaign \"(:30) TV\"','2018-04-26 17:51:54'),(311,1,4,1,'Editor \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-04-26 17:51:57'),(312,1,4,1,'Designer \"JULIE DAVIS\" was added to campaign \"(:30) TV\"','2018-04-26 17:52:02'),(313,1,4,1,'User \"JOHN FAGAN\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-04-26 17:52:46'),(314,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-26 17:52:46'),(315,1,4,1,'User \"JOHN FAGAN\" was changed to \"Graphics Coordinator\" on campaign \"(:30) TV\"','2018-04-26 17:52:52'),(316,1,4,1,'User \"JOHN FAGAN\" was added to campaign \"(:30) TV\"','2018-04-26 17:52:52'),(317,1,NULL,1,'Version \"10\" was added to spot \"\"Busy\"\"','2018-04-26 18:10:19'),(318,1,NULL,1,'Version \"3A\" was added to spot \"\"Busy\"\"','2018-04-26 18:10:23'),(319,1,NULL,1,'Version \"10B\" was added to spot \"Second spot\"','2018-04-26 18:18:33'),(320,16,4,1,'Campaign \"(:30) TV\" was added to project \"Veep\"','2018-04-26 18:38:32'),(321,16,NULL,NULL,'Project renamed to \"\"Veep\" (codename: \"VPE\")\" from \"Veep\"','2018-04-26 20:47:32'),(322,16,NULL,NULL,'Project renamed to \"\"Veep\" (codename: \"Code Name\")\" from \"Veep\"','2018-04-26 20:47:46'),(323,16,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:35'),(324,16,4,1,'User \"JULIE DAVIS\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:40'),(325,16,4,1,'User \"JAMIE ZAKOSKI\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-04-30 15:18:44'),(326,16,4,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:44'),(327,16,4,1,'User \"JULIE DAVIS\" was changed to \"Associate Producer\" on campaign \"(:30) TV\"','2018-04-30 15:18:46'),(328,16,4,1,'User \"JULIE DAVIS\" was added to campaign \"(:30) TV\"','2018-04-30 15:18:46'),(329,1,2,1,'Campaign \"Trailer\" was added to project \"Babysitter\"','2018-05-02 16:46:03'),(330,1,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-02 16:47:33'),(331,47,NULL,1,'Project \"Annihilation\" created for client \"Paramount\r\n\"','2018-05-03 15:34:28'),(332,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-03 15:34:38'),(333,47,2,1,'Campaign \"Trailer\" was added to project \"Annihilation\"','2018-05-03 15:34:46'),(334,47,71,1,'Campaign \"Test\" was added to project \"Annihilation\"','2018-05-03 15:35:05'),(335,47,4,1,'User \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-05-03 15:58:26'),(336,47,4,1,'User \"ALEXANDRA BATES\" was added to campaign \"(:30) TV\"','2018-05-03 15:58:32'),(337,47,4,1,'Editor \"WILLIAM NEIL\" was added to campaign \"(:30) TV\"','2018-05-03 16:00:04'),(338,47,4,1,'Editor \"JACOB LAWRENCE MOSKOW\" was added to campaign \"(:30) TV\"','2018-05-03 16:01:41'),(339,47,4,1,'Billing user \"MAXWELL ALBORN\" was added to campaign \"(:30) TV\"','2018-05-03 16:07:45'),(340,47,4,1,'Designer \"BRADFORD BERLING\" was added to campaign \"(:30) TV\"','2018-05-03 16:08:08'),(341,47,4,1,'Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"','2018-05-03 16:08:14'),(342,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:08:58'),(343,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:09:23'),(344,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-03 16:09:23'),(345,47,NULL,1,'Spot \"#1 Theory\" was added to \"(:30) TV\" campaign','2018-05-03 16:13:31'),(346,47,NULL,1,'Spot \"#2 Saved\" was added to \"(:30) TV\" campaign','2018-05-03 16:15:31'),(347,47,NULL,1,'Spot \"#3 Need\" was added to \"(:30) TV\" campaign','2018-05-03 16:16:40'),(348,47,NULL,1,'Spot \"#4 Inside\" was added to \"(:30) TV\" campaign','2018-05-03 16:17:03'),(349,47,NULL,1,'Spot \"#5 Threat\" was added to \"(:30) TV\" campaign','2018-05-03 16:17:20'),(350,47,NULL,1,'Spot \"#6 Rescue\" was added to \"(:30) TV\" campaign','2018-05-03 16:17:55'),(351,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(352,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(353,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(354,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-03 16:19:39'),(355,47,2,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"Trailer\"','2018-05-03 16:23:47'),(356,47,2,1,'User \"MARIE BYRNES\" was added to campaign \"Trailer\"','2018-05-03 16:23:57'),(357,47,2,1,'Billing user \"JESSICA DADON\" was added to campaign \"Trailer\"','2018-05-03 16:24:25'),(358,47,2,1,'Billing user \"JULIE DAVIS\" was added to campaign \"Trailer\"','2018-05-03 16:24:48'),(359,47,2,1,'Editor \"MEKO WINBUSH\" was added to campaign \"Trailer\"','2018-05-03 16:25:17'),(360,47,2,1,'Designer \"BOBBY SALZANO\" was added to campaign \"Trailer\"','2018-05-03 16:25:30'),(361,47,2,1,'Writing team request was changed on campaign \"Trailer\"','2018-05-03 16:25:46'),(362,47,NULL,1,'Spot \"#1 Interrogation\" was added to \"Trailer\" campaign','2018-05-03 16:26:26'),(363,47,71,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Test\"','2018-05-03 16:32:09'),(364,47,71,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Test\"','2018-05-03 16:32:13'),(365,47,71,1,'Billing user \"TONY FANG\" was added to campaign \"Test\"','2018-05-03 16:32:19'),(366,47,71,1,'Editor \"DANIEL ASMA\" was added to campaign \"Test\"','2018-05-03 16:32:34'),(367,47,71,1,'Editor \"JOHN ONEIL\" was added to campaign \"Test\"','2018-05-03 16:32:43'),(368,47,71,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Test\"','2018-05-03 16:45:05'),(369,47,71,1,'Designer \"JONATHAN REYES\" was added to campaign \"Test\"','2018-05-03 16:45:15'),(370,47,71,1,'Music team request was changed on campaign \"Test\"','2018-05-03 16:45:24'),(371,47,71,1,'Music team request was changed on campaign \"Test\"','2018-05-03 16:45:32'),(372,47,71,1,'Writing team request was changed on campaign \"Test\"','2018-05-03 16:45:33'),(373,47,NULL,1,'Spot \"#1 Reason\" was added to \"Test\" campaign','2018-05-03 16:46:04'),(374,47,NULL,1,'Spot \"#2 Creation\" was added to \"Test\" campaign','2018-05-03 16:46:22'),(375,47,NULL,1,'Spot \"#3 Everywhere\" was added to \"Test\" campaign','2018-05-03 16:47:48'),(376,47,NULL,1,'Spot \"#4 Need\" was added to \"Test\" campaign','2018-05-03 16:48:38'),(377,47,NULL,1,'Spot \"#3 Everywhere\" was added to \"Test\" campaign','2018-05-03 16:49:33'),(378,47,NULL,1,'Spot \"#5 Succeed/YouTube\" was added to \"Test\" campaign','2018-05-03 17:21:25'),(379,47,NULL,1,'Version \"1\" was added to spot \"#1 Theory\"','2018-05-11 03:28:39'),(380,47,NULL,1,'Version \"1\" was removed from spot \"#1 Theory\"','2018-05-11 03:32:55'),(381,47,NULL,1,'Spot \"Test\" was added to \"Trailer\" campaign','2018-05-11 05:00:08'),(382,47,NULL,1,'Version \"1\" was added to spot \"#1 Theory\"','2018-05-11 13:03:40'),(383,47,NULL,1,'Version \"1 Alt\" was added to spot \"#1 Theory\"','2018-05-11 13:03:41'),(384,47,NULL,1,'Version \"2\" was added to spot \"#1 Theory\"','2018-05-11 13:03:44'),(385,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:02'),(386,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:02'),(387,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:03'),(388,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:01:03'),(389,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(390,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(391,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(392,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:03:11'),(393,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:18'),(394,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:18'),(395,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:47'),(396,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-14 06:06:47'),(397,47,NULL,1,'Spot \"New test spot\" was added to \"(:30) TV\" campaign','2018-05-14 06:45:06'),(398,5,6,1,'Campaign \"Home Entertainment\" was added to project \"Hearthstone\"','2018-05-14 14:01:42'),(399,5,NULL,1,'Spot \"test\" was added to \"Home Entertainment\" campaign','2018-05-14 14:05:21'),(400,5,NULL,1,'Spot \"abc\" was added to \"Home Entertainment\" campaign','2018-05-14 14:08:24'),(401,47,NULL,1,'Spot \"Test\" was added to \"(:30) TV\" campaign','2018-05-14 23:34:23'),(402,47,NULL,1,'Spot \"Test2\" was added to \"(:30) TV\" campaign','2018-05-14 23:38:42'),(403,47,71,1,'Music team request was changed on campaign \"Test\"','2018-05-16 16:17:51'),(404,47,71,1,'Writing team request was changed on campaign \"Test\"','2018-05-16 16:17:51'),(405,47,1,1,'Campaign \"Teaser\" was added to project \"Annihilation\"','2018-05-16 16:27:10'),(406,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-16 16:34:06'),(407,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-16 16:34:06'),(408,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-05-16 16:35:06'),(409,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:40:33'),(410,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:40:33'),(411,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:46'),(412,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:46'),(413,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:47'),(414,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:41:47'),(415,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:49'),(416,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:49'),(417,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:50'),(418,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 19:42:50'),(419,47,4,1,'Billing user \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-05-17 19:47:34'),(420,47,4,1,'Billing user \"MAXWELL ALBORN\" was removed from campaign \"(:30) TV\"','2018-05-17 19:47:50'),(421,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:09'),(422,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:09'),(423,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:45'),(424,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:00:45'),(425,47,NULL,1,'Version \"3\" was added to spot \"#1 Theory\"','2018-05-17 20:04:31'),(426,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:09:20'),(427,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:17:20'),(428,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-17 20:18:22'),(429,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-17 20:18:22'),(430,49,NULL,1,'Project \"Aquaman - Massey\" (codename: \"Ahab\") created for client \"Warner Bros.\"','2018-05-18 13:16:37'),(431,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman - Massey\"','2018-05-18 13:17:29'),(432,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman - Massey\"','2018-05-18 13:18:53'),(433,49,4,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"(:30) TV\"','2018-05-18 14:44:15'),(434,49,4,1,'Designer \"MEGAN LAUREN YOON\" was removed from campaign \"(:30) TV\"','2018-05-18 14:44:26'),(435,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman - Massey\"','2018-05-24 16:13:55'),(436,47,4,1,'User \"ALEXANDRA BATES\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-05-24 16:30:03'),(437,47,4,1,'User \"ALEXANDRA BATES\" was added to campaign \"(:30) TV\"','2018-05-24 16:30:03'),(438,47,4,1,'User \"MARK LAFONTANT\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-05-24 16:30:08'),(439,47,4,1,'User \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-05-24 16:30:09'),(440,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-24 16:48:24'),(441,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-24 16:48:24'),(442,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-24 16:53:20'),(443,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-24 16:53:20'),(444,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-24 18:08:34'),(445,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-24 18:08:34'),(446,47,4,1,'Editor \"KELLI GRIGGS\" was added to campaign \"(:30) TV\"','2018-05-24 18:13:12'),(447,47,4,1,'Editor \"JUSTINE TALLY SMITH\" was added to campaign \"(:30) TV\"','2018-05-24 18:13:15'),(448,47,4,1,'Editor \"JUSTINE TALLY SMITH\" was removed from campaign \"(:30) TV\"','2018-05-24 18:13:23'),(449,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-05-28 08:39:38'),(450,47,7,1,'Campaign \"Digital\" was removed from project \"Annihilation\"','2018-05-28 08:40:23'),(451,47,68,1,'Campaign \"Why\" was removed from project \"Annihilation\"','2018-05-28 08:51:33'),(452,47,NULL,1,'Version \"3\" was removed from spot \"#1 Theory\"','2018-05-28 09:20:59'),(453,47,NULL,1,'Version \"2\" was removed from spot \"#1 Theory\"','2018-05-28 09:21:01'),(454,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-05-28 11:21:13'),(455,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:32'),(456,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:32'),(457,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:55'),(458,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-05-28 14:11:55'),(459,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 08:15:47'),(460,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-05-29 08:17:13'),(461,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 08:20:43'),(462,47,68,1,'Campaign \"Why\" was added to project \"Annihilation\"','2018-05-29 08:21:56'),(463,47,2,1,'Campaign \"Trailer\" was added to project \"Annihilation\"','2018-05-29 09:51:35'),(464,47,2,1,'Campaign \"Trailer\" was added to project \"Annihilation\"','2018-05-29 13:29:21'),(465,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 15:19:01'),(466,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-29 16:13:59'),(467,47,1,1,'Campaign \"Teaser\" was removed from project \"Annihilation\"','2018-05-30 08:21:22'),(468,47,7,1,'Campaign \"Digital\" was removed from project \"Annihilation\"','2018-05-30 08:21:24'),(469,47,68,1,'Campaign \"Why\" was removed from project \"Annihilation\"','2018-05-30 08:21:27'),(470,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-05-31 09:02:43'),(471,49,NULL,1,'Spot \"Water\" was added to \"(:30) TV\" campaign','2018-06-05 13:05:36'),(472,49,NULL,1,'Spot \"Agua\" was added to \"(:30) TV\" campaign','2018-06-05 13:07:01'),(473,49,NULL,1,'Spot \"eau\" was added to \"(:30) TV\" campaign','2018-06-05 13:09:50'),(474,49,NULL,1,'Spot \"Acqua\" was added to \"(:30) TV\" campaign','2018-06-05 13:11:17'),(475,49,NULL,1,'Version \"1\" was added to spot \"Acqua\"','2018-06-05 13:14:08'),(476,49,NULL,1,'Version \"2\" was added to spot \"Acqua\"','2018-06-05 13:14:18'),(477,49,NULL,1,'Version \"1\" was added to spot \"Water\"','2018-06-05 13:16:07'),(478,49,NULL,1,'Version \"2\" was added to spot \"Water\"','2018-06-05 13:16:10'),(479,49,NULL,1,'Version \"2\" was removed from spot \"Water\"','2018-06-05 13:16:29'),(480,49,NULL,1,'Spot \"Mizu\" was added to \"(:30) TV\" campaign','2018-06-05 13:21:30'),(481,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman - Massey\"','2018-06-05 19:48:06'),(482,49,7,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Digital\"','2018-06-06 13:27:33'),(483,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:34:34'),(484,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:11'),(485,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:18'),(486,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:35'),(487,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman - Massey\"','2018-06-06 13:35:43'),(488,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman - Massey\"','2018-06-06 13:36:16'),(489,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman - Massey\"','2018-06-06 13:36:29'),(490,49,1,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Teaser\"','2018-06-06 13:47:06'),(491,49,1,1,'Designer \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-06 13:47:11'),(492,49,1,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Teaser\"','2018-06-06 13:47:16'),(493,49,1,1,'Editor \"DAVID CREAL\" was added to campaign \"Teaser\"','2018-06-06 13:47:22'),(494,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-06 13:48:07'),(495,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-06 13:48:35'),(496,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-06 13:48:35'),(497,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-06 13:48:38'),(498,49,NULL,NULL,'Project renamed to \"\"Aquaman\" (codename: \"Ahab\")\" from \"Aquaman - Massey\"','2018-06-06 13:49:11'),(499,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman\"','2018-06-06 17:21:21'),(500,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-06 17:26:40'),(501,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-06 17:27:04'),(502,50,NULL,1,'Project \"Demo project1\" (codename: \"demo1\") created for client \"National Amusements\r\n\"','2018-06-07 13:02:53'),(503,50,4,1,'Campaign \"(:30) TV\" was added to project \"Demo project1\"','2018-06-07 13:03:07'),(504,50,6,1,'Campaign \"Home Entertainment\" was added to project \"Demo project1\"','2018-06-07 13:03:19'),(505,50,1,1,'Campaign \"Teaser\" was added to project \"Demo project1\"','2018-06-07 13:03:35'),(506,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-07 17:23:58'),(507,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-07 17:34:54'),(508,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-07 17:35:01'),(509,49,7,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Digital\"','2018-06-12 18:25:13'),(510,49,7,1,'Designer \"BETH ROY\" was added to campaign \"Digital\"','2018-06-12 18:25:14'),(511,49,NULL,1,'Spot \"Master\" was added to \"Teaser\" campaign','2018-06-12 20:26:54'),(512,49,70,1,'Campaign \"How\" was added to project \"Aquaman\"','2018-06-13 00:27:40'),(513,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-13 00:28:14'),(514,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-06-13 00:30:46'),(515,47,7,1,'Campaign \"Digital\" was added to project \"Annihilation\"','2018-06-13 00:31:56'),(516,47,7,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Digital\"','2018-06-13 16:29:33'),(517,47,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-13 16:29:36'),(518,49,1,1,'Campaign \"Teaser\" was added to project \"Aquaman\"','2018-06-13 16:39:14'),(519,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman\"','2018-06-14 18:03:49'),(520,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-14 18:06:42'),(521,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-14 18:06:42'),(522,49,1,1,'Music team request was changed on campaign \"Teaser\"','2018-06-14 18:13:49'),(523,49,1,1,'Writing team request was changed on campaign \"Teaser\"','2018-06-14 18:13:49'),(524,49,4,1,'User \"ASHLEY CAPUTO\" was added to campaign \"(:30) TV\"','2018-06-14 18:18:02'),(525,49,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-06-14 18:18:26'),(526,49,4,1,'Billing user \"ASHLEY CAPUTO\" was added to campaign \"(:30) TV\"','2018-06-14 18:21:19'),(527,49,4,1,'Editor \"DAVID CREAL\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:14'),(528,49,4,1,'Editor \"WESLEY NISBETT\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:25'),(529,49,4,1,'Editor \"BRYAN COLEMAN\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:31'),(530,49,4,1,'Designer \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-14 18:23:52'),(531,49,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-14 18:25:08'),(532,51,NULL,1,'Project \"Godzilla 2\" (codename: \"Fathom\") created for client \"Warner Bros.\"','2018-06-14 19:11:45'),(533,51,NULL,NULL,'Project renamed to \"\"Godzilla 2\" (codename: \"Fathom\")\" from \"Godzilla 2\"','2018-06-14 19:12:21'),(534,51,68,1,'Campaign \"Why\" was added to project \"Godzilla 2\"','2018-06-14 19:14:48'),(535,51,73,1,'Campaign \"Comicon\" was added to project \"Godzilla 2\"','2018-06-14 19:16:07'),(536,51,73,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Comicon\"','2018-06-14 19:37:26'),(537,51,73,1,'User \"ANDREW FARBER\" was added to campaign \"Comicon\"','2018-06-14 19:37:35'),(538,51,73,1,'User \"BETH ROY\" was added to campaign \"Comicon\"','2018-06-14 19:38:29'),(539,51,73,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"Comicon\"','2018-06-14 19:38:56'),(540,51,73,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Comicon\"','2018-06-14 19:40:26'),(541,51,73,1,'Editor \"DAVID CREAL\" was added to campaign \"Comicon\"','2018-06-14 19:40:38'),(542,51,73,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Comicon\"','2018-06-14 19:41:33'),(543,51,73,1,'Designer \"DAWN CHENETTE\" was added to campaign \"Comicon\"','2018-06-14 19:41:37'),(544,51,NULL,1,'Spot \"Tears\" was added to \"Comicon\" campaign','2018-06-14 19:51:11'),(545,51,4,1,'Campaign \"(:30) TV\" was added to project \"Godzilla 2\"','2018-06-14 19:57:26'),(546,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:15'),(547,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:16'),(548,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:17'),(549,51,4,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:25'),(550,51,4,1,'Editor \"DAVID CREAL\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:30'),(551,51,4,1,'Editor \"WESLEY NISBETT\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:30'),(552,51,4,1,'Designer \"DAWN CHENETTE\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:36'),(553,51,4,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"(:30) TV\"','2018-06-15 16:18:37'),(554,51,4,1,'Campaign \"(:30) TV\" was added to project \"Godzilla 2\"','2018-06-15 17:29:04'),(555,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-15 17:29:27'),(556,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-15 17:29:27'),(557,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-15 17:29:28'),(558,49,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-15 17:38:03'),(559,49,1,1,'User \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-15 20:12:50'),(560,49,1,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Teaser\"','2018-06-15 20:12:51'),(561,49,1,1,'User \"DAVID LIGORNER\" was added to campaign \"Teaser\"','2018-06-15 20:12:52'),(562,52,NULL,1,'Project \"The Muppets\" (codename: \"Parts\") created for client \"Disney\r\n\"','2018-06-19 17:17:29'),(563,52,1,1,'Campaign \"Teaser\" was added to project \"The Muppets\"','2018-06-19 17:19:12'),(564,52,1,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Teaser\"','2018-06-19 17:20:15'),(565,52,1,1,'Billing user \"KRYSTLE OPPENHEIMER\" was added to campaign \"Teaser\"','2018-06-19 17:20:51'),(566,52,1,1,'Editor \"STEVEN PINTO\" was added to campaign \"Teaser\"','2018-06-19 17:21:00'),(567,52,1,1,'Editor \"ULRICH SCHLEGEL\" was added to campaign \"Teaser\"','2018-06-19 17:21:09'),(568,52,1,1,'Designer \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-19 17:21:38'),(569,NULL,NULL,1,'Version \"1 Test\" was added to spot \"Master\"','2018-06-20 07:28:19'),(570,49,1,1,'Version \"2\" was added to spot \"Master\"','2018-06-22 17:29:32'),(571,49,4,1,'Campaign \"(:30) TV\" was added to project \"Aquaman\"','2018-06-22 17:38:09'),(572,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman\"','2018-06-22 17:39:49'),(573,47,NULL,1,'Spot \":15 TV Blue\" was added to \"(:30) TV\" campaign','2018-06-22 17:48:52'),(574,47,4,1,'Campaign \"(:30) TV\" was added to project \"Annihilation\"','2018-06-22 17:49:11'),(575,49,4,1,'Billing user \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-06-22 18:52:59'),(576,49,4,1,'Version \"2\" was added to spot \"Water\"','2018-06-22 18:55:44'),(577,49,7,1,'Campaign \"Digital\" was added to project \"Aquaman\"','2018-06-22 19:16:42'),(578,49,NULL,1,'Spot \"Doran spot 1\" was added to \"Digital\" campaign','2018-06-22 19:18:33'),(579,49,7,1,'Version \"1\" was added to spot \"Doran spot 1\"','2018-06-22 19:18:39'),(580,49,NULL,1,'Spot \"Brodner Spot 1\" was added to \"Digital\" campaign','2018-06-22 19:19:09'),(581,49,NULL,1,'Spot \"Brodner Spot 2\" was added to \"Digital\" campaign','2018-06-22 19:19:42'),(582,49,NULL,1,'Spot \"New Spot\" was added to \"Digital\" campaign','2018-06-22 19:20:40'),(583,49,7,1,'Version \"1\" was added to spot \"New Spot\"','2018-06-22 19:20:47'),(584,49,7,1,'Version \"1\" was added to spot \"Brodner Spot 2\"','2018-06-22 19:20:57'),(585,49,7,1,'Version \"1\" was added to spot \"Brodner Spot 1\"','2018-06-22 19:21:07'),(586,49,NULL,1,'Spot \"Tracy\" was added to \"Digital\" campaign','2018-06-22 19:23:01'),(587,49,7,1,'Version \"2\" was added to spot \"Brodner Spot 2/Lyle took over\"','2018-06-22 19:30:52'),(588,49,2,1,'Campaign \"Trailer\" was added to project \"Aquaman\"','2018-06-22 19:41:12'),(589,49,4,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"(:30) TV\"','2018-06-22 20:05:36'),(590,49,4,1,'Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"','2018-06-22 20:05:39'),(591,49,4,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"(:30) TV\"','2018-06-22 20:05:47'),(592,49,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-06-22 20:07:21'),(593,49,1,1,'Version \"2\" was removed from spot \"Master\"','2018-06-23 00:05:13'),(594,49,1,1,'User \"DAVID LIGORNER\" was removed from campaign \"Teaser\"','2018-06-25 07:44:15'),(595,49,1,1,'User \"ASHLEY CAPUTO\" was changed to \"Producer\" on campaign \"Teaser\"','2018-06-25 07:44:21'),(596,49,1,1,'User \"ASHLEY CAPUTO\" was added to campaign \"Teaser\"','2018-06-25 07:44:21'),(597,49,4,1,'User \"BETH ROY\" was changed to \"Producer\" on campaign \"(:30) TV\"','2018-06-25 09:40:00'),(598,49,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-25 09:40:00'),(599,52,1,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Producer\" on campaign \"Teaser\"','2018-06-26 13:10:43'),(600,52,1,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Teaser\"','2018-06-26 13:10:43'),(601,49,1,1,'User \"EUGENE FILLIOS\" was added to campaign \"Teaser\"','2018-06-26 13:11:25'),(602,49,1,1,'User \"EUGENE FILLIOS\" was changed to \"Lead Producer\" on campaign \"Teaser\"','2018-06-26 13:11:27'),(603,49,1,1,'User \"EUGENE FILLIOS\" was added to campaign \"Teaser\"','2018-06-26 13:11:27'),(604,49,1,1,'User \"ASHLEY CAPUTO\" was removed from campaign \"Teaser\"','2018-06-26 13:11:32'),(605,49,1,1,'User \"ANGELIQUE BENSON\" was added to campaign \"Teaser\"','2018-06-26 13:11:43'),(606,49,1,1,'User \"ANGELIQUE BENSON\" was changed to \"Associate Producer\" on campaign \"Teaser\"','2018-06-26 13:11:46'),(607,49,1,1,'User \"ANGELIQUE BENSON\" was added to campaign \"Teaser\"','2018-06-26 13:11:46'),(608,49,1,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"Teaser\"','2018-06-26 13:11:52'),(609,49,1,1,'User \"BETH ROY\" was added to campaign \"Teaser\"','2018-06-26 13:11:52'),(610,49,4,1,'User \"DAVID LIGORNER\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-06-26 13:12:12'),(611,49,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-06-26 13:12:12'),(612,49,4,1,'User \"MACKLIN SAMETH\" was changed to \"Associate Producer\" on campaign \"(:30) TV\"','2018-06-26 13:12:16'),(613,49,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-06-26 13:12:16'),(614,49,4,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-06-26 13:12:25'),(615,49,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-26 13:12:25'),(616,49,4,1,'User \"ASHLEY CAPUTO\" was removed from campaign \"(:30) TV\"','2018-06-26 13:12:27'),(617,49,7,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"Digital\"','2018-06-26 13:12:51'),(618,49,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-26 13:12:51'),(619,49,2,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Trailer\"','2018-06-26 13:13:10'),(620,49,2,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"Trailer\"','2018-06-26 13:13:12'),(621,49,2,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Trailer\"','2018-06-26 13:13:12'),(622,49,2,1,'User \"ANDREW FARBER\" was added to campaign \"Trailer\"','2018-06-26 13:13:17'),(623,49,2,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"Trailer\"','2018-06-26 13:13:21'),(624,49,2,1,'User \"ANDREW FARBER\" was added to campaign \"Trailer\"','2018-06-26 13:13:21'),(625,51,73,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"Comicon\"','2018-06-26 13:13:45'),(626,51,73,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Comicon\"','2018-06-26 13:13:45'),(627,51,73,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"Comicon\"','2018-06-26 13:13:49'),(628,51,73,1,'User \"BETH ROY\" was added to campaign \"Comicon\"','2018-06-26 13:13:49'),(629,51,73,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"Comicon\"','2018-06-26 13:13:54'),(630,51,73,1,'User \"ANDREW FARBER\" was added to campaign \"Comicon\"','2018-06-26 13:13:54'),(631,51,4,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-06-26 13:14:13'),(632,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-26 13:14:13'),(633,51,4,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-06-26 13:14:19'),(634,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-26 13:14:19'),(635,51,4,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-06-26 13:14:26'),(636,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-26 13:14:26'),(637,51,4,1,'User \"KAZADI KATAMBWA\" was changed to \"Lead Producer\" on campaign \"(:30) TV\"','2018-06-26 13:32:16'),(638,51,4,1,'User \"KAZADI KATAMBWA\" was added to campaign \"(:30) TV\"','2018-06-26 13:32:16'),(639,51,4,1,'User \"BETH ROY\" was changed to \"Graphics Art Director\" on campaign \"(:30) TV\"','2018-06-26 13:32:24'),(640,51,4,1,'User \"BETH ROY\" was added to campaign \"(:30) TV\"','2018-06-26 13:32:24'),(641,51,4,1,'User \"ANDREW FARBER\" was changed to \"Creative Manager\" on campaign \"(:30) TV\"','2018-06-26 13:32:27'),(642,51,4,1,'User \"ANDREW FARBER\" was added to campaign \"(:30) TV\"','2018-06-26 13:32:27'),(643,47,4,1,'Version \"1\" was added to spot \"#2 Saved\"','2018-06-26 13:37:23'),(644,51,73,1,'Version \"1\" was added to spot \"Tears\"','2018-06-26 13:39:33'),(645,51,NULL,1,'Spot \"Brodner Spot 1\" was added to \"(:30) TV\" campaign','2018-06-26 13:45:03'),(646,51,4,1,'Version \"1\" was added to spot \"Brodner Spot 1\"','2018-06-26 13:45:11'),(647,51,NULL,1,'Spot \"Creal Spot 1\" was added to \"(:30) TV\" campaign','2018-06-26 13:46:11'),(648,51,4,1,'Version \"1\" was added to spot \"Creal Spot 1\"','2018-06-26 13:46:15'),(649,51,NULL,1,'Spot \"Schlegs Spot 1\" was added to \"(:30) TV\" campaign','2018-06-26 13:49:25'),(650,51,4,1,'Version \"1\" was added to spot \"Schlegs Spot 1\"','2018-06-26 13:49:30'),(651,51,NULL,1,'Spot \"Brodner Spot 2\" was added to \"(:30) TV\" campaign','2018-06-26 13:53:36'),(652,51,4,1,'Version \"1\" was added to spot \"Brodner Spot 2\"','2018-06-26 13:54:15'),(653,51,4,1,'Version \"1ARev\" was added to spot \"Creal Spot 1\"','2018-06-26 14:05:18'),(654,51,4,1,'Version \"1BRev\" was added to spot \"Creal Spot 1\"','2018-06-26 14:05:42'),(655,51,4,1,'Version \"2Rev\" was added to spot \"Schlegs Spot 1\"','2018-06-26 14:06:44'),(656,51,4,1,'Version \"2A Rev\" was added to spot \"Schlegs Spot 1\"','2018-06-26 14:09:00'),(657,51,73,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"Comicon\"','2018-06-26 17:05:20'),(658,51,73,1,'Version \"21A\" was added to spot \"Tears\"','2018-06-26 19:19:39'),(659,51,4,1,'Version \"2\" was added to spot \"Brodner Spot 1\"','2018-06-27 16:26:21'),(660,51,7,1,'Campaign \"Digital\" was added to project \"Godzilla 2\"','2018-06-27 19:12:38'),(661,51,7,1,'User \"ANDREW FARBER\" was added to campaign \"Digital\"','2018-06-27 19:12:51'),(662,51,7,1,'User \"BETH ROY\" was added to campaign \"Digital\"','2018-06-27 19:12:52'),(663,51,7,1,'User \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-27 19:12:53'),(664,51,7,1,'Billing user \"KAZADI KATAMBWA\" was added to campaign \"Digital\"','2018-06-27 19:13:57'),(665,51,7,1,'Editor \"DAVID CREAL\" was added to campaign \"Digital\"','2018-06-27 19:14:03'),(666,51,7,1,'Editor \"WESLEY NISBETT\" was added to campaign \"Digital\"','2018-06-27 19:14:04'),(667,51,7,1,'Editor \"MICHAEL BRODNER\" was added to campaign \"Digital\"','2018-06-27 19:14:11'),(668,51,7,1,'Designer \"DAWN CHENETTE\" was added to campaign \"Digital\"','2018-06-27 19:14:15'),(669,51,7,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Digital\"','2018-06-27 19:14:16'),(670,51,73,1,'Version \"20B\" was added to spot \"Tears\"','2018-06-29 11:05:55'),(671,51,73,1,'Version \"21C\" was added to spot \"Tears\"','2018-06-29 12:08:00'),(672,53,NULL,1,'Project \"Shazam\" (codename: \"Franklin\") created for client \"Warner Bros.\"','2018-07-06 18:09:38'),(673,53,73,1,'Campaign \"Comicon\" was added to project \"Shazam\"','2018-07-06 18:10:02'),(674,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 18:54:39'),(675,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-06 18:54:49'),(676,53,73,1,'User \"DAVID LIGORNER\" was changed to \"Lead Producer\" on campaign \"Comicon\"','2018-07-06 18:54:53'),(677,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 18:54:53'),(678,53,73,1,'User \"MACKLIN SAMETH\" was changed to \"Associate Producer\" on campaign \"Comicon\"','2018-07-06 18:55:05'),(679,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-06 18:55:05'),(680,53,73,1,'Billing user \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 18:55:22'),(681,53,73,1,'Editor \"DAVID CREAL\" was added to campaign \"Comicon\"','2018-07-06 18:56:19'),(682,53,73,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Comicon\"','2018-07-06 18:57:25'),(683,53,73,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"Comicon\"','2018-07-06 18:57:44'),(684,53,73,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Comicon\"','2018-07-06 18:58:56'),(685,53,73,1,'Designer \"MARY ELIZABETH COX\" was added to campaign \"Comicon\"','2018-07-06 18:59:48'),(686,53,73,1,'Designer \"SARAH SHAE HALAS WERBER\" was added to campaign \"Comicon\"','2018-07-06 19:00:19'),(687,53,73,1,'Designer \"SARAH SHAE HALAS WERBER\" was removed from campaign \"Comicon\"','2018-07-06 19:00:29'),(688,53,NULL,1,'Spot \"Power Outage\" was added to \"Comicon\" campaign','2018-07-06 19:03:10'),(689,53,73,1,'Campaign \"Comicon\" was added to project \"Shazam\"','2018-07-06 19:03:21'),(690,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-06 19:04:45'),(691,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 19:04:46'),(692,53,73,1,'Billing user \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-06 19:04:53'),(693,53,73,1,'Editor \"DAVID CREAL\" was added to campaign \"Comicon\"','2018-07-06 19:05:02'),(694,53,73,1,'Designer \"HEINO FORSSTROM\" was added to campaign \"Comicon\"','2018-07-06 19:05:10'),(695,53,73,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Comicon\"','2018-07-06 19:05:11'),(696,53,73,1,'Designer \"MARY ELIZABETH COX\" was added to campaign \"Comicon\"','2018-07-06 19:05:12'),(697,53,73,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"Comicon\"','2018-07-06 19:05:13'),(698,53,NULL,1,'Spot \"Blitz\" was added to \"Comicon\" campaign','2018-07-06 19:07:40'),(699,53,73,1,'Version \"1\" was added to spot \"Power Outage\"','2018-07-06 19:14:43'),(700,51,NULL,1,'Spot \"Fears\" was added to \"Comicon\" campaign','2018-07-06 19:50:27'),(701,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-24 18:33:04'),(702,53,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-07-24 18:33:16'),(703,53,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-07-24 18:33:17'),(704,53,4,1,'User \"MACKLIN SAMETH\" was removed from campaign \"(:30) TV\"','2018-07-24 18:33:46'),(705,53,4,1,'User \"DAVID LIGORNER\" was removed from campaign \"(:30) TV\"','2018-07-24 18:33:48'),(706,53,73,1,'User \"MACKLIN SAMETH\" was changed to \"Associate Producer\" on campaign \"Comicon\"','2018-07-24 18:34:09'),(707,53,73,1,'User \"MACKLIN SAMETH\" was added to campaign \"Comicon\"','2018-07-24 18:34:09'),(708,53,73,1,'User \"DAVID LIGORNER\" was changed to \"Lead Producer\" on campaign \"Comicon\"','2018-07-24 18:34:12'),(709,53,73,1,'User \"DAVID LIGORNER\" was added to campaign \"Comicon\"','2018-07-24 18:34:12'),(710,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-24 18:34:27'),(711,53,4,1,'User \"MACKLIN SAMETH\" was added to campaign \"(:30) TV\"','2018-07-24 18:34:38'),(712,53,4,1,'User \"DAVID LIGORNER\" was added to campaign \"(:30) TV\"','2018-07-24 18:34:39'),(713,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-24 18:37:22'),(714,53,NULL,1,'Spot \"Red\" was added to \"(:30) TV\" campaign','2018-07-24 18:40:02'),(715,53,4,1,'Version \"1\" was added to spot \"Red\"','2018-07-24 18:40:09'),(716,53,NULL,1,'Spot \"Green\" was added to \"(:30) TV\" campaign','2018-07-24 18:40:25'),(717,53,4,1,'Version \"1\" was added to spot \"Green\"','2018-07-24 18:40:30'),(718,53,4,1,'Version \"2alt\" was added to spot \"Red\"','2018-07-24 18:53:29'),(719,53,4,1,'Version \"2alt\" was removed from spot \"Red\"','2018-07-24 18:53:48'),(720,53,4,1,'Version \"2alt\" was added to spot \"Red\"','2018-07-24 18:54:02'),(721,53,4,1,'Version \"2\" was added to spot \"Red\"','2018-07-24 18:54:10'),(722,53,4,1,'Version \"2A Rev 2\" was added to spot \"Red\"','2018-07-24 18:54:47'),(723,53,4,1,'Version \"2A Rev 3\" was added to spot \"Red\"','2018-07-24 18:55:05'),(724,53,4,1,'Version \"2A Rev 4\" was added to spot \"Red\"','2018-07-24 18:55:26'),(725,53,4,1,'Version \"3ARev2\" was added to spot \"Red\"','2018-07-24 19:00:47'),(726,53,NULL,1,'Spot \"Blue\" was added to \"(:30) TV\" campaign','2018-07-24 19:26:48'),(727,53,4,1,'Campaign \"(:30) TV\" was added to project \"Shazam\"','2018-07-25 14:41:12'),(728,54,NULL,1,'Project \"Wreck It Ralph 2\" (codename: \"Popcorn\") created for client \"Disney\r\n\"','2018-07-26 16:51:49'),(729,54,2,1,'Campaign \"Trailer\" was added to project \"Wreck It Ralph 2\"','2018-07-26 16:52:01'),(730,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 16:52:44'),(731,54,2,1,'Billing user \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 16:52:52'),(732,54,2,1,'Editor \"STEVEN PINTO\" was added to campaign \"Trailer\"','2018-07-26 16:53:00'),(733,54,2,1,'Designer \"DAWN CHENETTE\" was added to campaign \"Trailer\"','2018-07-26 16:53:06'),(734,54,2,1,'Designer \"BOBBY SALZANO\" was added to campaign \"Trailer\"','2018-07-26 16:53:21'),(735,54,2,1,'Designer \"KATHERINE ABIGAIL\" was added to campaign \"Trailer\"','2018-07-26 16:53:27'),(736,54,2,1,'Designer \"MEGAN LAUREN YOON\" was added to campaign \"Trailer\"','2018-07-26 16:53:35'),(737,54,NULL,1,'Spot \"Unbelievable\" was added to \"Trailer\" campaign','2018-07-26 16:54:54'),(738,54,2,1,'Version \"1\" was added to spot \"Unbelievable\"','2018-07-26 16:55:00'),(739,54,2,1,'Version \"1 Rev\" was added to spot \"Unbelievable\"','2018-07-26 16:55:04'),(740,54,2,1,'Version \"2\" was added to spot \"Unbelievable\"','2018-07-26 16:55:37'),(741,54,2,1,'Version \"2alt\" was added to spot \"Unbelievable\"','2018-07-26 16:55:48'),(742,54,2,1,'Version \"2altrev\" was added to spot \"Unbelievable\"','2018-07-26 16:56:07'),(743,54,2,1,'Version \"2Rev\" was added to spot \"Unbelievable\"','2018-07-26 16:56:21'),(744,54,2,1,'Version \"3\" was added to spot \"Unbelievable\"','2018-07-26 16:56:34'),(745,54,2,1,'Version \"4\" was added to spot \"Unbelievable\"','2018-07-26 16:56:41'),(746,54,2,1,'Version \"4 Alt\" was added to spot \"Unbelievable\"','2018-07-26 16:56:45'),(747,54,2,1,'Version \"5\" was added to spot \"Unbelievable\"','2018-07-26 16:56:56'),(748,54,2,1,'Version \"5 Alt\" was added to spot \"Unbelievable\"','2018-07-26 16:56:59'),(749,54,2,1,'Version \"6\" was added to spot \"Unbelievable\"','2018-07-26 16:57:08'),(750,54,2,1,'Version \"6 Rev\" was added to spot \"Unbelievable\"','2018-07-26 16:57:27'),(751,54,2,1,'Version \"7\" was added to spot \"Unbelievable\"','2018-07-26 16:57:34'),(752,54,2,1,'Version \"2alt\" was removed from spot \"Unbelievable\"','2018-07-26 17:02:26'),(753,54,2,1,'Version \"2altrev\" was removed from spot \"Unbelievable\"','2018-07-26 17:02:35'),(754,54,2,1,'Version \"2Rev\" was removed from spot \"Unbelievable\"','2018-07-26 17:06:07'),(755,54,2,1,'Version \"3 Alt\" was added to spot \"Unbelievable\"','2018-07-26 17:06:29'),(756,54,2,1,'Version \"5 Alt2\" was added to spot \"Unbelievable\"','2018-07-26 17:07:59'),(757,54,2,1,'Version \"5 Alt3\" was added to spot \"Unbelievable\"','2018-07-26 17:08:32'),(758,54,2,1,'Version \"6 Rev\" was removed from spot \"Unbelievable\"','2018-07-26 17:08:41'),(759,54,2,1,'Version \"8\" was added to spot \"Unbelievable\"','2018-07-26 17:08:50'),(760,54,NULL,1,'Spot \"Searching\" was added to \"Trailer\" campaign','2018-07-26 17:16:28'),(761,54,2,1,'Version \"1\" was added to spot \"Searching\"','2018-07-26 17:17:42'),(762,54,2,1,'Version \"1 Alt\" was added to spot \"Searching\"','2018-07-26 17:17:47'),(763,54,2,1,'Version \"2\" was added to spot \"Searching\"','2018-07-26 17:17:51'),(764,54,2,1,'Version \"2 Alt\" was added to spot \"Searching\"','2018-07-26 17:17:54'),(765,54,2,1,'Version \"2 Rev\" was added to spot \"Searching\"','2018-07-26 17:18:02'),(766,54,2,1,'Version \"2 AltRev\" was added to spot \"Searching\"','2018-07-26 17:18:47'),(767,54,2,1,'Version \"3\" was added to spot \"Searching\"','2018-07-26 17:18:59'),(768,54,2,1,'Version \"4\" was added to spot \"Searching\"','2018-07-26 17:19:05'),(769,54,2,1,'Version \"4 Alt\" was added to spot \"Searching\"','2018-07-26 17:19:11'),(770,54,2,1,'Version \"5\" was added to spot \"Searching\"','2018-07-26 17:20:56'),(771,54,2,1,'Version \"5 Alt\" was added to spot \"Searching\"','2018-07-26 17:21:03'),(772,54,2,1,'Version \"6\" was added to spot \"Searching\"','2018-07-26 17:21:10'),(773,54,2,1,'Version \"6 Alt\" was added to spot \"Searching\"','2018-07-26 17:21:14'),(774,54,2,1,'Version \"6 Alt\" was removed from spot \"Searching\"','2018-07-26 17:21:23'),(775,54,2,1,'Version \"6 Rev\" was added to spot \"Searching\"','2018-07-26 17:21:30'),(776,54,2,1,'Version \"7\" was added to spot \"Searching\"','2018-07-26 17:21:37'),(777,54,2,1,'Version \"8\" was added to spot \"Searching\"','2018-07-26 17:21:42'),(778,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Lead Producer\" on campaign \"Trailer\"','2018-07-26 17:22:41'),(779,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 17:22:41'),(780,54,2,1,'User \"MARK LAFONTANT\" was added to campaign \"Trailer\"','2018-07-26 17:22:48'),(781,54,2,1,'User \"MARK LAFONTANT\" was changed to \"Producer\" on campaign \"Trailer\"','2018-07-26 17:22:51'),(782,54,2,1,'User \"MARK LAFONTANT\" was added to campaign \"Trailer\"','2018-07-26 17:22:51'),(783,54,2,1,'User \"MARK LAFONTANT\" was removed from campaign \"Trailer\"','2018-07-26 17:23:00'),(784,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was changed to \"Producer\" on campaign \"Trailer\"','2018-07-26 17:23:04'),(785,54,2,1,'User \"KRYSTLE OPPENHEIMER\" was added to campaign \"Trailer\"','2018-07-26 17:23:04'),(786,47,4,1,'User \"ALEXANDRA BATES\" was added to campaign \"(:30) TV\"','2018-08-01 19:35:55'),(787,47,4,1,'User \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-08-01 19:35:55'),(788,47,4,1,'Billing user \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:11'),(789,47,4,1,'Editor \"JACOB LAWRENCE MOSKOW\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:18'),(790,47,4,1,'Editor \"KELLI GRIGGS\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:19'),(791,47,4,1,'Editor \"WILLIAM NEIL\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:20'),(792,47,4,1,'Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:27'),(793,47,4,1,'Designer \"BRADFORD BERLING\" was added to campaign \"(:30) TV\"','2018-08-01 19:36:27'),(794,47,4,1,'User \"MARK LAFONTANT\" was removed from campaign \"(:30) TV\"','2018-08-01 19:38:45'),(795,47,4,1,'User \"ALEXANDRA BATES\" was removed from campaign \"(:30) TV\"','2018-08-01 19:38:48'),(796,47,4,1,'User \"TONY FANG\" was added to campaign \"(:30) TV\"','2018-08-01 19:39:01'),(797,2,103,NULL,'Campaign test campaign1 was added to project Before I Wake','2018-08-13 23:59:17'),(798,2,104,NULL,'Campaign test campaign1 was added to project Before I Wake','2018-08-14 00:08:55'),(799,3,104,NULL,'Campaign test campaign1 was added to project Bravo 14','2018-08-14 00:08:55'),(800,2,105,NULL,'Campaign test campaign1 was added to project Before I Wake','2018-08-14 00:11:30'),(801,3,105,NULL,'Campaign test campaign1 was added to project Bravo 14','2018-08-14 00:11:30'),(802,2,106,NULL,'Campaign test campaign1 was added to project Before I Wake','2018-08-14 00:15:12'),(803,3,106,NULL,'Campaign test campaign1 was added to project Bravo 14','2018-08-14 00:15:12'),(804,2,107,NULL,'Campaign test campaign1 was added to project Before I Wake','2018-08-14 00:15:20'),(805,3,107,NULL,'Campaign test campaign1 was added to project Bravo 14','2018-08-14 00:15:20'),(806,49,NULL,NULL,'Project renamed to \"\"Test project 123\" (codename: \"TPO\")\" from \"Aquaman\"','2018-09-16 12:55:43'),(807,49,NULL,1,'Project customer changed to \"NBC Universal\" from \"Warner Bros.\"','2018-09-16 12:55:43'),(808,49,NULL,NULL,'Project renamed to \"\"Test project 1232\" (codename: \"TPO\")\" from \"Test project 123\"','2018-09-16 13:12:32'),(809,55,NULL,1,'Project \"Test Project One22\" (codename: \"TPO\") created for client \"NBC Universal\"','2018-09-16 13:12:58'),(810,2,108,1,'Campaign \"test campaign1\" was added to project \"Before I Wake\"','2018-09-16 13:56:41'),(811,2,108,1,'User \"ASHLEY ZEIGLER\" was added to campaign \"test campaign1\"','2018-09-16 13:56:41'),(812,2,108,1,'User \"KATRINA BOTHWELL\" was added to campaign \"test campaign1\"','2018-09-16 13:56:41'),(813,2,108,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"test campaign1\"','2018-09-16 13:56:41'),(814,2,108,1,'User \"MAXWELL ALBORN\" was added to campaign \"test campaign1\"','2018-09-16 13:56:41'),(815,3,108,1,'Campaign \"test campaign1\" was added to project \"Bravo 14\"','2018-09-16 13:56:41'),(816,3,108,1,'User \"ASHLEY ZEIGLER\" was added to campaign \"test campaign1\"','2018-09-16 13:56:41'),(817,3,108,1,'User \"KATRINA BOTHWELL\" was added to campaign \"test campaign1\"','2018-09-16 13:56:41'),(818,3,108,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"test campaign1\"','2018-09-16 13:56:41'),(819,3,108,1,'User \"MAXWELL ALBORN\" was added to campaign \"test campaign1\"','2018-09-16 13:56:41'),(820,2,109,1,'Campaign \"test campaign1\" was added to project \"Before I Wake\"','2018-09-16 13:58:34'),(821,2,109,1,'User \"ASHLEY ZEIGLER\" was added to campaign \"test campaign1\"','2018-09-16 13:58:34'),(822,2,109,1,'User \"KATRINA BOTHWELL\" was added to campaign \"test campaign1\"','2018-09-16 13:58:34'),(823,2,109,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"test campaign1\"','2018-09-16 13:58:34'),(824,2,109,1,'User \"MAXWELL ALBORN\" was added to campaign \"test campaign1\"','2018-09-16 13:58:34'),(825,3,109,1,'Campaign \"test campaign1\" was added to project \"Bravo 14\"','2018-09-16 13:58:34'),(826,3,109,1,'User \"ASHLEY ZEIGLER\" was added to campaign \"test campaign1\"','2018-09-16 13:58:34'),(827,3,109,1,'User \"KATRINA BOTHWELL\" was added to campaign \"test campaign1\"','2018-09-16 13:58:34'),(828,3,109,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"test campaign1\"','2018-09-16 13:58:34'),(829,3,109,1,'User \"MAXWELL ALBORN\" was added to campaign \"test campaign1\"','2018-09-16 13:58:34'),(830,2,110,1,'Campaign \"test campaign123\" was added to project \"Before I Wake\"','2018-09-16 14:00:41'),(831,2,110,1,'User \"ASHLEY ZEIGLER\" was added to campaign \"test campaign123\"','2018-09-16 14:00:41'),(832,2,110,1,'User \"KATRINA BOTHWELL\" was added to campaign \"test campaign123\"','2018-09-16 14:00:41'),(833,2,110,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"test campaign123\"','2018-09-16 14:00:41'),(834,2,110,1,'User \"MAXWELL ALBORN\" was added to campaign \"test campaign123\"','2018-09-16 14:00:41'),(835,3,110,1,'Campaign \"test campaign123\" was added to project \"Bravo 14\"','2018-09-16 14:00:41'),(836,3,110,1,'User \"ASHLEY ZEIGLER\" was added to campaign \"test campaign123\"','2018-09-16 14:00:41'),(837,3,110,1,'User \"KATRINA BOTHWELL\" was added to campaign \"test campaign123\"','2018-09-16 14:00:41'),(838,3,110,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"test campaign123\"','2018-09-16 14:00:41'),(839,3,110,1,'User \"MAXWELL ALBORN\" was added to campaign \"test campaign123\"','2018-09-16 14:00:41'),(840,2,101,1,'Campaign \"test campaign12323\" was added to project \"Before I Wake\"','2018-09-16 14:16:39'),(841,2,101,1,'User \"ANGELIQUE BENSON\" was added to campaign \"test campaign12323\"','2018-09-16 14:16:39'),(842,2,101,1,'User \"KATRINA BOTHWELL\" was added to campaign \"test campaign12323\"','2018-09-16 14:16:39'),(843,2,101,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"test campaign12323\"','2018-09-16 14:16:39'),(844,2,101,1,'User \"MAXWELL ALBORN\" was added to campaign \"test campaign12323\"','2018-09-16 14:16:39'),(845,3,101,1,'Campaign \"test campaign12323\" was added to project \"Bravo 14\"','2018-09-16 14:16:39'),(846,3,101,1,'User \"ASHLEY ZEIGLER\" was added to campaign \"test campaign12323\"','2018-09-16 14:16:39'),(847,3,101,1,'User \"KATRINA BOTHWELL\" was added to campaign \"test campaign12323\"','2018-09-16 14:16:39'),(848,3,101,1,'User \"JAMIE ZAKOSKI\" was added to campaign \"test campaign12323\"','2018-09-16 14:16:39'),(849,3,101,1,'User \"MAXWELL ALBORN\" was added to campaign \"test campaign12323\"','2018-09-16 14:16:39'),(850,1,NULL,1,'Spot \"sp111\" was added to \"Teaser\" campaign','2018-09-16 14:37:43'),(851,1,NULL,1,'Spot \"sp111\" was added to \"Teaser\" campaign','2018-09-16 14:38:43'),(852,1,NULL,1,'Spot \"sp111\" was added to \"Teaser\" campaign','2018-09-16 14:39:13'),(853,1,NULL,1,'Spot \"sp111\" was added to \"Teaser\" campaign','2018-09-16 14:39:20'),(854,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-09-23 16:09:03'),(855,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-09-23 16:09:03'),(856,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-09-23 16:09:17'),(857,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-09-23 16:09:17'),(858,5,6,1,'Version \"3B\" was added to spot \"abc\"','2018-09-23 17:59:35'),(859,5,6,1,'Version \"3B\" was removed from spot \"abc\"','2018-09-23 18:08:02'),(860,5,6,1,'Version \"3B\" was added to spot \"abc\"','2018-09-23 18:15:18'),(861,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-10-15 19:28:35'),(862,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-10-15 19:28:35'),(863,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-10-15 19:35:50'),(864,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-10-15 19:35:50'),(865,47,4,1,'Music team request was changed on campaign \"(:30) TV\"','2018-10-15 19:36:17'),(866,47,4,1,'Writing team request was changed on campaign \"(:30) TV\"','2018-10-15 19:36:17');
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
INSERT INTO `redi_project_permissions` VALUES (1,'project-create','Create project page'),(2,'project-name','Project name'),(3,'project-release-date','Project release date'),(4,'project-history','Project history and changelog'),(5,'project-description','Project description'),(6,'project-campaigns','Project campaigns list'),(7,'campaign-description','Campaign description'),(8,'campaign-details','Campaign details'),(9,'campaign-contacts','Campaign contacts'),(10,'campaign-people-creative','Campaign creative team'),(11,'campaign-people-billing','Campaign billing team'),(12,'campaign-people-editorial','Campaign editorial team'),(13,'campaign-people-design','Campaign graphic design team'),(14,'campaign-writing-team','Campaign writing team'),(15,'campaign-music-team','Campaign music team'),(200,'all-projects-campaigns',NULL),(17,'date-material-received','Campaign date materials will be received'),(18,'campaign-budget','Campaign budget'),(19,'campaign-notes','Campaign notes'),(20,'campaign-por','Campaign POR'),(21,'campaign-invoice-contact','Campaign invoice contact'),(22,'spot','Spots list'),(23,'spot-first-revision-cost','Spot first revision rate'),(24,'spot-internal-due-date','Spot internal due date'),(25,'spot-client-due-date','Spot client due date'),(26,'spot-revision','Spot revisions and versions'),(27,'spot-graphics-revision','Spot graphics included'),(100,'user-permission','User permission'),(28,'campaign-client-executive','Campaign client executive'),(29,'version-status','Version status'),(30,'version-note','Version note'),(31,'project-codename','Project code name');
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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=223 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_project_to_campaign`
--

LOCK TABLES `redi_project_to_campaign` WRITE;
/*!40000 ALTER TABLE `redi_project_to_campaign` DISABLE KEYS */;
INSERT INTO `redi_project_to_campaign` VALUES (104,9,4,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(105,1,4,7,0,NULL,1,'This is the place for notes','(:30) TV Campaign','5000',NULL,NULL,NULL,NULL,1),(156,47,4,NULL,1,'both conceptual ideas and copy',1,'cue sheets only as we\'re using cleared music from theatrical campaign to start','(:30) TV Massey','0','test note for budget',NULL,NULL,NULL,0),(157,47,2,NULL,1,'just a blurb',NULL,NULL,NULL,'45000',NULL,NULL,NULL,'2018-01-18 08:00:00',0),(158,47,71,NULL,1,'once upon a time',1,'do ta do','(:15) TV','0','on spec; billable if revised',NULL,NULL,'2017-12-02 08:00:00',0),(111,10,4,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(112,10,1,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(143,28,1,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(144,28,4,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(146,28,7,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(147,28,68,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(149,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(151,15,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(154,16,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(153,46,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(155,1,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(159,5,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(169,49,1,12,1,'Hey guys!  Can you watch when this comes in, should be sometime late week and then we\'ll do a creative kick off meeting early next week!',1,'Hey guys!  Can you watch when this comes in, should be sometime late week and then we\'ll do a creative kick off meeting early next week!','Trailer Campaign Eugene','25000','reduced rate trailer, no revisions included',NULL,NULL,NULL,0),(182,47,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(162,49,4,12,NULL,NULL,NULL,NULL,'(autopopulate) #1 test',NULL,NULL,NULL,NULL,NULL,0),(163,49,7,NULL,NULL,NULL,NULL,NULL,'Digital: Stanford',NULL,NULL,NULL,NULL,NULL,0),(200,53,4,NULL,NULL,NULL,NULL,NULL,'Massey',NULL,NULL,NULL,NULL,NULL,0),(181,47,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(173,50,4,NULL,NULL,NULL,NULL,NULL,'test  k',NULL,NULL,NULL,NULL,NULL,0),(174,50,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(175,50,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(176,49,2,NULL,NULL,NULL,NULL,NULL,'Trailer Campaign Kazadi',NULL,NULL,NULL,NULL,NULL,0),(196,53,73,NULL,NULL,NULL,NULL,NULL,'Hall H',NULL,NULL,NULL,NULL,NULL,0),(194,49,2,13,NULL,NULL,NULL,NULL,'Comicon Trailer',NULL,NULL,NULL,NULL,NULL,0),(186,51,73,NULL,NULL,NULL,NULL,NULL,'Trailer',NULL,NULL,NULL,NULL,NULL,0),(187,51,4,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0),(188,51,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(195,51,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(189,52,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(190,49,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(193,49,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(192,47,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(197,53,73,NULL,NULL,NULL,NULL,NULL,'Trailer',NULL,NULL,NULL,NULL,NULL,0),(199,53,4,12,NULL,NULL,NULL,NULL,'Stanford',NULL,NULL,NULL,NULL,NULL,0),(201,53,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(202,54,2,NULL,NULL,NULL,NULL,NULL,'International',NULL,NULL,NULL,NULL,NULL,0),(203,2,100,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(204,2,101,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(205,2,102,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(206,2,103,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(207,2,104,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(208,3,104,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(209,2,105,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(210,3,105,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(211,2,106,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(212,3,106,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(213,2,107,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(214,3,107,1,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(215,2,108,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(216,3,108,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(217,2,109,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(218,3,109,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(219,2,110,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(220,3,110,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(221,3,101,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(222,3,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
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
INSERT INTO `redi_project_to_campaign_billing` VALUES (105,146,NULL),(105,180,NULL),(105,13,NULL),(162,19,NULL),(157,40,NULL),(157,9,NULL),(158,15,NULL),(156,97,NULL),(186,89,NULL),(187,89,NULL),(189,95,NULL),(162,96,NULL),(195,89,NULL),(196,96,NULL),(197,96,NULL),(202,95,NULL),(192,97,NULL);
/*!40000 ALTER TABLE `redi_project_to_campaign_billing` ENABLE KEYS */;
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
INSERT INTO `redi_project_to_campaign_designer` VALUES (105,9),(105,136),(156,64),(156,67),(157,66),(158,69),(158,70),(162,61),(162,63),(162,67),(162,69),(163,61),(163,63),(169,61),(169,63),(186,69),(186,73),(187,69),(187,73),(189,63),(192,64),(192,67),(195,69),(195,73),(196,60),(196,61),(196,62),(196,69),(197,60),(197,61),(197,62),(197,69),(202,60),(202,61),(202,66),(202,73);
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
INSERT INTO `redi_project_to_campaign_editor` VALUES (105,6),(105,87),(105,89),(156,37),(156,44),(156,48),(157,32),(158,26),(158,86),(162,30),(162,36),(162,41),(163,41),(169,36),(169,41),(186,35),(186,36),(186,41),(187,36),(187,41),(189,29),(189,31),(192,37),(192,44),(192,48),(195,35),(195,36),(195,41),(196,36),(197,36),(202,29);
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
INSERT INTO `redi_project_to_campaign_user` VALUES (156,23,4),(156,97,2),(105,10,7),(153,7,NULL),(105,87,8),(154,6,1),(105,121,2),(105,146,7),(105,161,2),(153,8,NULL),(154,9,3),(105,101,1),(153,6,NULL),(157,6,NULL),(157,11,NULL),(158,89,NULL),(158,19,NULL),(182,19,NULL),(182,89,NULL),(176,89,1),(162,96,1),(162,63,6),(186,89,1),(186,22,4),(186,63,6),(187,22,4),(187,63,6),(187,89,1),(188,22,4),(188,63,6),(188,89,1),(163,89,1),(169,63,6),(169,20,3),(169,90,1),(189,95,2),(162,25,3),(176,22,4),(195,22,NULL),(195,63,NULL),(195,89,NULL),(196,96,1),(196,25,3),(197,25,3),(197,96,1),(199,96,NULL),(199,25,NULL),(202,95,2),(192,15,NULL),(207,2,2),(207,3,1),(207,6,2),(207,7,4),(208,2,2),(208,3,1),(208,7,4),(208,6,2),(209,2,2),(209,3,1),(209,6,2),(209,7,4),(210,3,1),(210,2,2),(210,6,2),(210,7,4),(211,2,2),(211,3,1),(211,6,2),(211,7,4),(212,2,2),(212,3,1),(212,6,2),(212,7,4),(213,2,2),(213,3,1),(213,6,2),(213,7,4),(214,2,2),(214,3,1),(214,6,2),(214,7,4),(215,2,2),(215,3,1),(215,6,2),(215,7,4),(216,2,2),(216,3,1),(216,6,2),(216,7,4),(217,2,2),(217,3,1),(217,6,2),(217,7,4),(218,2,2),(218,3,1),(218,6,2),(218,7,4),(219,2,2),(219,3,1),(219,6,2),(219,7,4),(220,2,2),(220,3,1),(220,6,2),(220,7,4),(204,20,2),(204,3,1),(204,6,2),(204,7,4),(221,2,2),(221,3,1),(221,6,2),(221,7,4);
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
INSERT INTO `redi_project_user` VALUES (55,2,2),(55,3,1),(55,6,2),(55,7,4);
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
INSERT INTO `redi_setting` VALUES (1,'TEMPORARY_STAFF_HOUR_PER_DAY','8'),(2,'TEST','some test value'),(3,'MAX_SPOT_SENT_REQUEST_ID','40');
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
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=126 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot`
--

LOCK TABLES `redi_spot` WRITE;
/*!40000 ALTER TABLE `redi_spot` DISABLE KEYS */;
INSERT INTO `redi_spot` VALUES (3,'Puddin',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'Puppet Master',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Boomer',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'Slipknot',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'Croc',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'Diablo',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'Enchantress',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'Katana',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'Waller',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'Deadshot',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'Flag',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'Joker',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'Harley',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'Deashot :60',149,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'Take Over :10',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'Vertical Footage',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'Puddin',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'Boomer',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,'Slipknot',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'Croc',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,'Diablo',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,'Enchantress',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,'Katana',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(27,'Waller',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,'Deadshot',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(29,'Flag',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(30,'Joker',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,'Harley',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,'Deashot :60',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(55,'\"Busy\"',105,NULL,'Based on \"Busy\" :60',2,1,10000.00,'2018-04-26 00:00:00','2018-04-26 00:00:00',NULL,NULL),(63,'spt4',143,NULL,'spt4notre',NULL,0,NULL,NULL,NULL,NULL,NULL),(62,'spt3',143,NULL,'sdf',NULL,0,NULL,NULL,NULL,NULL,NULL),(61,'spt2',143,NULL,'fsdf',NULL,0,NULL,NULL,NULL,NULL,NULL),(60,'spt1',143,NULL,'sptnote',0,0,0.00,NULL,NULL,NULL,NULL),(57,'Episode 405',104,NULL,'null',0,0,0.00,NULL,NULL,NULL,NULL),(56,'First Spot for Teaser',112,NULL,'null',3,0,35000.00,NULL,NULL,NULL,NULL),(64,'spt5',143,NULL,'spt5note',NULL,0,NULL,NULL,NULL,NULL,NULL),(65,'spt5',143,NULL,'spt5note',NULL,0,NULL,NULL,NULL,NULL,NULL),(66,'spt6',143,NULL,'r',NULL,0,NULL,NULL,NULL,NULL,NULL),(67,'spt1',144,NULL,'wer',NULL,0,NULL,NULL,NULL,NULL,NULL),(71,'spt1',146,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL),(72,'spt1',147,NULL,'spt note',NULL,0,NULL,NULL,NULL,NULL,NULL),(73,'Spot #2\"Really Tired\"',105,NULL,'Secondary spot is important as well',5,1,500.00,'2018-04-26 00:00:00','2018-04-26 00:00:00',NULL,NULL),(77,'Third spot for Babysitter project',105,NULL,'Some notes for reference',0,0,0.00,'2018-06-16 00:00:00','2018-07-19 00:00:00',NULL,NULL),(78,'#1 Theory aka \"Truce\"',156,NULL,'Kris Brown cut v.1',3,0,11000.00,'2018-05-11 00:00:00','2018-05-14 00:00:00','R','Spec revised, is billable'),(79,'#2 Saved',156,NULL,'null',3,0,11000.00,NULL,'2018-05-14 00:00:00',NULL,NULL),(80,'#3 Need',156,NULL,'null',3,0,11000.00,NULL,NULL,NULL,NULL),(81,'#4 Inside',156,NULL,'null',3,0,11000.00,NULL,NULL,NULL,NULL),(82,'#5 Threat',156,NULL,'null',3,0,11000.00,NULL,NULL,NULL,NULL),(83,'#6 Rescue',156,NULL,'OT billable',2,0,9000.00,NULL,NULL,NULL,NULL),(84,'#1 Interrogation',157,NULL,'null',5,0,45000.00,NULL,NULL,NULL,NULL),(85,'#1 Reason',158,NULL,'null',3,0,5000.00,NULL,NULL,NULL,NULL),(86,'#2 Creation',158,NULL,'null',3,0,5000.00,NULL,NULL,NULL,NULL),(87,'#3 Everywhere',158,NULL,'null',3,0,5000.00,NULL,NULL,NULL,NULL),(88,'#4 Need',158,NULL,'based on digital :15 v.6',0,0,5000.00,NULL,NULL,NULL,NULL),(89,'#3 Everywhere',158,NULL,'based on digital 15 v.6',0,0,0.00,NULL,NULL,NULL,NULL),(90,'#5 Succeed/YouTube',158,NULL,'based on digital 15 v.3',0,0,5000.00,NULL,NULL,NULL,NULL),(91,'Test',157,NULL,'null',0,0,0.00,NULL,NULL,NULL,NULL),(92,'New test spot',156,NULL,'Edit sample note',0,0,0.00,NULL,NULL,NULL,NULL),(93,'test',159,NULL,'null',0,0,0.00,NULL,NULL,NULL,NULL),(94,'abc',159,NULL,'test',0,0,0.00,NULL,NULL,NULL,NULL),(95,'Test3',156,NULL,NULL,0,0,0.00,NULL,NULL,NULL,NULL),(96,'Test2',156,NULL,NULL,0,0,0.00,NULL,NULL,NULL,NULL),(97,'Water',162,NULL,'spot renamed',0,0,12000.00,NULL,'2018-06-12 00:00:00','S','reduced rate'),(98,'Agua',162,NULL,NULL,5,0,12000.00,'2018-06-08 00:00:00','2018-06-12 00:00:00','B','Client asked for this spot specifically. Billable for sure!'),(99,'eau',162,NULL,NULL,0,0,0.00,'2018-06-08 00:00:00','2018-06-12 00:00:00','S','Client didn\'t order spot and the spot never got to a point where it was sendable.'),(100,'Wasser aka \"Acqua\"',162,NULL,'Production please be aware the client is changing the name of the spot on V.2, original name was \"Acqua\"',3,0,10000.00,NULL,'2018-06-12 00:00:00','R','Client loved the spot, billing discount WB TV rate, only 3 revisions included with discount'),(101,'Mizu',162,NULL,NULL,0,0,12000.00,'2018-06-08 00:00:00','2018-06-12 00:00:00','S',NULL),(102,'sp123432423499',147,NULL,NULL,3,0,90.50,'2018-06-22 00:00:00','2018-06-26 00:00:00','B','some billing note'),(103,'Tears',186,NULL,'Wes\' cut',0,0,45000.00,NULL,'2018-06-21 00:00:00','S','Cutting two pieces, massey ordered 1, TBD on which to bill and if we can bill one hourly or not'),(104,':15 TV Blue',156,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL),(105,'Waves',193,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL),(106,'Brodner Spot 1',193,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL),(107,'Warrior',193,NULL,NULL,4,0,12500.00,NULL,NULL,'R','Massey loved spot, bill this one.'),(108,'Lyle Spot 1',193,NULL,'\"Sand\"',0,0,0.00,NULL,NULL,'B',NULL),(109,'Tracy',193,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL),(110,'Brodner Spot 1',187,NULL,NULL,0,0,0.00,NULL,'2018-06-25 00:00:00','S',NULL),(111,'Creal Spot 1',187,NULL,'Will retitle once we know what we are calling it!',4,0,12500.00,'2018-06-22 00:00:00','2018-06-25 00:00:00','B',NULL),(112,'Schlegs Spot 1',187,NULL,NULL,0,0,0.00,NULL,'2018-06-25 00:00:00','S',NULL),(113,'Brodner Spot 2',187,NULL,NULL,0,0,0.00,'2018-06-25 00:00:00','2018-06-25 00:00:00','S','Brodner finished his first spot quickly and had another idea for a second spot.'),(114,'Power Outage',196,NULL,'Hall H piece',4,0,0.00,NULL,NULL,'B',NULL),(115,'Blitz',197,NULL,NULL,4,0,45000.00,NULL,NULL,'B','MJ said cannot go over 45 and will probably need a reduction.'),(116,'Fears',186,NULL,NULL,0,0,0.00,NULL,NULL,'S',NULL),(117,'Red',200,NULL,NULL,4,0,12500.00,'2018-07-04 00:00:00','2018-07-06 00:00:00','B',NULL),(118,'Green',199,NULL,NULL,0,0,0.00,NULL,NULL,'B',NULL),(119,'Blue',200,NULL,NULL,4,0,12500.00,NULL,NULL,'B',NULL),(120,'Unbelievable',202,NULL,'French Trailer :90',2,0,45000.00,'2018-07-12 00:00:00','2018-07-13 00:00:00','B','Rate discussed and approved with client'),(121,'Searching',202,NULL,'German/general international trailer 2:00 or less',2,0,30000.00,'2018-07-16 00:00:00','2018-07-17 00:00:00','B','budget discussed and approved by client'),(122,'sp111',149,NULL,NULL,3,0,90.50,NULL,NULL,'C','some test ntoe'),(123,'sp111',149,NULL,NULL,3,0,90.50,NULL,NULL,'C','some test ntoe'),(124,'sp111',149,NULL,NULL,3,0,90.50,NULL,NULL,'C','some test ntoe'),(125,'sp111',149,NULL,NULL,3,0,90.50,NULL,NULL,'C','some test ntoe');
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
  `line_status_id` int(11) DEFAULT NULL,
  `spot_sent_date` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `request_id` (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_sent`
--

LOCK TABLES `redi_spot_sent` WRITE;
/*!40000 ALTER TABLE `redi_spot_sent` DISABLE KEYS */;
INSERT INTO `redi_spot_sent` VALUES (1,1,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,NULL,NULL,1,NULL,'2018-10-10 15:21:27',NULL),(2,1,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,NULL,NULL,1,NULL,'2018-10-10 15:21:27',NULL),(3,1,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,NULL,NULL,1,NULL,'2018-10-10 15:21:43',NULL),(4,1,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,NULL,NULL,1,NULL,'2018-10-10 15:21:43',NULL),(5,1,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,NULL,NULL,1,NULL,'2018-10-10 15:21:46',NULL),(6,1,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,NULL,NULL,1,NULL,'2018-10-10 15:21:46',NULL),(7,2,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,NULL,NULL,1,NULL,'2018-10-10 15:24:13',NULL),(8,2,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,NULL,NULL,1,NULL,'2018-10-10 15:24:13',NULL),(11,4,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,NULL,NULL,1,NULL,'2018-10-10 15:24:17',NULL),(12,4,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,NULL,NULL,1,NULL,'2018-10-10 15:24:17',NULL),(13,5,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,NULL,NULL,1,NULL,'2018-10-10 15:24:18',NULL),(14,5,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,NULL,NULL,1,NULL,'2018-10-10 15:24:18',NULL),(17,7,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,NULL,NULL,1,NULL,'2018-10-10 15:24:19',NULL),(18,7,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,NULL,NULL,1,NULL,'2018-10-10 15:24:19',NULL),(19,6,28,1,143,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,NULL,NULL,1,NULL,'2018-10-10 15:32:42',NULL),(20,6,28,4,144,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,NULL,NULL,1,NULL,'2018-10-10 15:32:42',NULL),(21,6,28,68,147,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4','2,4,6',97,6,40,NULL,NULL,1,NULL,'2018-10-10 15:32:42',NULL),(25,3,28,1,143,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,NULL,NULL,1,1,'2018-10-10 15:40:10','2018-10-10 15:40:10'),(26,3,28,4,144,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,NULL,NULL,1,1,'2018-10-10 15:40:10','2018-10-10 15:40:10'),(27,3,28,68,147,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4','2,4,6',97,6,40,NULL,NULL,1,1,'2018-10-10 15:40:10','2018-10-10 15:40:10'),(28,8,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,NULL,NULL,NULL,1,NULL,'2018-10-10 15:50:36'),(29,8,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,NULL,NULL,NULL,1,NULL,'2018-10-10 15:50:36'),(34,10,28,1,143,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,NULL,NULL,1,1,'2018-10-10 15:55:24','2018-10-10 15:56:00'),(35,10,28,4,144,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,NULL,NULL,1,1,'2018-10-10 15:55:24','2018-10-10 15:56:00'),(36,10,28,68,147,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4','2,4,6',97,6,40,NULL,NULL,1,1,'2018-10-10 15:55:24','2018-10-10 15:56:00'),(37,13,0,NULL,NULL,0,'3,4,5,2',0,'2,3','',NULL,NULL,NULL,0,'','','','',0,0,0,NULL,'',0,0,'',NULL,NULL,NULL,'',1,0,'12,4,5,3,4',NULL,97,6,40,NULL,NULL,1,NULL,'2018-10-10 16:57:22',NULL),(38,13,0,NULL,NULL,0,'3,4,5,2',1,'2,3','',NULL,NULL,NULL,0,'','','','',0,0,0,NULL,'',0,0,'',NULL,NULL,NULL,'',0,0,'1,3,2',NULL,99,2,NULL,NULL,NULL,1,NULL,'2018-10-10 16:57:22',NULL),(39,14,0,NULL,NULL,0,'3,4,5,2',0,'2,3','',NULL,NULL,NULL,0,'','','','',0,0,0,NULL,'',0,0,'',NULL,NULL,NULL,'',1,0,'12,4,5,3,4',NULL,97,6,40,NULL,NULL,1,NULL,'2018-10-10 17:02:55',NULL),(40,14,0,NULL,NULL,0,'3,4,5,2',1,'2,3','',NULL,NULL,NULL,0,'','','','',0,0,0,NULL,'',0,0,'',NULL,NULL,NULL,'',0,0,'1,3,2',NULL,99,2,NULL,NULL,NULL,1,NULL,'2018-10-10 17:02:55',NULL),(41,15,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,1,NULL,1,NULL,'2018-10-12 14:24:33',NULL),(42,15,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 14:24:33',NULL),(43,16,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,1,NULL,1,NULL,'2018-10-12 14:25:18',NULL),(44,16,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 14:25:18',NULL),(45,17,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,1,NULL,1,NULL,'2018-10-12 14:26:10',NULL),(46,17,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 14:26:10',NULL),(47,18,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,1,NULL,1,NULL,'2018-10-12 14:26:27',NULL),(48,18,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 14:26:27',NULL),(49,19,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,1,NULL,1,NULL,'2018-10-12 14:27:01',NULL),(50,19,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 14:27:01',NULL),(51,20,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,1,NULL,1,NULL,'2018-10-12 14:27:23',NULL),(52,20,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 14:27:23',NULL),(53,21,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,1,NULL,1,NULL,'2018-10-12 14:30:28',NULL),(54,21,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 14:30:28',NULL),(55,22,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 14:31:28',NULL),(56,22,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 14:31:28',NULL),(57,23,47,4,156,1,'Array',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 16:42:00',NULL),(58,23,47,2,157,1,'Array',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 16:42:00',NULL),(59,24,47,4,156,1,'3,4,5,2',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 16:44:49',NULL),(60,24,47,2,157,1,'3,4,5,2',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 16:44:49',NULL),(61,25,47,4,156,1,NULL,0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 16:46:59',NULL),(62,25,47,2,157,1,NULL,1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 16:46:59',NULL),(63,26,47,4,156,1,'2,4',0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 16:51:32',NULL),(64,26,47,2,157,1,'1,2,4',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 16:51:32',NULL),(65,27,47,4,156,1,NULL,0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 16:52:50',NULL),(66,27,47,2,157,1,'1,2,4',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 16:52:50',NULL),(67,28,47,4,156,1,NULL,0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 17:10:32',NULL),(68,28,47,2,157,1,'1,2,4',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 17:10:32',NULL),(69,29,47,4,156,1,NULL,0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 17:11:02',NULL),(70,29,47,2,157,1,'1,2,4',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 17:11:02',NULL),(71,30,47,4,156,1,NULL,0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 17:15:43',NULL),(72,30,47,2,157,1,'1,2,4',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 17:15:43',NULL),(73,31,47,4,156,1,NULL,0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 17:17:34',NULL),(74,31,47,2,157,1,'1,2,4',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 17:17:34',NULL),(75,32,47,4,156,1,NULL,0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 17:17:49',NULL),(76,32,47,2,157,1,'1,2,4',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 17:17:49',NULL),(77,33,47,4,156,1,NULL,0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 17:26:01',NULL),(78,33,47,2,157,1,'1,2,4',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 17:26:01',NULL),(79,34,47,4,156,1,NULL,0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,3,NULL,1,NULL,'2018-10-12 17:29:22',NULL),(80,34,47,2,157,1,'1,2,4',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 17:29:22',NULL),(81,35,47,4,156,1,NULL,0,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,2,NULL,1,NULL,'2018-10-12 17:30:57',NULL),(82,35,47,2,157,1,'1,2,4',1,'2,3','some note',NULL,NULL,'2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-12 17:30:57',NULL),(91,37,47,4,156,1,NULL,0,'2,3','some note','','','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,2,NULL,1,NULL,'2018-10-14 13:54:24',NULL),(92,37,47,2,157,1,'1,2,4',1,'2,3','some note','','','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,NULL,1,NULL,'2018-10-14 13:54:24',NULL),(95,38,28,1,143,1,NULL,0,'2,3','some note','abc','','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,1,'2018-09-12 00:00:00',1,1,'2018-10-14 13:57:29','2018-10-14 13:58:55'),(96,38,28,4,144,1,NULL,1,'2,3','some note','abc','','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,'2018-09-12 00:00:00',1,1,'2018-10-14 13:57:29','2018-10-14 13:58:55'),(97,38,28,68,147,1,NULL,0,'2,3','some note','abc','','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4','2,4,6',97,6,40,1,'2018-09-12 00:00:00',1,1,'2018-10-14 13:57:29','2018-10-14 13:58:55'),(98,39,47,4,156,1,NULL,0,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,2,'2018-02-20 00:00:00',1,NULL,'2018-10-14 16:15:24',NULL),(99,39,47,2,157,1,'1,2,4',1,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,'2018-02-20 00:00:00',1,NULL,'2018-10-14 16:15:24',NULL),(100,40,47,4,156,1,NULL,0,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',1,2,'12,4,5,3,4','2,4,6',97,6,40,2,'2018-02-20 00:00:00',1,NULL,'2018-10-14 16:16:04',NULL),(101,40,47,2,157,1,'1,2,4',1,'2,3','some note','some internal note','studio note 123','2018-03-09 00:00:00',2,'29.97i','test note 1','1x1','some noe 222',1,1,1,'1,2,5,4','',1,1,'some note',NULL,NULL,'2,1','some note',0,2,'1,3,2','2,4,6',99,2,NULL,1,'2018-02-20 00:00:00',1,NULL,'2018-10-14 16:16:04',NULL);
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
  `request_id` bigint(22) DEFAULT NULL,
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
) ENGINE=MyISAM AUTO_INCREMENT=100 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_spot_version`
--

LOCK TABLES `redi_spot_version` WRITE;
/*!40000 ALTER TABLE `redi_spot_version` DISABLE KEYS */;
INSERT INTO `redi_spot_version` VALUES (1,58,1,NULL,NULL,NULL),(2,55,6,NULL,NULL,NULL),(3,55,1,NULL,NULL,NULL),(4,20,1,NULL,NULL,NULL),(5,2,21,NULL,NULL,NULL),(6,2,1,NULL,NULL,NULL),(7,2,6,NULL,NULL,NULL),(8,2,2,NULL,NULL,NULL),(9,58,3,NULL,NULL,NULL),(10,59,4,NULL,NULL,NULL),(11,59,8,NULL,NULL,NULL),(12,59,3,NULL,NULL,NULL),(13,60,1,NULL,NULL,NULL),(14,69,3,NULL,NULL,NULL),(15,64,2,NULL,NULL,NULL),(16,64,3,NULL,NULL,NULL),(17,64,4,NULL,NULL,NULL),(18,64,5,NULL,NULL,NULL),(19,64,7,NULL,NULL,NULL),(20,71,1,NULL,NULL,NULL),(21,73,1,NULL,NULL,NULL),(22,75,1,NULL,NULL,NULL),(23,75,2,NULL,NULL,NULL),(24,75,3,NULL,NULL,NULL),(25,75,5,NULL,NULL,NULL),(26,4,1,NULL,NULL,NULL),(27,55,4,NULL,NULL,NULL),(28,73,6,NULL,NULL,NULL),(29,73,11,NULL,NULL,NULL),(30,77,1,NULL,NULL,NULL),(31,55,46,NULL,NULL,NULL),(32,55,12,NULL,NULL,NULL),(33,73,48,NULL,NULL,NULL),(34,78,1,2,'Waiting on Brad to approve the first round while the team is continuing to work !!',NULL),(35,78,4,NULL,NULL,NULL),(36,100,1,NULL,NULL,NULL),(37,100,6,NULL,NULL,NULL),(38,97,1,0,'null',NULL),(39,102,53,3,'Test version note of random length',NULL),(40,97,6,2,'some note39',NULL),(41,105,1,NULL,NULL,NULL),(42,108,1,NULL,NULL,NULL),(43,107,1,NULL,NULL,NULL),(44,106,1,NULL,NULL,NULL),(45,107,6,NULL,NULL,NULL),(46,79,1,3,'null',NULL),(47,103,1,9,'Cut an amazing V.1',NULL),(48,110,1,6,'null',NULL),(49,111,1,9,'null',NULL),(50,112,1,4,'null',NULL),(51,113,1,9,'null',NULL),(52,111,54,NULL,NULL,NULL),(53,111,55,NULL,NULL,NULL),(54,112,56,9,'null',NULL),(55,112,57,6,'null',NULL),(56,103,58,NULL,NULL,NULL),(57,110,6,3,'add more monkey',NULL),(58,103,61,NULL,NULL,NULL),(59,103,63,NULL,NULL,NULL),(60,114,1,NULL,NULL,NULL),(61,117,1,NULL,NULL,NULL),(62,118,1,NULL,NULL,NULL),(63,117,66,9,'null',NULL),(64,117,6,NULL,NULL,NULL),(65,117,67,NULL,NULL,NULL),(66,117,68,NULL,NULL,NULL),(67,117,69,NULL,NULL,NULL),(68,117,70,NULL,NULL,NULL),(69,120,1,NULL,NULL,NULL),(70,120,5,NULL,NULL,NULL),(71,120,6,NULL,NULL,NULL),(72,120,75,NULL,NULL,NULL),(73,120,74,NULL,NULL,NULL),(74,120,14,NULL,NULL,NULL),(75,120,11,NULL,NULL,NULL),(76,120,16,NULL,NULL,NULL),(77,120,19,NULL,NULL,NULL),(78,120,21,NULL,NULL,NULL),(79,120,24,NULL,NULL,NULL),(80,120,26,NULL,NULL,NULL),(81,120,36,NULL,NULL,NULL),(82,120,31,NULL,NULL,NULL),(83,121,1,NULL,NULL,NULL),(84,121,4,NULL,NULL,NULL),(85,121,6,NULL,NULL,NULL),(86,121,9,NULL,NULL,NULL),(87,121,10,NULL,NULL,NULL),(88,121,76,NULL,NULL,NULL),(89,121,11,NULL,NULL,NULL),(90,121,16,NULL,NULL,NULL),(91,121,19,NULL,NULL,NULL),(92,121,21,NULL,NULL,NULL),(93,121,24,NULL,NULL,NULL),(94,121,26,NULL,NULL,NULL),(95,121,30,NULL,NULL,NULL),(96,121,31,NULL,NULL,NULL),(97,121,36,0,'null',NULL),(99,94,13,2,'some note39',NULL);
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
INSERT INTO `redi_spot_version_editor` VALUES (3,2),(3,4),(3,5),(4,1),(4,2),(4,3),(40,3),(40,4),(40,5),(40,12),(99,1),(99,2),(99,3);
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
  `activity_id` int(11) DEFAULT NULL,
  `activity_description` text,
  `notes` text,
  `non_billable` smallint(1) DEFAULT NULL COMMENT '0/1',
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=93 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_time_entry`
--

LOCK TABLES `redi_time_entry` WRITE;
/*!40000 ALTER TABLE `redi_time_entry` DISABLE KEYS */;
INSERT INTO `redi_time_entry` VALUES (25,1,NULL,NULL,NULL,'2017-01-12 01:30:00',1.15,4,'','',0,1,'2017-01-12 13:51:23',NULL,NULL,3),(24,47,NULL,NULL,NULL,'2017-01-11 20:45:28',1.00,4,'','',0,47,'2017-01-10 14:59:39',NULL,NULL,1),(23,47,NULL,NULL,NULL,'2017-01-10 20:45:03',1.00,4,'','',0,47,'2017-01-10 14:56:28',NULL,NULL,1),(22,47,NULL,NULL,NULL,'2017-01-10 20:30:13',1.00,22,'','',0,47,'2017-01-10 14:39:30',NULL,NULL,1),(21,47,NULL,NULL,NULL,'2017-01-10 20:30:36',1.00,5,'','',0,47,'2017-01-10 14:38:20',NULL,NULL,1),(19,2,NULL,NULL,NULL,'2017-01-09 11:00:24',1.00,22,'','Here are some lorem ipsum notes',0,47,'2017-01-09 03:32:55',NULL,NULL,3),(20,2,NULL,NULL,NULL,'2017-01-10 14:00:03',8.00,4,'','',0,47,'2017-01-10 14:33:53',NULL,NULL,1),(18,47,149,NULL,5,'2017-01-09 14:00:00',1.30,14,'','Optional notes....',0,47,'2017-01-09 03:05:39',NULL,NULL,1),(26,6,NULL,NULL,NULL,'2017-01-12 01:30:00',1.30,1,'','',0,1,'2017-01-12 13:56:55',NULL,NULL,3),(27,6,NULL,NULL,NULL,'2017-01-13 01:00:02',1.30,4,'','',0,1,'2017-01-12 17:46:14',NULL,NULL,1),(28,7,NULL,NULL,NULL,'2017-01-13 04:45:02',2.15,22,'','',0,1,'2017-01-12 17:54:04',NULL,NULL,1),(29,9,149,2,1,'2017-01-16 06:15:18',1.00,1,'','',0,1,'2017-01-17 06:25:31',NULL,NULL,1),(30,1,NULL,NULL,NULL,'2017-01-16 15:30:18',2.00,21,'','',0,1,'2017-01-20 09:34:08',NULL,NULL,3),(31,1,149,2,1,'2017-01-24 11:00:04',3.00,5,'','Editorial works completed.',0,1,'2017-01-24 12:44:08',NULL,NULL,1),(32,1,NULL,NULL,NULL,'2018-05-03 10:15:26',1.00,3,'','',0,1,'2018-05-03 04:20:58',NULL,NULL,1),(33,1,157,NULL,84,'2018-05-03 14:15:18',1.00,2,'','',0,1,'2018-05-03 17:29:25',NULL,NULL,1),(34,1,156,NULL,79,'2018-05-04 15:15:14',2.30,8,'','did a lot of stuff',0,1,'2018-05-03 18:21:29',NULL,NULL,1),(35,1,NULL,2,1,'2016-04-15 00:00:00',9.00,3,NULL,'some note',0,1,'2018-05-27 21:00:25',NULL,NULL,1),(38,1,156,4,78,'2018-06-05 09:00:00',1.00,3,'test abc',NULL,0,1,'2018-06-05 17:29:14',NULL,NULL,3),(36,1,NULL,2,1,'2018-06-05 00:00:00',9.00,3,NULL,'some note',0,1,'2018-06-05 12:55:13',NULL,NULL,3),(39,1,NULL,NULL,NULL,'2018-06-06 15:00:00',1.00,7,'Sample description lorem ipsum...',NULL,0,1,'2018-06-06 10:05:45',NULL,NULL,3),(40,1,156,NULL,81,'2018-06-04 09:00:00',1.00,2,'Breaking down movie.',NULL,0,1,'2018-06-06 10:31:54',NULL,NULL,5),(41,1,NULL,NULL,NULL,'2018-06-07 12:00:51',8.00,7,'Waiting for John Doe',NULL,0,1,'2018-06-07 07:13:25',NULL,NULL,3),(42,1,NULL,NULL,NULL,'2018-06-07 12:15:54',1.00,7,'Waiting',NULL,0,1,'2018-06-07 07:21:18',NULL,NULL,3),(43,NULL,149,NULL,NULL,'2017-01-05 16:59:14',9.45,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(44,1,NULL,NULL,NULL,'2018-06-06 17:00:00',1.00,35,'',NULL,0,1,'2018-06-07 13:00:36',NULL,NULL,3),(45,1,NULL,NULL,NULL,'2018-06-06 18:00:00',1.00,7,'asd',NULL,0,1,'2018-06-07 13:02:12',NULL,NULL,3),(46,1,NULL,NULL,NULL,'2018-06-06 18:00:00',1.00,37,'',NULL,0,1,'2018-06-07 13:07:30',NULL,NULL,3),(47,1,NULL,NULL,NULL,'2018-06-06 18:00:00',1.00,34,'',NULL,0,1,'2018-06-07 13:12:05',NULL,NULL,3),(48,1,NULL,NULL,NULL,'2018-06-08 13:00:00',0.30,22,'',NULL,0,1,'2018-06-07 17:06:11',NULL,NULL,3),(49,1,NULL,NULL,NULL,'2018-06-06 13:00:00',1.00,36,'waiting on finishing to approve finish',NULL,0,1,'2018-06-07 17:11:11',NULL,NULL,3),(50,1,156,1,78,'2018-06-06 14:00:00',1.30,8,'',NULL,0,1,'2018-06-07 18:53:57',NULL,NULL,3),(51,1,4,NULL,98,'2018-06-08 14:00:00',4.00,32,'',NULL,0,1,'2018-06-07 18:59:45',NULL,NULL,3),(52,1,156,1,78,'2018-06-08 08:00:00',1.00,31,'',NULL,0,1,'2018-06-08 12:41:10',NULL,NULL,3),(54,1,NULL,NULL,NULL,'2018-06-08 08:45:43',1.00,16,'production meeting',NULL,0,1,'2018-06-08 12:57:01',NULL,NULL,3),(56,1,181,NULL,79,'2018-06-15 08:00:00',3.30,2,'',NULL,0,1,'2018-06-15 07:50:06',NULL,NULL,1),(57,1,169,NULL,NULL,'2018-06-15 16:45:58',6.00,2,'',NULL,0,1,'2018-06-15 07:55:11',NULL,NULL,1),(58,1,162,NULL,NULL,'2018-06-08 09:00:00',1.00,8,'',NULL,0,1,'2018-06-15 10:10:50',NULL,NULL,3),(59,1,156,NULL,NULL,'2018-06-14 09:15:00',1.00,32,'',NULL,0,1,'2018-06-15 16:02:36',NULL,NULL,1),(60,1,157,NULL,NULL,'2018-06-08 15:00:00',1.00,2,'',NULL,0,1,'2018-06-15 16:51:32',NULL,NULL,3),(61,1,NULL,NULL,NULL,'2018-06-14 11:30:00',2.30,16,'',NULL,0,1,'2018-06-15 17:03:57',NULL,NULL,1),(62,1,186,NULL,103,'2018-06-20 09:00:26',3.45,32,'',NULL,0,1,'2018-06-20 15:10:35',NULL,NULL,1),(63,6,156,NULL,NULL,'2018-07-06 12:30:00',1.00,1,'omf',NULL,0,6,'2018-07-06 16:38:01',NULL,NULL,1),(64,1,NULL,NULL,NULL,'2018-07-06 14:30:00',1.00,16,'',NULL,0,1,'2018-07-06 17:22:57',NULL,NULL,1),(65,1,182,NULL,NULL,'2018-07-06 14:00:00',1.00,4,'',NULL,0,1,'2018-07-06 18:20:16',NULL,NULL,1),(66,1,NULL,2,1,'2016-04-15 00:00:00',9.00,0,NULL,'some note',0,1,'2018-07-16 15:08:09',NULL,NULL,1),(72,1,156,NULL,83,'2018-07-19 09:00:00',5.30,2,'',NULL,0,1,'2018-07-19 19:24:37',NULL,NULL,1),(75,1,NULL,NULL,NULL,'2018-07-05 10:30:00',2.00,34,'',NULL,0,1,'2018-07-26 14:40:42',NULL,NULL,1),(69,1,NULL,NULL,NULL,'2018-06-19 16:00:00',0.30,22,'null',NULL,0,1,'2018-07-18 00:12:34',NULL,NULL,1),(70,1,NULL,NULL,NULL,'2018-06-19 14:00:00',1.00,22,'null',NULL,0,1,'2018-07-18 00:13:37',NULL,NULL,1),(71,1,NULL,NULL,NULL,'2018-06-15 15:00:00',0.30,22,'null',NULL,0,1,'2018-07-18 00:21:45',NULL,NULL,1),(73,1,NULL,NULL,NULL,'2018-07-19 14:30:00',0.45,22,'',NULL,0,1,'2018-07-19 19:24:52',NULL,NULL,1),(74,1,NULL,NULL,NULL,'2018-07-19 15:15:00',2.45,36,'Waiting for details',NULL,0,1,'2018-07-19 19:30:19',NULL,NULL,1),(76,115,186,NULL,NULL,'2018-07-26 11:00:00',2.00,33,'',NULL,0,115,'2018-07-26 15:21:29',NULL,NULL,1),(77,115,156,NULL,NULL,'2018-07-26 13:00:00',1.00,24,'',NULL,0,115,'2018-07-26 15:22:17',NULL,NULL,1),(78,NULL,163,NULL,NULL,'2017-01-04 16:59:14',4.50,5,NULL,NULL,0,NULL,NULL,NULL,NULL,1),(79,2,163,NULL,NULL,'2017-01-04 16:59:14',4.50,5,NULL,NULL,0,NULL,NULL,NULL,NULL,4),(80,2,163,NULL,NULL,'2017-01-04 16:59:14',4.50,5,NULL,NULL,0,NULL,NULL,NULL,NULL,3),(81,2,163,NULL,NULL,'2017-01-04 16:59:14',4.50,5,NULL,NULL,0,NULL,NULL,NULL,NULL,4),(82,2,163,NULL,NULL,'2017-01-04 16:59:14',4.50,5,NULL,NULL,0,NULL,NULL,NULL,NULL,3),(83,2,163,NULL,NULL,'2017-01-04 16:59:14',4.50,5,NULL,NULL,0,NULL,NULL,NULL,NULL,3),(84,2,163,NULL,NULL,'2017-01-04 16:59:14',4.50,5,NULL,NULL,0,NULL,NULL,NULL,NULL,3),(85,2,163,NULL,NULL,'2017-01-04 16:59:14',4.50,5,NULL,NULL,0,NULL,NULL,NULL,NULL,3),(86,2,163,NULL,NULL,'2017-01-04 16:59:14',4.50,5,NULL,NULL,0,NULL,NULL,NULL,NULL,3),(87,2,163,NULL,NULL,'2017-01-04 16:59:14',4.50,5,NULL,NULL,0,NULL,NULL,NULL,NULL,3),(88,1,149,NULL,NULL,'2017-01-05 16:59:14',9.45,5,'some description to test',NULL,0,NULL,NULL,1,'2018-09-11 13:57:29',4),(89,1,163,NULL,NULL,'2018-01-04 16:59:14',4.50,5,NULL,NULL,0,1,'2018-09-11 15:05:43',NULL,NULL,1),(90,1,163,NULL,NULL,'2018-01-04 16:59:14',4.50,5,'test desc 123',NULL,0,1,'2018-09-11 15:06:05',NULL,NULL,1),(91,1,163,NULL,NULL,'2018-01-04 16:59:14',4.50,5,'test desc 123',NULL,0,1,'2018-09-16 19:06:22',NULL,NULL,1),(92,1,163,NULL,NULL,'2018-01-04 16:59:14',4.50,5,'test desc 123',NULL,0,1,'2018-09-16 19:07:01',NULL,NULL,1);
/*!40000 ALTER TABLE `redi_time_entry` ENABLE KEYS */;
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
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_time_entry_file`
--

LOCK TABLES `redi_time_entry_file` WRITE;
/*!40000 ALTER TABLE `redi_time_entry_file` DISABLE KEYS */;
INSERT INTO `redi_time_entry_file` VALUES (1,35,'test1.jpg','some description 100',199.20),(2,35,'test1.jpg',NULL,921.20),(3,35,'test1.jpg',NULL,1.00),(4,37,'test1.jpg','some description 100',199.20),(5,37,'test1.jpg',NULL,921.20),(6,37,'test1.jpg',NULL,1.00),(7,66,'test1.jpg','some description 100',199.20),(8,66,'test1.jpg',NULL,921.20),(9,66,'test1.jpg',NULL,1.00),(13,80,NULL,NULL,1.00),(14,80,NULL,NULL,1.00),(15,80,NULL,NULL,1.00),(64,90,'test1.jpg','some description 100',23.50),(63,89,'test1.jpg',NULL,1.00),(62,89,'test1.jpg',NULL,921.20),(22,81,NULL,NULL,1.00),(23,81,NULL,NULL,1.00),(24,81,NULL,NULL,1.00),(25,82,NULL,NULL,1.00),(26,82,NULL,NULL,1.00),(27,82,NULL,NULL,1.00),(28,83,NULL,NULL,1.00),(29,83,NULL,NULL,1.00),(30,83,NULL,NULL,1.00),(31,84,NULL,NULL,1.00),(32,84,NULL,NULL,1.00),(33,84,NULL,NULL,1.00),(34,86,'test1.jpg','some description 100',199.20),(35,86,'test1.jpg',NULL,921.20),(36,86,'test1.jpg',NULL,1.00),(37,87,'test10.jpg','some description 100',199.20),(38,87,'test12.jpg',NULL,921.20),(39,87,'test13.jpg',NULL,1.00),(61,89,'test1.jpg','some description 100',23.50),(60,88,'test4.jpg',NULL,NULL),(58,88,'test20.jpg','some description 100',13.20),(59,88,'test3.jpg',NULL,121.20),(51,43,'test400.jpg',NULL,1.00),(50,43,'test3000.jpg',NULL,121.20),(49,43,'test20000.jpg','some description 100',13.20),(65,90,'test1.jpg',NULL,921.20),(66,90,'test1.jpg',NULL,1.00),(67,91,'test1.jpg','some description 100',23.50),(68,91,'test1.jpg',NULL,921.20),(69,91,'test1.jpg',NULL,1.00),(70,92,'test1.jpg','some description 100',23.50),(71,92,'test1.jpg',NULL,921.20),(72,92,'test1.jpg',NULL,1.00);
/*!40000 ALTER TABLE `redi_time_entry_file` ENABLE KEYS */;
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
) ENGINE=MyISAM AUTO_INCREMENT=118 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user`
--

LOCK TABLES `redi_user` WRITE;
/*!40000 ALTER TABLE `redi_user` DISABLE KEYS */;
INSERT INTO `redi_user` VALUES (1,'demo','0d107d09f5bbe40cade3de5c71e9e9b7','demo@indydutch.com','Demo','User','DU','1.png',100,NULL,NULL,NULL,10.00,NULL,NULL,8,'2018-10-16 17:58:56',NULL,1),(2,'AZEIGLER','0d107d09f5bbe40cade3de5c71e9e9b7','ashleyz@buddha-jones.com','ASHLEY','ZEIGLER','AZ',NULL,1,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-16 13:19:37',NULL,1),(3,'KBOTHWELL','0d107d09f5bbe40cade3de5c71e9e9b7','katrinab@buddha-jones.com','KATRINA','BOTHWELL','KB',NULL,1,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(4,'DFRASER','0d107d09f5bbe40cade3de5c71e9e9b7','davidf@buddha-jones.com','DAVID LEITH','FRASER','DF',NULL,2,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(5,'MBACHMAN','0d107d09f5bbe40cade3de5c71e9e9b7','MOLLYB@BUDDHA-JONES.COM','MOLLY','BACHMAN','MB',NULL,3,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(6,'JZAKOSKI','0d107d09f5bbe40cade3de5c71e9e9b7','JAMIEZ@BUDDHA-JONES.COM','JAMIE','ZAKOSKI','JZ',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-06 16:29:06',NULL,1),(7,'MALBORN','0d107d09f5bbe40cade3de5c71e9e9b7','MAXA@BUDDHA-JONES.COM','MAXWELL','ALBORN','MA',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-16 16:13:54',NULL,1),(8,'JSMITH','0d107d09f5bbe40cade3de5c71e9e9b7','TALLYS@BUDDHA-JONES.COM','JUSTINE TALLY','SMITH','JS',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(9,'JDAVIS','0d107d09f5bbe40cade3de5c71e9e9b7','JULIED@BUDDHA-JONES.COM','JULIE','DAVIS','JD',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(10,'JFAGAN','0d107d09f5bbe40cade3de5c71e9e9b7','JOHNF@BUDDHA-JONES.COM','JOHN','FAGAN','JF',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(11,'MBYRNES','0d107d09f5bbe40cade3de5c71e9e9b7','MARIEB@BUDDHA-JONES.COM','MARIE','BYRNES','MB',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(12,'BHILL','0d107d09f5bbe40cade3de5c71e9e9b7','BLAKEH@BUDDHA-JONES.COM','BLAKE','HILL','BH',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(13,'SSISSON','0d107d09f5bbe40cade3de5c71e9e9b7','SOPHIAS@BUDDHA-JONES.COM','SOPHIA','SISSON','SS',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(14,'BSANDEN','0d107d09f5bbe40cade3de5c71e9e9b7','BRITTONYAS@BUDDHA-JONES.COM','BRITTONYA','SANDEN','BS',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(15,'TFANG','0d107d09f5bbe40cade3de5c71e9e9b7','TONYF@BUDDHA-JONES.COM','TONY','FANG','TF',NULL,4,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-27 10:56:35',NULL,1),(16,'TJENG','0d107d09f5bbe40cade3de5c71e9e9b7','TRACYJ@BUDDHA-JONES.COM','TRACY','JENG','TJ',NULL,5,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(17,'GKUSUMA','0d107d09f5bbe40cade3de5c71e9e9b7','gregk@buddha-jones.com','GREGORIUS KENETH','KUSUMA','GK',NULL,5,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(18,'SROBERTSON','0d107d09f5bbe40cade3de5c71e9e9b7','STEVER@BUDDHA-JONES.COM','STEVEN','ROBERTSON','SR',NULL,27,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(19,'ACAPUTO','0d107d09f5bbe40cade3de5c71e9e9b7','ASHLEYC@BUDDHA-JONES.COM','ASHLEY','CAPUTO','AC',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(20,'ABENSON','0d107d09f5bbe40cade3de5c71e9e9b7','angeliqueb@buddha-jones.com','ANGELIQUE','BENSON','AB',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(21,'JPRICE','0d107d09f5bbe40cade3de5c71e9e9b7','JENNIFERP@BUDDHA-JONES.COM','JENNIFER','PRICE','JP',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(22,'AFARBER','0d107d09f5bbe40cade3de5c71e9e9b7','DREWF@BUDDHA-JONES.COM','ANDREW','FARBER','AF',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(23,'ABATES','0d107d09f5bbe40cade3de5c71e9e9b7','ALEXB@BUDDHA-JONES.COM','ALEXANDRA','BATES','AB',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(24,'AGOULET','0d107d09f5bbe40cade3de5c71e9e9b7','ANDREWG@BUDDHA-JONES.COM','ANDREW','GOULET','AG',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-27 13:40:58',NULL,1),(25,'MSAMETH','0d107d09f5bbe40cade3de5c71e9e9b7','MACKS@BUDDHA-JONES.COM','MACKLIN','SAMETH','MS',NULL,6,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-08-05 20:29:28',NULL,1),(26,'JONEIL','0d107d09f5bbe40cade3de5c71e9e9b7','JOHNNYO@BUDDHA-JONES.COM','JOHN','ONEIL','JO',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-27 10:57:19',NULL,1),(27,'CPOWELL','0d107d09f5bbe40cade3de5c71e9e9b7','ericp@buddha-jones.com','CHRISTOPHER ERIC','POWELL','CP',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(28,'DOPPENHEIMER','0d107d09f5bbe40cade3de5c71e9e9b7','DORANO@BUDDHA-JONES.COM','DORAN','OPPENHEIMER','DO',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(29,'SPINTO','0d107d09f5bbe40cade3de5c71e9e9b7','STEVEP@BUDDHA-JONES.COM','STEVEN','PINTO','SP',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(30,'BCOLEMAN','0d107d09f5bbe40cade3de5c71e9e9b7','BRYANC@BUDDHA-JONES.COM','BRYAN','COLEMAN','BC',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(31,'USCHLEGEL','0d107d09f5bbe40cade3de5c71e9e9b7','ROBS@BUDDHA-JONES.COM','ULRICH','SCHLEGEL','US',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(32,'MWINBUSH','0d107d09f5bbe40cade3de5c71e9e9b7','MEKOW@BUDDHA-JONES.COM','MEKO','WINBUSH','MW',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(33,'TRINKENBERGER','0d107d09f5bbe40cade3de5c71e9e9b7','TROYR@BUDDHA-JONES.COM','TROY','RINKENBERGER','TR',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(34,'DTAYLOR','0d107d09f5bbe40cade3de5c71e9e9b7','LYNNT@BUDDHA-JONES.COM','DANIEL','TAYLOR','DT',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-06-04 01:25:48',NULL,1),(35,'MBRODNER','0d107d09f5bbe40cade3de5c71e9e9b7','MIKEB@BUDDHA-JONES.COM','MICHAEL','BRODNER','MB',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(36,'DCREAL','0d107d09f5bbe40cade3de5c71e9e9b7','DAVECREAL@BUDDHA-JONES.COM','DAVID','CREAL','DC',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-26 14:33:36',NULL,1),(37,'KGRIGGS','0d107d09f5bbe40cade3de5c71e9e9b7','KELLIG@BUDDHA-JONES.COM','KELLI','GRIGGS','KG',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(38,'WMASSUNG','0d107d09f5bbe40cade3de5c71e9e9b7','BILLYM@BUDDHA-JONES.COM','WILLIAM','MASSUNG','WM',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(39,'CNORDIGIAN','0d107d09f5bbe40cade3de5c71e9e9b7','CAITLINN@BUDDHA-JONES.COM','CAITLIN','NORDIGIAN','CN',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(40,'JDADON','0d107d09f5bbe40cade3de5c71e9e9b7','jessicad@buddha-jones.com','JESSICA','DADON','JD',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(41,'WNISBETT','0d107d09f5bbe40cade3de5c71e9e9b7','WESLEYN@BUDDHA-JONES.COM','WESLEY','NISBETT','WN',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(42,'MMERENDA','0d107d09f5bbe40cade3de5c71e9e9b7','matthewm@buddha-jones.com','MATTHEW','MERENDA','MM',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(43,'KBROWN','0d107d09f5bbe40cade3de5c71e9e9b7','krisb@buddha-jones.com','KRISTOPHER ROBERT','BROWN','KB',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(44,'JMOSKOW','0d107d09f5bbe40cade3de5c71e9e9b7','jacobm@buddha-jones.com','JACOB LAWRENCE','MOSKOW','JM',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(45,'LGOODALE','0d107d09f5bbe40cade3de5c71e9e9b7','lyleg@buddha-jones.com','LYLE','GOODALE','LG',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(46,'MFERMAN','0d107d09f5bbe40cade3de5c71e9e9b7','michaelf@buddha-jones.com','MICHAEL ALEXANDER','FERMAN','MF',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(47,'RTHOMAS','0d107d09f5bbe40cade3de5c71e9e9b7','RICT@BUDDHA-JONES.COM','RICHARD MICHAEL','THOMAS','RT',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(48,'WNEIL','0d107d09f5bbe40cade3de5c71e9e9b7','BILLN@BUDDHA-JONES.COM','WILLIAM','NEIL','WN',NULL,7,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(49,'JDUPPER','0d107d09f5bbe40cade3de5c71e9e9b7','JORDAND@BUDDHA-JONES.COM','JORDAN','DUPPER','JD',NULL,9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(50,'KBARLOW','0d107d09f5bbe40cade3de5c71e9e9b7','KATIEB@BUDDHA-JONES.COM','KATHERINE','BARLOW','KB',NULL,8,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(51,'SROCHA','0d107d09f5bbe40cade3de5c71e9e9b7','SERGIOR@BUDDHA-JONES.COM','SERGIO','ROCHA','SR',NULL,9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(52,'KNASH','0d107d09f5bbe40cade3de5c71e9e9b7','KEVINN@BUDDHA-JONES.COM','KEVIN','NASH','KN',NULL,9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(53,'BROTH','0d107d09f5bbe40cade3de5c71e9e9b7','BENR@BUDDHA-JONES.COM','BENJAMIN','ROTH','BR',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(54,'JDIAZ','0d107d09f5bbe40cade3de5c71e9e9b7','JOHND@BUDDHA-JONES.COM','JOHN','DIAZ','JD',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(55,'CMYERS','0d107d09f5bbe40cade3de5c71e9e9b7','christopherm@buddha-jones.com','CHRISTOPHER KYLO','MYERS','CM',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(56,'KSTOKES','0d107d09f5bbe40cade3de5c71e9e9b7','kelseys@buddha-jones.com','KELSEY ELISE','STOKES','KS',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(57,'ABARRAZA','0d107d09f5bbe40cade3de5c71e9e9b7','ALFREDOB@BUDDHA-JONES.COM','ALFREDO','BARRAZA','AB',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(58,'MNAZAR','0d107d09f5bbe40cade3de5c71e9e9b7','mohamedn@buddha-jones.com','MOHAMED RAED','NAZAR','MN',NULL,10,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(59,'SCARSON','0d107d09f5bbe40cade3de5c71e9e9b7','CARSON@BUDDHA-JONES.COM','SCOTT','CARSON','SC',NULL,11,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(60,'MYOON','0d107d09f5bbe40cade3de5c71e9e9b7','megany@buddha-jones.com','MEGAN LAUREN','YOON','MY',NULL,13,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(61,'KABIGAIL','0d107d09f5bbe40cade3de5c71e9e9b7','KATELYNNA@BUDDHA-JONES.COM','KATHERINE','ABIGAIL','KA',NULL,13,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(62,'MCOX','0d107d09f5bbe40cade3de5c71e9e9b7','maryc@buddha-jones.com','MARY ELIZABETH','COX','MC',NULL,13,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(63,'BROY','0d107d09f5bbe40cade3de5c71e9e9b7','BETHR@BUDDHA-JONES.COM','BETH','ROY','BR',NULL,14,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(64,'BBERLING','0d107d09f5bbe40cade3de5c71e9e9b7','BRADB@BUDDHA-JONES.COM','BRADFORD','BERLING','BB',NULL,14,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-26 14:47:20',NULL,1),(65,'HSHIBANO','0d107d09f5bbe40cade3de5c71e9e9b7','HARUMIS@BUDDHA-JONES.COM','HARUMI','SHIBANO','HS',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(66,'BSALZANO','0d107d09f5bbe40cade3de5c71e9e9b7','bobs@buddha-jones.com','BOBBY','SALZANO','BS',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(67,'KPANG','0d107d09f5bbe40cade3de5c71e9e9b7','KEITHP@BUDDHA-JONES.COM','KEITH','PANG','KP',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-06-04 18:38:20',NULL,1),(68,'RCASTRO','0d107d09f5bbe40cade3de5c71e9e9b7','RICARDOC@BUDDHA-JONES.COM','RICARDO','CASTRO','RC',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(69,'HFORSSTROM','0d107d09f5bbe40cade3de5c71e9e9b7','HALF@BUDDHA-JONES.COM','HEINO','FORSSTROM','HF',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(70,'JREYES','0d107d09f5bbe40cade3de5c71e9e9b7','JONATHANR@BUDDHA-JONES.COM','JONATHAN','REYES','JR',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(71,'DMEALER','0d107d09f5bbe40cade3de5c71e9e9b7','DAVEM@BUDDHA-JONES.COM','DAVE','MEALER','DM',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(72,'BVANCE','0d107d09f5bbe40cade3de5c71e9e9b7','BENV@BUDDHA-JONES.COM','BENJAMIN','VANCE','BV',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(73,'DCHENETTE','0d107d09f5bbe40cade3de5c71e9e9b7','DAWNC@BUDDHA-JONES.COM','DAWN','CHENETTE','DC',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(74,'SWERBER','0d107d09f5bbe40cade3de5c71e9e9b7','sarahw@buddha-jones.com','SARAH SHAE HALAS','WERBER','SW',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(75,'DTSAI','0d107d09f5bbe40cade3de5c71e9e9b7','davidtsai@buddha-jones.com','DAVID','TSAI','DT',NULL,12,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(76,'RFLORES','0d107d09f5bbe40cade3de5c71e9e9b7','REBECCAF@BUDDHA-JONES.COM','REBECCA','FLORES','RF',NULL,15,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(77,'MPOCOCK','0d107d09f5bbe40cade3de5c71e9e9b7','mayap@buddha-jones.com','MAYA','POCOCK','MP',NULL,15,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(78,'CPAYNE','0d107d09f5bbe40cade3de5c71e9e9b7','CRYSTALP@BUDDHA-JONES.COM','CRYSTAL','PAYNE','CP',NULL,16,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(79,'JWALKER','0d107d09f5bbe40cade3de5c71e9e9b7','JACOBW@BUDDHA-JONES.COM','JACOB','WALKER','JW',NULL,16,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(80,'CCASE','0d107d09f5bbe40cade3de5c71e9e9b7','CHRISTIANC@BUDDHA-JONES.COM','CHRISTIAN','CASE','CC',NULL,17,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(81,'DLINDBLAD','0d107d09f5bbe40cade3de5c71e9e9b7','DAVELINDBLAD@BUDDHA-JONES.COM','DAVID','LINDBLAD','DL',NULL,18,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(82,'GSMITH','0d107d09f5bbe40cade3de5c71e9e9b7','gregs@buddha-jones.com','GREGORY','SMITH','GS',NULL,18,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(83,'MBARBOUR','0d107d09f5bbe40cade3de5c71e9e9b7','MEGANB@BUDDHA-JONES.COM','MEGAN','BARBOUR','MB',NULL,18,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(84,'PHASTY','0d107d09f5bbe40cade3de5c71e9e9b7','PETEH@BUDDHA-JONES.COM','PETER','HASTY','PH',NULL,19,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(85,'JLONG','0d107d09f5bbe40cade3de5c71e9e9b7','john@buddha-jones.com','JOHN','LONG','JL',NULL,20,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(86,'DASMA','0d107d09f5bbe40cade3de5c71e9e9b7','dan@buddha-jones.com','DANIEL','ASMA','DA',NULL,28,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(87,'JGODFREY','0d107d09f5bbe40cade3de5c71e9e9b7','jordang@buddha-jones.com','JORDAN MICHAEL','GODFREY','JG',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(88,'TSIMPSON','0d107d09f5bbe40cade3de5c71e9e9b7','tizs@buddha-jones.com','TIZIANA GRACE','SIMPSON','TS',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(89,'KKATAMBWA','0d107d09f5bbe40cade3de5c71e9e9b7','KAZADIK@BUDDHA-JONES.COM','KAZADI','KATAMBWA','KK',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(90,'EFILLIOS','0d107d09f5bbe40cade3de5c71e9e9b7','EUGENEF@BUDDHA-JONES.COM','EUGENE','FILLIOS','EF',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(91,'RONDARZA','0d107d09f5bbe40cade3de5c71e9e9b7','ROBO@BUDDHA-JONES.COM','ROBERT','ONDARZA','RO',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(92,'AARMENISE','0d107d09f5bbe40cade3de5c71e9e9b7','ANTHONYA@BUDDHA-JONES.COM','ANTHONY','ARMENISE','AA',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(93,'JROGERS','0d107d09f5bbe40cade3de5c71e9e9b7','JOSHUAR@BUDDHA-JONES.COM','JOSHUA','ROGERS','JR',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(94,'JFINCH','0d107d09f5bbe40cade3de5c71e9e9b7','JENNIF@BUDDHA-JONES.COM','JENNIFER','FINCH','JF',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(95,'KOPPENHEIMER','0d107d09f5bbe40cade3de5c71e9e9b7','KRYSTLE@BUDDHA-JONES.COM','KRYSTLE','OPPENHEIMER','KO',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-05-23 12:35:25',NULL,1),(96,'DLIGORNER','0d107d09f5bbe40cade3de5c71e9e9b7','DAVEL@BUDDHA-JONES.COM','DAVID','LIGORNER','DL',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(97,'MLAFONTANT','0d107d09f5bbe40cade3de5c71e9e9b7','MARK.LAFONTANT@BUDDHA-JONES.COM','MARK','LAFONTANT','ML',NULL,21,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(98,'MKELLEY','0d107d09f5bbe40cade3de5c71e9e9b7','MATTHEWK@BUDDHA-JONES.COM','MATTHEW','KELLEY','MK',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(99,'SCASTLE','0d107d09f5bbe40cade3de5c71e9e9b7','shainac@buddha-jones.com','SHAINA PAGE','CASTLE','SC',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(100,'BCURTIS','0d107d09f5bbe40cade3de5c71e9e9b7','brettc@buddha-jones.com','BRETT ALEXANDER','CURTIS','BC',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(101,'EDELK','0d107d09f5bbe40cade3de5c71e9e9b7','emilyd@buddha-jones.com','EMILY COLETTE','DELK','ED',NULL,22,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(102,'ESINGLETON','0d107d09f5bbe40cade3de5c71e9e9b7','lizs@buddha-jones.com','ELIZABETH SHANNON','SINGLETON','ES',NULL,23,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(103,'ECORRADO','0d107d09f5bbe40cade3de5c71e9e9b7','EDC@BUDDHA-JONES.COM','EDUARDO','CORRADO','EC',NULL,9,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(104,'JRANDALL','0d107d09f5bbe40cade3de5c71e9e9b7','JOER@BUDDHA-JONES.COM','JOSEPH','RANDALL','JR',NULL,23,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(105,'PHENNESSY','0d107d09f5bbe40cade3de5c71e9e9b7','paulh@buddha-jones.com','PAUL TIMOTHY','HENNESSY','PH',NULL,23,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(106,'MORTIZ','0d107d09f5bbe40cade3de5c71e9e9b7','MONIKAO@BUDDHA-JONES.COM','MONIKA','ORTIZ','MO',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(107,'MCAUICH','0d107d09f5bbe40cade3de5c71e9e9b7','monicac@buddha-jones.com','MONICA MARIE','CAUICH','MC',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(108,'CADALID','0d107d09f5bbe40cade3de5c71e9e9b7','CHRISTINEA@BUDDHA-JONES.COM','CHRISTINE','ADALID','CA',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(109,'LCERVANTES','0d107d09f5bbe40cade3de5c71e9e9b7','LAURAC@BUDDHA-JONES.COM','LAURA','CERVANTES','LC',NULL,24,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-06 17:13:14',NULL,1),(110,'PLONG','0d107d09f5bbe40cade3de5c71e9e9b7','pharida@buddha-jones.com','PHARIDA','LONG','PL',NULL,25,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(111,'MLIPSKY','0d107d09f5bbe40cade3de5c71e9e9b7','MARKL@BUDDHA-JONES.COM','MARK','LIPSKY','ML',NULL,25,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(112,'MMILLER','0d107d09f5bbe40cade3de5c71e9e9b7','MARINAM@BUDDHA-JONES.COM','MARINA','MILLER','MM',NULL,100,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(113,'WHENES','0d107d09f5bbe40cade3de5c71e9e9b7','ALEXH@BUDDHA-JONES.COM','WILLIAM','HENES','WH',NULL,26,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(114,'NSHEPTAK','0d107d09f5bbe40cade3de5c71e9e9b7','NICKS@BUDDHA-JONES.COM','NICHOLAS','SHEPTAK','NS',NULL,26,NULL,NULL,NULL,10.00,NULL,NULL,NULL,NULL,NULL,1),(115,'VAMES','0d107d09f5bbe40cade3de5c71e9e9b7','VALERIEA@BUDDHA-JONES.COM','VALERIE','AMES','VA',NULL,26,NULL,NULL,NULL,10.00,NULL,NULL,NULL,'2018-07-26 15:09:10',NULL,1),(116,'webhkp1127','0d107d09f5bbe40cade3de5c71e9e9b7','webhkp1217@gmail.com','first','last',NULL,'116.jpeg',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-16 15:24:17',1),(117,'webhkp11273','0d107d09f5bbe40cade3de5c71e9e9b7','webhkp11889@gmail.com','firsttt','last',NULL,'117.jpeg',2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-16 16:05:40',1);
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
INSERT INTO `redi_user_type_class` VALUES (4,'C'),(4,'E'),(6,'C'),(7,'C'),(7,'E'),(8,'E'),(12,'C'),(12,'G'),(13,'C'),(13,'G'),(14,'C'),(14,'G'),(20,'C'),(21,'B'),(21,'C'),(28,'B');
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
INSERT INTO `redi_user_type_project_permission` VALUES (1,1,1,0),(1,2,1,0),(1,3,1,0),(1,4,1,0),(1,5,1,0),(1,6,1,0),(1,7,1,0),(1,8,1,0),(1,9,1,0),(1,10,1,0),(1,11,1,0),(1,12,1,0),(1,13,1,0),(1,14,1,0),(1,15,1,0),(1,17,1,0),(1,18,1,0),(1,19,1,0),(1,20,1,0),(1,21,1,0),(1,22,1,0),(1,23,1,0),(1,24,1,0),(1,25,1,0),(1,26,1,0),(1,27,1,0),(1,28,1,0),(1,29,1,1),(1,30,1,1),(1,31,1,0),(1,100,1,0),(1,200,1,1),(2,1,0,0),(2,2,0,0),(2,3,0,0),(2,5,0,0),(2,6,1,0),(2,10,1,0),(2,11,0,0),(2,12,0,0),(2,13,1,0),(2,14,0,0),(2,15,0,0),(2,17,0,0),(2,18,0,0),(2,19,0,0),(2,20,0,0),(2,21,0,0),(2,22,0,0),(2,23,0,0),(2,24,0,0),(2,25,0,0),(2,26,0,0),(2,29,1,1),(2,30,1,1),(3,1,1,0),(3,2,1,0),(3,3,1,0),(3,5,1,0),(3,6,1,0),(3,10,1,0),(3,11,0,0),(3,12,0,0),(3,13,1,0),(3,14,0,0),(3,15,0,0),(3,17,1,0),(3,18,0,0),(3,19,0,0),(3,20,0,0),(3,21,0,0),(3,22,1,0),(3,23,0,0),(3,24,0,0),(3,25,0,0),(3,26,1,0),(3,29,1,1),(3,30,1,1),(3,200,1,1),(4,1,1,0),(4,2,1,0),(4,3,1,0),(4,5,1,0),(4,6,1,0),(4,10,1,0),(4,11,0,0),(4,12,0,0),(4,13,1,0),(4,14,0,0),(4,15,0,0),(4,17,1,0),(4,18,0,0),(4,19,0,0),(4,20,0,0),(4,21,0,0),(4,22,1,0),(4,23,0,0),(4,24,0,0),(4,25,0,0),(4,26,1,0),(4,29,1,1),(4,30,1,1),(4,200,1,1),(5,1,1,1),(5,2,1,1),(5,3,1,1),(5,5,1,1),(5,6,1,1),(5,10,1,1),(5,11,1,1),(5,12,1,0),(5,13,1,1),(5,14,1,0),(5,15,1,0),(5,17,1,1),(5,18,1,1),(5,19,1,1),(5,20,1,1),(5,21,1,1),(5,22,1,1),(5,23,1,1),(5,24,1,1),(5,25,1,1),(5,26,1,1),(5,29,1,1),(5,30,1,1),(6,1,1,1),(6,2,1,1),(6,3,1,1),(6,5,1,1),(6,6,1,1),(6,10,1,1),(6,11,1,1),(6,12,1,1),(6,13,1,0),(6,14,1,1),(6,15,1,1),(6,17,1,1),(6,18,1,1),(6,19,1,1),(6,20,1,0),(6,21,1,0),(6,22,1,1),(6,23,1,1),(6,24,1,1),(6,25,1,1),(6,26,1,1),(6,29,1,1),(6,30,1,1),(7,1,1,0),(7,2,1,0),(7,3,1,0),(7,5,1,0),(7,6,1,0),(7,10,1,0),(7,11,0,0),(7,12,0,0),(7,13,1,0),(7,14,0,0),(7,15,0,0),(7,17,1,0),(7,18,0,0),(7,19,0,0),(7,20,0,0),(7,21,0,0),(7,22,1,0),(7,23,0,0),(7,24,0,0),(7,25,0,0),(7,26,1,0),(7,29,1,1),(7,30,1,1),(8,1,1,1),(8,2,1,1),(8,3,1,1),(8,5,1,1),(8,6,1,1),(8,10,1,1),(8,11,0,0),(8,12,1,1),(8,13,1,1),(8,14,1,0),(8,15,1,1),(8,17,1,1),(8,18,0,0),(8,19,0,0),(8,20,0,0),(8,21,0,0),(8,22,1,1),(8,23,0,0),(8,24,1,1),(8,25,1,1),(8,26,1,1),(8,29,1,1),(8,30,1,1),(9,1,1,0),(9,2,1,0),(9,3,1,0),(9,5,1,0),(9,6,1,0),(9,10,1,0),(9,11,0,0),(9,12,0,0),(9,13,1,0),(9,14,0,0),(9,15,0,0),(9,17,1,0),(9,18,0,0),(9,19,0,0),(9,20,0,0),(9,21,0,0),(9,22,1,0),(9,23,0,0),(9,24,0,0),(9,25,0,0),(9,26,1,0),(9,29,1,1),(9,30,1,1),(9,200,1,1),(10,1,1,0),(10,2,1,0),(10,3,1,0),(10,5,1,0),(10,6,1,0),(10,10,1,0),(10,11,0,0),(10,12,0,0),(10,13,1,0),(10,14,0,0),(10,15,0,0),(10,17,1,0),(10,18,0,0),(10,19,0,0),(10,20,0,0),(10,21,0,0),(10,22,1,0),(10,23,0,0),(10,24,0,0),(10,25,0,0),(10,26,1,0),(10,29,1,1),(10,30,1,1),(11,1,1,1),(11,2,1,1),(11,3,1,1),(11,5,1,1),(11,6,1,1),(11,10,1,1),(11,11,1,1),(11,12,0,0),(11,13,1,0),(11,14,0,0),(11,15,0,0),(11,17,1,1),(11,18,1,1),(11,19,1,1),(11,20,0,0),(11,21,0,0),(11,22,1,1),(11,23,1,1),(11,24,0,0),(11,25,0,0),(11,26,1,1),(11,29,1,1),(11,30,1,1),(12,1,1,0),(12,2,1,0),(12,3,1,0),(12,5,1,0),(12,6,1,0),(12,10,1,0),(12,11,0,0),(12,12,0,0),(12,13,1,0),(12,14,0,0),(12,15,0,0),(12,17,1,0),(12,18,0,0),(12,19,0,0),(12,20,0,0),(12,21,0,0),(12,22,1,0),(12,23,0,0),(12,24,0,0),(12,25,0,0),(12,26,1,0),(12,29,1,1),(12,30,1,1),(13,1,1,1),(13,2,1,1),(13,3,1,1),(13,5,1,1),(13,6,1,1),(13,10,1,1),(13,11,0,0),(13,12,0,0),(13,13,1,1),(13,14,0,0),(13,15,0,0),(13,17,1,1),(13,18,0,0),(13,19,0,0),(13,20,0,0),(13,21,0,0),(13,22,1,1),(13,23,0,0),(13,24,1,0),(13,25,0,0),(13,26,1,1),(13,29,1,1),(13,30,1,1),(14,1,1,1),(14,2,1,1),(14,3,1,1),(14,5,1,1),(14,6,1,1),(14,10,1,1),(14,11,1,1),(14,12,0,0),(14,13,1,1),(14,14,0,0),(14,15,0,0),(14,17,1,1),(14,18,1,1),(14,19,1,1),(14,20,0,0),(14,21,0,0),(14,22,1,1),(14,23,1,1),(14,24,1,1),(14,25,1,1),(14,26,1,1),(14,29,1,1),(14,30,1,1),(15,1,1,0),(15,2,1,0),(15,3,1,0),(15,5,1,0),(15,6,1,0),(15,10,1,0),(15,11,0,0),(15,12,0,0),(15,13,1,0),(15,14,0,0),(15,15,0,0),(15,17,1,0),(15,18,0,0),(15,19,0,0),(15,20,0,0),(15,21,0,0),(15,22,1,0),(15,23,0,0),(15,24,0,0),(15,25,0,0),(15,26,1,0),(15,29,1,1),(15,30,1,1),(16,1,1,0),(16,2,1,0),(16,3,1,0),(16,5,1,0),(16,6,1,0),(16,10,1,0),(16,11,0,0),(16,12,0,0),(16,13,1,0),(16,14,0,0),(16,15,0,0),(16,17,1,0),(16,18,0,0),(16,19,0,0),(16,20,0,0),(16,21,0,0),(16,22,1,0),(16,23,0,0),(16,24,0,0),(16,25,0,0),(16,26,1,0),(16,29,1,1),(16,30,1,1),(17,1,1,0),(17,2,1,0),(17,3,1,0),(17,5,1,0),(17,6,1,0),(17,10,1,0),(17,11,0,0),(17,12,0,0),(17,13,1,0),(17,14,0,0),(17,15,0,0),(17,17,1,0),(17,18,0,0),(17,19,0,0),(17,20,0,0),(17,21,0,0),(17,22,1,0),(17,23,0,0),(17,24,0,0),(17,25,0,0),(17,26,1,0),(17,29,1,1),(17,30,1,1),(18,1,1,0),(18,2,1,0),(18,3,1,0),(18,5,1,0),(18,6,1,0),(18,10,1,0),(18,11,0,0),(18,12,0,0),(18,13,1,0),(18,14,0,0),(18,15,1,1),(18,17,1,0),(18,18,0,0),(18,19,0,0),(18,20,0,0),(18,21,0,0),(18,22,1,0),(18,23,0,0),(18,24,0,0),(18,25,0,0),(18,26,1,0),(18,29,1,1),(18,30,1,1),(18,200,1,1),(19,1,1,0),(19,2,1,0),(19,3,1,0),(19,5,1,0),(19,6,1,0),(19,10,1,0),(19,11,0,0),(19,12,0,0),(19,13,1,0),(19,14,0,0),(19,15,1,1),(19,17,1,0),(19,18,0,0),(19,19,0,0),(19,20,0,0),(19,21,0,0),(19,22,1,0),(19,23,0,0),(19,24,0,0),(19,25,0,0),(19,26,1,0),(19,29,1,1),(19,30,1,1),(19,200,1,1),(20,1,1,0),(20,2,1,0),(20,3,1,0),(20,5,1,0),(20,6,1,0),(20,10,1,0),(20,11,0,0),(20,12,0,0),(20,13,1,0),(20,14,0,0),(20,15,0,0),(20,17,1,0),(20,18,1,0),(20,19,1,0),(20,20,0,0),(20,21,0,0),(20,22,1,0),(20,23,1,0),(20,24,0,0),(20,25,0,0),(20,26,1,0),(20,29,1,1),(20,30,1,1),(21,1,1,1),(21,2,1,1),(21,3,1,1),(21,5,1,1),(21,6,1,1),(21,10,1,1),(21,11,1,1),(21,12,1,1),(21,13,1,0),(21,14,1,1),(21,15,1,1),(21,17,1,1),(21,18,1,1),(21,19,1,1),(21,20,1,0),(21,21,1,0),(21,22,1,1),(21,23,1,1),(21,24,1,1),(21,25,1,1),(21,26,1,1),(21,29,1,1),(21,30,1,1),(22,1,0,0),(22,2,0,0),(22,3,0,0),(22,5,0,0),(22,6,0,0),(22,10,0,0),(22,11,0,0),(22,12,0,0),(22,13,0,0),(22,14,0,0),(22,15,0,0),(22,17,0,0),(22,18,0,0),(22,19,0,0),(22,20,0,0),(22,21,0,0),(22,22,0,0),(22,23,0,0),(22,24,0,0),(22,25,0,0),(22,26,0,0),(22,29,1,1),(22,30,1,1),(23,1,1,0),(23,2,1,0),(23,3,1,0),(23,5,1,0),(23,6,1,0),(23,10,1,0),(23,11,0,0),(23,12,0,0),(23,13,1,0),(23,14,0,0),(23,15,0,0),(23,17,1,0),(23,18,0,0),(23,19,0,0),(23,20,0,0),(23,21,0,0),(23,22,1,0),(23,23,0,0),(23,24,0,0),(23,25,0,0),(23,26,1,0),(23,29,1,1),(23,30,1,1),(24,1,1,1),(24,2,1,1),(24,3,1,1),(24,5,1,1),(24,6,1,1),(24,10,1,1),(24,11,1,1),(24,12,1,1),(24,13,1,1),(24,14,1,1),(24,15,1,1),(24,17,1,1),(24,18,1,1),(24,19,1,1),(24,20,1,1),(24,21,1,1),(24,22,1,1),(24,23,1,1),(24,24,1,1),(24,25,1,1),(24,26,1,1),(24,29,1,1),(24,30,1,1),(25,1,1,1),(25,2,1,1),(25,3,1,1),(25,5,1,1),(25,6,1,0),(25,10,1,0),(25,11,0,0),(25,12,1,0),(25,13,1,0),(25,14,1,0),(25,15,1,0),(25,17,1,1),(25,18,1,1),(25,19,1,1),(25,20,1,1),(25,21,1,1),(25,22,1,1),(25,23,1,1),(25,24,1,0),(25,25,1,0),(25,26,1,1),(25,29,1,1),(25,30,1,1),(26,1,1,0),(26,2,1,0),(26,3,1,0),(26,5,1,0),(26,6,1,0),(26,10,1,0),(26,11,0,0),(26,12,0,0),(26,13,1,0),(26,14,1,1),(26,15,0,0),(26,17,1,0),(26,18,0,0),(26,19,0,0),(26,20,0,0),(26,21,0,0),(26,22,1,0),(26,23,0,0),(26,24,0,0),(26,25,0,0),(26,26,1,0),(26,29,1,1),(26,30,1,1),(26,200,1,1),(27,1,1,0),(27,2,1,0),(27,3,1,0),(27,5,1,0),(27,6,1,0),(27,10,1,0),(27,11,0,0),(27,12,0,0),(27,13,1,0),(27,14,1,1),(27,15,0,0),(27,17,1,0),(27,18,0,0),(27,19,0,0),(27,20,0,0),(27,21,0,0),(27,22,1,0),(27,23,0,0),(27,24,0,0),(27,25,0,0),(27,26,1,0),(27,29,1,1),(27,30,1,1),(28,29,1,1),(28,30,1,1),(100,1,1,1),(100,2,1,1),(100,3,1,1),(100,4,1,1),(100,5,1,1),(100,6,1,1),(100,7,1,1),(100,8,1,1),(100,9,1,1),(100,10,1,1),(100,11,1,1),(100,12,1,1),(100,13,1,1),(100,14,1,1),(100,15,1,1),(100,16,1,1),(100,17,1,1),(100,18,1,1),(100,19,1,1),(100,20,1,1),(100,21,1,1),(100,22,1,1),(100,23,1,1),(100,24,1,1),(100,25,1,1),(100,26,1,1),(100,27,1,1),(100,28,1,1),(100,29,1,1),(100,30,1,1),(100,31,1,1),(100,100,1,1),(100,200,1,1);
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
INSERT INTO `redi_user_type_time_approval_permission` VALUES (2,1),(2,22),(3,4),(3,9),(3,10),(5,6),(5,21),(8,7),(8,26),(11,10),(13,12),(14,12),(15,1),(15,22),(19,18),(24,6),(24,21),(100,1),(100,4),(100,6),(100,7),(100,9),(100,10),(100,12),(100,18),(100,21),(100,22),(100,23),(100,26);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_user_type_time_entry_permission`
--

LOCK TABLES `redi_user_type_time_entry_permission` WRITE;
/*!40000 ALTER TABLE `redi_user_type_time_entry_permission` DISABLE KEYS */;
INSERT INTO `redi_user_type_time_entry_permission` VALUES (1,2),(2,8),(3,11),(4,15),(5,16),(6,17),(7,25);
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
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_version`
--

LOCK TABLES `redi_version` WRITE;
/*!40000 ALTER TABLE `redi_version` DISABLE KEYS */;
INSERT INTO `redi_version` VALUES (1,'1',1,0,1,NULL,NULL,NULL,NULL),(2,'1A',2,0,1,NULL,NULL,NULL,NULL),(3,'1B',3,0,1,NULL,NULL,NULL,NULL),(4,'1Alt',4,0,1,NULL,NULL,NULL,NULL),(5,'1Rev',5,0,1,NULL,NULL,NULL,NULL),(6,'2',6,0,1,NULL,NULL,NULL,NULL),(7,'2A',7,0,1,NULL,NULL,NULL,NULL),(8,'2B',8,0,1,NULL,NULL,NULL,NULL),(9,'2Alt',9,0,1,NULL,NULL,NULL,NULL),(10,'2Rev',10,0,1,NULL,NULL,NULL,NULL),(11,'3',11,0,1,NULL,NULL,NULL,NULL),(12,'3A',12,0,1,NULL,NULL,NULL,NULL),(13,'3B',13,0,1,NULL,NULL,NULL,NULL),(14,'3Alt',14,0,1,NULL,NULL,NULL,NULL),(15,'3Rev',15,0,1,NULL,NULL,NULL,NULL),(16,'4',16,0,1,NULL,NULL,NULL,NULL),(17,'4A',17,0,1,NULL,NULL,NULL,NULL),(18,'4B',18,0,1,NULL,NULL,NULL,NULL),(19,'4Alt',19,0,1,NULL,NULL,NULL,NULL),(20,'4Rev',20,0,1,NULL,NULL,NULL,NULL),(21,'5',21,0,1,NULL,NULL,NULL,NULL),(22,'5A',22,0,1,NULL,NULL,NULL,NULL),(23,'5B',23,0,1,NULL,NULL,NULL,NULL),(24,'5Alt',24,0,1,NULL,NULL,NULL,NULL),(25,'5Rev',25,0,1,NULL,NULL,NULL,NULL),(26,'6',26,0,1,NULL,NULL,NULL,NULL),(27,'6A',27,0,1,NULL,NULL,NULL,NULL),(28,'6B',28,0,1,NULL,NULL,NULL,NULL),(29,'6Alt',29,0,1,NULL,NULL,NULL,NULL),(30,'6Rev',30,0,1,NULL,NULL,NULL,NULL),(31,'7',31,0,1,NULL,NULL,NULL,NULL),(32,'7A',32,0,1,NULL,NULL,NULL,NULL),(33,'7B',33,0,1,NULL,NULL,NULL,NULL),(34,'7Alt',34,0,1,NULL,NULL,NULL,NULL),(35,'7Rev',35,0,1,NULL,NULL,NULL,NULL),(36,'8',36,0,1,NULL,NULL,NULL,NULL),(37,'8A',37,0,1,NULL,NULL,NULL,NULL),(38,'8B',38,0,1,NULL,NULL,NULL,NULL),(39,'8Alt',39,0,1,NULL,NULL,NULL,NULL),(40,'8Rev',40,0,1,NULL,NULL,NULL,NULL),(41,'9',41,0,1,NULL,NULL,NULL,NULL),(42,'9A',42,0,1,NULL,NULL,NULL,NULL),(43,'9B',43,0,1,NULL,NULL,NULL,NULL),(44,'9Alt',44,0,1,NULL,NULL,NULL,NULL),(45,'9Rev',45,0,1,NULL,NULL,NULL,NULL),(46,'10',46,0,1,NULL,NULL,NULL,NULL),(47,'10A',47,0,1,NULL,NULL,NULL,NULL),(48,'10B',48,0,1,NULL,NULL,NULL,NULL),(49,'10Alt',49,0,1,NULL,NULL,NULL,NULL),(50,'10Rev',50,0,1,NULL,NULL,NULL,NULL),(54,'1ARev',NULL,1,1,1,'2018-06-26 14:05:07',NULL,NULL),(53,'1Test',NULL,1,1,1,'2018-06-20 06:34:32',NULL,NULL),(55,'1BRev',NULL,1,1,1,'2018-06-26 14:05:30',NULL,NULL),(56,'2Rev',NULL,1,1,1,'2018-06-26 14:06:36',NULL,NULL),(57,'2ARev',NULL,1,1,1,'2018-06-26 14:07:18',NULL,NULL),(58,'21A',NULL,1,1,1,'2018-06-26 16:20:35',NULL,NULL),(59,'49A',NULL,1,1,1,'2018-06-29 09:36:13',NULL,NULL),(60,'11B',NULL,1,1,1,'2018-06-29 09:38:47',NULL,NULL),(61,'20B',NULL,1,1,1,'2018-06-29 10:55:22',NULL,NULL),(62,'20A',NULL,1,1,1,'2018-06-29 11:53:34',NULL,NULL),(63,'21C',NULL,1,1,1,'2018-06-29 12:07:06',NULL,NULL),(64,'2Aalt',NULL,1,1,1,'2018-07-24 18:52:55',NULL,NULL),(65,'2AAlt',NULL,1,1,1,'2018-07-24 18:53:06',NULL,NULL),(66,'2alt',NULL,1,1,1,'2018-07-24 18:53:20',NULL,NULL),(67,'2ARev2',NULL,1,1,1,'2018-07-24 18:54:31',NULL,NULL),(68,'2ARev3',NULL,1,1,1,'2018-07-24 18:54:56',NULL,NULL),(69,'2ARev4',NULL,1,1,1,'2018-07-24 18:55:16',NULL,NULL),(70,'3ARev2',NULL,1,1,1,'2018-07-24 19:00:42',NULL,NULL),(71,'2altrev',NULL,1,1,1,'2018-07-26 16:56:02',NULL,NULL),(72,'6rev',NULL,1,1,1,'2018-07-26 16:57:15',NULL,NULL),(73,'3Alt2',NULL,1,1,1,'2018-07-26 17:06:43',NULL,NULL),(74,'5Alt2',NULL,1,1,1,'2018-07-26 17:07:13',NULL,NULL),(75,'5Alt3',NULL,1,1,1,'2018-07-26 17:08:06',NULL,NULL),(76,'2AltRev',NULL,1,1,1,'2018-07-26 17:18:14',NULL,NULL),(77,'tea',NULL,1,1,1,'2018-09-16 15:11:52',1,'2018-09-16 15:15:17'),(78,'v2292292292',NULL,1,1,1,'2018-09-23 18:47:08',NULL,NULL),(79,'v22922922923',NULL,1,1,1,'2018-09-23 18:47:24',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redi_version_status`
--

LOCK TABLES `redi_version_status` WRITE;
/*!40000 ALTER TABLE `redi_version_status` DISABLE KEYS */;
INSERT INTO `redi_version_status` VALUES (1,'Finished'),(2,'Graphics work in progress'),(3,'Need to Assign'),(4,'On Hold/or spot killed'),(5,'Prepping'),(6,'Ready to send'),(7,'Sent'),(8,'Waiting on Producer'),(9,'Work in progress');
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-17  4:31:22

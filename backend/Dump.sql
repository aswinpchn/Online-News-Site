CREATE DATABASE  IF NOT EXISTS `newsImportTest` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `newsImportTest`;
-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: mydbms.cwotr7vrym6h.us-west-1.rds.amazonaws.com    Database: news
-- ------------------------------------------------------
-- Server version	5.7.26-log

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
-- SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

-- SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `editor_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `headlines` varchar(200) NOT NULL,
  `body` varchar(4000) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `modified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`editor_id`,`article_id`),
  KEY `article_id` (`article_id`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`editor_id`) REFERENCES `editor` (`editor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (3,1,'My headline','NEw body','2020-03-21 02:28:09','2020-03-21 03:06:12'),(3,2,'My headline','NEW Body','2020-03-21 02:28:38','2020-03-21 03:27:00'),(3,3,'My headline','My Body','2020-03-21 02:30:59',NULL),(3,4,'My headline','My Body','2020-03-21 02:39:09',NULL),(3,5,'My headline','My Body','2020-03-21 02:39:41',NULL),(3,6,'My headline','My Body','2020-03-21 02:40:37',NULL),(3,7,'My headline','My Body','2020-03-21 03:04:33',NULL),(3,8,'My headline','My Body','2020-03-21 03:04:46',NULL),(3,9,'My headline','My Body','2020-03-21 03:05:47',NULL),(3,10,'My headline','My Body','2020-03-21 03:06:12',NULL),(3,11,'New headline','Modified body','2020-03-25 18:53:44','2020-03-25 19:00:01'),(3,12,'Another headline','Another body','2020-03-25 18:54:20',NULL),(3,13,'Headline part','Modified body part','2020-03-25 19:02:15','2020-03-25 19:02:55'),(3,14,'New Headline part','New Body part','2020-03-25 19:04:10',NULL),(3,15,'My headline','My Body','2020-04-03 07:47:08',NULL),(3,16,'My headline','My Body','2020-04-03 07:48:32',NULL),(3,17,'My headline','My Body','2020-04-03 07:50:41',NULL),(3,18,'My headline','My Body','2020-04-03 07:53:09',NULL),(3,19,'My headline','My Body','2020-04-03 08:09:30',NULL),(3,20,'My headline','My Body','2020-04-03 08:14:14',NULL),(3,21,'My headline','My Body','2020-04-03 08:55:46',NULL),(3,22,'My headline','My Body','2020-04-03 08:56:19',NULL),(3,23,'My headline','This is new body for the article','2020-04-03 09:00:01','2020-04-06 03:41:09'),(3,24,'My headline 1','My Body','2020-04-03 09:00:09',NULL),(3,25,'News article name','News article body','2020-04-06 02:05:43',NULL),(3,26,'Another article','asd','2020-04-06 02:07:33',NULL),(3,27,'News article 1','Body of the article 1','2020-04-06 02:09:31',NULL),(3,28,'Tokyo Olympics Organizers Considering July 2021 for Opening Ceremony 2021 for Opening Opening Ceremony 2021 for Opening','Please calculate and enter your Candidacy GPA. This is the GPA calculation for all classes that you have *completed* that will be used for degree credit on your Candidacy form, sections A and C, and any of those classes that you have repeated. This calculation must NOT include CMPE 294, ENGR 200W, any undergraduate classes, or any classes that you will not list on your candidacy form. Please calculate and enter your Candidacy GPA. This is the GPA calculation for all classes that you have *completed* that will be used for degree credit on your Candidacy form, sections A and C, and any of those classes that you have repeated. This calculation must NOT include CMPE 294, ENGR 200W, any undergraduate classes, or any classes that you will not list on your candidacy form. ','2020-04-06 03:38:15','2020-05-01 20:50:57'),(3,29,'Large, Troubled Companies Got Bailout Money in Small-Business Loan Program','A company in Georgia paid $6.5 million to resolve a Justice Department investigation — and, two weeks later, received a $10 million federally backed loan to help it survive the coronavirus crisis. Another company, AutoWeb, disclosed last week that it had paid its chief executive $1.7 million in 2019 — a week after it received $1.4 million from the same loan program. And Intellinetics, a software company in Ohio, got $838,700 from the government program — and then agreed, the following week, to spend at least $300,000 to purchase a rival firm.','2020-04-27 06:42:24',NULL),(3,30,'You Don’t Need a Mixer (Just a Whisk!) for This One-Bowl Shortbread','I’ve spent a lot of time baking over these many socially distant weeks, but only very rarely pulled out the electric mixer or food processor. Somehow, the simplicity and intimacy of whisking everything by hand has been extremely satisfying. This is why, when a shortbread craving hit, I didn’t reach for my tried-and-true recipe. I opted for an easy one-bowl version that calls for melted butter.','2020-04-27 06:53:15',NULL),(3,31,'The Most Comforting Chicken','Welcome back to Five Weeknight Dishes. This was the week I killed the sourdough starter. We were close during the first month of quarantine, but with humans to feed, provisioning enough flour and time to keep the relationship alive was getting harder. It was giving me reproachful vibes from the counter every time I passed through the kitchen. I also felt reproached by some scallions in the kitchen of the chef David Chang, who was cooking on Instagram this week. He is saving the root ends of his scallions, cutting off only the green parts and regrowing new ones in water glasses. Damn, I thought. That is how a real cook does it.','2020-04-27 06:59:59',NULL),(3,32,'This Should Be V.R.’s Moment. Why Is It Still So Niche?','More than two decades ago, when I was a preteen, I saved up my allowance to buy the original Virtual Boy, an early V.R. gaming console made by Nintendo. The Virtual Boy was an infamous commercial flop, with laughably primitive 3-D graphics and a janky plastic headset that gave me splitting headaches. But I was transfixed by the idea of a technology that could transport me to another world, even if it was only to play Mario Tennis.','2020-05-01 21:20:10',NULL),(3,33,'A City in Oklahoma Ends Face Mask Requirement After Store Employees Threatened','A city in Oklahoma that had required everyone to wear a face mask when going inside a business has decided to change that rule after store employees were threatened with violence by people who refused to cover their nose and mouth. “In the short time beginning on May 1, 2020, that face coverings have been required for entry into stores/restaurants, store employees have been threatened with physical violence and showered with verbal abuse,” Stillwater City Manager Norman McNickle said in a statement. One of those involved a threat using a firearm despite “clear medical evidence that face coverings helps contain the spread of COVID-19.”\n\nThe emergency measure that had been implemented Thursday called on businesses to require any customers to wear face masks in order to go inside. But for many that seemed to amount to an unacceptable violation of their rights. “Many of those with objections cite the mistaken belief the requirement is unconstitutional, and under their theory, one cannot be forced to wear a mask. No law or court supports this view,” McNickle said in a statement. “It is further distressing that these people, while exercising their believed rights, put others at risk.”.\n\nStillwater Mayor Will Joyce announced the change less than 24 hours after the rule had come into effect after lots of reports of threats of violence against those who were trying to enforce it. Joyce made his frustration clear in a series of tweets, noting that while he expected some pushback to the rule he never thought it would lead to threats of violence. “To the people who resort to threats and intimidation when asked to take a simple step to protect your community: shame on you. Our freedom as Americans comes with responsibilities, too,” Joyce tweeted. The face masks are still required for store employees but now only “strongly recommended” for customers, although any business still has the right to demand everyone wear them.  “If a business requires you to wear a face covering and you refuse to do so the business has the right to refuse you service and/or demand you leave their establishment,” Police Chief Jeff Watts said. “If you refuse to do so, you could be cited and/or arrested for trespassing if the business call the police and requests to make a citizen’s arrest.”\n\nSupport our independent journalism\nReaders like you make our work possible. Help us continue to provide the reporting, commentary and criticism you won’t find anywhere else.\n\n \n \nCoronavirus\n','2020-05-03 18:45:39','2020-05-06 06:28:01'),(3,34,'A Wendy’s With No Burgers as Meat Production Is Hit','Hundreds of Wendy’s restaurants have run out of hamburgers. Kroger, the largest supermarket chain in the United States, is limiting the amount of ground beef and pork that customers can buy at some stores. And Costco, where shoppers typically buy in bulk, has placed a three-product cap on purchases of fresh beef, poultry and pork. adasdas','2020-05-06 01:49:48','2020-05-06 06:19:49'),(3,35,'Food article','asdjan','2020-05-06 06:19:24',NULL),(3,36,'An article','body for the article ajdsand','2020-05-06 19:48:46','2020-05-06 19:49:10'),(3,37,'New food article','asdjnasadas','2020-05-06 21:27:18','2020-05-06 21:27:31'),(5,1,'Headline from UI','This is a body','2020-03-31 06:59:17','2020-03-31 07:42:00'),(8,1,'Coronavirus wreaks Havoc in the USA.','The deaths have crossed 10,000 people and are expected to increase further. The main worry now is the leadership void.','2020-04-06 05:09:31',NULL),(9,1,'Damn good article','Decentralized failure detection protocols use a simple gossip-style\nprotocol that enable each node in the system to learn about the\narrival (or departure) of other nodes. For detailed information on\ndecentralized failure detectors and the parameters affecting their\naccuracy, the interested reader is referred to [8]. Early designs of\nDynamo used a decentralized failure detector to maintain a\nglobally consistent view of failure state. Later it was determined\nthat the explicit node join and leave methods obviates the need for\na global view of failure state. This is because nodes are notified of\npermanent node additions and removals by the explicit node join\nand leave methods and temporary node failures are detected by\nthe individual nodes when they fail to communicate with others\n(while forwarding requests).','2020-04-09 02:59:38',NULL),(9,2,'How a Premier U.S. Drug Company Became a Virus ‘Super Spreader’','BOSTON — On the first Monday in March, Michel Vounatsos, chief executive of the drug company Biogen, appeared in good spirits. The company’s new Alzheimer’s drug was showing promise after years of setbacks. Revenues had never been higher.\nOnstage at an elite health care conference in Boston, Mr. Vounatsos touted the drug’s “remarkable journey.” Asked if the coronavirus that was ravaging China would disrupt supply chains and upend the company’s big plans, Mr. Vounatsos said no.\n“So far, so good,” he said.\nBut even as he spoke, the virus was already silently spreading among Biogen’s senior executives, who did not know they had been infected days earlier at the company’s annual leadership meeting.\nBiogen employees, most feeling healthy, boarded planes full of passengers. They drove home to their families. And they carried the virus to at least six states, the District of Columbia and three countries, outstripping the ability of local public health officials to trace the spread.\nThe biogen meeting was one of the earliest examples in the U.S. of what epidemiologists call “superspreading events” of Covid-19, where a small gathering of people leads to a huge number of infections. Unlike the most infamous clusters of cases stemming from a nursing home outside Seattle or a 40th birthday party in Connecticut, the Biogen cluster happened at a meeting of top health care professionals whose job it was to fight disease, not spread it.\n“The smartest people in health care and drug development — and they were completely oblivious to the biggest thing that was about to shatter their world,” said John Carroll, editor of Endpoints News, which covers the biotech industry.\n\nHelp us report in critical moments.\nSubscribe today to support The Times\nThe official count of those sickened— 99, including employees and their contacts, according to the Massachusetts Department of Public Health — includes only those who live in that state. The true number across the United States is certainly higher. The first two cases in Indiana were Biogen executives. So was the first known case in Tennessee, and six of the earliest cases in North Carolina.\n\nAll the people outside Massachusetts that The New York Times has connected to the cluster have recovered. But it’s impossible to say for certain whether anyone became gravely ill or died from the spread out of the conference.\n\nIn hindsight, many people have criticized Biogen’s decision to continue with its leadership meeting in late February, which was attended by vice presidents from European countries already hit by the virus. Others in the industry fault Biogen for being too tight-lipped about the outbreak.\n\nAt least two of the company’s senior executives have tested positive. Citing privacy concerns, the company has declined to name them, even as other chief executives in biotech have disclosed their positive tests.\n\nResponding to questions from The New York Times, Mr. Vounatsos refused to say even whether he had been tested for Covid-19.\n\n“He is completely focused on employee safety, supplying medicines to patients, and leading the company,” said a Biogen spokesman, David Caouette. “This takes precedence over his personal health status.”\n\nThe company has defended its handling of the leadership meeting and its aftermath, saying it made the best decisions it could with the information available at the time.','2020-04-13 07:42:06',NULL),(9,3,'Another Coronavirus Casualty: Spring\nA season of rebirth unfolds without baseball, family reunions, bluebonnet viewings, and familiar religious gatherings.','The bluebonnets popped up as ever this year, but the annual family portraits along the blooming Texas roadsides did not.\n\nThere was no first pitch for the world champion Washington Nationals — their stadium has been turned into a center for feeding those in need. Passover dinners were attended by laptops, not loved ones, and Holy Week services were held in parking lots, if not on computer screens.\n\nThe teenager who becomes a family’s first high school graduate probably won’t walk across a stage. Prom dresses will mostly sit in closets. Marathons that were trained for will have to wait. Weddings may be rescheduled, or they may happen in silent living rooms.\n\nAlong with the horrific loss of life and the toll of millions of jobs, this socially distanced Easter represents an entire season of traditions and transitions altered, disrupted or canceled. Spring, normally a season of hope, instead has become a period of endless lost things.\n\nStill, in this season of rebirth, people do their best to make accommodations and fixes, to carry on as much as possible. Here are some of those ways.\n\nVideo\nCinemagraph\nRev. Dina van Klaveren demonstrates how to partake of the rituals of Maundy Thursday at home. Video by Everett Stimler.Credit\n“The church calendar year is a human construction,” said the Rev. Dina van Klaveren, the rector of St. Andrew’s Episcopal Church in Glenwood, Md., who has turned to Facebook and Zoom to conduct the traditions of Holy Week.\n\n“As human beings, we need to frame time,” she said. “We need to have these ritual moments, do symbolic action, as an outside sign of inward reality.”\n\nSo Daisy the donkey, who leads the annual Palm Sunday parade, was beamed via Facebook to parishioners. A small service, held each year on Maundy Thursday, includes the ancient custom of foot washing; this year, the Rev. van Klaveren demonstrated via video how to partake in the ritual at home. (Her teenagers took a pass.)\n\nOn Maundy Thursday, it is also traditional to strip the church altar of its ornaments as a symbol of the humiliation of Jesus. “We don’t need to strip the altar this year,” she said. “Everything has already been stripped away.”\n\n','2020-04-13 07:43:26',NULL),(9,4,'People lined up in their cars at a food distribution site in San Antonio','DENVER — Standing in line used to be an American pastime, whether it was lining up for Broadway shows, camping outside movie theaters before a Star Wars premiere or shivering outside big-box stores to be the first inside on Black Friday.\n\nThe coronavirus has changed all that. Now, millions of people across the country are risking their health to wait in tense, sometimes desperate, new lines for basic needs as the economic toll of the virus grips the country.\n\nIn cars and on foot, they are snapping on masks and waiting for hours to stock up on groceries, file for unemployment assistance, cast their ballots and pick up boxes of donated food. The lines stretch around blocks and clog two-lane highways.\n\nIn western Pennsylvania, cars stacked up for miles on Monday as hundreds of people waited to collect a week’s worth of groceries from the Pittsburgh Community Food Bank.\n\nOutside Miami, some of the 16 million Americans who have lost their jobs over the past few weeks snaked around a library on Tuesday, waiting to pick up a paper application for unemployment benefits.\n\nAnd in Milwaukee, Catherine Graham, who has a bad heart and asthma, slapped on a homemade face mask and left her apartment on Tuesday for the first time since early March to spend two hours waiting in line to vote at one of the five polling locations in the city that remained open for the Wisconsin primary election.\n\n','2020-04-13 07:44:56',NULL),(10,1,'Serious Questions about integrity and credibility about China.','With the recent information burying and over-reliance on China for everything, countries around the world are scrambling to modifying their dependence over China by either Moving manufacturing in-house or to other countries that can do it for cheap.','2020-04-14 06:50:08',NULL),(10,2,'This is also a very long headline','Ding','2020-04-27 11:19:53',NULL),(10,3,'This is a very long headline','Dong','2020-04-27 11:23:27',NULL),(10,4,'New Headline','New Article body.','2020-04-29 01:55:43',NULL),(10,5,'Headline','Body.','2020-04-29 02:03:59',NULL),(10,6,'Hey','Wee','2020-04-29 02:22:16',NULL),(10,7,'Poet','Poet','2020-04-29 02:23:35',NULL),(10,8,'Pot','Pot','2020-04-29 02:27:06',NULL),(10,9,'Pte','Pte','2020-04-29 02:29:30',NULL);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `article_view`
--

DROP TABLE IF EXISTS `article_view`;
/*!50001 DROP VIEW IF EXISTS `article_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `article_view` AS SELECT 
 1 AS `editor_id`,
 1 AS `article_id`,
 1 AS `headlines`,
 1 AS `body`,
 1 AS `create_time`,
 1 AS `modified_time`,
 1 AS `name`,
 1 AS `email`,
 1 AS `password`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `belongs_to`
--

DROP TABLE IF EXISTS `belongs_to`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `belongs_to` (
  `editor_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`editor_id`,`article_id`,`name`),
  KEY `belongs_to_ibfk_2` (`name`),
  CONSTRAINT `belongs_to_ibfk_1` FOREIGN KEY (`editor_id`, `article_id`) REFERENCES `article` (`editor_id`, `article_id`),
  CONSTRAINT `belongs_to_ibfk_2` FOREIGN KEY (`name`) REFERENCES `category` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `belongs_to`
--

LOCK TABLES `belongs_to` WRITE;
/*!40000 ALTER TABLE `belongs_to` DISABLE KEYS */;
INSERT INTO `belongs_to` VALUES (3,4,'Business'),(3,6,'Business'),(3,8,'Business'),(3,9,'Business'),(3,10,'Business'),(3,15,'Business'),(3,16,'Business'),(3,17,'Business'),(3,18,'Business'),(3,19,'Business'),(3,20,'Business'),(3,21,'Business'),(3,22,'Business'),(3,23,'Business'),(3,24,'Business'),(3,29,'Business'),(3,33,'Business'),(9,1,'Business'),(10,1,'Business'),(10,2,'Business'),(3,30,'Food'),(3,31,'Food'),(3,33,'Food'),(3,34,'Food'),(3,35,'Food'),(3,37,'Food'),(10,2,'Food'),(3,4,'Politics'),(3,5,'Politics'),(3,6,'Politics'),(3,8,'Politics'),(3,9,'Politics'),(3,10,'Politics'),(3,11,'Politics'),(3,12,'Politics'),(3,13,'Politics'),(3,14,'Politics'),(3,15,'Politics'),(3,16,'Politics'),(3,17,'Politics'),(3,18,'Politics'),(3,19,'Politics'),(3,20,'Politics'),(3,21,'Politics'),(3,22,'Politics'),(3,23,'Politics'),(3,24,'Politics'),(3,33,'Politics'),(3,36,'Politics'),(8,1,'Politics'),(9,2,'Politics'),(9,3,'Politics'),(9,4,'Politics'),(10,1,'Politics'),(10,4,'Politics'),(10,5,'Politics'),(10,6,'Politics'),(10,7,'Politics'),(3,25,'Science'),(3,26,'Science'),(3,27,'Science'),(3,32,'Science'),(3,33,'Science'),(5,1,'Science'),(9,1,'Science'),(9,2,'Science'),(10,4,'Science'),(10,5,'Science'),(10,6,'Science'),(10,9,'Science'),(3,13,'Sports'),(3,14,'Sports'),(3,25,'Sports'),(3,26,'Sports'),(3,27,'Sports'),(3,28,'Sports'),(3,33,'Sports'),(10,3,'Sports'),(10,8,'Sports');
/*!40000 ALTER TABLE `belongs_to` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('Business'),('Food'),('Politics'),('Science'),('Sports');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `user_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `editor_id` int(11) NOT NULL,
  `text` varchar(250) DEFAULT NULL,
  `c_time` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`article_id`,`editor_id`,`c_time`),
  KEY `editor_id` (`editor_id`,`article_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`editor_id`, `article_id`) REFERENCES `article` (`editor_id`, `article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (5,1,3,'Test comment1','2020-03-23 02:05:43'),(5,1,3,'Test comment1','2020-03-23 02:05:46'),(5,1,3,'Test comment2','2020-03-23 02:52:51'),(5,2,9,'Adding a comment','2020-05-01 20:43:12'),(5,4,3,'Test comment......','2020-04-03 10:27:05'),(5,6,10,'Commenting on article','2020-05-01 20:41:26'),(5,7,10,'Comment 1','2020-05-06 06:17:33'),(5,7,10,'Comment 2','2020-05-06 06:17:36'),(5,24,3,'Test comment......','2020-04-03 10:29:17'),(5,24,3,'Test comment......','2020-04-03 10:39:11'),(5,24,3,'Test comment......','2020-04-03 10:40:07'),(5,24,3,'Test comment......','2020-04-03 10:41:35'),(5,24,3,'Test comment tadka','2020-04-03 10:42:12'),(5,24,3,'Test comment tadka','2020-04-03 10:46:30'),(5,24,3,'Test comment tadka','2020-04-03 10:49:37'),(5,27,3,'bad article','2020-05-01 21:07:58'),(5,28,3,'Comment','2020-04-15 05:20:20'),(5,32,3,'More than two decades?','2020-05-01 21:32:56'),(5,32,3,'Two decades?','2020-05-01 21:41:24'),(5,32,3,'Whyyyyyyy?','2020-05-01 21:51:08'),(5,34,3,'Comment 1','2020-05-06 21:26:22'),(12,1,3,'Comment from user 12','2020-03-25 19:20:56'),(12,1,3,'Comment from user 12','2020-03-25 19:34:50'),(28,1,8,'This is my first comment','2020-04-08 20:26:52'),(30,1,8,'This is a nice article about coronavirus','2020-04-06 05:39:31'),(30,1,8,'The number of cases has crossed 1 million.','2020-04-06 08:26:02'),(30,1,8,'US is leading in the number of cases.','2020-04-06 08:54:13'),(30,1,8,'Strict lockdown measures are easing the pressure in healthcare systems.','2020-04-06 08:57:00'),(30,1,8,'Various vaccines and treatment trials are underway.','2020-04-06 10:20:25'),(30,1,8,'The number of cases has crossed 1 million.','2020-04-13 06:36:45'),(30,1,8,'The number of cases has crossed 1 million.','2020-04-13 06:36:48'),(30,1,10,'Test0','2020-04-29 00:57:08'),(30,1,10,'Test0','2020-04-29 00:58:53'),(30,1,10,'Test0','2020-04-29 01:02:17'),(30,1,10,'test0','2020-04-29 01:07:11'),(30,1,10,'test0','2020-04-29 01:17:55'),(30,1,10,'test1','2020-04-29 01:20:23'),(30,1,10,'test0','2020-04-29 01:33:13'),(30,1,10,'ttt','2020-04-29 01:36:34'),(30,1,10,'Test0','2020-04-29 01:37:34'),(30,1,10,'Test0','2020-04-29 01:38:14'),(30,1,10,'Test1','2020-04-29 01:38:22'),(30,1,10,'Try','2020-04-29 01:38:27'),(30,1,10,'Final Try','2020-04-29 01:38:32'),(30,1,10,'Transaction test c...','2020-04-29 01:59:29'),(30,8,10,'Tate','2020-04-29 05:14:02'),(30,9,10,'Test comments','2020-04-29 02:51:32'),(30,9,10,'TTT','2020-04-29 02:51:35'),(30,28,3,'Lazy article!','2020-04-06 10:48:23'),(30,28,3,'Lazy article!','2020-04-06 10:48:44'),(30,28,3,'Lazy article!','2020-04-06 10:59:33'),(30,28,3,'Lazy article!','2020-04-06 11:00:32'),(30,28,3,'Cant even write an interesting article?','2020-04-06 11:01:41'),(30,28,3,'Hey Comment.','2020-04-29 23:40:41'),(32,1,8,'This is my second comment after first','2020-04-08 20:28:59'),(33,1,8,'this is my third comment after second','2020-04-08 20:31:54'),(52,24,3,'Comment time test.','2020-05-02 01:52:52'),(53,1,8,'wow much corona many virus','2020-05-03 18:36:20'),(53,3,9,'Wow a ray of hope in this darkness filled void','2020-05-03 18:37:51'),(54,1,8,'you are right rajeev i am wrong','2020-05-03 18:40:38'),(54,3,9,'Indeed the light at the end of the tunnel','2020-05-03 18:41:18');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editor`
--

DROP TABLE IF EXISTS `editor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `editor` (
  `editor_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`editor_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editor`
--

LOCK TABLES `editor` WRITE;
/*!40000 ALTER TABLE `editor` DISABLE KEYS */;
INSERT INTO `editor` VALUES (3,'Jayasurya','jayasurya.editor@sjsu.edu','sha1$3e32101e$1$b7c36d79b25d56c4089b3d3e063f3b06af9df63d'),(4,'EditorName','editor@editor.com','ASdasd'),(5,'Edoas','as','sha1$bb8be334$1$7e85cd5ebc7e7577faeda57833af1273ec'),(6,'sadasdkm','qwe@gmailc.om','sha1$71a76d7a$1$05afd836df18d25d65f0468682d0c8ba1c'),(8,'Editor','editor@gmail.com','sha1$fa0c94bd$1$8d1091befe74fec08be0375c85c4d8fca21f97dd'),(9,'Rajeev Editor','rajeev.hotheadeditor@gmail.com','sha1$4d9f7e42$1$baf458f26ca31d8f591719805871dc60d02bbbf6'),(10,'editorZero','editorzero@gmail.com','sha1$4a65e402$1$735447a78c56d30d44af0aff71dc17d2c8dec565');
/*!40000 ALTER TABLE `editor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `user_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `editor_id` int(11) NOT NULL,
  `l_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`,`article_id`,`editor_id`),
  KEY `editor_id` (`editor_id`,`article_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`editor_id`, `article_id`) REFERENCES `article` (`editor_id`, `article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (5,1,9,'2020-04-09 19:21:37'),(5,2,9,'2020-05-01 20:43:58'),(5,4,3,'2020-03-22 23:19:44'),(5,5,3,'2020-03-22 23:26:03'),(5,6,3,'2020-03-23 02:03:47'),(5,6,10,'2020-05-01 20:41:15'),(5,7,3,'2020-03-23 02:51:20'),(5,7,10,'2020-05-06 06:17:20'),(5,8,10,'2020-05-01 20:36:04'),(5,27,3,'2020-05-01 21:07:35'),(5,28,3,'2020-04-15 05:20:30'),(5,32,3,'2020-05-01 21:22:39'),(5,34,3,'2020-05-06 21:26:13'),(12,4,3,'2020-03-25 20:00:54'),(12,11,3,'2020-03-25 20:00:31'),(12,24,3,'2020-04-03 09:36:03'),(16,24,3,'2020-04-03 09:37:52'),(29,1,5,'2020-04-05 11:33:32'),(29,4,3,'2020-04-05 10:22:32'),(29,22,3,'2020-04-05 11:39:55'),(29,23,3,'2020-04-05 10:45:48'),(29,24,3,'2020-04-05 11:34:34'),(30,1,8,'2020-04-06 05:12:11'),(30,1,10,'2020-04-29 01:49:01'),(30,7,10,'2020-04-29 09:48:06'),(30,8,10,'2020-04-29 05:13:50'),(30,9,10,'2020-04-29 02:34:00'),(30,24,3,'2020-04-13 00:42:30'),(30,28,3,'2020-04-06 10:48:10'),(32,1,9,'2020-04-09 03:56:28'),(32,24,3,'2020-04-09 00:31:24'),(32,27,3,'2020-04-09 02:00:18'),(33,1,9,'2020-04-09 03:10:15'),(33,24,3,'2020-04-13 00:46:26'),(53,1,8,'2020-05-03 18:36:02'),(53,3,9,'2020-05-03 18:37:26'),(54,3,9,'2020-05-03 18:41:01');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribed_to`
--

DROP TABLE IF EXISTS `subscribed_to`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribed_to` (
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `s_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`,`name`),
  KEY `name` (`name`),
  CONSTRAINT `subscribed_to_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `subscribed_to_ibfk_2` FOREIGN KEY (`name`) REFERENCES `category` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribed_to`
--

LOCK TABLES `subscribed_to` WRITE;
/*!40000 ALTER TABLE `subscribed_to` DISABLE KEYS */;
INSERT INTO `subscribed_to` VALUES (5,'business','2020-04-09 18:30:43'),(5,'food','2020-05-06 21:26:48'),(5,'Politics','2020-03-23 02:30:36'),(5,'Sports','2020-03-23 02:24:25'),(32,'politics','2020-04-09 18:53:43'),(53,'politics','2020-05-03 18:38:03'),(53,'science','2020-05-03 18:38:08'),(54,'politics','2020-05-03 18:40:11'),(54,'science','2020-05-03 18:40:13');
/*!40000 ALTER TABLE `subscribed_to` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `location` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (5,'jayasurya.pinaki@sjsu.edu','sha1$04b14c73$1$51904e266936ab8011d55fc6ca07a4238b1ac28a','JayasuryaPinaki','M','2006-01-01','CA'),(12,'jayasurya.pinaki1@sjsu.edu','sha1$6b491463$1$1b173de011b92a3df882f2eeceb9542a65ed9fb0','Jayasurya','M','1996-08-17','CA'),(16,'jayasurya.pinaki123@sjsu.edu','sha1$ec6766b2$1$0db649159e7bdcb973d4ac449ed3b93e0b8f4212','Jayasurya Pinaki','M','0000-00-00','AL'),(19,'jayasurya.pinaki400@sjsu.edu','sha1$3f07d822$1$52b9852a7b24537c24812957775415bd1fa97e8f','Jayasurya Pinaki','M','0000-00-00','AL'),(20,'jayasurya.pinaki120@sjsu.edu','sha1$f5eb1311$1$bace1aafb430ca9d4d92561e6d9f61b3ca1e176c','Jayasurya Pinaki','M','0000-00-00','AL'),(21,'jayasurya.pinaki111@sjsu.edu','sha1$f3fb5748$1$32495fa1713b92dc9e3d236e8da40e70243e67d9','Jayasurya Pinaki','M','0000-00-00','AL'),(22,'jayasurya.pinaki1982@sjsu.edu','sha1$2954e2bc$1$c78e02e2b69b8e91864c08f5c0955abd6f430155','Jayasurya Pinaki','M','0000-00-00','AL'),(23,'jayasurya.pinaki1029@sjsu.edu','sha1$b4861b66$1$0c9082dd47c1aaba21e859ea10c37a79b8fa7c92','Jayasurya Pinaki','M','2019-01-01','AL'),(26,'jayasurya.pinaki121243@sjsu.edu','sha1$a790a4c6$1$91c522736704d58fe0d1123505c2aa4ad5f2267a','Jayasurya Pinaki','M','1999-02-12','AL'),(27,'jayasurya.pinaki999@sjsu.edu','sha1$faff0579$1$0a16d1387658f92130833c8eb958d29af74ce27d','Jayasurya Pinaki','M','2006-01-01','AL'),(28,'rajeev.hothead@gmail.com','sha1$bcd5dbc9$1$48090050eac4bc0f0fdfc9b3a2bd1daec23a6c24','Rajeev','M','1996-11-11','CA'),(29,'aswin@gmail.com','sha1$6a36dd3b$1$02e606f5f346ce31a4512ab7a40bbd0b1561fe10','Aswin Prasad','M','2006-01-01','CA'),(30,'user0@gmail.com','sha1$3430e68a$1$9daf7f9027d1f2682faea4614d83e937beca3470','userZero','M','2006-01-01','CA'),(32,'rajeev.hothead1@gmail.com','sha1$9a46e130$1$208160eae4de56a2a11263395f23bed035e8ca42','Commentor','M','2006-01-01','AL'),(33,'rajeev.hothead2@gmail.com','sha1$05b0d0ab$1$9a03cdefb77b83d2db996081f15fe4d83579a91a','Commentortwo','M','2006-01-01','AL'),(34,'oldnycuser@gmail.com','sha1$9f47d8b7$1$bd978e1d360a80b0c8b077f42f9aa52a8f25713f','OldNYCUser','F','1996-05-15','NY'),(51,'reader.jayasurya@sjsu.edu','sha1$7c589b65$1$ff7ee690e76112544fb155e2f25835a1ed108d48','JAYASURYA PINAKI','M','2006-01-01','AL'),(52,'florida1990user@gmail.com','sha1$f662aa76$1$3a8a64340d298d8aba7db6e4453f0433309bdd9d','floridauser','F','1990-01-01','FL'),(53,'rajeev.hothead123@gmail.com','sha1$f06eb0c7$1$362f621d9ae1347d5c1c3cfccd30369ed7b5a2c1','Rajeev Sebastian','M','1991-09-15','IN'),(54,'rajeev.hothead1234@gmail.com','sha1$01bb8428$1$938ef1c71c53eeae9597f36a72a0053f16a65a52','Roshini','F','1990-03-16','DE');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `views` (
  `user_id` int(11) NOT NULL,
  `editor_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `r_time` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`editor_id`,`article_id`,`r_time`),
  KEY `views_ibfk_1` (`editor_id`,`article_id`),
  CONSTRAINT `views_ibfk_1` FOREIGN KEY (`editor_id`, `article_id`) REFERENCES `article` (`editor_id`, `article_id`),
  CONSTRAINT `views_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
INSERT INTO `views` VALUES (5,3,23,'2020-04-09 19:20:53'),(5,3,23,'2020-05-01 21:06:29'),(5,3,23,'2020-05-06 06:22:46'),(54,3,23,'2020-05-03 18:40:01'),(5,3,24,'2020-04-09 19:20:49'),(5,3,24,'2020-04-09 20:00:15'),(52,3,24,'2020-05-02 01:51:53'),(52,3,24,'2020-05-02 01:54:23'),(5,3,27,'2020-05-01 21:07:24'),(5,3,27,'2020-05-01 21:07:58'),(5,3,28,'0000-00-00 00:00:00'),(5,3,28,'2020-04-09 19:06:13'),(5,3,28,'2020-04-09 19:29:02'),(5,3,28,'2020-04-09 19:45:07'),(5,3,28,'2020-04-15 05:20:16'),(5,3,28,'2020-04-15 05:20:36'),(5,3,28,'2020-04-15 05:20:37'),(5,3,28,'2020-04-15 05:21:00'),(5,3,28,'2020-04-15 05:21:37'),(5,3,28,'2020-04-15 05:21:55'),(5,3,28,'2020-05-01 20:51:08'),(5,3,28,'2020-05-01 20:53:30'),(5,3,28,'2020-05-01 21:06:23'),(5,3,28,'2020-05-01 21:18:13'),(30,3,28,'2020-04-29 23:40:20'),(30,3,28,'2020-04-29 23:40:41'),(30,3,28,'2020-04-30 00:23:34'),(53,3,28,'2020-05-03 18:37:09'),(5,3,32,'0000-00-00 00:00:00'),(5,3,32,'2020-05-01 21:32:27'),(5,3,32,'2020-05-01 21:32:56'),(5,3,32,'2020-05-01 21:38:18'),(5,3,32,'2020-05-01 21:38:30'),(5,3,32,'2020-05-01 21:41:25'),(5,3,33,'2020-05-06 19:47:27'),(5,3,34,'2020-05-06 21:26:05'),(5,3,35,'2020-05-06 06:23:09'),(5,3,35,'2020-05-06 06:23:25'),(5,5,1,'2020-04-09 03:50:14'),(5,5,1,'2020-04-09 03:50:17'),(5,5,1,'2020-04-09 03:50:18'),(5,5,1,'2020-04-09 03:50:21'),(5,8,1,'2020-04-09 19:49:52'),(5,8,1,'2020-04-15 05:21:59'),(30,8,1,'2020-04-13 07:29:00'),(53,8,1,'2020-05-03 18:35:45'),(54,8,1,'2020-05-03 18:40:25'),(5,9,1,'2020-04-09 19:21:36'),(5,9,1,'2020-04-09 19:21:44'),(5,9,1,'2020-04-09 19:59:50'),(32,9,1,'2020-04-09 03:56:25'),(5,9,2,'2020-05-01 20:42:55'),(5,9,2,'2020-05-01 20:43:12'),(5,9,2,'2020-05-01 20:49:27'),(5,9,2,'2020-05-01 20:53:30'),(53,9,3,'2020-05-03 18:37:19'),(54,9,3,'2020-05-03 18:40:59'),(34,9,4,'2020-04-14 06:52:42'),(30,10,1,'2020-04-29 00:53:59'),(30,10,1,'2020-04-29 00:54:01'),(30,10,1,'2020-04-29 00:54:03'),(30,10,1,'2020-04-29 00:54:07'),(30,10,1,'2020-04-29 01:03:47'),(30,10,1,'2020-04-29 01:17:39'),(30,10,1,'2020-04-29 01:17:47'),(30,10,1,'2020-04-29 01:17:49'),(30,10,1,'2020-04-29 01:17:55'),(30,10,1,'2020-04-29 01:20:12'),(30,10,1,'2020-04-29 01:20:23'),(30,10,1,'2020-04-29 01:33:13'),(30,10,1,'2020-04-29 01:36:34'),(30,10,1,'2020-04-29 01:37:29'),(30,10,1,'2020-04-29 01:38:09'),(30,10,1,'2020-04-29 01:38:15'),(30,10,1,'2020-04-29 01:38:22'),(30,10,1,'2020-04-29 01:38:27'),(30,10,1,'2020-04-29 01:38:32'),(30,10,1,'2020-04-29 01:45:27'),(30,10,1,'2020-04-29 01:59:20'),(30,10,1,'2020-04-29 02:03:25'),(30,10,1,'2020-04-29 02:08:55'),(30,10,1,'2020-04-29 02:10:07'),(30,10,1,'2020-04-29 02:10:43'),(30,10,1,'2020-04-29 02:14:21'),(30,10,1,'2020-04-29 02:15:24'),(34,10,1,'2020-04-14 06:52:09'),(34,10,1,'2020-04-14 06:55:14'),(34,10,1,'2020-04-14 06:55:16'),(34,10,1,'2020-04-14 06:55:47'),(34,10,1,'2020-04-14 07:06:01'),(5,10,2,'2020-05-06 01:51:34'),(5,10,2,'2020-05-06 01:53:17'),(5,10,2,'2020-05-06 01:55:18'),(5,10,2,'2020-05-06 06:21:40'),(5,10,2,'2020-05-06 06:21:41'),(5,10,2,'2020-05-06 06:21:42'),(5,10,2,'2020-05-06 06:21:43'),(5,10,2,'2020-05-06 06:21:52'),(5,10,2,'2020-05-06 06:22:14'),(5,10,3,'2020-05-06 01:53:30'),(5,10,3,'2020-05-06 01:55:12'),(5,10,3,'2020-05-06 01:55:27'),(5,10,6,'2020-05-01 20:41:14'),(5,10,6,'2020-05-01 20:41:26'),(5,10,7,'2020-05-06 06:17:15'),(30,10,7,'2020-04-29 09:48:01'),(30,10,7,'2020-04-29 09:50:24'),(5,10,8,'2020-05-01 20:35:46'),(5,10,8,'2020-05-01 20:37:02'),(5,10,8,'2020-05-01 20:39:57'),(5,10,8,'2020-05-01 20:40:01'),(5,10,8,'2020-05-01 20:40:51'),(30,10,8,'2020-04-29 05:13:49'),(30,10,8,'2020-04-29 05:14:02'),(5,10,9,'2020-05-01 20:16:01'),(30,10,9,'2020-04-29 02:33:38'),(30,10,9,'2020-04-29 02:34:14'),(30,10,9,'2020-04-29 02:37:49'),(30,10,9,'2020-04-29 02:41:03'),(30,10,9,'2020-04-29 02:44:31'),(30,10,9,'2020-04-29 02:47:54'),(30,10,9,'2020-04-29 02:48:16'),(30,10,9,'2020-04-29 02:48:42'),(30,10,9,'2020-04-29 02:51:32'),(30,10,9,'2020-04-29 02:51:36'),(30,10,9,'2020-04-29 03:04:41'),(30,10,9,'2020-04-29 03:08:26'),(30,10,9,'2020-04-29 03:12:23'),(30,10,9,'2020-04-29 04:01:56'),(30,10,9,'2020-04-29 05:13:45');
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'news'
--

--
-- Dumping routines for database 'news'
--
/*!50003 DROP PROCEDURE IF EXISTS `checkDuplicateEmailForEditor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `checkDuplicateEmailForEditor`(IN emailId VARCHAR(50), editorId INT(11))
IF EXISTS (SELECT * from editor where email = emailId and editor_id != editorId) THEN
  SELECT true;
ELSE
  SELECT false;
END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `checkDuplicateEmailForUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `checkDuplicateEmailForUser`(IN emailId VARCHAR(50), userId INT(11))
IF EXISTS (SELECT * from user where email = emailId and user_id != userId) THEN
  SELECT true;
ELSE
  SELECT false;
END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `doesEmailExistForEditor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `doesEmailExistForEditor`(IN emailId VARCHAR(50))
IF EXISTS (SELECT * from editor where email = emailId) THEN
  SELECT true;
ELSE
  SELECT false;
END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `doesEmailExistForUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `doesEmailExistForUser`(IN emailId VARCHAR(50))
IF EXISTS (SELECT * from user where email = emailId) THEN
  SELECT true;
ELSE
  SELECT false;
END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getArticleReadsByAge` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `getArticleReadsByAge`(IN editor_id INT)
SELECT COUNT(*) count, "0-18" age
	FROM views V, user U
	WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) < 18
	UNION
	SELECT COUNT(*) count, "18-40" age
	FROM views V, user U
	WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) >= 18 AND (YEAR(NOW()) - YEAR(U.DOB)) < 40
	UNION
	SELECT COUNT(*) count, "40-60" age
	FROM views V, user U
	WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) >= 40 AND (YEAR(NOW()) - YEAR(U.DOB)) < 60
	UNION
	SELECT COUNT(*) count, "60+" age
	FROM views V, user U
	WHERE V.user_id = U.user_id AND V.editor_id = editor_id AND (YEAR(NOW()) - YEAR(U.DOB)) >= 60 ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getArticleReadsByTimeOfTheDay` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `getArticleReadsByTimeOfTheDay`(IN editor_id INT)
(SELECT COUNT(*) count, "10PM-6AM" as time
	FROM views
	WHERE views.editor_id = editor_id AND (HOUR(r_time) >= 22 OR HOUR(r_time) < 6))
    UNION
	(SELECT COUNT(*) count, "6AM-2PM" as time
	FROM views
	WHERE views.editor_id = editor_id AND (HOUR(r_time) >= 6 AND HOUR(r_time) < 14))
    UNION
	(SELECT COUNT(*) count, "2PM-10PM" as time
	FROM views
	WHERE views.editor_id = editor_id AND (HOUR(r_time) >= 14 AND HOUR(r_time) < 22)) ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `hasUserLikedTheArticle` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `hasUserLikedTheArticle`(IN userId INT(11), IN articleId INT(11), IN editorId INT(11))
IF EXISTS (SELECT * FROM likes WHERE user_id=userId and article_id=articleId and editor_id=editorId) THEN
  SELECT true;
ELSE
  SELECT false;
END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `isValidCategoryName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `isValidCategoryName`(IN categoryName VARCHAR(50))
IF EXISTS (SELECT * FROM category WHERE name = categoryName) THEN
  SELECT true;
ELSE
  SELECT false;
END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateEditorInformation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `updateEditorInformation`(IN emailId varchar(50), IN username varchar(50), IN editorId int(11), IN userPassword varchar(100))
IF userPassword is NULL THEN
  UPDATE editor SET email = emailId, name = username WHERE editor_id = editorId;
ELSE
  UPDATE editor SET email = emailId, password = userPassword, name = username WHERE editor_id = editorId;
END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateUserInformation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `updateUserInformation`(IN emailId varchar(50), IN userPassword varchar(100), IN username varchar(50), IN userSex char(1), IN dateOfBirth date, IN userLocation varchar(2), IN userId int(11))
IF userPassword is NULL THEN
  UPDATE user SET email = emailId, name = username, sex = userSex, DOB = dateOfBirth, location = userLocation WHERE user_id = userId;
ELSE
  UPDATE user SET email = emailId, password = userPassword, name = username, sex = userSex, DOB = dateOfBirth, location = userLocation WHERE user_id = userId;
END IF ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `article_view`
--

/*!50001 DROP VIEW IF EXISTS `article_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `article_view` AS select `article`.`editor_id` AS `editor_id`,`article`.`article_id` AS `article_id`,`article`.`headlines` AS `headlines`,`article`.`body` AS `body`,`article`.`create_time` AS `create_time`,`article`.`modified_time` AS `modified_time`,`editor`.`name` AS `name`,`editor`.`email` AS `email`,`editor`.`password` AS `password` from (`article` join `editor` on((`article`.`editor_id` = `editor`.`editor_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
-- SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-06 16:25:54

/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 10.1.25-MariaDB : Database - ops
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `p_office` */

CREATE TABLE `p_office` (
  `office_code` varchar(10) NOT NULL DEFAULT '',
  `office` varchar(35) DEFAULT '',
  `temp` tinyint(5) DEFAULT '0',
  `prefix` varchar(4) DEFAULT '',
  `groupcode` varchar(5) DEFAULT '',
  `isactive` tinyint(1) DEFAULT '1',
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`office_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

/*Data for the table `p_office` */

insert  into `p_office`(`office_code`,`office`,`temp`,`prefix`,`groupcode`,`isactive`,`ts`) values 
('ABR0007   ','ABRFI                              ',7,'OTHE','',0,'2015-04-21 13:54:18'),
('ACE0049','ACES',0,'OTHE','',1,'2018-11-05 09:45:32'),
('ACL0046   ','ACLG                               ',46,'CESE','',1,'2015-04-21 13:54:18'),
('ACR0065   ','ACRO                               ',65,'OTHE','',0,'2015-04-21 13:54:18'),
('ADM0002','College Admissions and Aid Office',0,'COLL','',1,'2018-08-09 09:22:27'),
('ADZ0009   ','ADZU Press                         ',9,'CESE','',0,'2015-04-21 13:54:18'),
('ALT0064','ALTEC',0,'CESE','',1,'2023-03-08 11:23:37'),
('ALU0008','Alumni Relations Office',0,'CESE','',1,'2019-07-25 15:45:48'),
('APA0040   ','VP for Administration Office',40,'CESE','',1,'2015-04-21 13:55:12'),
('APA0045   ','University Security Office         ',45,'CESE','',1,'2015-04-21 13:54:18'),
('ASS0049','Asst VP for Higher Education Office',0,'COLL','',1,'2018-08-09 09:21:42'),
('ATE0042   ','Ateneo Peace Institute             ',42,'CESE','',1,'2015-04-21 13:54:18'),
('ATE0057   ','Ateneo Professional Center         ',57,'CESE','',0,'2015-04-21 13:54:18'),
('ATE0061','Ateneo Zam-Min Institute',0,'OTHE','',1,'2022-09-28 14:11:01'),
('ATF0050','ATFEST2019',0,'OTHE','',1,'2019-11-25 08:57:01'),
('ATH0058','Athletics Office',0,'CESE','',1,'2018-08-09 09:21:57'),
('AUX0037   ','Auxiliary Services                 ',37,'CESE','',1,'2015-04-21 13:54:18'),
('AVP0044   ','AVP Academics                      ',44,'COLL','',0,'2015-04-21 13:54:18'),
('CAM0011','Campus Ministry Office',0,'COLL','',1,'2018-08-09 09:22:15'),
('CCE0012   ','CCES                               ',12,'CESE','',1,'2015-04-21 13:54:18'),
('CLI0040   ','College Infirmary',40,'CESE','',1,'2015-04-21 13:54:18'),
('CO 0013   ','Office of Student Affairs',13,'COLL','',1,'2015-04-21 13:54:18'),
('CO 0014','CGCO',0,'COLL','',1,'2018-08-09 09:22:57'),
('CO 0015','College Admissions and Aid Office',0,'COLL','',1,'2018-08-09 09:22:36'),
('CO 0034   ','School of Mgt And Accty            ',34,'COLL','',1,'2015-04-21 13:54:18'),
('CO 0036','College Registrar\'s Office',0,'COLL','',1,'2018-08-09 09:29:53'),
('CO 0051   ','College Science Laboratory',51,'COLL','',1,'2015-04-21 13:54:18'),
('CO 0060','College Science Info Tech & Engrg',0,'COLL','',1,'2023-03-13 10:16:46'),
('CO 0061   ','School of Liberal Arts             ',61,'COLL','',1,'2015-04-21 13:54:18'),
('COM0004   ','CITS                               ',4,'CESE','',1,'2015-04-21 13:54:18'),
('CPV0055   ','CPVA                               ',55,'CESE','',0,'2015-04-21 13:54:18'),
('EDU0025   ','School of Education                ',25,'COLL','',1,'2015-04-21 13:54:18'),
('FAC0064   ','Faculty Dev  Program               ',64,'CESE','',0,'2015-04-21 13:54:18'),
('FIN0001','Finance Office',0,'CESE','',1,'2018-08-09 09:23:23'),
('FOR0056','VP for Formation Office',0,'CESE','',1,'2018-08-09 09:33:24'),
('GPA0043   ','Ateneo Center for Culture and Arts',43,'CESE','',1,'2015-04-21 13:54:18'),
('GRA0016   ','Graduate School                    ',16,'GRSC','',1,'2015-04-21 13:54:18'),
('GRA0045   ','Grade School                       ',45,'GSSC','',1,'2015-04-21 13:54:18'),
('GRA0048','Graduate School Admin Office',0,'GRSC','',1,'2018-08-09 09:25:26'),
('GRA0066','Grade School Social Action',0,'GSSC','',1,'2023-06-23 13:41:56'),
('GS 0017','Grade School Guidance Office',0,'GSSC','',1,'2018-08-09 09:23:44'),
('GS 0019   ','Grade School Library               ',19,'GSSC','',1,'2015-04-21 13:54:18'),
('GS 0030','Grade School Prefect of Discipline',0,'GSSC','',1,'2023-08-11 16:20:28'),
('GS 0031','Grade School Principal\'s Office',0,'GSSC','',1,'2018-08-09 09:29:38'),
('GS 0032','Grade School Registrar\'s Office',0,'GSSC','',1,'2018-08-09 09:29:29'),
('GS 0033   ','Grade School Computer Laboratory',33,'GSSC','',1,'2015-04-21 13:54:18'),
('GS 0040','Grade School Clinic',0,'GSSC','',1,'2015-06-18 11:52:12'),
('HIG0047   ','Junior High School',47,'HISC','',1,'2015-04-21 13:54:18'),
('HS 0018','Junior HS Guidance Office',0,'HISC','',1,'2018-08-09 09:25:53'),
('HS 0020   ','Junior HS Library',20,'HISC','',1,'2015-04-21 13:54:18'),
('HS 0023','Junior HS Registrar\'s Office',0,'HISC','',1,'2018-08-09 09:28:35'),
('HS 0040   ','Junior HS Clinic',40,'HISC','',1,'2015-04-21 13:54:18'),
('HS 0041   ','Junior HS Campus Ministry',41,'HISC','',1,'2015-04-21 13:54:18'),
('HS 0049','Junior HS Principal\'s Office',0,'HISC','',1,'2018-08-09 09:28:57'),
('HS 0050','Junior HS Office of Pref Discipline',0,'HISC','',1,'2019-07-10 11:05:16'),
('HS 0053   ','Junior HS Laboratory',53,'HISC','',1,'2015-04-21 13:54:18'),
('ICS0054   ','ICSWM                              ',54,'CESE','',0,'2015-04-21 13:54:18'),
('IEL0066   ','IELTLM Project                     ',66,'OTHE','',0,'2015-04-21 13:54:18'),
('INH0042   ','INHRODS                            ',42,'CESE','',0,'2015-04-21 13:54:18'),
('INT0062','Internal Auditor Office',0,'CESE','',1,'2023-01-24 16:43:30'),
('JES0052   ','Jesuit Residence                   ',52,'CESE','',1,'2015-04-21 13:54:18'),
('JOS0040   ','Fr Jose T Bacatan SJ Library-AVC',40,'CESE','',1,'2015-04-21 13:54:18'),
('JUN0040','Junior HS Formation Office',0,'HISC','',1,'2018-08-09 09:25:47'),
('JUN0046','Junior HS Admission Office',0,'HISC','',1,'2018-08-09 09:25:39'),
('JUN0060','Junior HS Home-School Rltns',0,'HISC','',1,'2022-09-23 14:20:56'),
('LAN0050   ','Language Project\'s Office          ',50,'CESE','',0,'2015-04-21 13:54:18'),
('LAN0058','AdZU Lantaka Campus',0,'OTHE','',1,'2020-03-06 15:13:46'),
('MAI0021   ','Fr Jose T Bacatan SJ Library',21,'CESE','',1,'2015-04-21 13:54:18'),
('MAS0062','School of Liberal Arts Masscom Lab',0,'COLL','',1,'2020-01-30 10:53:50'),
('NUR0026   ','College of Nursing',26,'COLL','',1,'2015-04-21 13:54:18'),
('NUR0040','College of Nursing - Review Center',0,'OTHE','',1,'2015-04-21 15:53:38'),
('OFF0065','Office of AP for Lead. Devt',0,'CESE','',1,'2023-04-12 15:06:52'),
('OPS0003   ','HRADO                              ',3,'CESE','',1,'2015-04-21 13:54:18'),
('PHY0006','Physical Plant Office',0,'CESE','',1,'2018-08-09 09:27:12'),
('PLA0040   ','Planning',40,'CESE','',0,'2015-04-21 13:54:18'),
('PRE0044','President\'s Office',0,'CESE','',1,'2018-08-09 09:28:13'),
('PRO0028   ','Projects Office                    ',28,'CESE','',1,'2015-04-21 13:54:18'),
('PRO0038','Purchasing and Custodial Office',0,'CESE','',1,'2019-05-23 10:16:20'),
('QUA0063','Quali Assurance & Strat Mgt',0,'CESE','',1,'2023-02-22 14:11:02'),
('RDP0048','University Research Office',0,'CESE','',1,'2018-11-05 09:40:47'),
('RDP0059   ','RDPO                               ',59,'CESE','',0,'2015-04-21 13:54:18'),
('REB0040','Office for Advancement',0,'CESE','',1,'2017-05-02 11:45:59'),
('SAC0035','SACSI Office',0,'COLL','',1,'2018-08-09 09:31:01'),
('SAU0048','Sauras/Canteen/Tienda/JMR Office',0,'CESE','',1,'2019-09-06 12:02:56'),
('SCH0047','Rosendo U Castillo College of Law',0,'COLL','',1,'2023-09-21 14:58:36'),
('SCH0063   ','School of Medicine                 ',63,'MDSC','',1,'2015-04-21 13:54:18'),
('SEN0029','VP for Higher Education Office',0,'COLL','',1,'2018-08-09 09:33:32'),
('SEN0040','Senior High School',0,'SHSU','',1,'2018-06-20 13:41:52'),
('SEN0041','Senior HS Registrar\'s Office',0,'SHSU','',1,'2018-08-09 09:31:36'),
('SEN0042','Senior HS Principal\'s Office',0,'SHSU','',1,'2018-08-09 09:31:29'),
('SEN0043','Senior HS Student Services',0,'SHSU','',1,'2018-06-08 14:23:11'),
('SEN0044','Senior HS Adm & Aid Office',0,'SHSU','',1,'2018-08-09 09:31:12'),
('SEN0045','Senior HS Guidance Office',0,'SHSU','',1,'2018-08-09 09:31:19'),
('SEN0047','Senior HS Clinic',0,'SHSU','',1,'2018-07-02 08:58:05'),
('SEN0051','Senior HS Campus Ministry',0,'SHSU','',1,'2018-12-12 13:56:20'),
('SEN0052','Senior HS Library',0,'SHSU','',1,'2019-02-04 13:22:41'),
('SEN0053','Senior HS Bio Laboratory',0,'SHSU','',1,'2019-04-12 16:55:11'),
('SEN0054','Senior HS Social Action',0,'SHSU','',1,'2019-04-13 10:04:21'),
('SEN0056','Senior HS Physics Lab',0,'SHSU','',1,'2019-05-16 16:52:41'),
('SEN0057','Senior HS Chemistry Lab',0,'SHSU','',1,'2019-06-14 10:48:20'),
('SEN0067','Senior HS Student Activity',0,'SHSU','',1,'2023-08-14 15:54:01'),
('SOC0051','Social Development Office',0,'CESE','',1,'2018-08-09 09:31:48'),
('TES0041','Center for Testing',0,'CESE','',1,'2023-02-15 09:30:32'),
('UNI0040','University Communications Office',0,'CESE','',1,'2018-08-09 09:31:55'),
('UNI0055','University Archives Office',0,'CESE','',1,'2019-05-16 08:42:27'),
('UNI0059','University Chaplain\'s Office',0,'OTHE','',1,'2021-05-05 10:09:21'),
('VP 0040','VP for Basic Education Office',0,'','',1,'2018-08-09 09:33:15'),
('ZMS0039   ','ZMSF                               ',39,'MDSC','',0,'2015-04-21 13:54:18');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

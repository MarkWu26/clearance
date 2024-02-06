/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 10.1.25-MariaDB : Database - central_cls
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `active_holdlist` */

CREATE TABLE `active_holdlist` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `hdr_id` bigint(20) DEFAULT NULL,
  `idnum` varchar(20) DEFAULT NULL,
  `office_id` bigint(20) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `hold_type` tinyint(2) DEFAULT NULL,
  `remarks` text,
  `is_cleared` tinyint(2) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `active_holdlist` */

/*Table structure for table `archived_fin_gnpn` */

CREATE TABLE `archived_fin_gnpn` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `note_type` enum('GN','PN') DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `idnum` varchar(20) DEFAULT NULL,
  `amount` decimal(9,4) DEFAULT NULL,
  `remarks` text,
  `exp_date` date DEFAULT NULL,
  `encoded_by` varchar(20) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `archived_fin_gnpn` */

/*Table structure for table `archived_holdlist` */

CREATE TABLE `archived_holdlist` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `hdr_id` bigint(20) DEFAULT NULL,
  `idnum` varchar(20) DEFAULT NULL,
  `office_id` bigint(20) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `hold_type` tinyint(2) DEFAULT NULL,
  `remarks` text,
  `is_cleared` tinyint(2) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `archived_holdlist` */

/*Table structure for table `clearance_frm` */

CREATE TABLE `clearance_frm` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `unit` varchar(100) DEFAULT NULL,
 `officeName` varchar(255) DEFAULT NULL,
`officeAbbrev` varchar(100) DEFAULT NULL,
  `office_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `clearance_frm` */

/*Table structure for table `clearance_period` */

CREATE TABLE `clearance_period` (
  `batch_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `unit` varchar(10) DEFAULT NULL,
  `unit_id` bigint(20) unsigned DEFAULT NULL,
  `sy` varchar(10) DEFAULT NULL,
  `term` varchar(10) DEFAULT NULL,
  `is_active` tinyint(2) DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  PRIMARY KEY (`batch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `clearance_period` */

insert  into `clearance_period`(`batch_id`,`unit`,`unit_id`,`sy`,`term`,`is_active`,`started_at`) values 
(1,'CO',3,'2023-2024','1',1,'2023-06-16 11:42:49');

/*Table structure for table `clearing_offices` */

CREATE TABLE `clearing_offices` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `abbrev` varchar(5) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `unit_id` bigint(20) unsigned DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `clearing_offices` */

insert  into `clearing_offices`(`id`,`name`,`abbrev`,`unit`,`unit_id`,`type`) values 
(4,'Junior HS Formation Office','ALO','ALL',0,'LIB'),
(5,'College Registrar\'s Office','REGss','ALL',0,'OFFICE'),
(6,'ABRFI','ac','GS',2,'OFFICE'),
(7,'Ateneo Professional Center','wess','ALL',0,'OFFICE'),
(8,'AdZU Lantaka Campus','AROs','ALL',0,'FIN'),
(9,'Grade School Registrar&#39;s Office','GSREG','GS',2,'OFFICE');



/*Table structure for table `unit_config` */

CREATE TABLE unit_config (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unit_id INT,
    main VARCHAR(255),
    identifier VARCHAR(255),
    f_fname VARCHAR(255),
    f_lname VARCHAR(255),
    f_mname VARCHAR(255),
    f_suffix VARCHAR(255),
    f_group VARCHAR(255),
    f_level VARCHAR(255)
    -- Add any other fields as necessary
);


/*Table structure for table `dept_groups` */

CREATE TABLE `dept_groups` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `office_id` bigint(20) DEFAULT NULL,
  `group_name` varchar(10) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `dept_groups` */

/*Table structure for table `dept_members` */

CREATE TABLE `dept_members` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `dept_id` bigint(20) DEFAULT NULL,
  `idnum` varchar(20) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `dept_members` */

/*Table structure for table `fin_gnpn` */

CREATE TABLE `fin_gnpn` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `note_type` enum('GN','PN') DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `idnum` varchar(20) DEFAULT NULL,
  `amount` decimal(9,4) DEFAULT NULL,
  `remarks` text,
  `exp_date` date DEFAULT NULL,
  `encoded_by` varchar(20) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `fin_gnpn` */

/*Table structure for table `settings` */

CREATE TABLE `settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `unit_id` bigint(20) unsigned DEFAULT NULL,
  `path` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `settings` */

/*Table structure for table `unit_college` */

CREATE TABLE `unit_college` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `col_abbrev` varchar(10) DEFAULT NULL,
  `col_name` varbinary(50) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `unit_college` */

/*Table structure for table `units` */

CREATE TABLE `units` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `abbrev` varchar(10) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

/*Data for the table `units` */

insert  into `units`(`id`,`abbrev`,`description`) values 
(1,'TESTTedite','TEST'),
(2,'GS','Grade School'),
(3,'CO','College'),
(4,'GR','Graduate School'),
(5,'COL','Law School'),
(17,'newedut','NEW'),
(18,'SHS','Senior High');

/*Table structure for table `user_logs` */

CREATE TABLE `user_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `off_abbrev` varchar(5) DEFAULT NULL,
  `action` varchar(20) DEFAULT NULL,
  `affected_idnum` varchar(20) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_logs` */

/*Table structure for table `user_rights` */

CREATE TABLE `user_rights` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `user_type` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_rights` */

/*Table structure for table `user_roles` */

CREATE TABLE `user_roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(30) DEFAULT NULL,
  `user_type` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;

/*Data for the table `user_roles` */

insert  into `user_roles`(`id`,`role_name`,`user_type`) values 
(2,'manage_units','ADMIN'),
(3,'hold_all','UNIT'),
(4,'manage_users','UNIT'),
(5,'manage_users','ADMIN'),
(6,'manage_offices','ADMIN'),
(8,'view_clearance','ADMIN'),
(9,'hold_one','UNIT'),
(10,'clear_all','UNIT'),
(11,'clear_one','UNIT'),
(12,'start_period','UNIT'),
(13,'manage_users','UNIT'),
(14,'manage_form','UNIT'),
(15,'hold_all','OFFICE'),
(16,'hold_one','OFFICE'),
(17,'clear_all','OFFICE'),
(18,'clear_one','OFFICE'),
(19,'manage_users','OFFICE'),
(20,'manage_office','UNIT'),
(21,'view_clearance','OFFICE'),
(22,'view_clearance','UNIT'),
(23,'hold_all','FIN'),
(24,'hold_one','FIN'),
(25,'clear_one','FIN'),
(26,'clear_all','FIN'),
(27,'manage_gnpn','FIN'),
(28,'upload_file','LIB'),
(29,'hold_one','LIB'),
(30,'hold_all','LIB'),
(31,'clear_all','LIB'),
(32,'clear_one','LIB'),
(33,'view_clearance','LIB'),
(34,'view_clearance','FIN'),
(35,'manage_users','LIB'),
(36,'manage_users','FIN'),
(38,'hold_all','DEAN'),
(39,'hold_one','DEAN'),
(40,'clear_all','DEAN'),
(41,'clear_one','DEAN'),
(42,'manage_departments','DEAN'),
(43,'manage_users','DEAN'),
(44,'hold_one','CHAIR'),
(45,'clear_one','CHAIR'),
(46,'clear_all','CHAIR'),
(47,'hold_all','CHAIR'),
(48,'view_clearance','CHAIR'),
(49,'view_clearance','DEAN');

/*Table structure for table `user_types` */

CREATE TABLE `user_types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `desc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `user_types` */

insert  into `user_types`(`id`,`name`,`desc`) values 
(1,'ADMIN','Manages units, config and offices'),
(2,'UNIT','User for unit, manages offices and clearance form'),
(3,'OFFICE','General clearing offices'),
(4,'FIN','Finance user, manages gnpn'),
(5,'LIB','Library user, can upload excel for clearance parsing'),
(6,'DEAN','Dean; is an office that is departmentalized, like AAO, MAO, LAAO, etc'),
(7,'CHAIR','Department Chair');

/*Table structure for table `users` */

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` text,
  `type` varchar(30) DEFAULT NULL,
  `rights` varchar(255) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`password`,`type`,`rights`,`unit`) values 
(2,'mine','$2b$10$6hOP9cyGjynHBOK9xOTBgexLURny/9m32KaqVCFz5e2yOCyze2BsO',NULL,'view_clearance,manage_users,manage_units,manage_offices,manage_form,upload_file','CO');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

/*Table structure for table `config_joins` */

CREATE TABLE config_joins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    config_id INT,
    tbl VARCHAR(255),
    onLeft VARCHAR(255),
    onRight VARCHAR(255),
    FOREIGN KEY (config_id) REFERENCES unit_config(id)
);

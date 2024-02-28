-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2024 at 10:11 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `central_cls`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_holdlist`
--

CREATE TABLE `active_holdlist` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hdr_id` bigint(20) DEFAULT NULL,
  `idnum` varchar(20) DEFAULT NULL,
  `office_id` bigint(20) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `hold_type` tinyint(2) DEFAULT NULL,
  `remarks` text,
  `is_cleared` tinyint(2) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `archived_fin_gnpn`
--

CREATE TABLE `archived_fin_gnpn` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `note_type` enum('GN','PN') DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `idnum` varchar(20) DEFAULT NULL,
  `amount` decimal(9,4) DEFAULT NULL,
  `remarks` text,
  `exp_date` date DEFAULT NULL,
  `encoded_by` varchar(20) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `archived_holdlist`
--

CREATE TABLE `archived_holdlist` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hdr_id` bigint(20) DEFAULT NULL,
  `idnum` varchar(20) DEFAULT NULL,
  `office_id` bigint(20) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `hold_type` tinyint(2) DEFAULT NULL,
  `remarks` text,
  `is_cleared` tinyint(2) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `clearance_frm`
--

CREATE TABLE `clearance_frm` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `officeName` varchar(255) DEFAULT NULL,
  `officeAbbrev` varchar(100) DEFAULT NULL,
  `office_id` bigint(20) DEFAULT NULL,
  `clearance_group` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `clearance_period`
--

CREATE TABLE `clearance_period` (
  `batch_id` bigint(20) UNSIGNED NOT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `unit_id` bigint(20) UNSIGNED DEFAULT NULL,
  `sy` varchar(10) DEFAULT NULL,
  `term` varchar(10) DEFAULT NULL,
  `is_active` tinyint(2) DEFAULT NULL,
  `started_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clearance_period`
--

INSERT INTO `clearance_period` (`batch_id`, `unit`, `unit_id`, `sy`, `term`, `is_active`, `started_at`) VALUES
(1, 'CO', 3, '2023-2024', '1', 1, '2023-06-16 11:42:49');

-- --------------------------------------------------------

--
-- Table structure for table `clearing_offices`
--

CREATE TABLE `clearing_offices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `abbrev` varchar(5) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `unit_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clearing_offices`
--

INSERT INTO `clearing_offices` (`id`, `name`, `abbrev`, `unit`, `unit_id`, `type`) VALUES
(4, 'CPVA', 'ALO', 'GS', 2, 'LIB'),
(5, 'College Registrar\'s Office', 'REGs', 'GR', 4, 'OFFICE'),
(6, 'ABRFI', 'ac', 'GS', 2, 'FIN'),
(7, 'Ateneo Professional Center', 'wess', 'ALL', 0, 'LIB'),
(8, 'AdZU Lantaka Campus', 'AROs', 'ALL', 0, 'FIN');

-- --------------------------------------------------------

--
-- Table structure for table `config_joins`
--

CREATE TABLE `config_joins` (
  `id` int(11) NOT NULL,
  `config_id` int(11) DEFAULT NULL,
  `tbl` varchar(255) DEFAULT NULL,
  `onLeft` varchar(255) DEFAULT NULL,
  `onRight` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `dept_groups`
--

CREATE TABLE `dept_groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `office_id` bigint(20) DEFAULT NULL,
  `group_name` varchar(10) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dept_members`
--

CREATE TABLE `dept_members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `dept_id` bigint(20) DEFAULT NULL,
  `idnum` varchar(20) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `fin_gnpn`
--

CREATE TABLE `fin_gnpn` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `note_type` enum('GN','PN') DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `idnum` varchar(20) DEFAULT NULL,
  `amount` decimal(9,4) DEFAULT NULL,
  `remarks` text,
  `exp_date` date DEFAULT NULL,
  `encoded_by` varchar(20) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unit_id` bigint(20) UNSIGNED DEFAULT NULL,
  `path` char(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `abbrev` varchar(10) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `abbrev`, `description`) VALUES
(1, 'TESTTedite', 'TEST'),
(2, 'GS', 'Grade School'),
(3, 'CO', 'College'),
(4, 'GR', 'Graduate School'),
(5, 'COL', 'Law School'),
(17, 'newedut', 'NEW'),
(18, 'SHS', 'Senior High'),
(19, 'test', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `unit_college`
--

CREATE TABLE `unit_college` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `col_abbrev` varchar(10) DEFAULT NULL,
  `col_name` varbinary(50) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `unit_config`
--

CREATE TABLE `unit_config` (
  `id` int(11) NOT NULL,
  `unit_id` int(11) DEFAULT NULL,
  `main` varchar(255) DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `f_fname` varchar(255) DEFAULT NULL,
  `f_lname` varchar(255) DEFAULT NULL,
  `f_mname` varchar(255) DEFAULT NULL,
  `f_suffix` varchar(255) DEFAULT NULL,
  `f_group` varchar(255) DEFAULT NULL,
  `f_level` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` text,
  `type` varchar(30) DEFAULT NULL,
  `rights` varchar(255) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `type`, `rights`, `unit`) VALUES
(2, 'mine', '$2b$10$E1T75diyn0dB5PVs.zmcS.cidht6DKgHTiyk97KCsDHAfSdSXSg0K', '1', 'view_clearance,manage_users,manage_units,manage_offices,manage_form,upload_file,manage_clearance', '2'),
(4, 'mark', '$2b$10$xA3MXF1f/L1McxLnNnoCjOzHkShSh7lfOd4XMh2RUngcOqVdDgjNy', '1', 'view_clearance,manage_users,manage_units,manage_offices,manage_form,upload_file', '3'),
(22, 'new', '$2b$10$8AQDO90VfZnJFekGwDCHyuiPNXwxCBgBmGxWw0mghKVNXYNdm2IWC', '2', 'manage_units', '4'),
(23, 'test', '$2b$10$cAYbJ1NWeTuop62xL.UJEOuzgnbfnZaOSPa12oPg886Hy0X4V3Cnq', '6', 'manage_users', '18');

-- --------------------------------------------------------

--
-- Table structure for table `user_logs`
--

CREATE TABLE `user_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `off_abbrev` varchar(5) DEFAULT NULL,
  `action` varchar(20) DEFAULT NULL,
  `affected_idnum` varchar(20) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_rights`
--

CREATE TABLE `user_rights` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(10) DEFAULT NULL,
  `user_type` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_name` varchar(30) DEFAULT NULL,
  `user_type` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `role_name`, `user_type`) VALUES
(2, 'manage_units', 'ADMIN'),
(3, 'hold_all', 'UNIT'),
(4, 'manage_users', 'UNIT'),
(5, 'manage_users', 'ADMIN'),
(6, 'manage_offices', 'ADMIN'),
(8, 'view_clearance', 'ADMIN'),
(9, 'hold_one', 'UNIT'),
(10, 'clear_all', 'UNIT'),
(11, 'clear_one', 'UNIT'),
(12, 'start_period', 'UNIT'),
(13, 'manage_users', 'UNIT'),
(14, 'manage_form', 'UNIT'),
(15, 'hold_all', 'OFFICE'),
(16, 'hold_one', 'OFFICE'),
(17, 'clear_all', 'OFFICE'),
(18, 'clear_one', 'OFFICE'),
(19, 'manage_users', 'OFFICE'),
(20, 'manage_office', 'UNIT'),
(21, 'view_clearance', 'OFFICE'),
(22, 'view_clearance', 'UNIT'),
(23, 'hold_all', 'FIN'),
(24, 'hold_one', 'FIN'),
(25, 'clear_one', 'FIN'),
(26, 'clear_all', 'FIN'),
(27, 'manage_gnpn', 'FIN'),
(28, 'upload_file', 'LIB'),
(29, 'hold_one', 'LIB'),
(30, 'hold_all', 'LIB'),
(31, 'clear_all', 'LIB'),
(32, 'clear_one', 'LIB'),
(33, 'view_clearance', 'LIB'),
(34, 'view_clearance', 'FIN'),
(35, 'manage_users', 'LIB'),
(36, 'manage_users', 'FIN'),
(38, 'hold_all', 'DEAN'),
(39, 'hold_one', 'DEAN'),
(40, 'clear_all', 'DEAN'),
(41, 'clear_one', 'DEAN'),
(42, 'manage_departments', 'DEAN'),
(43, 'manage_users', 'DEAN'),
(44, 'hold_one', 'CHAIR'),
(45, 'clear_one', 'CHAIR'),
(46, 'clear_all', 'CHAIR'),
(47, 'hold_all', 'CHAIR'),
(48, 'view_clearance', 'CHAIR'),
(49, 'view_clearance', 'DEAN'),
(50, 'manage_clearance', 'ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(10) DEFAULT NULL,
  `desc` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `name`, `desc`) VALUES
(1, 'Admin', 'Manages units, config and offices'),
(2, 'Unit', 'User for unit, manages offices and clearance form'),
(3, 'Office', 'General clearing offices'),
(4, 'Finance', 'Finance user, manages gnpn'),
(5, 'Library', 'Library user, can upload excel for clearance parsing'),
(6, 'Dean', 'Dean; is an office that is departmentalized, like AAO, MAO, LAAO, etc'),
(7, 'Department', 'Department Chair');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_holdlist`
--
ALTER TABLE `active_holdlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `archived_fin_gnpn`
--
ALTER TABLE `archived_fin_gnpn`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `archived_holdlist`
--
ALTER TABLE `archived_holdlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clearance_frm`
--
ALTER TABLE `clearance_frm`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clearance_period`
--
ALTER TABLE `clearance_period`
  ADD PRIMARY KEY (`batch_id`);

--
-- Indexes for table `clearing_offices`
--
ALTER TABLE `clearing_offices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `config_joins`
--
ALTER TABLE `config_joins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `config_id` (`config_id`);

--
-- Indexes for table `dept_groups`
--
ALTER TABLE `dept_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dept_members`
--
ALTER TABLE `dept_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fin_gnpn`
--
ALTER TABLE `fin_gnpn`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unit_college`
--
ALTER TABLE `unit_college`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unit_config`
--
ALTER TABLE `unit_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_logs`
--
ALTER TABLE `user_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_rights`
--
ALTER TABLE `user_rights`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `active_holdlist`
--
ALTER TABLE `active_holdlist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `archived_fin_gnpn`
--
ALTER TABLE `archived_fin_gnpn`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `archived_holdlist`
--
ALTER TABLE `archived_holdlist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clearance_frm`
--
ALTER TABLE `clearance_frm`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `clearance_period`
--
ALTER TABLE `clearance_period`
  MODIFY `batch_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `clearing_offices`
--
ALTER TABLE `clearing_offices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `config_joins`
--
ALTER TABLE `config_joins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dept_groups`
--
ALTER TABLE `dept_groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dept_members`
--
ALTER TABLE `dept_members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fin_gnpn`
--
ALTER TABLE `fin_gnpn`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `unit_college`
--
ALTER TABLE `unit_college`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `unit_config`
--
ALTER TABLE `unit_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user_logs`
--
ALTER TABLE `user_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_rights`
--
ALTER TABLE `user_rights`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `config_joins`
--
ALTER TABLE `config_joins`
  ADD CONSTRAINT `config_joins_ibfk_1` FOREIGN KEY (`config_id`) REFERENCES `unit_config` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

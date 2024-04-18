-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2024 at 08:59 AM
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
  `id` int(11) NOT NULL,
  `stud_id` varchar(20) DEFAULT NULL,
  `phone_number` varchar(11) DEFAULT NULL,
  `description` varchar(120) DEFAULT NULL,
  `remarks` varchar(150) DEFAULT NULL,
  `name` varchar(120) DEFAULT NULL,
  `year` varchar(30) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL,
  `office_code` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `active_holdlist`
--

INSERT INTO `active_holdlist` (`id`, `stud_id`, `phone_number`, `description`, `remarks`, `name`, `year`, `status`, `added_at`, `office_code`) VALUES
(1, 'CO 2005 6018', '09062970037', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 24.5', 'ABALLE, MA. MELANNIE L.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(2, 'CO 2022 0812', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 25', 'ABDULMUTALIB, FAIZAL A.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(3, 'CO 2021 0620', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 55', 'ABDULSHATAL, SHANIQAH', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(4, 'CO 2006 0884', '09269569627', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 565.5', 'ABDURAHMAN, JEMAR S.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(5, 'CO 2002 0178', '991-2768', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 971', 'ACEBRON, DIANE LEBOSADA', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(6, 'CO 2011 1063', '09058699945', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 198', 'ACHUMBRE, CHERELLE L.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(7, 'CO 2022 0099', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 25', 'AGUADO, CARL ALEXANDER C.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(8, 'CO 2020 0022', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 120', 'AHMAD, RODIYAH S.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(9, 'CO 2019 0904', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 575', 'AIZON, ARVI JANE D.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(10, 'CO 2021 0247', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 365', 'AKIJAL, DAYANG MASHREENA AI', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(11, 'CO 2006 0783', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 105, Total Pending Fines: 27600 ', 'ALCUIZAR, JEREMY KEN A.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(12, 'CO 2020 0233', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 30, Total Pending Fines: 845', 'ALIH, FATIMA SHAMEERA A.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(13, 'CO 2022 0900', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 10', 'ALIH, KHRISNA ALEXANDRA C.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(14, 'CO 2021 0533', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 40', 'ALMAZAN, ROBIE MARTIN D.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(15, 'CO 2004 1759', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 150', 'ALOJADO, JANE CAMILLE N.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(16, 'CO 2006 0694', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 24750', 'ALVAREZ, JAYSON C.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(17, 'CO 2006 0341', '09267389175', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 35.5, Total Pending Fines: 23790', 'ANG, STANLEY O.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(18, 'CO 2006 0036', '09229980687', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 46.5', 'ANNI, TAZCHEMAR C.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(19, 'CO 2012 0452', '09269161848', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 97.5', 'ARAGONES, ALCEL G.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(20, 'CO 2005 7094', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 33', 'ARCILLAS, PIERRE ANN A', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(21, 'CO 2022 0716', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 65', 'ATILANO, REGINE F.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(22, 'CO 2007 0748', '09167363489', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 22, Total Pending Fines: 18805', 'BARBA, KAREN C.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(23, 'CO 1997 0204', '09187010610', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 91260', 'BARBASO, IVY B.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(24, 'CO 2011 0122', '09165209299', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 12', 'BARREDO, CRISELINE T', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(25, 'CO 2012 0067', '09068446726', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 10055, Total Pending Fines: 16510 ', 'BELOCURA, JEANETTE G.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(26, 'CO 2002 0400', '983-0071', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 26805', 'BENSALI, ALLAHN JOYCE CARI', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(27, 'CO 2012 0381', '09063334621', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 25', 'BERNALES, BRYAN CHAD C.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(28, 'CO 2019 0420', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 25', 'BORGONIA, IVANNA L.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(29, 'CO 1994 0341', '09153768201', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 18', 'BRUNO, JOAN FATIMA M.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(30, 'CO 2005 6320', '09059584428', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 19030', 'BURONG, MHARWIA A.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(31, 'CO 2009 0885', '09061314841', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 73', 'BUSTAMANTE, MELKA D.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(32, 'CO 2005 7016', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 79020', 'CAGASAN, RIANEE ANN E.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(33, 'CO 2012 0880', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 15', 'CALI, RAFIDH I.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(34, 'CO 2014 0821', '09067724111', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 65', 'CALIBO, SONNYWIL M', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(35, 'CO 1997 0315', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 30435', 'CARREON, KARREN V', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(36, 'CO 2011 0186', '984-1240', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 40', 'CHANG, JOHN PAUL E.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(37, 'CO 1996 0792', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 270', 'CHIONG, GEMMA B.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(38, 'CO 2004 0917', '0917', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 33530', 'CHUA, JOHN MICHAEL M.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(39, 'CO 2001 0656', '991-3742', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 49', 'CLEMENTE, ERMINA HASSAN', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(40, 'CO 2005 6378', '09168889057', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 26100', 'DE GUZMAN, MARVI L.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(41, 'CO 2003 0167', '985-1540', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 19.5', 'DETALLA, JOMADEL L.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(42, 'CO 2004 1936', '09152620615', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 62410', 'DIANSUY, ERGINIA FATIMA G.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(43, 'CO 2015 0751', '09055882779', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 23880', 'DIANSUY, JAYLAN PAUL G.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(44, 'CO 2003 0524', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 13', 'DIPLOMA, MERCEDEZ ANGELA Z', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(45, 'CO 2020 0873', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 575', 'DOMINGO, ALECS YVONNE S.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(46, 'CO 2006 0623', '991-8556', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 43.5', 'EBIAS, GIANE ROCHELLE Z', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(47, 'CO 2002 0339', '991-6706', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 172', 'ELENO, JOSE ACE VILLANUEVA', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(48, 'CO 2022 0298', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 150', 'ESPARAGUERA, ERMYL', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(49, 'CO 2008 0866', '984-0115', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 13515', 'ESPINOSA, AIZA JANE N', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(50, 'CO 2019 0759', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 120', 'FABIAN, DARA MONIQUE I.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(51, 'CO 2014 0662', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 10220', 'FABIAN, JULIA P.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(52, 'CO 2007 0466', '09168918595', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 13.5', 'FACTURAN, KRISTINE PAUSAL', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(53, 'CO 2005 6397', '983-0611', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 26795', 'FERNANDEZ, ARMANDO M', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(54, 'CO 2008 0434', '984-0422', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 15895', 'FRANCISCO, APRIL JOY S.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(55, 'CO 2005 6391', '991-7376', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 22975', 'FRANCISCO, APRIL ROSE O.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(56, 'CO 2022 0613', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 650', 'FRANCISCO, DENISE MARIE', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(57, 'CO 2019 0289', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 20', 'FRANCISCO, JERJANE', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(58, 'CO 2014 0720', '09356252359', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 360', 'GALVEZ, PRINCESS SARAH M.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(59, 'CO 2001 0728', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 114.5', 'GAMOREZ, GINEROSE FRANCISC', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(60, 'CO 2015 0694', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 55', 'GARAN, REI ANTHONY DR.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(61, 'CO 2011 0321', '09276152256', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 10055', 'GARCIA, ROMEO ALTAIRE B', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(62, 'CO 2000 0945', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 24540', 'GARGOLES, FORDONALLEY RUBI', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(63, 'CO 2010 0204', '09351092328', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 14.5', 'GENTELIZO, CRISTINE ROSELL', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(64, 'CO 2022 0797', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 410', 'GO, MA ANGELICA T.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(65, 'CO 2003 0808', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 29045', 'GONZALES, PINKY F.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(66, 'CO 2021 0849', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 215', 'GUNAYDIN, SAID BERK', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(67, 'CO 2010 0487', '09067429336', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 13495', 'HACHERO, MARY HANNAH D.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(68, 'CO 2022 0836', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 510', 'HAJILI, JENAIDA L', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(69, 'CO 2003 0883', '09206505277', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 26.5', 'HALIPA, MARYAM ZAMEELA H.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(70, 'CO 2000 0846', '991-6015', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 461.5, Total Pending Fines: 24645', 'HAMID, IBRAHIM H.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(71, 'CO 2022 0754', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 45', 'HAMJA, NARCISA A.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(72, 'CO 2007 0477', '984-0443', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 17.5', 'HERMENEGILDO, ANGEL M.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(73, 'CO 1996 0619', '09264743452', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 21.5', 'IBRAHIM, NURUL-AIN A.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(74, 'CO 2000 0867', '993', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 30', 'IDANAN BASA, ALHEMNA S.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(75, 'CO 2015 0516', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 140', 'INDASAN, SYPHAR T.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(76, 'CO 2001 1021', '9914177', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 53540', 'INCLAN, ELA LIZEL L', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(77, 'CO 1999 0303', '991-6907', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 288', 'JAGUNAP, JULIET JIMENEZ', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(78, 'CO 2003 0747', '09164966951', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 10.5', 'JAKIRAN, ALDAZIER BANGSAJA', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(79, 'CO 1994 0069', '09173829232', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 26090', 'KAKILALA, LEAH J', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(80, 'CO 2022 0527', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 15', 'LANDIZA, GWYNETH', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(81, 'CO 2022 0438', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 55', 'LEE, JAMES MARTIN', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(82, 'CO 2004 1838', '991-0216', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 28090', 'LEE, PAUL RYAN G', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(83, 'CO 2003 0487', '09154105956', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 51.5', 'LEONES, BIEL ANTHONY A.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(84, 'CO 2002 1048', '09264876919', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 150', 'LOONG, MARLENE A.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(85, 'CO 2009 0969', '992-1075', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 102', 'LUCAS, RAMON M', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(86, 'CO 2003 0847', '09272509040', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 106', 'LUCHAVEZ, CHRISTER T', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(87, 'CO 2001 0776', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 66', 'MACEDA, ABIGAIL A.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(88, 'CO 2011 0832', '09358609246', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 34740', 'MACERO, LADY ANNE SHEENA R', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(89, 'CO 2019 0022', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 340', 'MADRIGAL, LORENZE ANNE F.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(90, 'CO 2006 0868', '984-0217', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 40580', 'MAGHANOY, ANTHONY GIL T.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(91, 'CO 2020 0560', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 15', 'MAGSAYO, RONZEL DENIE', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(92, 'CO 2005 7040', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 25985', 'MALLEN, RIO L', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(93, 'CO 2002 0619', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 13', 'MANLANGIT, MICHAEL GABRIEL', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(94, 'CO 2000 0831', '09269030624', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 15.5', 'MANOGURA, MICHELLE G.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(95, 'CO 2000 0965', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 91410', 'MARAVILLA, HERNAND HERNAND', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(96, 'CO 2005 6527', '955-0628', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 14480', 'MARCOS, MA. KATRINA Y.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(97, 'CO 2018 0785', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 14920', 'MARCOS, QUEENIE', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(98, 'CO 2014 0464', '09274219032', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 420', 'MOHAMMAD SARABI, NURSHALYN', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(99, 'CO 2009 0303', '09067408555', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 47.5', 'MOJARES, CHRISTUM P.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(100, 'CO 2005 7088', '09267947115', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 50295', 'MONARES, MA. CARLA THERESE', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(101, 'CO 2021 0257', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 70', 'MONTEZON, TRISHA E.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(102, 'CO 2009 0698', '992-4960', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 42.5, Total Pending Fines: 19130', 'MUIN, MELVINA B.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(103, 'CO 2004 1771', '984-0416', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 53255', 'MUNNE, KRISTHINE MAY D.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(104, 'CO 2020 0675', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 420', 'NAEEM, SHIFA T.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(105, 'CO 2010 0292', '09263649445', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 17380', 'NALLONAR, GENZEN FAITH L.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(106, 'CO 2002 0909', '09102979953', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 807, Total Pending Fines: 760 ', 'NATIVIDAD, CLODELYN PARTOS', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(107, 'CO 2012 0576', '09261570308', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 31750', 'ORACOY, JEFF P', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(108, 'CO 2020 0869', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 40', 'PAJIJI, SHAHAD L.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(109, 'CO 2009 0354', '09162880803', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 20670', 'PALACIOS, GENER S.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(110, 'CO 2012 0945', '09399161820', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 18.5', 'PALIOC, MARIE FRANCES DIAN', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(111, 'CO 2022 0840', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 20', 'PALMA, ALI AZHAR P.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(112, 'CO 2020 0803', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 1335, Total Assessed Fines: 53.5 ', 'PANCHO, IRISH NICOLE T.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(113, 'CO 2004 1214', '993-1962', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 0, Total Pending Fines: 26120', 'PIA, KENDRICH ALLANI', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(114, 'CO 2003 0752', '09265159280', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 18680', 'PICARDAL, GEORGE ANTHONY A', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(115, 'CO 2001 0652', '993-1887', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 67185', 'PIOQUINTO, BEVERLY CABIARA', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(116, 'CO 2003 0859', '993-1094', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 13', 'PONTILLAS, MARIA CELENIA C', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(117, 'CO 2010 1075', '09179933322', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 10075, Total Pending Fines: 11530', 'PULMANO, PRINCESS M.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(118, 'CO 2015 0433', '982-0548', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 6555, Total Pending Fines: 62640 ', 'PUNDOL, DEBBIE CLAIRE P', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(119, 'CO 2002 0798', '09154524745', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 31', 'RAMIREZ, VINCENT JABINES', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(120, 'CO 2020 0315', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 1300', 'RAZ, RANYA A.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(121, 'CO 2019 0199', '09069282692', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 420, Total Pending Fines: 5965', 'REDOBLE, REDINO E.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(122, 'CO 2001 0839', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 61960', 'RUSEL, ANGELITO G.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(123, 'CO 2020 0084', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 585', 'SAAVEDRA, KRISTHAN C.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(124, 'CO 1998 0562', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 243', 'SAAVEDRA, MARISSA P', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(125, 'CO 2002 1017', '09272670656', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 50395', 'SABACAN, SHEIRELYN SHEILA', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(126, 'CO 2020 0064', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 640', 'SAJI, GRAZANA AIRA A.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(127, 'CO 2005 6602', '991-5667', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 44.5', 'SAKALURAN, RIZMA JELL L', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(128, 'CO 2005 6603', '09058766909', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 39920', 'SALBORO, JAIANN D', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(129, 'CO 2010 0700', '09177264635', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 43375', 'SALDIA, MARY CLARE KRISTIE', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(130, 'CO 2006 0869', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 24990', 'SALI, ROZSLAINI M', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(131, 'CO 2010 0464', '09055731000', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 11', 'SALVADOR, DEXTER D.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(132, 'CO 2001 0844', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 48', 'SCHUCK, GERALDINE S.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(133, 'CO 2007 0762', '09061714821', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 15', 'SECUANDO, RAY CHRISTOPHER', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(134, 'CO 2003 0469', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 191', 'SERIMOGAN, JEANNELYN PARAD', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(135, 'CO 2001 0504', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 82.5', 'SIMSON, ESTER BAZAN', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(136, 'CO 2004 1476', '992-2345', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 46', 'SOLIS, JAN MICHAEL M', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(137, 'CO 2002 0715', '984', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 23740', 'STA. TERESA, NELIETH R.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(138, 'CO 2008 0842', '09268724643', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 22265', 'SUA TOMBOC, AIRA J.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(139, 'CO 2021 0390', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 65', 'SUMALPONG, JEROME JAY', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(140, 'CO 2021 0421', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 145', 'TAGLE, SHAHINAZ U.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(141, 'CO 2020 0312', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 15', 'TAHA, WADZNA M.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(142, 'CO 1998 1329', '993-0608', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 42.5', 'TAMAYO, LEONALYN D.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(143, 'CO 2004 1729', 'N/A', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 373', 'TAN, KATHLEEN JOYCE D.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(144, 'CO 2004 1643', '09268403365', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 25060', 'TAPSI, SARAH MAE B', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(145, 'CO 2012 0689', '09063778891', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 335', 'TAYONA, MARK KIM V.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(146, 'CO 2003 0495', '09068712377', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 13', 'TEOPE, DAIRELLE LOVE G.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(147, 'CO 2004 1576', '09158730850', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 26.5', 'TEREZ, ROMA AMOR T', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(148, 'CO 1997 0505', '09168502458', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 73215', 'TIBLANI, NUL-AMAR S.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(149, 'CO 2008 0338', '09275544804', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 20105, Total Assessed Fines: 41 ', 'TORREFRANCA, ROMEO JR. MON', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(150, 'CO 2007 0793', '09055930176', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 18630', 'TUBIL, AGNES E', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(151, 'CO 2004 1856', '09273241472', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 18', 'VALLECER, GELYN S.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(152, 'CO 2005 6964', '09213579451', 'College Students with Unreturned Books and Accounts', 'Total Pending Fines: 25345', 'VELEZ, JACQUELINE T', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(153, 'CO 2005 6918', '991', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 37', 'VENERACION, MARVI T.', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021'),
(154, 'CO 2002 0237', '9915258', 'College Students with Unreturned Books and Accounts', 'Total Assessed Fines: 46', 'WINGO, YASMINA GANTES', '2022-2023', NULL, '2024-04-16 05:07:46', 'MAI0021');

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
  `clearance_group_id` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clearance_frm`
--

INSERT INTO `clearance_frm` (`id`, `unit`, `officeName`, `officeAbbrev`, `office_id`, `clearance_group_id`) VALUES
(3, '4', 'ACRO', 'test', 0, '2'),
(9, '2', 'ABRFI', 'test', 0, '2'),
(12, '5', 'ACES', 'test', 0, '3'),
(13, '18', 'ALTEC', 'test', 0, '5'),
(14, '5', 'Center for Testing', 'testing', 0, '1');

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
(4, 'CPVA', 'ALO', 'ALL', 0, 'LIB'),
(5, 'College Registrar\'s Office', 'REGs', 'GR', 4, 'OFFICE'),
(6, 'ABRFI', 'ac', 'GS', 2, 'FIN'),
(7, 'Ateneo Professional Center', 'wess', 'ALL', 0, 'LIB'),
(8, 'AdZU Lantaka Campus', 'AROs', 'ALL', 0, 'FIN'),
(9, 'ACRO', 'asdfs', 'ALL', 0, 'DEAN'),
(10, 'ACES', 'test', 'COL', 5, 'LIB'),
(11, 'Ateneo Professional Center', 'sdf', 'GS', 2, 'OFFICE'),
(20, 'ABRFI', 'TEST', 'GR', 4, 'LIB'),
(21, 'ACLG', 'test', 'GR', 4, 'OFFICE');

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
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `clearance_group_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `abbrev` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`clearance_group_id`, `name`, `abbrev`) VALUES
(1, 'Academic', 'AG'),
(2, 'Financial', 'FG'),
(3, 'Administrative', 'AdG'),
(4, 'Library', 'LG'),
(5, 'Health Services', 'HSG'),
(6, 'Graduation', 'GG'),
(7, 'Sports and Recreation', 'SaRG');

-- --------------------------------------------------------

--
-- Table structure for table `old_active_holdlist`
--

CREATE TABLE `old_active_holdlist` (
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
(18, 'SHS', 'Senior High');

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
(2, 'mine', '$2b$10$E1T75diyn0dB5PVs.zmcS.cidht6DKgHTiyk97KCsDHAfSdSXSg0K', '1', 'view_clearance,manage_users,manage_units,manage_offices,manage_form,upload_file,manage_clearance,add_clearance,add_clearancefrm,edit_form', '2'),
(4, 'mark', '$2b$10$xA3MXF1f/L1McxLnNnoCjOzHkShSh7lfOd4XMh2RUngcOqVdDgjNy', '1', 'view_clearance,manage_users,manage_units,manage_offices,manage_form,upload_file', '3'),
(22, 'new', '$2b$10$8AQDO90VfZnJFekGwDCHyuiPNXwxCBgBmGxWw0mghKVNXYNdm2IWC', '2', 'manage_units', '4'),
(23, 'test', '$2b$10$N9P1DG/AqcTEoeS/i0NvM.a5r7Yrp9TRW3KVMYlxGDVDcs2n7kyqW', '6', 'manage_offices,manage_form,manage_gnpn,view_clearance,upload_file,hold_all', '18');

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
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`clearance_group_id`);

--
-- Indexes for table `old_active_holdlist`
--
ALTER TABLE `old_active_holdlist`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `clearance_period`
--
ALTER TABLE `clearance_period`
  MODIFY `batch_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `clearing_offices`
--
ALTER TABLE `clearing_offices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `clearance_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `old_active_holdlist`
--
ALTER TABLE `old_active_holdlist`
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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

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

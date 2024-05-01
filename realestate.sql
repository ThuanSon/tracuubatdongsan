-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2024 at 12:38 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realestate`
--

-- --------------------------------------------------------

--
-- Table structure for table `batdongsan`
--

CREATE TABLE `batdongsan` (
  `id` int(11) NOT NULL,
  `dientich` int(11) NOT NULL,
  `giatri` double NOT NULL,
  `donvi` varchar(20) NOT NULL,
  `idhinhanh` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `batdongsan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hinhanh` (`idhinhanh`);

ALTER TABLE `batdongsan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- Dumping data for table `batdongsan`
--

INSERT INTO `batdongsan` (`id`, `dientich`, `giatri`, `donvi`, `idhinhanh`) VALUES
(1, 500, 150000000, 'VND', 1);

-- --------------------------------------------------------

--
-- Table structure for table `danhsachhinhanh`
--

CREATE TABLE `danhsachhinhanh` (
  `id` int(11) NOT NULL,
  `anh1` varchar(200) NOT NULL,
  `anh2` varchar(200) NOT NULL,
  `anh3` varchar(200) NOT NULL,
  `anh4` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `danhsachhinhanh`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `danhsachhinhanh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- Dumping data for table `danhsachhinhanh`
--

INSERT INTO `danhsachhinhanh` (`id`, `anh1`, `anh2`, `anh3`, `anh4`) VALUES
(1, 'z3217268897190_d20d438ba7d0b2d179dedf9c78b9fc38.jpg', 'z3217260915453_b476a03d45b6a50930b8f08df36b254d.jpg', 'z3217260915748_8f50ad8fcd7803dc63b6badc34978104.jpg', 'dondenghi.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `lienhe`
--

CREATE TABLE `lienhe` (
  `id` int(11) NOT NULL,
  `nguoiduoclienhe` varchar(50) NOT NULL,
  `sodienthoai` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `lienhe`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `lienhe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- Dumping data for table `lienhe`
--

INSERT INTO `lienhe` (`id`, `nguoiduoclienhe`, `sodienthoai`, `email`) VALUES
(1, 'Sơn Thuận Minh', '0337732224', 'thuan@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `tieude` varchar(500) NOT NULL,
  `mota` varchar(2000) NOT NULL,
  `idnguoidang` int(11) NOT NULL,
  `idbatdongsan` int(11) NOT NULL,
  `idlienhe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoidang` (`idnguoidang`,`idbatdongsan`),
  ADD KEY `idbatdongsan` (`idbatdongsan`),
  ADD KEY `lienhe` (`idlienhe`);

ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `tieude`, `mota`, `idnguoidang`, `idbatdongsan`, `idlienhe`) VALUES
(1, 'Nhà có ma, bán gấp', 'Ma thân thiện, vị trí tiện lơi', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(60) NOT NULL,
  `mobile` bigint(12) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `mobile`, `create_at`, `updated_at`, `password`) VALUES
(1, 'Thuan', 'thuanhtml@gmail.com', 765944734, '2024-03-02 17:00:00', '2024-03-05 17:00:00', '18112002'),
(2, 'Sơn Minh Thuận', 'sonminhthuan.ecorp@gmail.com', 337732224, '2024-03-02 17:00:00', '2024-03-03 14:19:31', ''),
(3, 'Sơn Minh Thuận', 'sonminhthuan.ecorp@gmail.com', 337732224, '2024-03-02 17:00:00', '2024-03-03 14:19:53', ''),
(4, 'Sơn Thuận', 'thuan20057141@gmail.com', 765944734, '2024-03-08 17:00:00', '2024-03-09 14:12:52', ''),
(5, 'Truong An', 'doan@gmail.com', 765944734, '2024-03-14 17:00:00', '2024-03-15 00:27:06', ''),
(6, 'new rigist', 'truongando654@gmail.com', 765944734, '2024-04-06 17:00:00', '2024-04-07 04:44:04', '1811');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `batdongsan`
--


--
-- Indexes for table `danhsachhinhanh`
--


--
-- Indexes for table `lienhe`
--

--
-- Indexes for table `posts`
--


--
-- Indexes for table `user`
--

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `batdongsan`
--
--ALTER TABLE `batdongsan`
  --MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `posts`
--
--ALTER TABLE `posts`
  --MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
--ALTER TABLE `user`
  --MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `batdongsan`
--
ALTER TABLE `batdongsan`
  ADD CONSTRAINT `batdongsan_ibfk_1` FOREIGN KEY (`idhinhanh`) REFERENCES `danhsachhinhanh` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`idbatdongsan`) REFERENCES `batdongsan` (`id`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`idnguoidang`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`idlienhe`) REFERENCES `lienhe` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

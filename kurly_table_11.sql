-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 23-12-10 17:46
-- 서버 버전: 8.0.32
-- PHP 버전: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `sjm6715`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `kurly_table_11`
-- 테이블 구조 `kurly_signup_table_11`

CREATE TABLE `kurly_table_11` (
  `idx` int NOT NULL COMMENT '자동 증가 번호',
  `userId` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '아이디',
  `userPw` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '비밀번호',
  `userName` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이름',
  `userEmail` varchar(250) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이메일',
  `userHp` varchar(13) COLLATE utf8mb4_general_ci NOT NULL COMMENT '휴대폰',
  `userAddr1` varchar(250) COLLATE utf8mb4_general_ci NOT NULL COMMENT '주소1',
  `userAddr2` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '주소2',
  `userGender` varchar(4) COLLATE utf8mb4_general_ci NOT NULL COMMENT '성별',
  `userBirth` varchar(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '생년월일',
  `userChooga` varchar(250) COLLATE utf8mb4_general_ci NOT NULL COMMENT '추가 입력 사항',
  `userChoogaId` varchar(16) COLLATE utf8mb4_general_ci NOT NULL COMMENT '추천인 아이디',
  `userChoogaEvent` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '참여 이벤트 명',
  `userService` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL COMMENT '이용 약관 동의',
  `userGaibDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '가입일'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='마켓컬리 회원가입 테이블';

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `kurly_table_11`
--
ALTER TABLE `kurly_table_11`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `kurly_table_11`
--
ALTER TABLE `kurly_table_11`
  MODIFY `idx` int NOT NULL AUTO_INCREMENT COMMENT '자동 증가 번호';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

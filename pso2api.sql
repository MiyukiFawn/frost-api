-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11-Maio-2022 às 22:17
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `pso2api`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `weapons`
--

CREATE TABLE `weapons` (
  `id` int(11) NOT NULL,
  `rarity` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `weapon_type` int(11) NOT NULL,
  `reqPower` int(11) NOT NULL,
  `reqPower_type` enum('MEL','RNG','TEC','DEX','MEL Def','RNG Def','TEC Def','DEX Def') NOT NULL,
  `dropInfo` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `weapons`
--

INSERT INTO `weapons` (`id`, `rarity`, `name`, `weapon_type`, `reqPower`, `reqPower_type`, `dropInfo`, `imageUrl`) VALUES
(8, 1, 'Sword', 1, 1, 'MEL', '', 'https://static.wikia.nocookie.net/phantasystar/images/b/bd/Pso2_sword_id.png/revision/latest?cb=20200320182221'),
(9, 2, 'Alba Sword', 1, 100, 'MEL', '', 'https://static.wikia.nocookie.net/phantasystar/images/2/2e/Pso2_alva_sword_id.png/revision/latest?cb=20200320182220'),
(10, 3, 'Vita Sword', 1, 300, 'MEL', '', 'https://static.wikia.nocookie.net/phantasystar/images/b/b0/Pso2_vita_sword_id.png/revision/latest?cb=20200320182223');

-- --------------------------------------------------------

--
-- Estrutura da tabela `weapon_damage`
--

CREATE TABLE `weapon_damage` (
  `id` int(11) NOT NULL,
  `id_weapon` int(11) NOT NULL,
  `damageType` enum('MEL','RNG','TEC','DEX','MEL Def','RNG Def','TEC Def','DEX Def') NOT NULL,
  `baseDamage` int(11) NOT NULL,
  `maxDamage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `weapon_damage`
--

INSERT INTO `weapon_damage` (`id`, `id_weapon`, `damageType`, `baseDamage`, `maxDamage`) VALUES
(3, 8, 'MEL', 204, 275),
(4, 9, 'MEL', 255, 344),
(6, 10, 'MEL', 305, 411);

-- --------------------------------------------------------

--
-- Estrutura da tabela `weapon_type`
--

CREATE TABLE `weapon_type` (
  `id` int(11) NOT NULL,
  `name` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `weapon_type`
--

INSERT INTO `weapon_type` (`id`, `name`) VALUES
(1, 'Sword'),
(2, 'Wired lances'),
(3, 'Partizan'),
(4, 'Twin daggers'),
(5, 'Double saber'),
(6, 'Knuckles'),
(7, 'Gunshash'),
(8, 'Katana'),
(9, 'Dual blades'),
(10, 'Assault rifle'),
(11, 'Launcher'),
(12, 'Twin machine guns'),
(13, 'Bullet bow'),
(14, 'Rod'),
(15, 'Talis'),
(16, 'Wand'),
(17, 'Jet boots');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `weapons`
--
ALTER TABLE `weapons`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `weapon_damage`
--
ALTER TABLE `weapon_damage`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `weapon_type`
--
ALTER TABLE `weapon_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `weapons`
--
ALTER TABLE `weapons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `weapon_damage`
--
ALTER TABLE `weapon_damage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 24, 2012 at 11:46 AM
-- Server version: 5.5.20
-- PHP Version: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `vendit`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `product_id` bigint(11) NOT NULL AUTO_INCREMENT,
  `product_name` text CHARACTER SET utf8 NOT NULL,
  `description` text CHARACTER SET utf8 NOT NULL,
  `info` text CHARACTER SET utf8 NOT NULL,
  `category` int(11) NOT NULL,
  `sku` varchar(40) CHARACTER SET utf8 NOT NULL,
  `stock` int(11) NOT NULL,
  `cost` float NOT NULL,
  `price` float NOT NULL,
  `product_image` varchar(30) CHARACTER SET utf8 NOT NULL,
  `purchased_recently` int(11) NOT NULL,
  `rating` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `description`, `info`, `category`, `sku`, `stock`, `cost`, `price`, `product_image`, `purchased_recently`, `rating`) VALUES
(1, 'Diablo III', 'This world was saved twenty years prior by a handful of unnamed heroes in Diablo II. Warriors that survived the onslaught of the armies of the Burning Hells have gone mad from their ordeals and it is up to a new generation of heroes to face the forces of evil threatening the world of Sanctuary. Players will have the opportunity to explore familiar settings such as Tristram.', 'Blizzard,Platform: PC,Rating: T,Length: 120h', 13, 'f43tg434g34gwg4', 0, 20, 59.99, 'diablo3.jpg', 0, 4),
(2, 'Minecraft', 'This is Minecraft.', 'Mojang,Platform: PC,Rating: E,Length: 120h', 13, 'q34gh245h45g', 999, 10, 20, 'minecraft.jpg', 234, 5),
(3, 'Call of Duty 4', 'Call of Duty 4: Modern Warfare, the new action thriller from the award-winning team at Infinity Ward, the creators of the Call of Duty series, delivers the most intense and cinematic action experience ever.\r\nArmed with an arsenal of advanced and powerful modern-day firepower, players are transported to treacherous hotspots around the globe to take on a rogue enemy group threatening the world. As both a U.S. Marine and British S.A.S. soldier fighting through an unfolding story full of twists and turns, players use sophisticated technology, superior firepower, and coordinated land and air strikes on a battlefield where speed, accuracy, and communication are essential to victory.\r\n\r\nThe epic title also delivers an added depth of multiplayer action providing online fans an all-new community of persistence, addictive, and customizable gameplay.', 'Activision,Platform: Xbox360,Rating: T,Length: 40h', 13, 'w45aebhhahrfbsdf', 89, 20, 59.99, 'cod4.jpg', 234, 4),
(4, 'Battlefield 3', 'Battlefield 3 is a First-Person Shooter (FPS) that is designed to attack your senses, delivering a visceral combat experience like no other FPS before it. Sequel to 2005''s Battlefield 2, Battlefield 3 utilizes the updated Frostbite 2 game engine, which allows for advanced destruction, sound, and graphics as well as a focus on dense in-game urban settings. Additional game features include: classic Battlefield mission-based gameplay, an impressive array of vehicles including jets and tanks, large-scale maps, an updated soldier class, 2-24 player support online and more.', 'EA,Platform: Xbox360,Rating: T,Length: 65h\r\n', 13, 'asegdbq4q34bhqaerbh', 98, 20, 59.99, 'battlefield3.jpg', 121, 3),
(5, 'Wii Sports', 'Description A compilation of simple, Wii-playable sports games. Included sports are Tennis, Golf, Baseball, Boxing and Bowling. All of these sports games have a stylized look that''s designed after classic 8-bit game designs but brought to life with full 3D technology. Although each game will concentrate on the core mechanics of hitting a ball, swinging a racquet, and putting with a club, the games will offer full (albeit simplified) sports experiences of whole games in Baseball and Tennis as well as multiple holes to play in Golf. Also compatible with the Mii avatar system for a more personalized experience.', 'Nintendo,Platform: Wii,Rating: E,Length: 15h', 13, '45yhwtbhrtfjhnsrtgj', 27, 10, 27.59, 'wiisports.jpg', 12, 3),
(6, 'LEGO Mindstorms NXT 2.0', 'Take LEGO to the next level with MINDSTORMS NXT 2.0. Combining the versatility of the LEGO building system with a microcomputer brick and intuitive programming software, this building kit enables you to construct robots that see, speak, feel, and move. Designed for ages 10 and up, the 2.0 robotics tool set features everything you need to create and program your first robot in approximately one hour. After that, you can create an endless lineup of robots that do what you want--if you can dream it, you can build it.', 'LEGO,All Ages', 14, 'qfwef34qg3gvaw34h', 2, 100, 269.99, 'legomindstorm.jpg', 23, 4),
(7, 'Tekno The Robotic Puppy', 'The next time your child asks you for a dog, you''ll want to say yes. Because unlike real puppies, the Tekno robotic puppy isn''t a lot of work -- he''s just a lot of fun. He walks forward, backward, right, left, and expresses emotions through color-changing eyes and puppy whimpers. Just like any young pup, Tekno is perfectly content to chomp on his bone and play fetch with his ball. With the included wireless translator, you''ll always know exactly what this pooch is thinking and eventually he says several English phrases. He also impresses his audience with a wide selection of tricks, such as dance, speak, sing, and more. Children ages three through eight will be delighted as they learn how to program and work this amazing robotic toy.', 'Manley,All Ages', 14, '4w5j5nws54jw54n', 1, 50, 68.99, 'teknopuppy.jpg', 24, 5),
(8, 'Angry Birds: Knock On Wood Game', 'Play your favorite app game in real life with the Angry Birds: Knock on Wood Game! The age-old battle between Angry Birds and the egg-stealing pigs continues, and the birds will have their revenge. Draw cards, build castles, and knock them down in this hands-on version of the touchscreen hit. First one to 100 points wins!', 'Hasbro,All Ages', 14, '3q4hbrasbetjmnsrt', 34, 12, 15.95, 'angrybirds.jpg', 73, 3),
(9, 'Jenga', 'This is the blockbuster of all stacking games! The original wood block game. The rules are simple enough for the whole family to play: just stack the blocks into a tower without letting it fall! But it''s fun for all ages, too, as some blocks from the bottom of the tower are pulled to make it taller! Who will make the tower fall'' For any number of players. Contents: 54 genuine hardwood blocks and instructions.', 'Hasbro,All Ages', 14, 'q4w3gverbhasdfnhdf', 22, 12, 16.95, 'jenga.jpg', 146, 5),
(10, 'Uno', 'America''s number one card game, UNO offers hours of fun. It''s easy to learn, always unpredictable, and never dull. It can be played with 2 to 10 players, individually, or in teams. And it can even be educational, teaching younger kids number recognition.', 'Hasbo,All Ages', 14, 'q34wyqgwjhnertjhnet', 435, 2, 6.95, 'uno.jpg', 345, 3);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

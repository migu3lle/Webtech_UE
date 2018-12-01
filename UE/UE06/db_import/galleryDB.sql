create database if not exists webtech18gallery;
create user 'gallery_root' identified by 'password';
grant usage on *.* to 'gallery_root'@'localhost' identified by 'password';
grant all privileges on webtech18gallery.* to 'gallery_root'@'localhost';
flush privileges;

use webtech18gallery;
SET FOREIGN_KEY_CHECKS=0;
drop table if exists users;
CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `token` INT DEFAULT NULL,
 PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET = utf8;

INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`) VALUES
('Sandra', 'Caldwell', 'sandy@nomail.com', '12345'),
('Stanley', 'Martinez', 'stanley@nomail.com', 'qwertzu'),
('Dianna', 'Myers', 'diana@nomail.com', '54321');

drop table if exists images;
CREATE TABLE `images` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `url_big` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `url_small` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `description` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET = utf8;

INSERT INTO `images` (`url_big`, `url_small`, `description`) VALUES
('img/beach.jpg', 'img/beach_small.jpg', 'Goleta Beach near UCSB Campus'),
('img/bus_lg.jpg', 'img/bus.jpg', 'A hippy bus in Santa Barbara'),
('img/snail.jpg', 'img/snail_small.jpg', 'A giant sea snail'),
('img/lake.jpg', 'img/lake_small.jpg', 'New Zealand lake in autumn'),
('img/lion.jpg', 'img/lion_small.jpg', 'A lion at sunrise'),
('img/waterfalls.jpg', 'img/waterfalls_small.jpg', 'Kuang si falls in Laos'),
('img/canyon.jpg', 'img/canyon_small.jpg', 'Endless canyon landscape');

drop table if exists users_images;
CREATE TABLE `users_images` (
 `user_id` int(11) NOT NULL,
 `image_id` int(11) NOT NULL,
  FOREIGN KEY (user_id) references users(id),
  FOREIGN KEY (image_id) references images(id)
) DEFAULT CHARACTER SET = utf8;

INSERT INTO `users_images` (`user_id`, `image_id`) VALUES
(1,1),
(1,2),
(1,3),
(2,3),
(2,5),
(3,2),
(3,4),
(3,5),
(3,6),
(3,7);

CREATE TABLE td_user (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  email varchar(50),
  created_at datetime,
  password varchar(40),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
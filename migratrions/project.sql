CREATE TABLE td_project (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  created_at datetime,
  user int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user) REFERENCES td_user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


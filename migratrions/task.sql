CREATE TABLE td_task (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  description varchar(300),
  created_at datetime,
  finished_at datetime,
  project int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (project) REFERENCES td_project(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
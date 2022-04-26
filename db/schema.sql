DROP DATABASE IF EXISTS EmployeeDB;
CREATE DATABASE EmployeeDB;

USE EmployeeDB;

DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dep_name VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);



DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  dep_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (dep_id) REFERENCES department(id)
  ON DELETE SET NULL
);
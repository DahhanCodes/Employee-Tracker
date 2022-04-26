INSERT INTO department (dep_name)
VALUES ("Auidt"),
       ("FoodSafety"),
       ("Sales"),
       ("HR");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("Auditor", 43000.00, 1),
       ("Manager",  65000.00, 2),
       ("Senior Manager", 72000.00, 3),
       ("Senior Account Manager", 68000.00, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id,dep_id)
VALUES ("Ali", "Taher", 1, 2, 1),
       ("Jonathon", "Rosewood", 2, 1,3),
       ("Talha", "Khan", 3, 3,2),
       ("Joe", "Santana", 4, 2,1);
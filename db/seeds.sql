
INSERT INTO department (id, name)
VALUES (1, "Engineer");

INSERT INTO department (id, name)
VALUES (2, "Science");

INSERT INTO department (id, name)
VALUES (3, "Math");

INSERT INTO department (id, name)
VALUES (4, "Art");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Manager", 42000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "IT specialist", 60000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Developer", 75000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Nurse", 65000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Professor", 200000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Statistic", 100000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Human Resource", 80000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "HR director", 100000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, "HR Cordinator", 105000, 4);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Charbelle", "Chaz", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Sofi", "Hernan", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Char", "Dant", 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Jonathan", "Uong", 9, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Melissa", "Arm", 2, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Alla", "Arous", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Rosie", "Cole", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Lianne", "Soon", 5, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Zach", "Soar", 7, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Martin", "Cast", 8, 10);
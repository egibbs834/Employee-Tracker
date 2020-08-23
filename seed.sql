USE employees; 

-- use below structure to make code easier to read
INSERT INTO department
    (name)
VALUES
    ("Sales"), 
    ("Engineering"),
    ("HR"), 
    ("IT"); 

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Person", 100000, 1), 
    ("Mechanical Engineer", 120000, 2), 
    ("Software Engineer", 150000, 2), 
    ("Junior Engineer", 85000, 2), 
    ("HR Rep", 80000, 3), 
    ("IT Tech", 70000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    -- role_id is matching the id from the role table, manager_id I'm just making up
    ("Billy", "Salesboy", 1, 12),
    ("Manoli", "Jones", 2, 100),
    ("Hojin", "Softwareboy", 2, NULL),
    ("Sally", "Juniorboy", 2, NULL),
    ("Davie", "Hrboy", 3, 33), 
    ("Ed", "Gibbons", 4, 400); 
    

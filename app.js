const inquirer = require('inquirer');
const db = require("./dbConnect/dbConnection");
const choices = require('inquirer/lib/objects/choices')


function start() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'optionsList',
            choices: ["View all Employees", "View All Roles", "View All Departments", "View Employees by Manager", "View Employees by Department", "Add a New Employee", "Add a New Role", "Add a New Department", "Update an Employee's Manager", "Delete a table's content", "Quit"],
            name: "choice"
        }

    ])
        .then((res) => {
            console.log(res.choice);

            switch (res.choice) {
                //View options
                case "View all Employees":
                    allEmployees();
                    break;

                case "View All Roles":
                    allRoles()
                    break;

                case "View All Departments":
                    allDepartments()
                    break;

                case "View Employee by Manager":
                    byManager()
                    break;


                case "View Employee by Depertment":
                    byDepartment()
                    break;


                //Crud options

                case "Add a New Department":
                    addDepartment()
                    break;

                case "Add a New Role":
                    addRole()
                    break;

                case "Add a New Employee":
                    addEmployee()
                    break;

                case "Update an Employee's Manager":
                    updateManager()
                    break;


                case "Delete a table's content":
                    deleteContent()
                    break;

                //quit app

                case "Quit":
                    db.end();
                    console.log("Thank you for using EmployeeTracker")
                    break;
            }

        })
}



//View by functions:
const allEmployees = () => {
    db.query("SELECT employee.id AS employee_id, employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.dep_name AS department FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id", (err, res) => {
        if (err) throw err;
        console.table(res)

    });
    start()
}

const allRoles = () => {
    db.query("SELECT roles.id, roles.title,  department.dep_name AS department, roles.salary FROM roles LEFT JOIN department ON roles.department_id = department.id", (err, res) => {
        if (err) throw err;
        console.table(res)

    });
    start()
}

const allDepartments = () => {
    db.query("SELECT department.id, department.dep_name AS department FROM department", (err, res) => {
        if (err) throw err;
        console.table(res)

    });
    start()
}
const byManager = () => {
    inquirer.prompt({
        name: "manager",
        type: "input",
        message: "Please enter the Manager ID: ",
        validate: numInput => {
            if (isNaN(numInput)) {
                console.log("Please enter a valid ID!")
                return false
            }
            else {
                return true
            }
        }
    })
        .then((answer) => {
            console.log(answer.manager)
            db.query(`SELECT * FROM employee WHERE manager_id=${answer.manager}`, (err, res) => {
                if (err) throw err;
                console.table(res)

            });
            start()

        })
}

const byDepartment = () => {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Please enter the department ID: ",
        validate: numInput => {
            if (isNaN(numInput)) {
                console.log("Please enter a valid ID!")
                return false
            }
            else {
                return true
            }
        }
    })
        .then((answer) => {
            console.log(answer.department)
            db.query(`SELECT * FROM employee WHERE dep_id=${answer.department}`, (err, res) => {
                if (err) throw err;
                console.table(res)

            });
            start()

        })
}
/////////////END of View BY/////////////////

//CRUD functions:

//Add new Employee to DB
const addEmployee = () => {
    inquirer.prompt([

        {
            type: "input",
            message: "Please enter the employee's first name: ",
            name: "first_name"
        },

        {
            type: "input",
            message: "Please enter the employee's last name:",
            name: "last_name"
        },

        {
            type: "input",
            message: "Please enter the employee's role ID: ",
            name: "role",
            validate: numInput => {
                if (isNaN(numInput)) {
                    console.log("Please enter a valid role ID!")
                    return false
                }
                else {
                    return true

                }

            }
        },

        {
            type: "input",
            message: "Please enter their manager's ID: ",
            name: "manager",
            validate: numInput => {
                if (isNaN(numInput)) {
                    console.log("Please enter a valid manager ID number!")
                    return false
                }
                else {
                    return true

                }

            }
        },

        {
            type: "input",
            message: "Please enter their department's ID: ",
            name: "departmentID",
            validate: numInput => {
                if (isNaN(numInput)) {
                    console.log("Please enter a valid department ID number!")
                    return false
                }
                else {
                    return true

                }

            }
        }
    ])
        .then((answers) => {
            var firstName = answers.first_name
            var lastName = answers.last_name
            var roleID = answers.role
            var managerID = answers.manager
            var departmentID = answers.departmentID

            console.log(firstName, lastName, roleID, managerID, departmentID)

            let sql1 = `INSERT INTO employee (first_name, last_name, role_id, manager_id, dep_id) VALUES ('${firstName}', '${lastName}', ${roleID}, ${managerID},${departmentID})`

            db.query(sql1, (err, res) => {
                if (err) throw err;
                console.log(`New employee successfully added to the database!`)

            })

            start()

        })
}

//Add a new role to DB
const addRole = () => {
    inquirer.prompt([

        {
            name: "roleTitle",
            type: "input",
            message: "Please enter the new Role's title?"
        },

        {
            name: "salary",
            type: "input",
            message: "What is the new Role's salary?",
            validate: numInput => {
                if (isNaN(numInput)) {
                    console.log("Please enter a valid salary amount!")
                    return false
                }
                else {
                    return true
                }
            }
        },

        {
            name: "depID",
            type: "input",
            message: "Please enter the associated department ID:",
            validate: numInput => {
                if (isNaN(numInput)) {
                    console.log("Please enter a valid department ID amount! (View all departments for valid numbers)")
                    return false
                }
                else {
                    return true
                }
            }
        },

    ])
        .then((answer) => {
            var roleName = answer.addRoleName;
            var roleSalary = answer.salary;
            var depID = answer.depID;

            console.log(roleName, roleSalary, depID)
            let sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${roleName}', ${roleSalary}, ${depID})`

            db.query(sql, (err, res) => {
                if (err) throw err;

            })
            start()
        })
}

//Add a new Department to DB
const addDepartment = () => {
    inquirer.prompt({
        name: "addDepartment",
        type: "input",
        message: "What is the name of the department?"
    })
        .then((answer) => {

            var department = answer.addDepartment

            let sql = "INSERT INTO department (dep_name) VALUES (?)"

            db.query(sql, department, (err, res) => {
                if (err) throw err;

            })
            start()
        })
}




// Make an Update

const updateManager = () => {
    inquirer.prompt([

        {
            name: "employeeChoice",
            type: "input",
            message: "Enter the desired employee's ID:",
            validate: numInput => {
                if (isNaN(numInput)) {
                    console.log("Please enter a valid ID!")
                    return false
                }
                else {
                    return true

                }

            }
        },

        {
            name: "updateManager",
            type: "input",
            message: "Enter their new manager's ID: ",
            validate: numInput => {
                if (isNaN(numInput)) {
                    console.log("Please enter a valid ID!")
                    return false
                }
                else {
                    return true

                }

            }
        }


    ])
        .then((answer) => {
            var employeeID = answer.employeeChoice
            var newManager = answer.updateManager
            console.log(employeeID, newManager)

            let sql = `UPDATE employee SET manager_id=${newManager} WHERE id=${employeeID}`
            db.query(sql, (err, res) => {
                if (err) throw err;

            })
            start()
        })
}

//  Delete functions/

const deleteContent = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Please choose a table from which you would like to delete content: ',
            name: 'tableChoice',
            choices: ["employee", "roles", "department"],
            name: "choice" 
        },

        {
            type: 'input',
            message: `Please enter the id of the ${res.tableChoice}`,
            name: 'choiceID',
            validate: numInput => {
                if (isNaN(numInput)) {
                    console.log("Please enter a valid ID number!")
                    return false
                }
                else {
                    return true

                }

            }
        }])
        .then((res) => {
            var table = res.tableChoice
            var id = res.choiceID
            console.log(tableChoice, idChoice)

            let sql = `DELETE FROM ${table} WHERE id=${id}`

            db.query(sql, (err, res) => {
                if (err) throw err;

            })
            start()
        })
}

start();
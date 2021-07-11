const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
function choices() {
  inquirer
    .prompt([
      {
        name: 'listOptions',
        type: 'list',
        message: 'Would you like to:',
        choices: [
          'view all employees',
          'view all departments',
          'view all roles',
          'Add an employee',
          'Add a department',
          'Add a role',
          'Update employee role',
          'Delete an employee',
          'View employees by department',
          'EXIT',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.listOptions) {
        case 'view all employees':
          viewAllEmployee();
          break;
        case 'view all departments':
          viewAllDepartment();
          break;
        case 'view all roles':
          viewAllRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Update employee role':
          UpdateRole();
          break;
        case 'Delete an employee':
          DeleteEmployee();
          break;
        case 'View employees by department':
          ViewEmployeesByDepartment();
          break;
      }
    });
}
function viewAllEmployee() {
  db.query('SELECT * FROM employee', function (err, result, fields) {
    if (err) throw err;
    console.table(result);
    choices();
  });
}

function viewAllRole() {
  db.query('SELECT * FROM role', function (err, result, fields) {
    if (err) throw err;
    console.table(result);
    choices();
  });
}
function viewAllDepartment() {
  db.query('SELECT * FROM department', function (err, result, fields) {
    if (err) throw err;
    console.table(result);
    choices();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'ENter the Employee First Name',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'ENter the Employee last Name',
      },
      {
        name: 'employRoleID',
        type: 'input',
        message: 'ENter employRoleID',
      },
      {
        name: 'employManID',
        type: 'input',
        message: 'ENter employManID',
      },
    ])
    .then((answers) => {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.firstName}", "${answers.lastName}", "${answers.employRoleID}", "${answers.employManID}")`;
      db.query(query, function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        choices();
      });
    });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        name: 'addDept',
        type: 'input',
        message: 'What department do you want to add?',
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;

      db.query(sql, answer.addDept, function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        viewAllDepartment();
      });
    });
}
function ViewEmployeesByDepartment() {
  db.query('SELECT * FROM department', function (err, result, fields) {
    if (err) throw err;
    console.table(result);
    runingInquirer(result);
  });

  function runingInquirer(result) {
    console.log(result);
    let DapartmentReasult = result.map((item) => ({
      name: item.name,
      value: item.id,
    }));
    inquirer
      .prompt([
        {
          name: 'Department',
          type: 'list',
          message: 'What department do you want to see?',
          choices: DapartmentReasult,
        },
      ])
      .then((answer) => {
        console.log(answer);
        const sql = `select * from employee join role on employee.role_id=role.id where department_id=${answer.Department}`;

        db.query(sql, function (err, result, fields) {
          if (err) throw err;
          console.table(result);
        });
      });
  }
}

// db.query('SELECT * FROM employee', function (err, result, fields) {
//   if (err) throw err;
//   console.table(result);
//   choices();

choices();

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
          'Update employee managers',
          'View employees by manager',
          'total Salary',
          'Delete roles',
          'Delete Department',
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
        case 'Add a role':
          addRole();
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
        case 'Update employee managers':
          UpdatEmployeeManagers();
          break;
        case 'View employees by manager':
          ViewEmployeesByManager();
          break;

        case 'total Salary':
          totalSalary();
          break;
        case 'Delete roles':
          Deleteroles();
          break;
        case 'Delete Department':
          DeleteDepartment();
          break;
        case 'EXIT':
          exit();
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

function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'ENter the title of role',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'ENter the salary of the role',
      },
    ])
    .then((answers) => {
      const query = `INSERT INTO role (title, salary) VALUES ("${answers.title}","${answers.salary}")`;
      db.query(query, function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        choices();
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
          choices();
        });
      });
  }
}

function UpdateRole() {
  inquirer
    .prompt([
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter the id of role',
      },
      {
        name: 'employeeId',
        type: 'input',
        message: 'ENter the employee id',
      },
    ])
    .then((answers) => {
      const query = `UPDATE employee SET role_id = ${answers.roleId} WHERE id = ${answers.employeeId}`;
      db.query(query, function (err, result) {
        if (err) throw err;
        console.table(result);
        choices();
      });
    });
}

function DeleteEmployee() {
  //viewAllEmployee();

  inquirer
    .prompt([
      {
        name: 'deleteEmpId',
        type: 'input',
        message: 'Which employee do you want to remove? (Enter id Here)',
      },
    ])
    .then((answer) => {
      const sql = `DELETE FROM employee WHERE id = ${answer.deleteEmpId}`;

      db.query(sql, function (err, result) {
        if (err) throw err;
        console.table(result);
        choices();
      });
    });
}
function UpdatEmployeeManagers() {
  inquirer
    .prompt([
      {
        name: 'employeeId',
        type: 'input',
        message: 'Enter the id of employee',
      },
      {
        name: 'ManagerId',
        type: 'input',
        message: 'ENter the Manager id',
      },
    ])
    .then((answers) => {
      const query = `UPDATE employee SET manager_id = ${answers.ManagerId} WHERE id = ${answers.employeeId}`;
      db.query(query, function (err, result) {
        if (err) throw err;
        console.table(result);
        choices();
      });
    });
}

function ViewEmployeesByManager() {
  inquirer
    .prompt([
      {
        name: 'managerId',
        type: 'input',
        message: 'Which Employees based on the manager you would like to see?',
      },
    ])
    .then((answer) => {
      console.log(answer);
      const sql = `SELECT * FROM employee WHERE employee.manager_id = ${answer.managerId}`;

      db.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        choices();
      });
    });
}
function totalSalary() {
  inquirer
    .prompt([
      {
        name: 'DepartmentId',
        type: 'input',
        message: 'Which department you would like to see the TotalSalary',
      },
    ])
    .then((answers) => {
      const query = `
        SELECT
         department_id, 
         SUM(role.salary) AS departmentTotal 
         FROM role group by  department_id
         having department_id = ${answers.DepartmentId}
        `;
      db.query(query, function (err, result) {
        if (err) throw err;
        console.table(result);
        choices();
      });
    });
}
function Deleteroles() {
  inquirer
    .prompt([
      {
        name: 'roleId',
        type: 'input',
        message: 'Which role do you want to remove? (Enter id Here)',
      },
    ])
    .then((answer) => {
      const sql = `DELETE FROM role WHERE id = ${answer.roleId}`;

      db.query(sql, function (err, result) {
        if (err) throw err;
        console.table(result);
        choices();
      });
    });
}
function DeleteDepartment() {
  inquirer
    .prompt([
      {
        name: 'DepartmentId',
        type: 'input',
        message: 'Which department do you want to remove? (Enter id Here)',
      },
    ])
    .then((answer) => {
      const sql = `DELETE FROM department WHERE id = ${answer.DepartmentId} `;

      db.query(sql, function (err, result) {
        if (err) throw err;
        console.table(result);
        choices();
      });
    });
}

// exit the app
function exit() {
  db.end();
}
// function runingInquirerRole(result) {
//   let RoleReasult = result.map((item) => ({
//     id: item.id,
//     title: item.title,
//     salary: item.salary,
//     department_id: item.department_id,
//   }));
// }
// db.query('SELECT * FROM employee', function (err, result, fields) {
//   if (err) throw err;
//   console.table(result);
//   choices();

choices();

const Employee = require('../models/employee');
const _ = require('lodash');

exports.createEmployee = async (req, res) => {
    // first checking if Employee exist with same email else creating new
    const employeeExist = await Employee.findOne({ email: req.body.email })
    if (employeeExist) return res.status(403).json({ message: "Email is taken", error: "Error" });
    const employee = await new Employee(req.body);
    employee.save((err, result) => {
        if (err) {
            return res.status(400).json({
                message: err.message || 'error while saving',
                error: err
            })
        }
        res.json(employee);
    })
}

// creating employeeById middleware-function to attach employee details to the request
exports.employeeById = (req, res, next, id) => {
    Employee.findById(id)
        .exec((err, employee) => {
            if (err || !employee) {
                res.status(400).json({
                    message: 'Employee not found',
                    error: err
                });
            }
            req.profile = employee;
            next()
        })
}

exports.allEmployees = (req, res) => {
    Employee.find((err, employees) => {
        if (err) {
            res.status(400).json({
                message: 'Employee not found',
                error: err
            })
        }
        res.json({ status: 'success', employees: employees })
    }).select("firstname lastname email mobile dob address created")
}

// getting employees created by specific manager
exports.allEmployeesofManager = (req, res) => {
    Employee.find({ createdBy: req.params.managerId }, (err, employees) => {
        if (err) {
            res.status(400).json({
                message: 'Employees not found',
                error: err
            })
        }
        res.json({ status: 'success', employees: employees })
    }).select("firstname lastname email mobile dob address created")
}

// getting employee by id , this function will get call after `employeeById` middleware
exports.getEmployee = (req, res) => {
    return res.json(req.profile)
}

// update employee
exports.updateEmployee = async (req, res, next) => {
    let employee = await Employee.findOne({ _id: req.body._id })
    if (!employee) return res.status(403).json({ message: "Employee Not found", error: "Error" });
    employee.updated = Date.now()
    req.body.email = employee.email
    // we are using .extend from loadash to copy properties
    employee = _.extend(employee, req.body)
    employee.save((err, update) => {
        if (err)
            return res.status(400).json({
                message: 'Error while saving employee',
                error: err
            })
        res.json(update);
    })
}

// delete employee
exports.removeEmployee = (req, res) => {
    let employee = req.profile;
    employee.remove((err, employee) => {
        if (err) return res.status(400).json({
            message: 'Error while deleting employee',
            error: err
        });
    });
    return res.json({ message: 'employee deleted successfully' })
}


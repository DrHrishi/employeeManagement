const express = require('express');
const {
    employeeById, allEmployees, getEmployee, updateEmployee,
    removeEmployee, createEmployee,allEmployeesofManager,
} = require('../controllers/employee.controller');
const { requireSignin } = require('../controllers/auth');
const { employeeValidator } = require('../Validators/Validator');
const router = express.Router();

router.post('/create/employee',requireSignin,employeeValidator, createEmployee);
router.get('/employees/of/manager/:managerId', allEmployeesofManager);
router.get('/employees/all', allEmployees);
router.get('/employee/:employeeId', requireSignin, getEmployee);
router.put('/employee', requireSignin, updateEmployee);
router.delete('/employee/:employeeId', requireSignin, removeEmployee);
router.param('employeeId', employeeById)

module.exports = router;

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../classes/employee';
import { newGuid } from '../classes/helper';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(
    public employeesService: EmployeeService
  ) { }

  isEdit: boolean = false;
  employeeInEdit: IEmployee;
  isNew: boolean = false;

  ngOnInit() {
    const isLoading = this.employeesService.getEmployees();
  }


  editEmloyee(employee: IEmployee) {
    this.isEdit = true;
    this.isNew = false;
    this.employeeInEdit = employee;
  }

  deleteEmloyee(employee: IEmployee) {
    this.employeesService.deleteEmployee(employee);
  }

  newEmployee() {
    this.employeeInEdit = {} as IEmployee;
    this.employeeInEdit.id = newGuid();
    this.isEdit = true;
    this.isNew = true;
  }

  cancelEdit() {
    this.isEdit = false;
    this.employeeInEdit = null;
  }
}
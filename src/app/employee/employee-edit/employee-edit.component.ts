import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IEmployee } from '../../classes/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { IEmployeeRole } from 'src/app/classes/employeeRole';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  constructor(
    public employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.employee) {
      this.buildForm();
    }
  }

  @Input() isNew: boolean = false;
  @Input() employee: IEmployee;
  @Output() editDone: EventEmitter<void> = new EventEmitter();

  emplyoeeForm: FormGroup;
  roleCompareFn = (c1: IEmployeeRole, c2: IEmployeeRole) => c1 && c2 ? c1.id === c2.id : c1 === c2;

  private buildForm() {
    if (!this.employee) this.employee = {} as IEmployee;

    this.emplyoeeForm = this.formBuilder.group({
      name: [this.employee.name, Validators.compose([Validators.required, Validators.pattern(/[a-zA-Z]{2,}/)])],
      salary: [this.employee.salary, Validators.compose([Validators.required, Validators.pattern(/[0-9,]{1,}/)])],
      role: [this.employee.role, Validators.compose([Validators.required])]
    });
  }

  saveEmployee() {
    if (this.emplyoeeForm.invalid) return;

    const employee: IEmployee = {} as IEmployee;
    employee.name = this.emplyoeeForm.get('name').value;
    employee.salary = this.emplyoeeForm.get('salary').value;
    employee.role = this.emplyoeeForm.get('role').value;
    employee.id = this.employee.id;

    if (this.isNew) {
      this.employeeService.addEmployee(employee);
    } else {
      this.employeeService.editEmployee(employee);
    }
    this.editDone.emit();
  }

  cancel() {
    this.editDone.emit()
  }

}

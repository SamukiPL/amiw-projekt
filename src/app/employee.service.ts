import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from './classes/employee';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEmployeeRole } from './classes/employeeRole';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  private employeesSource: BehaviorSubject<IEmployee[]> = new BehaviorSubject([]);
  readonly employees$: Observable<IEmployee[]> = this.employeesSource.asObservable();

  private rolesSource: BehaviorSubject<IEmployeeRole[]> = new BehaviorSubject(ROLES);
  readonly role$: Observable<IEmployeeRole[]> = this.rolesSource.asObservable();

  private employeesRequested: boolean = false;

  getEmployees() {
    if (this.employeesSource.value.length > 0 || this.employeesRequested) {
      return false;
    }

    this.http.get<IEmployee[]>('https://api.jsonbin.io/b/5c6be83c31168c6bb151ba49').subscribe(
      res => this.onGetEmployeeSuccess(res),
      err => this.onGetEmployeeError(err),
      () => this.employeesRequested = true
    );
    return true;
  }

  private onGetEmployeeSuccess(res: IEmployee[]) {
    this.employeesSource.next(res);
    this.employeesRequested = true;
  }

  private onGetEmployeeError(err: any) {
    this.employeesRequested = true;
  }

  addEmployee(employee: IEmployee) {
    const employees = this.employeesSource.value;
    employees.push(employee);
    this.employeesSource.next(employees);
  }

  deleteEmployee(employee: IEmployee) {
    const employees = this.employeesSource.value;
    const idx = employees.findIndex(e => e.id == employee.id);
    if (idx > -1)
      employees.splice(idx, 1)
    this.employeesSource.next(employees);
  }

  editEmployee(employee: IEmployee) {
    const employees = this.employeesSource.value;
    let old = employees.find(e => e.id == employee.id);
    old = employee;
    const idx = employees.findIndex(e => e.id == employee.id);
    employees.splice(idx, 1, employee);
    this.employeesSource.next(employees);
  }

  ngOnDestroy() {
    this.employeesSource.complete();
  }
}

export const ROLES: IEmployeeRole[] = [
  {
    "id": "Janurammer",
    "name": "Janurammer"
  },
  {
    "id": "Senior Janurammer",
    "name": "Senior Janurammer"
  },
  {
    "id": "Regular Janurammer",
    "name": "Regular Janurammer"
  },
  {
    "id": "Księgowa",
    "name": "Księgowa"
  }
]
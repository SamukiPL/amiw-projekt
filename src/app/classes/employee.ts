import { IEmployeeRole } from "./employeeRole";

export interface IEmployee {
    id: string;
    name: string;
    role: IEmployeeRole;
    salary: number;
}
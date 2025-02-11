import { Injectable } from "@angular/core";
import { Employee } from "./employee";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class EmployeeService {
    private apiServerUrl = 'http://localhost:8090';

    constructor(private http: HttpClient){}

    public getEmployees(): Observable<Employee[]>{

        return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
    }

    public addEmployees(employee: Employee): Observable<Employee>{

        return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
    }

    public updateEmployees(employee: Employee): Observable<Employee>{

        return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
    }

    public deleteEmployees(employeeId: number): Observable<void>{

        return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
    }
}
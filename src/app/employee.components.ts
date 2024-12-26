import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  providers: [EmployeeService],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class employeeComponent implements OnInit {

  public employees: Employee[]=[];
  public editEmployee: Employee = {id: 0,name:'',email:'',jobTitle:'',phone:'',imageUrl:'',employeeCode:''};
  public deleteEmployee: Employee = {id: 0 ,name:'',email:'',jobTitle:'',phone:'',imageUrl:'',employeeCode:''};

  constructor(private employeeService: EmployeeService){}
  
  ngOnInit(): void{
    this.loademployees();
    
  }

  loademployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
  }


  public getEmployees(): void {
  
          this.employeeService.getEmployees().subscribe(
            (response: Employee[])=>{
              this.employees = response;
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
      }

      public onAddEmloyee(addForm: NgForm): void{
        document.getElementById('add-employee-form')?.click();
        this.employeeService.addEmployees(addForm.value).subscribe(
          (response: Employee) =>{
            this.getEmployees();
            addForm.reset();
          },
          (error: HttpErrorResponse) =>{
            alert(error.message);
          }
        );
      }

      public onUpdateEmloyee(employee: Employee): void{
        this.employeeService.updateEmployees(employee).subscribe(
          (response: Employee) =>{
            this.getEmployees();
          },
          (error: HttpErrorResponse) =>{
            alert(error.message);
          }
        );
      }

      public onDeleteEmloyee(employeeId: number): void{
        this.employeeService.deleteEmployees(employeeId).subscribe(
          (response: void) =>{
            this.getEmployees();
          },
          (error: HttpErrorResponse) =>{
            alert(error.message);
          }
        );
      }


      public onOpenModaladd(mode: string):void{
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display ='none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'add'){
          button.setAttribute('data-target', '#addEmployeeModal');
        }
        container?.appendChild(button);
        button.click();

      }


      public onOpenModal(employee: Employee, mode: string): void{
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display ='none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'edit') {
          this.editEmployee = employee;
          button.setAttribute('data-target', '#updateEmployeeModal');
        }
        if (mode === 'delete'){
            this.deleteEmployee = employee;
          button.setAttribute('data-target', '#deleteEmployeeModal');
        }
        container?.appendChild(button);
        button.click();

      }
  
}

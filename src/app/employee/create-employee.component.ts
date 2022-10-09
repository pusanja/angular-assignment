import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!:FormGroup;
  fullNameLength=0;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm=this.fb.group({
      fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      email:[''],
        skills: this.fb.group({
          skillName:[''],
          experienceInYears:[''],
          proficiency:['beginner']
        })
     });
    }
  onSubmit(): void{
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls['fullName'].touched);
    console.log(this.employeeForm.get('email')?.value);


  }
  logKeyValuePairs(group:FormGroup): void{
    Object.keys(group.controls).forEach((Key: string)=>{
      const abstractControl=group.get(Key);
      if(abstractControl instanceof FormGroup){
        this.logKeyValuePairs(abstractControl);
      }else{
        abstractControl?.markAsDirty();
      }

    })
  }

  onLoadDataClick(): void{
     this.logKeyValuePairs(this.employeeForm)
    }

}

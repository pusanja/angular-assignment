import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!:FormGroup;
  formErrors = {
    'fullName': '',
    'email': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm=this.fb.group({
      fullName:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
      email:['',Validators.required],
        skills: this.fb.group({
          skillName:['',Validators.required],
          experienceInYears:['',Validators.required],
          proficiency:['',Validators.required]
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
        (this.formErrors as any)[Key]='';
        if(abstractControl && ! abstractControl.valid){
        const messages=(this.validationMessages as any)[Key];

        for( const errorKey in abstractControl.errors){
          if(errorKey){
            (this.formErrors as any)[Key]+=messages[errorKey]+'';
          }
        }
        }

      }


    })
  }

  onLoadDataClick(): void{
     this.logKeyValuePairs(this.employeeForm)
     console.log(this.formErrors);

    }

}

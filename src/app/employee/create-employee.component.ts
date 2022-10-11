import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
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
    'confirmEmail' :'',
    'emailGroup':'',
    'phone':'',
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
      'required': 'Email is required.',
      'emailDomain':'email domain is dell.com '
    },
    'confirmEmail': {
      'required': 'confirmEmail is required.',
      'emailDomain':'email domain is dell.com '
    },
    'emailGroup':{
      'emailMismatch':'email and confirm email do not match'
    },
    'phone': {
      'required': 'phone is required.'
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
      contactPreference:['email'],
      emailGroup: this.fb.group({
        email:['',[Validators.required, CustomValidators.emailDomain('dell.com')]],
      confirmEmail:['',Validators.required]

      },{validator:matchEmail}),

      phone:[''],
        skills: this.fb.group({
          skillName:['',Validators.required],
          experienceInYears:['',Validators.required],
          proficiency:['',Validators.required]
        })
     });
     this.employeeForm.get('contactPreference')?.valueChanges.subscribe((data:string)=>{
     this.onContactPreferenceChange(data);
     });
     this.employeeForm.valueChanges.subscribe((data)=>{
      this.logValidationErrors(this.employeeForm);
     });
    }

  onSubmit(): void{
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls['fullName'].touched);
    console.log(this.employeeForm.get('email')?.value);


  }
  onContactPreferenceChange(selectedValue:string){
    const phoneControl=this.employeeForm.get('phone');
    if(selectedValue=='phone'){
      phoneControl?.setValidators(Validators.required);
    }else{
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
  logValidationErrors(group:FormGroup=this.employeeForm): void{
    Object.keys(group.controls).forEach((Key: string)=>{
      const abstractControl=group.get(Key);

      (this.formErrors as any)[Key]='';
        if(abstractControl && ! abstractControl.valid&&(abstractControl.touched||abstractControl.dirty)){
        const messages=(this.validationMessages as any)[Key];

        for( const errorKey in abstractControl.errors){
          if(errorKey){
            (this.formErrors as any)[Key]+=messages[errorKey]+'';
          }
        }
        }

      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      }


    })
  }

  onLoadDataClick(): void{
    //  this.logValidationErrors(this.employeeForm)
    //  console.log(this.formErrors);

    }
  }
  function matchEmail(group:AbstractControl): {[key:string]:any}|null{
    const emailControl=group.get('email');
    const confirmEmailControl=group.get('confirmEmail');

    if( emailControl ?.value===confirmEmailControl ?.value||confirmEmailControl?.pristine){
           return null;
    } else{
      return{emailMismatch:true};
    }

  }





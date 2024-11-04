import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContractorSpecialty } from 'src/app/models/contractor/contractor.specility';
import { ConstantsService } from 'src/app/services/constants.service';
import { ContractorApiService } from 'src/app/services/contractor/contractor-api/contractor-api.service';

@Component({
  selector: 'app-contractors-form',
  templateUrl: './contractors-form.component.html',
  styleUrl: './contractors-form.component.scss'
})
export class ContractorsFormComponent  implements OnInit {

  isSubmissionSuccessful: boolean = null;
  submitStatus: string = null;
  selectedFile: File;
  
  specialties: ContractorSpecialty[] = ConstantsService.CONTRACTORS_SPECIALTIES

  selectedSpecialties: ContractorSpecialty[] = [];
  selectedCost: string
  constructor(private contractorApiService: ContractorApiService) { }

  ngOnInit(): void {

  }


  formatPhoneNumber(event: Event) {
    const input = (event.target as HTMLInputElement);
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
  
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/^(\d{3})(\d{1,3})/, '$1-$2');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{3})(\d{3})(\d{1,4})/, '$1-$2-$3');
    }
  
    input.value = value;
  }
  formatJobCost(event: Event) {
    const input = (event.target as HTMLInputElement);
    let value = input.value.replace(/[^0-9]/g, ''); // Remove all non-numeric characters
  
    // Format the value with commas and a dollar sign
    if (value) {
      value = parseInt(value, 10).toLocaleString('en-US');
      input.value = `$${value}`;
      this.selectedCost = input.value

    }
  }
 

  clearSubmitStatus() {
    this.submitStatus = null;
    this.isSubmissionSuccessful = null;
  }

  onFilesSelected(event: any) {
    this.selectedFile = event.target.files[0]; 

  }
  onSubmits(form: NgForm) {
    // Log form object and values to the console
    console.log("Form submitted: ", form);
    console.log("Form values: ", form.value);
    console.log("selected file: ", this.selectedFile);
    console.log("Specialties: ", this.selectedSpecialties);
    const skills = this.selectedSpecialties.map(specialty => specialty.name).join(', ');
    console.log("skills: ", skills);
    this.contractorApiService.saveContractor(form.value.contractorName,
       this.selectedCost, skills, form.value.comment,
        form.value.phoneNumber, this.selectedFile).subscribe( 
              (data: {message: string}) => {
          console.log(JSON.stringify(data.message));
          this.isSubmissionSuccessful = true;
          this.submitStatus = data.message;
        },
        (error) => {
          console.error('Error processing file:', error)
          this.submitStatus = error.error.message;
          this.isSubmissionSuccessful = false;
        })  
  }
  
  isValid(form: NgForm): boolean {

    if (form.value.contractorName === ''  || form.value.phoneNumber === '' ||
       this.selectedSpecialties.length === 0) {
      return true
      
    }
    
    return false
  }


}

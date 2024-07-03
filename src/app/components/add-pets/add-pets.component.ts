import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-add-pets',
  templateUrl: './add-pets.component.html',
  styleUrls: ['./add-pets.component.css']

})
export class AddPetsComponent implements OnInit {
  currentStep = 1;
  addPetForAdoptionForm!: FormGroup;
  selectedFileName!: string;
  isLoading: boolean = false;
  currentLang: string = 'ar';
  langSubscription!: Subscription;
  constructor(private toastr: ToastrService, private mainService: MainService) { }

  ngOnInit(): void {
    this.addPetForAdoptionForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      pet_information: new FormGroup({
        name: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        species: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        // weight: new FormControl('', Validators.required),
        breed: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        image_url: new FormControl('', Validators.required),
      })
    })
    this.langSubscription = this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }


  onUpload(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedFileName = selectedFile.name;
      this.addPetForAdoptionForm.get('pet_information')?.get('image_url')?.setValue(selectedFile.name);
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
      };
      fileReader.readAsDataURL(selectedFile);
    }
  }

  addPetForAdoption(fileName: string) {
    this.isLoading = true;
    this.mainService.addItemToJSON(fileName, { id: this.createId(), ...this.addPetForAdoptionForm.value }, () => {
      this.toastr.success('Your request has been sent!', 'Success');
      this.addPetForAdoptionForm.reset();
      this.isLoading = false;
    })
  }
  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  onSubmit() {
    this.addPetForAdoption("adoption-requests.json");
    console.log(this.addPetForAdoptionForm.value);
  }
}

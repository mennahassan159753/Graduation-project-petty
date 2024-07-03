import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.css']
})
export class SheltersComponent implements OnInit {
  shelterRequestForm!: FormGroup;
  selectedFileName!: string;
  petTypes: any[] = [];
  isLoading: boolean = false;
  currentLang: string = 'ar';
  currentStep: number = 1;
  isScrolled: boolean = false;
  langSubscription!: Subscription;

  constructor(private toastr: ToastrService, private mainService: MainService) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
  }

  ngOnInit(): void {
    this.langSubscription = this.mainService.langChange$.subscribe(lang => {
      this.currentLang = lang;
    });
    this.shelterRequestForm = new FormGroup({
      image_url: new FormControl('', Validators.required),
      pet_type: new FormControl('', Validators.required),
      pet_address: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      selectedShelterName: new FormControl('one', Validators.required), // Default value is 'one'
      user_information: new FormGroup({
        name: new FormControl('', Validators.required),
        phone_number: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        user_address: new FormControl('', Validators.required),
      })
    });
  }
  getDirection(): 'ltr' | 'rtl' {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  onUpload(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedFileName = selectedFile.name;
      this.shelterRequestForm.controls['image_url'].setValue(selectedFile.name);
    }
  }

  sendRequestToSelectedShelter(fileName: string) {
    this.isLoading = true;
    this.mainService.addItemToJSON(fileName, { id: this.createId(), ...this.shelterRequestForm.value }, () => {
      this.isLoading = false;
      this.toastr.success('Your request has been sent!', 'Success');
      this.shelterRequestForm.reset();
      this.currentStep = 1;
    });
  }

  onSubmit() {
    const selectedShelterName = this.shelterRequestForm.get('selectedShelterName')?.value;
    console.log(selectedShelterName); // Debugging output
    switch (selectedShelterName) {
      case 'one':
        this.sendRequestToSelectedShelter('shelter-one-requests.json');
        break;
      case 'two':
        this.sendRequestToSelectedShelter('shelter-two-requests.json');
        break;
      case 'three':
        this.sendRequestToSelectedShelter('shelter-three-requests.json');
        break;
      case 'four':
        this.sendRequestToSelectedShelter('shelter-four-requests.json');
        break;
      default:
        console.error('No valid shelter selected');
        break;
    }
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}

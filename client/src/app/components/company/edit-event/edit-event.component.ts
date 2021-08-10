import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { environment as config } from 'src/environments/environment';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  now: any;

  selectedFile: File | undefined;
  
  constructor(private companyService: CompanyService, private router: Router) {}
  
  ngOnInit() {
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async editEvent(form: NgForm) {
    console.log(form.value.time);

    if (form.invalid) {
      return;
    }

    const userId = JSON.parse(localStorage.getItem('user')!).user._id;
    console.log(userId);
    console.log(this.selectedFile);
    let cloudinaryData = new FormData();
    cloudinaryData.append('upload_preset', config.CLAUDINARY_PRESET_NAME);
    cloudinaryData.append('file', this.selectedFile!);

    let cloudinaryResponse = await fetch(
      `${config.CLAUDINARY_API_URL}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryData,
      }
    );

    let image = await cloudinaryResponse.json();
    let imageUrl = image.secure_url;

    console.log(imageUrl);

    const data = {
      name: form.value.name,
      date: form.value.date,
      imageUrl,
      time: form.value.time,
      location: form.value.location,
      description: form.value.description,
      _id: userId,
    };
//EDITEVENTTODO
    this.companyService.createEvent(data).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { PhotoMimeTypesEnum } from './photo-mime-type.enum';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FileUploadModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'primeng-upload';
  @ViewChild(FileUpload) fileUpload?: FileUpload;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  // onUpload(event: any) {
  //   console.log('ssssss', event);

  //   const element = event.currentTarget as HTMLInputElement;
  //   const file: File | null = element?.files ? element?.files[0] : null;
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       const img = new Image();
  //       img.src = reader.result as string;
  //       img.onload = () => {
  //         const logoBase64 = (reader.result as string)
  //           .replace(/\s/g, '')
  //           .split('base64,')[1];
  //         console.log(logoBase64);

  //         const logoContentType = file.type;
  //         // const width = img.width;
  //         // const height = img.height;
  //         // const aspectRatio = width / height;
  //         this.updateOrganization(logoBase64, logoContentType);
  //       };
  //       img.onerror = () => {
  //         console.log('error');
  //       };
  //     };
  //   }
  // }
  onUpload(event: any) {
    // event.files contains the selected files from <p-fileUpload>
    const file: File = event.files[0]; // Assuming single file selection

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          // Extract base64 data from the reader result
          const logoBase64 = (reader.result as string)
            .replace(/\s/g, '')
            .split('base64,')[1];
          const logoContentType = file.type;

          this.updateOrganization(logoBase64, logoContentType);
        };
        img.onerror = () => {
          console.error('Error loading the image');
        };
      };
    }
  }
  updateOrganization(logoBase64: any, logoContentType: any) {
    this.apiService.getOrganizations().subscribe((organizations) => {
      const targetOrg = organizations.find((org: any) => org.id === 117);
      if (targetOrg) {
        const updateOrganizationDto = {
          ...targetOrg,
          logoBase64,
          logoContentType,
          isLogoEdited: true,
        };

        this.apiService
          .updateOrganization('117', updateOrganizationDto)
          .subscribe({
            next: (updatedOrg) => {
              console.log('Organization updated successfully', updatedOrg);
              if (this.fileUpload) this.fileUpload.clear();
            },
            error: (error) => {
              console.error('Error updating organization', error);
            },
          });
      }
    });
  }
}

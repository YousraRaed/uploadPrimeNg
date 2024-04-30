import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Subscription } from 'rxjs';
import {
  loadOrganizations,
  organizationLogoUploaded,
  updateOrganization,
} from '../../../domain/store/actions/organization.actions';
import { AppState } from '../../../domain/store/reducers/app.reducer';
import {
  selectEditOrganization,
  selectOrganizations,
} from '../../../domain/store/selectors/organization.selectors';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FileUploadModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  title = 'primeng-upload';
  @ViewChild(FileUpload) fileUpload?: FileUpload;
  getOrganizationsSubscription?: Subscription;
  updateOrganizationSubscription?: Subscription;

  constructor(private store: Store<AppState>) {} // onUpload(event: any) {

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
    this.store.dispatch(loadOrganizations());
    this.getOrganizationsSubscription = this.store
      .select(selectOrganizations)
      .subscribe((organizations) => {
        if (organizations) {
          const targetOrg = organizations.find((org: any) => org.id === 117);
          if (targetOrg) {
            this.store.dispatch(
              organizationLogoUploaded({
                logoBase64: logoBase64,
                logoContentType: logoContentType,
                isLogoEdited: true,
              })
            );
            this.store.dispatch(updateOrganization(targetOrg));
            this.updateOrganizationSubscription = this.store
              .select(selectEditOrganization)
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
        }
      });
  }

  ngOnDestroy(): void {
    this.updateOrganizationSubscription?.unsubscribe();
    this.getOrganizationsSubscription?.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { MydataserviceService } from './mydataservice.service';
import { Photos, PhotosObj, Profile, ProfileObj } from './_modal';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MydataserviceService]
})
export class AppComponent implements OnInit {
  title = 'app';
  // myPhotosList: Photos[] = [];
  myProfileList: Profile[] = [];
  page: number = 1;
  nextPage: number;
  hasNextPage: boolean = true;
  totalDocs: number;

  constructor(private service: MydataserviceService) { }

  ngOnInit() {
    // this.getPhotos();
    this.getProfiles();
  }

  // docs {Array} - Array of documents
  // totalDocs {Number} - Total number of documents in collection that match a query
  // limit {Number} - Limit that was used
  // hasPrevPage {Bool} - Availability of prev page.
  // hasNextPage {Bool} - Availability of next page.
  // page {Number} - Current page number
  // totalPages {Number} - Total number of pages.
  // offset {Number} - Only if specified or default page/offset values were used
  // prevPage {Number} - Previous page number if available or NULL
  // nextPage {Number} - Next page number if available or NULL

  getProfiles() {
    if (this.hasNextPage === true) {
      this.service.getProfiles(this.page).subscribe((res: any) => {
        this.hasNextPage = res.hasNextPage;
        this.nextPage = res.nextPage;
        this.onProfileSuccess(res.docs);
      });
    }
  }

  onProfileSuccess(res) {
    console.log(res);
    if (res !== undefined) {
      // this.myPhotosList = [];
      res.forEach(item => {
        this.myProfileList.push(new ProfileObj(item));
      });
    }
  }

  // getPhotos() {
  //   console.log(this.page);
  //   this.service.getMyPhotos(this.page).subscribe((res) => this.onSuccess(res));
  // }

  // onSuccess(res) {
  //   console.log(res);
  //   if (res !== undefined) {
  //     // this.myPhotosList = [];
  //     res.forEach(item => {
  //       this.myPhotosList.push(new PhotosObj(item));
  //     });
  //   }
  // }

  onScroll() {
    console.log('scrolled');
    this.page = this.page + 1;
    // this.getPhotos();
    this.getProfiles();
  }

  getAccess(one, two, three, four): string {
    const a = ['', one, two, three, four];
    let access: string;
    access = '';
    for (let i = 1; i < 5; i++) {
      access = access + this.getCode(a[i], i.toString());
    }
    return access;
  }

  getCode(value, code): string {
    switch (value) {
      case 'notSelected':
        return '';
        case 'selected':
        return `Code ${code} ` ;
      }
  }

  OnMatCardClickEvent(item): void {
    console.log(item);
  }

}

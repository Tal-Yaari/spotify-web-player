import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { ApiService } from '../../services/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchBar: Subject<boolean> = new Subject<boolean>();
  constructor(private router: Router, private apiService: ApiService) { }

  searchGetCall(keyword: string) {
    if (keyword === '') {
      this.router.navigateByUrl('/search');
    } else {
    this.router.navigateByUrl('/search/' + keyword);
  }
  }
}

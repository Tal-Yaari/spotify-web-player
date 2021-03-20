import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import {  NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  apiResponse: any;
  isSearching: boolean;
  isSearchPage: boolean = false;


    constructor(private headerService: HeaderService, private router: Router, private searchService:SearchService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((val: NavigationEnd) => {
      this.isSearchPage = this.router.url.indexOf('search') != -1;
    });

    this.headerService.searchBar
    .pipe(debounceTime(1000), distinctUntilChanged())
    .subscribe((term) => {
      this.searchService.searchGetCall(term);
    });
  }

  onKeyUp(e) {
    this.headerService.searchBar.next(e.target.value);
  }
  
  goBack() {
    
  }
  
}
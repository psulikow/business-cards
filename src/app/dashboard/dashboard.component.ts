import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { BusinessCard } from '../business-card';
import {AlertService} from "../services/alert.service";
import {HistoryService} from "../history/history.service";
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstName: string;
  lastName: string;
  result: string;
  searchForm: FormGroup;
  loadComponent:boolean;
  businessCards: BusinessCard[];
  searchResult: boolean;
  businessCardSearchResults: any;
  clearAlert: boolean;

  constructor(private dashboardService: DashboardService,
              private formBuilder: FormBuilder,
              private dbService: DatabaseService,
              private alertService: AlertService,
              private historyService: HistoryService,
              private loginService: LoginService
              ) {
    this.searches = [];
    this.searchResult = false;
    this.businessCardSearchResults = new Array();
    this.clearAlert = false;
  }

  loadMyChildComponent() {
    this.loadComponent = true;
    this.searchResult = false;
    this.alertService.clearDiv();
  }

  get f() { return this.searchForm.controls; }

  public clear() {
    this.businessCardSearchResults = [];
  }

  getCardFromSearch() {
    if ( !this.f.fullName.value && !this.f.email.value  ) {
      this.alertService.error("Please enter either a last name or an email to search.");
      return;
    } else if ( this.f.email.value) {
      console.log(this.f.email.value);

      this.historyService.addToHistory("An email search for: " + this.f.email.value + " was executed by: " + this.loginService.getEmail());
      this.clear();
      this.dashboardService.getBusinessCardByEmail(this.f.email.value)
        .subscribe((queryResult: any) => {
          console.log(queryResult);
          let businessCardSearch = queryResult;
          console.log(businessCardSearch.length)
          if(businessCardSearch.length > 0) {
            this.searchResult = true;
            // console.log(businessCardSearch);
            // let bc = new BusinessCard();
            // bc.firstName = businessCardSearch.firstName;
            // bc.lastName = businessCardSearch.lastName;
            // bc.email = businessCardSearch.email;
            // bc.imageUri = businessCardSearch.imageUri;
            // bc.extraText = businessCardSearch.extraText;
            // bc.phoneNumber = businessCardSearch.phoneNumber;
            this.businessCardSearchResults = queryResult;
            this.alertService.success("A match was found!");        }
          else if (  businessCardSearch.length === 0 ) {
            this.alertService.error("No contact found in business card database!");
            return;
          }
        });
    } else {
      console.log(this.f.fullName.value);

      this.historyService.addToHistory("A last name search for: " + this.f.fullName.value + " was executed by: " + this.loginService.getEmail());
      this.clear();
      this.dashboardService.getBusinessCardByName(this.f.fullName.value)
        .subscribe((queryResult: any) => {
          console.log(queryResult);
          let businessCardSearch = queryResult;
          console.log(businessCardSearch.length)
          if(businessCardSearch.length > 0) {
            this.searchResult = true;
            // console.log(businessCardSearch);
            // let bc = new BusinessCard();
            // bc.firstName = businessCardSearch.firstName;
            // bc.lastName = businessCardSearch.lastName;
            // bc.email = businessCardSearch.email;
            // bc.imageUri = businessCardSearch.imageUri;
            // bc.extraText = businessCardSearch.extraText;
            // bc.phoneNumber = businessCardSearch.phoneNumber;
            this.businessCardSearchResults = queryResult;
            this.alertService.success("A match was found!");        }
          else if (  businessCardSearch.length === 0 ) {
            this.alertService.error("No contact found in business card database!");
            return;
          }
        });
    }
  }

  ngOnInit() {
    this.searchResult = false;
    this.alertService.clearDiv();
    this.searchForm = this.formBuilder.group({
    fullName: [''],
    email: ['']
    });

    this.dbService.getAllBusinessCards().subscribe(
      (results) => {
        console.log('Was able to get all business cards!');
        console.log(results);

        this.businessCards = results;
      },
      (error) => {
        console.log('Was not able to get business cards because:  ' + error);
      }
    );
  }
}

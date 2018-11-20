import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import {CSC436} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BusinessCard } from '../business-card';
import { DatabaseService } from '../services/database.service';
import {HistoryService} from "../history/history.service";
import { NgxAnalytics } from 'ngx-analytics';
import {AlertService} from "../services/alert.service";

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  API: string;

  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    private http: HttpClient,
    private dbService: DatabaseService,
    private historyService: HistoryService,
    private ngx: NgxAnalytics,
    private alertService: AlertService) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searchHistory`);
    this.API = CSC436.apiKey;
  }

  public textDetection(webcamImage) {

  this.ngx.eventTrack.next({
    action: 'User clicked for text detection',
    properties: {
      category: 'Text Detection',
      label: 'myLabel',
    },
  });

    const request: any = {
      'requests': [
        {
          'image': {
            "content": webcamImage
          },
          'features': [
            {
              'type': 'TEXT_DETECTION',
              'maxResults': 1,
            }
          ]
        }
      ]
    };

    let options = {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    const url = `https://vision.googleapis.com/v1/images:annotate?key=${this.API}`;
    this.http.post(
      url,
      request, options
    ).subscribe( (results: any) => {
      console.log('RESULTS RESULTS RESULTS');
      console.log(results);
      console.log(results.responses[0].fullTextAnnotation.text);
      console.log('RESULTS RESULTS RESULTS');

      let businessCard = this.getBusinessCardInfo(results, webcamImage);

      this.addBusinessCardToDB(businessCard);

    });
  }

  getBusinessCardInfo(result, base64) {
    let businessCard = new BusinessCard();

    let textResult = result.responses[0].fullTextAnnotation.text;

    console.log(this.getPhoneNumber(textResult));
    businessCard.phoneNumber = this.getPhoneNumber(textResult);
    console.log(this.getEmail(textResult));
    businessCard.email = this.getEmail(textResult);

    let fullName = this.getFullName(textResult).split(" ");

    console.log(fullName);

    businessCard.firstName = fullName[0].toLowerCase();
    businessCard.lastName = fullName[fullName.length - 1].toLowerCase();
    businessCard.extraText = 'stuff';
    businessCard.imageUri = base64;

    this.historyService.addToHistory("Text detection was executed for: " + this.loginService.getEmail());

    return businessCard;
  }

  addBusinessCardToDB(businessCard: BusinessCard) {
    this.dbService.addBusinessCard(businessCard).then(
      (_) => {
        console.log('Added the business card to Firebase with no errors!');
      },
      (error) => {
        console.log('Adding business card to Firebase was not successful and resulted in this error: ' + error);
      }
    );
  }

  getBusinessCardByName(name: string) {
    let lowerAndTrimmed = name.toLowerCase().trim();
    console.log('searching for: ' + lowerAndTrimmed);
    if (lowerAndTrimmed === ''){
      return this.db.list(`/businessCards/`,
        (ref) =>
          ref
            .orderByChild("lastName")
      ).valueChanges()
    } else  {
      return this.db.list(`/businessCards/`,
        (ref) =>
          ref
            .orderByChild("lastName")
            .equalTo(lowerAndTrimmed)
      ).valueChanges()
    }
  }

  getBusinessCardByEmail(name: string) {
    let lowerAndTrimmed = name.toLowerCase().trim();
    console.log('searching for: ' + lowerAndTrimmed);
    if (lowerAndTrimmed === ''){
      return this.db.list(`/businessCards/`,
        (ref) =>
          ref
            .orderByChild("email")
      ).valueChanges()
    } else  {
      return this.db.list(`/businessCards/`,
        (ref) =>
          ref
            .orderByChild("email")
            .equalTo(lowerAndTrimmed)
      ).valueChanges()
    }
  }

  // credit to internet, seems to work
  getFirstName(text: string): string {
    let nRegex = new RegExp(/\b[A-Z][a-z]{1,10}/, 'g');

    let res = nRegex.exec(text);

    return res !== null ? res[0] : '';
  }

  // credit to internet, seems to work
  getFullName(text: string): string {
    let nRegex = new RegExp(/([A-Z]\.?\s?)*([A-Z][a-z]+\.?\s?)+([A-Z]\.?\s?[a-z]*)*/, 'g');

    let res = nRegex.exec(text);

    return res !== null ? res[0] : '';
  }

  // credit to internet, seems to work
  getEmail(text: string): string {
    let eRegex = new RegExp(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, 'g');

    let res = eRegex.exec(text);

    return res !== null ? res[0] : '';
  }

  // credit to internet, seems to work
  getPhoneNumber(text: string): string {
    let pRegex = new RegExp(/((\d)\D)?(\(?(\d\d\d)\)?)?\D(\d\d\d)\D(\d\d\d\d)/, 'g');

    let res = pRegex.exec(text);

    return res !== null ? res[0] : '';
  }

  logout() {
    this.loginService.signOut();
  }

}

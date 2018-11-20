import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BusinessCard } from '../business-card';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  BCR: any;
  UHR: any;

  constructor(private db: AngularFireDatabase) {
    this.BCR = this.db.list('businessCards');
    this.UHR = this.db.list('history');
  }

  addBusinessCard(businessCard: BusinessCard): Promise<any> {
    return this.BCR.push(businessCard);
  }

  getAllBusinessCards() {
    return this.BCR.valueChanges();
  }
}


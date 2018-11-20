import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class HistoryService {
  private HR: any;
  private path: string;

  constructor(private db: AngularFireDatabase) {
    this.path = `/currentSession/businesscardreader/searches`;
    this.HR =
      this.db.list(this.path);
  }

  getSearchHistory() {
    return this.HR.valueChanges();
  }

  addToHistory(searchEntry) {

    this.db
      .object(this.path)
      .update({
        [Date.now()]: {
          timestamp: Date.now(),
          searchTerm: searchEntry
        }
      });
  }
}

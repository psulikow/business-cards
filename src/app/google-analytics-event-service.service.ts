import { Injectable } from '@angular/core';

declare const gtag: Function;


@Injectable()

export class GoogleAnalyticsEventServiceService {

  public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {
    gtag('send', 'event', { eventCategory, eventLabel, eventAction, eventValue });
  }}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistServiceService {

  constructor() { }

  getDateAdded(addedAt) {
    let addedAtStr = addedAt.toString();
    let returnStr = '';
    if (addedAtStr != '') {
      let year = addedAtStr.split('-')[0];
      let month = +addedAtStr.split('-')[1] - 1;
      let day = addedAtStr.split('-')[2].split('T')[0];
      let dateObj = new Date(year, month, day);
      returnStr = `${dateObj.toString().split(' ')[1]} ${
        dateObj.toString().split(' ')[2]
      }, ${dateObj.toString().split(' ')[3]}`;
    }
    return returnStr;
  }

  convertMsToHours(totalTime: boolean, durationMs) {
    let h, m, s;
    h = Math.floor(durationMs / 1000 / 60 / 60);
    m = Math.floor((durationMs / 1000 / 60 / 60 - h) * 60);
    s = Math.floor(((durationMs / 1000 / 60 / 60 - h) * 60 - m) * 60);
    if (totalTime) {
      return `${h} hr ${m} min`;
    } else {
      return `${m}:${s < 10 ? '0' + s : s}`;
    }
  }
}

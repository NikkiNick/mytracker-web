import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrackerRecord } from './tracker-record.model';
import { TrackerRecordDTO } from './tracker-recordDTO.model';

@Injectable({
  providedIn: 'root'
})
export class TrackerRecordService {
  apiUrl = `${environment.apiUrl}trackerrecord/`;

  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<TrackerRecord> {
    return this.httpClient.get<TrackerRecord>(`${this.apiUrl + id}`, {});
  }

  insert(record: TrackerRecordDTO): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}`, record);
  }

  update(record: TrackerRecord): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}${record.id}`, record);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}${id}`);
  }
}

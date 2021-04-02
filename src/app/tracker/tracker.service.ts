import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tracker } from './tracker.model';
import { TrackerDTO } from './trackerDTO.model';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  apiUrl = `${environment.apiUrl}tracker/`;

  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<Tracker> {
    return this.httpClient.get<Tracker>(`${this.apiUrl + id}`, {});
  }

  getAll(): Observable<Tracker[]> {
    return this.httpClient.get<Tracker[]>(this.apiUrl, {});
  }

  insert(tracker: Tracker): Observable<any> {
    const dto = TrackerDTO.create(tracker);
    return this.httpClient.post(`${this.apiUrl}`, dto);
  }

  update(tracker: Tracker): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}${tracker.id}`, tracker);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}${id}`);
  }

}

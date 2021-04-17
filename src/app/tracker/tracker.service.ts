import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { compareDesc } from 'date-fns';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CrudService, CrudServiceOptions } from '../shared/crud/crud.service';
import { Tracker } from './tracker.model';
import { TrackerSerializer } from './tracker.serializer';
import { TrackerDTO } from './trackerDTO.model';

@Injectable({
    providedIn: 'root'
})
export class TrackerService extends CrudService<Tracker, TrackerDTO> implements ITrackerService {

    constructor(@Inject('TrackerServiceConfig') options: CrudServiceOptions<Tracker>, protected httpClient: HttpClient) {
        super(options, httpClient, new TrackerSerializer());
    }
    getAll(): Observable<Tracker[]> {
        return super.getAll()
                    .pipe(
                        tap((t: Tracker[]) => t.forEach(tr => tr.records.sort((d1, d2) => compareDesc(new Date(d1.date), new Date(d2.date))))));
    }

}

export interface ITrackerService {}

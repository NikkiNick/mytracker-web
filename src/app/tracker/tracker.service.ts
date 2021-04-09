import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService, CrudServiceOptions } from '../shared/crud/crud.service';
import { Tracker } from './tracker.model';
import { TrackerSerializer } from './tracker.serializer';
import { TrackerDTO } from './trackerDTO.model';

@Injectable({
    providedIn: 'root'
})
export class TrackerService extends CrudService<Tracker, TrackerDTO> implements ITrackerService{

    constructor(@Inject("TrackerServiceConfig") options: CrudServiceOptions<Tracker>, protected httpClient: HttpClient) {
        super(options, httpClient, new TrackerSerializer());
        console.log("Tracker:"+ this.apiUrl);
       }

}
 
export interface ITrackerService{}
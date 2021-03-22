import { Injectable } from '@angular/core';
import { Tracker } from './tracker.model';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  getAll(): Array<Tracker>{
    return [
      { id: "1", name: "Test", created: new Date(), color: "#ff0000" },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() },
      { id: "2", name: "Water", created: new Date() }
    ]
  }

}

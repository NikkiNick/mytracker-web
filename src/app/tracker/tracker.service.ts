import { Injectable } from '@angular/core';
import { Tracker } from './tracker.model';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  trackers: Tracker[] = [
    { id: 1, name: "Test", created: new Date(), color: "#ff0000" },
    { id: 2, name: "Water", created: new Date() },
    { id: 3, name: "Water", created: new Date() },
    { id: 4, name: "Water", created: new Date() },
    { id: 5, name: "Water", created: new Date() },
  ];

  getById(id: number): Tracker {
    return this.trackers.find(t => t.id === id);
  }

  getAll(): Array<Tracker>{
    return this.trackers;
  }

  insert(tracker: Tracker) {
    this.trackers.push(tracker);
  }

  update(tracker: Tracker){
    let index = this.trackers.findIndex(t => t.id === tracker.id)
    if(index !== -1){
      this.trackers[index] = tracker;
    }
  }

  delete(id: number){
    const index = this.trackers.findIndex(e => e.id === id);
    if(index !== -1){
      this.trackers.splice(index, 1);
    }
  }

}

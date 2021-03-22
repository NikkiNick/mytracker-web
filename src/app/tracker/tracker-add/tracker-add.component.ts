import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Tracker } from '../tracker.model';

@Component({
  selector: 'app-tracker-add',
  templateUrl: './tracker-add.component.html',
  styleUrls: ['./tracker-add.component.scss']
})
export class TrackerAddComponent implements OnInit {

  currentTracker: Tracker

  form = this.fb.group({
    trackerName: ['', [ Validators.required ]],
    trackerUnitType: ['', [ Validators.required ]],
    trackerRecordLength: [4, [ Validators.required, Validators.min(1), Validators.max(8) ]],
    trackerRecordPrecision: [2, [ Validators.required, Validators.min(0), Validators.max(6) ]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.currentTracker = new Tracker()
  }

  onSubmit(){
    console.log(this.currentTracker)
  }

}

import { Component, Input, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../assets/CanvasJS/canvasjs.min.js';
import { Tracker } from '../../tracker.model.js';

@Component({
  selector: 'app-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.scss']
})
export class ChartPanelComponent implements OnInit {

  @Input() tracker?: Tracker;

  constructor() { }

  ngOnInit(): void {
    let dataPoints = [];
    let y = 0;		
    let recs = this.tracker.records.sort((r1, r2) => r1.date.valueOf() - r2.date.valueOf());
    for(let record of recs){
      dataPoints.push({x: new Date(record.date), y: record.amount});
    
    }
    let chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: false,
      data: [
      {
        type: "line",                
        dataPoints: dataPoints
      }],
      toolTip: {
        enabled: true,
        borderColor: this.tracker.color,
        backgroundColor: this.tracker.color+'60',
        cornerRadius: 5
      },
      axisY: {
        suffix: ` ${this.tracker.unitType.shortName}`
      }
    });
      
    chart.render();
  }

}

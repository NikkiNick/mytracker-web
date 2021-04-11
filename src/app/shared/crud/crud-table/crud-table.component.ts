import { ComponentType } from '@angular/cdk/portal';
import { AfterContentInit, Component, ContentChildren, Input, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/dialog-data.model';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from '../../snackbar/snack-bar.service';
import { ICrudService } from '../crud.service';
import { IBaseModel } from '../models/ibase-model';
import { TableColumnDirective } from './table-column.directive';
import { ManipulationDialogComponent } from '../manipulation-dialog/manipulation-dialog.component';
import { ManipulationDialogData } from '../manipulation-dialog/manipulation-dialog-data.model';

@Component({
    selector: 'app-crud-table',
    templateUrl: './crud-table.component.html',
    styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent<T extends IBaseModel> implements OnInit, AfterContentInit, OnChanges {
    
    columnsToDisplay: string[] = [];
    tableDataSource: MatTableDataSource<T>;
    @ContentChildren(TableColumnDirective) columns: QueryList<TableColumnDirective>;

    @Input() heading?: string;
    @Input() data: T[];
    @Input() service: ICrudService<T>;
    @Input() detailUrl: string;
    @Input() manipulationDialog: ComponentType<ManipulationDialogComponent<T>>;
    
    constructor(
        private dialog: MatDialog,
        private snackbarService: SnackBarService,
        private router: Router) { 
        this.tableDataSource = new MatTableDataSource<T>(this.data);
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes.data.previousValue){
            this.tableDataSource = new MatTableDataSource<T>(this.data);
        }
    }

    ngAfterContentInit(): void {    
        this.columns.forEach((col: TableColumnDirective) => this.columnsToDisplay.push(col.columnName));
        if(this.service || this.detailUrl){
            this.columnsToDisplay.push('Actions');
        }
    }
   

    ngOnInit(): void {
    }

    openManipulationDialog(id: number){
        this.dialog.closeAll();
        const dialogRef = this.dialog.open(this.manipulationDialog, { data: { modelId: id } as unknown as ManipulationDialogData });
        dialogRef.componentInstance.service = this.service;
    }

    openDeleteConfirmationDialog(id: number){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { title: $localize`:@@delete-dialog-title:Please confirm`, message: $localize`:@@delete-dialog-message:Are you sure you want to delete this item?` } });
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.service.delete(id).subscribe(
                    () => {
                        this.snackbarService.show($localize`:@@deleted-ok:Item succesfully deleted`);
                        this.router.navigateByUrl(this.router.url);
                    },
                    (err) => this.snackbarService.showHttpError(err));
            }
        });
    }

}

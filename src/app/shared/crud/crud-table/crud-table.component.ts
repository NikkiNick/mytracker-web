import { ComponentType } from '@angular/cdk/portal';
import { AfterContentInit, Component, ContentChild, ContentChildren, Input, OnInit, QueryList, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { SnackBarService } from '../../snackbar/snack-bar.service';
import { ICrudService } from '../crud.service';
import { IBaseModel } from '../models/ibase-model';
import { ManipulationDialogComponent } from '../manipulation-dialog/manipulation-dialog.component';
import { ManipulationDialogData } from '../manipulation-dialog/manipulation-dialog-data.model';
import { MatPaginator } from '@angular/material/paginator';
import { TableColumnDirective } from './directives/table-column.directive';
import { GridCardTitleDirective } from './directives/grid-card-title.directive';
import { GridCardContentDirective } from './directives/grid-card-content.directive';

@Component({
    selector: 'app-crud-table',
    templateUrl: './crud-table.component.html',
    styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent<T extends IBaseModel> implements OnInit, AfterContentInit {
    
    columnsToDisplay: string[] = [];
    tableDataSource: MatTableDataSource<T>
    isLoading: boolean = true;
    currentDisplayMode: 'table' | 'grid';
    renderedItems: T[];

    @Input() heading?: string;
    @Input() service: ICrudService<T>;
    @Input() detailUrl: string;
    @Input() showAddButton?: boolean = true;
    @Input() itemsPerPage?: number[] = [10, 25, 50];
    @Input() displayModes?: Array<'table' | 'grid'> = ['table', 'grid'];
    @Input() manipulationDialog: ComponentType<ManipulationDialogComponent<T>>;
    @ContentChildren(TableColumnDirective) columns: QueryList<TableColumnDirective>;
    @ContentChild(GridCardTitleDirective) gridCardTitleTemplate: GridCardTitleDirective;
    @ContentChild(GridCardContentDirective) gridCardContentTemplate: GridCardTitleDirective;
    @ViewChild('paginator', { static: false }) set paginator(pager:MatPaginator) {
        if (pager) this.tableDataSource.paginator = pager;
    }
    @ContentChild('gridCardContainer', { static: false, read: ViewContainerRef }) gcVcRef: ViewContainerRef;
    @ViewChild('actions', { read: TemplateRef }) actions: TemplateRef<any>;
    constructor(
        private dialog: MatDialog,
        private snackbarService: SnackBarService,
        private router: Router,
        private renderer: Renderer2) {
            this.tableDataSource = new MatTableDataSource();
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     if(changes.data.previousValue){
    //         this.initTable();

    //     }
    // }

    ngAfterContentInit(): void {    
        this.columns.forEach((col: TableColumnDirective) => this.columnsToDisplay.push(col.columnName));
        if(this.service || this.detailUrl){
            this.columnsToDisplay.push('Actions');
        }
        this.currentDisplayMode = this.displayModes[0];
        this.initTable();
    }
   

    ngOnInit(): void {
    }

    private initTable(){
        this.service.getAll().subscribe(
            (res: T[]) => {
                this.tableDataSource.data = res;
                this.tableDataSource.connect().subscribe((d) => this.renderedItems = d);
                this.isLoading = false;
            },
            (err) => this.snackbarService.showHttpError(err),
         );
        
    }

    openManipulationDialog(id?: number){
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

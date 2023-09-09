import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DialogAddEditComponent} from "./dialogs/dialog-add-edit/dialog-add-edit.component";
import {DialogDeleteComponent} from "./dialogs/dialog-delete/dialog-delete.component";

import {Person} from "./interface/person";
import {PersonService} from "./services/person.service";

import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'rut' , 'firstName', 'lastName', 'phone', 'actions'];
  dataSource = new MatTableDataSource<Person>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private personService:PersonService, public dialog:MatDialog, private snackBar: MatSnackBar) {
  
  }
  
  newPersonDialog() {
    this.dialog.open(DialogAddEditComponent, {
      disableClose:true, width:"350px"
    }).afterClosed().subscribe(result =>{
      if (result === "creado"){
        this.getPersons();
      }
    });
  }
  
  showAlert(msg: string, action: string) {
    this.snackBar.open(msg, action, {
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }
  
  editPersonDialog(personData:Person){
    this.dialog.open(DialogAddEditComponent, {
      disableClose:true, width:"350px", data: personData
    }).afterClosed().subscribe(result =>{
      if (result === "editado"){
        this.getPersons();
      }
    });
  }
  
  deletePersonDialog(personData:Person){
    this.dialog.open(DialogDeleteComponent, {
      disableClose:true, data: personData
    }).afterClosed().subscribe(result =>{
      if (result === "eliminar"){
        this.personService.delete(personData.id).subscribe({
          next:(data)=>{
            this.showAlert("La persona ha sido eliminada.", "Listo");
            this.getPersons();
          },error:(e)=>{
            this.showAlert("No se pudo eliminar", "Error")
          }
        })
      }
    });
  }
  
  ngOnInit() {
    this.getPersons();
  }
  
  getPersons(){
    this.personService.getList().subscribe({
        next:(dataResponse) => {
          this.dataSource.data = dataResponse;
        }, error:(e) =>{}
      }
    );
  }
  
  
  /**
   * Método que se encarga de la paginación de la tabla.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  /**
   * Método que se encarga del filtro de la tabla.
   * @param event Evento.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

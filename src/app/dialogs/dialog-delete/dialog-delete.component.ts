import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Person } from "../../interface/person";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PersonService} from "../../services/person.service";

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit{
  
  actionTitle: string = "Eliminar";
  
  constructor
  (private dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPerson: Person)
  {

  }
  
  ngOnInit(): void {
  }

  confirmDelete(){
    if (this.dataPerson){
      this.dialogRef.close("eliminar");
    }
  }
  
}

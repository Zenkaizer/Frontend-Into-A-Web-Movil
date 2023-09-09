import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DATE_FORMATS } from "@angular/material/core";

import { Person } from "../../interface/person";
import { PersonService } from "../../services/person.service";

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css']
})
export class DialogAddEditComponent implements OnInit{
  
  personForm: FormGroup;
  actionTitle: string = "Nueva";
  actionButton: string = "Guardar";
  
  
  constructor(
    private dialogRef: MatDialogRef<DialogAddEditComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public dataPerson: Person) {
    
    this.personForm = this.formBuilder.group({
      rut:['', Validators.required],
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      phone:['', Validators.required],
    })
  }
  
  showAlert(msg: string, action: string) {
    this.snackBar.open(msg, action, {
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }
  
  addEditPerson(){
    const model: Person ={
      id: 0,
      rut: this.personForm.value.rut,
      firstName: this.personForm.value.firstName,
      lastName: this.personForm.value.lastName,
      phone: this.personForm.value.phone,
    }
    
    if (this.dataPerson != null){
      // Update the id in the model for the json correct generation.
      model.id = this.dataPerson.id;
      this.personService.update(this.dataPerson.id, model).subscribe({
        next:(data)=>{
          this.showAlert("La Persona ha sido actualizada.", "Listo")
          this.dialogRef.close("editado");
        },error:(e)=>{
          this.showAlert("No se pudo editar", "Error")
        }
      })
    }
    else {
      this.personService.add(model).subscribe({
        next:(data)=>{
          this.showAlert("La Persona ha sido creada.", "Listo")
          this.dialogRef.close("creado");
        },error:(e)=>{
          this.showAlert("No se pudo crear", "Error")
        }
      })
    }
  }
  
  ngOnInit(): void {
  
    if (this.dataPerson){
      this.personForm.patchValue({
        idPerson: this.dataPerson.id,
        rut: this.dataPerson.rut,
        firstName: this.dataPerson.firstName,
        lastName: this.dataPerson.lastName,
        phone: this.dataPerson.phone
      })
    }
    
    this.actionTitle = "Editar";
    this.actionButton = "Actualizar";
  
  }

}

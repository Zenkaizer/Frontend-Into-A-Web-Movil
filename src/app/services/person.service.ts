import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../enviroments/environment";
import { Observable } from "rxjs";
import { Person } from "../interface/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private endpoint:string = environment.apiUrl;
  private apiUrl:string = this.endpoint + "persons/"
    
  constructor(private http:HttpClient) { }
  
  /**
   * Método que obtiene a todas las personas del sistema.
   */
  getList():Observable<Person[]>{
    return this.http.get<Person[]>(`${this.apiUrl}`)
    // En this.apiUrl es la url de personas, o sea todas las del sistema.
  }
  
  /**
   * Método que obtiene a una sola persona del sistema.
   * @param idPerson ID de la persona.
   */
  getOne(idPerson:number):Observable<Person>{
    return this.http.get<Person>(`${this.apiUrl}${idPerson}`)
    // En this.apiUrl es la url de personas, o sea todas las del sistema.
  }
  
  /**
   * Método que se encarga de la agregación de una persona.
   * @param model Persona con los datos a agregar.
   */
  add(model:Person):Observable<Person>{
    return this.http.post<Person>(`${this.apiUrl}`, model);
  }
  
  /**
   * Método que se encarga de la actualización de algún dato de una persona.
   * @param idPerson ID de la persona.
   * @param model Persona con los datos actualizados.
   */
  update(idPerson:number, model:Person):Observable<Person>{
    return this.http.put<Person>(`${this.apiUrl}${idPerson}`, model);
  }
  
  /**
   * Método que se encarga de la eliminación de una persona.
   * @param idPerson ID de la persona.
   */
  delete(idPerson:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}${idPerson}`);
  }
  
}

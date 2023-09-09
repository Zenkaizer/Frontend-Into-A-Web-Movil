import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../enviroments/environment";
import { Observable } from "rxjs";
import { Book } from "../interface/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  private endpoint:string = environment.apiUrl;
  private apiUrl:string = this.endpoint + "books/"
  
  constructor(private http:HttpClient) { }
  
  /**
   * Método que obtiene a todos los libros del sistema.
   */
  getList():Observable<Book[]>{
    return this.http.get<Book[]>(`${this.apiUrl}`)
    // En this.apiUrl es la url de libros, o sea todos los del sistema.
  }
  
  /**
   * Método que obtiene a un solo libro del sistema.
   * @param idBook ID del libro.
   */
  getOne(idBook:number):Observable<Book>{
    return this.http.get<Book>(`${this.apiUrl}/${idBook}`)
    // En this.apiUrl es la url de personas, o sea todas las del sistema.
  }
  
  /**
   * Método que se encarga de la agregación de un libro.
   * @param model Libro con los datos a agregar.
   */
  add(model:Book):Observable<Book>{
    return this.http.post<Book>(`${this.apiUrl}`, model);
  }
  
  /**
   * Método que se encarga de la actualización de algún dato de un libro.
   * @param idBook ID del libro.
   * @param model Libro con los datos actualizados.
   */
  update(idBook:number, model:Book):Observable<Book>{
    return this.http.put<Book>(`${this.apiUrl}/${idBook}`, model);
  }
  
  /**
   * Método que se encarga de la eliminación de un libro.
   * @param idBook ID del libro.
   */
  delete(idBook:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${idBook}`);
  }
}

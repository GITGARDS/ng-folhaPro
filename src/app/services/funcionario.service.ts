import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { delay } from "rxjs";
import { environment } from "../../environments/environment.development";
import { FuncionarioModel } from "../models/funcionario";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private url = environment.apiUrl + '/funcionarios';
  private httpCliente = inject(HttpClient);
  private isDelay = 500;

  findAll() {
    return this.httpCliente.get<FuncionarioModel[]>(this.url);
  }

  findById(id: number) {
    return this.httpCliente.get<FuncionarioModel>(`${this.url}/${id}`).pipe(delay(this.isDelay));
  }

  create(funcionario: FuncionarioModel) {
    return this.httpCliente.post<FuncionarioModel>(this.url, funcionario).pipe(delay(this.isDelay));
  }

  updateById(funcionario: FuncionarioModel) {
    return this.httpCliente
      .put<FuncionarioModel>(`${this.url}/${funcionario.id}`, funcionario)
      .pipe(delay(this.isDelay));
  }

  deleteById(id: number) {
    return this.httpCliente.delete<FuncionarioModel>(`${this.url}/${id}`);
  }
}

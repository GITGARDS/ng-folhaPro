import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { FuncionarioModel } from "../models/funcionario";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private url = environment.apiUrl + '/funcionarios';
  private httpCliente = inject(HttpClient);
  funcionarios = signal<FuncionarioModel[]>([]);

  getTotalSalarioBase(): number {
    return this.funcionarios().reduce((total, f) => total + f.salarioBase, 0);
  }

  getTotalFuncionariosAtivos(): number {
    return this.funcionarios().filter((f) => f.ativo === true).length;
  }

  findAll() {
    if (this.funcionarios().length === 0) {
      this.httpCliente.get<FuncionarioModel[]>(this.url).subscribe({
        next: (funcionarios) => {
          this.funcionarios.set(funcionarios);
        },
      });
    }
  }

  findById(id: number) {
    return this.httpCliente.get<FuncionarioModel>(`${this.url}/${id}`);
  }

  create(funcionario: FuncionarioModel) {
    return this.httpCliente.post<FuncionarioModel>(this.url, funcionario).subscribe({
      next: (funcionario) => {
        this.funcionarios.update((current) => [...current, funcionario]);
        return funcionario;
      },
    });
  }

  updateById(funcionario: FuncionarioModel) {
    return this.httpCliente
      .put<FuncionarioModel>(`${this.url}/${funcionario.id}`, funcionario)
      .subscribe({
        next: (funcionario) => {
          this.funcionarios.update((current) =>
            current.map((f) => (f.id === funcionario.id ? funcionario : f)),
          );
          return funcionario;
        },
      });
  }

  deleteById(id: number) {
    return this.httpCliente.delete<FuncionarioModel>(`${this.url}/${id}`).subscribe({
      next: () => {
        this.funcionarios.update((current) => current.filter((f) => f.id !== id));
      },
    });
  }
}

import { Injectable } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { Observable, delay } from "rxjs";
import { db } from "../../firebase";
import { FuncionarioModel } from "../models/funcionario";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  funcinarioCol = collection(db, 'funcionario');

  private isDelay = 500;

  findAll() {
    const q = query(this.funcinarioCol, orderBy('nome'));
    return new Observable<FuncionarioModel[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: FuncionarioModel[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as FuncionarioModel);
        observer.next(items);
      });
    }).pipe(delay(this.isDelay));
    
  }

  async findById(id: number) {}

  async create(funcionario: FuncionarioModel) {
    await new Promise((resolve) => setTimeout(resolve, this.isDelay));
    const docRef = await addDoc(this.funcinarioCol, { ...funcionario });
    return docRef.id;
  }

  async updateById(id: string, funcionario: FuncionarioModel) {
    const docRef = doc(db, `funcionario`, id);
    await updateDoc(docRef, { ...funcionario });
  }

  async deleteById(id: string) {
    const docRef = doc(db, `funcionario`, id);
    await deleteDoc(docRef);
  }
}

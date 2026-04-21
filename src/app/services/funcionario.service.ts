import { Injectable, inject } from "@angular/core";
import { Firestore, collectionData } from "@angular/fire/firestore";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { delay, map } from "rxjs";
import { FuncionarioModel } from "../models/funcionario";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  firestore = inject(Firestore);
  funcinarioCollection = collection(this.firestore, 'funcionario');
  private isDelay = 1000;

  findAll() {
    return collectionData(this.funcinarioCollection, { idField: 'id' }).pipe(
      delay(this.isDelay),
      map((data) => data as FuncionarioModel[]),
    );
  }

  async findById(id: number) {}

  async create(funcionario: FuncionarioModel) {
    await new Promise((resolve) => setTimeout(resolve, this.isDelay));
    const docRef = await addDoc(this.funcinarioCollection, { ...funcionario });
    return docRef.id;
  }

  async updateById(id: string, funcionario: FuncionarioModel) {
    const docRef = doc(this.firestore, `funcionario`, id);
    await updateDoc(docRef, { ...funcionario });
  }

  async deleteById(id: string) {
    const docRef = doc(this.firestore, `funcionario`, id);
    await deleteDoc(docRef);
  }
}

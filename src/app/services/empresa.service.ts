import { Injectable } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { Observable, delay } from "rxjs";
import { db } from "../../firebase";
import { EmpresaModel } from "../models/empresa";

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  colectionLabel = 'empresa';
  collectionName = collection(db, this.colectionLabel);

  private isDelay = 500;

  findAll() {
    const q = query(this.collectionName, orderBy('nomeEmpresaRazaoSocial'));
    return new Observable<EmpresaModel[]>((observer) => {
      onSnapshot(q, (snapshot) => {
        const items: EmpresaModel[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as EmpresaModel);
        observer.next(items);
      });
    }).pipe(delay(this.isDelay));
    
  }

  async findById(id: number) {}

  async create(param: EmpresaModel) {
    await new Promise((resolve) => setTimeout(resolve, this.isDelay));
    const docRef = await addDoc(this.collectionName, { ...param });
    return docRef.id;
  }

  async updateById(id: string, param: EmpresaModel) {
    const docRef = doc(db, this.colectionLabel, id);
    await updateDoc(docRef, { ...param });
  }

  async deleteById(id: string) {
    const docRef = doc(db, this.colectionLabel, id);
    await deleteDoc(docRef);
  }
}

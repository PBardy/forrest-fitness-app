import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
} from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { from, filter, switchMap, Observable, map } from 'rxjs';
import type { Model, WithId, WithUser } from '@types';
import { Store } from '@ngrx/store';

const selectByUser = (q: CollectionReference, u: firebase.default.User) =>
  q.where('userId', '==', u.uid);

@Injectable({
  providedIn: 'root',
})
export class ModelService<T extends Partial<unknown>> {
  protected path = '';

  public constructor(
    protected readonly store: Store,
    protected readonly auth: AuthService,
    protected readonly fs: AngularFirestore
  ) {}

  public getAll() {
    return this.auth.account().pipe(
      filter(Boolean),
      switchMap((x) =>
        this.fs
          .collection<Model<T>>(this.path, (q) => selectByUser(q, x))
          .valueChanges({ idField: 'id' })
      )
    );
  }

  public getOne(id: string): Observable<Model<T>> {
    return this.fs
      .doc<T>(`${this.path}/${id}`)
      .get()
      .pipe(map((y) => ({ id: y.id, ...y.data() } as Model<T>)));
  }

  public addOne(model: T) {
    return this.auth.account().pipe(
      filter(Boolean),
      switchMap(async (x) => {
        const batch = this.fs.firestore.batch();
        const collection = this.fs.collection<WithUser<T>>(this.path);

        const id = this.fs.createId();
        const ref = collection.doc(id).ref;
        const doc = { ...model, id, userId: x.uid };
        batch.set(ref, doc);

        await batch.commit();

        return doc;
      })
    );
  }

  public addMany(models: T[]) {
    return this.auth.account().pipe(
      filter(Boolean),
      switchMap(async (x) => {
        const docs: Model<T>[] = [];
        const batch = this.fs.firestore.batch();
        const collection = this.fs.collection<WithUser<T>>(this.path);
        models.map((model) => {
          const id = this.fs.createId();
          const ref = collection.doc(id).ref;
          const doc = { ...model, id, userId: x.uid };
          docs.push(doc);
          batch.set(ref, doc);
        });

        await batch.commit();

        return docs;
      })
    );
  }

  public updateOne(id: string, model: Partial<T>) {
    return from(this.fs.doc<T>(`${this.path}/${id}`).update(model));
  }

  public deleteOne(model: Model<T>) {
    return from(this.fs.doc<T>(`${this.path}/${model.id}`).delete());
  }
}

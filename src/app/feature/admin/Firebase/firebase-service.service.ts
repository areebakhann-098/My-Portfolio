import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {
  getFirestore,
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app;
  private db;
  private storage;
 
  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
    this.storage = getStorage(this.app);
    this.db = getFirestore(this.app);
  }
 
  uploadFile(file: File, folder: string): Promise<string> {
    const storageRef = ref(this.storage, `${folder}/${Date.now()}_${file.name}`);
    return uploadBytes(storageRef, file)
      .then(() => getDownloadURL(storageRef))
      .catch((error) => {
        console.error("Upload failed", error);
        throw new Error("Upload failed");
      });
  }


 
  // ✅ Add Document
  addDocument(collectionName: string, data: any): Observable<any> {
    const collectionRef = collection(this.db, collectionName);
    return from(addDoc(collectionRef, data)).pipe(
      map(docRef => {
        console.log('Document added:', docRef.id);
        return docRef;
      }),
      catchError(error => {
        console.error('Error adding document:', error);
        throw error;
      })
    );
  }
 
  // ✅ Get Documents
  getDocuments(collectionName: string): Observable<DocumentData[]> {
    const collectionRef = collection(this.db, collectionName);
    return from(getDocs(collectionRef)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      }),
      catchError(error => {
        console.error('Error getting documents:', error);
        throw error;
      })
    );
  }
 
  // ✅ Delete Document
  deleteDocument(collectionName: string, docId: string): Observable<any> {
    const docRef = doc(this.db, collectionName, docId);
    return from(deleteDoc(docRef)).pipe(
      map(() => ({
        success: true,
        message: `Document with ID ${docId} deleted.`
      })),
      catchError(error => {
        console.error('Error deleting document:', error);
        throw error;
      })
    );
  }
}
 
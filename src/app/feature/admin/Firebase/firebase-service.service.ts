import { Injectable } from '@angular/core';
import { environment } from '../../../environment'; // Adjust path if needed
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc,  updateDoc,
 deleteDoc, doc, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app;
  private db;
  private storage;
  private auth;
private authKey = 'isLoggedIn';
  constructor() {
    // Initialize Firebase App
    this.app = initializeApp(environment.firebaseConfig);

    // Initialize Services
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
    this.auth = getAuth(this.app);

    // Check authentication state on app load
    this.checkAuthState();
  }

  // ✅ Login (Auth)
  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // ✅ Upload File to Storage
  uploadFile(file: File, folder: string): Promise<string> {
    const storageRef = ref(this.storage, `${folder}/${Date.now()}_${file.name}`);
    return uploadBytes(storageRef, file)
      .then(() => getDownloadURL(storageRef))
      .catch((error) => {
        console.error('Upload failed:', error);
        throw new Error('Upload failed');
      });
  }

  // ✅ Add Document to Firestore
  addDocument(collectionName: string, data: any): Observable<any> {
    const collectionRef = collection(this.db, collectionName);
    return from(addDoc(collectionRef, data)).pipe(
      map((docRef) => {
        console.log('Document added with ID:', docRef.id);
        return docRef;
      }),
      catchError((error) => {
        console.error('Error adding document:', error);
        throw error;
      })
    );
  }

  // ✅ Get All Documents
  getDocuments(collectionName: string): Observable<DocumentData[]> {
    const collectionRef = collection(this.db, collectionName);
    return from(getDocs(collectionRef)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      }),
      catchError((error) => {
        console.error('Error getting documents:', error);
        throw error;
      })
    );
  }

  // ✅ Delete Document by ID
  deleteDocument(collectionName: string, docId: string): Observable<any> {
    const docRef = doc(this.db, collectionName, docId);
    return from(deleteDoc(docRef)).pipe(
      map(() => ({
        success: true,
        message: `Document with ID ${docId} deleted.`,
      })),
      catchError((error) => {
        console.error('Error deleting document:', error);
        throw error;
      })
    );
  }
  // ✅ Update Document by ID
updateDocument(collectionName: string, docId: string, data: any): Observable<any> {
  const docRef = doc(this.db, collectionName, docId);
  return from(updateDoc(docRef, data)).pipe(
    map(() => ({
      success: true,
      message: `Document with ID ${docId} updated.`,
    })),
    catchError((error) => {
      console.error('Error updating document:', error);
      throw error;
    })
  );
}




  // ✅ Monitor authentication state
  checkAuthState() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // If user is logged in, store login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        // If user is logged out, clear login status from localStorage
        localStorage.removeItem('isLoggedIn');
      }
    });
  }

logout(): void {
    localStorage.removeItem(this.authKey);
  }
 
  isAuthenticated(): boolean {
    return localStorage.getItem(this.authKey) === 'true';
  }
  
}

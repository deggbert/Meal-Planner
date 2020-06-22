import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from  '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { User } from '../../shared/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  uid: string = null;

  constructor(
    private afAuth: AngularFireAuth, //firebase.auth.Auth
    private afStore: AngularFirestore,  //firebase.firestore
    private router: Router,
  ) { 
    // ??TODO: could just use afAuth.authState to get the user id from the firebase authenticaiton tab if i don't want this custom data
    this.user$ = this.afAuth.authState.pipe(
      tap((user) => this.uid = user?.uid ?? null),
      switchMap(user => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const userCredential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(userCredential.user); 
  }

  async signOut(): Promise<boolean> {
    await this.afAuth.signOut();
    return this.router.navigate(['/login']);
  }

  // ??TODO: could use cloud function
  private updateUserData({ uid, email, displayName, photoURL }): Promise<void> {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL,
    }

    return userRef.set(data, { merge: true });
  }
}

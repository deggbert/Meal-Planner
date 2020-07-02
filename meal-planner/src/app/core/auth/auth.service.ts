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
  displayName: string = null;

  constructor(
    private afAuth: AngularFireAuth, 
    private afStore: AngularFirestore,  
    private router: Router,
  ) { 
    // ??TODO: could just use afAuth.authState to get the user id from the firebase authenticaiton tab if i don't want this custom data
    this.user$ = this.afAuth.authState.pipe(
      tap(user => this.uid = user?.uid ?? null),
      tap(user => this.displayName = user?.displayName ?? null),
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

    const userData: User = {
      uid,
      email,
      displayName,
      photoURL,
    }

    return userRef.set(userData, { merge: true });
  }

  // Create test users TODO: Remove when no longer needed
  async testUserSignIn(number: number): Promise<void> {
    const testUserData = {
      email: `testUser${number}@email.test`,
      password: `testUser${number}`,
    }
    
    this.afAuth.signInWithEmailAndPassword(testUserData.email, testUserData.password);
  }
}

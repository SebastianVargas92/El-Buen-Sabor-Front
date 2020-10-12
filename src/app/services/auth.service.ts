import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData);
          this.emailVerificacion();
        }).catch (err => console.log( reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  loginGoogle() {
    return this.afsAuth.signInWithPopup(new auth.GoogleAuthProvider())
    .then((credential) =>{
    });
  }

  logoutUser() {
    localStorage.removeItem('loged');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('carro');
    return this.afsAuth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(autha => autha));
  }

  recuperaPass(email: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.sendPasswordResetEmail(email)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  getIdUser(){
    this.isAuth().subscribe( user => {
      if ( user ) {
        return user.uid;
      } else {
        return null;
       }
    } );
  }

 /*  private setRolUser(user,rolUser){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data = {
      id: user.uid,
      email: user.email,
      rolUser: rolUser
    }
    return userRef.set(data, { merge: true });
  } */

 /*  getRol(id){
    return this.afs.doc(`users/${id}`).valueChanges();
  } */

  async emailVerificacion(){
    return await (await this.afsAuth.currentUser).sendEmailVerification();
  }

}

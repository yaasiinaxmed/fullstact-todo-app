import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, query, updateDoc } from 'firebase/firestore'

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDz7HsDV_cv5MneY07cyYX-amGUKjmeAxA",
  authDomain: "todo-app-3de96.firebaseapp.com",
  projectId: "todo-app-3de96",
  storageBucket: "todo-app-3de96.appspot.com",
  messagingSenderId: "819360354908",
  appId: "1:819360354908:web:16e37a766cad36ffdd8c99",
  measurementId: "G-8XE6ER7YGZ",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  // current user data
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });

    return () => unSubscribe();
  }, []);

  // sign up
  const signupWithEmailAndPass = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);
 
  // sign in 
  const signinWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  // sign in with google
  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const logOut = () => signOut(firebaseAuth);

  // add todo
  const addTodo = async (text) => {
    await addDoc(collection(firestore, 'todos'), {
        text,
        completed: false,
        userId: user.uid
    })
  }

  // get todos
  useEffect(() => {
    const q = query(collection(firestore, 'todos'));

    const unSubscribe = onSnapshot(q, (querySnapShot) => {
        let todosArr = [];

        querySnapShot.forEach((doc) => {
            todosArr.push({...doc.data(), id: doc.id})
        })

        setTodos(todosArr)
    })

    return () => unSubscribe()
  }, [])

  // update todo 
  const toggleComplete = async (todo) => {
    await updateDoc(doc(firestore, 'todos', todo.id), {
        completed: !todo.completed
    })
  }

  // delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(firestore, 'todos', id))
  }

  return (
    <FirebaseContext.Provider
      value={{ signupWithEmailAndPass, signinWithEmailAndPass, signinWithGoogle, logOut, user, todos, addTodo, toggleComplete, deleteTodo }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

import {React, createContext, useState, useContext, useEffect} from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,setDoc, doc, db, onAuthStateChanged, signOut} from '../../firebase';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        // getUser();
        // return () => getUser()
        const auth = getAuth();
        const unsub = onAuthStateChanged(auth, (here) => {
            if (here) {
                try{
                    setCurrentUser(here.providerData[0]);
                }
                catch{

                }
            } else {
                console.log("user doesnt exist");
            }

        });
        return unsub;
    }, [])

    async function signUp(email, password, name) {
        const auth = getAuth();
        const user = await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 

            const auth = getAuth();
            console.log(name)
            await updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                const user = userCredential.user;
                setCurrentUser(user.providerData[0])
            // Profile updated!
            // ...
            }).catch((error) => {
            // An error occurred
            // ...
            console.log(error)
            });


            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ..
        });

        const record = await setDoc(doc(db, "User", email), {
            name: name,
            password: password,
        });

       // console.log(user)
        // return user;

    }

    async function logIn(email, password) {
        const auth = getAuth();
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setCurrentUser(user.providerData[0]); 

        }
        catch(e){
            const errorCode = error.code;
            const errorMessage = error.message;
        }
        // const user = await signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     const user = userCredential.user;
        //     setCurrentUser(user)
        //     return user
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        // });
    }

    async function getUser() {
        const auth = getAuth();
        const user = await onAuthStateChanged(auth, (user) => {
           // console.log(user)
        if (user) {
            setCurrentUser(user)
        } else {
           console.log("user")
        }
        });
        // return user
    }

    async function signOutUser() {
        const auth = getAuth();
        await signOut(auth).then(() => {
            setCurrentUser()
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        console.log(error)
        console.log("SUP")
        });
    }
    


  return (
    <UserContext.Provider
        value={{
            signUp,
            logIn,
            currentUser,
            getUser,
            signOutUser,
            setCurrentUser
        }}
        >
        {children}
    </UserContext.Provider>
  )
}

// export default {UserContext,useUserContext}
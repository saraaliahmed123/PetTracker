import {createContext, useContext, useEffect, useState} from 'react'
import { updateDoc, onSnapshot,deleteDoc, db, collection, getDocs,documentId, query, where, getStorage, ref, getDownloadURL, doc, addDoc   } from '../../firebase';
import {useUserContext} from './UserContext';

const AnimalContext = createContext();


export const useAnimalContext = () => {
    return useContext(AnimalContext)
}

export const AnimalProvider = ({children}) => {

   // const [animalsList, setAnimalsList] = useState()

    const {currentUser} = useUserContext()

    // useEffect(() => {
    //     const sub = async () => {
    //         const querySnapshot = await getDocs(collection(db, "Animal"));
    //         const animal = []
    //         querySnapshot.forEach((doc) => {
    //             const date = doc.data()
    //                 date["id"] = doc.id
    //                 animal.push(date);
    //         });
    //         setAnimalsList(animal)
    //     }
    //     return () => {
    //         sub();
    //         console.log(animalsList)
    //       };
    // }, []) 

    async function deleteAnimal(id) {
        await deleteDoc(doc(db, "Animal", id));
    }



   async function getAnimalImage(animallId) {
        let image
        const v = await getDownloadURL(ref(getStorage(), (animallId+".jpg")))
        .then((url) => {
            image =  url
        })
        .catch((error) => {
            console.log("animal")
        })

    return image 
    }

    async function getAnimalsByUserId() {
        const animal = []

        if (currentUser)
        {

        const q = query(collection(db, "Animal"), where("userId", "==", currentUser.providerData[0].uid));

        const querySnapshot = await getDocs(q);
        for await(const doc of querySnapshot.docs) {
        // doc.data() is never undefined for query doc snapshots
            const date = doc.data()
            date["id"] = doc.id
            date["image"] = ""
            //await getAnimalImage(date["id"])
            animal.push(date);
        };
        }
       // console.log(animal)
       return animal
    }

    async function getAnimalByAnimalId(animalId) {
        const animal = []

        if (currentUser)
        {

        const q = query(collection(db, "Animal"), where("userId", "==", currentUser.providerData[0].uid), where(documentId(), "==", animalId));

        const querySnapshot = await getDocs(q);
        for await(const doc of querySnapshot.docs) {
        // doc.data() is never undefined for query doc snapshots
            const date = doc.data()
            date["id"] = doc.id
            animal.push(date);
        };

        }
       console.log(animal)
       return animal
    }

    async function getAnimalNameId(animalId) {
        const animal = []

        const q = query(collection(db, "Animal"), where(documentId(), "==", animalId))
        const querySnapshot = await getDocs(q);
        for await(const doc of querySnapshot.docs) {
            animal.push(doc.data().name);
        };
       return animal
    }

    async function editAnimal(docId, val) {

        const document = doc(db, "Animal", docId);
        await updateDoc(document, {
            age: val["age"],
            name: val["name"],
            weight: val["weight"],
            dob: val["dob"],
            type: val["type"],
            breed: val["breed"]

        });

    }

    async function addAnimal(arr) {

        const docRef = await addDoc(collection(db, "Animal"), arr);
    }




    

  return (
    <AnimalContext.Provider
        value={{
            getAnimalsByUserId,
            getAnimalNameId,
            getAnimalByAnimalId,
            getAnimalImage,
            deleteAnimal,
            editAnimal,
            addAnimal
           // animalsList

        }}
        >
        {children}
    </AnimalContext.Provider>
  )
}

// export default {AnimalContext, useAnimalContext}
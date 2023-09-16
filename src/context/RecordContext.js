import {createContext, useState, useContext, useEffect} from 'react'
import { db, collection, getDocs, updateDoc, query, where, 
    orderBy, limit, doc, onSnapshot, documentId, setDoc, Timestamp, deleteDoc  } from '../../firebase';
import {useUserContext} from './UserContext';
import {useAnimalContext} from './AnimalContext';

const RecordContext = createContext();


export const useRecordContext = () => {
    return useContext(RecordContext)
}

export const RecordProvider = ({children}) => {

    const [record, setRecord] = useState()

    const {getAnimalNameId, getAnimalByAnimalId} = useAnimalContext()
    const {currentUser} = useUserContext()

    useEffect(() => {
        const q = query(collection(db, "Record"));
        let count = 0
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const records = []
        querySnapshot.forEach(async (doc) => {
            const date = doc.data()
            date["id"] = doc.id
            date["date"] = date["date"].toDate()
            date["animalName"] = await getAnimalNameId(doc.data()["animalId"])
            date["key"] = count
            date["colour"] = await getRecordColour(date["typeId"])
            date["animal"] = await getAnimalByAnimalId(date["animalId"])

            records.push(date);
            count++
        });
            setRecord(records)
        });
           return () => {
            unsubscribe();
          };
        
    }, [])

    async function addRecord(date, animalId, checked, timestamp, typeId, userId, values) {
        const data = {
            animalId: animalId,
            checked: checked,
            date: Timestamp.fromDate(timestamp),
            typeId: typeId,
            userId: userId,
            values: values
          }

         console.log(data)

        await setDoc(doc(db, "Record", date), data);
    }

  async function getRecordColour(typeId) {
        let record

        const q = query(collection(db, "RecordType"), where(documentId(), "==", typeId));

        const querySnapshot = await getDocs(q);
        for await(const doc of querySnapshot.docs) {
            record = doc.data().colour;
        };
        return record
    }

    async function getRecordTypes() {
        const record = []

        const q = query(collection(db, "RecordType"));

        const querySnapshot = await getDocs(q);
        for await(const doc of querySnapshot.docs) {
            const date = doc.data()
            date["id"] = doc.id
            record.push(date);
        };
        //console.log(record)
        return record
    }

    async function getRecentRecords() {
        const record = []

        const q = query(collection(db, "Record"), where("userId", "==", currentUser.providerData[0].uid), orderBy("date", "desc"), limit(4));

        const querySnapshot = await getDocs(q);
        for await(const doc of querySnapshot.docs) {
        // doc.data() is never undefined for query doc snapshots
            const date = doc.data()
            date["id"] = doc.id
            date["date"] = date["date"].toDate()
            date["animal"] = await getAnimalByAnimalId(date["animalId"])
            record.push(date);
        };
        //console.log(record)
       return record
    }

    async function getRecentExepnses() {
        const record = []
        const expense = collection(db, "Record");
        const q = query(expense, where("typeId", "==", "Expense"), where("userId", "==", currentUser.providerData[0].uid), orderBy("date", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        for await(const doc of querySnapshot.docs) {
            // doc.data() is never undefined for query doc snapshots
                const date = doc.data()
                date["id"] = doc.id
                date["date"] = date["date"].toDate()
                date["animal"] = await getAnimalByAnimalId(date["animalId"])
                record.push(date);
            };
        return record
    }

    async function getAnimalsWeights() {
        const record = []
        const weight = collection(db, "Record");
        const q = query(weight, where("typeId", "==", "Weight"), where("userId", "==", currentUser.providerData[0].uid));
        const querySnapshot = await getDocs(q);
        for await(const doc of querySnapshot.docs) {
            // doc.data() is never undefined for query doc snapshots
            const date = doc.data()
            date["id"] = doc.id
            // date["animal"] = await getAnimalsByUserId(date["userId"])
            record.push(date);
        };

       console.log(record)
        return record
    }

    async function getAllRecords() {
        const val = {}
        const item = []
        let count = 0
        const weight = collection(db, "Record");
        const q = query(weight, where("userId", "==", currentUser.providerData[0].uid));
        const querySnapshot = await getDocs(q);
        for await(const doc of querySnapshot.docs) {
            // doc.data() is never undefined for query doc snapshots
            const name = await getAnimalNameId(doc.data()["animalId"])
            const date = doc.data()
            date["id"] = doc.id
            date["date"] = date["date"].toDate()
            date["animalName"] = name
            date["key"] = count
            date["colour"] = await getRecordColour(date["typeId"])
            val[doc.id] = [date]
           // val[doc.id] = [date]
            count++
            item.push(doc.id.split("T")[0])

        };

        const tofindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index)
        const duplicateElementa = tofindDuplicates(item);
        
        duplicateElementa.forEach((item) => {
                const newObject = []
                for (const [key, value] of Object.entries(val)) {
                    if (key.split("T")[0] === item)
                    {
                        newObject.push(value)
                    }
                 }
                val[item] = newObject
            })

        const newObject = {}
        for (const [key, value] of Object.entries(val)) {
           // val[key.split("T")[0]] = value
           newObject[key.split("T")[0]] = value
        }
        
        // console.log(newObject)
        return newObject
    }

    async function editChecked(docId, val) {

        const washingtonRef = doc(db, "Record", docId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
            checked: val
        });

    }

    async function deleteRecord(id) {
        //console.log(id)
        await deleteDoc(doc(db, "Record", id));

    }

    async function editRecord(docId, val) {

        const washingtonRef = doc(db, "Record", docId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
            values: val
        });

    }

    

  return (
    <RecordContext.Provider
        value={{
            getRecentRecords,
            getRecentExepnses,
            getAnimalsWeights,
            getAllRecords,
            getRecordTypes,
            editChecked,
            addRecord,
            record,
            deleteRecord,
            editRecord
        

        }}
        >
        {children}
    </RecordContext.Provider>
  )
}

//export default {RecordContext, useRecordContext}
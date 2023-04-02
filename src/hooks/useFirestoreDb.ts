import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from "../firebase";


const useFirestoreDb = () => {

  // const [firestoreError, setFirestoreError] = useState<{
  //   error: {
  //   [type: string]: 
  // }}>()
  
  const add = async ({ type, ...data }: { type: "Shared" | "Private" | "Reminder" | "Task", [key: string]: any }) => {
    try {
        await setDoc(
          doc(db, "Users", auth.currentUser!.uid, type, Date.now().toString()),
          type === "Shared" ? {
            ...data, 
            favorite: false,
            author: auth.currentUser!.uid,
            dateCreated: new Date(),
            dateUpdated: new Date(),
          } : {
            ...data,
            favorite: false,
            dateCreated: new Date(),
            dateUpdated: new Date(),
          }
        );
      
    } catch (err: any) {
      console.log(err)
    }
  }
    const update = async ({ type, id, ...data }: { type: string, id: string, [key: string]: any }) => {
    console.log(data)
    try {
      await updateDoc(
        doc(db, "Users", auth.currentUser!.uid, type, id),
        {
          ...data,
          dateUpdated: new Date()
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const remove = async (type: string, id: string) => {
    try {
      await deleteDoc(doc(db, "Users", auth.currentUser!.uid, type, id))
    } catch (err) {
      console.log(err)
    }
   
  }

  return {add, remove, update}
}

  

export default useFirestoreDb
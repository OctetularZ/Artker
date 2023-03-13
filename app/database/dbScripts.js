import { db as fbDB } from '../../firebase'
import { collection, query, where, doc, getDoc, setDoc, getDocs, updateDoc } from 'firebase/firestore'

export async function getAllData(db, whereClause, identifier) { // db - The database which will be accessed, whereClause - Which column of the database will be looked at in the 'where' statement, identifier - The value which will be searched for in the database at the specified column
  const acc = collection(fbDB, db); // Gets the collection of documents which will be accessed from the database
  const q = query(acc, where(`${whereClause}`, '==', `${identifier}`)) // The query which will be passed to the database
  const querySnapshot = await getDocs(q); // Gets a snapshot of the database
  const data = querySnapshot.docs.map((doc) => ({
      username: doc.id,
      ...doc.data(),
    })); //Sets the requested data from the database query
  return data // Returns the requested data from the database query
}
export async function getData(db) { // All variables have the same purpose as in getAllData
  const acc = collection(fbDB, db);
  const querySnapshot = await getDocs(acc);
  const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  return data
} // Returns all the data in collection rather than just one user

export function delDocs(db, whereClause, identifier) { // All variables have the same purpose as in getAllData
  const delQuery = fbDB.collection(db).where(whereClause, '==', identifier);
  delQuery.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });
} // deletes a document in the database
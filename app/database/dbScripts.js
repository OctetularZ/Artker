import { db as fbDB } from '../../firebase'
import { collection, query, where, doc, getDoc, setDoc, getDocs, updateDoc } from 'firebase/firestore'

export async function getAllData(db, whereClause, identifier) {
  const acc = collection(fbDB, db);
  const q = query(acc, where(`${whereClause}`, '==', `${identifier}`))
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
      username: doc.id,
      ...doc.data(),
    }));
  return data
}
export async function getData(db) {
  const acc = collection(fbDB, db);
  const querySnapshot = await getDocs(acc);
  const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
  return data
}

export function delDocs(db, whereClause, identifier) {
  const delQuery = fbDB.collection(db).where(whereClause, '==', identifier);
  delQuery.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });
}
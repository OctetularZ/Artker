import { db as fbDB } from '../../firebase'
import { collection, query, where, doc, getDoc, setDoc, getDocs } from 'firebase/firestore'

export async function getAllData(whereClause, username) {
  const acc = collection(fbDB, 'Account');
  const q = query(acc, where(`${whereClause}`, '==', `${username}`))
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
      username: doc.id,
      ...doc.data(),
    }));
  return data
}
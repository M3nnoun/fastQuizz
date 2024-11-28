import { getFirestore } from '@firebase/firestore';
import { app } from './fireBaseConfig'; // Ensure the correct relative path

// Initialize Firestore
const db = getFirestore(app);

export default db;

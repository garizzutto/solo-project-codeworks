import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import path from 'path';

// import serviceAccountKey from './serviceAccountKey';

const app = initializeApp({
  credential: admin.credential.cert(
    path.resolve(__dirname, './serviceAccountKey.json'),
  ),
});

const auth = getAuth(app);
export default auth;

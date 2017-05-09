import config from './config';
import firebase from 'firebase';

firebase.initializeApp(config.firebase);
let db = firebase.database();


export default db;

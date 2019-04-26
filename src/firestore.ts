import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Constants from './utils/constants';
import {config} from './config/config';

firebase.initializeApp(config.firebase);
const db = firebase.firestore();

export const doculetsCollection = db.collection(Constants.DB_COLLECTION_DOCULENTS);


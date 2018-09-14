import {db} from '../main';
import Constants from '../utils/constants';
import {logInfo} from '../utils/logger';
import firebase from 'firebase/app';

export class FireStoreService {
    private doculets: firebase.firestore.CollectionReference;

    // TODO think about making it as singleton
    constructor() {
        this.doculets = db.collection(Constants.DB_COLLECTION_DOCULENTS);
    }

    public async findDocIdByUserAndName(userId: string, docName: string): Promise<firebase.firestore.QuerySnapshot> {

        return this.doculets.where('userId', '==', userId)
            .where('name', '==', docName)
            .limit(1)
            .get();

    }

    public async saveDoc(id: string, docName: string, userId: string) {
        return this.doculets.doc(id)
            .set({name: docName, userId, created: firebase.firestore.FieldValue.serverTimestamp()})
            .then( (docRef) => {
                logInfo(`Saved gist in FireStore : ${id}`);
        });
    }

    public deleteDoc(id: string) {
        return this.doculets.doc(id).delete().then( () => logInfo(`Document : ${id} is deleted` ));
    }

    public async getMyDocs(): Promise<firebase.firestore.QuerySnapshot> {
       return this.doculets.orderBy('created', 'asc').get();
    }
}



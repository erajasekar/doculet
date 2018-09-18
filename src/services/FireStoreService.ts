import {doculetsCollection} from '../shared-modules';
import {logInfo} from '../utils/logger';
import firebase from 'firebase/app';

export class FireStoreService {

    public async findDocIdByUserAndName(userId: string, docName: string): Promise<firebase.firestore.QuerySnapshot> {

        return doculetsCollection.where('userId', '==', userId)
            .where('name', '==', docName)
            .limit(1)
            .get();

    }

    public async saveDoc(id: string, docName: string, userId: string) {
        return doculetsCollection.doc(id)
            .set({name: docName, userId, created: firebase.firestore.FieldValue.serverTimestamp()})
            .then( (docRef) => {
                logInfo(`Saved gist in FireStore : ${id}`);
        });
    }

    public deleteDoc(id: string) {
        return doculetsCollection.doc(id).delete().then( () => logInfo(`Document : ${id} is deleted` ));
    }

    public async getMyDocs(userId: string): Promise<firebase.firestore.QuerySnapshot> {
       return doculetsCollection
           .where('userId', '==', userId)
           .orderBy('created', 'asc').get();
    }
}



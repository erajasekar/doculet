import {doculetsCollection} from '../firestore';
import {logDebug} from '../utils/logger';
import firebase from 'firebase/app';
import '@firebase/firestore';
import {DoculetDocBase} from '../store/modules/doculet';

export class FireStoreService {

    public async findDocIdByUserAndName(userId: string, docName: string): Promise<firebase.firestore.QuerySnapshot> {

        return doculetsCollection.where('userId', '==', userId)
            .where('name', '==', docName)
            .limit(1)
            .get();

    }

    public async saveDoc(userId: string, doc: DoculetDocBase) {
        return doculetsCollection.doc(doc.docId)
            .set({
                name: doc.docName,
                userId,
                ownerId: doc.docOwnerId,
                created: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then( (docRef) => {
                logDebug(`Saved gist in FireStore : ${doc.docId}`);
        });
    }

    public async updateDoc(docId: string, html: string) {
        return doculetsCollection.doc(docId)
            .set({
                html,
            })
            .then( (docRef) => {
                logDebug(`Published gist : ${docId} in FireStore `);
        });
    }

    public async getPublishLocation(docId: string): Promise<string> {
        return doculetsCollection.doc(docId).get().then((docRef) => {
            const data = docRef.data();
            let publishLocation = null;
            if (data) {
                publishLocation = data.publishLocation;
            }
            return publishLocation;
        });
    }

    public deleteDoc(id: string) {

        doculetsCollection.doc(id).delete()
            .then( () => logDebug(`Document : ${id} is deleted from Firestore` ));

    }

    public updatePublishLocation(docId: string, location: string) {
        return doculetsCollection.doc(docId)
            .update({
                publishLocation : location,
            })
            .then( () => logDebug(`Publish location updated for : ${docId}` ));
    }

    public async getMyDocs(userId: string): Promise<firebase.firestore.QuerySnapshot> {
       return doculetsCollection
           .where('userId', '==', userId)
           .orderBy('created', 'asc').get();
    }
}



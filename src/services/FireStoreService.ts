import {db} from '../main';
import Constants from '../utils/constants';
import log from '../utils/logger';

export class FireStoreService {
    private doculets: firebase.firestore.CollectionReference;

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
        return this.doculets.doc(id).set({name: docName, userId});
    }

    public deleteDoc(id: string) {
        return this.doculets.doc(id).delete().then( () => log(`Document '${id}' is deleted` ));
    }
}



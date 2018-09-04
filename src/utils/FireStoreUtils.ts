
export class FireStoreService {
    private doculets: firebase.firestore.CollectionReference;

    constructor(doculets: firebase.firestore.CollectionReference){
        this.doculets = doculets;
    }

    public async findDocIdByUserAndName(userId: string, docName: string) {

        return this.doculets.where('userId', '==', userId)
                .where('name', '==', docName)
                .limit(1)
                .get();
        
    }
    
    public async saveDoc(id: string, docName: string, userId: string) {
        return this.doculets.add({id, name: docName, userId});
    }
}


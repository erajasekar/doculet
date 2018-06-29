import axios, {AxiosPromise, AxiosResponse} from 'axios';

export class GitHubService {

    public static async  importGist() {
        const resp: AxiosResponse = await axios.get('https://api.github.com/gists/b2e7c4bdedf6e9da27fef0faa3efad0e');
        return resp.data;
    }
}


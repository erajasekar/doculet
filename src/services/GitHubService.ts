import axios, {AxiosPromise, AxiosResponse} from 'axios';

export class GitHubService {

    public static async  importGist(gistId: string) {
        const resp: AxiosResponse = await axios.get('https://api.github.com/gists/' + gistId);
        const firstFileKey = Object.keys(resp.data.files)[0];
        return resp.data.files[firstFileKey]; // TODO should extrat only required properties to an interface
    }
}


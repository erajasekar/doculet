import axios, {AxiosPromise, AxiosResponse} from 'axios';

export default class GitHubService {

    public static async  importGist(gistId: string) {
        const resp: AxiosResponse = await axios.get('https://api.github.com/gists/' + gistId);
        const firstFileKey = Object.keys(resp.data.files)[0];
        return resp.data.files[firstFileKey]; // TODO should extrat only required properties to an interface
    }

    public static parseUrl(url: string) {
        // TODO handle other format of gist ids like raw url, github url etc

        return url.substr(url.lastIndexOf('/') + 1);
    }

    public static enrichSourceType(content: string, language: string) {

        if (language !== 'asciidoc') {
            return '[source,' + language + ']\n' +
                '----\n' + content +
                '\n----\n';
        } else {
            return content;
        }

    }
}


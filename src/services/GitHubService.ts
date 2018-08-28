import axios, {AxiosPromise, AxiosResponse} from 'axios';
import GistClient from 'gist-client';

export default class GitHubService {
    public static async  importGist(gistId: string) {
        const resp: AxiosResponse = await axios.get('https://api.github.com/gists/' + gistId);
        const firstFileKey = Object.keys(resp.data.files)[0];
        return resp.data.files[firstFileKey]; // TODO should extrat only required properties to an interface
    }

    public static parseUrl(url: string) {
        // TODO handle other format of gist ids like raw url, github url etc

        const index = url.lastIndexOf('/');
        if (index > 0) {
            return url.substr( index + 1);
        } else {
            // Assuming URL to be a valid gistId
            return url;
        }

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

    private gistClient = new GistClient();

    public async saveGist(token: string, fileName: string, content: string) {

      /*  this.gistClient.setToken(token)
            .create({
                files: {
                    [fileName]: {
                        content: content,
                    },
                },
                description: 'Created from doculet',
                public: true,
                })
            .then((newGist: any) => {
                console.log(newGist);
            // TODO should return gistId or async function itself
        });*/

        return this.gistClient.setToken(token)
            .create({
                files: {
                    [fileName]: {
                        content: content,
                    },
                },
                description: 'Created from doculet',
                public: true,
                });
    }
}


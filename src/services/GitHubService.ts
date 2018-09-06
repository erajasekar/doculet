import axios, {AxiosPromise, AxiosResponse} from 'axios';
import {logInfo} from '../utils/logger';

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
        // TODO use template interpolation.
        return '[source,' + language + ']\n' +
            '----\n' + content +
            '\n----\n';
    }

    public static updateExtenstionToAsciiDoc(filename: string) {
        const pos = filename.lastIndexOf('.');
        return filename.substr(0, pos < 0 ? filename.length : pos) + '.adoc';
    }
    public static isAsciiDoc(language: string) {
        return language === 'asciidoc';
    }

    private gistClient = new GistClient();

    public async saveGist(token: string, fileName: string, content: string) {

        return this.gistClient.setToken(token)
            .create({
                files: {
                    [fileName]: {
                        content,
                    },
                },
                description: 'Created from doculet',
                public: false,
                });
    }

    public updateGist(token: string, gistId: string, fileName: string, content: string) {

        return this.gistClient.setToken(token)
            .update(gistId, {
                files: {
                    [fileName]: {
                        content,
                    },
                },
                description: 'Updated from doculet',
            }).then((newGist: any) => {
                logInfo('Gist updated : ' + gistId);
            });
    }

    public deleteGist(token: string, gistId: string) {

        const result = this.gistClient.setToken(token)
            .delete(gistId);
        logInfo(`Gist : ${gistId} is deleted`);
    }
}


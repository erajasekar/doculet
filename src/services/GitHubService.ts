import axios, {AxiosPromise, AxiosResponse} from 'axios';
import {logInfo} from '../utils/logger';

import GistClient from 'gist-client';
import Constants from '../utils/constants';

export interface GistFile {
    fileName: string;
    content: string;
    isAsciiDoc: boolean;
}

export default class GitHubService {
    private gistClient = new GistClient();

    public async importGistAsync(gistId: string) {

        const token = localStorage.getItem(Constants.ACCESS_TOKEN_PROPERTY);

        //Use token if present to avoid rate limiting.
        if (token){
            return this.gistClient.setToken(token).getOneById(gistId).then( (data : any) => {
                return this.getFirstFile(data)
            });
        }else {
            const resp: AxiosResponse = await axios.get('https://api.github.com/gists/' + gistId); //TODO CONST
            return this.getFirstFile(resp.data);
        }

    }

    private getFirstFile(data: any){
        // TODO should extrat only required properties to an interface
        const firstFileKey = Object.keys(data.files)[0];
        return data.files[firstFileKey];
    }

    public async importGist(gistId: string): Promise<GistFile> {
        let content: string;
        let fileName: string;
        let isAsciiDoc: boolean;
        return this.importGistAsync(gistId).then((gistFile) => {
            const language = gistFile.language.toLowerCase();

            if (this.isAsciiDoc(language)) {
                content = gistFile.content;
                fileName = gistFile.filename;
                isAsciiDoc = true;
            } else {
                content = this.enrichSourceType(gistFile.content, language);
                fileName = this.updateExtenstionToAsciiDoc(gistFile.filename);
                isAsciiDoc = false;
            }
            return { content, fileName, isAsciiDoc};
        }).catch((error) => {
            console.log(error);

            return {
                fileName: 'Not Found.adoc',
                isAsciiDoc: true,
                content: `CAUTION: The gistId '${gistId}' is Not Found.\n\nError: ${error.message}`,

            };
        });
    }
    public parseUrl(url: string) {
        // TODO handle other format of gist ids like raw url, github url etc

        const index = url.lastIndexOf('/');
        if (index > 0) {
            return url.substr( index + 1);
        } else {
            // Assuming URL to be a valid gistId
            return url;
        }

    }

    public enrichSourceType(content: string, language: string) {
        // TODO use template interpolation.
        return '[source,' + language + ']\n' +
            '----\n' + content +
            '\n----\n';
    }

    public updateExtenstionToAsciiDoc(filename: string) {
        const pos = filename.lastIndexOf('.');
        return filename.substr(0, pos < 0 ? filename.length : pos) + '.adoc';
    }
    public isAsciiDoc(language: string) {
        return language === 'asciidoc';
    }

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

export const gitHubService = new GitHubService();


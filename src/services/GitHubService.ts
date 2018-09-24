import axios, {AxiosPromise, AxiosResponse} from 'axios';
import {logDebug, logError} from '../utils/logger';

import GistClient from 'gist-client';
import Constants from '../utils/constants';

export interface GistFile {
    fileName: string;
    content: string;
    isAsciiDoc: boolean;
    ownerId: string;
}

export default class GitHubService {
    private gistClient = new GistClient();


    public isAsciiDoc(language: string) {
        return language === 'asciidoc';
    }

    public saveGist(token: string, fileName: string, content: string): Promise<any> {
        const promise = this.gistClient.setToken(token)
            .create({
                files: {
                    [fileName]: {
                        content,
                    },
                },
                description: 'Created from doculet',
                public: false,
            });

        return promise.then( (gist: any) => {
            logDebug('Gist created : ' + gist.id);
            return gist;
        }).catch((error: any) => { // TODO use popup for error msg
            const message = `CAUTION: The Gist doesn't exist or not owned by you`;
            return this.handleError(error, 'creating', message);
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
                logDebug('Gist updated : ' + gistId);
            }).catch((error: any) => { // TODO use popup for error msg
                const message = `CAUTION: The GistId '${gistId}' doesn't exist or not owned by you`;
                return this.handleError(error, 'saving', message);
            });
    }

    public deleteGist(token: string, gistId: string) {

        const result = this.gistClient.setToken(token)
            .delete(gistId);
        logDebug(`Gist : ${gistId} is deleted`);
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

    public async importGistAsync(gistId: string) {

        const token = localStorage.getItem(Constants.ACCESS_TOKEN_PROPERTY);

        // Use token if present to avoid rate limiting.
        if (token) {
            return this.gistClient.setToken(token).getOneById(gistId).then( (data: any) => {
                return this.getFirstFile(data);
            });
        } else {
            const resp: AxiosResponse = await axios.get(Constants.GITHUB_API_URL + gistId);
            return this.getFirstFile(resp.data);
        }

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

    public async importGist(gistId: string): Promise<GistFile> {
        let content: string;
        let fileName: string;
        let isAsciiDoc: boolean;
        let ownerId: string;
        return this.importGistAsync(gistId).then((gistFile) => {
            const language = gistFile.language.toLowerCase();
            console.log(gistFile);
            ownerId = gistFile.owner.id;
            if (this.isAsciiDoc(language)) {
                content = gistFile.content;
                fileName = gistFile.filename;
                isAsciiDoc = true;
            } else {
                content = this.enrichSourceType(gistFile.content, language);
                fileName = this.updateExtenstionToAsciiDoc(gistFile.filename);
                isAsciiDoc = false;
            }
            return { content, fileName, isAsciiDoc, ownerId};
        }).catch((error) => {
            const message = `CAUTION: The GistId '${gistId}' is Not Found.\n\nPlease provide valid GistId.`;
            return this.handleError(error, 'importing', message);
        });
    }

    private handleError(error: any, operation: string, message: string): GistFile {
        logError(`Error in ${operation} : ${error.message}`);
        return {
            fileName: 'Not Found.adoc',
            isAsciiDoc: true,
            content: `CAUTION: ${message}`,
            ownerId: 'Not Found',
        };
    }

    private getFirstFile(data: any) {
        // TODO should extrat only required properties to an interface
        const firstFileKey = Object.keys(data.files)[0];
        return data.files[firstFileKey];
    }
}

export const gitHubService = new GitHubService();


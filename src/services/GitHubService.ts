import axios from 'axios';


export class GitHubService {

    public getGist(): string{
        let content:string = '';

        axios.get('https://api.github.com/gists/b2e7c4bdedf6e9da27fef0faa3efad0e')
            .then(function (response) {
                content = response.data;
                console.log(response);
            }).catch(function (error) {
            console.log(error)});
        return content;
    }
}


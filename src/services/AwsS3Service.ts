import {config} from '../config/config';

export class AwsS3Service {

    public publishDoc(html: string) {

        console.log(config.aws);
        console.log(html);
    }
}

export const s3Service = new AwsS3Service();

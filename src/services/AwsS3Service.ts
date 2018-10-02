import {config} from '../config/config';
import AWS, {S3} from 'aws-sdk'
import strStream from 'string-to-stream';
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";

AWS.config.update({
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.s3BucketRegion,
});

export class AwsS3Service {

    private s3 = new AWS.S3();

    public publishDoc(docId: string, html: string) {

       /* const params = {
            Bucket: config.aws.s3BucketName || 'Bucket name not found in config',
            Body : strStream(html),
            Key : `doc/${docId}/index.html`,
        };*/

        const params = {
            Bucket: config.aws.s3BucketName || 'Bucket name not found in config',
            Delimiter: '/',
        };

        console.log(config.aws);
      //  console.log(html);

        this.s3.listObjects(params, function(err: Error, data: S3.Types.ListObjectsOutput) {
            console.log(data);

        });

        /*this.s3.upload(params, function (err: Error, data: ManagedUpload.SendData) {
            //handle error
            if (err) {
                console.log("Error", err);
            }

            //success
            if (data) {
                console.log("Uploaded in:", data.Location);
            }
        });*/
    }
}

export const s3Service = new AwsS3Service();

import {config} from '../config/config';
import AWS, {S3} from 'aws-sdk';
import {ManagedUpload} from 'aws-sdk/lib/s3/managed_upload';
import {logError, logInfo} from '../utils/logger';

AWS.config.update({
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.s3BucketRegion,
});

export class AwsS3Service {

    private s3 = new AWS.S3();
    private bucketName = config.aws.s3BucketName || 'Bucket name not found in config';
    private contentType = 'text/html';

    public publishDoc(docId: string, html: string) {

        const params = {
            Bucket: this.bucketName,
            Body : html,
            Key : `doc/${docId}/index.html`,
            ContentType: this.contentType,
        };

        this.s3.upload(params,  (err: Error, data: ManagedUpload.SendData) => {
            if (err) {
                logError(`Error in publishing doc : ${docId} to S3 ${err.message}`);
            }

            if (data) {
                logInfo(`Published at ${data.Location}`);
            }
        });
    }

    public deleteDoc(docId: string) {

        const params = {
            Bucket: this.bucketName,
            Key : `doc/${docId}/index.html`,
        };

        this.s3.deleteObject(params,  (err: Error, data: S3.Types.DeleteObjectOutput) => {
            if (err) {
                logError(`Error in deleting doc : ${docId} from S3 ${err.message}`);
            }
            if (data) {
                logInfo(`Deleted doc : ${docId}`);
            }
        });
    }
}

export const s3Service = new AwsS3Service();

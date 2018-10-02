import {config} from '../config/config';
import AWS, {S3} from 'aws-sdk'
import strStream from 'string-to-stream';
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import {ContentEncoding} from "aws-sdk/clients/s3";
import {logError, logInfo} from "@/utils/logger";

AWS.config.update({
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.s3BucketRegion,
});

export class AwsS3Service {

    private s3 = new AWS.S3();
    private bucketName = config.aws.s3BucketName || 'Bucket name not found in config';
    private contentType = "text/html";

    private listObjects(){ // TODO REMOVE
        const params = {
            Bucket: this.bucketName ,
            Delimiter: '/doc/',
        };

        this.s3.listObjects(params, function(err: Error, data: S3.Types.ListObjectsOutput) {
            logInfo(JSON.stringify(data));
        });

    }

    public publishDoc(docId: string, html: string) {

        const params = {
            Bucket: this.bucketName,
            Body : html,
            Key : `doc/${docId}/index.html`,
            ContentType: this.contentType,
        };

        this.s3.upload(params,  (err: Error, data: ManagedUpload.SendData) => {
            //handle error
            if (err) {
                logError(`Error in publishing doc : ${docId} to S3 ${err.message}`);
            }

            //success
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

        this.s3.deleteObject(params, function (err: Error, data: S3.Types.DeleteObjectOutput) {
            //handle error
            if (err) {
                logError(`Error in deleting doc : ${docId} from S3 ${err.message}`);
            }

            //success
            if (data) {
                console.log(data);
                logInfo(`Deleted doc : ${docId} at ${data}`);
            }
        });
    }
}

export const s3Service = new AwsS3Service();

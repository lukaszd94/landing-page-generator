import awsSdkv2 from 'aws-sdk';
import fs from "fs";

const s3v2 = new awsSdkv2.S3({ region: "eu-central-1" });
const bucketName = 'dealkeepers-files';

export class S3Service {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async getFile(fileName: string): Promise<any> {
    try {
      const objectParams = {
        Bucket: bucketName,
        Key: fileName
      }

      const fileData = await s3v2.getObject(objectParams).promise();

      // if want to save file on server
      // fs.writeFileSync("TEMP/" + fileName, fileData.Body);

      return fileData.Body;
    } catch (err) {
      console.log("Get file from S3 error", err);
    }
  };

  static async uploadFile(fileName: string) {
    const fileContent = fs.readFileSync("TEMP/" + fileName);

    const bucketParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileContent
    };

    try {
      const data = await s3v2.upload(bucketParams).promise();

      console.log(
        "Successfully uploaded object: " +
        bucketParams.Bucket +
        "/" +
        bucketParams.Key
      );

      return data;

    } catch (err) {
      console.log("Upload file from /TEMP/ to S3 error", err);
      return null;
    }
  };

  static async listFiles() {
    const bucketParams = {
      Bucket : 'dk-attachments',
    };

    // Call S3 to obtain a list of the objects in the bucket
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    s3v2.listObjects(bucketParams, function(err: any, data: any) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  }

  static async getBucketUrl() {
    const bucketParams = {
      bucketName : 'dealkeepers-files',
      region: 'eu-central-1'
    };

    return `https://${bucketParams.bucketName}.s3${bucketParams.region}.amazonaws.com`;
  }
}


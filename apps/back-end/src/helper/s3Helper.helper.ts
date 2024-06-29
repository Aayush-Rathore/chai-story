import ApiError from "../utilities/apiError.utility";
import {
  PutObjectCommandInput,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

class S3Helper {
  private credentials = {
    accessKeyId: process.env.AWS_S3_ACCEESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  };

  private s3Client(): S3Client {
    const s3 = new S3Client({
      endpoint: process.env.AWS_S3_END_POINT,
      credentials: this.credentials,
      region: process.env.AWS_S3_REGION,
    });
    return s3;
  }

  public async uploadToS3(fileName: string, storyContent: string) {
    try {
      const uploadParams: PutObjectCommandInput = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: storyContent,
        ACL: "public-read",
      };

      const s3 = this.s3Client();

      const upload: Upload = new Upload({
        client: s3,
        params: uploadParams,
      });
      const metaData = await upload.done();

      return metaData.Location;
    } catch (error) {
      console.log(error);
      throw new ApiError(
        500,
        "Auto-Save Failed",
        "Something went wrong while saving the document",
        {
          message: "This error is related to file uploading to the cloud!",
          error,
        }
      );
    }
  }

  public async GetSignedUrl(fileName: string) {
    const s3 = this.s3Client();

    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${fileName}.mdx`,
        Body: "Hello Buddy",
      },
    });

    await upload.done();

    const get_command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${fileName}.mdx`,
      ResponseContentDisposition: `attachment; filename="${fileName}.mdx"`,
    });

    const url = await getSignedUrl(s3, get_command, {
      expiresIn: 60 * 10 * 1000,
    });
    return url;
  }
}

export default new S3Helper();

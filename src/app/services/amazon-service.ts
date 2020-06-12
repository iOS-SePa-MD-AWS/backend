import { S3, SES } from "aws-sdk"

interface mailerParams {
    recipient: string[],
    html: string,
    title: string,
}

const source = process.env.MAIL_SOURCE

export const SESService = () => {
    const ses  = new SES() 
    
    const sendMail = (params: any): Promise<SES.SendEmailResponse> => {
        return new Promise((resolve, reject) => {
          ses.sendEmail(params, (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          });
        });
      }
     
      const generateParams = ({ recipient, html, title }: mailerParams) => {
        return {
          Destination: {
            ToAddresses: recipient,
          },
          Message: {
            Body: {
              Html: {
                Charset: "UTF-8",
                Data: html,
              },
            },
            Subject: {
              Charset: "UTF-8",
              Data: title,
            },
          },
          Source: source,
        };
      }
     
      const send = (params: mailerParams): Promise<SES.SendEmailResponse> => {
        const data = generateParams(params);
        return sendMail(data);
      }

      return send
}

export const S3service = () => {
    const s3 = new S3()

    const upload = async (body: S3.Body, key: S3.ObjectKey, bucket: string): Promise<S3.ManagedUpload.SendData> => {
        return new Promise((resolve, reject) => {
          s3.upload({ Bucket: bucket, Body: body, Key: key }, (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          });
        });
    }

    return upload
}
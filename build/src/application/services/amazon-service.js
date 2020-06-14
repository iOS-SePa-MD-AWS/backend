"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.SESService = void 0;
const aws_sdk_1 = require("aws-sdk");
const source = process.env.MAIL_SOURCE;
exports.SESService = () => {
    const ses = new aws_sdk_1.SES();
    const sendMail = (params) => {
        return new Promise((resolve, reject) => {
            ses.sendEmail(params, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    };
    const generateParams = ({ recipient, html, title }) => {
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
    };
    const send = (params) => {
        const data = generateParams(params);
        return sendMail(data);
    };
    return send;
};
exports.upload = async (body, key) => {
    const s3 = new aws_sdk_1.S3();
    return new Promise((resolve, reject) => {
        s3.upload({ Bucket: process.env.FILES_BUCKET || "zdam", Body: body, Key: key }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

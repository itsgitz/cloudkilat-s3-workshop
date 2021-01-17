/**
 * KilatStorage example
 * @author: Anggit M Ginanjar
 */

let http = require('http');
let uuid = require('uuid');
let config = require('./config/config');
let aws = require('aws-sdk');

http.createServer(function (req, res) {
    kilatStorageCreateBucket();
    kilatStorageGetObject();
    kilatStorageListObjects();

    res.writeHead(200, { 'Content-Type': 'text/html' });

    // show config:
    console.log(config);

    res.end(`
        <title>KilatStorage Example in JavaScript</title>

        <body>
            <h1>Coba Kilat Storage</h1>
            <p>Coba cek terminal untuk liat log.</p>
        </body>
    `);
}).listen(8000);


function kilatStorageCreateBucket() {
    let newBucket = 'new-bucket-' + uuid.v4();
    let keyObject = 'hello-itsgitz.txt'; // nama file
    let s3 = new aws.S3({
        region: config.region,
        endpoint: config.kilatStorageEndpoint,
        credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey
        }
    }).createBucket({Bucket: newBucket}).promise();

    s3.then(function (data) {
        console.log(data);

        // // create new object or file
        // newObject = new aws.S3({
        //     region: config.region,
        //     endpoint: config.kilatStorageEndpoint,
        //     credentials: {
        //         accessKeyId: config.accessKeyId,
        //         secretAccessKey: config.secretAccessKey
        //     }
        // }).putObject({Bucket: newBucket, Key: keyObject, Body: 'Hello from itsgitz!'}).promise();

        // newObject.then(function(data) {
        //     console.log(data);
        // }).catch(err => {
        //     console.error(err);
        // });

    }).catch(err => {
        console.error(err)
    })
}

function kilatStorageGetObject() {
    let s3 = new aws.S3({
        region: config.region,
        endpoint: config.kilatStorageEndpoint,
        credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey
        }
    }).getObject({
        Bucket: config.bucketName,
        Key: config.storageObject
    }).promise();

    s3.then(function (data) {
        console.log('getObject:', data);
    }).catch(err => {
        console.error(err);
    })
}

function kilatStorageListObjects() {
    // show list objects
    let s3 = new aws.S3({
        region: config.region,
        endpoint: config.kilatStorageEndpoint,
        credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey
        }
    }).listObjects({
        Bucket: config.bucketName
    }).promise();

    s3.then(function (data) {
        console.log('listObject:', data)
    }).catch(err => {
        console.error(err);
    })
}
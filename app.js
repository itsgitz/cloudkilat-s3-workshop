/**
 * KilatStorage example
 * @author: Anggit M Ginanjar
 */

let http = require('http');
let config = require('./config/config');
let aws = require('aws-sdk');

http.createServer(function (req, res) {
    // show list objects
    let kilatListObject = new aws.S3({
        endpoint: config.kilatStorageEndpoint,
        credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey
        }
    }).listObjects({
        Bucket: config.bucketName
    }).promise();

    kilatListObject.then(function(data) {
        console.log('listObject:', data)
    }).catch(err => {
        console.error(err);
    })
    // Get Object
    let kilatGetObject = new aws.S3({
        endpoint: config.kilatStorageEndpoint,
        credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey
        }
    }).getObject({
        Bucket: config.bucketName, 
        Key: config.storageObject
    }).promise();

    kilatGetObject.then(function(data) {
        console.log('getObject:', data);
    }).catch(err => {
        console.error(err);
    })

    res.writeHead(200, {'Content-Type' : 'text/html'});

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
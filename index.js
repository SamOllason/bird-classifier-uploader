async function uploadFile(filename) {
    // [START storage_upload_file]
    // Imports the Google Cloud client library
    const {Storage} = require('@google-cloud/storage');

    // Creates a client
    // const storage = new Storage();

    // Instantiates a client. Explicitly use service account credentials by
    // specifying the private key file. All clients in google-cloud-node have this
    // helper, see https://github.com/GoogleCloudPlaatform/google-cloud-node/blob/master/docs/authentication.md
    const projectId    = 'prime-micron-245511';
    const keyFilename  = './private_key.json';
    const storage      = new Storage({projectId, keyFilename});
    const bucketName   = 'bird-tracker-bucket-1';

    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
            metadata: {
                foo: 'bar'

                // TODO: add classification category here from ML process
                // category: category
            }
        },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
    // [END storage_upload_file]
}

const filename = './dog_1.jpg';

uploadFile(filename);

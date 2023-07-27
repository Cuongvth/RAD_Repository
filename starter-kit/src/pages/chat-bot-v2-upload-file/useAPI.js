import { BlobServiceClient } from "@azure/storage-blob";
import axios from "axios";

const containerName = `data`;
const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-07-27T17:14:37Z&st=2023-07-27T09:14:37Z&spr=https,http&sig=h5rOSt%2FkR2Z56upvofloVpd5BKvMOS5491kBnqixyfA%3D";
const storageAccountName = "ltsgroupchatstorage";

const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

const blobService = new BlobServiceClient(uploadUrl);

const containerClient =blobService.getContainerClient(containerName);

export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};

export const getBlobsInContainer = async () => {
  const returnedBlobUrls = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`${blob.name}`);

    const blobItem = {
      url: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`,
      name: blob.name,
    };

    // if image is public, just construct URL
    returnedBlobUrls.push(blobItem);
  }

  return returnedBlobUrls;
};

const createBlobInContainer = async file => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);
};

export const uploadFileToBlob = async file => {
  if (!file) return;

  // upload file
  await createBlobInContainer(file);
};

export function runIndexer() {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ltsgroupchatsearch.search.windows.net/indexers/azureblob-indexer/run?api-version=2020-06-30',
      headers: { 
        'Content-Type': 'application/json', 
        'api-key': '059P2TpaRs88QTLpBQtNJairu1OD0ksso8A9NVGLX2AzSeD2R8vF',
      },
    };
      
    axios.request(config)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
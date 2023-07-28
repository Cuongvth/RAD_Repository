import { BlobServiceClient } from "@azure/storage-blob";
import axios from "axios";

const containerName = `data`;
const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-07-28T09:50:07Z&st=2023-07-28T01:50:07Z&spr=https,http&sig=q1z39z1cQ3FaJ0gFCdrl1yOOIIX991Qzf0JY3dq8mhc%3D";
const storageAccountName = "ltsdemostorage";

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
    const blobItem = {
      url: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`,
      name: blob.name,
      createdOn: blob.properties.createdOn,
      contentType: blob.properties.contentType,
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

/*
Chạy indexer
*/
// export function runIndexer() {
//   return new Promise((resolve, reject) => {
//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://ltsgroupchatsearch.search.windows.net/indexers/azureblob-indexer/run?api-version=2020-06-30',
//       headers: { 
//         'Content-Type': 'application/json', 
//         'api-key': '059P2TpaRs88QTLpBQtNJairu1OD0ksso8A9NVGLX2AzSeD2R8vF',
//         "Access-Control-Allow-Origin": "*",
//       },
//     };
      
//     axios.request(config)
//       .then(response => {
//         resolve(response);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }
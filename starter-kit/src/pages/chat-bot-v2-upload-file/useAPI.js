import { BlobServiceClient } from "@azure/storage-blob";
import axios from "axios";

const containerName = `data`;
const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-07-28T14:30:45Z&st=2023-07-28T06:30:45Z&spr=https,http&sig=KNWyZZQuXIzpICuPBE1DjH0S%2FzXtM3iIbQ1mIc055ls%3D";
const storageAccountName = "ltsdemochatstorage";

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

export const deleteBlobInContainer = async name => {
  // create blobClient for container
  await containerClient.deleteBlob(name);
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
// import S3FileUpload from 'react-s3';


import AWS from 'aws-sdk';
// import { resolve } from 'path';
class awsServices {


    constructor() {  }

s3Upload=async({file,filename})=>{
 
        // const config = {
        //     bucketName: process.env.bucketName,
        //     region: process.env.region,
        //     accessKeyId: process.env.accessKeyId,
        //     secretAccessKey: process.env.secretAccessKey

        // }
        // S3FileUpload
        //     .uploadFile(file, config)
        //     .then((data)=>{
        //         console.log(data,"uploadedData")
        //         resolve(data.location)
        //     })
        //     .catch((err)=>{
        //         console.log(err,"error")
        //         reject(err)
        //     })

        AWS.config.update({
            region: process.env.region,
            accessKeyId: process.env.accessKeyId,
            secretAccessKey: process.env.secretAccessKey
        })
        
        const upload = new AWS.S3.ManagedUpload({
            
            params: {
                Bucket: process.env.bucketName,
                Body: file,
                Key: 'test/' + filename,
            }

        })

        
    

    return upload.promise()
   
}



 
} 

export default awsServices;
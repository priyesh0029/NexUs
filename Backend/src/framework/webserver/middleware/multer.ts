import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { Request } from "express";



const options:any = {
    cloudinary: cloudinary,
    params: {
      folder:'posts',
      allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
      public_id: (req:Request, file:any) => {
        console.log(file, 'fileisssss');
        const originalname = file.originalname.split('.')
        return `image-${Date.now()}-${originalname[0]}`
      }
    }
  }

  const profilePictureOptions: any = {
    cloudinary: cloudinary,
    params: {
      folder: 'profile-pictures',
      allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
      public_id: (req: Request, file: any) => {
        console.log(file, 'propic file');
        const originalname = file.originalname.split('.');
        return `profile-image-${Date.now()}-${originalname[0]}`;
      }
    }
  };

  
  const store = new CloudinaryStorage(options)
  const profilePictureStore = new CloudinaryStorage(profilePictureOptions);

  
  const uploadsMulter = multer({ storage: store }).array('image', 5)
  const uploadsProfilePictureMulter = multer({ storage: profilePictureStore }).single('dp');

  
  export { uploadsMulter, uploadsProfilePictureMulter }
  
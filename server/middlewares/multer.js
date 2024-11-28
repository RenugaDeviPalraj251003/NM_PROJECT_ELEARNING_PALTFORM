import multer from "multer";

import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    const fileName = `${id}.${extName}`; // Corrected template literal
    cb(null, fileName)

;
   
  },
});
 
//export const uploadFiles = multer({ storage }).single("file");
export const uploadFiles = multer({ storage }).array("files", 5); // 5 is the max number of files allowed


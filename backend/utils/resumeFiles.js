const fs = require("fs");
const mongoose = require("mongoose");

const getBucket = () =>
  new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "resumeFiles",
  });

const uploadResumeFile = (file) =>
  new Promise((resolve, reject) => {
    const uploadStream = getBucket().openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });

    uploadStream.once("error", reject);
    uploadStream.once("finish", () => resolve(uploadStream.id));
    uploadStream.end(file.buffer);
  });

const getResumeFile = (id) =>
  getBucket().find({ _id: new mongoose.Types.ObjectId(id) }).next();

const downloadResumeFile = (id) =>
  getBucket().openDownloadStream(new mongoose.Types.ObjectId(id));

const deleteResumeFile = async (filePath) => {
  const fileId = filePath?.match(/^api\/files\/([a-f\d]{24})$/i)?.[1];

  if (fileId) {
    try {
      await getBucket().delete(new mongoose.Types.ObjectId(fileId));
    } catch (error) {
      if (error.code !== 26) throw error;
    }
  } else if (filePath?.startsWith("uploads/") && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

module.exports = {
  uploadResumeFile,
  getResumeFile,
  downloadResumeFile,
  deleteResumeFile,
};
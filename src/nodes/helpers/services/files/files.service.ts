import { upload } from './actions/upload';
import { downloadById } from './actions/downloadById';
import { deleteFileById } from './actions/deleteFileById';

const filesActions = {
  upload,
  downloadById,
  deleteFileById,
};

module.exports = filesActions;

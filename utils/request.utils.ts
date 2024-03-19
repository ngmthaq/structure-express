import multer from "multer";

export function handleFormDataFiles(configs: Array<multer.Field>) {
  const upload = multer({ dest: ".tmp-uploaded-files/" });
  return upload.fields(configs);
}

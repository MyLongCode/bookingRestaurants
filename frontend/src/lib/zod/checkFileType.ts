export const MAX_FILE_SIZE = 5000000;

export function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.type;
    if (
      fileType === "image/jpeg" ||
      fileType === "image/png" ||
      fileType === "image/webp"
    )
      return true;
  }
  return false;
}

export const validateImageFile = (files: FileList): boolean => {
    const fileList: File[] = Array.from(files)
    const allowedImageTypes: string[] = ["image/jpeg", "image/png", "image/gif"]
    const hasInvalidFileType: boolean = fileList.some(
      (file: File) => !allowedImageTypes.includes(file.type)
    )
  
    if (hasInvalidFileType) {
      return false
    }
  
    return true
}
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

export const validateDocFile = (files: FileList): boolean => {
  const fileList: File[] = Array.from(files)
  const allowedExtensions: string[] = [".pdf", ".xlsx", ".docx"]
  const hasInvalidExtension: boolean = fileList.some((file: File) => {
    const fileName: string = file.name
    const fileExtension: string = fileName
      .substring(fileName.lastIndexOf("."))
      .toLowerCase()
    return !allowedExtensions.includes(fileExtension)
  })
  console.log(hasInvalidExtension,'esto??')
  if (hasInvalidExtension) {
    return false
  }

  return true
}

export const FilePreview = ({ file, style }: any) => {
  const isValidUrl = (urlString: any) => {
    try {
      return Boolean(new URL(urlString))
    } catch (e) {
      return false
    }
  }

  if (isValidUrl(file)) {
    return <img height={'100%'} width={'100%'} src={file} alt='profile-picture' />
  } else {
    if (file?.type?.startsWith('image')) {
      return <img height={'100%'} width={'100%'} src={URL.createObjectURL(file)} alt='slider-image' />
    } else {
      return (
        <img
          style={style ? style : {}}
          height={'100%'}
          width={'100%'}
          src={'/images/logo/pngtree-gray-network-placeholder-png-image_3416659.jpg'}
          alt='slider-image'
        />
      )
    }
  }
}

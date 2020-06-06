import { useEffect, useState } from 'react'
import ShareButton from '../components/ShareButton'
import Lightbox from 'react-image-lightbox'


const Landing = () => {
  const [images, setImages] = useState(null)
  const [imageIndex, setImageIndex] = useState(null)
  const [imageDetails, setImageDetails] = useState(null)
  const [openLightbox, setOpenLightbox] = useState(false)

  const authPath = "http://interview.agileengine.com/auth"
  const getImages = "http://interview.agileengine.com/images"
  const getImage = "http://interview.agileengine.com/images"
  
  const selectImage = (id) => () => {
    setOpenLightbox(true)
    setImageIndex(id)
  }

  useEffect(() => {
    fetch(authPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        { apiKey: process.env.AE_API_KEY }
      )
    })
    .then(response => response.json())
    .then((body) => {
      fetch(getImages, {
        headers: {
          'Authorization': `Bearer ${body.token}`
        }
      })
      .then(res => res.json())
      .then(body => setImages(body))
    })
  }, [])

  useEffect(() => {
    if (images && imageIndex !== null) {
      // console.log(images, imageIndex)
      fetch(authPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          { apiKey: process.env.AE_API_KEY }
        )
      })
      .then(response => response.json())
      .then((body) => {
        fetch(`${getImage}/${images.pictures[imageIndex].id}`, {
          headers: {
            'Authorization': `Bearer ${body.token}`
          }
        })
        .then(res => res.json())
        .then(body => setImageDetails(body))
      })
    }
  }, [images, imageIndex])

  if (!images) {
    return "No images"
  }

  return (
  <div>
    <div className="grid">
      {images.pictures.map((image, id) => {
        return (
          <a 
            href="#" 
            key={image.id} 
            onClick={selectImage(id)}
          >
            <img src={image.cropped_picture} />
          </a>
        )
      })}
    </div>
    {openLightbox && (
      <Lightbox 
        mainSrc={imageDetails ? imageDetails.full_picture : images.pictures[imageIndex].cropped_picture}
        prevSrc={images.pictures[(imageIndex + images.pictures.length - 1) % images.pictures.length]}
        nextSrc={images.pictures[(imageIndex + 1) % images.pictures.length]}
        onCloseRequest={() => setOpenLightbox(false)}
        onMovePrevRequest={() => setImageIndex((imageIndex + images.pictures.length - 1) % images.pictures.length)}
        onMoveNextRequest={() => setImageIndex((imageIndex + 1) % images.pictures.length)}
        imageCaption={imageDetails ? `${imageDetails.author} | ${imageDetails.camera} | ${imageDetails.tags}`  : ""}
        toolbarButtons={[<ShareButton url="lalala" />]}
      />
    )}
  </div>)
}

export default Landing
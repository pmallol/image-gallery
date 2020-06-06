import { useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox'

const Landing = () => {
  const [images, setImages] = useState(null)
  const [imageIndex, setImageIndex] = useState(null)
  const [openLightbox, setOpenLightbox] = useState(false)

  const authPath = "http://interview.agileengine.com/auth"
  const getImages = "http://interview.agileengine.com/images"

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
            onClick={() => {
              setOpenLightbox(true)
              setImageIndex(id)
            }}
          >
            <img src={image.cropped_picture} />
          </a>
        )
      })}
    </div>
    {openLightbox && (
      <Lightbox 
        mainSrc={images.pictures[imageIndex].cropped_picture}
        onCloseRequest={() => setOpenLightbox(false)}
      />
    )}

  </div>)
}

export default Landing
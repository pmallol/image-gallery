import Router from 'next/router'
import { useEffect, useState } from 'react'
import ShareButton from '../components/ShareButton'
import Button from '../components/Button'
import Lightbox from 'react-image-lightbox'

import { fetchImages, fetchImage } from '../utils/api'

const Landing = () => {
  const [images, setImages] = useState(null)
  const [imageIndex, setImageIndex] = useState(null)
  const [imageDetails, setImageDetails] = useState(null)
  const [page, setPage] = useState(1)
  const [openLightbox, setOpenLightbox] = useState(false)
  
  const selectImage = (id) => () => {
    const href = `/?imageId=${images.pictures[id].id}&page=${page}`
    setOpenLightbox(true)
    setImageIndex(id)
    Router.push(href, href, { shallow: true });
  }
  const nextPage = () => {
    setPage(page + 1)
  }
  const previousPage = () => {
    setPage(page - 1)
  }

  useEffect(() => {
    setPage(Router.query.page || 1)
  }, [])

  useEffect(() => {
    setImages(null)
    fetchImages(page).then(body => {
      setImages(body)
    })
  }, [page])

  useEffect(() => {
    if (images && imageIndex !== null) {
      fetchImage(images.pictures[imageIndex].id)
      .then(body => setImageDetails(body))
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
        prevSrc={images.pictures[(imageIndex + images.pictures.length - 1) % images.pictures.length].cropped_picture}
        nextSrc={images.pictures[(imageIndex + 1) % images.pictures.length].cropped_picture}
        onCloseRequest={() => setOpenLightbox(false)}
        onMovePrevRequest={() => setImageIndex((imageIndex + images.pictures.length - 1) % images.pictures.length)}
        onMoveNextRequest={() => setImageIndex((imageIndex + 1) % images.pictures.length)}
        imageCaption={imageDetails ? `${imageDetails.author} | ${imageDetails.camera} | ${imageDetails.tags}` : ""}
        toolbarButtons={[<ShareButton url={window.location.href} />]}
      />
    )}
    <div className="pagination">
      {page > 1  && (
        <Button 
          onClick={() => previousPage()}
          value="Prev"
        />
        )
      }
      {page < 26 && (
        <Button 
          onClick={() => nextPage()}
          value="Next"
        />
      )}
    </div>
  </div>)
}

export default Landing
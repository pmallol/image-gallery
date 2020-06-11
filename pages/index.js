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
    setOpenLightbox(true)
    setImageIndex(id)
    
    const href = `/?imageId=${images.results[id].id}&page=${page}`
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
      fetchImage(images.results[imageIndex].id)
      .then(body => setImageDetails(body))
    }
  }, [images, imageIndex])

  if (!images) {
    return "No images"
  }

  return (
  <div>
    <div className="grid">
      {images.results.map((image, id) => {
        return (
          <a 
            href="#" 
            key={image.id} 
            onClick={selectImage(id)}
          >
            <img src={image.urls.small} />
          </a>
        )
      })}
    </div>
    {openLightbox && (
      <Lightbox
        mainSrc={imageDetails ? imageDetails.urls.full : images.results[imageIndex].urls.small}
        prevSrc={images.results[(imageIndex + images.results.length - 1) % images.results.length].urls.small}
        nextSrc={images.results[(imageIndex + 1) % images.results.length].urls.small}
        onCloseRequest={() => setOpenLightbox(false)}
        onMovePrevRequest={() => setImageIndex((imageIndex + images.results.length - 1) % images.results.length)}
        onMoveNextRequest={() => setImageIndex((imageIndex + 1) % images.results.length)}
        imageCaption={imageDetails ? `${imageDetails.user.name} | ${imageDetails.exif.model} | #${imageDetails.tags[1].title}` : ""}
        toolbarButtons={[<ShareButton url={imageDetails ? imageDetails.full_picture : images.results[imageIndex].urls.small} />]}
      />
    )}
    <div className="pagination">
      {page > 1 && (
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

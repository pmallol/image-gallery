import { useEffect, useState } from 'react'
import './styles.scss'

const Landing = () => {
  const [images, setImages] = useState("")

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
      {images.pictures.map((image) => {
        return (
          <a href="#" key={image.id}>
            <img src={image.cropped_picture} />
          </a>
        )
      })}
    </div>
  </div>)
}

export default Landing
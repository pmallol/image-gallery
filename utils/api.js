// const authPath = "http://interview.agileengine.com/auth"
// const getImages = "http://interview.agileengine.com/images"

// Replace original path with Unsplash photos
const getImages = "https://api.unsplash.com/search/photos"
const params = "query=nature-forest-mountain&orientation=squarish&per_page=9"

export const fetchToken = () => {
  if(localStorage.getItem('token')) {
    return localStorage.getItem('token')
  } else {
   return(
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
    .then(body => {
      localStorage.setItem('token', body.token)
      return body.token
    })
  )}
}

export const fetchImages = async(page) => {
  // const token = await fetchToken()
  return (
    fetch(`${getImages}?page=${page}&${params}`, {
      headers: {
        // 'Authorization': `Bearer ${token}`
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    })
    .then(res => res.json())
  )
}

export const fetchImage = async(id) => {
  // const token = await fetchToken()
  return (
    fetch(`${getImages}/${id}`, {
      headers: {
        // 'Authorization': `Bearer ${token}`
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    })
    .then(res => res.json())
  )
}

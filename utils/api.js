const authPath = "http://interview.agileengine.com/auth"
const getImages = "http://interview.agileengine.com/images"

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
  const token = await fetchToken()
  return (
    fetch(`${getImages}?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
  )
}

export const fetchImage = async(id) => {
  const token = await fetchToken()
  return (
    fetch(`${getImages}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
  )
}
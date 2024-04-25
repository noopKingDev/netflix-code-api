import axios from 'axios'

export default async function CheckerCookie(cookie) {
  
  const response = await axios({
    url:'https://netflix.com/browse',
    method:'GET',
    headers :{
      Cookie : String(cookie)
    }
  })
  const currentUrl = response.request["_redirectable"]["_currentUrl"];
  console.log(currentUrl)
  if(currentUrl === 'https://www.netflix.com/browse') return true
  return
  
}
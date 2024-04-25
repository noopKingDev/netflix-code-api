import dataUsers from '../../../Data/users/data.json' assert {type : "json"}

export default async function isUser(req,res,next) {
  
  try {
 if (!req.body?.token) throw new Error('Voçe precisa de um token para isso')
  
  const {token } = req.body
  if(!dataUsers?.[token]) throw new Error('Voçe precisa de um token para isso')
  
  next()
  } catch (e) {
    
    return res.send({
      success:false,
      result : e.message
    })
  }
  
}
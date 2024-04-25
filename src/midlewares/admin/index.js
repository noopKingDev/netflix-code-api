import dataUsers from '../../../Data/users/data.json' assert {type : "json"}

export default async function isAdmin(req,res,next) {
  
  try {
 if (!req.body?.token) throw new Error('Voçe precisa de um token para isso')
  
  const {token } = req.body
  if(!dataUsers?.[token] || !dataUsers?.[token]?.admin) throw new Error('Voçe não tem autorização para isso')
  
  next()
  } catch (e) {
    
    return res.send({
      success:false,
      result : e.message
    })
  }
  
}
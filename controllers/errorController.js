module.exports = (err, req, res, next) => {
  if(err.name==="JsonWebTokenError")
    return res.status(401).json({msg: err.message})
  if(err.name==="TokenExpiredError")
    return res.status(401).json({msg: err.message})
  res.status(500).json({Error : err.message})
  console.log(err)
}
const logout = (req,res)=>{
  res.clearCookie('accessToken');
  res.redirect('/login');
}
module.exports={logout}

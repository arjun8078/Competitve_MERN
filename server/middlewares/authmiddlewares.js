
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
}
function checkAdminOrOwner(req, res, next) {
 
  if (req.user.role === "admin") {
    return next();
  }


  if (req.user.id === req.params.id) {  
    return next();
  }


  return res.status(403).send("Not authorized to update this score");
}
module.exports = { authMiddleware, checkAdminOrOwner };

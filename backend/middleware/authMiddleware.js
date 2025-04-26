const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    // Attach the entire decoded object to req.user
    req.user = decoded;  // This will contain userId and potentially other details like email
    console.log('Decoded user:', req.user);  // Log the decoded user to verify
    next();
  });
};

module.exports = authenticateToken;

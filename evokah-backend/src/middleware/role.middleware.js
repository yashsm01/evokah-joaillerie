'use strict';

/**
 * Role-based access control middleware.
 * Usage: router.post('/products', verifyToken, authorizeRoles('MASTER_ADMIN', 'EDITOR'), ctrl)
 */
const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  const roleName = req.user?.role;
  if (!roleName || !allowedRoles.includes(roleName))
    return res.status(403).json({ message: `Forbidden: requires one of [${allowedRoles.join(', ')}]` });
  next();
};

module.exports = { authorizeRoles };

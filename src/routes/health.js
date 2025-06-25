const express = require('express');
const router  = express.Router();

/**
 * GET /api/health
 * A very small “liveness” probe so Kubernetes / Docker / Nginx-status pages (or you!)
 * can see that the API layer is up.
 */

router.get('/', (req, res) => {
  res.status(200).json({ status: 'API working' });
});

module.exports = router;

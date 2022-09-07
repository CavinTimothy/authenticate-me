// Contains resources for route paths
// beginning with '/api/users'
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// ***SIGNUP***
router.post('/', async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const user = await User.signup({ firstName, lastName, email, username, password });

  await setTokenCookie(res, user);

  return res.json({ user });
}
);

module.exports = router;

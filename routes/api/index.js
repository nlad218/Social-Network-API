const router = require('express').Router();
const thoughtRoutes = require('./thoughtroutes');
const userRoutes = require('./userroutes');

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;

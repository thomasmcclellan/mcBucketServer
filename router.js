const Auth = require('./controllers/auth.js'); 
const BucketList = require('./controllers/bucketlistcontroller.js');

const passportService = require('./services/passport.js');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app){
	app.post('/api/signup', Auth.signup);
	app.post('/api/signin', requireSignin, Auth.signin);
	app.post('/api/newitem', requireAuth, BucketList.addBucketList);
	app.get('/api/items', requireAuth, BucketList.fetchBucketLists);
	app.get('/api/items/:id', requireAuth, BucketList.fetchBucketList);
	app.put('/api/items/:id', requireAuth, BucketList.updateBucketList);
	app.delete('/api/items/:id', requireAuth, BucketList.deleteBucketList);
}
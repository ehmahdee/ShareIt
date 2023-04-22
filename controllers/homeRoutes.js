const router = require('express').Router();
const { test } = require('node:test');

const {  User } = require('../models');

const withAuth = require('../utils/auth');

const li_client_id = process.env.LI_CLIENT_ID;
const li_client_secret = process.env.LI_CLIENT_SECRET;

function litoken (query) {
   let key;
  if (query.code || query.state) {
    console.log("linked")
    if (query.state !== 'foobar') {
      console.error('Unauthorized Access');
    } else {
      const exchangeAccessToken = async () => {
        try {
          const response = await fetch(`https://www.linkedin.com/oauth/v2/accessToken?code=${query.code}&grant_type=authorization_code&client_id=${li_client_id}&client_secret=${li_client_secret}&redirect_uri=http://localhost:3001/test`);
          key = await response.json();
          console.log(key);
        } catch (err) {
          console.error(err);
        }
        try {
          console.log(key.access_token);
          const profileData = await fetch('https://api.linkedin.com/v2/me',{headers:{Authorization: `Bearer ${key.access_token}`, method: 'GET'}});
          let data = await profileData.json();
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      }
      exchangeAccessToken();
    } 
  }
}




router.get('/hub', async (req, res) => {
  try {
    
    res.render('hub', {

      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    
    res.render('homepage', {

      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });

    res.render('hub', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/hub');
    return;
  }

  res.render('login', {li_key:process.env.LI_CLIENT_ID, li_cs:process.env.LI_CLIENT_SECRET});

});

router.get('/test', async (req, res) => {
  // If the user is already logged in, redirect the request to another route

 if (!req.query) {

  res.render('test1', {li_key:process.env.LI_CLIENT_ID, li_cs:process.env.LI_CLIENT_SECRET});
 } else {
    console.log(req.query);
    litoken(req.query);
    res.render('test1', {li_key:process.env.LI_CLIENT_ID, li_cs:process.env.LI_CLIENT_SECRET});
 }
});


module.exports = router;

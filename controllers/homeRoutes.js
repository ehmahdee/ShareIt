const router = require('express').Router();
const { test } = require('node:test');
const fetch = require('node-fetch');
const url = require('url');

// const { queryParser } = require('express-query-parser')

const {  User } = require('../models');

const withAuth = require('../utils/auth');
const { error } = require('console');

// .env keys
const li_client_id = process.env.LI_CLIENT_ID;
const li_client_secret = process.env.LI_CLIENT_SECRET;
const appId = process.env.FB_CLIENT_ID;
const appSecret = process.env.FB_CLIENT_SECRET;;

// linkedin login functionality
// TODO: creae Model with information received from linkedin

const Account = require('../models/Account');

async function litoken(query,user_id) {
  let key;
  if (query.code || query.state) {
    console.log("linked")
    if (query.state !== 'foobar') {
      console.error('Unauthorized Access');
    } else {
      const exchangeAccessToken = async () => {
        try {
          const response = await fetch(`https://www.linkedin.com/oauth/v2/accessToken?code=${query.code}&grant_type=authorization_code&client_id=${li_client_id}&client_secret=${li_client_secret}&redirect_uri=http://localhost:3001/profile/linkedin`);
          key = await response.json();
          console.log(key);
        } catch (err) {
          console.error(err);
        }
        try {
          console.log("access token " + key.access_token);
          const profileData = await fetch('https://api.linkedin.com/v2/me',{headers:{Authorization: `Bearer ${key.access_token}`, method: 'GET'}});
          let data = await profileData.json();
          console.log('linkedIn',data);

          // Save the LinkedIn data to an Account model
          await Account.create({
            platform: 'LinkedIn',
            sm_id: data.id,
            access_token: key.access_token,
            secondary_id: data.localizedLastName + ', ' + data.firstName.localized.en_US,
            user_id: user_id
          });


        } catch (err) {
          console.error(err);
        }
      };
      exchangeAccessToken();
    }
  }
}

// instagram login functionality
// TODO: creae Model with information received from Instagram
function igtoken (short_access_token) {
  console.log(short_access_token);


  if (short_access_token) {
      let longAccess_token;
      let userPageID;
      let pageAccess_token;
      const exchangeAccessToken = async () => {
          try {
              const response = await fetch(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${short_access_token}`);
              
              // if (!response.ok) {
              //     throw new Error('Access token exchange failed');
              // }
              const json = await response.json();
              console.log("long lived access token:  " + json.access_token); // This is your long-lived access token
              longAccess_token = json.access_token;
          } catch (error) {
              console.error(error);
              // Display an error message or take some other action
          }
          try {
              // getting user pages
              const response = await fetch(`https://graph.facebook.com/v16.0/me/accounts?access_token=${longAccess_token}`);
              if (!response.ok) {
                  throw new Error('Instagram data fetch failed');
              }
              const json = await response.json();
              console.log(json);

              userPageID = json.data[0].id;
              console.log("User Page ID:  " + userPageID);
          } catch (error) {
              console.error(error);
              // Display an error message or take some other action
          }
          try {
              const response = await fetch(`https://graph.facebook.com/${userPageID}?fields=access_token&access_token=${longAccess_token}`);
              
              // if (!response.ok) {
              //     throw new Error('Access token exchange failed');
              // }
              const json = await response.json();
              console.log("Page Access Token:  " + json.access_token); // This is your Page access token
              pageAccess_token = json.access_token;
          } catch (error) {
              console.error(error);
              // Display an error message or take some other action
          }
          try {
              // getting IG busines account
              const response = await fetch(`https://graph.facebook.com/v16.0/${userPageID}?fields=instagram_business_account&access_token=${pageAccess_token}`);
              // if (!response.ok) {
              //     throw new Error('Instagram data fetch failed');
              // }
              const json = await response.json();
              console.log("IG ID:  " + json);
          } catch (error) {
              console.error(error);
              // Display an error message or take some other action
          }
      
      };

      exchangeAccessToken(); // Call the function to exchange the access token
  }
}

// 
//  ROUTES 
// 

// hub route
// TODO: Send User and Acoount models
router.get('/hub', async (req, res) => {
  try {
    
    res.render('hub', {

      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Homepage route
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {

      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Profile route
// TODO: Include Accounts model with User model
// Use withAuth middleware to prevent access to route
router.get('/profile', async (req, res) => {
  try {
//  Find the logged in user based on the session ID

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });
    const accountsData = await Account.findAll({
      where: {
        user_id: req.session.user_id,
        // platform: 'LinkedIn',
      },
    });
    const accounts = accountsData.map((account) => account.get({ plain: true }));
    console.log('user data',user,accounts);


    res.render('profile', { 
      li_key:process.env.LI_CLIENT_ID, 
      fb_ci:process.env.FB_CLIENT_ID,
      ...user,
      ...accounts,
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


// linkedin redirect
router.get('/profile/linkedin', async (req, res) => {
  try{
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] }
    });

    const user = userData.get({ plain: true });
 
//    const accountsData = await Account.findAll({
//       where: {
//         user_id: req.session.user_id,

//       },
//     });
  //  const accounts = accountsData.map((account) => account.get({ plain: true }));
    if (!req.query) {
      res.render('profile', { 
          li_key:process.env.LI_CLIENT_ID, 
          fb_ci:process.env.FB_CLIENT_ID,
          ...user,
 //         ...accounts,
          logged_in: true
        });
    } else {
        console.log(req.query);
        litoken(req.query,req.session.user_id);
        res.render('profile', { 
          li_key:process.env.LI_CLIENT_ID, 
          fb_ci:process.env.FB_CLIENT_ID,
           ...user,
//           ...accounts,
          logged_in: true
        });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// ISSUE HERE****
// instagram redirect
// router.get('/profile/instagram/?#:key', async (req, res) => {
//   try {
//     const key = await req.params.key;
//     console.log("line232" + key);
//     // const short_access_token = req.query.access_token;
//     // if (!short_access_token) {
//     //   // res.render('error', {
//     //   //   message: 'Access token not found',
//     //   //   error: {}
//     //   // });
//     //     res.render('profile', { 
//     //     li_key:process.env.LI_CLIENT_ID, 
//     //     fb_ci:process.env.FB_CLIENT_ID,
//     //     // ...user,
//     //     logged_in: true
//     //   });
//     // } else {
//     //   console.log("line246" + req);
//     //   await igtoken(short_access_token);
//     //   res.render('profile', {
//     //     li_key: process.env.LI_CLIENT_ID,
//     //     fb_ci: process.env.FB_CLIENT_ID,
//     //     // ...user,
//     //     logged_in: true
//     //   });
//     // }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post('/profile/instagram/', (req, res) => {
  
  // console.log(req.headers.stuff);
  let short_access_token = req.headers.stuff.slice(1, req.headers.stuff.length);
  short_access_token = short_access_token.split('&')
  short_access_token = short_access_token[0].split('=')[1]
  igtoken(short_access_token);
});

module.exports = router;

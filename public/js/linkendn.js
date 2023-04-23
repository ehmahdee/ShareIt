

// const client_id = process.env.LI_CLIENT_ID;
// const client_secret = process.env.LI_CLIENT_SECRET;

// const querystring = window.location.href.split('/')[3];
// console.log(querystring);
// const urlParams = new URLSearchParams(querystring);
// const li_code = urlParams.get('login?code');
// const li_state = urlParams.get('state');

// console.log(li_code);
// console.log(li_state);

// if (!li_code ||!li_state) {
//     if (li_state !== 'foobar') {
//         res.status(401).json('Unauthorized Access');
//     } else {
//         const exchangeAccessToken = async () => {

//         }
//     }
// }

// http://localhost:3001/login?code=AQQ87ZgZDqIP_CIaKqrPVBBSfYJPJ5TabsIMXRPKg_6oD7wbeaNYKMmuyM7txPHEHC-WtUBbHJkQeLNPDC4STUzmxSUsdUQfWxIczAhbjrYKn5uckUJKvKuQeNz_bO9GL7dPkyHa4xnqq7A81ePi5-mcMFNkeRIuyD0ibtzT4Qog-wC3znozf1lHy5tuMwF2W_BZJCybMEBG_l_8l9o&state=foobar



// addLink();
// GET https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri={your_callback_url}&state=foobar&scope=w_member_social

{/* <script>
const li_client_id = {{{json li_key}}};
const li_client_secret = {{{json li_cs}}};

const querystring = window.location.href.split('/')[3];
console.log(querystring);
const urlParams = new URLSearchParams(querystring);
const li_code = urlParams.get('test?code');
const li_state = urlParams.get('state');

console.log(li_code);
console.log(li_state); */}

{/* if (li_code || li_state) {
  console.log("linked")
  if (li_state !== 'foobar') {
    console.error('Unauthorized Access');
  } else {
    const exchangeAccessToken = async () => {
      try {
        const response = await fetch(`https://www.linkedin.com/oauth/v2/accessToken?code=${li_code}&grant_type=authorization_code&client_id=${li_client_id}&client_secret=${li_client_secret}&redirect_uri=http://localhost:3001/test`);
        const json = await response.json();
        console.log(json);
      } catch (err) {
        console.error(err);
      }
    }
    exchangeAccessToken();
  } 
}

</script> */}
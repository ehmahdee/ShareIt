
const appId = process.env.FB_CLIENT_ID;
const appSecret = process.env.FB_CLIENT_SECRET;;

const querystring = window.location.href.split('/')[3];
const urlParams = new URLSearchParams(querystring);
const short_access_token = urlParams.get('#access_token');

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
            console.log(json.access_token); // This is your long-lived access token
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
            console.log(userPageID);
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
            console.log(json.access_token); // This is your Page access token
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
            console.log(json);
        } catch (error) {
            console.error(error);
            // Display an error message or take some other action
        }
    
    };

    exchangeAccessToken(); // Call the function to exchange the access token
}



























// gets User's page data 104697412610985
// ig user id 17841459102148387

// if (short_access_token) {
//     let userPageID ;
//     const userPageData = async () => {
//         try {
//             // getting user pages
//             const response = await fetch(`https://graph.facebook.com/v16.0/me/accounts?access_token=${short_access_token}`);
//             if (!response.ok) {
//                 throw new Error('Instagram data fetch failed');
//             }
//             const json = await response.json();
//             console.log(json);
//             userPageID = json;
//         } catch (error) {
//             console.error(error);
//             // Display an error message or take some other action
//         }
//         try {
//             // getting IG busines account
//             const response = await fetch(`https://graph.facebook.com/v16.0/${userPageID.data[0].id}?fields=instagram_business_account&access_token=${short_access_token}`);
//             if (!response.ok) {
//                 throw new Error('Instagram data fetch failed');
//             }
//             const json = await response.json();
//             console.log(json);
//         } catch (error) {
//             console.error(error);
//             // Display an error message or take some other action
//         }
//     }
//     userPageData();
// }



// if (short_access_token) {
//     const post = async () => {
//         try {
//             const response = await fetch(`https://graph.facebook.com/v16.0/104697412610985/media?image_url=https://www.gardeningknowhow.com/wp-content/uploads/2017/07/hardwood-tree-1024x681.jpg&is_carousel_item=false&caption=trees&access_token=${short_access_token}`);
//             // if (!response.ok) {
//             //     throw new Error('Instagram data fetch failed');
//             // }
//             const json = await response.json();
//             console.log(json);
//         } catch (error) {
//             console.error(error);
//             // Display an error message or take some other action
//         }
//     }
//     post();
// }


//  "https://graph.facebook.com/v16.0/me/accounts?fields=id%2Cname%2Caccess_token%2Cinstagram_business_account&access_token=EAACw..."


// http://localhost:3001/?#access_token=EAATwnAxDnFgBALIkGQt4JWag0xsCFZCyoAcKi7BsdZCdycCmc9SVKtBZAqrwLwDKn1N5igWuGsPoPM2MjNUgyxlppftwNASz3qeaARS4ZAzq3cvlmUDxJQEFUjAaZBlkk4YxEvCqARke6rCLjm9zqspISIl31ZCD3esZCtDevUAYwbTQ5fqdkrG78zC32QDmQwK83WL0iqGMwNaPRNiNKoh&data_access_expiration_time=1689791774&expires_in=5026&long_lived_token=EAATwnAxDnFgBAPAmP9Ox2kt92kb0Gq10uiON5V57uJXUZBP5BWJIsQmY2y0nclrhQ63ir5kS4DQZAuymSof5WKt44O3krrjfIB9Bupgm90oFyvzUbOvZCvQedCHP2yG5FV6eKpXoO2P4pgIIxLWHmDo9kHyMe7RPyzV2kMdH3dO5ZAo5nCnPVkXMJrqiT98ZD

// http://localhost:3001/?#access_token=EAATwnAxDnFgBADlBcxKeURZAMoNYKazCUmp4otGLYvLBQmOV14DZCi9tZC7ISVGHsvBcIIxBzesFZCL8AnaWv2nnva1gxIc98VZAT6HaiRSZChqKWZBrVK5Bry9naD20lHhr6acZCntbb9oYQYOHEF6XGMbhWoLqmxffv0guEtBaFZA3qSaUrmxZAISXPcOKcRHL49ZCfOUYKe247a3Ewvw8ZCzf&data_access_expiration_time=1689796919&expires_in=7081&long_lived_token=EAATwnAxDnFgBAD9xqgl9zTcZCoZCuFHSAd2XdfxLl0UYp1TZAa26wjh7crOb9sjksdrzsQ5RQT6B835AfPCZBbLm8ug8YUSDAw5IJ1kotNmdS1kPtb5Whyoun8g3iqB63ZA112atcTCgJUUdt8IZCRz8rinGPbztIZBsQileLjt6lKU2XtDDKcSaeP6eUPFRo4ZD
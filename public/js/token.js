
const appId = '1390452918164568';
const appSecret = 'd5cf8133a13037a4451f32ce05bc2848';



const querystring = window.location.href.split('/')[3];
const urlParams = new URLSearchParams(querystring);
const short_access_token = urlParams.get('long_lived_token');

console.log(short_access_token);


if (short_access_token) {
    const exchangeAccessToken = async () => {
        try {
            const response = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${appSecret}&access_token=${short_access_token}`);
            if (!response.ok) {
                throw new Error('Access token exchange failed');
            }
            const json = await response.json();
            console.log(json.access_token); // This is your long-lived access token
        } catch (error) {
            console.error(error);
            // Display an error message or take some other action
        }
    };

    exchangeAccessToken(); // Call the function to exchange the access token
}

// http://localhost:3001/?#access_token=EAATwnAxDnFgBALIkGQt4JWag0xsCFZCyoAcKi7BsdZCdycCmc9SVKtBZAqrwLwDKn1N5igWuGsPoPM2MjNUgyxlppftwNASz3qeaARS4ZAzq3cvlmUDxJQEFUjAaZBlkk4YxEvCqARke6rCLjm9zqspISIl31ZCD3esZCtDevUAYwbTQ5fqdkrG78zC32QDmQwK83WL0iqGMwNaPRNiNKoh&data_access_expiration_time=1689791774&expires_in=5026&long_lived_token=EAATwnAxDnFgBAPAmP9Ox2kt92kb0Gq10uiON5V57uJXUZBP5BWJIsQmY2y0nclrhQ63ir5kS4DQZAuymSof5WKt44O3krrjfIB9Bupgm90oFyvzUbOvZCvQedCHP2yG5FV6eKpXoO2P4pgIIxLWHmDo9kHyMe7RPyzV2kMdH3dO5ZAo5nCnPVkXMJrqiT98ZD

// http://localhost:3001/?#access_token=EAATwnAxDnFgBADlBcxKeURZAMoNYKazCUmp4otGLYvLBQmOV14DZCi9tZC7ISVGHsvBcIIxBzesFZCL8AnaWv2nnva1gxIc98VZAT6HaiRSZChqKWZBrVK5Bry9naD20lHhr6acZCntbb9oYQYOHEF6XGMbhWoLqmxffv0guEtBaFZA3qSaUrmxZAISXPcOKcRHL49ZCfOUYKe247a3Ewvw8ZCzf&data_access_expiration_time=1689796919&expires_in=7081&long_lived_token=EAATwnAxDnFgBAD9xqgl9zTcZCoZCuFHSAd2XdfxLl0UYp1TZAa26wjh7crOb9sjksdrzsQ5RQT6B835AfPCZBbLm8ug8YUSDAw5IJ1kotNmdS1kPtb5Whyoun8g3iqB63ZA112atcTCgJUUdt8IZCRz8rinGPbztIZBsQileLjt6lKU2XtDDKcSaeP6eUPFRo4ZD
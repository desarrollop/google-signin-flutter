const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID='56446747319-278ap394h1vp3bs7frvhke39j4bafjvo.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const validarGoogleIdToken= async(token)=>{
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [
                CLIENT_ID,
                '56446747319-eps4dqto1ak5lnnjdq648npl6hm6gshc.apps.googleusercontent.com'
            ],  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        //const userid = payload['sub'];
        console.log("=========PAYLOAD=========");
        console.log(payload);
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        return{
            name: payload['name'],
            picture: payload['picture'],
            email: payload['email'],
        }
    } catch (error) {
        return null;
    }
}

module.exports={
    validarGoogleIdToken,
}
import React, {useState, useEffect} from "react";

// I looked at both of the following to do this
// https://elvisciotti.medium.com/how-to-create-a-oauth-popup-in-react-7ab102ea48f
// https://dev.to/dinkydani21/how-we-use-a-popup-for-google-and-outlook-oauth-oci

// Curl version of how to use the bearer. basically you'll just need to add this to a header
// curl localhost:8088/restricted -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NjE5NTcxMzZ9.RB3arc4-OyzASAaUhC2W3ReWaXAt_z2Fd3BN4aWTgEY"
// so just add the header 'Authorization' and then use the value 'Bearer <token>'
const Login = () => {
    const [externalPopup, setExternalPopup] = useState<Window | null>(null);

    useEffect(() => {
            if (!externalPopup) {
                return;
            }

            const timer = setInterval(() => {
                if (!externalPopup) {
                    timer && clearInterval(timer);
                    return;
                }
                let currentUrl

                try {
                    currentUrl = externalPopup.location.href;

                } catch (e) {
                    // We have an exception it indicates that we have an access exception where the location isn't our
                    // site
                    currentUrl = ""
                }

                if (!currentUrl) {
                    return;
                }

                const searchParams = new URL(currentUrl).searchParams;
                const code = searchParams.get('jwt');
                if (code) {
                    externalPopup.close();
                    console.log(`The popup URL has URL code param = ${code}`);
                    setExternalPopup(null)
                    timer && clearInterval(timer)
                }

            }, 500)
        },
        [externalPopup]
    )
    const connectClick = () => {
        const width = 500;
        const height = 400;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2.5;
        const title = `WINDOW TITLE`;
        const url = `http://127.0.0.1:8089/login/`;
        const popup = window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
        setExternalPopup(popup);
    }
    return <button onClick={connectClick}>Connect</button>
}


export default Login;

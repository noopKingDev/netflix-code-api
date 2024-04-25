import axios from "axios";
import { writeFileSync } from "node:fs";
const userAgents = [
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/97.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/97.0.1072.62 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36"
];

const getStr = (string, start, end) => {
    return string.match(`${start}(.*?)${end}`)?.[1];
};

export default async function registerCode({ code, cookie }) {
    try {
        const getAuthUrlToken = await axios({
            url: "https://netflix.com/tv2",
            method: "GET",
            headers: {
                Cookie: cookie
            }
        });

        const AuthUrlToken = getStr(
            getAuthUrlToken.data,
            'authURL" value="',
            '"'
        );
        if (!getAuthUrlToken)
            throw new Error(
                "ocorreu um erro interno, por favor tente novamente"
            );
        const response = await axios.post(
            "https://www.netflix.com/tv2",
            new URLSearchParams({
                flow: "websiteSignUp",
                authURL: AuthUrlToken,
                flowMode: "enterTvLoginRendezvousCode",
                withFields: "tvLoginRendezvousCode,isTvUrl2",
                code: code,
                tvLoginRendezvousCode: code,
                isTvUrl2: "true",
                action: "nextAction"
            }),
            {
                headers: {
                    authority: "www.netflix.com",
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cache-control": "max-age=0",
                    cookie: cookie,
                    origin: "https://www.netflix.com",
                    referer: "https://www.netflix.com/tv2",
                    "sec-ch-ua": '"Not-A.Brand";v="99", "Chromium";v="124"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-model": '""',
                    "sec-ch-ua-platform": '"Linux"',
                    "sec-ch-ua-platform-version": '""',
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1",
                    "user-agent": userAgents[0]
                }
            }
        );
        console.log(userAgents[Math.floor(Math.random() * userAgents.length)]);
        const currentUrl = response.request["_redirectable"]["_currentUrl"];

        const { data } = response;
        writeFileSync("./src/services/addCode/result.html", String(data));
        if (
            data.includes(
                'class="nf-message-contents" data-uia="UIMessage-content">'
            )
        )
            throw new Error(
                "codigo invalido ! ou possivel erro interno, tente novamente"
            );
        console.log(currentUrl);
        
        if (
            currentUrl !== "https://www.netflix.com/browse" &&
            currentUrl !== "https://www.netflix.com/tv/out/success"
        )
            throw new Error("Ocorreu um erro interno, tente novamente ");
        console.log("n caiu no if ");
        return {
            success: true
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            result: e
        };
    }
}

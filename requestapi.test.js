import axios from "axios";

const host = "http://localhost:8000";
const createuser = await axios({
    method: "POST",
    url: host + "/createuser",
    data: {
        token: "dudulindu",
        accountsremaining: 3,
        userName: "dudu"
    }
});
console.log(createuser.data);
axios({
    method: "POST",
    url: host + "/addCredits",
    data: {
        token: "dudulindu",
        tokenUser: "0.3511504433429169",
        credits: 2
    }
}).then(r => console.log(r.data));

// const addTv = await axios({
//     method: "POST",
//     url: host + "/addtv",
//     data: {
//         token: "b247deafa97a5122eef246b489074c5d",
//         code: "90218909"
//     }
// });
// console.log(addTv.data);
//

const addCookie = await axios({
    url: host + "/addCookie",
    method: "POST",
    data: {
        token: "dudulindu",
        data: {
            cookie: "nfvdid=BQFmAAEBEDsc-BmZg08ja58U6M5TwDhguXeuNWfZ8LZF17sp7pAaW1BTpaNhRtNHYFP7vdeInmoUWyGdDfW7T9Rja_Z2at8AG87IUUHRI5PEcNEQ3CqNTiD3eEcG_pH9Sqv2fCmGMnBx-HRX0qbittvtGJYBvgws; NetflixId=v%3D2%26ct%3DBQAOAAEBEISOWqxzRNLtVwIqi3jMXq2BwBW31RqdzCx70AtKIjFEi0tLWCgURzlNRul9oZ-Z6W8njOPFnK93MJRrPyfuLkzgqxQrQNYiqTtBD7fSWrDzvT67aVdjuoxmEW6dacLhCEEc1hVFaxMylTKN13osfHwdjzPK344Sjh-r5gFtMdZxPkOYbUXCvtgvJyJN1UwzWPH_NvlStKNf7xhv5oQQt0Kpm7Jeq_QRZbmFuNNkrlDWSOB45a2vNysFLCvU1fTJQlu48C97iUYdfrJVI7lUhM51HVnMTP7_Fhl91yursOHzgoRSgGXuGZggqgV2Jnrt0K1LKy67knf4kgvWY-dWZFhq1R9w9KTN2dd29ktT4IwnmavRxmmsUGbnlHdVFnRwfMxaibaQ-gUrGhY_1EXefCOllAW2_lO3gT-DN-QXa4K2U9rC0G5KJwHxKRQ9eoMQBal_oE5JOaIzQuDG4jB-dI4qk9zmS2O1FAL5BoB7nzPkxtiWkjtS0ahzsbCCuIHVYuF_NJiOYSu5AMKcUJdrT5DKdWNFezux1MCM5roVa7T4Us7T_18-jztcgLmA4db5TnXO0LHh3ZzUR0AIrDqaUilVYnvjhhg_nXX7pwpdMo5xQDo.%26bt%3Ddbl%26ch%3DAQEAEAABABSHJBkTXfax2xNg7jQy2lHp1y9h6z90GRQ.%26mac%3DAQEAEAABABRfXd_SzzGZKtvm5LTGWcAvJba5l9_tv-E.; SecureNetflixId=v%3D2%26mac%3DAQEAEQABABSjb515AgB0BG_ra5NNS-vXCrpRePienf8.%26dt%3D1713870463789; OptanonConsent=isGpcEnabled=0&datestamp=Tue+Apr+23+2024+12%3A21%3A26+GMT%2B0100+(British+Summer+Time)&version=202402.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=fadd3346-e121-4c33-ad69-079ab319b9ab&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&AwaitingReconsent=false; flwssn=c20a8b67-152b-40d6-af53-1a7305f8f75e; netflix-sans-bold-3-loaded=true; netflix-sans-normal-3-loaded=true; profilesNewSession=0"
        }
    }
});
console.log(addCookie.data);


const addtv = await axios({
    url: host + "/addtv",
    method: "POST",
    data: {
        token: "dudulindu",
        code: "52369720"
    }
});
console.log(addtv.data);
axios.get(host + "/cookie");

import DataUsers from "../Data/users/data.json" assert { type: "json" };
import cookiesDb from "../Data/cookies/data.json" assert { type: "json" };

import express from "express";
import crypto from "crypto";
import { Router } from "express";
import isAdmin from "./midlewares/admin/index.js";
import isUser from "./midlewares/user/index.js";
import { writeDb } from "./Ultils/actionsDb/index.js";
import registerCode from "./services/addCode/index.js";
import CheckerCookie from "./services/chrckerCookie/index.js";
const router = Router();
router.use(express.json());

const pathDataUser = "./Data/users/data.json";
//rotar de consulta saldo e de add cookies
router.get("/", (req, res) =>
    res.send(
        "oi, isso é uma api :) o q ela faz ? bom... vc entra na netflix pela tv pega um codigo de login, manda pra api e ela te faz uma pessoa mais feliz, gostou ?"
    )
);

router.post("/createuser", isAdmin, (req, res) => {
    try {
        if (!req.body?.accountsremaining || !req.body?.userName)
            throw new Error("Esta faltando dados");

        const { token, accountsremaining, userName } = req.body;
        if (userName.length < 4 || userName.lenfth > 20)
            throw new Error("Senha muito pequena ou muito grande");

        const usernameIsValid = Object.values(DataUsers).some(
            ({ username }) => username === userName
        );

        if (usernameIsValid) throw new Error("o username ja esta em uso !");

        const userNameOftokenfather = DataUsers[token].username;

        const newToken = crypto.createHash("md5").update(userName).digest("hex");

        DataUsers[newToken] = {
            token: newToken,
            username: userName,
            accountsremaining: accountsremaining,
            createdBy: userNameOftokenfather
        };

        const writebleDb = writeDb({
            path: pathDataUser,
            data: DataUsers
        });

        if (!writebleDb)
            throw new Error("Error interno ao tentar criar o usuario");

        return res.json({
            success: true,
            result: "Token criado com sucesso !",
            token: newToken
        });
    } catch (e) {
        return res.json({
            success: false,
            result: e.message
        });
    }
});

router.post("/addCredits", isAdmin, (req, res) => {
    if ((!req.body?.credits, !req.body?.tokenUser))
        return res.json({
            success: false,
            result: "esta faltando dados !"
        });
    const { tokenUser, credits } = req.body;

    if (!DataUsers?.[tokenUser])
        return res.json({
            success: false,
            result: "token inexistente"
        });
    if (isNaN(credits))
        return res.json({
            success: false,
            result: "A quantidade de creditos infomada não ê valida "
        });
    DataUsers[tokenUser].accountsremaining += credits;
    const userName = DataUsers[tokenUser].username;

    const writebleDb = writeDb({
        path: pathDataUser,
        data: DataUsers
    });

    if (!writebleDb) throw new Error("Error interno ao tentar criar o usuario");

    res.json({
        success: true,
        result: `Foram adicionados ${credits} creditos ao token ${tokenUser}, o(a) ${userName} deve ter ficado feliz :)`
    });
});

router.post("/addtv", isUser, async (req, res) => {
    try {
        const { token } = req.body;
        if (DataUsers[token].accountsremaining < 1)
            throw new Error(
                "o seu token chegou no limite, voçe não tem mais creditos disponiveis, por favor entre em contato com o proprietario"
            );
        if (!req.body?.code || req.body?.cookie < 8)
            throw new Error("codigo invalido");

        const code = String(req.body.code.replaceAll(/[^\d-]/g, ""));

        if (code.length != 8)
            throw new Error("Problemas na formatação do codigo");

        if (cookiesDb.length < 1)
            throw new Error("sem contas disponiveis no momento");

        const cookieSelected = {
            attempts: 0,
            cookie: null
        };
        while (
            !cookieSelected.cookie &&
            cookieSelected.attempts < 4 &&
            cookieSelected.attempts <= cookiesDb.length
        ) {
            const selectedCookie = cookiesDb.shift()?.cookie;
            if (!selectedCookie)
                throw new Error("error ao tentar achar contas validas");
            const isValidCookie = await CheckerCookie(selectedCookie);
            cookieSelected.attempts += 1;
            if (isValidCookie) cookieSelected.cookie = selectedCookie;
        }
        if (!cookieSelected.cookie)
            throw new Error("error ao tentar achar contas validas");
        const registerCodeResult = await registerCode({
            code: code,
            cookie: cookieSelected.cookie
        });

        if (!registerCodeResult.success) {
            cookiesDb.push({
                cookie: cookieSelected.cookie
            });
            const writeCookiesDb = writeDb({
                path: "./Data/cookies/data.json",
                data: cookiesDb
            });
            throw new Error(registerCodeResult.result);
        }
        const writeCookiesDb = writeDb({
            path: "./Data/cookies/data.json",
            data: cookiesDb
        });
        DataUsers[token].accountsremaining -= 1;
        console.log(DataUsers);
        writeDb({
            path: pathDataUser,
            data: DataUsers
        });

        return res.json({
            success: true,
            result: "codigo resgatado com exito ! "
        });
    } catch (e) {
        return res.json({
            success: false,
            result: e.message
        });
    }
});
router.post("/addcookie", isAdmin, (req, res) => {
    //apenas cookies do tipo header string
    try {
        if (!req.body?.data) throw new Error("Esta falatando dados");
        if (!req.body.data?.cookie) throw new Error("Esta faltando dados");

        const { cookie } = req.body.data;

        if (cookie.length > 4000 || cookie.length < 100)
            throw new Error("cookie invalido");

        const cookiesExist = cookiesDb.some(data => data.cookie == cookie);
        if (cookiesExist)
            throw new Error(
                "Esse cookie ja foi salvo em nossó banco de dados "
            );
        cookiesDb.push({
            cookie: cookie
        });
        const writeCookiesDb = writeDb({
            path: "./Data/cookies/data.json",
            data: cookiesDb
        });
        return res.json({
            success: true,
            result: "cookie Adicionado com sucesso"
        });
    } catch (e) {
        return res.json({ success: false, result: e.message });
    }
});
router.get("/cookies", (req, res) =>
    res.send(`Temos um total de ${cookiesDb.length} cookies disponives`)
);
router.post('/getcookies', isAdmin, (req,res) => res.json(cookiesDb))
router.post("/mycredits", isUser, ({ body }, res) =>
    res.json(DataUsers[body.token])
);
export default router;

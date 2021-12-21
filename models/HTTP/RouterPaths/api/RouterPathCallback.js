const RouterPath = require("../../RouterPath.js");
const crypto = require("crypto");
const https = require("https");
const url = require("url");
const { URLSearchParams, URL} = require("url");
const stringUtils = require("../../../Utils/String.js");
const bodyParser = require("body-parser");
const escapeHtml = stringUtils.escapeHtml

const errorTpl = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"><title>Yogstation Account Linking</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"></head><body><header class="d-flex justify-content-center align-items-center" style="height: 3rem;background: var(--bs-blue);"><h1 style="color: rgb(255,255,255);">Yogstation Account Linking</h1></header><div class="container" style="margin-top: 2rem;"><div class="card"><div class="card-body d-flex flex-column align-items-center"><h4 class="card-title">An error occured!</h4><p class="card-text">$errormsg$</p></div></div></div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script></body></html>`
const confirmTpl = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"><title>Yogstation Account Linking</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"></head><body><header class="d-flex justify-content-center align-items-center" style="height: 3rem;background: var(--bs-blue);"><h1 style="color: rgb(255,255,255);">Yogstation Account Linking</h1></header><div class="container" style="margin-top: 2rem;"><div class="card"><div class="card-body d-flex flex-column justify-content-center align-items-center"><h4 class="card-title">Please confirm account linking</h4><p class="card-text">Is this your discord account?</p><span>$usertag$</span><img class="rounded-circle d-block" src="$useravatar$" style="margin: 0 auto;"><form style="margin-top: 2rem;" method="post"><input class="form-control" type="hidden" value="$csrftoken$" name="csrftoken"><input class="form-control" type="hidden" name="state" value="$state$"><button class="btn btn-danger" type="button" style="margin: 0 1rem;" onclick="window.close()">No</button><button class="btn btn-success" type="submit" style="margin: 0 1rem;">Yes</button></form></div></div></div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script></body></html>`
const completeTpl = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"><title>Yogstation Account Linking</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"></head><body><header class="d-flex justify-content-center align-items-center" style="height: 3rem;background: var(--bs-blue);"><h1 style="color: rgb(255,255,255);">Yogstation Account Linking</h1></header><div class="container" style="margin-top: 2rem;"><div class="card"><div class="card-body d-flex flex-column align-items-center"><h4 class="card-title">Your account is now linked!</h4></div></div></div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script></body></html>`

function hydrateError(_error) {
    const error = escapeHtml(_error)
    return errorTpl.replace(/\$errormsg\$/g, error)
}
function hydrateConfirm(_discordTag, _discordAvatar, _state, _csrfToken) {
    const discordTag = escapeHtml(_discordTag)
    const discordAvatar = escapeHtml(_discordAvatar)
    const state = escapeHtml(_state)
    const csrfToken = escapeHtml(_csrfToken)
    return confirmTpl.replace(/\$usertag\$/g, discordTag).replace(/\$useravatar\$/g, discordAvatar).replace(/\$state\$/, state).replace(/\$csrftoken\$/g, csrfToken)
}
function hydrateComplete() {
    return completeTpl
}

class RouterPathCallback extends RouterPath {
    constructor(subsystem, router) {
        super(subsystem, router);
        const {oauth_authorize_url, oauth_token_url, oauth_userinfo_url, http_public_path, oauth_client_id, oauth_client_secret} = this.subsystem.manager.getSubsystem("Config").config;

        this.router.get("/verify", (req, res) => {
            const redirect_uri = new URL("api/callback", http_public_path)

            const authorizeLink = new URL(oauth_authorize_url)
            authorizeLink.searchParams.set("response_type", "code")
            authorizeLink.searchParams.set("client_id", oauth_client_id)
            authorizeLink.searchParams.set("redirect_uri", redirect_uri.toString())
            authorizeLink.searchParams.set("scope", "openid")
            //This is not a security measure, CSRF protection is done by verifying that the end user is authenticating as the proper ckey
            authorizeLink.searchParams.set("state", req.query.state)

            res.redirect(authorizeLink)
        })

        this.router.post("/callback", bodyParser.urlencoded({extended: false}), (req, res) => {
            const {state, csrftoken} = req.body

            const dbSubsystem = this.subsystem.manager.getSubsystem("Database")
            const discord = this.subsystem.manager.getSubsystem("Discord");

            const identity = this.subsystem.manager.getSubsystem("Discord").oauthState.get(state)
            if(!identity) {
                return res.send(hydrateError("State is unknown")).end()
            }
            if(identity.csrfToken !== csrftoken) {
                return res.send(hydrateError("CSRF token mismatch")).end()
            }

            this.subsystem.manager.getSubsystem("Discord").oauthState.delete(state)

            dbSubsystem.pool.getConnection((err, connection) => {
                if (err) {
                    return res.send(hydrateError("Error contacting database, try again later.")).end()
                }

                connection.query("SELECT discord_id FROM `" + dbSubsystem.format_table_name('player') + "` WHERE `ckey` = ?", [identity.ckey], (error, results, fields) => {
                    if (error) {
                        return res.send(hydrateError("Error running select query, try again later.")).end()
                    }
                    if (results.length === 0) {
                        return res.send(hydrateError("New account detected, please login on the server at least once to proceed")).end()
                    }
                    if (results[0].discord_id) {
                        return res.send(hydrateError("You already have a discord account linked. If you need to have this reset, please contact an admin!")).end()
                    }

                    connection.query("UPDATE `" + dbSubsystem.format_table_name('player') + "` SET `discord_id` = ? WHERE `ckey` = ?", [identity.discordSnowflake, identity.ckey], (error, results, fields) => {
                        if (error) {
                            return res.send(hydrateError("Error running update query, try again later.")).end()
                        }

                        const guild = discord.getPrimaryGuild();
                        let verified_role;
                        for(let role of guild.roles.values()) {
                            if(role.name === "server/discord linked") {
                                verified_role = role;
                            }
                        }
                        if(verified_role) {
                            res.send(hydrateComplete()).end()
                            guild.members.get(identity.discordSnowflake).addRole(verified_role).catch(e => {
                                //But its an error? yeah well discord.js v11 throws errors like crazy
                            })
                        }
                    })
                })
            });
        })

        this.router.get("/callback", (req, res) => {
            if(req.query.error) {
                return res.send(hydrateError(`Upstream login error: ${req.query.error_description || req.query.error}`)).end()
            }

            res.setHeader("X-Frame-Options", "DENY")
            const state = req.query.state
            const identity = this.subsystem.manager.getSubsystem("Discord").oauthState.get(state)
            if(!identity) {
                return res.send(hydrateError("State is unknown")).end()
            }
            if(identity.csrfToken) {
                return res.send(hydrateError("Authorization request already used")).end()
            }

            const tokenUrl = url.parse(oauth_token_url)
            tokenUrl.auth = `${oauth_client_id}:${oauth_client_secret}`

            const body = new URLSearchParams()
            body.set("grant_type", "authorization_code")
            body.set("code", req.query.code)
            body.set("redirect_uri", new URL("api/callback", http_public_path).toString())

            const httpReq = https.request({
                ...tokenUrl,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": Buffer.byteLength(body.toString())
                }
            }, httpRes => {
                let response = "";
                httpRes.setEncoding("utf8")
                httpRes.on("data", chunk => {
                    response = response + chunk
                })
                httpRes.on("end", () => {
                    const data = JSON.parse(response)
                    if(data.error) {
                        return res.send(hydrateError(`Upstream error when fetching access token: ${data.error_description || data.error}`)).end()
                    }

                    const userinfoUrl = url.parse(oauth_userinfo_url)
                    const httpReq = https.request({
                        ...userinfoUrl,
                        headers: {
                            Authorization: `Bearer ${data.access_token}`
                        }
                    }, httpRes => {
                        let response = "";
                        httpRes.setEncoding("utf8")
                        httpRes.on("data", chunk => {
                            response = response + chunk
                        })
                        httpRes.on("end", () => {
                            if(httpRes.statusCode !== 200) {
                                this.subsystem.manager.logger.log("error", "Invalid access token: " + httpRes.headers);
                                return res.send(hydrateError("Invalid access token when fetching user info")).end()
                            }
                            const data = JSON.parse(response)
                            const normalizedCkey = data.ckey.toLowerCase().replace(/[^a-z@\d]/g, "")
                            if(normalizedCkey !== identity.ckey) {
                                return res.send(hydrateError(`Ckey does not match, you attempted to login using ${normalizedCkey} while the linking process was initiated for ${identity.ckey}`))
                            }
                            identity.csrfToken = crypto.randomBytes(32).toString("hex")
                            return res.send(hydrateConfirm(identity.discordTag, identity.discordAvatar, state, identity.csrfToken))
                        })
                    })
                    httpReq.on("error", e => {
                        this.subsystem.manager.logger.log("error", "Error when getting user info: " + e)
                        return res.send(hydrateError("Unable to fetch user info")).end()
                    })
                    httpReq.end()
                })
            })
            httpReq.on("error", e => {
                this.subsystem.manager.logger.log("error", "Error when getting access token: " + e)
                return res.send(hydrateError("Unable to fetch access token")).end()
            })
            httpReq.write(body.toString())
            httpReq.end()
        });
    }


}

module.exports = RouterPathCallback;

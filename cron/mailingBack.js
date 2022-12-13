const { CronJob } = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { userService, oauthService, emailService} = require("../services");
const { RETURN } = require("../enums/email-actions.enum");

module.exports = new CronJob(
    '0, 0, 1 * * *',
    async function () {
        try {
           const users = await userService.findByParams({});

            for (const user of users) {
               const token = await oauthService.findAccessTokens({ _user_id: user._id });

               if (!token) {
                   await emailService.sendEmail(user.email, RETURN, { userName: user.name });
               }
            }
        } catch (e) {
            console.error(e);
        }
    }
);
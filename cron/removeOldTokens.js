const { CronJob } = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { oauthService } = require("../service");

dayjs.extend(utc);

module.exports = new CronJob(
    '* * 1 * * *',
    async function () {
        try {
            console.log('Start removing tokens');
            const monthAgo = dayjs().utc().subtract(1, 'day');

            await oauthService.deleteAllAccessTokensInfo({ createdAt: { $lte: monthAgo }});
            console.log('End removing tokens');
        } catch (e) {
            console.error(e);
        }
    },
);
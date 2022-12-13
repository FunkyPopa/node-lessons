const { CronJob } = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { oldPasswordService } = require("../services");

dayjs.extend(utc);

module.exports = new CronJob(
    '*/30 * * * * *',
    async function () {
        try {
            console.log('Start removing passwords');
            const yearAgo = dayjs().utc().subtract(1, 'year');

            await oldPasswordService.delete({ createdAt: { $lte: yearAgo }});
            console.log('End removing passwords');
        } catch (e) {
            console.error(e);
        }
    }
);
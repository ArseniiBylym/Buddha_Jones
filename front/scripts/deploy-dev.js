const path = require('path');
const chalk = require('chalk');
const FtpDeploy = require('ftp-deploy');

const ftp = new FtpDeploy();

const config = {
    user: 'root',
    host: '162.243.243.47',
    port: 22,
    localRoot: path.resolve(__dirname, '../', './build'),
    remoteRoot: '/home/webadmin/buddha.redidemo.com/',
    include: ['./*'],
    exclude: ['*.map'],
    deleteRoot: false,
};

console.log(chalk.yellow('Initializing upload.\n'));

ftp.deploy(config).then((closed) => console.log(chalk.green('Upload finished.\n'))).catch((error) => {
    console.log(chalk.red('Failed to upload.\n'));
    console.log(chalk.red(error));
})

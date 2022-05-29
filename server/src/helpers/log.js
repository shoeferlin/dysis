import npmlog from 'npmlog';

// Setup logger
const log = npmlog;
log.enableColor();

// Create debug level (use 'log.debug(Prefix, Msg)' instead of 'console.log()')
log.addLevel(
    'debug',
    10,
    {bg: 'yellow', fg: 'white', bold: true, bell: true},
    ' DEBUG ',
);
log.level = 'debug';

export default log;

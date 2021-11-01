const getTimeStamp = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
    if (object)
        console.log(
            `\u001b[1;36m[${getTimeStamp()}] [INFO] [${namespace}] ${message}`,
            object
        );
    else
        console.log(
            `\u001b[1;36m[${getTimeStamp()}] [INFO] [${namespace}] ${message}`
        );
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object)
        console.log(
            `\u001b[1;33m[${getTimeStamp()}] [WARN] [${namespace}] ${message}`,
            object
        );
    else
        console.log(
            `\u001b[1;33m[${getTimeStamp()}] [WARN] [${namespace}] ${message}`
        );
};

const error = (namespace: string, message: string, object?: any) => {
    if (object)
        console.log(
            `\u001b[1;31m[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`,
            object
        );
    else
        console.log(
            `\u001b[1;31m[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`
        );
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object)
        console.log(
            `\u001b[1;30m[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
            object
        );
    else
        console.log(
            `\u001b[1;30m[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`
        );
};

const log = (namespace: string, message: string, object?: any) => {
    if (object)
        console.log(
            `\u001b[1;0m[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
            object
        );
    else
        console.log(
            `\u001b[1;0m[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`
        );
};

export default {
    info,
    warn,
    error,
    debug,
    log
};

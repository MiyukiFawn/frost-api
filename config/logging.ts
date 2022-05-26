const getTimeStamp = (): string => new Date().toISOString();

/** Colors */
const blue: string = "\u001b[1;36m";
const yellow: string = "\u001b[1;33m";
const red: string = "\u001b[1;31m";
const gray: string = "\u001b[1;30m";
const white: string = "\u001b[1;0m";

/** Functions */
const info = (namespace: string, message: string, object?: any) => {
  if (object) console.log(`${blue}[INFO]${white} [${namespace}] ${message}`, object);
  else console.log(`${blue}[INFO]${white} [${namespace}] ${message}`);
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) console.log(`${yellow}[WARN]${white} [${namespace}] ${message}`, object);
  else console.log(`${yellow}[WARN]${white} [${namespace}] ${message}`);
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) console.log(`${red}[ERROR]${white} [${namespace}] ${message}`, object);
  else console.log(`${red}[ERROR]${white} [${namespace}] ${message}`);
};

const debug = (namespace: string, message: string, object?: any) => {
  if (object) console.log(`${gray}[DEBUG]${white} [${namespace}] ${message}`, object);
  else console.log(`${gray}[DEBUG]${white} [${namespace}] ${message}`);
};

const log = (namespace: string, message: string, object?: any) => {
  if (object) console.log(`[${namespace}] ${message}`, object);
  else console.log(`[${namespace}] ${message}`);
};

export default {
  info,
  warn,
  error,
  debug,
  log,
};

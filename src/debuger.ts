const TimeStamp = new Date().toLocaleTimeString();

/** Colors */
const enum colors {
  blue = "\u001b[1;36m",
  yellow = "\u001b[1;33m",
  red = "\u001b[1;31m",
  gray = "\u001b[1;30m",
  white = "\u001b[1;0m",
}

class Debug {
  namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  info(message: string, object?: any): void {
    this.logMessage(colors.blue, "INFO", message, object);
  }

  warn(message: string, object?: any): void {
    this.logMessage(colors.yellow, "WARN", message, object);
  }

  error(message: string, object?: any): void {
    this.logMessage(colors.red, "ERROR", message, object);
  }

  debug(message: string, object?: any): void {
    this.logMessage(colors.gray, "DEBUG", message, object);
  }

  log(message: string, object?: any): void {
    if (object) console.log(`[${this.namespace}] ${message}`, object);
    else console.log(`[${this.namespace}] ${message}`);
  }

  private logMessage(color: colors, type: string, message: string, object?: any): void {
    if (object) console.log(`${color}[${type}]${colors.white} [${TimeStamp}] [${this.namespace}] ${message}`, object);
    else console.log(`${color}[${type}]${colors.white} [${TimeStamp}] [${this.namespace}] ${message}`);
  }
}

const config = function (namespace: string): Debug {
  return new Debug(namespace);
};

export default config;

const DEFAULT_NAMESPACE = "Server";

const info = (message: any, namespace?: string) => {
  if (typeof message === "string") {
    console.log(
      `[${getDate().cyan}] [${namespace || DEFAULT_NAMESPACE}] [INFO] ${
        message.magenta
      }`
    );
  } else {
    console.log(
      `[${getDate().cyan}] [${namespace || DEFAULT_NAMESPACE}] [INFO]`,
      message
    );
  }
};

const warn = (message: any, namespace?: string) => {
  if (typeof message === "string") {
    console.log(
      `[${getDate().cyan}] [${namespace || DEFAULT_NAMESPACE}] [WARN] ${
        message.yellow
      }`
    );
  } else {
    console.log(
      `[${getDate().cyan}] [${namespace || DEFAULT_NAMESPACE}] [WARN]`,
      message
    );
  }
};

const error = (message: any, namespace?: string) => {
  if (typeof message === "string") {
    console.log(
      `[${getDate().cyan}] [${namespace || DEFAULT_NAMESPACE}] [ERROR] ${
        message.red
      }`
    );
  } else {
    console.log(
      `[${getDate().cyan}] [${namespace || DEFAULT_NAMESPACE}] [ERROR]`,
      message
    );
  }
};

const getDate = () => {
  return new Date().toISOString();
};

const logging = { info, warn, error };

export default logging;

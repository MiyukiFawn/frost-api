export = class ApiErrors extends Error{
  readonly code: number;
  readonly error: object;

  constructor(code: number, error: object) {
    super();
    this.code = code;
    this.error = error;

    Object.setPrototypeOf(this, ApiErrors.prototype);
  }

  /** Predefined errors */
  /** 300 to 399 */
  static multipeChoice = (msg?: string | object): ApiErrors => new ApiErrors(300, { status_code:300, error: msg?? "Multiple Choice" });
  static movedPermanently = (msg?: string | object): ApiErrors => new ApiErrors(301, { status_code:301, error: msg ?? "Moved Permanently"})
  static found = (msg?: string | object): ApiErrors => new ApiErrors(302, { status_code:302, error: msg ?? "Found"});
  static seeOther = (msg?: string | object): ApiErrors => new ApiErrors(303, { status_code: 303, error: msg ?? "See other"});
  static notModified = (msg?: string | object): ApiErrors => new ApiErrors(304, { status_code: 304, error: msg ?? "Not Modified"});
  static useProxy = (msg?: string | object): ApiErrors => new ApiErrors(305, { status_code: 305, error: msg ?? "Use Proxy"})
  static unused = (msg?: string | object): ApiErrors => new ApiErrors(306, { status_code: 306, error: msg ?? "Unused"});
  static temporaryRedirect = (msg?: string | object): ApiErrors => new ApiErrors(307, { status_code: 307, error: msg ?? "Temporary Redirect"});
  static permanentRedirect = (msg?: string | object): ApiErrors => new ApiErrors(308, { status_code: 308, error: msg ?? "Permanent Redirect"});

  /** 400 to 499 */
  static badRequest = (msg?: string | object): ApiErrors => new ApiErrors(400, { status_code: 400, error: msg ?? "Bad Request" });
  static unauthorized = (msg?: string | object): ApiErrors => new ApiErrors(401, { status_code: 401, error: msg ?? "Unauthorized" });
  static paymentRequired = (msg?: string | object): ApiErrors => new ApiErrors(402, { status_code: 402, error: msg ?? "Payment Required"});
  static forbidden = (msg?: string | object): ApiErrors => new ApiErrors(403, { status_code: 403, error: msg ?? "Forbidden"});
  static notFound = (msg?: string | object): ApiErrors => new ApiErrors(404, { status_code: 404, error: msg ?? "Not Found" });
  static methodNotAllowed = (msg?: string | object): ApiErrors => new ApiErrors(405, { status_code: 405, error: msg ?? "Method Not Allowed"});
  static notAccepted = (msg?: string | object): ApiErrors => new ApiErrors(406, { status_code: 406, error: msg ?? "Not Accepted"});
  static proxyAuthenticationRequired = (msg?: string | object): ApiErrors => new ApiErrors(407, { status_code: 407, error: msg ?? "Proxy Authentication Required"});
  static requestTimeout = (msg?: string | object): ApiErrors => new ApiErrors(408, { status_code: 408, error: msg ?? "Request Timeout"});
  static conflict = (msg?: string | object): ApiErrors => new ApiErrors(409, { status_code: 409, error: msg ?? "Conflict"});
  static gone = (msg?: string | object): ApiErrors => new ApiErrors(410, { status_code: 410, error: msg ?? "Gone"});
  static lengthRequired = (msg?: string | object): ApiErrors => new ApiErrors(411, { status_code: 411, error: msg ?? "Length Required"});
  static preconditionFailed = (msg?: string | object): ApiErrors => new ApiErrors(412, { status_code: 412, error: msg ?? "Precondition Failed"});
  static payloadTooLarge = (msg?: string | object): ApiErrors => new ApiErrors(413, {status_code: 413, error: msg ?? "Payload Too Large"});
  static URITooLong = (msg?: string | object): ApiErrors => new ApiErrors(414, {status_code: 415, error: msg ?? "URI Too Long"});
  static unnsuportedMediaType = (msg?: string | object): ApiErrors => new ApiErrors(415, { status_code: 415, error: msg ?? "Unnsuported Media Type"});
  static requestedRangeNotSatisfiable = (msg?: string | object): ApiErrors => new ApiErrors(416, {status_code: 416, error: msg ?? "Requested Range Not Satisfiable"});
  static expectationFailed = (msg?: string | object): ApiErrors => new ApiErrors(417, {status_code: 417, error: msg ?? "Expectation Failed"});
  static imATeapot = (msg?: string | object): ApiErrors => new ApiErrors(418, { status_code: 418, error: msg ?? "I'm A Teapod"});
  static misdirectedRequest = (msg?: string | object): ApiErrors => new ApiErrors(421, {status_code: 421, error: msg ?? "Misdirected Request"});
  static unprocessableEntity = (msg?: string | object): ApiErrors => new ApiErrors(422, {status_code: 422, error: msg ?? "Unprocessable Entity"});
  static locked = (msg?: string | object): ApiErrors => new ApiErrors(423, { status_code: 423, error: msg ?? "Locked"});
  static failedDependency = (msg?: string | object): ApiErrors => new ApiErrors(424, { status_code: 424, error: msg ?? "Failed Dependency"});
  static tooEarly = (msg?: string | object): ApiErrors => new ApiErrors(425, { status_code: 425, error: msg ?? "Too Early"});
  static upgradeRequired = (msg?: string | object): ApiErrors => new ApiErrors(426, { status_code: 426, error: msg ?? "Upgrade Required"});
  static preconditionRequired = (msg?: string | object): ApiErrors => new ApiErrors(428, { status_code: 428, error: msg ?? "Precondition Required"});
  static tooManyRequests = (msg?: string | object): ApiErrors => new ApiErrors(429, { status_code: 429, error: msg ?? "Too Many Requests"});
  static requestHeaderFieldsTooLarge = (msg?: string | object): ApiErrors => new ApiErrors(431, { status_code: 431, error: msg ?? "Request Header Fields Too Large"});
  static unavailableForLegalReasons = (msg?: string | object): ApiErrors => new ApiErrors(451, { status_code: 451, error: msg ?? "Unavailable For Legal Reasons"});
  
  /** 500 to 599 */
  static internalServerError = (): ApiErrors => new ApiErrors(500, { status_code: 500, error: "Internal Server Error" });
  static notImplemented = (msg?: string | object): ApiErrors => new ApiErrors(501, { status_code: 501, error: msg ?? "Not Implemented"});
  static badGateway = (msg?: string | object): ApiErrors => new ApiErrors(502, { status_code: 502, error: msg ?? "Bad Gateway"});
  static serviceUnavailable = (msg?: string | object): ApiErrors => new ApiErrors(503, { status_code: 503, error: msg ?? "Service Unavailable"});
  static gatewayTimeout = (msg?: string | object): ApiErrors => new ApiErrors(504, { status_code: 504, error: msg ?? "Gateway Timeout"});
  static httpVersionNotSupported = (msg?: string | object): ApiErrors => new ApiErrors(505, { status_code: 505, error: msg ?? "HTTP Version Not Supported"});
  static variantAlsoNegotiates = (msg?: string | object): ApiErrors => new ApiErrors(506, { status_code: 506, error: msg ?? "Variant Also Negotiates"});
  static insufficientStorage = (msg?: string | object): ApiErrors => new ApiErrors(507, { status_code: 508, error: msg ?? "Insufficient Storage"});
  static loopDetected = (msg?: string | object): ApiErrors => new ApiErrors(508, { status_code: 509, error: msg ?? "Loop Detected"});
  static notExtended = (msg?: string | object): ApiErrors => new ApiErrors(510, { status_code: 510, error: msg ?? "Not Extended"});
  static networkAuthenticationRequired = (msg?: string | object): ApiErrors => new ApiErrors(511, { status_code: 511, error: msg ?? "Network Authentication Required"})
}

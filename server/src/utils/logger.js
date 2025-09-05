// Simple logging utility

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

const LOG_COLORS = {
  ERROR: '\x1b[31m', // Red
  WARN: '\x1b[33m',  // Yellow
  INFO: '\x1b[36m',  // Cyan
  DEBUG: '\x1b[37m', // White
  RESET: '\x1b[0m'
};

class Logger {
  constructor() {
    this.level = process.env.LOG_LEVEL || 'INFO';
    this.currentLevel = LOG_LEVELS[this.level] || LOG_LEVELS.INFO;
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const color = LOG_COLORS[level] || LOG_COLORS.INFO;
    const reset = LOG_COLORS.RESET;
    
    let logMessage = `${color}[${timestamp}] ${level}: ${message}${reset}`;
    
    if (Object.keys(meta).length > 0) {
      logMessage += `\n${JSON.stringify(meta, null, 2)}`;
    }
    
    return logMessage;
  }

  log(level, message, meta = {}) {
    if (LOG_LEVELS[level] <= this.currentLevel) {
      console.log(this.formatMessage(level, message, meta));
    }
  }

  error(message, meta = {}) {
    this.log('ERROR', message, meta);
  }

  warn(message, meta = {}) {
    this.log('WARN', message, meta);
  }

  info(message, meta = {}) {
    this.log('INFO', message, meta);
  }

  debug(message, meta = {}) {
    this.log('DEBUG', message, meta);
  }

  // API request logging
  request(req, res, next) {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const logData = {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.get('User-Agent'),
        ip: req.ip
      };
      
      if (res.statusCode >= 400) {
        this.warn(`HTTP Request`, logData);
      } else {
        this.info(`HTTP Request`, logData);
      }
    });
    
    next();
  }
}

module.exports = new Logger();

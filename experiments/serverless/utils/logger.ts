import bunyan from 'bunyan';
import bunyanFormat from 'bunyan-format';

/**
 * Default configuration
 **/
const defaultOptions: Partial<bunyan.LoggerOptions> = {
  level: 'debug',
  stream: new bunyanFormat({
    outputMode: 'bunyan',
    levelInString: true,
  }),
};

/**
 * Create logger
 **/
const createBunyanLogger = (opts?: bunyan.LoggerOptions): bunyan => {
  const logger = bunyan.createLogger({
    ...defaultOptions,
    ...opts,
  });
  return logger;
};

const logger = createBunyanLogger({
  name: 'FeatureKiller',
});

export default logger;

const NO_COLOR = '\x1b[0m';
const RED = '\x1b[31;01m';
const GREEN = '\x1b[32;01m';
const YELLOW = '\x1b[33;01m';
const BLUE = '\x1b[34;01m';
const MAGENTA = '\x1b[35;01m';
const CYAN = '\x1b[36;01m';

export const Logger = {
  log(string: string, object?: any) {
    if (object) {
      console.log(string, object);
    } else {
      console.log(string);
    }
  },
  debug(string: string, object?: any) {
    this.log(string, object);
  },
  info(string: string, object?: any) {
    this.log(`${GREEN}${string}${NO_COLOR}`, object);
  },
  important(string: string, object?: any) {
    this.log(`${BLUE}${string}${NO_COLOR}`, object);
  },
  warn(string: string, object?: any) {
    this.log(`${YELLOW}${string}${NO_COLOR}`, object);
  },
  error(string: string, object?: any) {
    this.log(`${RED}${string}${NO_COLOR}`, object);
  },
};

export default Logger;

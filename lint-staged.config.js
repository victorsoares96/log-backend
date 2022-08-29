const path = require('path');

module.exports = {
  '*.{json,ts}': (absolutePaths) => {
    const cwd = process.cwd();
    const relativePaths = absolutePaths.map((file) => path.relative(cwd, file));

    return `prettier ${relativePaths.join(' ')} --write`;
  },
  '*.ts': (absolutePaths) => {
    const cwd = process.cwd();
    const relativePaths = absolutePaths.map((file) => path.relative(cwd, file));

    return [`eslint ${relativePaths.join(' ')} --cache --fix`, 'tsc -p tsconfig.json --noEmit --pretty'];
  }
};

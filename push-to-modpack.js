import fs from 'fs-extra';
import path from 'path';

import 'dotenv/config';

for (const src of ['config/', 'kubejs/']) {
    const dst = path.join(process.env.MODPACK_ROOT, src);
    await fs.copy(src, dst);
}
console.log('done - remember to /reload!');

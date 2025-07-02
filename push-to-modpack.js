import fs from 'fs/promises';
import path from 'path';

import 'dotenv/config';
import { glob } from 'glob';

const files = await glob(['config/**', 'kubejs/**'], { nodir: true });
for (const file of files) {
    const dest = path.join(process.env.MODPACK_ROOT, file);
    await fs.copyFile(file, dest);
    console.log(file, '->', dest);
}

import fs from 'fs/promises';

import 'dotenv/config';
import { glob } from 'glob';

const files = await glob(['.probe/**', 'kubejs/*/jsconfig.json'], {
    cwd: process.env.MODPACK_ROOT,
    withFileTypes: true
});
for (const file of files) {
    if (file.isDirectory()) {
        await fs.mkdir(file.relative());
    } else {
        await fs.copyFile(file.fullpath(), file.relative());
    }
    console.log(file.fullpath(), '->', file.relative());
}

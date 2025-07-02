import 'dotenv/config';
import { src, dest } from 'gulp';

export function importProbe() {
    return src(
            ['.probe/**', 'kubejs/*/jsconfig.json'],
            { cwd: process.env.MODPACK_ROOT, cwdbase: true }
        ).pipe(dest('.'));
}

export function pushToModpack() {
    return src(['config/**', 'kubejs/**'], { base: '.' })
        .pipe(dest(process.env.MODPACK_ROOT));
}
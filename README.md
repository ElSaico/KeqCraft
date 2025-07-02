KeqCraft
========

## How to install on server

Just copy the `config/` and `kubejs/` folders there.

## Development commands

**IMPORTANT** - create an `.env` file at the root of this repository with the following content:

```
MODPACK_ROOT=<absolute path to the modpack's minecraft/ folder>
```

- `npm run probe`: copy modpack's ProbeJS data to the repository; ensures autocomplete
- `npm run push`: copy KubeJS and mod configuration files to the modpack

## TODO

- [ ] Create automatable recipes for Point Blank items
- [ ] Remove creative items from recipe viewer
- [ ] Consolidate food recipes across mods (too many doughs, for one)

### TODO... maybe

- [ ] Replace Powah's uraninite with uranium ingots
KeqCraft
========

## How to install on server

Just copy the `config/` and `kubejs/` folders there.

## Development commands

**IMPORTANT**: copy the `.env.example` file to `.env` and set `MODPACK_ROOT` with your modpack's location; remember to double the backslashes for Windows paths!

- `npm run probe`: copy modpack's ProbeJS data to the repository; ensures autocomplete
- `npm run push`: copy KubeJS and mod configuration files to the modpack

## TODO

- [ ] Remove creative items from recipe viewer
- [ ] Consolidate food recipes across mods (too many doughs, for one)
- [ ] Consolidate sheet recipes (does tag unification solve it?)
- [ ] More tag unification
- [ ] Sync file removal on `push` command

### TODO... maybe

- [ ] Replace Extreme Reactors's blutonium directly with Mekanism's plutonium
  - https://github.com/ZeroNoRyouki/ExtremeReactors2/tree/master/modpack-api-wrapper

## Notes

- Some recipes under `data/` are fixes for errors on their respective mods; if they ever get updated to fixed versions, those must be removed
  - `cataclysm/`: fixed in 3.x
  - `mekaweapons/`: https://github.com/omeranha/MekaWeapons/issues/46
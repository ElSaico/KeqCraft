KeqCraft
========

## How to install on server

Just copy the `config/` and `kubejs/` folders there.

## Development commands

**IMPORTANT**: copy the `.env.example` file to `.env` and set `MODPACK_ROOT` with your modpack's location; remember to double the backslashes for Windows paths!

- `npm run probe`: copy modpack's ProbeJS data to the repository; ensures autocomplete
- `npm run push`: copy KubeJS and mod configuration files to the modpack

## TODO

- [ ] Create automatable recipes for Point Blank items
- [ ] Remove creative items from recipe viewer
- [ ] Consolidate food recipes across mods (too many doughs, for one)

### TODO... maybe

- [ ] Replace Powah's uraninite with uranium ingots
- [ ] Add Mekanism's nuclear waste, polonium and plutonium directly to Extreme Reactors
  - https://github.com/ZeroNoRyouki/ExtremeReactors2/tree/master/modpack-api-wrapper
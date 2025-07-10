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
- [ ] Consolidate sheet recipes (does tag unification solve it?)
- [ ] Avoid errors caused by existing recipes
- [ ] More tag unification
- [ ] Sync file removal on `push` command

### TODO... maybe

- [ ] Replace Extreme Reactors's blutonium directly with Mekanism's plutonium
  - https://github.com/ZeroNoRyouki/ExtremeReactors2/tree/master/modpack-api-wrapper

## Notes

- Some recipes under `data/` are fixes for errors on their respective mods; if they ever get updated to fixed versions, those must be removed
  - `createfood/`
    - https://github.com/AverageAnime/create-food/issues/66 (fixed in 2.0.0-beta-2)
    - https://github.com/AverageAnime/create-food/issues/67 (fixed in 2.0.0-beta-2)
    - https://github.com/AverageAnime/create-food/issues/69 (fixed in 2.0.0-beta-3)
    - https://github.com/AverageAnime/create-food/issues/71 (fixed in 2.0.0-beta-3)
    - https://github.com/AverageAnime/create-food/issues/72 (fixed in 2.0.0-beta-3)
    - https://github.com/AverageAnime/create-food/issues/74 (fixed in 2.0.0-beta-3; only partially fixed here)
    - https://github.com/AverageAnime/create-food/issues/76 (fixed in 2.0.0-beta-3)
  - `mekaweapons/`
    - https://github.com/omeranha/MekaWeapons/issues/46
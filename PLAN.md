---

# Verdant Gears — Design Document
## v1.0 Locked | 1.21.1 NeoForge | June 11, 2026

---

### Table of Contents

I. Mod List
II. Thematic Architecture
III. Multispecies Society (EMF/ETF Resource Pack)
IV. KubeJS Script Suite
V. Feature Details — Trolls, Ender Dragon, Zombies, Sensitivity Book
VI. Localization (pt_BR)
VII. Absences

---

## I. Mod List (Final — ~72 Mods)

### Content (32)

| Mod | Version |
|-----|---------|
| Create | Latest 1.21.1 NeoForge |
| Create: Aeronautics | v1.2.1 |
| Create: Steam 'n Rails | Latest 1.21.1 |
| Create: Deco | Latest |
| Create: Connected | Latest |
| Create: Power Loader | Latest |
| Create Addition | Latest |
| Create Polyphony | Latest |
| Copycats+ | Latest |
| Sable | Latest (Create dependency) |
| Nature's Aura | v41.9 |
| Occultism | v1.220.1 |
| Iron's Spells 'n Spellbooks | v3.16.0 |
| Interlace SpellWeaves | Latest |
| Magic Schools Skill Trees | Latest |
| Scorched Guns Neoforged | Latest (Modrinth) |
| L_Ender's Cataclysm | Latest |
| YUNG's Better Dungeons | Latest |
| YUNG's Better Mineshafts | Latest |
| YUNG's Better Strongholds | Latest |
| Farmer's Delight | Latest |
| Brewin' and Chewin' | Latest |
| Nether's Delight | Latest |
| Ocean's Delight | Latest |
| Sophisticated Storage | Latest |
| Sophisticated Backpacks | Latest |
| Amendments | Latest |
| Another Furniture | Latest |
| Better Combat | Latest |
| Almost Unified | Latest |
| Corpse | Latest |
| Supplementaries | Latest |

### Rendering (2)

| Mod | Version |
|-----|---------|
| Entity Model Features (EMF) | v3.2.4 (NeoForge 26.1.2) |
| Entity Texture Features (ETF) | EMF dependency |

### QoL / Libraries (~17)

EMI, Jade, Patchouli, Cloth Config, Sophisticated Core, Skin Restorer, resource pack loaders, etc.

---

## II. Thematic Architecture

Tone: Moist von Lipwig-era Discworld — magic as municipal infrastructure, spirits as contractual staff, wizards as academic tradesmen, firearms as Watch-issue tools, multicultural society as the natural state.

The Parallel Duopoly:

| Domain | Industrial | Magical |
|--------|-----------|---------|
| Logistics | Create belts, trains | Occultism spirits |
| Power | Create wind/water/steam | Nature's Aura → boiler heat |
| Combat | Scorched Guns | Iron's Spells |
| Flight | Create: Aeronautics | Iron's flight spells |
| Storage | Sophisticated Storage + Create | Occultism dimensional |
| Mining | Create tunnel bores | Occultism Cursed Miner |

---

## III. Multispecies Society — "Verdant Species" Resource Pack

### Technical Stack

- EMF v3.2.4 (model swapping by condition)
- ETF (texture variants by biome/profession/name)
- Resource pack ships with modpack

### Species (Villager Model Swaps)

| Species | EMF Trigger | Visual |
|---------|-------------|--------|
| Human | Default — no trigger | Vanilla villager (no file) |
| Dwarf | Profession = smith, toolsmith, weaponsmith | Stocky, bearded, leather apron |
| Goblin | Biome = swamp, mangrove, dark forest | Hunched, sharp, green-toned (ETF) |
| Gnome | Biome = desert, badlands, hot savanna | Small, wrapped head, compass |
| Troll | Biome + spawn condition (see Troll Table) | Large, chunky, 10 material textures |
| Igor | Profession = butcher + name == "Igor" (exact) | Hunched, stitched face, surgical apron, mismatched eyes (ETF) |

### Troll Material Array

One .jem model. ETF selects texture by biome/spawn condition.

| # | Material | Spawn | Baseline Intellect | Texture |
|---|----------|-------|-------------------|---------|
| 1 | Stone | Mountains (default) | Neutral | Gray, craggy |
| 2 | Ice | Snow plains, frozen peaks | Speed II, Haste II | Pale blue, crystalline |
| 3 | Deepslate | Below Y=0 | Speed I, Haste I | Dark gray, mineral flecks |
| 4 | Sandstone | Desert, badlands | Neutral | Sand-gold, wind-worn |
| 5 | Mud | Swamp, mangrove | Neutral | Dark brown, moss |
| 6 | Granite | Mountains (30% alt) | Neutral | Pinkish, speckled |
| 7 | Calcite | Stony peaks / near amethyst | Neutral + Luck I | White, banded, luminous |
| 8 | Obsidian | Near lava at spawn | Speed I, Haste I, thermal inertia | Glossy black, purple highlights |
| 9 | Nether | Near portal / Nether | Reversed cycle | Cracked blackstone, magma veins |
| ★ | Diamond | 0.5% all spawns; +1% if ice/deepslate Y > 180 | Speed III, Haste III, heat-immune | Refractive, rainbow dispersion, emissive |

### Zombie Villager Textures

ETF keyed to profession tag (persisted from pre-death). Vanilla zombie villager model.

| Profession Tag | Texture |
|---------------|---------|
| Cartographer | Torn postal uniform, mailbag stitched to shoulder |
| Butcher | Bloodstained apron, cleaver in belt |
| Smith / Toolsmith / Weaponsmith | Burned leather apron, singed beard |
| Cleric / Librarian | Robes, cracked spectacles, quill behind ear |
| Any other | "STILL WORKING" badge |

### Igor Identity

The name is the role. name == "Igor" — exact match. No surname, no profession prefix. Igors who marry adopt the family name but keep Igor as professional designation. The model has stitched face, surgical apron, and ETF mismatched eyes.

---

## IV. KubeJS Script Suite (6 scripts / ~630 lines)

Ore/ingot/dust unification is handled by Almost Unified (mod-level, no script needed).

| # | Script | Lines | Role |
|---|--------|-------|------|
| 1 | bridge_recipes.js | ~120 | Nature's Aura ↔ Occultism ↔ Create ↔ Iron's cross-linking |
| 2 | cataclysm_loot.js | ~40 | Pillar-relevant loot in Cataclysm boss drops |
| 3 | troll_temperature.js | ~170 | Troll material spawning + environmental intelligence |
| 4 | ender_dragon_buff.js | ~130 | Raid-tier Ender Dragon |
| 5 | zombie_release.js | ~90 | Silent endurance + Death's release on trade completion |
| 6 | sensitivity_book.js | ~80 | pt_BR sensitivity manual, first-join distribution + craft |

---

## V. Feature Details

### A. Troll Temperature (troll_temperature.js)

Spawn: On villager creation, rolls material tag → persistent NBT.

Baseline Intelligence Tiers:

| Tier | Materials | Effects |
|------|-----------|---------|
| S | Diamond | Speed III, Haste III, heat penalties blocked |
| A | Ice, Obsidian | Ice: Speed II, Haste II. Obsidian: Speed I, Haste I + thermal inertia |
| B | Deepslate | Speed I, Haste I |
| C | Stone, Granite, Calcite*, Sandstone, Mud | Neutral. *Calcite: Luck I |
| R | Nether | Slowness I + Weakness I (Overworld); Speed II + Haste II (Nether) |

Environmental Modifiers (tick every 5s):
- Snow + night: +1 Speed, +1 Haste (max IV)
- Frozen peaks: Ice trolls +2/+2
- Water/rain: clears fire-proximity penalties
- Desert + daytime: -1 Speed, -1 Haste
- Sunlight, warm biome: -2 Speed
- Fire/lava/campfire (8-block radius): -1 to -3 Speed
- Nether dimension: applies Nether baseline
- Diamond: always applies baseline, skips all penalties

Obsidian Thermal Inertia: Heats 3× slower, cools 3× slower. NBT heat_accumulated.

Calcite: Geode proximity check at spawn (16-block radius). "Troll de calcinha" pun native to pt_BR.

### B. Ender Dragon (ender_dragon_buff.js)

Stats:

| Stat | Vanilla | Verdant |
|------|---------|---------|
| Max Health | 200 ×½ | 600 ×½ |
| Melee Damage | 10 | 18 |
| Armor | 0 | 8 |
| Armor Toughness | 0 | 4 |
| Knockback Resistance | 0 | 0.75 |

Abilities:
- Ender Roar (every 45s): 10-block Levitation I + Slowness II, 3s
- Minion Call (every 60s, <50% HP): 3–5 Endermen
- Perch Slam (<30% HP): 8-damage AoE + launch
- Acid Pool (<25% HP): 5×5 Dragon's Breath, 30s

Immune: Levitation, Wither, Instant Damage (heals).

Loot: Dormant Dragon Heart ×1, Dragon Scale ×16–24, Ender Pearl ×32–48.

### C. Zombie Release (zombie_release.js)

Stats: 40 HP, 0.8 Knockback Resistance, 70% explosion reduction, 90% fall reduction. No daylight burning.

Release Sequence:
1. Player right-clicks zombie with trade item → item consumed
2. Low bell tone to player
3. Chat message in small caps (pt_BR), untagged:

| Zombie | pt_BR |
|--------|-------|
| Postal | sᴇᴜ ᴛʀᴀᴊᴇᴛᴏ ᴇsᴛá ᴄᴏᴍᴘʟᴇᴛᴏ. ᴏs ᴄᴏʀʀᴇɪᴏs ᴇɴᴠɪᴀᴍ sᴇᴜs ᴀɢʀᴀᴅᴇᴄɪᴍᴇɴᴛᴏs. ᴜᴍ ᴅɪᴀ. |
| Butcher | ᴀ úʟᴛɪᴍᴀ ᴇɴᴄᴏᴍᴇɴᴅᴀ ᴇsᴛá ᴘʀᴏɴᴛᴀ. ᴏ ᴄʟɪᴇɴᴛᴇ ᴇsᴛá… sᴀᴛɪsғᴇɪᴛᴏ. |
| Smith | ᴀ ᴘᴇçᴀ ғɪɴᴀʟ ᴇsᴛá ᴛᴇᴍᴘᴇʀᴀᴅᴀ. ᴀ ғᴏʀᴊᴀ ᴘᴏᴅᴇ ᴅᴇsᴄᴀɴsᴀʀ. |
| Clerk | ғᴏʀᴍᴜʟáʀɪᴏ 𝟷𝟺‑ʙ ᴀʀǫᴜɪᴠᴀᴅᴏ ᴇᴍ ᴛʀɪᴘʟɪᴄᴀᴛᴀ. ᴏ ᴀᴛʀᴀsᴏ é ɴᴏᴛᴀᴅᴏ. |
| Igor | sᴇᴜ ғɪᴏ ᴇsᴛá ᴀᴍᴀʀʀᴀᴅᴏ. ᴀ ғᴀᴍíʟɪᴀ ʀᴇɢɪsᴛʀᴀ sᴜᴀ ᴄᴏɴᴛʀɪʙᴜɪçãᴏ. |
| Generic | ᴠᴏᴄê ᴀɢᴜᴇɴᴛᴏᴜ. ᴏ ôɴɪʙᴜs ғᴏɪ ʙᴇᴍ sᴜᴘᴇʀᴀᴅᴏ. ᴀᴛé ʟᴏɢᴏ. |

4. Wither rose particles → 2s delay → soot-black particles → despawn.
5. No memento.

Trades:

| Zombie | Pay |
|--------|-----|
| Postal | 10 Paper |
| Butcher | 5 Rotten Flesh |
| Smith | 1 Iron Ingot |
| Clerk | 1 Written Book |
| Igor | 1 Emerald |
| Generic | 1 Emerald |

### D. Sensitivity Book (sensitivity_book.js)

16-page written book. Distributed on first join. Craftable: Book + any Nature's Aura token (lossless).

Contents (pt_BR):
1. Title & Aviso
2. Humans — anti-"halfling" clarification
3–4. Dwarfs
5–7. Trolls (material consciousness, environmental sensitivity, diamond rarity)
8–9. Goblins
10–11. Gnomes
12–14. Igors
15. General advice
16. Stamp — "A esperança ajuda. — M. v. Lipwig"

Post-vital addendum: References zombie citizens — assist with unfinished business.

---

## VI. Localization (pt_BR)

Primary language: Brazilian Portuguese.

- All custom item names in pt_br.json lang file
- Sensitivity Book fully localized (16 pages)
- Death's lines localized (6 professions)
- Calcite pun ("troll de calcinha") is native — Sensitivity Book acknowledges it directly
- "Halfling" → "halfling" (loanword used in Brazilian RPG communities)
- "Post-vital" → "pós-vital"
- Unicode small caps via U+1D00 block. Fallback: dark gray lowercase.

---

## VII. Absences

- ❌ Boss progression gates, milestone unlocks, recipe restrictions
- ❌ Creative-tier items
- ❌ Theurgy, Wizards Help!
- ❌ Mutant Monsters, Mowzie's Mobs
- ❌ MineColonies, Custom NPCs, heavy NPC mods
- ❌ Player species mechanics
- ❌ Memento drops from zombie release

---

## VIII. Development Order

1. Core mod pack assembly + version resolution + Almost Unified config
2. bridge_recipes.js
3. cataclysm_loot.js
4. troll_temperature.js
5. ender_dragon_buff.js
6. zombie_release.js
7. sensitivity_book.js + pt_br.json
8. Verdant Species resource pack (parallel with scripts 1–4)

---

*Locked. June 11, 2026. Ankh-Morpork Citizens' Bureau (Uberwald Annex).*

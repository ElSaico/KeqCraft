// Priority: 30
// Troll material spawning + environmental intelligence
// Trolls are villagers — EMF swaps the model based on persistent NBT

const TROLL_TAG = 'VerdantTrollMaterial'
const TROLL_HEAT = 'VerdantTrollHeat'

const MATERIALS = {
  stone:     { weight: 30, biomes: ['mountain', 'slope', 'peak', 'stony'], tier: 'C' },
  ice:       { weight: 15, biomes: ['frozen', 'ice_spikes', 'snowy', 'snow'], tier: 'A' },
  deepslate: { weight: 15, biomes: null, yMax: 0, tier: 'B' },
  sandstone: { weight: 15, biomes: ['desert', 'badlands'], tier: 'C' },
  mud:       { weight: 15, biomes: ['swamp', 'mangrove'], tier: 'C' },
  granite:   { weight: 10, biomes: ['mountain', 'slope', 'peak', 'stony'], tier: 'C' },
  calcite:   { weight: 8,  biomes: ['stony_peaks'], tier: 'C' },
  obsidian:  { weight: 5,  biomes: null, nearLava: true, tier: 'A' },
  nether:    { weight: 5,  biomes: ['nether', 'crimson', 'warped', 'basalt', 'soul_sand'], tier: 'R' },
  diamond:   { weight: 0,  tier: 'S' }
}

const TIER_EFFECTS = {
  S: { speed: 3, haste: 3 },
  A: { speed: 2, haste: 2 },
  B: { speed: 1, haste: 1 },
  C: { speed: 0, haste: 0 },
  R: { speed: -1, haste: -1 }
}

function matchesBiome(biomeName, biomeList) {
  if (!biomeList) return false
  return biomeList.some(b => biomeName.includes(b))
}

function rollMaterial(biomeName, y, level, pos) {
  if (Math.random() < 0.005) return 'diamond'

  let candidates = []
  for (let [mat, cfg] of Object.entries(MATERIALS)) {
    if (mat === 'diamond') continue
    if (cfg.biomes && !matchesBiome(biomeName, cfg.biomes)) continue
    if (cfg.yMax !== undefined && y > cfg.yMax) continue
    if (cfg.nearLava) {
      let hasLava = false
      for (let dx = -4; dx <= 4 && !hasLava; dx++)
        for (let dz = -4; dz <= 4 && !hasLava; dz++)
          if (String(level.getBlockState(pos.offset(dx, 0, dz)).block.id).includes('lava'))
            hasLava = true
      if (!hasLava) continue
    }
    for (let i = 0; i < cfg.weight; i++) candidates.push(mat)
  }
  if (candidates.length === 0) return 'stone'

  let mat = candidates[Math.floor(Math.random() * candidates.length)]
  if (mat === 'diamond' && biomeName.includes('frozen') && y > 180)
    if (Math.random() < 0.01) return 'diamond'
  return mat
}

function isTrollBiome(biomeName) {
  let trollBiomes = ['mountain', 'slope', 'peak', 'stony', 'frozen', 'ice_spikes',
    'snowy', 'snow', 'desert', 'badlands', 'swamp', 'mangrove', 'nether',
    'crimson', 'warped', 'basalt', 'soul_sand']
  return trollBiomes.some(b => biomeName.includes(b))
}

EntityEvents.spawned(event => {
  let entity = event.entity
  if (entity.type !== 'minecraft:villager') return
  if (entity.persistentData.contains(TROLL_TAG)) return

  let biomeName = String(entity.level.getBiome(entity.blockPosition()) || '')
  if (!isTrollBiome(biomeName)) return
  if (Math.random() > 0.20) return

  let mat = rollMaterial(biomeName, entity.y, entity.level, entity.blockPosition())
  entity.persistentData.putString(TROLL_TAG, mat)
  entity.persistentData.putInt(TROLL_HEAT, 0)

  let color = {
    stone: '#888888', ice: '#aaddff', deepslate: '#444455', sandstone: '#ccaa66',
    mud: '#665533', granite: '#aa7766', calcite: '#eeeedd', obsidian: '#220033',
    nether: '#882211', diamond: '#55ffee'
  }[mat] || '#888888'

  entity.mergeNbt({
    CustomName: `{"translate":"entity.verdant_gears.troll_${mat}","italic":true,"color":"${color}"}`
  })

  if (mat === 'calcite') {
    let hasGeode = false
    for (let dx = -16; dx <= 16 && !hasGeode; dx += 4)
      for (let dz = -16; dz <= 16 && !hasGeode; dz += 4)
        if (String(entity.level.getBlockState(entity.blockPosition().offset(dx, 0, dz)).block.id).includes('amethyst'))
          hasGeode = true
    if (hasGeode) entity.potionEffects.add('minecraft:luck', 200, 0, false, false)
  }

  entity.persist()
})

ServerEvents.tick(event => {
  if (event.server.tickCount % 100 !== 0) return

  event.server.allLevels.forEach(level => {
    level.getEntities(null, e => e.type === 'minecraft:villager' && e.persistentData.contains(TROLL_TAG))
      .forEach(entity => {
        let mat = entity.persistentData.getString(TROLL_TAG)
        let cfg = MATERIALS[mat]
        if (!cfg) return

        let tier = TIER_EFFECTS[cfg.tier]
        let biomeName = String(level.getBiome(entity.blockPosition()) || '')
        let isNight = level.dayTime % 24000 > 13000
        let inNether = String(level.dimension) === 'minecraft:the_nether'

        if (mat === 'diamond') {
          entity.potionEffects.add('minecraft:speed', 200, tier.speed - 1, false, false)
          entity.potionEffects.add('minecraft:haste', 200, tier.haste - 1, false, false)
          return
        }

        let speedMod = tier.speed
        let hasteMod = tier.haste

        if (mat === 'nether') {
          if (inNether) { speedMod = 2; hasteMod = 2 }
          else { speedMod = -1; hasteMod = -1 }
        }

        if (biomeName.includes('snow') && isNight) { speedMod += 1; hasteMod += 1 }
        if (biomeName.includes('frozen_peaks') && mat === 'ice') { speedMod += 2; hasteMod += 2 }

        if (biomeName.includes('desert') && !isNight) { speedMod -= 1; hasteMod -= 1 }
        if (!isNight && (biomeName.includes('plains') || biomeName.includes('savanna'))) speedMod -= 2

        let heat = entity.persistentData.getInt(TROLL_HEAT)
        let nearFire = false
        for (let dx = -8; dx <= 8 && !nearFire; dx += 2)
          for (let dz = -8; dz <= 8 && !nearFire; dz += 2) {
            let bid = String(level.getBlockState(entity.blockPosition().offset(dx, 0, dz)).block.id)
            if (bid.includes('fire') || bid.includes('lava') || bid.includes('campfire'))
              nearFire = true
          }

        if (nearFire) {
          let heatPenalty = mat === 'obsidian' ? 1 : 3
          heat = Math.min(heat + heatPenalty, 9)
          speedMod -= Math.floor(heat / 3)
        } else {
          let coolRate = mat === 'obsidian' ? 1 : 3
          heat = Math.max(heat - coolRate, 0)
        }

        if (entity.isInWater() || level.isRaining()) heat = Math.max(heat - 2, 0)

        entity.persistentData.putInt(TROLL_HEAT, heat)

        speedMod = Math.max(Math.min(speedMod, 4), 0)
        hasteMod = Math.max(Math.min(hasteMod, 4), 0)

        if (speedMod > 0)
          entity.potionEffects.add('minecraft:speed', 200, speedMod - 1, false, false)
        if (hasteMod > 0)
          entity.potionEffects.add('minecraft:haste', 200, hasteMod - 1, false, false)
        if (speedMod < 0)
          entity.potionEffects.add('minecraft:slowness', 200, Math.abs(speedMod) - 1, false, false)

        if (mat === 'calcite')
          entity.potionEffects.add('minecraft:luck', 200, 0, false, false)
      })
  })
})

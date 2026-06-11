// Priority: 25
// Raid-tier Ender Dragon — 600 HP, abilities, custom loot

const DRAGON_ROAR_CD = 'VerdantDragonRoarCD'
const DRAGON_MINION_CD = 'VerdantDragonMinionCD'
const DRAGON_SLAM_CD = 'VerdantDragonSlamCD'

EntityEvents.spawned(event => {
  let entity = event.entity
  if (entity.type !== 'minecraft:ender_dragon') return
  if (entity.persistentData.getBoolean('VerdantBuffed')) return

  entity.modifyAttribute('minecraft:max_health', 'verdant_gears:dragon_hp', 400, 'addition')
  entity.modifyAttribute('minecraft:attack_damage', 'verdant_gears:dragon_atk', 8, 'addition')
  entity.modifyAttribute('minecraft:armor', 'verdant_gears:dragon_armor', 8, 'addition')
  entity.modifyAttribute('minecraft:armor_toughness', 'verdant_gears:dragon_tough', 4, 'addition')
  entity.modifyAttribute('minecraft:knockback_resistance', 'verdant_gears:dragon_kb', 0.75, 'addition')
  entity.heal(600)

  entity.persistentData.putBoolean('VerdantBuffed', true)
  entity.persistentData.putInt(DRAGON_ROAR_CD, 0)
  entity.persistentData.putInt(DRAGON_MINION_CD, 0)
  entity.persistentData.putInt(DRAGON_SLAM_CD, 0)
  entity.persist()
})

ServerEvents.tick(event => {
  if (event.server.tickCount % 20 !== 0) return

  event.server.allLevels.forEach(level => {
    level.getEntities(null, e => e.type === 'minecraft:ender_dragon' && e.persistentData.getBoolean('VerdantBuffed'))
      .forEach(dragon => {
        let hp = dragon.health
        let maxHp = dragon.maxHealth
        let ratio = hp / maxHp

        dragon.potionEffects.remove('minecraft:wither')
        dragon.potionEffects.remove('minecraft:levitation')

        let roarCD = dragon.persistentData.getInt(DRAGON_ROAR_CD)
        let minionCD = dragon.persistentData.getInt(DRAGON_MINION_CD)
        let slamCD = dragon.persistentData.getInt(DRAGON_SLAM_CD)

        if (roarCD > 0) dragon.persistentData.putInt(DRAGON_ROAR_CD, roarCD - 1)
        if (minionCD > 0) dragon.persistentData.putInt(DRAGON_MINION_CD, minionCD - 1)
        if (slamCD > 0) dragon.persistentData.putInt(DRAGON_SLAM_CD, slamCD - 1)

        let px = dragon.x, py = dragon.y, pz = dragon.z

        if (roarCD <= 0) {
          dragon.persistentData.putInt(DRAGON_ROAR_CD, 45)
          level.getEntities(null, e => e.isPlayer() && e.distanceTo(dragon) <= 10)
            .forEach(player => {
              player.potionEffects.add('minecraft:levitation', 60, 0, false, true)
              player.potionEffects.add('minecraft:slowness', 60, 1, false, true)
            })
          level.spawnParticles('minecraft:dragon_breath', px, py, pz, 30, 5, 3, 5, 0.1)
        }

        if (ratio < 0.5 && minionCD <= 0) {
          dragon.persistentData.putInt(DRAGON_MINION_CD, 60)
          let count = 3 + Math.floor(Math.random() * 3)
          for (let i = 0; i < count; i++) {
            let e = level.createEntity('minecraft:enderman')
            e.setPos(
              px + (Math.random() * 10 - 5),
              py + 1,
              pz + (Math.random() * 10 - 5)
            )
            e.persist()
            e.spawn()
          }
          level.spawnParticles('minecraft:portal', px, py, pz, 40, 4, 2, 4, 0.5)
        }

        if (ratio < 0.3 && slamCD <= 0) {
          dragon.persistentData.putInt(DRAGON_SLAM_CD, 30)
          level.getEntities(null, e => e.isPlayer() && e.distanceTo(dragon) <= 8)
            .forEach(player => {
              player.attack(8)
              player.setMotion(
                (player.x - px) * 0.5,
                0.8,
                (player.z - pz) * 0.5
              )
            })
          level.spawnParticles('minecraft:explosion', px, py, pz, 10, 3, 1, 3, 0.2)
        }

        if (ratio < 0.25) {
          let bx = Math.floor(px) + Math.floor(Math.random() * 5 - 2)
          let bz = Math.floor(pz) + Math.floor(Math.random() * 5 - 2)
          let by = Math.floor(py)
          for (let dx = -2; dx <= 2; dx++)
            for (let dz = -2; dz <= 2; dz++) {
              let bp = new BlockPos(bx + dx, by, bz + dz)
              if (level.getBlockState(bp).block.id === 'minecraft:air')
                level.setBlockAndUpdate(bp, Block.id('minecraft:dragon_breath'))
            }
        }
      })
  })
})

EntityEvents.death(event => {
  let entity = event.entity
  if (entity.type !== 'minecraft:ender_dragon') return
  if (!entity.persistentData.getBoolean('VerdantBuffed')) return

  let level = entity.level
  let px = entity.x, py = entity.y, pz = entity.z

  entity.block.popItem(Item.of('verdant_gears:dormant_dragon_heart'))

  let scaleCount = 16 + Math.floor(Math.random() * 9)
  entity.block.popItem(Item.of('verdant_gears:dragon_scale', scaleCount))

  let pearlCount = 32 + Math.floor(Math.random() * 17)
  entity.block.popItem(Item.of('minecraft:ender_pearl', pearlCount))

  level.spawnParticles('minecraft:dragon_breath', px, py, pz, 100, 8, 4, 8, 0.3)
})

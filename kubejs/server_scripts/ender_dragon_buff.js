// Priority: 25
// Raid-tier Ender Dragon — phase-aware abilities

/** @type {typeof import("@package/net/minecraft/world/entity/boss/enderdragon/phases").$EnderDragonPhase} */
const $EnderDragonPhase = Java.loadClass('net.minecraft.world.entity.boss.enderdragon.phases.EnderDragonPhase')

EntityEvents.spawned('minecraft:ender_dragon', event => {
  /** @type {import("@package/net/minecraft/world/entity/boss/enderdragon").$EnderDragon} */
  const dragon = /** @type {any} */ (event.entity)

  dragon.setMaxHealth(600)
  dragon.setAttributeBaseValue('minecraft:generic.attack_damage', 18)
  dragon.setAttributeBaseValue('minecraft:generic.armor', 8)
  dragon.setAttributeBaseValue('minecraft:generic.armor_toughness', 4)
  dragon.setAttributeBaseValue('minecraft:generic.knockback_resistance', 0.75)
  dragon.heal(600)
})

ServerEvents.tick(event => {
  if (event.server.tickCount % 20 !== 0) return

  /** @type {import("@package/net/minecraft/world/entity/boss/enderdragon").$EnderDragon} */
  const dragon = /** @type {any} */ (event.server.entities.filterType('minecraft:ender_dragon').getFirst())
  if (!dragon) return

  const ratio = dragon.getHealth() / dragon.getMaxHealth()
  const px = dragon.getX()
  const py = dragon.getY()
  const pz = dragon.getZ()
  const phase = dragon.getPhaseManager().getCurrentPhase().getPhase()

  dragon.removeEffect('minecraft:wither')
  dragon.removeEffect('minecraft:levitation')

  if (phase === $EnderDragonPhase.SITTING_ATTACKING) {
    dragon.level.players.filter(e => e.distanceTo(dragon) <= 12)
      .forEach(/** @param {import("@package/net/minecraft/world/entity/player").$Player} p */ p => {
        p.potionEffects.add('minecraft:levitation', 60, 0, false, true)
        p.potionEffects.add('minecraft:slowness', 60, 1, false, true)
      })
    dragon.level.spawnParticles('minecraft:dragon_breath', false, px, py, pz, 30, 5, 3, 5, 0.1)
  }

  if (phase === $EnderDragonPhase.SITTING_FLAMING) {
    let cloud = dragon.level.createEntity('minecraft:area_effect_cloud')
    cloud.setPos(px + Math.random() * 6 - 3, py, pz + Math.random() * 6 - 3)
    cloud.mergeNbt({
      Radius: 2.5,
      RadiusOnUse: -0.5,
      RadiusPerTick: -0.005,
      Duration: 400,
      WaitTime: 5,
      Particle: 'dragon_breath',
      effects: [{id: 'minecraft:instant_damage', amplifier: 1, duration: 1}]
    })
    cloud.spawn()
  }

  if (phase === $EnderDragonPhase.SITTING_SCANNING && ratio < 0.5) {
    dragon.getPhaseManager().setPhase($EnderDragonPhase.CHARGING_PLAYER)
  }

  if (phase === $EnderDragonPhase.HOLDING_PATTERN && ratio < 0.3) {
    if (Math.random() < 0.15) {
      dragon.getPhaseManager().setPhase($EnderDragonPhase.STRAFE_PLAYER)
    }
  }

  if (phase === $EnderDragonPhase.CHARGING_PLAYER) {
    dragon.level.players.filter(e => e.distanceTo(dragon) <= 5)
      .forEach(/** @param {import("@package/net/minecraft/world/entity/player").$Player} p */ p => {
        p.setDeltaMovement([
          (p.getX() - px) * 0.6,
          0.9,
          (p.getZ() - pz) * 0.6
        ])
      })
  }

  let minionCD = dragon.persistentData.getInt('VerdantMinionCD')
  if (minionCD > 0) dragon.persistentData.putInt('VerdantMinionCD', minionCD - 1)

  if (ratio < 0.5 && minionCD <= 0) {
    dragon.persistentData.putInt('VerdantMinionCD', 60)
    let count = 2 + Math.floor(Math.random() * 3)
    for (let i = 0; i < count; i++) {
      /** @type {import("@package/net/minecraft/world/entity/monster").$EnderMan} */
      let e = /** @type {any} */ (dragon.level.createEntity('minecraft:enderman'))
      e.setPos(px + Math.random() * 10 - 5, py + 1, pz + Math.random() * 10 - 5)
      e.setPersistenceRequired()
      e.spawn()
    }
    dragon.level.spawnParticles('minecraft:portal', false, px, py, pz, 40, 4, 2, 4, 0.5)
  }
})

EntityEvents.death('minecraft:ender_dragon', event => {
  /** @type {import("@package/net/minecraft/world/entity/boss/enderdragon").$EnderDragon} */
  const dragon = /** @type {any} */ (event.entity)
  const px = dragon.getX()
  const py = dragon.getY()
  const pz = dragon.getZ()

  dragon.block.popItem('minecraft:nether_star')

  let pearlCount = 32 + Math.floor(Math.random() * 17)
  dragon.block.popItem({id: 'minecraft:ender_pearl', count: pearlCount})

  let breathCount = 8 + Math.floor(Math.random() * 9)
  dragon.block.popItem({id: 'minecraft:dragon_breath', count: breathCount})

  dragon.level.spawnParticles('minecraft:dragon_breath', false, px, py, pz, 100, 8, 4, 8, 0.3)
})

// Priority: 30
// Silent endurance + Death's release on trade completion

const ZOMBIE_TAG = 'VerdantZombieProf'

const PROFESSIONS = {
  cartographer:  { pay: 'minecraft:paper',          count: 10, key: 'postal' },
  butcher:       { pay: 'minecraft:rotten_flesh',    count: 5,  key: 'butcher' },
  armorer:       { pay: 'minecraft:iron_ingot',      count: 1,  key: 'smith' },
  toolsmith:     { pay: 'minecraft:iron_ingot',      count: 1,  key: 'smith' },
  weaponsmith:   { pay: 'minecraft:iron_ingot',      count: 1,  key: 'smith' },
  cleric:        { pay: 'minecraft:written_book',    count: 1,  key: 'clerk' },
  librarian:     { pay: 'minecraft:written_book',    count: 1,  key: 'clerk' },
}

const RELEASE_LINES = {
  postal:  'sᴇᴜ ᴛʀᴀᴊᴇᴛᴏ ᴇsᴛá ᴄᴏᴍᴘʟᴇᴛᴏ. ᴏs ᴄᴏʀʀᴇɪᴏs ᴇɴᴠɪᴀᴍ sᴇᴜs ᴀɢʀᴀᴅᴇᴄɪᴍᴇɴᴛᴏs. ᴜᴍ ᴅɪᴀ.',
  butcher: 'ᴀ úʟᴛɪᴍᴀ ᴇɴᴄᴏᴍᴇɴᴅᴀ ᴇsᴛá ᴘʀᴏɴᴛᴀ. ᴏ ᴄʟɪᴇɴᴛᴇ ᴇsᴛá… sᴀᴛɪsғᴇɪᴛᴏ.',
  smith:   'ᴀ ᴘᴇçᴀ ғɪɴᴀʟ ᴇsᴛá ᴛᴇᴍᴘᴇʀᴀᴅᴀ. ᴀ ғᴏʀᴊᴀ ᴘᴏᴅᴇ ᴅᴇsᴄᴀɴsᴀʀ.',
  clerk:   'ғᴏʀᴍᴜʟáʀɪᴏ 𝟷𝟺‑ʙ ᴀʀǫᴜɪᴠᴀᴅᴏ ᴇᴍ ᴛʀɪᴘʟɪᴄᴀᴛᴀ. ᴏ ᴀᴛʀᴀsᴏ é ɴᴏᴛᴀᴅᴏ.',
  igor:    'sᴇᴜ ғɪᴏ ᴇsᴛá ᴀᴍᴀʀʀᴀᴅᴏ. ᴀ ғᴀᴍíʟɪᴀ ʀᴇɢɪsᴛʀᴀ sᴜᴀ ᴄᴏɴᴛʀɪʙᴜɪçãᴏ.',
  generic: 'ᴠᴏᴄê ᴀɢᴜᴇɴᴛᴏᴜ. ᴏ ôɴɪʙᴜs ғᴏɪ ʙᴇᴍ sᴜᴘᴇʀᴀᴅᴏ. ᴀᴛé ʟᴏɢᴏ.'
}

EntityEvents.spawned(event => {
  let entity = event.entity
  if (entity.type !== 'minecraft:zombie_villager') return
  if (entity.persistentData.contains(ZOMBIE_TAG)) return

  entity.modifyAttribute('minecraft:max_health', 'verdant_gears:zv_hp', 20, 'addition')
  entity.modifyAttribute('minecraft:knockback_resistance', 'verdant_gears:zv_kb', 0.8, 'addition')
  entity.heal(40)

  let nbt = entity.nbt
  let prof = String(nbt?.VillagerData?.profession || 'none').replace('minecraft:', '')
  let key = PROFESSIONS[prof]?.key || 'generic'

  if (nbt?.CustomName && String(nbt.CustomName).includes('Igor')) key = 'igor'

  entity.persistentData.putString(ZOMBIE_TAG, key)
  entity.persistentData.putString('VerdantZombieProfId', prof)
  entity.persist()
})

EntityEvents.interact(event => {
  let entity = event.entity
  let player = event.player
  if (entity.type !== 'minecraft:zombie_villager') return
  if (!entity.persistentData.contains(ZOMBIE_TAG)) return

  let key = entity.persistentData.getString(ZOMBIE_TAG)
  let profId = entity.persistentData.getString('VerdantZombieProfId')
  let profCfg = PROFESSIONS[profId]

  let payItem = profCfg?.pay || 'minecraft:emerald'
  let payCount = profCfg?.count || 1

  let held = player.mainHandItem
  if (held.id !== payItem || held.count < payCount) return

  held.shrink(payCount)

  player.server.runCommandSilent(
    `playsound minecraft:block.bell.use player ${player.username} ~ ~ ~ 0.6 0.5`
  )

  let line = RELEASE_LINES[key] || RELEASE_LINES.generic
  player.tell(line)

  let level = entity.level
  let px = entity.x, py = entity.y, pz = entity.z

  level.spawnParticles('minecraft:smoke', px, py + 1, pz, 20, 0.3, 0.5, 0.3, 0.02)

  event.server.scheduleInTicks(40, () => {
    level.spawnParticles('minecraft:ash', px, py + 0.5, pz, 30, 0.4, 0.8, 0.4, 0.01)
    entity.discard()
  })
})

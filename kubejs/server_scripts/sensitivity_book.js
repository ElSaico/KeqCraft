// Priority: 40
// pt_BR sensitivity manual — first-join distribution + craft

const BOOK_ID = 'verdant_gears:sensitivity_book'
const BOOK_TAG = 'VerdantBookGiven'

const PAGES = [
  '{"text":"§lGuia de Sensibilidade Multiespécie§r\\n§7Departamento de Relações Interespécie\\nAnkh-Morpork\\n\\n§4AVISO§r: Este guia é obrigatório para todos os cidadãos. Ignorá-lo não é ilegal, mas é mal-educado."}',
  '{"text":"§lHumanos§r\\n\\nA espécie padrão. Não os chame de §ohalflings§r — isso é ofensivo e impreciso. Humanos variam em tamanho naturalmente.\\n\\nEvite presumir que toda pessoa de baixa estatura é um anão ou gnomo."}',
  '{"text":"§lAnões (Parte 1)§r\\n\\nAnões são artífices por vocação. Ferreiros, armeiros e funileiros são profissões tradicionais.\\n\\nNunca toque na barba de um anão sem permissão. Isso é equivalente a um insulto grave."}',
  '{"text":"§lAnões (Parte 2)§r\\n\\nGênero anão é um assunto privado. Não pergunte. Não adivinhe. Não comente. Todos os anões usam barba e avental de couro — isso não é uma §opista§r.\\n\\nRespeite o ofício acima de tudo."}',
  '{"text":"§lTrolls (Parte 1)§r\\n\\nTrolls são seres de silício. Seus cérebros funcionam melhor no frio — literalmente. Um troll em uma montanha congelada pode ser um filósofo.\\n\\nO mesmo troll no deserto pode mal conseguir andar."}',
  '{"text":"§lTrolls (Parte 2)§r\\n\\nExistem dez materiais conhecidos de troll: pedra, gelo, ardósia profunda, arenito, lama, granito, calcita, obsidiana, Nether e diamante.\\n\\n§7Nota: trolls de calcita são às vezes chamados §o\\"trolls de calcinha\\"§7 — o trocadilho é inevitável.§r"}',
  '{"text":"§lTrolls (Parte 3)§r\\n\\nTrolls de diamante são extraordinariamente raros (0,5% de todos os trolls). Sua inteligência é constante e não sofre penalidades térmicas.\\n\\nSe você encontrar um, §oescute§r."}',
  '{"text":"§lGoblins (Parte 1)§r\\n\\nGoblins habitam pântanos, manguezais e florestas escuras. São curvados, ágeis e possuem uma relação profunda com objetos descartados.\\n\\nPara um goblin, nada é lixo."}',
  '{"text":"§lGoblins (Parte 2)§r\\n\\nNunca jogue fora algo na frente de um goblin. É considerado um desperdício moral.\\n\\nA arte goblin — §ounggue§r — é feita de materiais reciclados e é culturalmente sagrada."}',
  '{"text":"§lGnomos (Parte 1)§r\\n\\nGnomos vivem em desertos, badlands e savanas quentes. São pequenos, usam turbantes e carregam bússolas.\\n\\nSua principal virtude é a navegação — nunca duvide do senso de direção de um gnomo."}',
  '{"text":"§lGnomos (Parte 2)§r\\n\\nGnomos são correios naturais. Se um gnomo lhe entregar algo, §oaceite§r. Ele provavelmente andou dias para chegar até você.\\n\\nNunca recuse uma entrega gnômica."}',
  '{"text":"§lIgors (Parte 1)§r\\n\\nO nome é o cargo. Todo Igor se chama Igor. Igors que se casam adotam o sobrenome da família, mas mantêm Igor como designação profissional.\\n\\nNunca pergunte §oqual§r Igor."}',
  '{"text":"§lIgors (Parte 2)§r\\n\\nIgors são cirurgiões e transplantadores. O rosto costurado e os olhos desiguais são marcas de ofício, não defeitos.\\n\\nSe um Igor oferecer ajuda médica, aceite. Eles são §omuito§r bons nisso."}',
  '{"text":"§lIgors (Parte 3)§r\\n\\nA Rede Igor é uma das organizações mais antigas do mundo. Cada Igor mantém peças sobressalentes de gerações anteriores.\\n\\n§7\\"Um bom Igor nunca desperdiça.\\"§r"}',
  '{"text":"§lConselhos Gerais§r\\n\\nTrate cada espécie com a mesma cortesia profissional. Não presuma inteligência pela aparência. Não faça piadas sobre dieta (especialmente com trolls).\\n\\n§oCidadãos pós-vitais§r merecem respeito. Ajude-os com assuntos inacabados."}',
  '{"text":"§7§o\\"A esperança ajuda.\\"\\n— M. v. Lipwig§r\\n\\n§8Carimbo oficial do\\nDepartamento de Relações\\nInterespécie de Ankh-Morpork\\n\\nAprovado pelo Patrício.\\nProtocolado em triplicata.\\nArquivado. Eventualmente.§r"}'
]

function makeBook() {
  let bookNbt = {
    title: 'Guia de Sensibilidade Multiespécie',
    author: 'Departamento de Relações Interespécie',
    resolved: 1,
    pages: PAGES
  }
  return Item.of('minecraft:written_book', bookNbt)
}

PlayerEvents.loggedIn(event => {
  let player = event.player
  if (player.persistentData.getBoolean(BOOK_TAG)) return

  player.give(makeBook())
  player.persistentData.putBoolean(BOOK_TAG, true)
})

ServerEvents.recipes(event => {
  event.shapeless(makeBook(), [
    'minecraft:book',
    '#naturesaura:aura_bottles'
  ]).id('verdant_gears:sensitivity_book')
})

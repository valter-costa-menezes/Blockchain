// IMPORTANDO DEPENDENCIAS
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib')

// DEFININDO REDE DE TESTE
const network = bitcoin.networks.testnet;
const path = `m/49'/1'/0'/0`

// GERANDO MINEOMONICO DE PALAVARAS (PALAVRAS DE SENHA)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic)

// CRIANDO A RAIZ PARA A CARTEIRA
let root = bip32.fromSeed(seed, network)

// CRIANDO UMA CONTA
let account = root.derivePath(path)
let node = account.derive(0).derive(0)


// GERADOR DE ENDEREÇOS PARA AS CARTEIRAS
let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAdress)
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic)

import { deployProxy } from '@openzeppelin/truffle-upgrades';
import { ContractClass } from '@openzeppelin/truffle-upgrades/dist/utils';

const DummyStableCoin = artifacts.require('DummyStableCoin');

//  『--network development』の時のみデプロイ
if(process.argv.map((val,i)=>{ return i < process.argv.length -1 && val == "--network" && process.argv[i+1] == "development"}).includes(true)) {

    const migration: Truffle.Migration = async function (deployer) {
        // @ts-ignore
        const instance = await deployProxy(DummyStableCoin, [], { deployer });
    }
    
    module.exports = migration
}

// because of https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export { }

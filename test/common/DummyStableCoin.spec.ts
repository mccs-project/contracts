
import { deployProxy, upgradeProxy } from '@openzeppelin/truffle-upgrades';
import { ContractClass } from '@openzeppelin/truffle-upgrades/dist/utils';
import { Unit } from 'web3-utils';
import { DummyStableCoinInstance } from '../../types/truffle-contracts';
import { TestUtil } from '../TestUtil';

const dummyStableCoinContract = artifacts.require("DummyStableCoin");


contract("Dummy Stable Coin", ([owner, alice, bob, carol]) => {

    let dmy: DummyStableCoinInstance;   //  DummyStableCoinのインスタンス
    let dmyDecimals: number;    //  DummyStableCoinの小数点以下桁数
    let dmyToWeiUnit: Unit;     //  toWeiで指定する単位
    beforeEach(async()=>{
        dmy = await deployProxy(dummyStableCoinContract as unknown as ContractClass, []) as DummyStableCoinInstance;
        dmyDecimals = (await dmy.decimals()).toNumber();
        dmyToWeiUnit = TestUtil.decimalsToUnit(dmyDecimals);
    });

    describe("デプロイ", ()=>{
        it("ContractInstanceが返却されている", async()=>{
            assert.exists(dmy, "{1B8BC683-C441-4AB1-B08E-1A4D9CE9BCE7}");
        });

        it("小数点以下桁数", async()=>{
            //  『6桁』であること
            expect(6).to.equal(dmyDecimals, "{B89173B9-74CC-4C2A-B9F7-9142FDEB7C33}");

            // //  dmyToWeiUnitが正しく指定できていること（6桁付与された値が返却されること）
            expect("1000000").to.equals(web3.utils.toWei(web3.utils.toBN(1), dmyToWeiUnit).toString(), "{252B3B56-8F45-46C5-BD04-31C2B7584D55}");
        });
    });

    describe("発行（mint）", ()=>{
        it("ownerは発行可", async()=>{
            //  owner -> alice
            await dmy.mint(alice, 100, { from: owner });
            //  aliceの残高は100
            expect("100").to.equal((await dmy.balanceOf(alice, { from: owner })).toString(), "{8B260962-090B-46F2-8C95-5BE2EA8AD031}");
        });

        it("aliceは発行不可", async()=>{
            //  alice -> bob
            await dmy.mint(bob, 100, { from: alice })
            .then(_=>{ assert.fail("{D7611CE5-3E71-4D8F-AD8B-C7A571D6A9F9}"); })
            .catch(err=>{
                //  Ownableで制限されているため実行不可
                assert.equal("Ownable: caller is not the owner", err.reason, "{81692865-8EA9-4B7B-8124-46B7D892320B}"); 
            });
        });
    });
});
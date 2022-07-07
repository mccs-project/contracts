import { Unit } from "web3-utils";


export class TestUtil {
    static decimalsToUnit(decimals: number): Unit {
        switch(decimals) {
            case 3: return "kwei";
            case 6: return "mwei";
            case 9: return "gwei";
            case 12: return "szabo";
            case 15: return "finney";
            case 18: return "ether";
            case 21: return "kether";
            case 24: return "mether";
            case 27: return "gether";
            case 30: return "tether";
            default: throw new Error(`Unknown decimal: ${decimals}`);
        }
    }
}
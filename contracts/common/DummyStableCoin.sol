// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * @dev テスト用のステーブルコインを模したトークン
 * Note: 本番環境ではデプロイしない。
 */
contract DummyStableCoin is ERC20Upgradeable, OwnableUpgradeable {

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer { }
    function initialize() public initializer {
        __ERC20_init("Dummy Stable Coin", "DMY");
        __Ownable_init();
    }

    /**
     * @dev 小数点以下の桁数
     */
    function decimals() public view virtual override returns (uint8) {
        return 6;   //  USDTやUSDCと同じ6桁とする
    }

    /**
     * @dev 通貨発行
     * Note: 所有者のみ実行可。
     */
    function mint(address account, uint256 amount) public virtual onlyOwner {
        _mint(account, amount);
    }
}
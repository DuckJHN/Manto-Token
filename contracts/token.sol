// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Manto is ERC20, ERC20Burnable, ERC20Permit, Ownable {
    constructor(address initialOwner)
        ERC20("Manto", "MTO")
        ERC20Permit("Manto")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 420420420420 * 10 ** decimals());
        renounceOwnership();
    }

    function transferOwnership(address newOwner) public override onlyOwner {
        revert("Ownership cannot be transferred");
    }
}
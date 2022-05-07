// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract PathToken is ERC20, Ownable, ERC20Permit, ERC20Votes {

    IERC1155 public nftContract;

    modifier onlyNFTContract() {
        require(address(nftContract) != address(0));
        require(msg.sender == address(nftContract));
        _;
    }

    constructor(uint256 amount) ERC20("Paths2Abundance", "PATH") ERC20Permit("Paths2Abundance") {
        _mint(msg.sender, amount);
    }

    function mint(address to, uint256 amount) external onlyNFTContract {
        _mint(to, amount);
    }

    function connectNFT(IERC1155 _address) external onlyOwner {
        nftContract = _address;
    }

    /**----Overrides---- */

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
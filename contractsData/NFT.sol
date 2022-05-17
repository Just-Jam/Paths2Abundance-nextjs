// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PathToken.sol";

contract NFT is ERC1155, Ownable, ERC1155Supply {

    PathToken public _pathToken;

    struct Project {
        string _name;
        address _beneficiary;
        uint256 _mintPrice;
        uint256 _maxSupply;
        uint256 _amountRaised;
        uint256 _amountWithdrawn;
    }

    uint256 public _projectCount;
    //maps project id to struct 
    mapping(uint256 => Project) public _projects;

    //uri = something like this: https://game.example/api/item/{id}.json
    constructor(string memory uri, PathToken pathToken) ERC1155(uri) {
        _pathToken = pathToken;
    }

    modifier projectExists(uint256 id) {
        require(id <= _projectCount && id != 0, "Project does not exist");
        _;
    }

    function getProject(uint256 id) public view projectExists(id) returns (Project memory) {
        Project memory project = _projects[id];
        return project;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function createProject(
        uint256 mintPrice, 
        uint256 maxSupply, 
        string memory name, 
        address beneficiary
    ) external onlyOwner {
        require(mintPrice > 0, "Mint price must be greater than 0");
        require(maxSupply > 0, "Max supply must be greater than 0");
        //check if beneficiary has organization nft
        require(_organizationNFT.balanceOf(beneficiary) > 0, "Beneficiary does not have organization nft");
        _projectCount++;
        _projects[_projectCount] = Project(
            name, 
            beneficiary, 
            mintPrice, 
            maxSupply, 
            0,
            0
        );
    }

    function updateProjectInfo(
        uint256 id, 
        string memory name
    ) external onlyOwner projectExists(id) {
        Project storage project = _projects[id];
        project._name = name;
    }

    function increaseMaxSupply(uint256 id, uint256 amount) external onlyOwner projectExists(id) {
        Project storage project = _projects[id];
        project._maxSupply += amount;
    }

    function changeMintPrice(uint256 id, uint256 mintPrice) external onlyOwner projectExists(id) {
        require(mintPrice > 0, "mintPrice invalid");
        Project storage project = _projects[id];
        project._mintPrice = mintPrice;
    }

    function mint(uint256 id, uint256 amount) external payable projectExists(id) {
        Project storage project = _projects[id];
        require(totalSupply(id) + amount <= project._maxSupply , "Not enough tokens to mint");
        require(msg.value >= project._mintPrice * amount, "Not enough ETH");
        _mint(msg.sender, id, amount, "");
        _pathToken.mint(msg.sender, msg.value);
        project._amountRaised += msg.value;
    }

    function _beforeTokenTransfer(
        address operator, 
        address from, 
        address to, 
        uint256[] memory ids, 
        uint256[] memory amounts, 
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    receive() external payable {}

    //transfer eth to beneficiary
    function withdrawEth(uint256 id) external projectExists(id) {
        Project storage project = _projects[id];
        require(msg.sender == project._beneficiary, "Only beneficiary can withdraw");
        require(project._amountWithdrawn < project._amountRaised, "No more ETH to withdraw");
        uint256 amount = project._amountRaised - project._amountWithdrawn;
        project._amountWithdrawn = project._amountRaised;
        payable(msg.sender).transfer(amount);
    }
}

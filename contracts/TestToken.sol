// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract TestToken is AccessControlUpgradeable, ERC20Upgradeable {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  modifier onlyMinter() {
    require(hasRole(MINTER_ROLE, _msgSender()), "TestToken: caller is not minter");
    _;
  }

  modifier onlyAdmin() {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "TestToken: caller is not admin");
    _;
  }

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string memory name, string memory symbol) public virtual initializer {
    __ERC20_init(name, symbol);
    __AccessControl_init();

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(MINTER_ROLE, _msgSender());
  }

  function decimals() public view virtual override returns (uint8) {
    return 18;
  }

  function mint(address to, uint256 amount) public virtual onlyMinter {
    _mint(to, amount);
  }
}

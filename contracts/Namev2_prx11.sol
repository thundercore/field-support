pragma solidity >=0.4.25;

contract Namev2_prx11 {
    address public owner;
    string public name;
    event NameChanged(string n);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function changeName(string memory n) onlyOwner public {
        name = n;
        emit NameChanged(n);
    }

    function changeOwner(address newOwner) onlyOwner public {
        owner = newOwner;
    }
}

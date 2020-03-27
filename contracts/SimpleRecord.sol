pragma solidity ^0.4.25;

contract SimpleRecord {
    event Record(
        address indexed _from,
        uint _value
    );

    function write() payable public {
        emit Record(msg.sender, msg.value);
    }
}

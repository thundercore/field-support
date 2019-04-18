const Namev2_prx11 = artifacts.require('Namev2_prx11');

contract('Namev2_prx11', accounts => {
    it('name accessor works', async () => {
        const instance = await Namev2_prx11.deployed();
        const name = await instance.name();
        expect(typeof(name)).equal('string');
    });
    it('changeName works', async () => {
        const instance = await Namev2_prx11.deployed();
        const myName = 'MY-NAME';
        await instance.changeName(myName);
        const name = await instance.name();
        expect(name).equal(myName);
    });
});
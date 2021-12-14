const { expect, expectRevert } = require("chai");
const { ethers } = require("hardhat");

describe("Whitelist Contract", function () {

  it("should be able to add a address to the whitelist", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const WhitelistContract = await ethers.getContractFactory("Whitelist");

    const whitelistContract = await WhitelistContract.deploy();

    const transaction = await whitelistContract.addUser(addr1.address);
    await transaction.wait()

    const verified = await whitelistContract.verifyUser(addr1.address)
  
    expect(verified).to.be.equal(true);
  });

  it("should be able to call an example function if you are whitelisted", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const WhitelistContract = await ethers.getContractFactory("Whitelist");

    const whitelistContract = await WhitelistContract.deploy();

    const transaction = await whitelistContract.addUser(owner.address);
    await transaction.wait()

    const txnResponse = await whitelistContract.exampleFunction();

    expect(txnResponse).to.be.equal(true)
  });

  it("should not be able to call an example function without be whitelisted", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const WhitelistContract = await ethers.getContractFactory("Whitelist");

    const whitelistContract = await WhitelistContract.deploy();

    await expect(whitelistContract.exampleFunction()).to.be.revertedWith("Whitelist: You need to be whitelisted")
  });
});
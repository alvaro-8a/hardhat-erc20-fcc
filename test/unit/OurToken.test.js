const { assert } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, INITIAL_SUPPLY } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("ourToken", function () {
          let ourToken, deployer, user
          beforeEach(async function () {
              const accounts = await getNamedAccounts()
              deployer = accounts.deployer
              user = accounts.user
              await deployments.fixture(["all"])
              ourToken = await ethers.getContract("OurToken", deployer)
          })

          describe("constructor", function () {
              it("Should have correct INITIAL_SUPPLY of tokens", async function () {
                  const totalSupply = await ourToken.totalSupply()
                  assert.equal(INITIAL_SUPPLY, totalSupply.toString())
              })
          })

          describe("transfer", function () {
              it("Transfer tokens correctly", async function () {
                  const sendTokens = ethers.utils.parseEther("10")
                  await ourToken.transfer(user, sendTokens)
                  const balanceOfUser = await ourToken.balanceOf(user)
                  assert.equal(sendTokens.toString(), balanceOfUser)
              })

              it("Approve and transfer from other addresses", async function () {
                  const spendTokens = await ethers.utils.parseEther("5")
                  await ourToken.approve(user, spendTokens)
                  const ourTokenUser = await ethers.getContract("OurToken", user)
                  await ourTokenUser.transferFrom(deployer, user, spendTokens)
                  const balanceOfUser = await ourTokenUser.balanceOf(user)
                  assert.equal(balanceOfUser, spendTokens.toString())
              })
          })
      })

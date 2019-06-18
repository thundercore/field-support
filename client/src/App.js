import React, { Component } from 'react'
import { Header, Divider, Form, Button, Segment } from 'semantic-ui-react'
import TruffleContract from 'truffle-contract'

import getWeb3 from './utils/getWeb3'
import TokenContract from './contracts/MyToken.json'

import './App.css'

class App extends Component {

  state = {
    loaded: false,
    triedInit: false,
    to: '',
    amount: '',
  }

  componentDidMount() {
    this.initWeb3()
    setTimeout(() => {
      this.setState({
        triedInit: true,
      })
    }, 1000)
  }

  initWeb3() {
    getWeb3.then(({ web3 }) => {
      console.log('web3: ', web3)
      this.setState({
        web3: web3,
      })
      this.initContract(web3)
    }).catch(err => {
      console.error("error finding web3: ", err)
    })
  }

  initContract(web3) {
    web3.eth.getAccounts((err, accounts) => {
      if (err) {
        console.error("error finding accounts: ", err)
        return
      }

      const token = TruffleContract(TokenContract)
      token.setProvider(this.state.web3.currentProvider)
      token.defaults({from: accounts[0]})

      token.deployed().then(contract => {
        this.setState({
          contract: contract,
          account: accounts[0],
        })

        this.initData()
      }).catch(err => {
        console.error("error finding contracts: ", err)
      })
    })
  }

  async initData() {
    this.setState({
      loaded: true,
      tokenName: await this.state.contract.name(),
      balance: await this.state.contract.balanceOf(this.state.account),
    })
  }

  handleChangeTo = (ev) => {
    this.setState({
      to: ev.target.value,
    })
  }

  handleChangeAmount = (ev) => {
    this.setState({
      amount: ev.target.value,
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.state.contract.transfer(this.state.to, this.state.amount).then(() => {
      alert('Transfer successful!')
      window.location.reload()
    }).catch(err => {
      console.error(err)
    })
  }

  render() {
    if (!this.state.loaded) {
      if (!this.state.triedInit) {
        return <p>Loading...</p>
      } else {
        return (
          <Segment>
            <h2>No connection to Thunder</h2>
            <p>Please make sure you are using a DApp browser such as MetaMask or Mist.</p>
          </Segment>
        )
      }
    }

    return (
      <div id="main">
        <Header as='h1'>{this.state.tokenName}</Header>
        <Divider />
        <div>
          <Segment>
            <p>Account: {this.state.account}</p>
            <p>Balance: {this.state.balance.toNumber()}</p>
          </Segment>
          <Segment>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>To:</label>
                <input value={this.state.to} onChange={this.handleChangeTo} />
              </Form.Field>
              <Form.Field>
                <label>Amount:</label>
                <input value={this.state.amount} onChange={this.handleChangeAmount} />
              </Form.Field>
              <Button type='submit'>Send</Button>
            </Form>
          </Segment>
        </div>
      </div>
    )
  }

}

export default App

import React , { Component } from 'react';
import './Counter.css';
import { SubscriptionClient } from 'subscriptions-transport-ws'

const host =
  typeof window !== 'undefined' ? window.location.host : 'localhost:3000'
const tls =
  typeof window !== 'undefined' ? window.location.protocol === 'https:' : false
const wsClient = new SubscriptionClient(
    `${tls ? 'wss' : 'ws'}://${host}/graphql`,
    {
      reconnect: true,
      lazy: true,
    },
  )
  console.log(wsClient)

export default class Counter extends Component {
    constructor () {
        super();

        this.state = {
            count: 0 
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                count: this.state.count + 1
            })
        }, 200);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return <div className="Counter">Counter: {this.state.count}</div>
    }
}
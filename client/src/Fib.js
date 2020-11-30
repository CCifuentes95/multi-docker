import React, { Component } from "react";
import axios from "axios";

const endpoints = {
    current: 'api/values/current',
    values: 'api/values'
}

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get(endpoints.current);
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get(endpoints.values);
        this.setState({ seenIndexes: seenIndexes.data });
    }

    renderSeenIndexes() {
        return this.state.seenIndexes
            .map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];
        for (const key in this.state.values) {
            entries.push(
                this.formatElement(key, this.state.values[key])
            );
        }

        return entries;
    }

    formatElement(key, value) {
        return <div key={key}>
            For index {key}, I calculated {value}
        </div>;
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post(endpoints.values, { index: this.state.index });
        this.setState({ index: '' });

        await this.fetchValues();
        await this.fetchIndexes();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input
                        value={this.state.index}
                        onChange={event => this.setState({ index: event.target.value })} />
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen: </h3>
                {this.renderSeenIndexes()}

                <h3>Calculated values: </h3>
                {this.renderValues()}
            </div>
        );
    }

}

export default Fib;

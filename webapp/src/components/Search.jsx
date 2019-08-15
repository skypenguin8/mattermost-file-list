import React, { Component } from "react";
import { Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, Button } from "react-bootstrap";

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: "",
            queryInverted: false,
            dirty: false
        };

        this.onQueryChange = this.onQueryChange.bind(this);
        this.onInvertChange = this.onInvertChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    onQueryChange(e) {
        this.setState({ query: e.target.value, dirty: true });
    }

    onInvertChange(e) {
        this.setState({ queryInverted: e.checked, dirty: true });
    }

    onSearch(e) {
        e.preventDefault();

        if(!this.isValid()) return;

        this.props.onSearch(this.state);
    }

    isValid() {
        return this.state.query && this.state.query.length >= 3;
    }

    render() {
        const isValid = this.isValid();

        return (
            <Form horizontal onSubmit={this.onSearch}>
                <FormGroup validationState={!isValid && this.state.dirty ? "error" : undefined}>
                    <Col componentClass={ControlLabel} sm={2}>
                        Name:
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" placeholder="Min 3 characters" onChange={this.onQueryChange} value={this.state.query} />
                        <Checkbox onChange={this.onInvertChange} checked={this.state.queryInverted}>Invert?</Checkbox>
                    </Col>
                    <Col sm={2}>
                        <Button bsStyle="primary" disabled={!isValid} onClick={this.onSearch}>Search</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

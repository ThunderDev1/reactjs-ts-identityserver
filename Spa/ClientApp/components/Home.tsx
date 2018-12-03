import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { Container, Header, Button, Form, TextArea, Segment } from 'semantic-ui-react';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {

    state = {
        result: null
    }

    callApi() {
        // quick and dirty test for calling the api
        axios.get("http://localhost:5200/api/values")
            .then((response: any) => {
                console.log(response);
                this.setState({ result: JSON.stringify(response.data, null, 2) });
            })
            .catch(error => {
                const { status, statusText } = error.response;
                this.setState({ result: `${status}: ${statusText}` });
            });
    }

    public render() {
        return (
            <Container text>
                <Header
                    as='h1'
                    content='reactjs-ts-identityserver'
                    inverted
                    style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em', }}
                />

                <Header
                    as='h2'
                    content='Try calling the API'
                    inverted
                    style={{ fontSize: '1.7em', fontWeight: 'normal', marginTop: '1.5em', }}
                />
                <Button primary size='huge' onClick={() => { this.callApi() }}>
                    Fetch
            </Button>

                {this.state.result && <Segment>
                    {this.state.result}
                </Segment>}

            </Container>
        );
    }
}

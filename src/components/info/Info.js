import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import PlayerProfile from "../../views/PlayerProfile";


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const {params} = this.props.match;
    fetch(`${getDomain()}/users/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(async user => {
        this.setState({ user });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
      <Container>
        <h2>Happy Coding! </h2>
        <p>Get users information from server:</p>
        {!this.state.user ? (
          <Spinner />
        ) : (
          <div align="centre">
            <table width="150%">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Birthday</th>
                <th>Creation date</th>
                <th>online status</th>
              </tr>
              <tr>
                <td>{this.state.user.id}</td>
                <td>{this.state.user.username}</td>
                <td>{this.state.user.birthday}</td>
                <td>{this.state.user.creationdate}</td>
                <td>{this.state.user.status}</td>
              </tr>

            </table>
            <p></p>
            <Button
                width="100%"
                disabled = {localStorage.getItem("id")!=this.state.user.id}
                onClick={() => {
                  this.props.history.push("/profile")
                }}
            >
              edit
            </Button>
            <p></p>
            <Button
                width="100%"
                onClick={() => {
                  this.props.history.push("/game")
                }}
            >
              Back
            </Button>
          </div>
        )}
      </Container>
    );
  }
}


export default withRouter(Info);

import React, { Component } from 'react';

import logo from '../../assets/logo.png';
import api from '../../services/api';
import CompareList from '../../components/CompareList';

import { Container, Form } from './styles';

export default class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: [],
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    const repo = this.state;
    try {
      const response = await api.get(`/repos/${repo.repositoryInput}`);

      this.setState({
        repositoryInput: '',
        repositories: [...repo.repositories, response.data],
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const repo = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repo.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">ok</button>
        </Form>

        <CompareList repositories={repo.repositories} />
      </Container>
    );
  }
}

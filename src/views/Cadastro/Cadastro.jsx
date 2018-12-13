import React, { Component } from "react";
import "./Cadastro.css";

import { Card, CardHeader, CardBody, CardFooter, Button, Row, Col } from "reactstrap";
import { PanelHeader, FormInputs, CardAuthor, CardSocials } from "../../components";
import api from "../../services/api";

export default class Cadastro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirm: ""
    };

    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  // ### PODE SER DESSE JEITO AQUI TAMBÉM -> NÃO NECESSITA DE BIND DA FUNÇÃO

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  // ### PODE SER DESSE JEITO AQUI TAMBÉM -> NÃO NECESSITA DE BIND DA FUNÇÃO
  
  // handleSubmit = event => {
  //   event.preventDefault();
  // }

  async handleSubmit(event) {
    event.preventDefault();      
    
    const { email, password } = this.state;
    console.log('medicamento = ' + email);
    console.log('quantidade = ' + password);

    try {
      console.log("Entrou para iniciar login!");

      await api
        .post("/users/login", {
          'email': this.state.email,
          'password': this.state.password,
        })
        .then(res => {
          console.log("Recebeu retorno");
          console.log(res);
          
          localStorage.setItem('token', res.data.token);        

          this.props.history.push("/dashboard");          
        })
        .catch(res => {
          console.log(res);
          this.setState({ error: JSON.stringify(res) + "" });
        });

    }
    catch (err) {
      console.log(err);
      this.setState({ error: 'Ocorreu um erro ao adicionar doação!' });
    }
  }

  render() {
    return (
      <div className="Login">

        <form onSubmit={this.handleSubmit}>                        
          <FormInputs
            ncols={["col-md-12"]}
            proprieties={[
              {
                label: "Email",
                inputProps: {
                  type: "email",
                  placeholder: "",                  
                  name: "email",
                  value: this.state.email,
                  onChange: this.handleChange
                }
              }
            ]}
          />

          <FormInputs
            ncols={["col-md-12"]}
            proprieties={[
              {
                label: "Senha",
                inputProps: {
                  type: "password",
                  placeholder: "",
                  name: "password",
                  value: this.state.password,
                  onChange: this.handleChange
                }
              }
            ]}
          />

          <FormInputs
            ncols={["col-md-12"]}
            proprieties={[
              {
                label: "Confirmar Senha",
                inputProps: {
                  type: "password",
                  placeholder: "",
                  name: "passwordConfirm",
                  value: this.state.passwordConfirm,
                  onChange: this.handleChange
                }
              }
            ]}
          />
          
          <Button color="success" className="float-right" type="submit" disabled={!this.validateForm()}>Criar Usuário</Button>

          {/* ### TAMBÉM PODE SER DESSA FORMA */}
          {/* <input className="btn btn-success float-right" type="submit" value="Entrar" disabled={!this.validateForm()}/>   */}

        </form>
      </div>
    );
  }
}
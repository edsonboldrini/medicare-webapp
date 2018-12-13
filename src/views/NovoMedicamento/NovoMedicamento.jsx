import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Row, Col } from "reactstrap";

import { PanelHeader, FormInputs, CardAuthor, CardSocials } from "../../components";
import api from "../../services/api";
import { withRouter } from "react-router-dom";


class NovoMedicamento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeMedicamento: ''      
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();      
    const { nomeMedicamento } = this.state;
    console.log('Medicamento = ' + nomeMedicamento);

    try {
      console.log("Entrou para adicionar medicamento!");

      await api
        .post("/medicamentos", {'nomeMedicamento': nomeMedicamento})
        .then(res => {
          console.log("Recebeu retorno");
          console.log(res);
          // if (JSON.stringify(this.state.nomeMedicamento) !== JSON.stringify(res.data)) {
          //   this.setState({ esperandoAjax: false });
          //   this.setState({ listaMedicamentos: res.data });
          //   console.log("alterou estado");
          //   console.log(res.data);
          // }
          //this.props.history.push("/medicamentos");
          alert("Medicamento " + nomeMedicamento + " adicionado com sucesso!");
        })
        .catch(res => {
          console.log(res);
          this.setState({ error: JSON.stringify(res) + "" });
        });

    }
    catch (err) {
      console.log(err);
      this.setState({ error: '' });
    }
  }

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12} xs={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Novo Medicamento</h5>
                </CardHeader>
                <CardBody>
                  <form onSubmit={this.handleSubmit}>                    

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Nome do Medicamento",
                          inputProps: {
                            type: "text",
                            placeholder: "",
                            name: "nomeMedicamento",
                            value: this.state.nomeMedicamento,
                            onChange: this.handleChange
                          }
                        }
                      ]}
                    />

                    <input className="btn btn-info float-right" type="submit" value="Adicionar" />                                            
                    <Button color="danger" className="float-right" href="/medicamentos">Cancelar</Button>                                            
                    
                  </form>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </div>
      </div>
    );
  }
}

export default NovoMedicamento;

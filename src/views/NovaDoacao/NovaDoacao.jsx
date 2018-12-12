import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Row, Col } from "reactstrap";

import { PanelHeader, FormInputs, CardAuthor, CardSocials } from "../../components";
import api from "../../services/api";

class NovaDoacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeMedicamento: '',
      quantidade: '',
      status: '',
      dataCadatro: new Date(),
      dataValidade: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();      
        
    this.setState({status: 'PENDENTE'});
    
    const { nomeMedicamento, quantidade, status, dataCadatro, dataValidade } = this.state;
    console.log('medicamento = ' + nomeMedicamento);
    console.log('quantidade = ' + quantidade);
    console.log('status = ' + status);
    console.log('dataCadastro = ' + dataCadatro);
    console.log('dataValidade = ' + dataValidade);

    try {
      console.log("Entrou para adicionar doação!");

      await api
        .post("/doacoes", {'nomeMedicamento': nomeMedicamento, 'quantidade': quantidade, 'status': status, 'dataDoacao': dataCadatro, 'dataValidade': dataValidade})
        .then(res => {
          console.log("Recebeu retorno");
          console.log(res);
          // if (JSON.stringify(this.state.nomeMedicamento) !== JSON.stringify(res.data)) {
          //   this.setState({ esperandoAjax: false });
          //   this.setState({ listaMedicamentos: res.data });
          //   console.log("alterou estado");
          //   console.log(res.data);
          // }
          // this.props.history.push("/doacoes");
          alert("Doação " + nomeMedicamento + " adicionada com sucesso!");
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
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12} xs={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Nova Doação</h5>
                </CardHeader>
                <CardBody>
                  <form onSubmit={this.handleSubmit}>

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Nome do Remédio",
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

                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "Quantidade",
                          inputProps: {
                            type: "number",
                            placeholder: "",
                            name: "quantidade",
                            value: this.state.quantidade,
                            onChange: this.handleChange
                          }
                        },
                        {
                          label: "Data da validade",
                          inputProps: {
                            type: "date",
                            placeholder: "",
                            name: "dataValidade",
                            value: this.state.dataValidade,
                            onChange: this.handleChange
                          }
                        }                        
                      ]}
                    />

                    <input className="btn btn-info float-right" type="submit" value="Adicionar" />  
                    <Button color="danger" className="float-right" href="/doacoes">Cancelar</Button>
                    {/* <Button color="info" className="float-right" href="/doacoes">Salvar</Button> */}

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

export default NovaDoacao;

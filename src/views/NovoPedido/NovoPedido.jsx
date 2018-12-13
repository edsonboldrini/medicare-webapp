import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Row, Col } from "reactstrap";

import { PanelHeader, FormInputs, CardAuthor, CardSocials } from "../../components";
import api from "../../services/api";

class NovoPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medicamentoComercial: '',
      quantidade: '',
      status: '',
      dataCadatro: new Date(),
      nomeMedico: '',
      crmMedico: ''
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
    
    const { medicamentoComercial, quantidade, status, dataCadatro, nomeMedico, crmMedico } = this.state;
    console.log('medicamentoComercial = ' + medicamentoComercial);
    console.log('quantidade = ' + quantidade);
    console.log('status = ' + status);
    console.log('dataCadastro = ' + dataCadatro);
    console.log('nomeMedico = ' + nomeMedico);
    console.log('crmMedico = ' + crmMedico);

    try {
      console.log("Entrou para adicionar pedido!");

      await api
        .post("/pedidos", {'medicamentoComercial': medicamentoComercial, 'quantidade': quantidade, 'status': status, 'dataCadastro': dataCadatro, 'nomeMedico': nomeMedico, 'crmMedico': crmMedico })
        .then(res => {
          console.log("Recebeu retorno");
          console.log(res);
          // if (JSON.stringify(this.state.nomeMedicamento) !== JSON.stringify(res.data)) {
          //   this.setState({ esperandoAjax: false });
          //   this.setState({ listaMedicamentos: res.data });
          //   console.log("alterou estado");
          //   console.log(res.data);
          // }
          //this.props.history.push("/pedidos");
          alert("Pedido " + medicamentoComercial + " adicionado com sucesso!");
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
                  <h5 className="title">Novo Pedido</h5>
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
                            name: "medicamentoComercial",
                            value: this.state.medicamentoComercial,
                            onChange: this.handleChange
                          }
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
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
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "Nome do Médico",
                          inputProps: {
                            type: "text",
                            placeholder: "",
                            name: "nomeMedico",
                            value: this.state.nomeMedico,
                            onChange: this.handleChange
                          }
                        },
                        {
                          label: "CRM do Médico",
                          inputProps: {
                            type: "text",
                            placeholder: "",
                            name: "crmMedico",
                            value: this.state.crmMedico,
                            onChange: this.handleChange
                          }
                        }
                      ]}
                    />

                    <input className="btn btn-info float-right" type="submit" value="Adicionar" />  
                    <Button color="danger" className="float-right" href="/pedidos">Cancelar</Button>
                    {/* <Button color="info" className="float-right" href="/pedidos">Salvar</Button> */}                                      

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

export default NovoPedido;

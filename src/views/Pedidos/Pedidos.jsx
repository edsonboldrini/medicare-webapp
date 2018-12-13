import React from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";

import { PanelHeader } from "../../components";

import api from "../../services/api";
import axios from "axios";

class TelaPedidos extends React.Component {
  state = {
    error: "",
    listaPedidos: [],
    esperandoAjax: true
  };

  async atualizarLista() {
    try {
      console.log("entrou para atualizar lista de pedidos");

      await api
        .get("/pedidos")
        .then(res => {
          console.log("recebeu retorno");        
          if(JSON.stringify(this.state.listaPedidos) !== JSON.stringify(res.data)){
            this.setState({ esperandoAjax: false });
            this.setState({ listaPedidos: res.data });
            console.log("alterou estado");
            console.log(res.data);
          }        
        })
        .catch(res => {
          console.log(res);
          this.setState({ error: JSON.stringify(res) + "" });
        });

    } 
    catch(err){
      console.log(err);
      this.setState({ error: 'Ocorreu um erro ao atualizar a lista de pedidos!' });
    }
  }

  async aprovaPedido(item){
    try {
      console.log("Entrou para aprovar pedido!");
      console.log(item);

      axios.defaults.headers.common['Authorization'] = await localStorage.getItem('token');

      await api
        .post("/pedidos/" + item._id + "/atualizarSituacao", {'status': "ACEITO"})
        .then(res => {
          console.log("Recebeu retorno");
          console.log(res);          
          alert("Pedido aprovado com sucesso!");
          this.atualizarLista();
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

    this.atualizarLista();
  }

  async cancelaPedido(item){
    try {
      console.log("Entrou para cancelar pedido!");
      console.log(item);

      axios.defaults.headers.common['Authorization'] = await localStorage.getItem('token');

      await api
        .put("/pedidos/" + item._id + "/atualizarSituacao", {'status': "CANCELADO"})
        .then(res => {
          console.log("Recebeu retorno");
          console.log(res);          
          alert("Pedido aprovado com sucesso!");
          this.atualizarLista();
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

    this.atualizarLista();
  }

  async removePedido(item){   
    try {
      console.log("Entrou para excluir pedido!");
      console.log(item);

      axios.defaults.headers.common['Authorization'] = await localStorage.getItem('token');

      await api
        .delete("/pedidos/" + item._id, {params: {'id': item._id}})
        .then(res => {
          console.log("Recebeu retorno");
          console.log(res);          
          alert("Pedido excluido com sucesso!");
          this.atualizarLista();
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

    this.atualizarLista();
  }

  componentDidMount() {
    this.atualizarLista();
  }

  montaMensagemNenhumDado(){
    return (
      <div className="typography-line">
          <h4>
            Ainda não há nenhum pedido cadastrado!
          </h4>
        </div>
    )
  }

  formataData = (dateString) => {
    const data = new Date(dateString);
    return data.toLocaleDateString("pt-Br");
  }

  novoPedidoClicado = () => {
    this.props.navigation.navigate('NovoPedido')
  }
 
  montaTabela(){
    return (
      <Table responsive>
        <thead className="text-primary">
          <tr>
            <th className="text-left">Remédio</th>
            <th className="text-center">Quantidade</th>
            <th className="text-center">Status</th>
            <th className="text-center">Data</th> 
            <th className="text-right" style={{ paddingRight: 25 }}>Ações</th> 
          </tr>
        </thead>
        <tbody>
          {this.state.listaPedidos.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{item.medicamentoComercial != null ? item.medicamentoComercial.nome : ""}</td>                
                <td className="text-center">{item.quantidade}</td>
                <td className="text-center">{item.status}</td>
                <td className="text-center">{this.formataData(item.dataCadastro) }</td>
                <td className="text-right">            
                  <button className="btn-icon btn btn-success btn-sm m-r-3" onClick={() => {this.aprovaPedido(item)}}>
                    <i className="now-ui-icons ui-1_check"></i>
                  </button>
                  <button className="btn-icon btn btn-warning btn-sm m-r-3" onClick={() => {this.cancelaPedido(item)}}>
                    <i className="now-ui-icons ui-1_simple-delete"></i>
                  </button>
                  <button className="btn-icon btn btn-danger btn-sm" onClick={() => {this.removePedido(item)}}>
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    )
  }

  montaExibicao(){
    if (this.state.esperandoAjax) {
      return (
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th className="text-left">Carregando...</th>
            </tr>
          </thead>
        </Table>
      );
    }
    else if (this.state.listaPedidos.length > 0){
      return this.montaTabela();
    }
    else{
      return this.montaMensagemNenhumDado();
    }
  }

  render() {

    if (!localStorage.getItem('token')) {
      return <Redirect to={'/login'} />;
    }

    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>

            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle className="float-left">Lista de Pedidos</CardTitle>
                  {/* <Button color="info" className="float-right" href="/novo-pedido">Adicionar</Button> */}
                </CardHeader>
                <CardBody>
                  { this.montaExibicao() }
                </CardBody>
              </Card>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}

export default TelaPedidos;

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
import axios from 'axios';

class TelaDoacoes extends React.Component {
  state = {
    error: "",
    listaDoacoes: [],
    esperandoAjax: true
  };

  async atualizarLista() {
    try {
      console.log("entrou para atualizar lista de pedidos");

      await api
        .get("/doacoes")
        .then(res => {
          console.log("recebeu retorno");
          console.log(res);        
          if(JSON.stringify(this.state.listaDoacoes) !== JSON.stringify(res.data)){
            this.setState({ esperandoAjax: false });
            this.setState({ listaDoacoes: res.data });
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

  async aprovaDoacao(item){
    try {
      console.log("Entrou para aprovar doacao!");
      console.log(item);

      axios.defaults.headers.common['Authorization'] = await localStorage.getItem('token');

      await api
        .put("/doacoes/" + item._id, {'status': "ACEITO"})
        .then(res => {
          console.log("Recebeu retorno");
          console.log(res);          
          alert("Doação aprovada com sucesso!");
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

  async cancelaDoacao(item){
    try {
      console.log("Entrou para cancelar doacao!");
      console.log(item);

      axios.defaults.headers.common['Authorization'] = await localStorage.getItem('token');

      await api
        .put("/doacoes/" + item._id, {'status': "CANCELADO"})
        .then(res => {
          console.log("Recebeu retorno");
          console.log(res);          
          alert("Doação cancelada com sucesso!");
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

  async removeDoacao(item){   
    try {
      console.log("Entrou para excluir doação!");
      console.log(item);

      axios.defaults.headers.common['Authorization'] = await localStorage.getItem('token');

      await api
        .delete("/doacoes/" + item._id, {params: {'id': item._id}})
        .then(res => {
          console.log("Recebeu retorno");
          console.log(res);          
          alert("Doação excluida com sucesso!");
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

  formataData = (dateString) => {
    const data = new Date(dateString);
    return data.toLocaleDateString("pt-Br");
  }

  montaTabela(){
    return (
      <Table responsive>
        <thead className="text-primary">
          <tr>
            <th className="text-left">Remédio</th>            
            <th className="text-center">Quantidade</th>
            <th className="text-center">Status</th> 
            <th className="text-center">Cadastro</th> 
            <th className="text-center">Validade</th> 
            <th className="text-right" style={{ paddingRight: 25 }}>Ações</th> 
          </tr>
        </thead>
        <tbody>
          {this.state.listaDoacoes.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{item.medicamentoComercial != null && item.medicamentoComercial.medicamento != null ? item.medicamentoComercial.medicamento.nomeMedicamento : ""}</td>                
                <td className="text-center">{item.quantidade}</td>
                <td className="text-center">{item.status}</td>
                <td className="text-center">{this.formataData(item.dataCadastro)}</td>
                <td className="text-center">{this.formataData(item.dataValidade)}</td>
                <td className="text-right">
                  <button className="btn-icon btn btn-success btn-sm m-r-3" onClick={() => {this.aprovaDoacao(item)}}>
                    <i className="now-ui-icons ui-1_check"></i>
                  </button>
                  <button className="btn-icon btn btn-warning btn-sm m-r-3" onClick={() => {this.cancelaDoacao(item)}}>
                    <i className="now-ui-icons ui-1_simple-delete"></i>
                  </button>
                  <button className="btn-icon btn btn-danger btn-sm" onClick={() => {this.removeDoacao(item)}}>
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

  montaMensagemNenhumDado(){
    return (
      <div className="typography-line">
          <h4>
            Ainda não há nenhuma doação cadastrada!
          </h4>
        </div>
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
    else if (this.state.listaDoacoes.length > 0){
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
                  <CardTitle className="float-left">Lista de Doações</CardTitle>
                  {/* <Button color="info" className="float-right" href="/nova-doacao">Adicionar</Button> */}
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

export default TelaDoacoes;

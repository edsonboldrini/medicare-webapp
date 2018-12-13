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

class Medicamentos extends React.Component {
  state = {
    error: "",
    listaMedicamentos: [],
    esperandoAjax: true
  };

  async atualizarLista() {
    try {
      console.log("entrou para atualizar lista de pedidos");

      await api
        .get("/medicamentos")
        .then(res => {
          console.log("recebeu retorno");
          console.log(res);
          if (JSON.stringify(this.state.listaMedicamentos) !== JSON.stringify(res.data)) {
            this.setState({ esperandoAjax: false });
            this.setState({ listaMedicamentos: res.data });
            console.log("alterou estado");
            console.log(res.data);
          }
        })
        .catch(res => {
          console.log(res);
          this.setState({ error: JSON.stringify(res) + "" });
        });

    }
    catch (err) {
      console.log(err);
      this.setState({ error: 'Ocorreu um erro ao atualizar a lista de pedidos!' });
    }
  }

  async removeMedicamento(item){   
    try {
      console.log("Entrou para excluir medicamento!");
      console.log(item);

      axios.defaults.headers.common['Authorization'] = await localStorage.getItem('token');

      await api
        .delete("/medicamentos/" + item._id, {params: {'id': item._id}})
        .then(res => {
          console.log("Recebeu retorno");
          console.log(res);          
          alert("Medicamento excluido com sucesso!");
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

  montaTabela() {
    return (
      <Table responsive>
        <thead className="text-primary">
          <tr>
            <th className="text-left">Remédio</th>
            {/* <th className="text-center">Tamanho</th>
            <th className="text-center">Quantidade</th>
            <th className="text-center">Status</th>
            <th className="text-center">Data</th> */}
            <th className="text-right" style={{ paddingRight: 25 }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.state.listaMedicamentos.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{item.nomeMedicamento}</td>
                {/* <td className="text-center">{item.tamanho + " mg"}</td>
                <td className="text-center">{item.quantidade}</td>
                <td className="text-center">{item.status}</td>
                <td className="text-center">{this.formataData(item.dataCadastro)}</td> */}
                <td className="text-right">
                  {/* <button className="btn-icon btn btn-info btn-sm m-r-3">
                    <i className="now-ui-icons users_single-02"></i>
                  </button>
                  <button className="btn-icon btn btn-success btn-sm m-r-3">
                    <i className="now-ui-icons ui-2_settings-90"></i>
                  </button> */}
                  <button className="btn-icon btn btn-danger btn-sm" onClick={() => {this.removeMedicamento(item)}} key={item}>
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

  montaMensagemNenhumDado() {
    return (
      <div className="typography-line">
        <h4>
          Ainda não há nenhuma doação cadastrada!
          </h4>
      </div>
    )
  }

  montaExibicao() {
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
    else if (this.state.listaMedicamentos.length > 0) {
      return this.montaTabela();
    }
    else {
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
                  <CardTitle className="float-left">Lista de Medicamentos</CardTitle>
                  <Button color="info" className="float-right" href="/novo-medicamento">Adicionar</Button>
                </CardHeader>
                <CardBody>
                  {this.montaExibicao()}
                </CardBody>
              </Card>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}

export default Medicamentos;

import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Header } from './styles';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';

export interface Data {
  PRODUTO: string;
  ANO: string;
  MES: string;
  QTD: number;
}

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Col className="justify-content-center align-items-center">
        <Row className="justify-content-center">
          <Header>
            <div>
              <img src={logoImg} alt="AGF" />
              <h2>Bi</h2>
            </div>
          </Header>
        </Row>
        <Row>
          <Col>
            <Link to="/sales-politrizes">
              <Button style={{ fontSize: 20 }}>
                Vendas - Politrizes e acessorios
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/sales-compressors">
              <Button style={{ fontSize: 20 }}>Vendas - Compressores</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/sales-romp">
              <Button style={{ fontSize: 20 }}>Vendas - Rompedores</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/sales-mfs">
              <Button style={{ fontSize: 20 }}>Vendas - Máquinas à Fio</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/sales-ger">
              <Button style={{ fontSize: 20 }}>Vendas - Geradores</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/sales-outros">
              <Button style={{ fontSize: 20 }}>Vendas - Outros</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/op-costs">
              <Button style={{ fontSize: 20 }}>Custo de Fabricação</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/margin">
              <Button style={{ fontSize: 20 }}>Margem dos produtos</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/productivity">
              <Button style={{ fontSize: 20 }}>Produtividade</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/breakers">
              <Button style={{ fontSize: 20 }}>Ordens Rompedores</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/plates">
              <Button style={{ fontSize: 20 }}>PCs Chapas</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/revenues">
              <Button style={{ fontSize: 20 }}>Faturamento</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/stock">
              <Button style={{ fontSize: 20 }}>Estoque</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/imports">
              <Button style={{ fontSize: 20 }}>Importações</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/acumulatedbystateandgroup">
              <Button style={{ fontSize: 20 }}>
                Acumulado por Estado e Grupo
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};

export default Dashboard;

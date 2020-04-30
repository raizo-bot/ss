import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import LoginButton from "Components/LoginButton";
import Layout from "Components/Layout";
import "./style.scss";

type LoginProps = {
  fromRestricted: boolean;
};

const Login: React.FC<LoginProps> = ({ fromRestricted }) => (
  <Layout title="Login" noHeader={fromRestricted}>
    <Container className="login py-5">
      <Row>
        <Col md={6}>
          <Card className="border-card">
            <div className="header mb-4">
              <h1>Login</h1>
              {fromRestricted ? (
                <h2>Authentication required to view this page</h2>
              ) : null}
            </div>
            <LoginButton showLabel={false} />
          </Card>
        </Col>
      </Row>
    </Container>
  </Layout>
);

export default Login;

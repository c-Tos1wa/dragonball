import { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Api } from '../../api/api'
import '../../styles/readSingle.scss'

export class ReadSingle extends Component {
  constructor(props){
    super(props);
    this.id = this.props.match.params.id;

    this.state = {
      isLoading: true,
      item: {}
    };
  }

  async componentDidMount () {
    const request = await Api.buildApiGetRequest(
      Api.readSingleUrl(this.id)
    );

    const item = await request.json();

    this.setState({
      isLoading: false,
      item,
    });
  }

  render(){
    const { item } = this.state;
    return(   
    <>
      <Container className="actions">
       <Link className="btn btn-info" to={'/update/' + item._id}>Editar</Link>
       <Link className="btn btn-danger" to={'/delete/' + item._id}>Excluir</Link>
      </Container>
    <hr />
      <Container className="info">
       <Row>
         <Col>
           <h1 className="info-title">{item.name}</h1>
         </Col>
       </Row>

      <Row>
        <Col>
          <img className="info-img" src={item.imageUrl} alt={item.name} />
        </Col>
      </Row>
    </Container>
    </>
    );
  }
}
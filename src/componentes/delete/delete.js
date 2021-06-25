import {Component} from 'react'
import { Card, Button } from 'react-bootstrap'
import { Api } from '../../api/api'
import '../../styles/delete.scss'

export class Delete extends Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      isLoading: false
    };
  }

  clickHandler = async event => {
    event.preventDefault();
    this.setState ({
      isLoading: true
    })

    await Api.buildApiDeleteRequest(Api.deleteUrl(this.id)
    ).catch(e=> { console.error('Erro ao tentar deletar ', e)
    })

  this.setState({
    isLoading: false
  })

  this.gotoHome()
}

gotoHome = () => {
  this.props.history.push(`/`);
}

goToView = () => {
  this.props.history.push(`/view/${this.id}`)
}


render() {
  return(
    <Card>
      <Card.Title>Excluir item</Card.Title>
        <Card.Body>
          <Card.Text>
            Tem certez que deseja excluir o item?
          </Card.Text>

          <Button className='btn' variant="danger" onClick={this.clickHandler}>Excluir</Button>
          <Button className='btn' variant="primary" onClick={this.goToView}>Cancelar</Button>

        </Card.Body>

    </Card>
  )
  }
}
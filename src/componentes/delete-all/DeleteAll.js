import { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Api } from '../../api/api'
import '../../styles/delete.scss'

export class DeleteAll extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false
        }
    }
clickHandler = async event => {
    event.preventDefault();

    this.setState({
        isLoading: true
    })

    await Api.buildApiDeleteRequest(Api.deleteAllUrl())
        .catch(e => 
            {console.error ('Erro ao tentar deletar o banco', e)
        })

    this.setState({
        isLoading: false
    })

    this.goToHome();
}

goToHome = () => {
    this.props.history.push('/')
}


    render(){
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Excluir Tudo</Card.Title>
                    
                    <Card.Text>
                        Tem certeza que deseja excluir todos os itens da aplicação?
                        Essa ação não pode ser revertida.
                    </Card.Text>

                    <Button className='btn' variant="danger" onClick={this.clickHandler}>Excluir</Button>
                    <Button className='btn' variant='primary' onClick={this.goToHome}>Cancelar</Button>
                </Card.Body>
            </Card>
        )
    }
}
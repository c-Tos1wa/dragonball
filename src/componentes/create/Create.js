import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../../styles/create.scss'
import { Api } from '../../api/api'

export class Create extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false  
        }
    }

    //é assíncrona pq espera os dados da API chegar
    submitHandler = async event => {
        //depois de mandar dados pro servidor, previnir q volte ao padrão
        event.preventDefault(); 

        const { name, imageUrl } = event.target;
        
        //objeto em que se pega os dados passados
        const item = {
            name: name.value,
            imageUrl: imageUrl.value
        }

        this.setState({
            isLoading: true
        })

        //esperar carregar os dados (a rota e o objeto) enviados
        const request = await Api.buildApiPostRequest(
            Api.createUrl(), 
            item
            ).catch(e => {
                console.error('Erro ao tentar adicionar o item ao banco: ', e);
            })
        
        //reinicializar o estado
        this.setState({
            isLoading: false
        })
        const result = await request.json();

        const id = result._id

        this.props.history.push(`/view/${id}`);  
    }

    render(){
        return (
            <>
            <h2>Adicionando personagens</h2>

            <Form onSubmit={this.submitHandler}>
                <Form.Group controlId='name'> 
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder='Digite o nome' />
                    <Form.Text className="text-muted"> Este nome será utilizado quando visualizar a lista</Form.Text>
                </Form.Group>

                <Form.Group controlId="imageUrl">
                    <Form.Label>URL da imagem</Form.Label>
                    <Form.Control type="text" placeholder="Insira o link da imagem" />
                    <Form.Text className="text-muted">A imagem em questão será exibida na lista de itens.
                    Certifique-se de que essa URL é uma URL válida</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">Enviar</Button>
            </Form>
            </>
        )
    }
}
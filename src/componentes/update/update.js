import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
//import '../../styles/update.scss'
import { Api } from '../../api/api'

export class Update extends Component {
    constructor(props){
        super(props);
        this.id = this.props.match.params.id;

        this.state = {
            isLoading: true,
            item: {}  
      }
    }

    async componentDidMount(){
      const request = await Api.buildApiGetRequest(
        Api.readSingleUrl(this.id)
      );

      const item = await request.json();

      this.setState({
        isLoading: false,
        item //este é o item que recebe o json da request
      });
    }

    submitHandler = async event => {
      event.preventDefault();

      const { name, imageUrl } = event.target;
      const item = {
        name: name.value,
        imageUrl: imageUrl.value
      }
      this.setState({
        isLoading: true
      })
      const request = await Api.buildApiPutRequest(
        Api.updateUrl(this.id), 
          item).catch( e => { 
          console.error('Erro ao atualizar o personagem ', e)
        });

        this.setState({
          isLoading: false
        })

        await request.json()
        this.props.history.push(`/view/${this.id}`)
    }
      
    render(){
      const { item } = this.state;
        return (
            <>
            <Form onSubmit={this.submitHandler}>
                <Form.Group controlId='name'> 
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder='Digite o nome' defaultValue={item.name}/>
                    <Form.Text className="text-muted"> Este nome será utilizado quando visualizar a lista</Form.Text>
                </Form.Group>

                <Form.Group controlId="imageUrl">
                    <Form.Label>URL da imagem</Form.Label>
                    <Form.Control type="text" placeholder="Insira o link da imagem" defaultValue={item.imageUrl} />
                    <Form.Text className="text-muted">A imagem em questão será exibida na lista de itens.
                    Certifique-se de que essa URL é uma URL válida</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">Alterar</Button>
            </Form>
            </>
        )
    }
}
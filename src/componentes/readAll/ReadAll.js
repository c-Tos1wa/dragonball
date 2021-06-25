import Loading from '../../img/spinner.svg'
import { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import { ItemCard } from './itemCard'
import { Api } from '../../api/api'
import '../../styles/readAll.scss'

export class ReadAll extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            items: []
        }
    }

    async componentDidMount() {
        const request = await Api.buildApiGetRequest(Api.readAllUrl());
        const items = await request.json();
        const itemsWithImageUrl = items.filter(item => Boolean(item.imageUrl))

        this.setState({
            isLoading: false,
            items: itemsWithImageUrl,
            filteredItems: itemsWithImageUrl
        })
    }

    //filtrar items procurados em busca passados pelo argumento e
    filterItems = e => { 
        const searchValue = e.target.value?.toLowerCase();
        const filteredItems = this.state.items.filter(item => 
            item.name?.toLowerCase().includes(searchValue),
        );

        this.setState({
            filteredItems,
        });
    };
    //filteredItems é da classe Component
    render(){
        const { isLoading, filteredItems } = this.state

        if(isLoading) {
            return (
                <Container>
                    <Row>
                        <img className="loading" src={Loading} alt=""/>
                    </Row>
                </Container>
            );
        } else {
            if(filteredItems == false) {
                return(
                    <Container>
                        <Row>
                            <p className="noData">Não há personagens cadastrados</p>
                        </Row>
                    </Container>
                )
            } else {
                return(
                    <Container>
                        <Row>
                            {filteredItems.map(item => (
                                <ItemCard item={item} key={item._id} />
                            ))}
                        </Row>
                    </Container>
                )
            }
        }
    }
}
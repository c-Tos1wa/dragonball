import {Component} from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

export class About extends Component {
    render(){
        return (
            <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Cristina Toshie Iwassaki</Card.Title>
              <Card.Text>
                Olá!
                Aprendendo Html, Css, Javascript, React, Bootstrap. 
            </Card.Text>
            <Link className="btn btn-info" to={{pathname: "https://github.com/c-Tos1wa"}} target="_blank"> Link pro Github</Link>
            </Card.Body>
          </Card> 
        )
    }
}
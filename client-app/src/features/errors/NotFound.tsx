import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound(){
    return(
        <Segment placeholder basic>
            <Header icon>
                <Icon name='search'/>
                <h1>404</h1>
                <h2>This page doesn't exist</h2>
            </Header>
            
            <Segment.Inline>
                <Button as={Link} to='/notes' content="return to notes"/>
            </Segment.Inline>
        </Segment>
    )
}
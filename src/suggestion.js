import React from 'react';
import Card from 'react-bootstrap/Card';

class Suggestion extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {"desc":null,"img_src":null,"loaded":false, "title":null, width: window.innerWidth};
    }
    async loaddata(name)
    {
        const base  = "https://kitsu.io/api/edge"
        const search = "/anime?filter[text]=" + name;
        const promise = await fetch(base+search);
        const result = await promise.json()
        const anime = result.data[0].attributes;
        var img_src;
        if (window.innerHeight/window.innerWidth < 1)
        {
            img_src  = anime.coverImage.large;
        }
        else
        {
            img_src = anime.posterImage.small;
        }
        
        const desc = anime.synopsis;
        const title = anime.titles.en;
        const jp_title = anime.titles.en_jp + ' | ' + anime.titles.ja_jp
        this.setState({"desc":desc,"img_src":img_src,"loaded":true,"title":title, "jp_title":jp_title});
                
    }

    render()
    {
        this.loaddata(this.props.name)
        if (this.state.loaded == true)
        {
        return (
        <div>
        <Card style = {{width:'25 rem',margin: '20px'}}>
        <Card.Img variant="top" src={this.state.img_src} />
        <Card.Body>
        <Card.Title>{this.state.title}</Card.Title>
        <hr />
        <Card.Subtitle className="mb-2 text-muted">{this.state.jp_title}</Card.Subtitle>
            <Card.Text>
                {this.state.desc}
            </Card.Text>
        </Card.Body>
        </Card>
        </div>
        );
        }
        else
        {
            return <h1>Loading...</h1>
        }
    }
}

export default Suggestion;
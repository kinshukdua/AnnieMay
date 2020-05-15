import React from 'react';
import './suggestion.css'
class Suggestion extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {"desc":null,"img_src":null,"loaded":false, "title":null, width: window.innerWidth};
        this.loaddata(this.props.name);
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
            if (anime.coverImage == null)
            {
                img_src = anime.posterImage.original;
            }
            else
            {
                img_src  = anime.coverImage.original;
            }
         
        }
        else
        {
            img_src = anime.posterImage.small;
        }
        
        const desc = anime.synopsis;
        const title = anime.titles.en;
        const jp_title = anime.titles.en_jp + ' | ' + anime.titles.ja_jp
        this.setState({"desc":desc,"img_src":img_src,"loaded":true,"title":title, "jp_title":jp_title});
        this.props.new_img(this.state.img_src);
        
                
    }

    render()
    {   
        if (this.state.loaded === true)
        {
        return (
        <div className='result-container'>
        <h1>{this.state.title}</h1>
        <hr />
        <h2 id="subname">{this.state.jp_title}</h2>
            <p style={{textOverflow:'ellipsis'}}>
                {this.state.desc}
            </p>
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
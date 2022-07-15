import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";

const Home = () => {
    const [input, setInput] = useState('');

    const onInputChange = (ev) => {
        setInput(ev.target.value);

    }

    const onKeyDown = (ev) => {
        if (ev.keyCode === 13)
        {
            onSearch()
        }
        console.log(ev.keyCode);
    }

    const onSearch = () => {
    

        // browser api fetches https://api.tvmaze.com/search/shows?q=girls
        fetch (`https://api.tvmaze.com/search/shows?q=${input}`).then(r => r.json()).then(result =>{
            console.log(result);
        }) //interpolated string to pass input to the web api
    };

    return (
        <MainPageLayout> 
            <input type = "text" onChange = {onInputChange} onKeyDown={onKeyDown} value={input}/>
            <button type = "button" onClick = {onSearch}> Search </button>

      
        </MainPageLayout>
    );
};

export default Home;
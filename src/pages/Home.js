import React, { useState, useCallback } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from "./Home.styled";

const renderResults = (results) => {
    if(results && results.length === 0)
    {
        return <div>
            no results
        </div>
    }
    if(results && results.length > 0)
    {
        return results[0].show ? ( <ShowGrid data = {results}/>) : ( <ActorGrid data = {results} /> );   
    }
    return null;
}


const Home = () => {
    const [input, setInput] = useLastQuery();
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isShowsSearch = searchOption === 'shows'

    const onSearch = () => {
    
        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
            console.log(result);
        })
    };

    

    const onInputChange = useCallback (
        ev => {
            setInput(ev.target.value);
    
        }, [setInput]
    )



    const onKeyDown = (ev) => {
        if (ev.keyCode === 13)
        {
            onSearch()
        }
        
    }

    const onRadiochange = useCallback(
        ev => {
            setSearchOption(ev.target.value);
           
        }, []) 

    


    //useWhyDidYouUpdate('home', { onInputChange, onKeyDown })

    return (
        <MainPageLayout> 
            <SearchInput type = "text" 
            placeholder="Search for Something..."
                onChange = {onInputChange} 
                nKeyDown={onKeyDown} 
                value={input}/>

            <RadioInputsWrapper>
            <div>

                <CustomRadio
                label = "Shows" 
                    type = "radio" 
                    value = "shows"  
                    checked = {isShowsSearch} 
                    onChange={onRadiochange}  
                />
                </div>
                <div>
                <CustomRadio
                label = "Actors" 
                    type = "radio" 
                            id = "actors-search" 
                            value = "people" 
                            checked = {!isShowsSearch} 
                            onChange={onRadiochange}   
                />
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
            <button type = "button" 
                onClick = { onSearch }> Search 
            </button>
            </SearchButtonWrapper>

            {renderResults(results)}
      
        </MainPageLayout>
    );
};

export default Home;
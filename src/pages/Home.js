import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from "./Home.styled";



const Home = () => {
    const [input, setInput] = useLastQuery();
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isShowsSearch = searchOption === 'shows'

    const onInputChange = (ev) => {
        setInput(ev.target.value);

    }

    const onSearch = () => {
    
        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
            console.log(result);
        })

    };

    const onKeyDown = (ev) => {
        if (ev.keyCode === 13)
        {
            onSearch()
        }
        
    }

    const onRadiochange = (ev) => {
        setSearchOption(ev.target.value);
        console.log(searchOption);
    }

    

    const renderResults = () => {


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

            {renderResults()}
      
        </MainPageLayout>
    );
};

export default Home;
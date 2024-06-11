import React from "react";

import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledSelect = styled.select`
    width: 200px;
    height: 80px;
    margin-bottom: 20px;
`;

const StyledOption = styled.option`

`;

function SelectBox(props){

    const { products, onSelectCategory } = props;

    const categories = ["ALL", ...Array.from(new Set(products.map(product => product.category)))];

    const handleCategoryChange = (event)=> {
        const selectedCategory = event.target.value;
        console.log(selectedCategory);
        onSelectCategory(selectedCategory);
    }



    return(
        <Wrapper>
        <StyledSelect onChange={handleCategoryChange}>
            {categories.map((category, index)=>(
                <StyledOption key={index} value={category}>{category}</StyledOption>
            ))}
        </StyledSelect>
    </Wrapper>
    );

}

export default SelectBox;
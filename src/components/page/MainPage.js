import React, {useState, useEffect}  from 'react';

import styled from 'styled-components';

import Header from '../ui/Header';
import ProductList from '../list/ProductList';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import SelectBox from '../ui/SelectBox';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

function MainPage(){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState("ALL");

    useEffect(()=>{

        const fetchData = async () =>{

            try{
                setError(null);
             
                setLoading(true);

                const response = await axios.get(
                    'https://dummyjson.com/products?limit=0')   
                
                
                
                setData(response.data.products);


            }catch(error){
                setError(error);
            }
            setLoading(false);

        }
        fetchData();

    },[]);

    const handleCategoryChange = (category)=> {
        setSelectedCategory(category);
    };


    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;


    const filteredData = selectedCategory === "ALL" ? data : data.filter(product => product.category === selectedCategory);

    
    return(
        <Wrapper>
            <Header></Header>
            <SelectBox products={data} onSelectCategory={handleCategoryChange}></SelectBox>
            <ProductList
             products={filteredData}
             onClickItem={(item)=>{navigate(`/detail/${item.id}`)}}>
             </ProductList>
        </Wrapper>
    );
}

export default MainPage;
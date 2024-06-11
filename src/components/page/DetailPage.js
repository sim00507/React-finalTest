import React, {useState, useEffect} from 'react';

import styled from 'styled-components';

import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

import Button from '../ui/Button';


const Wrapper = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;

    
`;

const DetailProductSession= styled.div`

    width: 40%;
    padding: 30px;
    border: 1px solid grey;
    border-radius: 8px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const PrevNextProductSession= styled.div`

    width: 100%;
   
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 50px;
  
    
`;

const ButtonProductSession= styled.button`

    width: 20%;
    padding: 30px;
    border: 1px solid grey;
    border-radius: 8px;
    background: white;
    text-align: center;
    cursor: pointer;
    
`;

const TitleText = styled.p`
    font-size: 27px;
    font-weight: 600;
    
`;

const DescriptionText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;
const Categorybanner = styled.p`
    font-size: 20px;
    font-weight: 500;
    display: inline-block;
    padding: 10px;
    border: 2px solid black;
    border-radius: 8px;
    text-align: center;
`;

const StyledImage = styled.img`
	width: 700px;
    height: 700px;
    display: inline-block;
    
`;



function DetailPage(){

   const {productId} = useParams();
   const navigate = useNavigate();
   

   const [data,setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const [prevData, setPrevData] = useState(null);
   const [nextData, setNextData] = useState(null);

    const [finalProductId, setFinalProductId] = useState(null);

   useEffect(()=>{
        const fetchData = async ()=> {
            try{

                setError(null);
                setData(null);
                setLoading(true);
                
                const id = parseInt(productId, 10);

                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setData(response.data);
                console.log(data);
                const allResponse = await axios.get('https://dummyjson.com/products');
                setFinalProductId(allResponse.data.total);
                console.log(allResponse);
                console.log('마지막 아이디:',finalProductId);

                try{
                    const responseP = await axios.get(`https://dummyjson.com/products/${id > 1 ? id - 1 : id}`);
                    setPrevData(responseP.data);
                }catch(error){
                    console.error("Error fetching previous data: ", error);
                    setPrevData(null);
                }
                // const responseP = await axios.get(`https://dummyjson.com/products/${id-1}`);
                // setPrevData(responseP.data);

                try{
                    const responseN = await axios.get(`https://dummyjson.com/products/${id < finalProductId ? id+1 : id}`);
                    setNextData(responseN.data);      
                }catch(error){
                    console.error("Error fetching next data: ", error);
                    setNextData(null);
                }
                console.log('현재id',id);

            }catch(error){
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
   },[productId]);

   if(loading) return <div>로딩중..</div>
   if(error) return <div>에러가 발생했습니다.</div>
   if(!data) return null;

        return(
      
            <Wrapper>
                <DetailProductSession>
                    <StyledImage src={data.thumbnail}></StyledImage>
                    <Categorybanner>{data.category}</Categorybanner>
                    <TitleText>{data.title}</TitleText>
                    <DescriptionText>{data.description}</DescriptionText>
                    <TitleText>{data.price}</TitleText>
                    <Button title="장바구니 담기" onClick={()=>{navigate(`/cart/${data.id}`, {state: { product: data }})}} ></Button>
                </DetailProductSession>


                <PrevNextProductSession>
                    <ButtonProductSession onClick={()=>{navigate(`/detail/${prevData.id}`)}}>
                        <Categorybanner>PREV</Categorybanner>
                        <TitleText>{data.id===1 ? '이전 상품이 없습니다.' : prevData.title}</TitleText>
                    </ButtonProductSession>
                    <ButtonProductSession onClick={()=>{navigate(`/detail/${nextData.id}`)}}>
                        <Categorybanner>NEXT</Categorybanner>
                         <TitleText>{data.id===finalProductId ? '다음 상품이 없습니다.' : nextData.title}</TitleText>
                    </ButtonProductSession>
                </PrevNextProductSession>
                
            </Wrapper>
    
        );
    

    
}

export default DetailPage;
import React from 'react';

import styled from 'styled-components';



import Button from '../ui/Button'

import { useLocation, useNavigate } from 'react-router-dom';

const Wrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    
`;

const CartSession= styled.div`
    width: 90%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
    padding: 30px;
    border: 1px solid grey;
    border-radius: 8px;
    margin-bottom: 50px;
`;



const PaySession= styled.div`

    width: 90%;
    background: white;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid grey;
    padding: 30px;
    
`;



const TitleText = styled.p`
    font-size: 27px;
    font-weight: 600;
    
`;

const DescriptionText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

const StyledImage = styled.img`
	width: 300px;
    height: 300px;
    display: inline-block;
    
`;

function CartPage(){
    const { state } = useLocation();
    const { product } = state || {};
    const navigate = useNavigate();

    if(!product) {
        return <div>데이터를 가져오지 못했습니다.</div>;
    }
 
  
    return(
        <Wrapper>
            <CartSession>
                       <StyledImage src={product.thumbnail}></StyledImage>
                    <div>
                       <TitleText>{product.title}</TitleText>
                       <DescriptionText>{product.price}</DescriptionText>
                       <DescriptionText>수량 : 1</DescriptionText>
                    </div>
        
            </CartSession>
            <PaySession>
                    <DescriptionText>총 상품 가격: {product.price}</DescriptionText>
                    <DescriptionText>배송비 : 무료</DescriptionText>
                    <TitleText>총 결제 금액: {product.price}</TitleText>
                    <Button title="결제 하기" onClick={()=> navigate(`/`)}></Button>
            </PaySession>
        </Wrapper>
    );
}


export default CartPage;
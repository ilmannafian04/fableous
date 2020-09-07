import style from 'styled-components';

export const BoxWrapper = style.div`
    width: 100vw;
    height: 100vh;
    background-color: #2E3138;
    display:flex;
    align-items: center;
    justify-content:center;
    flex-direction:column;
    
    .bigBox{
        display: flex;
        width: 930px;
        height: 417px;
        border-radius: 46px;
        background:#F6F1D3;
        align-items: center;
        justify-content:center;
        
    }
    .smallBox{
        background:#7030A2;
        border-radius: 46px;
        width: 890px;
        height: 377px;
        left: 131px;
        top: 76px;
    }
    .title{
        margin-top:1rem;
        color: #F6F1D3;
        font-weight: 700;
        font-size: 90px;
        display: block;
        margin-block-start: 2rem;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }
    .tag{
        color: #F6F1D3;
        font-weight: 500;
    }
    .tagInput{
        color: #F6F1D3;
        font-weight: 500;
    }
    .buttonsLayout{
        justify-content: 'space-between';
        padding-top: 2rem;
    }
    .insideButton{
        background-color: #2F3138;
        color: white;
        border-radius: 50px;
    }
    .menuButton{
        background-color: #7030A2;
        color: white;
        border-radius: 50px;
    }
    .padding-layout{
        padding-top:2rem;
    }
    .join-story-dialog{
        display:flex;
        background-color: black;
    }
`;

import { useState, useEffect } from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Header from "../components/Header"
import Main from "../components/Main"
import FlashCard from "../components/FlashCard"
import FlashCards from "../components/FlashCards"
import FlashCardItem from "../components/FlashCardItem"
import Button from "../components/Button"
import RadioButton from "../components/RadioButton"
import Loading from "../components/Loading"
import Error from "../components/Error"

import {    
    apiGetAllFlashCards, 
    apiDeleteFlashCard, 
    apiCreateFlashCard, 
    apiEditFlashCard
} from "../services/apiService"

import {helperShuffleArray} from "../helpers/arrayHelpers"
import FlashCardForm from "../components/FlashCardForm";


export default function FlashCardsPage(){

    const [allCards, setAllCards] = useState([])
    const [studyCards, setstudyCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [createMode, setCreateMode] = useState(true)
    const [selectedTab, setSelectedTab] = useState(0)
    const [selectedFlashCard, setSelectedFlashCard] = useState(null)

    const [radioButtonShowTitle, setradioButtonShowTitle]= useState(true)

    useEffect(()=>{
        //Promises
        //apiGetAllFlashCards().then(allFlashCards =>{
        //    setAllCards( allFlashCards)
        //    console.log(allFlashCards) 
        //})

        //(async function getAllCards(){
        //    const backEndAllCards = await apiGetAllFlashCards();
        //    setAllCards(backEndAllCards)
        //})();

        async function getAllCards(){
            try{
                const backEndAllCards = await apiGetAllFlashCards();
                setAllCards(backEndAllCards)
                setTimeout(()=>{
                    setLoading(false)
                }, 500)    
            }catch(error){
                setError(error.message)
            }            
        }

        
        getAllCards();

    },[])

    useEffect(()=>{
        setstudyCards(allCards.map(card=>({...card, showTitle:true})))
    },[allCards])

    function handleShuffle(){
        const shuffleCards = helperShuffleArray (studyCards)
        setstudyCards(shuffleCards)
    }

    function handleShowDescriptionClick(){
        const updatedCards = [...studyCards].map( card => ({...card, showTitle:false}) )
        setstudyCards(updatedCards)
        setradioButtonShowTitle(false)
    }

    function handleShowTitleClick(){
        const updatedCards = [...studyCards].map( card => ({...card, showTitle:true}) )
        setstudyCards(updatedCards)
        setradioButtonShowTitle(true)
    }

    function handleToggleFlashCard(cardId){
        const updatedCards = [...studyCards];
        const cardIndex = updatedCards.findIndex( card => card.id ===cardId)
        updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle
        setstudyCards(updatedCards)
    }

    async function handleDeleteFlashCard(cardId){
        try{

            //exclusão backend
            await apiDeleteFlashCard(cardId)

            //exclusão frontend
            setAllCards(allCards.filter( card => card.id !== cardId))

            setError('')
        }catch(error){
            setError(error.message)
        }
    }

    function handleEditFlashCard(card){
        setCreateMode(false)
        setSelectedTab(1)
        setSelectedFlashCard(card)
     } 

     function handleTabSelect(tabIndex){
        setSelectedTab(tabIndex)
     } 
     
     function handleNewFlashCard(tabIndex){
        setCreateMode(true)
        setSelectedFlashCard(null)
     } 

     async function handlePersist(title, description){
        if(createMode){
            try{
                //insere no backend
                const newFlashCard = await apiCreateFlashCard(title, description)

                //insere no frontend
                setAllCards([...allCards, newFlashCard])
                setError('')
            }catch(error){
                setError(error.message)
            }

        }else{
            try{
                console.log("teste")
                console.log(selectedFlashCard)
                //edit no backend
                const updatedFlashCard = await apiEditFlashCard({...selectedFlashCard, title, description})

                //edit no frontend
                setAllCards(
                    allCards.map( card =>{
                        if(card.id === updatedFlashCard.id){
                            return updatedFlashCard
                        }else {
                            return card
                        }
                    })
                )
                setSelectedFlashCard(null)
                setCreateMode(true)
                setError('')
            }catch(error){
                setError(error.message)
            }
        }
        
    }      

    let mainJsx = (
        <div className="flex justify-center my-4">
            {loading && <Loading/>}
        </div>
    )

    if(error){
        mainJsx = <Error>{error}</Error>
    }

    if (!loading && !error){
        mainJsx = (
            <> 
                <Tabs 
                    selectedIndex={selectedTab}
                    onSelect={handleTabSelect}>
                    <TabList>
                        <Tab>Listagem</Tab>
                        <Tab>Cadastro</Tab>
                        <Tab>Estudo</Tab>
                    </TabList>

                    <TabPanel>
                        {allCards.map(card=>{
                            return (
                                <FlashCardItem 
                                    onDelete={handleDeleteFlashCard}
                                    onEdit={handleEditFlashCard}
                                    key={FlashCard.id}>
                                    {card}
                                </FlashCardItem>

                            )
                        })}
                    </TabPanel>

                    <TabPanel>
                        <div className="my-4">
                        <Button onButtonClick={handleNewFlashCard}>Novo flash card</Button>
                        </div>
                        <FlashCardForm 
                            createMode={createMode}
                            onPersist={handlePersist}>{selectedFlashCard}
                        </FlashCardForm>
                    </TabPanel>

                    <TabPanel>
                        <div className="text-center mb-4">
                            <Button
                                onButtonClick={handleShuffle}>Embaralhar cards
                            </Button>
                        </div>

                        <div className="flex flex-row items-center justify-center m-4 space-x-4">
                            <RadioButton 
                                id="radioButtonShowTitle" 
                                name="opcao"
                                buttonChecked={radioButtonShowTitle}
                                onRadioButtonClick={handleShowTitleClick}> Mostrar Título
                            </RadioButton>

                            <RadioButton 
                                id="radioButtonShowDescription" 
                                name="opcao"
                                buttonChecked={!radioButtonShowTitle} 
                                onRadioButtonClick={handleShowDescriptionClick}> Mostrar Descrição 
                            </RadioButton>
                        </div>

                        <FlashCards>
                            {studyCards.map((card) => {
                                return <FlashCard
                                            key={card.id} 
                                            id={card.id}
                                            title={card.title} 
                                            description={card.description}
                                            showFlashCardTitle={card.showTitle}
                                            onToggleFlashCard={handleToggleFlashCard}/> 
                            })}
                        </FlashCards>
                    </TabPanel>
                </Tabs>



                               
            </>
        )
    }


    return (
        <>  
            <Header>Flashcards V2 Parte II! </Header>
            <Main>{mainJsx}</Main>
        </>
    )
}
import { getAllElements, deleteOne, create, edit } from "./httpServices"
import { serviceGetNewId } from "./idService"


export async function apiGetAllFlashCards(){
   const allFlashCards = await getAllElements('/flashcards')
    return allFlashCards 
}

export async function apiDeleteFlashCard(cardId){
    await deleteOne(`/flashcards/${cardId}`)
 }

 export async function apiCreateFlashCard(title, description){
    const newFlashCard = await create(`/flashcards/`,{
        id:serviceGetNewId(), 
        title, 
        description
    })
    return newFlashCard
 }

 export async function apiEditFlashCard(flashcard){
    console.log(flashcard)
    const updatedFlashCard = await edit(`/flashcards/${flashcard.id}`,flashcard)
    return updatedFlashCard
 }
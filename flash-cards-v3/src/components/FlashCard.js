import { serviceGetNewId } from "../services/idService"

export default function FlashCard({
    id=serviceGetNewId(),
    title="Título do Card", 
    description="Aqui é a presentada a descrição da palavra do Card",
    showFlashCardTitle = true,
    onToggleFlashCard=null}){
    
     function handleCardClick(){
        if (onToggleFlashCard){
            onToggleFlashCard(id)
        }
     }

    const fontSize= showFlashCardTitle? 'text-xl':'text-sm'

    return(
        <div 
            className={`shadow-lg m-2 p-4 w-80 h-48 cursor-pointer
                       flex flex-row items-center justify-center
                       font-semibold font-mono ${fontSize}`}
            onClick={handleCardClick}
            
        >
            { showFlashCardTitle ? title :  description}

        </div>
    )
}

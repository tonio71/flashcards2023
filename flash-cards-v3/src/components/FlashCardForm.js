import { useEffect, useState } from "react"
import TextArea from "./TextArea"
import TextInput from "./TextInput"
import Button from "./Button"
import Error from "./Error"

export default function FlashCardForm({
    children:flashCard=null,
    createMode= true,
    onPersist = null
}){
    const[title, setTitle] = useState(flashCard?.title || '')
    const[description, setDescription] = useState(flashCard?.description || '')
    const[error, setError] = useState('')

    useEffect(() =>{
        if(createMode){
            setTitle('')
            setDescription('')
        }
    },[createMode])

    function handleTitleChange(newTitle){
        setTitle(newTitle)
        setError('')
    }

    function handleDescriptionChange(newDescription){
        setDescription(newDescription)
        setError('')
    }

    function clearFields(){
        setTitle("")
        setDescription("")
    }

    function validateForm(){
        return (title.trim() !== '') && (description.trim()!=='')
    }

    function handleFormSubmit(event){
        event.preventDefault()
        if (validateForm()){
            if(onPersist){
                clearFields()
                onPersist(title, description)
            }
        }else{
            setError('O Título e a descrição são obrigatório')
        }
    }

    function handleFormReset(){
        clearFields()
    }

    const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100'

    return(
        <>
            <form 
                className={`${backgroundClassName} p-4`}
                onSubmit = {handleFormSubmit}
                onReset = {handleFormReset}>
                <h2 className="text-center font-semibold">
                    {createMode?"Novo Flash Card":"Manutenção de Flash Cards"}
                </h2>
                
                <TextInput 
                    labelDescription="Título:"
                    inputValue = {title}
                    onInputChange = {handleTitleChange}
                    />
                
                <TextArea 
                    labelDescription="Descrição:"
                    textAreaValue = {description}
                    onTextAreaChange = {handleDescriptionChange}
                    />
                
                <div className="flex items-center justify-between">
                    { error.trim() !=='' ? <Error>{error}</Error> : <span></span>}
                    <div>
                        <Button 
                            colorClass="bg-red-200"
                            type="reset">Limpar</Button>

                        <Button 
                            colorClass="bg-green-300" 
                            type='submit'>Salvar</Button>
                    </div>
                </div>

            </form>
        </>
    )
}
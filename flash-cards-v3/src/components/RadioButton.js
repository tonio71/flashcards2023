import { serviceGetNewId } from "../services/idService"

export default function RadioButton({
    children:description="descrição do botão",
    name = "opcao",
    buttonChecked=true,
    id = serviceGetNewId(),
    onRadioButtonClick = null }){

        
     function handleRadioButtonChange(){
        if(onRadioButtonClick) {
            onRadioButtonClick()
        }
     }


    return(
        <div className="flex flex-row items-center space-x-2">
            <input 
                id={id} 
                type='radio'
                name ={name}
                checked={buttonChecked}
                onChange={handleRadioButtonChange}
            /> 

            <label htmlFor={id}>{description}
            </label>
        </div>
    )
}
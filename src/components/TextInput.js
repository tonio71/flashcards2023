import { serviceGetNewId } from "../services/idService";

export default function TextInput(props){

    let {
        id= serviceGetNewId(),
        labelDescription = 'descricao do label', 
        inputValue='valor default', 
        onInputChange=null, 
        autoFocus=false } = props;

    function handleChange(event){
        if(onInputChange){
            onInputChange(event.currentTarget.value)
        }
    } 

    return (
        <div className='flex flex-col my-4'>
            <label htmlFor={id} className="text-sm mb-1">
                {labelDescription}
            </label>
            <input 
                autoFocus={autoFocus}
                id={id} 
                className="border p-1" 
                type="text" 
                value={inputValue}  
                onChange={handleChange}>
            </input>
        </div>
    )
}
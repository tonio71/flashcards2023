import { serviceGetNewId } from "../services/idService";

export default function TexArea(props){

    let {
        id=serviceGetNewId(),
        labelDescription = 'descricao do label', 
        textAreaValue = 'Valor padrão do textarea', 
        onTextAreaChange=null, 
        maxLength=230,
        rows = 4 } = props;

    function handleChange(event){
        if(onTextAreaChange){
            onTextAreaChange(event.currentTarget.value)
        }
    } 

    const currentCharacterCount = textAreaValue.length

    return (
        <div className='flex flex-col my-4'>
            <label htmlFor={id} className="text-sm mb-1">
                {labelDescription}
            </label>
            <textarea 
                id={id} 
                className="border p-1"
                maxLength={maxLength}
                rows={rows}
                value={textAreaValue}  
                onChange={handleChange}>
            </textarea>

            <div className="text-right mr-1">{currentCharacterCount}/{maxLength}</div>
            
        </div>
    )
}
export default function Headers(props){
    let {children} = props;
    return (
        <header>
            <div className="bg-purple-200 mx-auto p-4">
                <h1 className="text-center font-semibold text-xl"> {children}</h1>
            </div>
         </header>
    )
}
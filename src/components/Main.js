export default function Main(props){
    let {children} = props;

    return (
        <main className="container mx-auto p-4">
          {children}
        </main>
    )
}
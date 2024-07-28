import { Button, Input } from "react-aria-components";
import Page from "~/components/Page";
import Separator from "~/components/Separator";


export default function HomePage() {
    return (
        <Page>
            <div className="w-full h-full flex items-center flex-col">
                <div className="h-32 px-10 flex items-center justify-center text-2xl font-semibold">MY SECRET LIBRARY</div>

                <div className="w-full max-w-[1100px] flex justify-center relative">
                    <Input placeholder="Search books" className="h-10 p-2 border rounded-md w-[500px]" />

                    <Button className="px-8 h-10 bg-blue-500 text-xl rounded-md text-white hover:opacity-85 absolute right-0">Cadastrar novo livro</Button>
                </div>

                <Separator size={60} />

                <div className="w-full max-w-[1600px] h-[600px] grid grid-cols-6 grid-rows-2">

                    <Book/>
                    <Book/>
                    <Book/>
                    <Book/>
                    <Book/>
                    <Book/>
                    <Book/>
                    <Book/>
                    <Book/>
                    <Book/>
                    <Book/>
                    <Book/>

                </div>

                <div className="flex justify-center flex-col items-center gap-4">
                    <p>Página 1 de 1</p>
                    <div className="w-full flex justify-center gap-2">
                        <Button className="w-10 h-10 bg-blue-500 text-white rounded-md">1</Button>
                        <Button className="w-10 h-10 bg-blue-500 text-white rounded-md">1</Button>
                        <Button className="w-10 h-10 bg-blue-500 text-white rounded-md">1</Button>
                        <Button className="w-10 h-10 bg-blue-500 text-white rounded-md">1</Button>
                    </div>
                </div>
            </div>
        </Page>
    )
}

function Book() {
    return (
        <div className="flex justify-center">
            <div className="w-[160px] h-[230px]">
                <img src="https://marketplace.canva.com/EAD0UPCkitY/1/0/1024w/canva-capa-de-livro-de-suspense-monocrom%C3%A1tica-com-foto-de-floresta-U1dpnJ3bwKw.jpg" alt="book" />
            </div>
        </div>
    )
}

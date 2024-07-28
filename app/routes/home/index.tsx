import { useNavigate, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Input } from "react-aria-components";
import SubmitButton from "~/components/Button";
import Page from "~/components/Page";
import Pagination from "~/components/Pagination";
import Separator from "~/components/Separator";
import { api } from "~/services/api";

export interface Book {
    id: number;
    name: string;
    synopsis: string;
    gender: string;
    author: string;
    rating: number;
    serie_name: string;
    is_read: boolean;
    img_url: string;
    user_id: number;
    created_at: Date;
}


export default function HomePage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [booksCount, setBooksCount] = useState<number>(0);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const currentPage = searchParams.get('page') ?? 1;
    const pageSize = 12;
    const totalPages = Math.ceil(booksCount / pageSize);

    async function getMyBooks() {
        try {
            const response = await api.get(`/books?page=${currentPage}&limit=${pageSize}`);

            setBooks(response.data.books);
            setBooksCount(response.data.count);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMyBooks();
        console.log(navigate);
        
    }, [])
    
    return (
        <Page>
            <div className="w-full h-full flex items-center flex-col">
                <div className="h-32 px-10 flex items-center justify-center text-2xl font-semibold">MY SECRET LIBRARY</div>

                <div className="w-full max-w-[1100px] flex justify-center relative">
                    <Input placeholder="Search books" className="h-10 p-2 border rounded-md w-[500px]" />

                    <div className="hover:opacity-85 absolute right-0">
                        <SubmitButton>
                            Novo livro
                        </SubmitButton>
                    </div>

                </div>

                <Separator size={60} />

                <div className="w-full max-w-[1600px] h-[600px] grid grid-cols-6 grid-rows-2">
                    {books.length === 0 ? <div>Não há nada por aqui</div> : books.map((book) => <Book key={book.id} />)}
                </div>

                <Separator size={60} />

                <Pagination currentPage={Number(currentPage)} totalPages={totalPages} />

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

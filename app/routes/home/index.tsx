import { useNavigate, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Input } from "react-aria-components";
import SubmitButton from "~/components/Button";
import Page from "~/components/Page";
import Pagination from "~/components/Pagination";
import Separator from "~/components/Separator";
import { api } from "~/services/api";
import BooksList from "./BooksList";
import MySecretLibrary from "~/components/MySecretLibrary";

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
    const [searchTerm, setSearchTerm] = useState("");

    const currentPage = searchParams.get('page') ?? 1;
    const pageSize = 12;
    const totalPages = Math.ceil(booksCount / pageSize);

    async function getMyBooks() {
        try {
            const response = await api.get(`/books?page=${currentPage}&limit=${pageSize}&search=${searchTerm}`);

            setBooks(response.data.books);
            setBooksCount(response.data.count);
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        getMyBooks();
        console.log(navigate);
    }, [searchTerm, currentPage])
    
    return (
        <Page>
            <div className="w-full h-full flex items-center flex-col">
                <MySecretLibrary />

                <div className="w-full max-w-[1100px] flex justify-center relative">
                    <Input placeholder="Search books" className="h-10 p-2 border rounded-md w-[500px]" onChange={handleSearch} />

                    <div className="hover:opacity-85 absolute right-0">
                        <SubmitButton>
                            Novo livro
                        </SubmitButton>
                    </div>

                </div>

                <Separator size={60} />

                <BooksList  books={books} />

                <Separator size={60} />

                <Pagination currentPage={Number(currentPage)} totalPages={totalPages} />

            </div>
        </Page>
    )
}

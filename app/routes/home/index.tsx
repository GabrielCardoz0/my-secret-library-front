import { redirect, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { Input } from "react-aria-components";
import SubmitButton from "~/components/Button";
import Page from "~/components/Page";
import Pagination from "~/components/Pagination";
import Separator from "~/components/Separator";
import { api } from "~/services/api";
import BooksList from "./BooksList";
import MySecretLibrary from "~/components/MySecretLibrary";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "~/session";

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

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const currentPage = url.searchParams.get("page") ?? 1;
    const searchTerm = url.searchParams.get("search") ?? "";
    const pageSize = 12;
    
    const session = await getSession(request.headers.get("cookie"));

    const token = session.data.token;

    if(!token) return redirect("/login");

    const bearedToken = `Bearer ${token}`;
    
    try {
        const response = await api.get(`/books?page=${currentPage}&limit=${pageSize}&search=${searchTerm}`, {
            headers: {
                Authorization: bearedToken
            }
        });

        return {...response.data, bearedToken};
        
    } catch (error) {
        console.log(error);
        redirect("/login");
        return null;
    }
}

export default function HomePage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const currentPage = searchParams.get('page') ?? 1;
    const pageSize = 12;

    const { books, count: booksCount, bearedToken } = useLoaderData<typeof loader>();
    
    const totalPages = Math.ceil(booksCount / pageSize);
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }


    const clearCookies = () => {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    };

    const handleLogout = async () => {
        clearCookies();
        navigate("/login");
    }
    
    return (
        <Page>

            <button className="text-red-500 hover:opacity-75 text-lg cursor-pointer absolute right-10 top-10" onClick={handleLogout}>
                Sair
            </button>

            <div className="w-full h-full flex items-center flex-col">
                <MySecretLibrary />

                <div className="w-full max-w-[1100px] flex justify-center relative">
                    <form>
                        <Input placeholder="Search books" name="search" value={searchTerm} className="h-10 p-2 border rounded-md w-[500px]" onChange={handleSearch} />
                    </form>

                    <div className="hover:opacity-85 absolute right-0">
                        <SubmitButton onPress={() => navigate("/create-book")}>
                            Novo livro
                        </SubmitButton>
                    </div>

                </div>

                <Separator size={60} />

                <BooksList  books={books} bearedToken={bearedToken}  />

                <Separator size={60} />

                <div className="absolute bottom-10">
                    <Pagination currentPage={Number(currentPage)} totalPages={totalPages} />
                </div>


            </div>
        </Page>
    )
}

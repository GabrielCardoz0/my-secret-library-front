import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import { Book } from "."
import { api } from "~/services/api";
import { toast } from "react-toastify";
import { useNavigate } from "@remix-run/react";

interface BookItemProps {
    book: Book;
}

export default function BookItem({ book }: BookItemProps) {
    const navigate = useNavigate();

    async function handlChangeReadBookStatus(isRead: boolean) {
        try {
            const readedBook = { ...book, is_read: isRead };
            
            await api.put("/books/"+book.id, readedBook);
            
        } catch (error) {
            console.log(error);
            toast.error("Erro ao alterar status do livro!");
        } finally {
            navigate("/home?page=1");
            window.location.reload();
        }
    }

    async function handleDeleteBook() {
        try {
            const response = await api.delete("/books/"+book.id);
            console.log(response);
            
            toast.success("Livro deletado com sucesso!");
        } catch (error) {
            console.log(error);
            toast.error("Erro ao deletar livro!");
        } finally {
            navigate("/home?page=1");
            window.location.reload();
        }
    }


    return (
        <>
            <div className="flex justify-center relative group">

                <div className="absolute opacity-65 bg-white w-[160px] h-[230px] group-hover:block hidden z-[1]">
                    <div className="p-2">
                        <p className="text-md text-wrap font-bold"><span className="text-gray-500">Título: </span> {book.name}</p>
                        <p className="text-md text-wrap font-semibold mt-4"><span className="text-gray-500">Autor: </span> {book.author}</p>
                    </div>

                    <div className="flex w-[160px] justify-between items-center absolute bottom-5 p-4">
                        <FaTrash size={20} className=" cursor-pointer" onClick={handleDeleteBook} />

                        {book.is_read
                            ? <FaEyeSlash size={24} className=" cursor-pointer" onClick={() => handlChangeReadBookStatus(false)}/>
                            : <FaEye size={24} className=" cursor-pointer" onClick={() => handlChangeReadBookStatus(true)}/>
                        }
                    </div>

                </div>

                <div className="w-[160px] h-[230px] relative bg-blue-500">
                    <img src={book.img_url} alt="book" className="w-[160px] h-[230px]" />
                    {book.is_read && <div className="absolute bottom-10 bg-gray-400 w-full justify-center flex">
                        Já lido
                    </div>}
                </div>


            </div>
        </>
    )
}
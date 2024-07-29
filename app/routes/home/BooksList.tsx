import { Book } from ".";
import BookItem from "./Book";

interface BooksListProps {
    books: Book[];
    bearedToken: string;
}

export default function BooksList({ books, bearedToken }: BooksListProps) {
    return (
        <div className="w-full max-w-[1600px] h-[600px] grid grid-cols-6 grid-rows-2">
            {books.length === 0
                ? <div>Não há nada por aqui ainda, <br/> Cadastre seu primeiro livro!</div>
                : books.map((book) => <BookItem key={book.id} book={book} bearedToken={bearedToken} />)
            }
        </div>
    );
}

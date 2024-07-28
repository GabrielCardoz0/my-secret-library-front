import { Link } from "react-router-dom";
import { Button } from "react-aria-components";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    return (
        <div className="flex justify-center flex-col items-center gap-4">
            <p>Página {currentPage} de {totalPages}</p>
            <div className="w-full flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Link key={index+1} to={`?page=${index+1}`}>
                        <Button
                            className={`w-10 h-10 bg-blue-500 text-white rounded-md ${
                                currentPage === index + 1 ? 'bg-blue-700' : ''
                            }`}
                            >
                            {index + 1}
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    );
}

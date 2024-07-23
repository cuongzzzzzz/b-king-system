"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination"

export function PaginationDemo({ totalPage, currentPage, setPage }: { totalPage: number, currentPage: number, setPage: (value: any) => void }) {
    const previousPage = () => {
        if (currentPage > 1) setPage(currentPage - 1)
        return

    }
    const nextPage = () => {
        if (currentPage < totalPage) {
            setPage(currentPage + 1)
            console.log("next")
        }
        return
    }
    const changePage = (page: number) => {
        setPage(page)
    }

    console.log(currentPage)
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem >
                    <PaginationPrevious onClick={() => { previousPage() }} />
                </PaginationItem>

                {[...Array(totalPage)].map((_, index) => {
                    return <PaginationItem>
                        <PaginationLink onClick={() => { changePage(index + 1) }} isActive={currentPage == index + 1}>{index + 1}</PaginationLink>
                    </PaginationItem>
                })}
                <PaginationItem >
                    <PaginationNext onClick={() => {
                        nextPage()
                    }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

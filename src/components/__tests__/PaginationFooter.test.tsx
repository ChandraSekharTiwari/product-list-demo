import React from "react";
import PaginationFooter from "../PaginationFooter";
import { render, screen, fireEvent } from "@testing-library/react";

describe("PaginationFooter", () => {
    test("returns null when totalPages <= 1", () => {
        const onPageChange = jest.fn();
        const onPageSizeChange = jest.fn();

        render(
            <PaginationFooter
                currentPage={1}
                totalPages={1}
                pageSize={5}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />
        );

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    test("renders pagination with correct buttons and disabled state", () => {
        const onPageChange = jest.fn();
        const onPageSizeChange = jest.fn();

        render(
            <PaginationFooter
                currentPage={1}
                totalPages={5}
                pageSize={5}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />
        );

        const prev = screen.getByRole("button", { name: /prev/i });
        const next = screen.getByRole("button", { name: /next/i });

        expect(prev).toBeDisabled();
        expect(next).not.toBeDisabled();

        for (let i = 1; i <= 5; i++) {
            expect(screen.getByRole("button", { name: String(i) })).toBeInTheDocument();
        }
    });

    test("calls onPageChange appropriately for page buttons and navigation", () => {
        const onPageChange = jest.fn();
        const onPageSizeChange = jest.fn();

        const { unmount } = render(
            <PaginationFooter
                currentPage={2}
                totalPages={5}
                pageSize={5}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />
        );

        const page3 = screen.getByRole("button", { name: "3" });
        const page2 = screen.getByRole("button", { name: "2" });
        const prev = screen.getByRole("button", { name: /prev/i });
        const next = screen.getByRole("button", { name: /next/i });

        page3.click();
        expect(onPageChange).toHaveBeenCalledWith(3);

        page2.click();
        expect(onPageChange).toHaveBeenCalledTimes(1);

        prev.click();
        expect(onPageChange).toHaveBeenCalledWith(1);

        next.click();
        expect(onPageChange).toHaveBeenCalledWith(3);

        expect(onPageChange).toHaveBeenCalledTimes(3);

        unmount();

        onPageChange.mockClear();
        const { unmount: unmountFirst } = render(
            <PaginationFooter
                currentPage={1}
                totalPages={3}
                pageSize={3}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />
        );
        const prevFirst = screen.getByRole("button", { name: /prev/i });
        expect(prevFirst).toBeDisabled();
        prevFirst.click();
        expect(onPageChange).not.toHaveBeenCalled();
        unmountFirst();

        onPageChange.mockClear();
        render(
            <PaginationFooter
                currentPage={3}
                totalPages={3}
                pageSize={3}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />
        );
        const nextLast = screen.getByRole("button", { name: /next/i });
        expect(nextLast).toBeDisabled();
        nextLast.click();
        expect(onPageChange).not.toHaveBeenCalled();
    });

    test("calls onPageSizeChange when items per page select is changed", () => {
        const onPageChange = jest.fn();
        const onPageSizeChange = jest.fn();

        render(
            <PaginationFooter
                currentPage={1}
                totalPages={5}
                pageSize={5}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />
        );

        const select = screen.getByLabelText(/items per page/i) as HTMLSelectElement;
        fireEvent.change(select, { target: { value: "10" } });

        expect(onPageSizeChange).toHaveBeenCalledWith(10);
    });

    test("renders sliding window of page numbers when totalPages > pageSize", () => {
        const onPageChange = jest.fn();
        const onPageSizeChange = jest.fn();

        render(
            <PaginationFooter
                currentPage={10}
                totalPages={20}
                pageSize={5}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />
        );

        for (let i = 8; i <= 12; i++) {
            expect(screen.getByRole("button", { name: String(i) })).toBeInTheDocument();
        }

        // pages outside window should not be present (e.g., 1 and 20)
        expect(screen.queryByRole("button", { name: "1" })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "20" })).not.toBeInTheDocument();
    });

    test("clicking disabled prev/next does not call onPageChange (explicit check)", () => {
        const onPageChange = jest.fn();
        const onPageSizeChange = jest.fn();

        const { unmount } = render(
            <PaginationFooter
                currentPage={1}
                totalPages={1}
                pageSize={5}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />
        );

        // nothing rendered
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
        unmount();

        const { unmount: unmount2 } = render(
            <PaginationFooter
                currentPage={1}
                totalPages={2}
                pageSize={5}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />
        );
        const prev = screen.getByRole("button", { name: /prev/i });
        expect(prev).toBeDisabled();
        prev.click();
        expect(onPageChange).not.toHaveBeenCalled();
        unmount2();
    });
});
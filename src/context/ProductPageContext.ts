import React, { ReactNode, useReducer, createContext, useContext } from "react";
import { Product } from "../api/productApi";

type State = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  currentPage: number;
  pageSize: number;
};

const initialState: State = {
  products: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  selectedCategory: "All",
  currentPage: 1,
  pageSize: 10,
};

type Action =
  | { type: "FETCH_IN_PROGRESS" }
  | { type: "FETCH_SUCCESS"; products: Product[] }
  | { type: "FETCH_ERROR"; error: string }
  | { type: "SET_SEARCH"; term: string }
  | { type: "SET_CATEGORY"; category: string }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_PAGE_SIZE"; pageSize: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_IN_PROGRESS":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, products: action.products };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.error, products: [] };
    case "SET_SEARCH":
      return { ...state, searchTerm: action.term, currentPage: 1 };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.category, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.pageSize };
    default:
      return state;
  }
};

const ProductsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return React.createElement(
    ProductsContext.Provider,
    { value: { state, dispatch } },
    children
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProductContext must be used within ProductProvider");
  }
  return context;
};

export default ProductsContext;

import React from "react";
import ProductsPage from "./pages/ProductsPage";
import { ProductsProvider } from "./context/ProductPageContext";

function App() {
  return (
    <div className="App">
      <ProductsProvider>
        <ProductsPage />
      </ProductsProvider>
    </div>
  );
}

export default App;

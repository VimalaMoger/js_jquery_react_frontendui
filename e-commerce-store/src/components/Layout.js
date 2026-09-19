import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { SlHome } from "react-icons/sl";
import Search from "./search";
import CartCounter from "./CartCounter";
import CartTotalAmount from "./CartTotal";


const Layout = ( {categories} ) => {
  
  const [totalCount, setTotalCount] = useState(0);
  const [total, setTotal] = useState(0);

  const renderCategories = () => {

    return categories.data.map( c => 
      <li key = {c.id}> <Link to = {`categories/${c.id}`}>{c.title}</Link></li> 
    );
  };

  return (
          <React.Fragment>
            <header>
              <div id = "headerHomeIcon"><Link to = "/"><SlHome width={40}/></Link></div>

              <Search />
              
              <div id ="headerTitle">Our Store</div>              
              <div id = "headerCartIcon" ><Link to ="/basket">
                <TiShoppingCart width={40}/></Link>
                <CartCounter totalCount={totalCount} setTotalCount={setTotalCount}/>
                <CartTotalAmount totalAmount={total} setTotalAmount={setTotal}/>
              </div>
            </header>
        
            <section>
              <nav>        
                { categories.errMessage && (<div> Error: {categories.errMessage}</div> )}
                <ul>{
                  categories.data && renderCategories()
                }</ul>
              </nav>
              <article>
                {categories.data.length === 0 ?
                   (<div>
                      <span>Processing...</span></div>) : (<Outlet />)
                }
              </article>               
            </section>
              
            <footer><Link to ="/">Home</Link> | <Link to ="/basket">Basket</Link></footer>
          </React.Fragment>
  );
};

export default Layout;

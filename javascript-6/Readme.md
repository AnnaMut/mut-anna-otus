Часть 1.
Написать схему GraphQL для примера веб-приложения e-commerce shop:
до 3 балла - какие сущности (минимум 3, можно больше), какие у них поля, какие обязательные какие нет
до 4 баллов - какие запросы/мутации понадобятся (минимум 4, можно больше)

Часть 2.
до 5 баллов - развернуть локально graphQL + nodejs или воспользоваться одним из веб демо (graphqlbin), перенести полностью или частично написанную в Части 1 схему.
Результатом работы будет ссылка на онлайн демо или репозиторий. 

Примеры запросов на http://localhost:8002/graphql


query {
  products {
    id
  }
}

query {
  products(id:"3") {
    price 
  }
}

query {
  products {
    title 
  }
}

mutation {
   addProduct(title:"Rob", id:"4", price:"43") {
    products (id:"4"){title}
  }
}

mutation {
   deleteProduct (id:"4") {
    products (id:"4"){title}
  }
}

mutation {
   changeProductPrice (id:"2", newPrice: "78") {
    products (id:"2") {
      id
      title
      price
    }
  }
}

mutation {
   addProductToBasket (count: "5", titleProduct: "Ann", price: "400") {
    basket  {
      count
      titleProduct
      price
    }
  }
}




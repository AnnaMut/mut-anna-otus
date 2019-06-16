var graphql = require('graphql')

var products = [
  {
    "id": "1",
    "title": "Den",
    "price": "20"
  },

  {
    "id": "2",
    "title": "Ann",
    "price": "20"
  },

  {
    "id": "3",
    "title": "Hav",
    "price": "20"
  }
]

var productType = new graphql.GraphQLObjectType ({
name: 'Product',
fields: {
  title: {
    type: graphql.GraphQLString
  },
  id: {
    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
  },
  price: {
    type: graphql.GraphQLString
  }
}
})

var queryType = new graphql.GraphQLObjectType ({
name: 'Query',
fields: {
  products: {
    type: new graphql.GraphQLList(productType),
    args: {
      id: {
        type: graphql.GraphQLString, defaultValue: "2"
      }
    },
    resolve: function(parent, args) {     
      if (args.id) {
        return products.filter(it => it.id === args.id);
      }
      return products
    }
  },
  category: {
    type: new graphql.GraphQLList(productType),
    resolve: function() {
      return category
    }
  }
}
})

var mutation = new graphql.GraphQLObjectType({
name: 'Mutation',
fields: {
  addProduct: {
    type: queryType,
    args: {
      title: { type: graphql.GraphQLString },
      id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString)
      },
      price: { type: graphql.GraphQLString }
    },
    resolve(parent, { title, id, price }) {
      var newProduct = { title, id, price }
      products.push(newProduct)
      return products
    }
  },
  deleteProduct: {
    type: queryType,
    args: { id: { type: graphql.GraphQLString } },
    resolve(parent, { id }) {
      var prodIndex = products.findIndex(it => it.id === id)
      if (prodIndex === -1) throw new Error("Product is not found")
      var newProducts = products.splice(prodIndex, 1)
      return newProducts[0]
    }
  }
}
});

var schema = new graphql.GraphQLSchema ({
  query: queryType,
  mutation: mutation
})

module.exports = schema


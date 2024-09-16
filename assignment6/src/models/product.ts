let products: Product[] = [];

class Product {
    ProductID: number;
    title: string;
    price: number;
    description: string;


    constructor(ProductID: number, title: string, price: number, description: string) {
        this.ProductID = ProductID;
        this.title = title;
        this.price = price;
        this.description = description;
    }

    save() {
        products.push(this);
    }

    update() {
        const productIndex = products.findIndex(prod => prod.ProductID === this.ProductID);
        if (productIndex >= 0) {
            products[productIndex] = this;
        }
    }

    static fetchAll() {
        return products;
    }

    static findById(productId: number) {
        return products.find(prod => prod.ProductID === productId);
    }

    static deleteById(productId: number) {
        products = products.filter(prod => prod.ProductID !== productId);
    }
}

export default Product;

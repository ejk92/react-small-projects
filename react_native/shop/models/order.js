class Order {
    constructor(id, items, totalAmount, orderDate) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.orderDate = orderDate;
    }

    get readableDate() {
        return this.orderDate.toLocaleDateString('en-EN', {
            year: 'numeric',
            month: "long",
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};

export default Order;
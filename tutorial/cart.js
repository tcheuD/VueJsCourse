/**
 * Finds an item by product and color id in the storage
 *
 * @param {object} storage
 * @param {string} productId
 * @param {string|null} colorId
 * @return {number}
 */
const findItemIndex = (storage, productId, colorId) => (
    storage.findIndex(
        (item) => (
            item.productId === productId && item.colorId === colorId
        ),
    ));

const cart = {
    /**
     * Gets the list of all shopping cart items in an array of objects containing:
     * - productId
     * - colorId
     * - qty
     *
     * @return {object}
     */
    getItems() {
        return cart.getStorage();
    },

    /**
     * Adds a product into the cart, providing a product id, an optional color id and the quantity
     *
     * @param {string} productId
     * @param {string|null} colorId
     * @param {number} qty
     */
    addItem(productId, colorId, qty) {
        const storage = cart.getStorage();
        const itemIndex = findItemIndex(storage, productId, colorId);

        if (itemIndex !== -1) {
            storage[itemIndex].qty += qty;
        } else {
            storage.push({
                productId,
                colorId,
                qty,
            });
        }

        cart.saveStorage(storage);
    },

    /**
     * Removes an item from the shopping cart identified by productId and an optional colorId
     *
     * @param {string} productId
     * @param {string|null} colorId
     */
    removeItem(productId, colorId) {
        const storage = cart.getStorage();
        cart.saveStorage(
            storage.filter((item) => (!(item.productId === productId && item.colorId === colorId))),
        );
    },

    /**
     * Updates the qty property on a product in the cart
     *
     * @param {string} productId
     * @param {string|null} colorId
     * @param {number} qty
     */
    updateQty(productId, colorId, qty) {
        const storage = cart.getStorage();

        const cartItemIndex = findItemIndex(storage, productId, colorId);

        if (cartItemIndex === -1) {
            throw new Error(`Invalid product+color combination: ${productId}, ${colorId}`);
        }

        storage[cartItemIndex].qty = qty;
        cart.saveStorage(storage);
    },

    /**
     * Clears the shopping cart
     */
    clear() {
        cart.saveStorage([]);
    },

    /**
     * Returns the total number of items in our shopping cart
     *
     * @return {number}
     */
    totalItems() {
        return cart.getStorage().reduce((acc, item) => (acc + item.qty), 0);
    },

    /**
     * Initializes the local storage for our shopping cart
     */
    initializeStorage() {
        if (localStorage.getItem('cart') === null) {
            localStorage.setItem('cart', '[]');
        }
    },

    /**
     * Gets the local storage as an object
     *
     * @return {array}
     */
    getStorage() {
        cart.initializeStorage();
        return JSON.parse(localStorage.getItem('cart'));
    },

    /**
     * Saves the local storage in its string format
     *
     * @param {array} storage
     */
    saveStorage(storage) {
        localStorage.setItem('cart', JSON.stringify(storage));
    },
};

export default cart;

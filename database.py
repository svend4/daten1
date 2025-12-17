import sqlite3
from config import Config

def get_db_connection():
    conn = sqlite3.connect(Config.DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def get_all_products():
    conn = get_db_connection()
    products = conn.execute('SELECT * FROM products WHERE is_active = 1').fetchall()
    conn.close()
    return products

def get_product_by_id(product_id):
    conn = get_db_connection()
    product = conn.execute('SELECT * FROM products WHERE id = ?', (product_id,)).fetchone()
    conn.close()
    return product

def get_products_by_category(category_id):
    conn = get_db_connection()
    products = conn.execute(
        'SELECT * FROM products WHERE category_id = ? AND is_active = 1',
        (category_id,)
    ).fetchall()
    conn.close()
    return products

def search_products(query):
    conn = get_db_connection()
    products = conn.execute(
        'SELECT * FROM products WHERE name LIKE ? AND is_active = 1',
        (f'%{query}%',)
    ).fetchall()
    conn.close()
    return products

def get_all_categories():
    conn = get_db_connection()
    categories = conn.execute('SELECT * FROM categories').fetchall()
    conn.close()
    return categories

def create_order(customer_data, cart_items):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Create customer
        cursor.execute(
            'INSERT INTO customers (name, phone, email, address) VALUES (?, ?, ?, ?)',
            (customer_data['name'], customer_data['phone'],
             customer_data.get('email'), customer_data['address'])
        )
        customer_id = cursor.lastrowid

        # Calculate total
        total = sum(item['price'] * item['quantity'] for item in cart_items)

        # Create order
        cursor.execute(
            'INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, ?)',
            (customer_id, total, 'new')
        )
        order_id = cursor.lastrowid

        # Add order items
        for item in cart_items:
            cursor.execute(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                (order_id, item['product_id'], item['quantity'], item['price'])
            )

            # Update stock
            cursor.execute(
                'UPDATE products SET stock = stock - ? WHERE id = ?',
                (item['quantity'], item['product_id'])
            )

        conn.commit()
        return order_id
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

def get_order_by_id(order_id):
    conn = get_db_connection()
    order = conn.execute('''
        SELECT o.*, c.name as customer_name, c.phone, c.address
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        WHERE o.id = ?
    ''', (order_id,)).fetchone()

    if order:
        items = conn.execute('''
            SELECT oi.*, p.name as product_name
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        ''', (order_id,)).fetchall()
        order = dict(order)
        order['items'] = items

    conn.close()
    return order

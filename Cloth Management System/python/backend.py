#! C:\Users\shiva\AppData\Local\Programs\Python\Python313\python.exe

print("Content-Type: application/json\r\n\r\n")

import os
import sys
import json
import urllib.parse
import mysql.connector

def parse_post_data():
    content_length = int(os.environ.get('CONTENT_LENGTH', 0))
    if content_length > 0:
        post_data = sys.stdin.read(content_length)
        return urllib.parse.parse_qs(post_data)
    return {}

try:
    form_data = parse_post_data()
    cond = form_data.get('cond', [''])[0]

    # Database connection
    con = mysql.connector.connect(
        host='localhost',
        user='cloth',
        passwd='raysdebuggers',
        database='cloth_management_system'
    )
    cur = con.cursor()
    
    if cond == 'auth':
        user_id = form_data.get('user_id', [''])[0]
        password = form_data.get('password', [''])[0]
        query = "SELECT * FROM users WHERE username = %s AND password = %s"
        cur.execute(query, (user_id, password))
        result = cur.fetchone()
        response_data = {
            "success": True,
            "message": "Login Successfully!"
        } if result else {
            "success": False,
            "message": "Credentials are given wrong, please try again!"
        }
        print(json.dumps(response_data))

    elif cond == 'emp_entry':
        required_fields = ['emp_id', 'emp_name', 'emp_number', 'emp_email', 'emp_dob', 'emp_gender', 'emp_address']
        missing_fields = [field for field in required_fields if not form_data.get(field, [''])[0].strip()]

        if missing_fields:
            response_data = {
                "success": False,
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }
            print(json.dumps(response_data))
        else:
            emp_id = form_data.get('emp_id', [''])[0]
            emp_name = form_data.get('emp_name', [''])[0]
            emp_number = form_data.get('emp_number', [''])[0]
            emp_email = form_data.get('emp_email', [''])[0]
            emp_dob = form_data.get('emp_dob', [''])[0]
            emp_gender = form_data.get('emp_gender', [''])[0]
            emp_address = form_data.get('emp_address', [''])[0]

            query = """
                INSERT INTO EMPLOYEE_DETAILS (emp_id, emp_name, emp_number, emp_email, emp_dob, emp_gender, emp_address)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cur.execute(query, (emp_id, emp_name, emp_number, emp_email, emp_dob, emp_gender, emp_address))
            con.commit()
            response_data = {
                "success": True,
                "message": "Employee entry successful!"
            }
            print(json.dumps(response_data))
    elif cond == 'get_emp_id':
        try:
            cur.execute("SELECT emp_id FROM EMPLOYEE_DETAILS ORDER BY emp_id DESC LIMIT 1")
            last_id_row = cur.fetchone()

            if last_id_row:
                last_id = last_id_row[0]  # e.g., 'EMP09'
                num = int(last_id.replace("EMP", ""))
                new_id = f"EMP{num + 1:02d}"
            else:
                new_id = "EMP01"

            response_data = {
                "success": True,
                "emp_id": new_id
            }
        except Exception as e:
            response_data = {
                "success": False,
                "message": f"Error generating Employee ID: {str(e)}"
            }

        print(json.dumps(response_data))
    elif cond == 'get_cust_id':
        try:
            cur.execute("SELECT cust_id FROM customer_details ORDER BY cust_id DESC LIMIT 1")
            last_id_row = cur.fetchone()

            if last_id_row:
                last_id = last_id_row[0]  # e.g., 'CUST07'
                num = int(last_id.replace("CUST", ""))
                new_id = f"CUST{num + 1:02d}"
            else:
                new_id = "CUST01"

            response_data = {
                "success": True,
                "cust_id": new_id
            }
        except Exception as e:
            response_data = {
                "success": False,
                "message": f"Error generating Customer ID: {str(e)}"
            }

        print(json.dumps(response_data))
    elif cond == 'cust_entry':
        required_fields = ['cust_id', 'cust_name', 'cust_number', 'cust_email', 'cust_dob', 'cust_gender', 'cust_address']
        missing_fields = [field for field in required_fields if not form_data.get(field, [''])[0].strip()]

        if missing_fields:
            response_data = {
                "success": False,
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }
            print(json.dumps(response_data))
        else:
            cust_id = form_data.get('cust_id', [''])[0]
            cust_name = form_data.get('cust_name', [''])[0]
            cust_number = form_data.get('cust_number', [''])[0]
            cust_email = form_data.get('cust_email', [''])[0]
            cust_dob = form_data.get('cust_dob', [''])[0]
            cust_gender = form_data.get('cust_gender', [''])[0]
            cust_address = form_data.get('cust_address', [''])[0]

            query = """
                INSERT INTO CUSTOMER_DETAILS (cust_id, cust_name, cust_number, cust_email, cust_dob, cust_gender, cust_address)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cur.execute(query, (cust_id, cust_name, cust_number, cust_email, cust_dob, cust_gender, cust_address))
            con.commit()
            response_data = {
                "success": True,
                "message": "Customer entry successful!"
            }
            print(json.dumps(response_data))
    elif cond == 'order_entry':
        required_fields = ['shop_name', 'shop_number', 'shop_owner_name','shop_address']
        missing_fields = [field for field in required_fields if not form_data.get(field, [''])[0].strip()]

        if missing_fields:
            response_data = {
                "success": False,
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }
            print(json.dumps(response_data))
        else:
            shop_name = form_data.get('shop_name', [''])[0]
            shop_owner_name = form_data.get('shop_owner_name', [''])[0]
            shop_number = form_data.get('shop_number', [''])[0]
            shop_address = form_data.get('shop_address', [''])[0]

            query = """
                INSERT INTO ORDER_DETAILS (shop_name, shop_number, shop_owner_name,shop_address)
                VALUES (%s, %s, %s, %s)
            """
            cur.execute(query, (shop_name, shop_number, shop_owner_name, shop_address))
            con.commit()
            response_data = {
                "success": True,
                "message": "Order entry successful!"
            }
            print(json.dumps(response_data))
    elif cond == 'get_prd_id':
        try:
            cur.execute("SELECT prd_id FROM PRODUCT_DETAILS ORDER BY prd_id DESC LIMIT 1")
            last_id_row = cur.fetchone()

            if last_id_row:
                last_id = last_id_row[0]  # e.g., 'CUST07'
                num = int(last_id.replace("PROD", ""))
                new_id = f"PROD{num + 1:02d}"
            else:
                new_id = "PROD01"

            response_data = {
                "success": True,
                "prd_id": new_id
            }
        except Exception as e:
            response_data = {
                "success": False,
                "message": f"Error generating Product ID: {str(e)}"
            }

        print(json.dumps(response_data))
    elif cond == 'prd_entry':
        required_fields = ['prd_id', 'prd_name', 'prd_cat', 'prd_quantity', 'prd_price']
        missing_fields = [field for field in required_fields if not form_data.get(field, [''])[0].strip()]

        if missing_fields:
            response_data = {
                "success": False,
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }
            print(json.dumps(response_data))
        else:
            prd_id = form_data.get('prd_id', [''])[0]
            prd_name = form_data.get('prd_name', [''])[0]
            prd_cat = form_data.get('prd_cat', [''])[0]
            prd_quantity = form_data.get('prd_quantity', [''])[0]
            prd_price = form_data.get('prd_price', [''])[0]

            query = """
                INSERT INTO PRODUCT_DETAILS (prd_id, prd_name, prd_cat, prd_quantity, prd_price)
                VALUES (%s, %s, %s, %s, %s)
            """
            cur.execute(query, (prd_id, prd_name, prd_cat, prd_quantity, prd_price))
            con.commit()
            response_data = {
                "success": True,
                "message": "Product entry successful!"
            }
            print(json.dumps(response_data))
    else:
        response_data = {
            "success": False,
            "message": "Invalid request!"
        }
        print(json.dumps(response_data))

except Exception as e:
    print(json.dumps({"success": False, "message": f"An error occurred: {str(e)}"}))

finally:
    if 'cur' in locals():
        cur.close()
    if 'con' in locals() and con.is_connected():
        con.close()
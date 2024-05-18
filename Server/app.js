const express = require("express");
// var app = express.Router()
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql");
const session = require("express-session")
const { contentType } = require("express/lib/response");
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(fileUpload());

// parse application/json
app.use(bodyParser.json());
// app.use(express.urlencoded({extended:false}))

//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookstoredb'
});


//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});

app.use(express.static('views'))
app.use(express.static('public'))

//************************************************************************************************************************************ */
//ADMIN
//************************************************************************************************************************************ */
//Admin Auth
app.get('/admin-auth', function (req, res, next) {
  if (session.admin_email !== undefined) {
    res.send('success')
  } else {
    res.send('fail')
  }
})

//Admin_Login------------------------------------------------------------------------------------------------------


app.post('/admin-login', function (req, res, next) {
  let { email, password } = req.body;

  let select = "SELECT * FROM admin_table WHERE email='" + email + "'"
  conn.query(select, (err, rows) => {
    if (err)
      if (err) throw err;

    if (rows.length > 0) {
      if (rows[0].password === password) {

        session.admin_email = email;
        // session.fullname = rows[0].name;

        res.send('success');
      } else {
        res.send('invalid');
      }
    } else {
      res.send('invalid');
    }
  });
});

app.get('/admin-logout', function (req, res, next) {
  session.admin_email = undefined;
  res.send('true')
});

app.post('/admin-change-password-action', function (req, res, next) {
  let { oldpassword, newpassword, confirmpassword } = req.body;

  let email = session.admin_email;

  let select = "SELECT * FROM `admin_table` WHERE email='" + email + "' AND password='" + oldpassword + "'";
  conn.query(select, (err, rows) => {
    if (err) throw err;

    if (rows.length > 0) {
      if (newpassword !== confirmpassword) {
        res.send('notmatch');
      } else {
        if (oldpassword === newpassword) {
          res.send('notsame');
        } else {
          let update = "UPDATE `admin_table` SET `password`='" + newpassword + "' WHERE `email`='" + email + "'";
          conn.query(update, (err) => {
            if (err) throw err;

            res.send('success');
          });
        }
      }
    } else {
      res.send('invalidpassword');
    }
  });
});



//------------------------------------------------------------------------------------------------------


// add Categories-------------------------------------------------------------------------------
app.post('/add-category', (req, res) => {
  console.log(req.body)
  let { category_name, description } = req.body
  let InsertSQL = "INSERT INTO `category_table` (category_name, description) VALUES ('" + category_name + "','" + description + "')"
  conn.query(InsertSQL, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 300, "error": null, "response": results }));
  });
  // } else {
  //   let updateSQL = ''

  //   updateSQL = "UPDATE `products` SET `product_name`='" + productname + "',`price`='" + price + "',`discount`='" + discount + "',`subcategory_id`='" + subcategory + "' WHERE `product_id`='" + productid + "'"
  //   conn.query(updateSQL, (err) => {
  //     if (err) throw err;

  //     res.send('updated');
  //   });


  // }

})

//-----------------------------------------------------------------------------------------------------------
//Delete Categories----------------------------------------
app.get('/delete-category', function (req, res, next) {
  let category_name = req.query.category_name;

  let deleteSQL = "DELETE FROM `category_table` WHERE `category_name` ='" + category_name + "'";
  conn.query(deleteSQL, (err) => {
    if (err) throw err;

    res.send('deleted');
  });
});
//--------------------------------------------------------------------------------------------------
// 



//Edit categories-----------------------------------------------------------------------------------
app.post('/update-category', function (req, res, next) {
  console.log(req.body);
  let { category_name, description } = req.body;

  if (category_name === "" || description === "") {
    res.send("required");
  } else {
    let update = "UPDATE `category_table` SET `category_name`='" + category_name + "',`description`='" + description + "' WHERE `category_id`='" + category_id + "'";
    conn.query(update, function (error) {
      if (error) throw error;

      res.send(' Category Details Updated Successfully');
    });
  }
});

//------------------------------------------------------------------------------------------------------
//add books---------------------------------------------------------------------------------------------

app.post('/addbooks', function (req, res) {
  console.log(req.body);
  let book_name = req.body.book_name
  let book_description = req.body.book_description
  let book_category = req.body.book_category
  let book_author = req.body.book_author
  let book_price = req.body.book_price
  let book_status = req.body.book_status

  // let {book_name, book_description ,book_category,book_author,book_price,book_status} = req.body;

  // if (action === 'add') {
  let book_image = req.files.book_image;

  let serverPath = 'public/images/' + book_image.name;
  let databsePath = 'images/' + book_image.name;

  book_image.mv(serverPath, (err) => {
    if (err) throw err;
  });

  let insert = "INSERT INTO books_table(book_id,book_name, book_description ,book_category,book_author,book_price,book_status,book_image) " +
    "VALUES (null,'" + book_name + "','" + book_description + "','" + book_category + "','" + book_author + "','" + book_price + "','" + book_status + "','" + databsePath + "')"
  conn.query(insert, (err) => {
    if (err) throw err;

    res.send('added');
  });
  // }
  // } else {
  //     let updateSQL = '';

  //     if (req.files !== null) {
  //         let book_image = req.files.photo;

  //         let serverPath = 'public/images/' + book_image.name;
  //         let databsePath = 'images/' + book_image.name;

  //         book_image.mv(serverPath, (err) => {
  //             if (err) throw err;
  //         });


  //         updateSQL = "UPDATE `products` SET `product_name`='" + productname + "',`price`='" + price + "',`discount`='" + discount + "',photo='" + databsePath + "',`subcategory_id`='" + subcategory + "' WHERE `product_id`='" + productid + "'"
  //     } else {
  //         updateSQL = "UPDATE `products` SET `product_name`='" + productname + "',`price`='" + price + "',`discount`='" + discount + "',`subcategory_id`='" + subcategory + "' WHERE `product_id`='" + productid + "'"
  //     }

  //     conn.query(updateSQL, (err) => {
  //         if (err) throw err;

  //         res.send('updated');
  //     });
  // }
});

//Edit book-----------------------------------------------------------------------------------
app.post('/update-book', function (req, res) {
  console.log(req.body);
  let { book_id, book_name, book_description, book_category, book_author, book_price } = req.body;

  let updateSQL = ''

  //     updateSQL = "UPDATE `products` SET `product_name`='" + productname + "',`price`='" + price + "',`discount`='" + discount + "',`subcategory_id`='" + subcategory + "' WHERE `product_id`='" + productid + "'"
  //     conn.query(updateSQL, (err) => {
  //       if (err) throw err;

  //       res.send('updated');
  //     });

  if (book_name === "" || book_description === "" || book_category === "" || book_author === "" || book_price === "") {
    res.send("required");
  } else {
    let update = "UPDATE `books_table` SET `book_name`='" + book_name + "',`book_description`='" + book_description + "',`book_category`='" + book_category + "',`book_author`='" + book_author + "',`book_price`='" + book_price + "' WHERE book_id='" + book_id + "'";
    console.log(update)
    conn.query(update, function (error) {
      if (error) throw error;

      res.send(' Book Details Updated Successfully');
    });
  }
});
//Delete Books----------------------------------------
app.get('/delete-book', function (req, res, next) {
  let book_name = req.query.book_name;

  let deleteSQL = "DELETE FROM books_table WHERE book_name ='" + book_name + "'";
  conn.query(deleteSQL, (err) => {
    if (err) throw err;

    res.send('deleted');
  });
});
//--------------------------------------------------------------------
// app.post('/updatestatus', function(req,res){
//   console.log(req.body);
//   let {status}=req.body
//   let update = "UPDATE `order_table` SET `order_status`='" + status + "'"
//   conn.query(update, (err, results) => {
//     if (err) throw err;
//     res.send("Updated");
// })
// });
app.get('/changeOrderStatus', function (req, res, next) {
  let { order_id, status } = req.query;
  let update = "UPDATE `order_table` SET `order_status`='" + status + "' WHERE order_id='" + order_id + "'";
  conn.query(update, function (error) {
    if (error) throw error;
    res.send('Order Status Updated');
  });
});

//************************************************************************************************************************************ */
//USER
//User Auth
app.get('/user-auth', function (req, res, next) {
  if (session.user_email !== undefined) {
    res.send('success')
  } else {
    res.send('fail')
  }
})

//User_Login------------------------------------------------------------------------------------------------------
app.post('/user-login', function (req, res, next) {
  let { email, password } = req.body;

  let select = "SELECT * FROM user_table WHERE email='" + email + "'"
  conn.query(select, (err, rows) => {
    if (err)
      if (err) throw err;

    if (rows.length > 0) {
      if (rows[0].password === password) {

        session.user_email = email;
        // session.fullname = rows[0].name;

        res.send('success');
      } else {
        res.send('invalid');
      }
    } else {
      res.send('invalid');
    }
  });
});


app.get('/user-logout', function (req, res, next) {
  session.user_email = undefined;
  res.send('true')
});

app.post('/user-change-password-action', function (req, res, next) {
  console.log(req.body);
  let { oldpassword, newpassword, confirmpassword } = req.body;

  let email = session.user_email;

  let select = "SELECT * FROM `user_table` WHERE email='" + email + "' AND password='" + oldpassword + "'";
  conn.query(select, (err, rows) => {
    if (err) throw err;

    if (rows.length > 0) {
      if (newpassword !== confirmpassword) {
        res.send('notmatch');
      } else {
        if (oldpassword === newpassword) {
          res.send('notsame');
        } else {
          let update = "UPDATE `user_table` SET `password`='" + newpassword + "' WHERE `email`='" + email + "'";
          conn.query(update, (err) => {
            if (err) throw err;

            res.send('success');
          });
        }
      }
    } else {
      res.send('invalidpassword');
    }
  });
});

//Forgot Password User
app.post('/user-forgot-password-action', function (req, res, next) {
  console.log(req.body);
  let { email } = req.body;

  let select = "SELECT * FROM `user_table` WHERE email='" + email + "'";
  conn.query(select, (err, rows) => {
    if (err) throw err;

    if (rows.length > 0) {
      let characters = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm@#$%&[]{}()";
      let new_password = "";

      let userEmail = rows[0].email;
      let oldpassword = rows[0].password;

      let length = characters.length;

      for (let i = 1; i <= 8; i++) {
        let index = Math.floor(Math.random() * length);

        new_password += characters[index];
      }
      console.log(new_password);
      var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: 'vmm.testing.email@gmail.com',
          pass: 'otp@1234'
        },
        // === add this === //
        tls: { rejectUnauthorized: false }
      });

      // const transport = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: "crowlake7@gmail.com",
      //     pass: "_@_shajju_313384_kushdum"
      //   }
      // });
      const options = {
        from: "vmm.testing.email@gmail.com",
        to: userEmail,
        // to: "parmodgahlot77@gmail.com,parmodgahlot2000@gmail.com",
        subject: "Node Js Email Testing",
        // text:"Hello World"
        // text:"New Password : " + oldpassword
        text: "New Password : " + new_password
        // html :"<h1 style='color: #00B7FF'>New Password</h1><p>Your new password <span style='color: red'>" + newPassword + "</span></p>"
      }
      smtpTransport.sendMail(options, (err) => {
        if (err) {
          console.log(err);
          res.send('error');
        } else {
          let update = "UPDATE `user_table` SET password='" + new_password + "'WHERE email='" + email + "'";
          conn.query(update, err => {
            if (err) throw err;

            console.log("Email Sent Successfully.");
            res.send('success');
          });
        }
      });

    } else {
      res.send("Invalid Email");
    }
  });
});

//CART************************************************************************
//remove-cart-product
app.get('/remove-cart-product', function (req, res) {
  console.log(req.query);

  let tempArray = [];
  let cartArr = session.cart;
  let book_id = req.query.book_id;
  console.log(book_id);
  tempArray = cartArr.filter(item => item.book_id != book_id);
  session.cart = tempArray;
  res.send('removed');
})
// calculatetotal
const calculateTotal = (cart) => {
  let total = 0;

  for (let item of cart) {
    total += item.book_price;
    // total += item.totalprice;
  }

  return total;
}
//get-cart-count
app.get('/get-cart-count', function (req, res) {
  if (session.cart !== undefined) {
    let total = calculateTotal(session.cart);

    res.send(session.cart);
    console.log(session.cart);
  } else {
    res.send([]);
  }
});

//get-cart-products
app.get('/get-cart-products', function (req, res) {
  if (session.cart !== undefined) {
    let total = calculateTotal(session.cart);
    res.send({ cart: session.cart, user_email: session.user_email, total, });
  } else {
    res.send([], 'no data');
  }
});

//checkout
app.get('/checkout', function (req, res) {
  if (session.user_email !== undefined) {
    res.send('success');
  } else {
    res.send('failed');
  }
  console.log(res);
})
//add-to-cart
app.get('/add-to-cart', function (req, res) {
  console.log(req.query);
  // let quantity = req.body.quantity;
  let book_id = req.query.book_id;
  let cartArray = [];
  // console.log(product_id);

  if (session.cart !== undefined) {
    cartArray = session.cart;
  }
  let action = req.query.action;


  if (action === "plus") {
    let qty = "";
    // let qty = Math.min(1, Math.max(5, qty));
    for (let i = 0; i < cartArray.length; i++) {
      console.log(typeof cartArray[i].book_id)
      console.log(typeof book_id)
      if (cartArray[i].book_id === parseInt(book_id)) {

        cartArray[i].quantity += 1;
        cartArray[i].totalprice = parseFloat(cartArray[i].book_price) * cartArray[i].quantity;
        qty = cartArray[i].quantity;

      }
    }
    session.cart = cartArray;
    let total = calculateTotal(session.cart);
    console.log(cartArray);
    res.send({ res: 'plus success', total: total, qty: qty });
  }
  else if (action === "minus") {
    // let qty = "";
    // let qty = Math.min(1, Math.max(5, qty));
    for (let i = 0; i < cartArray.length; i++) {
      if (cartArray[i].book_id === parseInt(book_id)) {
        cartArray[i].quantity -= 1;
        cartArray[i].totalprice = parseFloat(cartArray[i].book_price) * cartArray[i].quantity;

        // qty = cartArray[i].quantity;
      }
    }

    session.cart = cartArray;
    let total = calculateTotal(session.cart);
    res.send({ res: 'minus success', total: total });
    //********************************************************** */
    // if (cartArray[i].quantity >= 4) {
    //   req.send('disableplus')
    // }
    // if (cartArray[i].quantity <= 1) {
    //   req.send('disableminus')
    // }
    //********************************************************** */
  } else {

    let selectSQl = "SELECT * FROM `books_table` WHERE book_id='" + book_id + "'";
    conn.query(selectSQl, (err, data) => {
      if (err) throw err;
      let FLAG = false;
      for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].book_id == book_id) {
          cartArray[i].quantity += 1
          cartArray[i].totalprice = parseFloat(cartArray[i].book_price) * cartArray[i].quantity;
          FLAG = true;
          break;
        }

      }
      if (FLAG == false) {
        let book_object = {
          book_id: data[0].book_id,
          book_name: data[0].book_name,
          book_image: data[0].book_image,
          book_price: data[0].book_price,
          book_description: data[0].book_description,
          book_author: data[0].book_author,
          quantity: 1,
          totalprice: parseFloat(data[0].book_price)
        }

        cartArray.push(book_object);

      }


      session.cart = cartArray;
      res.send(cartArray);

    })
  }
})



//CART-end**************************************************************************************************************************
//get product search
app.get('/fetch-product2/(:searchinput)', function (req, res) {
  let searchInput = req.params.searchinput
  let selectSQL = "SELECT books_table.*,category_table.category_name FROM books_table,category_table where books_table.book_category=category_table.category_id and (books_table.book_name LIKE '%" + searchInput + "%' or books_table.book_description LIKE '%" + searchInput + "%')";
  console.log(selectSQL)
  conn.query(selectSQL, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
})
//Place Order
app.post('/place-order', function (req, res) {
  console.log(req.body);
  let { mobile, address, pincode, payment_method, total_price } = req.body;
  email = session.user_email;
  dt = new Date();
  date1 = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
  let status = 'pending';
  let insert1 = "INSERT INTO `order_table`(`user_email`,`date`, `mobile_number`, `billing_address`,`pincode`,`payment_method`, `total_amount`, `order_status`) VALUES ('" + email + "','" + date1 + "','" + mobile + "','" + address + "','" + pincode + "','" + payment_method + "','" + total_price + "','" + status + "')";
  console.log(insert1)
  conn.query(insert1, (err, row) => {
    if (err) throw err;
    console.log(row);
    let lastOrderID = row.insertId;
    let sessionCart = session.cart;
    sessionCart.forEach(item => {
      let {
        // category_id,
        // subcategoryid,
        book_id,
        // product_name,
        book_image,
        book_price,
        quantity,

        // description,
        // status
      } = item;
      let insert2 = "INSERT INTO `order_detail_table`(`product_id`, `quantity`, `price`, `amount`, `photo`, `order_id`) VALUES ('" + book_id + "','" + quantity + "','" + book_price + "','" + book_price + "','" + book_image + "','" + lastOrderID + "')";
      conn.query(insert2, err => {
        if (err) throw err;

      })
    })
    session.cart = undefined;
    res.send('success');
  })
})
//------------------------------------------------------------------------------------------------------
//fetch-orderdetails to view orderdetails
app.get('/fetch-order-details', function (req, res) {
  email = session.user_email;
  let SelectSQL = "SELECT * FROM `order_table` WHERE user_email='" + email + "'";
  conn.query(SelectSQL, (err, data) => {
    if (err) throw err;
    // console.log(data);
    if (data.length > 0) {
      res.send(data);
    } else {
      res.send('no data');
    }
  })
})

//fetch-orderdetails to view orderdetails
app.get('/fetch-order-details-admin', function (req, res) {
  email = session.user_email;
  let SelectSQL = "SELECT * FROM `order_table`";
  conn.query(SelectSQL, (err, data) => {
    if (err) throw err;
    // console.log(data);
    if (data.length > 0) {
      res.send(data);

    } else {
      res.send('no data');
    }
  })
})
//************************************************************************************************************************************ */


//************************************************************************************************************************************ */
//PUBLIC
//add Admin------------------------------------------------------------------------------------
app.post('/adminreg', (req, res) => {
  console.log(req.body)
  let { email, password, fullname, mobile, admin_type } = req.body
  let InsertSQL = "INSERT INTO admin_table (email, password, fullname, mobile_number, admin_type) VALUES ('" + email + "','" + password + "','" + fullname + "','" + mobile + "','" + admin_type + "')"
  conn.query(InsertSQL, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});
//--------------------------------------------------------------------------------------------
//add User------------------------------------------------------------------------------------
app.post('/userreg', (req, res) => {
  console.log(req.body)
  let { email, password, fullname, mobile_number, otp, address, city, pincode, gender } = req.body
  let InsertSQL = "INSERT INTO user_table (email, password, fullname, mobile_number, otp ,address,city,pincode,gender) VALUES ('" + email + "','" + password + "','" + fullname + "','" + mobile_number + "','" + otp + "','" + address + "','" + city + "','" + pincode + "','" + gender + "')"
  conn.query(InsertSQL, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});
//----------------------------------------------------------------------------------------------

//view Categories--------------------------------------------------------------------------------------------
app.get('/get-category', function (req, res, next) {
  let selectSQL = "SELECT * FROM category_table"
  // let selectSQL = "SELECT * FROM category_table where category_id='"+category_id+"'"
  console.log(selectSQL)
  conn.query(selectSQL, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
})
//---------------------------------------------------------
//Fetch Subcategory to add Product
app.get('/fetch-category', function (req, res, next) {
  let Categoryid = req.query.Categoryid;
  let selectSQL = "SELECT * FROM `category_table`"
  console.log(selectSQL)
  conn.query(selectSQL, (err, data) => {
    if (err) throw err;
    console.log(data);
    if (data.length > 0) {
      res.send(data);
    } else {
      res.send([]);
    }
  })
});

//view Books--------------------------------------------------------------------------------------------
app.get('/get-book', function (req, res, next) {
  let selectSQL = "SELECT *,category_name FROM books_table,category_table where books_table.book_category=category_table.category_id"
  // let selectSQL = "SELECT * FROM category_table where category_id='"+category_id+"'"
  console.log(selectSQL)
  conn.query(selectSQL, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
})
//---------------------------------------------------------

//Get categories by ID-------------------------------------

app.get('/getcategorybyid', function (req, res, next) {
  category_id = req.query.category_id
  // let selectSQL = "SELECT * FROM category_table"
  let selectSQL = "SELECT * FROM category_table where category_id='" + category_id + "'"
  console.log(selectSQL)
  conn.query(selectSQL, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
})
//---------------------------------------------------------

//Get book by ID-------------------------------------

app.get('/getbookbyid', function (req, res, next) {
  book_id = req.query.book_id;
  // console.log(book_id);
  // let selectSQL = "SELECT * FROM category_table"
  let selectSQL = "SELECT * FROM books_table where book_id='" + book_id + "'";
  console.log(selectSQL)
  conn.query(selectSQL, (err, rows) => {
    if (err) throw err;
    res.send(rows);
    // console.log(rows);
  });
})
//----------------------------------------

//Get user by email-------------------------------------

app.get('/getuserbyemail', function (req, res, next) {
  let email = session.user_email;
  // email = req.query.email
  // let selectSQL = "SELECT * FROM category_table"
  let selectSQL = "SELECT * FROM user_table where email='" + email + "'"
  console.log(selectSQL)
  conn.query(selectSQL, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
})
//---------------------------------------------------------
{
  // app.get('/add-to-cart', function (req, res, next) {
  //   console.log(req.query);

  //   let book_id = req.query.book_id;

  //   var cartArray = [];

  //   if (session.cart !== undefined) {
  //       cartArray = session.cart;
  //   }

  //   let action = req.query.action;

  //   if (action === 'remove') {

  //       let tempArray = [];

  //       tempArray = cartArray.filter(item => item.book_id !== book_id);

  //       // session.cart = tempArray;

  //       res.send('removed');
  //   } else if (action === 'plus') {
  //       for (let i = 0; i < cartArray.length; i++) {
  //           if (cartArray[i].book_id === book_id) {
  //               cartArray[i].qunatity += 1;
  //           }
  //       }

  //       // session.cart = cartArray;
  //       res.send('plus success');
  //   } else if (action === 'minus') {
  //       for (let i = 0; i < cartArray.length; i++) {
  //           if (cartArray[i].book_id === book_id) {
  //               cartArray[i].qunatity -= 1;
  //           }
  //       }

  //       // session.cart = cartArray;
  //       res.send('minus success');
  //   } else {
  //   let selectSQL = "SELECT * FROM `books_table` WHERE book_id='" + book_id + "'";
  //   conn.query(selectSQL, (err, data) => {
  //     if (err) throw err;

  //     let book_Object = {
  //       book_id: book_id,
  //       book_name: data[0].book_name,
  //       book_price: data[0].book_price,
  //       // discount: rows[0].discount,
  //       book_image: data[0].book_image,
  //       // qunatity: 1
  //     }
  //     if (cartArray[i].book_id === book_id) {

  //     } else {
  //       cartArray.push(book_Object);
  //     }

  //     console.log(cartArray)
  //     session.cart = cartArray;

  //     res.send(cartArray);
  //   });
  //   }
  // });
}
//************************************************************************************************************************************ */

{
  // let book_name = req.body.book_name
  //   let book_description = req.body.book_description
  //   let book_category = req.body.book_category
  //   let book_author = req.body.book_author
  //   let book_price = req.body.book_price
  //   let book_status = req.body.book_status




  // add books-------------------------------------------------------------------------------
  // app.post('/addbooks', (req, res) => {
  //   console.log(req.body)
  //   let { book_name, book_description ,book_category,book_author,book_price,book_status,book_image} = req.body
  //   if (action === 'add') {
  //     let InsertSQL = "INSERT INTO category_table (book_name, book_description ,book_category,book_author,book_price,book_status,book_image) VALUES ('" + book_name + "','" + book_description + "','" + book_category + "','" + book_author + "','" + book_price + "','" + book_status + "','" + book_image + "')"
  //     conn.query(InsertSQL, (err, results) => {
  //       if (err) throw err;
  //       res.send(JSON.stringify({ "status": 300, "error": null, "response": results }));
  //     });
  //   } else {
  //     let updateSQL = ''

  //     updateSQL = "UPDATE `products` SET `product_name`='" + productname + "',`price`='" + price + "',`discount`='" + discount + "',`subcategory_id`='" + subcategory + "' WHERE `product_id`='" + productid + "'"
  //     conn.query(updateSQL, (err) => {
  //       if (err) throw err;

  //       res.send('updated');
  //     });


  //   }

  // })
}
//------------------------------------------------------------------------------------------------------
//Port==================================================================================================

app.listen(3001, () => {
  console.log("Server running successfully on 3001");
});
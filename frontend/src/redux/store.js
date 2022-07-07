import {configureStore, createSlice} from '@reduxjs/toolkit'
import axois from 'axios'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    productList: {
      loading: false,
      error: null,
      products: [],
      page: '',
      pages: '',
    },
    productDetail: {
      loading: false,
      error: null,
      product: {},
    },
    productDelete: {
      loading: false,
      error: null,
      success: false,
    },
    productCreate: {
      loading: false,
      error: null,
      success: false,
      newProduct: {},
    },
    productEdit: {
      loading: false,
      error: null,
      success: false,
    },
    productReview: {
      loading: false,
      error: null,
      success: false,
    },
    topProduct: {
      loading: false,
      error: null,
      products: [],
    },
  },
  reducers: {
    productsListRequest: ({ productList }, action) => {
      productList.loading = true
    },
    productsListSuccess: ({ productList }, { payload }) => {
      productList.loading = false
      productList.products = payload.products
      productList.page = payload.page
      productList.pages = payload.pages
    },
    productsListFail: ({ productList }, { payload }) => {
      productList.loading = false
      productList.error = payload
    },
    //product details reducers
    productDetailRequest: ({ productDetail }, action) => {
      productDetail.loading = true
    },
    productDetailSuccess: ({ productDetail }, { payload }) => {
      productDetail.loading = false
      productDetail.product = payload
    },
    productDetailFail: ({ productDetail }, { payload }) => {
      productDetail.loading = false
      productDetail.error = payload
    },
    productDeleteRequest: ({ productDelete }, action) => {
      productDelete.loading = true
    },
    productDeleteSuccess: ({ productDelete }, { payload }) => {
      productDelete.loading = false
      productDelete.error = null
      productDelete.success = true
    },
    productDeleteFail: ({ productDelete }, { payload }) => {
      productDelete.loading = false
      productDelete.error = payload
    },
    productDeleteReset: ({ productDelete }) => {
      productDelete.loading = false
      productDelete.error = null
      productDelete.success = false
    },
    productCreateRequest: ({ productCreate }, action) => {
      productCreate.loading = true
    },
    productCreateSuccess: ({ productCreate }, { payload }) => {
      productCreate.loading = false
      productCreate.error = null
      productCreate.success = true
      productCreate.newProduct = payload
    },
    productCreateFail: ({ productCreate }, { payload }) => {
      productCreate.loading = false
      productCreate.error = payload
    },
    productCreateReset: ({ productCreate }) => {
      productCreate.loading = false
      productCreate.error = null
      productCreate.success = false
      productCreate.newProduct = {}
    },
    productEditRequest: ({ productEdit }, action) => {
      productEdit.loading = true
    },
    productEditSuccess: ({ productEdit }, { payload }) => {
      productEdit.loading = false
      productEdit.error = null
      productEdit.success = true
    },
    productEditFail: ({ productEdit }, { payload }) => {
      productEdit.loading = false
      productEdit.error = payload
    },
    productEditReset: ({ productEdit }) => {
      productEdit.loading = false
      productEdit.error = null
      productEdit.success = false
    },
    productReviewRequest: ({ productReview }, action) => {
      productReview.loading = true
    },
    productReviewSuccess: ({ productReview }, { payload }) => {
      productReview.loading = false
      productReview.error = null
      productReview.success = true
    },
    productReviewFail: ({ productReview }, { payload }) => {
      productReview.loading = false
      productReview.error = payload
    },
    productReviewReset: ({ productReview }) => {
      productReview.loading = false
      productReview.error = null
      productReview.success = false
    },
    topProductsRequest: ({ topProduct }, action) => {
      topProduct.loading = true
    },
    topProductSuccess: ({ topProduct }, { payload }) => {
      topProduct.loading = false
      topProduct.error = null
      topProduct.products = payload
    },
    topProductFail: ({ topProduct }, { payload }) => {
      topProduct.loading = false
      topProduct.error = payload
    },
  },
})

export const {
  productDeleteReset,
  productCreateReset,
  productEditReset,
  productReviewReset,
} = productSlice.actions

export const getTopProducts  = () => {
  return async (dispatch, getState) => {
   
    dispatch(productSlice.actions.topProductsRequest())
   
   
    try {
      const { data } = await axois.get(
        `/api/products/top`,
      )

      dispatch(productSlice.actions.topProductSuccess(data))
    } catch (error) {
      dispatch(
        productSlice.actions.topProductFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}



export const addReview = (review,productID) => {
  return async (dispatch, getState) => {
    dispatch(productSlice.actions.productReviewRequest())
    const userLogin = getState().user.userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authtoken: `Bearer ${userLogin.userInfo.token}`,
      },
    }
    try {
      const { data } = await axois.put(
        `/api/products/${productID}/reviews`,
        review,
        config
      )

      dispatch(productSlice.actions.productReviewSuccess())
    } catch (error) {
      dispatch(
        productSlice.actions.productReviewFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const editProduct = (product,productID) => {
  return async (dispatch, getState) => {
    dispatch(productSlice.actions.productEditRequest())
    const userLogin = getState().user.userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authtoken: `Bearer ${userLogin.userInfo.token}`,
      },
    }
    try {
      const { data } = await axois.put(`/api/products/${productID}`, product, config)

      dispatch(productSlice.actions.productEditSuccess())
    } catch (error) {
      dispatch(
        productSlice.actions.productEditFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const createProduct = () => {
  return async (dispatch, getState) => {
    dispatch(productSlice.actions.productCreateRequest())
    const userLogin = getState().user.userLogin
    const config = {
      headers: {
        authtoken: `Bearer ${userLogin.userInfo.token}`,
      },
    }
    try {
      const { data } = await axois.post(`/api/products`,{}, config)

      dispatch(productSlice.actions.productCreateSuccess(data))
    } catch (error) {
      dispatch(
        productSlice.actions.productCreateFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const deleteProduct = (id) => {
  return async (dispatch,getState) => {
    dispatch(productSlice.actions.productDeleteRequest())
     const userLogin = getState().user.userLogin
    const config = {
      headers: {
        authtoken: `Bearer ${userLogin.userInfo.token}`,
      },
    }
    try {
      const { data } = await axois.delete(`/api/products/${id}`,config)

      dispatch(productSlice.actions.productDeleteSuccess())
    } catch (error) {
      dispatch(
        productSlice.actions.productDeleteFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const fetchAllProducts = (keyword='',pageNumber='') => {
  
    return async (dispatch) => {
        dispatch(productSlice.actions.productsListRequest())
        try {
            const { data } = await axois.get(`/api/products?keyword=${keyword}&&page=${pageNumber}`)
           
            dispatch(productSlice.actions.productsListSuccess(data))
        } catch (error) {
           dispatch(
             productSlice.actions.productsListFail(
               error.response && error.response.data.message
                 ? error.response.data.message
                 : error.message
             )
           )
        }
    }
}

export const fetchProductDetail = (id) => {
  return async (dispatch) => {
    dispatch(productSlice.actions.productDetailRequest())
    try {
      const { data } = await axois.get(`/api/products/${id}`)
      
      dispatch(productSlice.actions.productDetailSuccess(data))
    } catch (error) {
     
      dispatch(productSlice.actions.productDetailFail( 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,))
    }
  }
}

const cartInitialItem = JSON.parse(localStorage.getItem('cartItems'))

const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))

const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))

const cartSlice = createSlice({
  name:'cart',
  initialState:{
    cartItems: cartInitialItem ? cartInitialItem : [],
    shippingAddress: shippingAddress ? shippingAddress : {},
    paymentMethod: paymentMethod ? paymentMethod : null
  },
  reducers:{
    addItemToCart: (state,{payload}) => {
    
      const existingItem = state.cartItems.find((item) => item.product_id === payload.product_id);
      if(existingItem){
        state.cartItems = state.cartItems.map((item) => {
          if(item.product_id === existingItem.product_id){
            return payload;
          }
          else {
            return item;
          }
        })
      }
      else{
        state.cartItems = [...state.cartItems,payload]     
      }
    },
    removeItemFromCart: (state,{payload}) => {
        state.cartItems = state.cartItems.filter((item) => item.product_id != payload)
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    saveShippingAddress: (state,{payload}) => {
      state.shippingAddress = payload
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.shippingAddress)
      )
    },
    savePaymentMethod: (state,{payload}) => {
      state.paymentMethod = payload
      localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
    },
    resetCartDetails: (state) => {
      state.cartItems = []
      state.paymentMethod = null
      state.shippingAddress = {}
    }
  }
})

export const {removeItemFromCart,saveShippingAddress,savePaymentMethod} = cartSlice.actions;

export const addToCart = (id,qty)=>{
  return async (dispatch,getState) => {
    
    const {data} = await axois.get(`/api/products/${id}`)
  
    dispatch(
      cartSlice.actions.addItemToCart({
        product_id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty,
      })
    )
    const state = getState()
     localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems))
    
  }
}

const userInfo = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userLogin: {
      loading: false,
      error: null,
      userInfo: userInfo,
    },
    userRegister: {
      loading: false,
      error: null,
      userInfo: null,
    },
    userDetails: {
      loading: false,
      error: null,
      userInfo: null,
    },
    userUpdateDetails: {
      success: false,
      loading: false,
      error: null,
    },
    userList: {
      loading: false,
      error: null,
      users: [],
    },
    userDelete: {
      loading: false,
      error: null,
      success: false,
    },
    userUpdateByAdmin: {
      loading: false,
      error: null,
      success: false,
    },
  },
  reducers: {
    userLoginRequest: ({ userLogin }, { payload }) => {
      userLogin.loading = true
    },
    userLoginSuccess: ({ userLogin }, { payload }) => {
      userLogin.loading = false
      userLogin.error = null
      userLogin.userInfo = payload
    },
    userLoginFailure: ({ userLogin }, { payload }) => {
      userLogin.loading = false
      userLogin.userInfo = null
      userLogin.error = payload
    },
    resetUserLogin: ({ userLogin }) => {
      userLogin.loading = false
      userLogin.userInfo = null
      userLogin.error = null
    },

    userRegisterRequest: ({ userRegister }, { payload }) => {
      userRegister.loading = true
    },
    userRegisterSuccess: ({ userRegister }, { payload }) => {
      userRegister.loading = false
      userRegister.error = null
      userRegister.userInfo = payload
    },
    userRegisterFailure: ({ userRegister }, { payload }) => {
      userRegister.loading = false
      userRegister.error = payload
      userRegister.userInfo = null
    },
    userDetailsRequest: ({ userDetails }, { payload }) => {
      userDetails.loading = true
    },
    userDetailsSuccess: ({ userDetails }, { payload }) => {
      userDetails.loading = false
      userDetails.error = null
      userDetails.userInfo = payload
    },
    userDetailsFailure: ({ userDetails }, { payload }) => {
      userDetails.loading = false
      userDetails.error = payload
      userDetails.userInfo = null
    },
    userDetailsReset: ({ userDetails }) => {
      userDetails.userInfo = null
      userDetails.error = null
      userDetails.loading = false
    },
    userUpdateRequest: ({ userUpdateDetails }, { payload }) => {
      userUpdateDetails.loading = true
    },
    userUpdateSuccess: ({ userUpdateDetails }, { payload }) => {
      userUpdateDetails.loading = false
      userUpdateDetails.error = null
      userUpdateDetails.success = true
    },
    userUpdateFailure: ({ userUpdateDetails }, { payload }) => {
      userUpdateDetails.loading = false
      userUpdateDetails.error = payload
    },
    userUpdateReset: ({ userUpdateDetails }) => {
      userUpdateDetails.success = false
      userUpdateDetails.error = null
      userUpdateDetails.loading = false
    },
    userListRequest: ({ userList }, { payload }) => {
      userList.loading = true
    },
    userListSuccess: ({ userList }, { payload }) => {
      userList.loading = false
      userList.error = null
      userList.users = payload
    },
    userListFailure: ({ userList }, { payload }) => {
      userList.loading = false
      userList.error = payload
    },
    userListReset: ({ userList }) => {
      userList.users = []
      userList.error = null
      userList.loading = false
    },
    userDeleteRequest: ({ userDelete }) => {
      userDelete.loading = true
    },
    userDeleteSuccess: ({ userDelete }, { payload }) => {
      userDelete.loading = false
      userDelete.error = null
      userDelete.success = true
    },
    userDeleteFailure: ({ userDelete }, { payload }) => {
      userDelete.loading = false
      userDelete.error = payload
    },
    resetUserDelete: ({ userDelete }) => {
      userDelete.loading = false
      userDelete.error = null
      userDelete.success = false
    },
    userUpdateByAdminRequest: ({ userUpdateByAdmin }) => {
      userUpdateByAdmin.loading = true
    },
    userUpdateByAdminSuccess: ({ userUpdateByAdmin }, { payload }) => {
      userUpdateByAdmin.loading = false
      userUpdateByAdmin.error = null
      userUpdateByAdmin.success = true
    },
    userUpdateByAdminFailure: ({ userUpdateByAdmin }, { payload }) => {
      userUpdateByAdmin.loading = false
      userUpdateByAdmin.error = payload
    },
    resetUserUpdateByAdminDelete: ({ userUpdateByAdmin }) => {
      userUpdateByAdmin.loading = false
      userUpdateByAdmin.error = null
      userUpdateByAdmin.success = false
    },
  },
})

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      const userLogin = getState().user.userLogin
      dispatch(userSlice.actions.userDeleteRequest())
      const config = {
        headers: {
          authtoken: `Bearer ${userLogin.userInfo.token}`,
        },
      }
      const { data } = await axois.delete(`/api/user/${id}`, config)
      dispatch(userSlice.actions.userDeleteSuccess())
    } catch (error) {
      dispatch(
        userSlice.actions.userDeleteFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const getAllUsers = () => {
  return async (dispatch,getState) => {
    try {
      const userLogin = getState().user.userLogin
      dispatch(userSlice.actions.userListRequest())
      const config = {
        headers: {
          authtoken: `Bearer ${userLogin.userInfo.token}`,
        },
      }
      const { data } = await axois.get(`/api/user`, config)
      dispatch(userSlice.actions.userListSuccess(data))
    } catch (error) {
      dispatch(
        userSlice.actions.userListFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const userLogout = () => {
  return async (dispatch,getState) => {
    
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch(existingOrders.actions.myOrdersReset())
     dispatch(userSlice.actions.userDetailsReset())
    dispatch(userSlice.actions.resetUserLogin())
    dispatch(cartSlice.actions.resetCartDetails())
    dispatch(userSlice.actions.userListReset())
    dispatch(orderSlice.actions.myOrdersReset())
   
        

  }
}

export const {userUpdateReset,userListReset,resetUserDelete,resetUserUpdateByAdminDelete} = userSlice.actions

export const loginUser = (email,password) => {
  return async (dispatch,getState)=>{
    try {
      dispatch(userSlice.actions.userLoginRequest())
      const config = {
        headers:{
          'Content-Type' : 'application/json'
        }
      }
      const {data} = await axois.post('/api/user/login',{email,password},config)
      dispatch(userSlice.actions.userLoginSuccess(data))
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch(
        userSlice.actions.userLoginFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const registerUser = (name,email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userSlice.actions.userRegisterRequest())
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axois.post(
        '/api/user',
        {name, email, password },
        config
      )
      dispatch(userSlice.actions.userRegisterSuccess(data))
      dispatch(userSlice.actions.userLoginSuccess(data))
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch(
        userSlice.actions.userRegisterFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const getUserDetails = (id) => {
  return async (dispatch,getState) => {
    try {
      const userLogin = getState().user.userLogin
      dispatch(userSlice.actions.userDetailsRequest())
      const config = {
        headers:{
          'Content-Type' : 'application/json',
           'authtoken' : `Bearer ${userLogin.userInfo.token}`
        }
      }
      const {data} = await axois.get(`/api/user/${id}`,config)
      dispatch(userSlice.actions.userDetailsSuccess(data))
    } catch (error) {
      dispatch(
        userSlice.actions.userDetailsFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    try {
      const userLogin = getState().user.userLogin
      dispatch(userSlice.actions.userUpdateRequest())
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authtoken: `Bearer ${userLogin.userInfo.token}`,
        },
      }
      const { data } = await axois.put(`/api/user/profile`,user, config)
    
      dispatch(userSlice.actions.userUpdateSuccess())
      dispatch(userSlice.actions.userLoginSuccess(data))
      dispatch(userSlice.actions.userDetailsSuccess(data.select('-token')))
      localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
      dispatch(
        userSlice.actions.userDetailsFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const updateUserByID = (user) => {
  return async (dispatch, getState) => {
    try {
      const userLogin = getState().user.userLogin
      dispatch(userSlice.actions.userUpdateByAdminRequest())
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authtoken: `Bearer ${userLogin.userInfo.token}`,
        },
      }
     
      const { data } = await axois.put(`/api/user/${user._id}`, user, config)

      dispatch(userSlice.actions.userUpdateByAdminSuccess())
      dispatch(userSlice.actions.userDetailsSuccess(data))
    } catch (error) {
      dispatch(
        userSlice.actions.userUpdateByAdminFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

const orderSlice = createSlice({
  name: 'order',
  initialState:{
    loading: false,
    error: null,
    success: false,
    data: {}
  },
  reducers:{
    placeOrderRequest: (state,{paylaod}) => {
      state.loading = true
    },
    placeOrderSuccess: (state,{payload}) => {
      state.loading = false
      state.success = true
      state.data = payload
    },
    placeOrderFailure: (state,{payload}) => {
      state.loading = false
      state.error = payload
    }
  }
})

export const placeOrder = (data) => {
  return async (dispatch,getState) => {
    try {
      const userLogin = getState().user.userLogin
      dispatch(orderSlice.actions.placeOrderRequest())
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authtoken: `Bearer ${userLogin.userInfo.token}`,
        },
      }
     
      const { data:orderData } = await axois.post(`/api/orders`,data, config)
     
      dispatch(orderSlice.actions.placeOrderSuccess(orderData))
    } catch (error) {
      dispatch(
        orderSlice.actions.placeOrderFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

const existingOrders = createSlice({
  name: 'existingOrders',
  initialState: {
    orderDetails: {
      loading: false,
      error: null,
      data: {
        shippingAddress: {},
        orderItems: [],
      },
    },
    orderPay: {
      loading: false,
      success: false,
      error: null,
    },
    myOrders: {
      loading: false,
      error: null,
      orders: [],
    },
    allOrders: {
      loading: false,
      error: null,
      orders: [],
    },
    orderDelieverd: {
      loading: false,
      error: null,
      success: false,
    },
  },
  reducers: {
    orderDetailsRequest: ({ orderDetails }, { payload }) => {
      orderDetails.loading = true
    },
    orderDetailsSuccess: ({ orderDetails }, { payload }) => {
      orderDetails.loading = false
      orderDetails.data = payload
    },
    orderDetailsFailure: ({ orderDetails }, { payload }) => {
      orderDetails.loading = false
      orderDetails.error = payload
    },
    orderPayRequest: ({ orderPay }, { payload }) => {
      orderPay.loading = true
    },
    orderPaySuccess: ({ orderPay }, { payload }) => {
      orderPay.loading = false
      orderPay.success = true
    },
    orderPayFailure: ({ orderPay }, { payload }) => {
      orderPay.loading = false
      orderPay.error = payload
    },
    orderPayReset: ({ orderPay }, { payload }) => {
      orderPay.success = false
      orderPay.error = null
      orderPay.loading = false
    },
    myOrdersRequest: ({ myOrders }, { payload }) => {
      myOrders.loading = true
    },
    myOrdersSuccess: ({ myOrders }, { payload }) => {
      myOrders.loading = false
      myOrders.orders = payload
    },
    myOrdersFailure: ({ myOrders }, { payload }) => {
      myOrders.loading = false
      myOrders.error = payload
    },
    myOrdersReset: ({ myOrders }, { payload }) => {
      myOrders.loading = false
      myOrders.error = null
      myOrders.orders = []
    },
    allOrdersRequest: ({ allOrders }, { payload }) => {
      allOrders.loading = true
    },
    allOrdersSuccess: ({ allOrders }, { payload }) => {
      allOrders.loading = false
      allOrders.orders = payload
    },
    allOrdersFailure: ({ allOrders }, { payload }) => {
      allOrders.loading = false
      allOrders.error = payload
    },
    orderDelieverdRequest: ({ orderDelieverd }, { payload }) => {
      orderDelieverd.loading = true
    },
    orderDelieverdSuccess: ({ orderDelieverd }, { payload }) => {
      orderDelieverd.loading = false
      orderDelieverd.success = true
    },
    orderDelieverdFailure: ({ orderDelieverd }, { payload }) => {
      orderDelieverd.loading = false
      orderDelieverd.error = payload
    },
    orderDelieverdReset: ({ orderDelieverd }, { payload }) => {
      orderDelieverd.loading = false
      orderDelieverd.error = null
      orderDelieverd.success = false
    },
  },
})

export const delieverOrder = (orderID)=>{
  return async (dispatch, getState) => {
    try {
      const userLogin = getState().user.userLogin
      dispatch(existingOrders.actions.orderDelieverdRequest())
      const config = {
        headers: {
         
          authtoken: `Bearer ${userLogin.userInfo.token}`,
        },
      }

      const { data: orderData } = await axois.put(
        `/api/orders/${orderID}/delievered`,{},
        config
      )

      dispatch(existingOrders.actions.orderDelieverdSuccess())
    } catch (error) {
      dispatch(
        existingOrders.actions.orderDelieverdFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}
export const getAllOrders = ()=>{
  return async (dispatch, getState) => {
    try {
      const userLogin = getState().user.userLogin
      dispatch(existingOrders.actions.allOrdersRequest())
      const config = {
        headers: {
          authtoken: `Bearer ${userLogin.userInfo.token}`,
        },
      }

      const { data: orderData } = await axois.get(`/api/orders/all`, config)

      dispatch(existingOrders.actions.allOrdersSuccess(orderData))
    } catch (error) {
      dispatch(
        existingOrders.actions.allOrdersFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const getMyOrders = () => {
  return async (dispatch,getState) => {
    try {
      const userLogin = getState().user.userLogin
      dispatch(existingOrders.actions.myOrdersRequest())
      const config = {
        headers: {
          
          authtoken: `Bearer ${userLogin.userInfo.token}`,
        },
      }

      const { data: orderData } = await axois.get(
        `/api/orders`,
        config
      )

      dispatch(existingOrders.actions.myOrdersSuccess(orderData))
    } catch (error) {
      dispatch(
        existingOrders.actions.myOrdersFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const payOrder = (orderId,paymentResult) => {
  return async (dispatch, getState) => {
    try {
      const userLogin = getState().user.userLogin
      dispatch(existingOrders.actions.orderPayRequest())
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authtoken: `Bearer ${userLogin.userInfo.token}`,
        },
      }

      const { data: orderData } = await axois.put(`/api/orders/${orderId}/pay`, paymentResult ,config)

      dispatch(existingOrders.actions.orderPaySuccess())
    } catch (error) {
      dispatch(
        existingOrders.actions.orderPayFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      const userLogin = getState().user.userLogin
      dispatch(existingOrders.actions.orderDetailsRequest())
      const config = {
        headers: {
         
          authtoken: `Bearer ${userLogin.userInfo.token}`,
        },
      }

      const { data: orderData } = await axois.get(`/api/orders/${id}`, config)
      

      dispatch(existingOrders.actions.orderDetailsSuccess(orderData))
    } catch (error) {
      dispatch(
        existingOrders.actions.orderDetailsFailure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }
}

export const {orderPayReset,myOrdersReset,orderDelieverdReset} = existingOrders.actions


 const store = configureStore({
  reducer: { product: productSlice.reducer,cart: cartSlice.reducer,user: userSlice.reducer,
             order: orderSlice.reducer, existingOrders: existingOrders.reducer },
})

export default store


import axios from "axios";

export const addCarService = async (
  make,
  model,
  year,
  color,
  licensePlate,
  location,
  vehicleType,
  fuelType,
  transmission,
  seats,
  doors,
  dailyRate,
  mileage,
  features,
  image,
  description
) => {
  try {
    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("color", color);
    formData.append("licensePlate", licensePlate);
    formData.append("location", JSON.stringify(location));
    formData.append("vehicleType", vehicleType);
    formData.append("fuelType", fuelType);
    formData.append("transmission", transmission);
    formData.append("seats", seats);
    formData.append("doors", doors);
    formData.append("dailyRate", dailyRate);
    formData.append("mileage", mileage);
    formData.append("features", features);
    image.forEach((img) => {
      formData.append("image", img);
    });
    // formData.append("image", image);
    formData.append("description", description);

    const response = await axios({
      method: "POST",
      url: "https://vercel-crs-backend.vercel.app/host/cars",
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeader(),
      },
      data: formData,
    });
    // console.log(formData);
    const cars = await response.data;
    return cars;
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (
  image,
  firstName,
  secName,
  userName,
  email,
  phone,
  password,
  confirmPassword
) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("firstName", firstName);
    formData.append("secName", secName);
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    const response = await axios({
      method: "POST",
      url: "https://vercel-crs-backend.vercel.app/auth/register",
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeader(),
      },
      data: formData,
    });
    const user = await response.data;
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const addHost = async (
  image,
  fullName,
  email,
  phone,
  password,
  confirmPassword,
  addressLine,
  city,
  state,
  pincode,
  idType,
  idNumber
) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("addressLine", addressLine);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pincode);
    formData.append("idType", idType);
    formData.append("idNumber", idNumber);
    const response = await axios({
      method: "POST",
      url: "https://vercel-crs-backend.vercel.app/auth/hostregister",
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeader(),
      },
      data: formData,
    });
    const host = await response.data;
    console.log(host);
    return host;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://vercel-crs-backend.vercel.app/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });
    const user = await response.data;
    // console.log(user)
    return user; // have token and user info
  } catch (error) {
    console.error(error);
  }
};

export const getCarServices = async () => {
  try {
    const response = await axios.get(
      "https://vercel-crs-backend.vercel.app/host/cars"
    );
    const cars = await response.data;
    // console.log(cars)
    return cars;
  } catch (error) {
    console.error(error);
  }
};

export const getMyCarServices = async (token) => {
  try {
    const response = await axios.get(
      "https://vercel-crs-backend.vercel.app/host/cars/mycars",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const cars = await response.data;
    // return cars.map(mapServices);
    return cars;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCarServer = async (id) => {
  try {
    await axios(`https://vercel-crs-backend.vercel.app/host/cars/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    await deleteFavCar(id);
    await deleteBookingCar(id);
    return id;
  } catch (error) {
    console.error(error);
  }
};

export const getDetails = async (id) => {
  try {
    const response = await axios.get(
      `https://vercel-crs-backend.vercel.app/host/cars/details/${id}`
    );
    const car = await response.data;
    // console.log(car);
    return car;
  } catch (error) {
    console.error(error);
  }
};

export const editCarServer = async (
  id,
  make,
  model,
  year,
  color,
  licensePlate,
  location,
  vehicleType,
  fuelType,
  transmission,
  seats,
  doors,
  dailyRate,
  mileage,
  features,
  image,
  description,
  existingImage
) => {
  try {
    // console.log(existingImage);
    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("color", color);
    formData.append("licensePlate", licensePlate);
    formData.append("location", JSON.stringify(location));
    formData.append("vehicleType", vehicleType);
    formData.append("fuelType", fuelType);
    formData.append("transmission", transmission);
    formData.append("seats", seats);
    formData.append("doors", doors);
    formData.append("dailyRate", dailyRate);
    formData.append("mileage", mileage);
    formData.append("features", features);
    // formData.append("image", image);
    image.forEach((img) => {
      formData.append("image", img);
    });
    formData.append("description", description);
    // console.log(existingImage)
    // formData.append("existingImage", existingImage);
    formData.append("existingImage", JSON.stringify(existingImage));
    const response = await axios(
      `https://vercel-crs-backend.vercel.app/host/cars/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          ...getAuthHeader(),
        },
        data: formData,
      }
    );
    const car = await response.data;
    // return mapServices(car);
    return car;
  } catch (error) {
    console.error(error);
  }
};

// const mapServices = (serverCar) => {
//   return {
//     id: serverCar._id,
//     make: serverCar.make,
//     model: serverCar.model,
//     year: serverCar.year,
//     color: serverCar.color,
//     licensePlate: serverCar.licensePlate,
//     vehicleType: serverCar.vehicleType,
//     fuelType: serverCar.fuelType,
//     transmission: serverCar.transmission,
//     seats: serverCar.seats,
//     doors: serverCar.doors,
//     dailyRate: serverCar.dailyRate,
//     mileage: serverCar.mileage,
//     features: serverCar.features,
//     image: serverCar.image,
//     description: serverCar.description,
//     status: serverCar.status,
//   };
// };

export const getFavouriteCar = async (token) => {
  // console.log(token)
  try {
    const response = await axios.get(
      "https://vercel-crs-backend.vercel.app/user/cars/favourite",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const favCars = await response.data;
    // return favCars.map(mapServices);
    return favCars;
  } catch (error) {
    console.error(error);
  }
};

export const addFavCar = async (id) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://vercel-crs-backend.vercel.app/user/cars/favourite/${id}`,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    const car = await response.data;
    // console.log(item);
    // return mapServices(item);
    // console.log(car)
    return car;
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavCar = async (id) => {
  try {
    await axios(
      `https://vercel-crs-backend.vercel.app/user/cars/favourite/${id}`,
      {
        method: "DELETE",
        headers: getAuthHeader(),
      }
    );
    return id;
  } catch (error) {
    console.error(error);
  }
};

export const getBookingCar = async (token) => {
  try {
    const response = await axios.get(
      "https://vercel-crs-backend.vercel.app/user/cars/bookings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const bookCars = await response.data;
    // return bookCars.map(mapServices);
    return bookCars;
  } catch (error) {
    console.error(error);
  }
};

export const addBookingCar = async (value, id, pays, unavailableTime) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://vercel-crs-backend.vercel.app/user/cars/bookings/${id}`,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      data: {
        value: value,
        paymentId: pays.razorpay_payment_id,
        orderId: pays.razorpay_order_id,
        unavailableTime: unavailableTime,
      },
    });
    const car = await response.data;
    // return mapServices(item);
    return car;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBookingCar = async (id) => {
  try {
    await axios(
      `https://vercel-crs-backend.vercel.app/user/cars/bookings/${id}`,
      {
        method: "DELETE",
        headers: getAuthHeader(),
      }
    );
    return id;
  } catch (error) {
    console.error(error);
  }
};

export const searchCarServices = async (query) => {
  try {
    const response = await axios.get(
      `https://vercel-crs-backend.vercel.app/user/cars?search=${query}`,
      {
        headers: {
          ...getAuthHeader(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Helper function to retrieve token :
export const getAuthHeader = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (error) {
    console.error(error);
  }
};

export const handleRazorpayPayment = async (value, carId, unavailableTime) => {
  try {
    // 1. Create order using your backend API
    const { data: order } = await axios.post(
      "https://vercel-crs-backend.vercel.app/user/cars/payment",
      {
        amount: value, // in ₹
      }
    );

    // 2. Configure Razorpay Checkout
    return new Promise((resolve, reject) => {
      const options = {
        key: "rzp_test_a2X8F13E1qEaPX", // your Razorpay test key
        amount: order.amount,
        currency: order.currency,
        name: "DriveEase",
        description: "Car Booking",
        order_id: order.id,
        handler: async function (response) {
          alert("✅ Payment Successful!");
          // console.log(response);
          // Handle post-payment logic
          // onClose(); // Close modal if needed
          try {
            // 3. Call booking service after payment
            await addBookingCar(
              value,
              carId,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
              },
              unavailableTime
            );
            alert("🚗 Car booked successfully!");
          } catch (err) {
            console.error("Booking after payment failed:", err);
            alert("Booking failed. Please contact support.");
          }
          // console.log(order);
          resolve({
            order,
            razorpayResponse: {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
            },
          });
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "",
        },
        theme: {
          color: "#2563eb",
        },
      };

      // 3. Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      // console.log(order);
      // console.log(options);
    });
    // console.log(response)
  } catch (error) {
    console.error("Payment initiation failed:", error);
    alert("❌ Payment failed. Please try again.");
  }
};

export const uploadDocumentsService = async (frLicense, baLicense, gId) => {
  try {
    // console.log(frLicense, baLicense, gId);
    const formData = new FormData();
    formData.append("frLicense", frLicense);
    formData.append("baLicense", baLicense);
    formData.append("gId", gId);
    // console.log(formData)

    const response = await axios({
      method: "POST",
      url: "https://vercel-crs-backend.vercel.app/user/cars/documents",
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeader(),
      },
      data: formData,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateDocumentsService = async (
  id,
  frLicense,
  baLicense,
  gId,
  existingFrontdl,
  existingBackdl,
  existingGid
) => {
  // console.log(frLicense);
  // console.log(baLicense);
  // console.log(gId);
  // console.log(id);
  // console.log(existingFrontdl);
  // console.log(existingBackdl);
  // console.log(existingGid);
  // console.log(frLicense, baLicense, gId);
  try {
    const formData = new FormData();
    if (frLicense) formData.append("frLicense", frLicense);
    if (baLicense) formData.append("baLicense", baLicense);
    if (gId) formData.append("gId", gId);
    formData.append("existingFrontdl", existingFrontdl);
    formData.append("existingBackdl", existingBackdl);
    formData.append("existingGid", existingGid);
    // console.log(formData)

    const response = await axios({
      url: `https://vercel-crs-backend.vercel.app/user/cars/uplodedDocs/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeader(),
      },
      data: formData,
    });
    // return response.data;
    const doc = await response.data;
    // return mapServices(car);
    return doc;
  } catch (error) {
    console.error(error);
  }
};

export const getDocuments = async (token) => {
  try {
    const response = await axios.get(
      "https://vercel-crs-backend.vercel.app/user/cars/uplodedDocs",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const bookCars = await response.data;
    return bookCars;
    // return bookCars.map(mapServices);
  } catch (error) {
    console.error(error);
  }
};

export const getHistory = async (token) => {
  try {
    const response = await axios.get(
      "https://vercel-crs-backend.vercel.app/user/cars/history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const history = await response.data;
    return history;
    // return bookCars.map(mapServices);
  } catch (error) {
    console.error(error);
  }
};

export const getPopularCars = async () => {
  try {
    const response = await axios.get(
      "https://vercel-crs-backend.vercel.app/user/cars/popular"
    );
    const cars = await response.data;
    return cars;
  } catch (error) {
    console.error(error);
  }
};

export const modifyUserProfile = async (
  id,
  image,
  name,
  email,
  phone,
  address,
  previousImage
) => {
  // console.log(id);
  // console.log(image);
  // console.log(name);
  // console.log(email);
  // console.log(phone);
  // console.log(address);
  try {
    // console.log(previousImage);
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("previousImage", previousImage);
    const response = await axios({
      url: `https://vercel-crs-backend.vercel.app/auth/updateprofile/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeader(),
      },
      data: formData,
    });
    // return response.data;
    const user = await response.data;
    // return mapServices(car);
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const updateUserPassword = async (
  id,
  password,
  newPassword,
  confirmPassword
) => {
  try {
    const response = await axios({
      url: `https://vercel-crs-backend.vercel.app/auth/updatepassword/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      data: {
        password,
        newPassword,
        confirmPassword,
      },
    });
    const user = await response.data;
    // console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const searchHistoryServices = async (query) => {
  try {
    const response = await axios.get(
      `https://vercel-crs-backend.vercel.app/host/cars/searchHistory?search=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      }
    );
    const resultCars = await response.data;
    return resultCars;
  } catch (error) {
    console.error(error);
  }
};

export const emailOtpService = async (id, otp) => {
  console.log(otp);
  console.log(id);
  try {
    const response = await axios({
      method: "POST",
      url: `https://vercel-crs-backend.vercel.app/auth/verify-email/${id}`,
      headers: {
        "Content-Type": "application/json",
        // ...getAuthHeader(),
      },
      data: {
        otp,
      },
    });
    const data = await response.data;
    // return mapServices(item);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const resendOtp = async (id) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://vercel-crs-backend.vercel.app/auth/resendOtp/${id}`,
      headers: {
        "Content-Type": "application/json",
        // ...getAuthHeader(),
      },
    });
    const data = await response.data;
    // return mapServices(item);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const phoneOtpService = async (id) => {
  // console.log(otp);
  console.log(id);
  try {
    const response = await axios({
      method: "POST",
      url: `https://vercel-crs-backend.vercel.app/auth/verify-phone/${id}`,
      headers: {
        "Content-Type": "application/json",
        // ...getAuthHeader(),
      },
    });
    const data = await response.data;
    // return mapServices(item);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addphoneOtpService = async (id, otp) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://vercel-crs-backend.vercel.app/auth/verify-otp/${id}`,
      headers: {
        "Content-Type": "application/json",
        // ...getAuthHeader(),
      },
      data: {
        otp,
      },
    });
    const data = await response.data;
    // return mapServices(item);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const resendPhoneOtp = async (id) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://vercel-crs-backend.vercel.app/auth/resendPhoneOtp/${id}`,
      headers: {
        "Content-Type": "application/json",
        // ...getAuthHeader(),
      },
    });
    const data = await response.data;
    // return mapServices(item);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const sendEmailforVerify = async (email) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://vercel-crs-backend.vercel.app/auth/verifyemail-password`,
      headers: {
        "Content-Type": "application/json",
        // ...getAuthHeader(),
      },
      data: {
        email,
      },
    });
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const rewritePassword = async (id, password, confirmPassword) => {
  console.log(password);
  try {
    const response = await axios({
      method: "POST",
      url: `https://vercel-crs-backend.vercel.app/auth/changePassword/${id}`,
      headers: {
        "Content-Type": "application/json",
        // ...getAuthHeader(),
      },
      data: {
        password,
        confirmPassword,
      },
    });
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

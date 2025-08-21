import express from 'express';
import { propertyModel, buyerModel, userModel, ContactModel } from '../model/table.js';

const adminRoute = express.Router();

// Add Property
adminRoute.post('/add-property', async (req, res) => {
    try {
        const { title, price, area, description, location, bedrooms, bathrooms } = req.body;
        const { pic } = req.files;

        if (!pic) {
            return res.json({
                code: 400,
                message: "Image file is required.",
                data: ''
            });
        }

        // Move image file to uploads
        pic.mv("uploads/" + pic.name, async (err) => {
            if (err) {
                return res.json({
                    code: 400,
                    message: "Error in File Upload.",
                    data: ''
                });
            }

            const isExist = await propertyModel.findOne({ title });
            if (isExist) {
                return res.json({
                    code: 400,
                    message: "Property Already Exists.",
                    data: isExist
                });
            }

            const data = new propertyModel({
                title,
                price,
                area,
                bedrooms,
                bathrooms,
                description,
                location,
                pic: pic.name
            });

            const result = await data.save();
            return res.json({
                code: 200,
                message: "Property Added Successfully.",
                data: result
            });
        });

    } catch (err) {
        return res.json({
            code: 500,
            message: "Internal Server Error.",
            data: ''
        });
    }
});

// Get All Properties
adminRoute.get('/property-list', async (req, res) => {
    try {
        const result = await propertyModel.find();
        if (result.length > 0) {
            res.json({
                code: 200,
                message: "Data fetched successfully.",
                data: result
            });
        } else {
            res.json({
                code: 400,
                message: "No properties found.",
                data: []
            });
        }
    } catch (err) {
        res.json({
            code: 500,
            message: "Internal Server Error.",
            data: []
        });
    }
});

// Get Admin Sold List
adminRoute.get('/admin-sold-list', async (req, res) => {
    try {
        const raw = await buyerModel.find();
        const finalData = await Promise.all(
            raw.map(async (item) => {
                const propertyData = await propertyModel.findOne({ _id: item.propertyId });
                const userData = await userModel.findOne({ _id: item.userId });

                return {
                    _id: item._id,
                    propertyId: propertyData?._id,
                    title: propertyData?.title,
                    price: propertyData?.price,
                    area: propertyData?.area,
                    bedrooms: propertyData?.bedrooms,
                    bathrooms: propertyData?.bathrooms,
                    location: propertyData?.location,
                    description: propertyData?.description,
                    pic: propertyData?.pic,
                    name: userData?.name,
                    email: userData?.email,
                    contact: userData?.contact
                };
            })
        );

        res.json({
            code: 200,
            message: "Data fetched.",
            data: finalData
        });

    } catch (err) {
        res.json({
            code: 500,
            message: "Internal Server Error.",
            data: []
        });
    }
});

// Delete Property
adminRoute.post('/delete-property', async (req, res) => {
    try {
        const { _id } = req.body;
        const result = await propertyModel.findByIdAndDelete({ _id });

        if (result) {
            res.json({
                code: 200,
                message: "Property Deleted Successfully.",
                data: ''
            });
        } else {
            res.json({
                code: 400,
                message: "Property Deletion Failed!",
                data: ''
            });
        }
    } catch (err) {
        res.json({
            code: 500,
            message: "Internal Server Error.",
            data: ''
        });
    }
});

// Delete Sold Item
adminRoute.post('/delete-sold-item', async (req, res) => {
    try {
        const { _id } = req.body;
        const result = await buyerModel.findByIdAndDelete({ _id });

        if (result) {
            res.json({
                code: 200,
                message: "Sold Item Deleted Successfully.",
                data: ''
            });
        } else {
            res.json({
                code: 400,
                message: "Deletion Failed!",
                data: ''
            });
        }
    } catch (err) {
        res.json({
            code: 500,
            message: "Internal Server Error.",
            data: ''
        });
    }
});

// Get All Normal Users
adminRoute.get('/admin-user-list', async (req, res) => {
    try {
        const result = await userModel.find({ userType: "user" });

        if (result.length > 0) {
            res.json({
                code: 200,
                message: "Data fetched successfully.",
                data: result
            });
        } else {
            res.json({
                code: 400,
                message: "No users found.",
                data: []
            });
        }
    } catch (err) {
        res.json({
            code: 500,
            message: "Internal Server Error.",
            data: []
        });
    }
});

// ✔ Save contact
adminRoute.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;

    if (!name || !email || !phone || !message || !subject) {
      return res.json({ code: 400, message: "All fields are required", data: null });
    }

    const contact = new ContactModel({ name, email, phone, message, subject });
    const result = await contact.save();

    if (result) {
      res.json({
        code: 200,
        message: "Saved successfully.",
        data: result
      });
    } else {
      res.json({
        code: 400,
        message: "Save failed!",
        data: ''
      });
    }
  } catch (err) {
    res.json({
      code: 500,
      message: "Internal Server Error.",
      data: ''
    });
  }
});

// ✔ Get contact list (use for admin panel)
adminRoute.get('/contact-list', async (req, res) => {
  try {
    const data = await ContactModel.find().sort({ createdAt: -1 }); // latest first
    res.json({
      code: 200,
      message: "Data fetched successfully",
      data: data
    });
  } catch (err) {
    res.json({
      code: 500,
      message: "Internal Server Error.",
      data: []
    });
  }
});



export default adminRoute;

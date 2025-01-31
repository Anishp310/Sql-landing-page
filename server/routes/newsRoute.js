import authenticateToken from "../middleware/authentication.js";
import express from "express";
import multer from "multer";
import { forgotPassword, getResetPasswordPage, loginUser, registerUser, resetPassword } from "../controller/authController.js";
import { createBankingPlan, deleteBankingPlan, getAllBankingPlans, getBankingPlan, updateBankingPlan } from "../controller/bankingContainer.js";
import { createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from "../controller/blogController.js";
import { createBrochure, deleteBrochure, getAllBrochures, getBrochure, updateBrochure } from "../controller/brochureController.js";
import { createCareer, deleteCareer, getAllCareers, getCareer, updateCareer } from "../controller/careerController.js";
import { createContact, deleteContact, getAllContacts, getContact, updateContact } from "../controller/contactController.js";
import { createDemo, deleteDemo, getAllDemos, updateDemo } from "../controller/demoController.js";
import { createImage, deleteImage, getAllImages, getImage, updateImage } from "../controller/imageController.js";
import { DeleteNews, UpdateNews, createNews, getAllNews, getNews } from "../controller/newsController.js";
import { createTradingPlan, deleteTradingPlan, getAllTradingPlans, getTradingPlan, updateTradingPlan } from "../controller/tradingContainer.js";

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });
const router = express.Router();

//user
router.post("/register", registerUser);

// Login endpoint
router.post("/login", loginUser);

//News
router.post('/addNews',authenticateToken,createNews)
router.get('/getAllNews',getAllNews)
router.get('/getNews/:news_id',authenticateToken,getNews)
router.put('/updateNews/:news_id',authenticateToken,UpdateNews)
router.delete('/deleteNews/:news_id',authenticateToken,DeleteNews)

//brochure
router.post('/addBrochure',createBrochure)
router.get('/getAllBrochures',getAllBrochures)
router.get('/getBrochure/:brochure_id',authenticateToken,getBrochure)
router.put('/updateBrochure/:brochure_id',authenticateToken,updateBrochure)
router.delete('/deleteBrochure/:brochure_id',authenticateToken,deleteBrochure)

//demo
router.post('/addDemo',createDemo)
router.get('/getAllDemo',getAllDemos)
router.put('/updateDemo/:Demo_id',authenticateToken,updateDemo)
router.delete('/deleteDemo/:Demo_id',authenticateToken,deleteDemo)


// Forgot Password
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.get("/resetPassword/:token", getResetPasswordPage);


router.post("/addcontacts", createContact);
router.get("/contacts",authenticateToken, getAllContacts);
router.get("/contacts/:contact_id", getContact);
router.put("/contacts/:contact_id", updateContact);
router.delete("/deleteContacts/:contact_id",authenticateToken, deleteContact);

router.post("/addcareers", createCareer); // Create Career
router.get("/career", getAllCareers); // Get All Careers
router.get("/career/:career_id", getCareer); // Get Single Career
router.put("/updatecareer/:career_id", updateCareer); // Update Career
router.delete("/deletecareer/:career_id",authenticateToken, deleteCareer); // Delete Career


router.get('/getAllImages', getAllImages); // Get all images
router.get('/images/:image_id', getImage); // Get a single image by ID
router.delete('/deleteImages/:image_id', deleteImage); // Delete an image by ID
router.post('/addImages', upload.single('image_data'), createImage);
router.put('/updateImages/:image_id', upload.single('image_data'), updateImage);


router.post("/addpricing",createBankingPlan); 
router.get("/pricing", getAllBankingPlans); 
router.get("/pricing/:pricing_id",getBankingPlan ); 
router.put("/updatepricing/:pricing_id",updateBankingPlan ); 
router.delete("/deletepricing/:pricing_id",deleteBankingPlan ); 

router.post("/addpricing1", createTradingPlan); 
router.get("/pricing1", getAllTradingPlans); 
router.get("/pricing1/:pricing_id", getTradingPlan); 
router.put("/updatepricing1/:pricing_id", updateTradingPlan); 
router.delete("/deletepricing1/:pricing_id", deleteTradingPlan); 

router.get("/blogs", getAllBlogs); // Get all blogs
// router.get("/blog/:blog_id", getBlog); // Get a blog by ID
router.get("/blogs/:slug", getBlog); // Get a blog by slug
router.post("/addblog", upload.single("image_data"), createBlog); // Create a blog
router.put("/updateblog/:blog_id", upload.single("image_data"), updateBlog); // Update a blog
router.delete("/deleteblog/:blog_id", deleteBlog); // Delete a blog


export default router
const backendDomain = "https://server.jooneli.com";
// const backendDomain = "http://localhost:8080";

const SummaryApi = {
  HomeNewsImage: {
    url: `${backendDomain}/getAllImages`,
    method: "get",
  },
  GetAllNews: {
    url: `${backendDomain}/getAllNews`,
    method: "get",
  },

  //admin news 

  updateNews: {
    url: `${backendDomain}/updateNews`,
    method: "put",
  },
    addNews: {
    url: `${backendDomain}/addNews`,
    method: "post",
  },
  deleteNews: {
    url: `${backendDomain}/deleteNews`,
    method: "delete",
  },


  //brochure
  AddBrochure: {
    url: `${backendDomain}/addBrochure`,
    method: "Post",
  },
  getAllBrochure: {
    url: `${backendDomain}/getAllBrochures`,
    method: "get",
  },
  deleteAllBrochure: {
    url: `${backendDomain}/deleteBrochure`,
    method: "delete",
  },
  //add demo

  AddDemo: {
    url: `${backendDomain}/addDemo`,
    method: "post",
  },
  getAllDemo: {
    url: `${backendDomain}/getAllDemo`,
    method: "get",
  },
  deleteDemo: {
    url: `${backendDomain}/deleteDemo`,
    method: "DELETE",
  },

  //blog
  Blog: {
    url: `${backendDomain}/blogs`,
    method: "get",
  },
  updateBlog: {
    url: `${backendDomain}/updateblog`,
    method: "put",
  },
  addBlog: {
    url: `${backendDomain}/addblog`,
    method: "post",
  },
  deleteBlog: {
    url: `${backendDomain}/deleteblog`,
    method: "delete",
  },
  Blogs_top_clicked: {
    url: `${backendDomain}/blogs/top-clicked`,
    method: "get",
  },
 //career
  getCareer: {
    url: `${backendDomain}/career`,
    method: "get",
  },
  updateCareer: {
    url: `${backendDomain}/updatecareer`,
    method: "put",
  },
  addCareer: {
    url: `${backendDomain}/addcareers`,
    method: "post",
  },
  deleteCareer: {
    url: `${backendDomain}/deletecareer`,
    method: "delete",
  },
  //contact
  Contact: {
    url: `${backendDomain}/contacts`,
    method: "get",
  },
  deleteContact: {
    url: `${backendDomain}/deleteContacts`,
    method: "delete",
  },
  addContact: {
    url: `${backendDomain}/addContacts`,
    method: "post",
  },
  //home news image
  getAllImages: {
    url: `${backendDomain}/getAllImages`,
    method: "get",
  },
  updateImages: {
    url: `${backendDomain}/updateImages`,
    method: "put",
  },
  addImages: {
    url: `${backendDomain}/addImages`,
    method: "post",
  },
  deleteImages: {
    url: `${backendDomain}/deleteImages`,
    method: "delete",
  },
  //banking pricing plan
  Pricing_List: {
    url: `${backendDomain}/pricing`,
    method: "get",
  },
  UpdatePricing: {
    url: `${backendDomain}/updatepricing`,
    method: "put",
  },
  addPricing: {
    url: `${backendDomain}/addpricing`,
    method: "post",
  },
  deletePricing: {
    url: `${backendDomain}/deletepricing`,
    method: "delete",
  },
  //trading pricing plan
  tradingPricing_List: {
    url: `${backendDomain}/pricing1`,
    method: "get",
  },
  tradingUpdatePricing: {
    url: `${backendDomain}/updatepricing1`,
    method: "put",
  },
  tradingAddPricing: {
    url: `${backendDomain}/addpricing1`,
    method: "post",
  },
  tradingDeletePricing: {
    url: `${backendDomain}/deletepricing1`,
    method: "delete",
  },
  //admin login/register
  forgotPassword: {
    url: `${backendDomain}/forgotPassword`,
    method: "post",
  },
  Login:{
    url: `${backendDomain}/login`,
    method: "post",
  },
   Register:{
    url: `${backendDomain}/register`,
    method: "post",
  },
};

export default SummaryApi;

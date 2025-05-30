const Category = require("../models/Category");
const Course = require('../models/Course');
exports.createCategory = async(req,res) => {

    try {
        const {name,description} = req.body;
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message : "All fields are required"
            });
        }

        const tagDetails = await Category.create({
            name:name,
            description:description
        });

        console.log(tagDetails);

        return res.status(200).json({
            success:true,
            message : "Tags are created successfully"
        });
        
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message : error.message
        });
    }
}

exports.showAllCategories = async(req,res) =>{

    try {
        
        const allTags = await Category.find({} , {name:true,description:true});
        // console.log("Hello");
        res.status(200).json({
            success:true,
            message:"All tags returned sucessFully",
            allTags
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message : "Error in showing all messages"
        });
    }
}

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body
    console.log("PRINTING CATEGORY ID: ", categoryId);
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    
    // Handle the case when there are no courses
    if (selectedCategory.course.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec();
      //console.log("Different COURSE", differentCategory)
    // Get top-selling courses across all categories
    const allCategories = await Category.find().populate({
        path: "course",
        match: { status: "Published" },
        populate: {
          path: "instructor",
      },
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.course)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
     // console.log("mostSellingCourses COURSE", mostSellingCourses)
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}


//category pageDetails 

// this one written by me 
// exports.categoryPageDetails = async (req, res) => {
  //   try {
  //     const { categoryId } = req.body
  //     console.log("PRINTING CATEGORY ID: ", categoryId);
  //     // Get courses for the specified category
  //     const selectedCategory = await Category.findById(categoryId).populate({path: "course",match: { status: "Published" },populate: "ratingAndReviews",}).exec() ;

  //     console.log("Hello : ",selectedCategory.course);
  //     //console.log("SELECTED COURSE", selectedCategory)
  //     // Handle the case when the category is not found
  //     if (!selectedCategory) {
  //       console.log("Category not found.")
  //       return res
  //         .status(404)
  //         .json({ success: false, message: "Category not found" })
  //     }
  //     // Handle the case when there are no courses
  //     console.log("selected category Array : ",selectedCategory);
  //     if (selectedCategory.course.length === 0) {
  //       console.log("No courses found for the selected category.")
  //       return res.status(404).json({
  //         success: false,
  //         message: "No courses found for the selected category.",
  //       })
  //     }
        
  //     // Get courses for other categories
  //     const categoriesExceptSelected = await Category.find({
  //       _id: { $ne: categoryId },
  //     })
  //     let differentCategory = await Category.findOne(
  //       categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
  //         ._id
  //     )
  //       .populate({
  //         path: "courses",
  //         match: { status: "Published" },
  //       })
  //       .exec()
  //       //console.log("Different COURSE", differentCategory)
  //     // Get top-selling courses across all categories
  //     const allCategories = await Category.find()
  //       .populate({
  //         path: "courses",
  //         match: { status: "Published" },
  //         populate: {
  //           path: "instructor",
  //       },
  //       })
  //       .exec()
  //     const allCourses = allCategories.flatMap((category) => category.courses)
  //     const mostSellingCourses = allCourses
  //       .sort((a, b) => b.sold - a.sold)
  //       .slice(0, 10)
  //      // console.log("mostSellingCourses COURSE", mostSellingCourses)
  //     res.status(200).json({
  //       success: true,
  //       data: {
  //         selectedCategory,
  //         differentCategory,
  //         mostSellingCourses,
  //       },
  //     })
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "Internal server error",
  //       error: error.message,
  //     })
  //   }
  // }
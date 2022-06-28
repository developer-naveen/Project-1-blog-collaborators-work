const jwt = require('jsonwebtoken');
const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')



/******************************************authentication*********************************************/

const authentication = function (req, res, next) {
    try {
        const token = req.headers["x-api-key"]


        // if(!token) { token = req.headers["x-Auth-Key"] }

        if (!token) {
            return res.status(404).send({ status: false, msg: "token not found" })
        }
        const decodedToken = jwt.verify(token, "my-first-blog-project")
        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "authentication failed" })
        }
    }
    catch (error) {
        console.log("this is the error ", error.message);
        return res.status(500).send({ status: false, msg: error.message })
    }
    next()
}

/******************************************authorization*********************************************/


const authorizationParams = async function (req, res, next) {

    try {
        
        let token = req.headers["x-api-key"]

        console.log(token);

        const blogId=req.params.blogId

        const findAuthor= await blogModel.findById(blogId)
      
      

  
         const tokenData = jwt.verify(token,"my-first-blog-project")

         console.log(tokenData);
     
         if(findAuthor.authorId.toString() !== tokenData.userId){
             res.status(403).send({status:false,msg:"Sorry! You are not authorized to do this."})
         
         }
 
        next()
    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


/******************************************authorization*********************************************/

const authorizationQuery = async function (req, res, next) {

    try {
        let token = req.headers["x-api-key"]

        let decodedToken = jwt.verify(token, "my-first-blog-project")
         

        let authorToBeModified = req.query.authorId

        console.log(authorToBeModified);
        let authorLogin = decodedToken.userId
        console.log(authorLogin);


        if (authorToBeModified.toString() !== authorLogin) {
            return res.status(403).send({ status: false, msg: "Sorry! You are not authorized to do this." })
        }

        next()
    } catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

















module.exports.authentication = authentication

module.exports.authorizationQuery = authorizationQuery
module.exports.authorizationParams= authorizationParams











//optional || 


// const authorizationBody = async function (req, res, next) {

//     try {
//         let token = req.headers["x-auth-key"]

//         let decodedToken = jwt.verify(token, "my-first-blog-project")


//         let bodyPresent = req.body

//         let authorToBeModified = bodyPresent.authorId

//         let authorLogin = decodedToken.userId

//         if (authorToBeModified != authorLogin) {

//             console.log(authorLogin);
//             console.log(authorToBeModified);

//             return res.status(403).send({ status: false, msg: "Sorry! You are not authorized to do this." })
//         }

//         next()
//     } catch (err) {
//         res.status(500).send({ msg: "Error", error: err.message })
//     }
// }

// module.exports.authorizationBody = authorizationBody






// const authorization = async function (req, res, next) {


//     try {
//         let token = req.headers["x-auth-key"]

//         let decodedToken = jwt.verify(token, "my-first-blog-project")

//         let bodyPresent = req.body



//         if (req.query) {

//             let authorToBeModified = req.query.userId

//             let authorLogin = decodedToken.userId

//             if (authorToBeModified != authorLogin) {
//                 return res.status(403).send({ status: false, msg: "Sorry! You are not authorized to do this." })
//             }

//         }




//         if (req.params) {

//             const checkAuthor = await blogModel.find({ _id: req.params.blogId }).select({ authorId: 1 })


//             let authorToBeModified = checkAuthor.authorId

//             let authorLogin = decodedToken.userId

//             if (authorToBeModified != authorLogin) {
//                 return res.status(403).send({ status: false, msg: "Sorry! You are not authorized to do this." })
//             }
//         }





//         next()
//     }

//     catch (err) {
//         res.status(500).send({ msg: "Error", error: err.message })
//     }
// }

import { Router } from "express"
import { adminAuthControllers } from "../../../adapters/controllers/adminControllers"
import { authServiceInterface } from "../../../application/services/authServiceInterface"
import { authServices } from "../../services/authServices"
import { adminDbRepository } from "../../../application/repositories/adminDbRepository"
import { adminRepositoryMongoDB } from "../../database/mongoDb/repositories/adminRepository"

const adminRouter = (router:Router)=>{

    const controllers = adminAuthControllers(
        authServiceInterface,
        authServices,
        adminDbRepository,
        adminRepositoryMongoDB,
    )


    router.get('/dashboard',controllers.getAdminDashboard)
    router.get('/getUserRegPerWeeek',controllers.getUserRegPerWeeek)
    router.get('/getGenders',controllers.getGenders)
    router.get('/getUserAgeGraph',controllers.getUserAgeGraph)
    router.get('/getusersListDetails',controllers.getusersListDetails)
    router.patch('/blockUser',controllers.blocUnblockUser)
    router.get('/getReportsOfUser',controllers.getReportsOfUser)
    router.get('/getPostListDetails',controllers.getPostListDetails)
    router.patch('/managePostStatus',controllers.managePostStatus)
    router.get('/getReportsOfPost',controllers.getReportsOfPost)
    router.get('/getReportedComments',controllers.getReportedComments)
    router.patch('/manageCommnetStatus',controllers.manageCommnetStatus)
    router.get('/getAllRepliesReport',controllers.getAllRepliesReport)
    router.patch('/manageReplyStatus',controllers.manageReplyStatus)
    router.get('/getUserCount',controllers.getUserCount)
    router.get('/getPostCount',controllers.getPostCount)
    




return router
}

export default adminRouter
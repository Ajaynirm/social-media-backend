import express from 'express';
import { getAllBlog,addBlog ,updateBlog,getBlogById,deleteBlogById,getByUserId} from '../controller/blog-controller.js';

const blogRouter = express. Router();
//  route : /api/blog/
blogRouter.get('/',getAllBlog);
blogRouter.post('/add',addBlog);
blogRouter.put('/update/:id',updateBlog);
blogRouter.get('/:id',getBlogById);
blogRouter.delete('/:id',deleteBlogById);
blogRouter.get('/user/:id',getByUserId);

export default blogRouter;

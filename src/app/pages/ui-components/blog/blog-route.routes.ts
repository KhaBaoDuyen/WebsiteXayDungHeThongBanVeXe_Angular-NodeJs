import { BlogGetAllComponent } from "./blog-get-all/blog-get-all.component";
import { BlogCreateComponent } from "./blog-create/blog-create.component";
import { EditBlogsComponent } from "./edit-blogs/edit-blogs.component";
import { Routes } from '@angular/router';



export const blogRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'blogGetAll',
        component: BlogGetAllComponent,
      },
      {
        path: 'blogAdd',
        component: BlogCreateComponent,
      },
      {
        path: 'editBlogs/:id',
        component: EditBlogsComponent,
      },
    ],
  },
];
